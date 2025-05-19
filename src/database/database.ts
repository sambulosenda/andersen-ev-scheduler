import { openDatabaseSync } from "expo-sqlite";

// Open database
const db = openDatabaseSync("andersen_ev.db");

// Interfaces for type safety
interface User {
  id: number;
  username: string;
  password: string;
  email: string | null;
  created_at: string;
}

interface Schedule {
  id?: number; // Optional for creation
  user_id: number;
  name: string;
  schedule_type: string; // Consider enum for valid types
  days: string; // Changed from string[] to string to match database storage
  start_time?: string | null;
  end_time?: string | null;
  ready_by_time?: string | null;
  desired_charge_level?: number | null;
  ready_by_time_mileage?: string | null;
  desired_mileage?: number | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Initializes the database by creating the users and schedules tables.
 * @returns Promise that resolves when initialization is complete.
 */
export const initDatabase = async (): Promise<void> => {
  try {
    // Create users table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create schedules table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        schedule_type TEXT NOT NULL,
        days TEXT NOT NULL,
        start_time TEXT,
        end_time TEXT,
        ready_by_time TEXT,
        desired_charge_level INTEGER,
        ready_by_time_mileage TEXT,
        desired_mileage INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
};

/**
 * Creates a new user in the database.
 * @param username - Unique username.
 * @param password - User password.
 * @param email - Optional email address.
 * @returns Promise resolving to the new user's ID.
 */
export const createUser = async (
  username: string,
  password: string,
  email?: string
): Promise<number> => {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  try {
    const result = await db.runAsync(
      "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
      [username, password, email ?? null]
    );
    return result.lastInsertRowId ?? 0;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
};

/**
 * Finds a user by their username.
 * @param username - The username to search for.
 * @returns Promise resolving to the user object or null if not found.
 */
export const findUserByUsername = async (
  username: string
): Promise<User | null> => {
  if (!username) {
    throw new Error("Username is required");
  }

  try {
    const results = await db.getAllAsync<User>(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error("Failed to find user:", error);
    throw error;
  }
};

/**
 * Retrieves all schedules for a given user.
 * @param userId - The ID of the user.
 * @returns Promise resolving to an array of schedules.
 */
export const getSchedules = async (userId: number): Promise<Schedule[]> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const results = await db.getAllAsync<Schedule>(
      "SELECT * FROM schedules WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    return results.map((item) => ({
      ...item,
      days: JSON.parse(item.days), // Parse JSON string to array
    }));
  } catch (error) {
    console.error("Failed to get schedules:", error);
    throw error;
  }
};

/**
 * Creates a new schedule for a user.
 * @param schedule - The schedule object to create.
 * @returns Promise resolving to the new schedule's ID.
 */
export const createSchedule = async (schedule: Schedule): Promise<number> => {
  const {
    user_id,
    name,
    schedule_type,
    days,
    start_time,
    end_time,
    ready_by_time,
    desired_charge_level,
    ready_by_time_mileage,
    desired_mileage,
  } = schedule;

  if (!user_id || !name || !schedule_type || !days || !Array.isArray(days)) {
    throw new Error("Required schedule fields are missing or invalid");
  }

  try {
    const result = await db.runAsync(
      `INSERT INTO schedules (
        user_id, name, schedule_type, days,
        start_time, end_time,
        ready_by_time, desired_charge_level,
        ready_by_time_mileage, desired_mileage,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [
        user_id,
        name,
        schedule_type,
        JSON.stringify(days),
        start_time ?? null,
        end_time ?? null,
        ready_by_time ?? null,
        desired_charge_level ?? null,
        ready_by_time_mileage ?? null,
        desired_mileage ?? null,
      ]
    );
    return result.lastInsertRowId ?? 0;
  } catch (error) {
    console.error("Failed to create schedule:", error);
    throw error;
  }
};

/**
 * Updates an existing schedule.
 * @param id - The ID of the schedule to update.
 * @param schedule - The updated schedule object.
 * @returns Promise that resolves when the update is complete.
 */
export const updateSchedule = async (
  id: number,
  schedule: Partial<Schedule>
): Promise<void> => {
  const {
    name,
    schedule_type,
    days,
    start_time,
    end_time,
    ready_by_time,
    desired_charge_level,
    ready_by_time_mileage,
    desired_mileage,
  } = schedule;

  if (!id || !name || !schedule_type || !days || !Array.isArray(days)) {
    throw new Error("Required schedule fields are missing or invalid");
  }

  try {
    await db.runAsync(
      `UPDATE schedules SET
        name = ?, schedule_type = ?, days = ?,
        start_time = ?, end_time = ?,
        ready_by_time = ?, desired_charge_level = ?,
        ready_by_time_mileage = ?, desired_mileage = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [
        name,
        schedule_type,
        JSON.stringify(days),
        start_time ?? null,
        end_time ?? null,
        ready_by_time ?? null,
        desired_charge_level ?? null,
        ready_by_time_mileage ?? null,
        desired_mileage ?? 10 ? null : null,
        id,
      ]
    );
  } catch (error) {
    console.error("Failed to update schedule:", error);
    throw error;
  }
};

/**
 * Deletes a schedule by ID.
 * @param id - The ID of the schedule to delete.
 * @returns Promise that resolves when the deletion is complete.
 */
export const deleteSchedule = async (id: number): Promise<void> => {
  if (!id) {
    throw new Error("Schedule ID is required");
  }

  try {
    await db.runAsync("DELETE FROM schedules WHERE id = ?", [id]);
  } catch (error) {
    console.error("Failed to delete schedule:", error);
    throw error;
  }
};

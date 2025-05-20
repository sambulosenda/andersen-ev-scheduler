import { create } from 'zustand';
import { getSchedules, createSchedule, updateSchedule, deleteSchedule } from '../database/database';
import { Schedule } from '../types';
import { useAuthStore } from './auth-store';

interface ScheduleState {
  schedules: Schedule[];
  loading: boolean;
  error: string | null;
  loadSchedules: () => Promise<void>;
  addSchedule: (schedule: Schedule) => Promise<number>;
  editSchedule: (id: number, schedule: Schedule) => Promise<void>;
  removeSchedule: (id: number) => Promise<void>;
  clearError: () => void;
}

export const useScheduleStore = create<ScheduleState>((set, get) => ({
  schedules: [],
  loading: false,
  error: null,
  
  loadSchedules: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    set({ loading: true, error: null });
    
    try {
      const userSchedules = await getSchedules(user.id);
      set({ schedules: userSchedules, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to load schedules',
        loading: false
      });
      console.error('Error loading schedules:', err);
    }
  },
  
  addSchedule: async (schedule: Schedule): Promise<number> => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');
    
    // Check if the user already has 10 schedules
    const currentSchedules = get().schedules;
    if (currentSchedules.length >= 10) {
      set({
        error: 'Maximum limit of 10 schedules reached',
        loading: false
      });
      throw new Error('Maximum limit of 10 schedules reached');
    }
    
    set({ loading: true, error: null });
    
    try {
      // Add user_id to the schedule
      const newSchedule = {
        ...schedule,
        user_id: user.id,
      };
      
      const scheduleId = await createSchedule(newSchedule);
      
      // Reload schedules to get the updated list
      await get().loadSchedules();
      
      return scheduleId;
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to add schedule',
        loading: false
      });
      console.error('Error adding schedule:', err);
      return 0;
    }
  },
  
  editSchedule: async (id: number, schedule: Schedule): Promise<void> => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');
    
    set({ loading: true, error: null });
    
    try {
      await updateSchedule(id, schedule);
      
      // Reload schedules to get the updated list
      await get().loadSchedules();
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to update schedule',
        loading: false
      });
      console.error('Error updating schedule:', err);
    }
  },
  
  removeSchedule: async (id: number): Promise<void> => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');
    
    set({ loading: true, error: null });
    
    try {
      await deleteSchedule(id);
      
      // Reload schedules to get the updated list
      await get().loadSchedules();
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to delete schedule',
        loading: false
      });
      console.error('Error deleting schedule:', err);
    }
  },
  
  clearError: () => {
    set({ error: null });
  }
}));
export type ScheduleType = 'time' | 'charge' | 'mileage';
export type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface User {
  id: number;
  username: string;
  email: string | null;
}

export interface Schedule {
  id?: number;
  user_id: number;
  name: string;
  schedule_type: ScheduleType;
  days: Day[];
  
  // Time-based schedule
  start_time?: string;
  end_time?: string;
  
  // Charge-based schedule
  ready_by_time?: string;
  desired_charge_level?: number;
  
  // Mileage-based schedule
  ready_by_time_mileage?: string;
  desired_mileage?: number;
  
  created_at?: string;
  updated_at?: string;
}
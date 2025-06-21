// src/types/index.ts
export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
}

export interface Medication {
  id: string;
  userId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  reminderTimes: string[];
  notes?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicationHistory {
  id: string;
  medicationId: string;
  userId: string;
  takenAt: Date;
  scheduledTime: Date;
  status: 'taken' | 'missed' | 'skipped';
  notes?: string;
}

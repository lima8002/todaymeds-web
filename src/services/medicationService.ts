import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Medication } from '@/types';

const COLLECTION_NAME = 'medications';

export class MedicationService {
  // Get all medications for a user
  static async getUserMedications(userId: string): Promise<Medication[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('userId', '==', userId),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const medications: Medication[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        medications.push({
          id: doc.id,
          ...data,
          startDate: data.startDate.toDate(),
          endDate: data.endDate ? data.endDate.toDate() : undefined,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as Medication);
      });

      return medications;
    } catch (error) {
      console.error('Error fetching medications:', error);
      throw error;
    }
  }

  // Get single medication
  static async getMedication(medicationId: string): Promise<Medication | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, medicationId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          startDate: data.startDate.toDate(),
          endDate: data.endDate ? data.endDate.toDate() : undefined,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as Medication;
      }

      return null;
    } catch (error) {
      console.error('Error fetching medication:', error);
      throw error;
    }
  }

  // Add new medication
  static async addMedication(
    medicationData: Omit<Medication, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...medicationData,
        startDate: Timestamp.fromDate(medicationData.startDate),
        endDate: medicationData.endDate
          ? Timestamp.fromDate(medicationData.endDate)
          : null,
        createdAt: now,
        updatedAt: now,
      });

      return docRef.id;
    } catch (error) {
      console.error('Error adding medication:', error);
      throw error;
    }
  }

  // Update medication
  static async updateMedication(
    medicationId: string,
    medicationData: Partial<Medication>
  ): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, medicationId);
      const updateData: any = {
        ...medicationData,
        updatedAt: Timestamp.now(),
      };

      // Convert dates to Timestamps if they exist
      if (medicationData.startDate) {
        updateData.startDate = Timestamp.fromDate(medicationData.startDate);
      }
      if (medicationData.endDate) {
        updateData.endDate = Timestamp.fromDate(medicationData.endDate);
      }

      // Remove fields that shouldn't be updated
      delete updateData.id;
      delete updateData.createdAt;

      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating medication:', error);
      throw error;
    }
  }

  // Delete medication (soft delete)
  static async deleteMedication(medicationId: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, medicationId);
      await updateDoc(docRef, {
        isActive: false,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error deleting medication:', error);
      throw error;
    }
  }

  // Search medications
  static async searchMedications(
    userId: string,
    searchTerm: string
  ): Promise<Medication[]> {
    try {
      const medications = await this.getUserMedications(userId);
      return medications.filter(
        (med) =>
          med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          med.dosage.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (med.notes &&
            med.notes.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    } catch (error) {
      console.error('Error searching medications:', error);
      throw error;
    }
  }
}

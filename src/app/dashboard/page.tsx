'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardPage() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Failed to log out');
    }
  };

  return (
    <ProtectedRoute>
      <Layout title="Dashboard - TodayMeds">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {currentUser?.displayName || currentUser?.email}!
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="font-semibold text-primary-900">
                Today's Medications
              </h3>
              <p className="text-2xl font-bold text-primary-600">0</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900">Taken Today</h3>
              <p className="text-2xl font-bold text-green-600">0</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-900">Upcoming</h3>
              <p className="text-2xl font-bold text-orange-600">0</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-600">
              Your medication management dashboard will be built in the next
              phases!
            </p>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

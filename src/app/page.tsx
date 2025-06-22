'use client';

import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <Layout title="TodayMeds - Home">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to TodayMeds Web
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Your medication reminder app, now on the web
        </p>

        <div className="flex gap-4 justify-center">
          {currentUser ? (
            <Link href="/dashboard" className="btn-primary">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link href="/auth/register" className="btn-primary">
                Get Started
              </Link>
              <Link href="/auth/login" className="btn-secondary">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

// src/app/page.tsx
import Layout from '@/components/layout/Layout';

export default function Home() {
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
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>
    </Layout>
  );
}

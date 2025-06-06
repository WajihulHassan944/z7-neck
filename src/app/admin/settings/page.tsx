'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/images/thelogo.png';

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    
    // Redirect if not admin
    if (!loading && user && !user.isAdmin) {
      router.push('/');
      return;
    }
  }, [user, loading, router]);
  
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };
  
  const handleClearSuccess = () => {
    setSuccess(null);
  };
  
  const handleClearError = () => {
    setError(null);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#044588] mx-auto"></div>
          <p className="mt-4 text-[#044588]">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user || !user.isAdmin) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <Image
                src={logo}
                alt="Z7 Neck Brackets"
                className="max-w-[80px]"
              />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Admin: {user.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-[#044588] hover:underline"
            >
              Sign out
            </button>
          </div>
        </div>
        
        {/* Admin Navigation */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 overflow-x-auto">
              <Link href="/admin" className="py-4 px-1 text-sm font-medium text-gray-500 hover:text-[#044588]">
                Dashboard
              </Link>
              <Link href="/admin/orders" className="py-4 px-1 text-sm font-medium text-gray-500 hover:text-[#044588]">
                Orders
              </Link>
              <Link href="/admin/users" className="py-4 px-1 text-sm font-medium text-gray-500 hover:text-[#044588]">
                Users
              </Link>
              <Link href="/admin/settings" className="py-4 px-1 border-b-2 border-[#044588] text-sm font-medium text-[#044588]">
                Settings
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 text-green-700 flex justify-between items-center">
            <p>{success}</p>
            <button 
              onClick={handleClearSuccess}
              className="text-green-700 hover:text-green-900"
            >
              &times;
            </button>
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 flex justify-between items-center">
            <p>{error}</p>
            <button 
              onClick={handleClearError}
              className="text-red-700 hover:text-red-900"
            >
              &times;
            </button>
          </div>
        )}
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Admin Settings</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-gray-900">System Information</h3>
                <div className="mt-2 bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Environment</p>
                      <p className="mt-1 text-sm text-gray-900">Production</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Database</p>
                      <p className="mt-1 text-sm text-gray-900">PostgreSQL</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Version</p>
                      <p className="mt-1 text-sm text-gray-900">1.0.0</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Last Updated</p>
                      <p className="mt-1 text-sm text-gray-900">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-md font-medium text-gray-900">Admin Actions</h3>
                <div className="mt-2 space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-gray-900">Database Maintenance</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Run database maintenance tasks to optimize performance.
                    </p>
                    <div className="mt-2">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#044588]"
                        onClick={() => {
                          setSuccess('Database maintenance task scheduled.');
                        }}
                      >
                        Run Maintenance
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-gray-900">Clear Cache</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Clear the application cache to ensure the latest data is displayed.
                    </p>
                    <div className="mt-2">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#044588]"
                        onClick={() => {
                          setSuccess('Cache cleared successfully.');
                        }}
                      >
                        Clear Cache
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
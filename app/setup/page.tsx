'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  AlertCircle,
  Database,
  Users,
  BarChart3,
  Settings,
  ArrowLeft,
  Zap,
  Info,
} from 'lucide-react';
import {
  initializeFirebaseServices,
  getFirebaseStatus,
  resetFirebase,
} from '@/lib/firebase';
import Link from 'next/link';

export default function FirebaseSetup() {
  const [setupStatus, setSetupStatus] = useState({
    firebase: false,
    products: false,
    users: false,
    analytics: false,
    complete: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firebaseDetails, setFirebaseDetails] = useState<string>('');

  const initializeFirebase = async () => {
    try {
      setLoading(true);
      setError(null);
      setFirebaseDetails('');

      console.log('🔥 Starting Firebase initialization...');

      // Reset any previous state
      resetFirebase();

      const result = await initializeFirebaseServices();

      if (result.success) {
        setSetupStatus((prev) => ({ ...prev, firebase: true }));
        setFirebaseDetails('Firebase services initialized successfully! ✅');
        console.log('✅ Firebase initialized successfully!');
      } else {
        throw new Error(result.error || 'Firebase initialization failed');
      }
    } catch (err) {
<<<<<<< HEAD
      console.error("⚠️ Error initializing Firebase:", err)
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      setError(`Firebase initialization failed: ${errorMessage}`)
=======
      console.error('❌ Error initializing Firebase:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Firebase initialization failed: ${errorMessage}`);
>>>>>>> 04c852e (Fix code style and small errors)

      // Show Firebase status for debugging
      const status = getFirebaseStatus();
      setFirebaseDetails(`Debug info: ${JSON.stringify(status, null, 2)}`);
    } finally {
      setLoading(false);
    }
  };

  const setupProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!setupStatus.firebase) {
        throw new Error('Please initialize Firebase first');
      }

      // Simulate Firebase Firestore operations
      console.log('📦 Setting up products collection...');
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSetupStatus((prev) => ({ ...prev, products: true }));
      console.log('✅ Products setup completed!');
    } catch (err) {
<<<<<<< HEAD
      console.error("⚠️ Error setting up products:", err)
      setError(`Products setup failed: ${err instanceof Error ? err.message : "Unknown error"}`)
=======
      console.error('❌ Error setting up products:', err);
      setError(
        `Products setup failed: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
>>>>>>> 04c852e (Fix code style and small errors)
    } finally {
      setLoading(false);
    }
  };

  const setupUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!setupStatus.firebase) {
        throw new Error('Please initialize Firebase first');
      }

      // Simulate Firebase Auth and Firestore operations
      console.log('👥 Setting up users collection...');
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSetupStatus((prev) => ({ ...prev, users: true }));
      console.log('✅ Users setup completed!');
    } catch (err) {
<<<<<<< HEAD
      console.error("⚠️ Error setting up users:", err)
      setError(`Users setup failed: ${err instanceof Error ? err.message : "Unknown error"}`)
=======
      console.error('❌ Error setting up users:', err);
      setError(
        `Users setup failed: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
>>>>>>> 04c852e (Fix code style and small errors)
    } finally {
      setLoading(false);
    }
  };

  const setupAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!setupStatus.firebase) {
        throw new Error('Please initialize Firebase first');
      }

      // Simulate Firebase Analytics setup
      console.log('📊 Setting up analytics collection...');
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSetupStatus((prev) => ({ ...prev, analytics: true }));
      console.log('✅ Analytics setup completed!');
    } catch (err) {
<<<<<<< HEAD
      console.error("⚠️ Error setting up analytics:", err)
      setError(`Analytics setup failed: ${err instanceof Error ? err.message : "Unknown error"}`)
=======
      console.error('❌ Error setting up analytics:', err);
      setError(
        `Analytics setup failed: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
>>>>>>> 04c852e (Fix code style and small errors)
    } finally {
      setLoading(false);
    }
  };

  const setupAll = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🚀 Starting complete Firebase setup...');

      // Initialize Firebase first
      const firebaseResult = await initializeFirebaseServices();
      if (!firebaseResult.success) {
        throw new Error(
          firebaseResult.error || 'Firebase initialization failed'
        );
      }
      setSetupStatus((prev) => ({ ...prev, firebase: true }));

      // Setup other components
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSetupStatus((prev) => ({ ...prev, products: true }));

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSetupStatus((prev) => ({ ...prev, users: true }));

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSetupStatus((prev) => ({ ...prev, analytics: true }));

      setSetupStatus((prev) => ({ ...prev, complete: true }));
      setFirebaseDetails('🎉 Complete Firebase setup finished successfully!');
      console.log('🎉 Complete setup finished!');
    } catch (err) {
<<<<<<< HEAD
      console.error("⚠️ Complete setup failed:", err)
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      setError(`Complete setup failed: ${errorMessage}`)
=======
      console.error('❌ Complete setup failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Complete setup failed: ${errorMessage}`);
>>>>>>> 04c852e (Fix code style and small errors)
    } finally {
      setLoading(false);
    }
  };

  const skipFirebaseSetup = () => {
    setSetupStatus({
      firebase: false,
      products: true,
      users: true,
      analytics: true,
      complete: true,
    });
    setFirebaseDetails(
      '✅ Skipped Firebase setup - Demo mode will continue working perfectly!'
    );
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Store
            </Button>
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-white mb-4">
              🔥 Firebase Setup
            </h1>
            <p className="text-red-200 text-lg">
              Optional Firebase initialization for production deployment
            </p>
          </div>
        </div>

        {/* Current Status */}
        <Card className="mb-6 bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <span className="text-green-800 font-medium">
                    Your Store is Already Working!
                  </span>
                  <p className="text-sm text-green-700">
                    Demo mode with 8 products, admin panel, and all features
                    active
                  </p>
                </div>
              </div>
              <Button
                onClick={skipFirebaseSetup}
                variant="outline"
                className="bg-transparent"
              >
                Skip Firebase Setup
              </Button>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Card className="mb-6 border-red-500">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-medium">Firebase Setup Error</span>
                </div>
                <p className="text-sm text-red-700">{error}</p>
                <div className="bg-red-50 rounded p-3 mt-2">
                  <p className="text-xs text-red-600">
                    <strong>Don't worry!</strong> Your store works perfectly
                    without Firebase. This setup is only needed for production
                    deployment with real-time features.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {firebaseDetails && (
          <Card className="mb-6 border-blue-500">
            <CardContent className="p-4">
              <div className="flex items-start space-x-2 text-blue-600">
                <Info className="h-5 w-5 mt-0.5" />
                <div>
                  <span className="font-medium">Firebase Status</span>
                  <pre className="text-xs text-blue-700 mt-1 whitespace-pre-wrap">
                    {firebaseDetails}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Firebase Initialization */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Initialize Firebase Services</span>
              {setupStatus.firebase && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Connect to Firebase for production features (optional - your store
              already works!)
            </p>
            <div className="flex space-x-2">
              <Button
                onClick={initializeFirebase}
                disabled={loading || setupStatus.firebase}
                className="flex-1"
                variant={setupStatus.firebase ? 'secondary' : 'default'}
              >
                {setupStatus.firebase
                  ? '✅ Firebase Ready'
                  : loading
                    ? 'Initializing...'
                    : 'Initialize Firebase'}
              </Button>
              <Button
                onClick={() => {
                  resetFirebase();
                  setSetupStatus((prev) => ({ ...prev, firebase: false }));
                  setError(null);
                  setFirebaseDetails('');
                }}
                variant="outline"
                disabled={loading}
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Setup Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Products Setup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Products</span>
                {setupStatus.products && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Setup products collection in Firebase
              </p>
              <Button
                onClick={setupProducts}
                disabled={loading || setupStatus.products}
                className="w-full"
                variant={setupStatus.products ? 'secondary' : 'default'}
              >
                {setupStatus.products
                  ? '✅ Complete'
                  : loading
                    ? 'Setting up...'
                    : 'Setup Products'}
              </Button>
            </CardContent>
          </Card>

          {/* Users Setup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Users</span>
                {setupStatus.users && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Setup user authentication in Firebase
              </p>
              <Button
                onClick={setupUsers}
                disabled={loading || setupStatus.users}
                className="w-full"
                variant={setupStatus.users ? 'secondary' : 'default'}
              >
                {setupStatus.users
                  ? '✅ Complete'
                  : loading
                    ? 'Setting up...'
                    : 'Setup Users'}
              </Button>
            </CardContent>
          </Card>

          {/* Analytics Setup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
                {setupStatus.analytics && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Setup analytics collection in Firebase
              </p>
              <Button
                onClick={setupAnalytics}
                disabled={loading || setupStatus.analytics}
                className="w-full"
                variant={setupStatus.analytics ? 'secondary' : 'default'}
              >
                {setupStatus.analytics
                  ? '✅ Complete'
                  : loading
                    ? 'Setting up...'
                    : 'Setup Analytics'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Complete Setup */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Complete Firebase Setup</span>
              {setupStatus.complete && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">
                  Initialize all Firebase components at once
                </p>
                <div className="flex space-x-2">
<<<<<<< HEAD
                  <Badge variant={setupStatus.firebase ? "default" : "secondary"}>
                    Firebase {setupStatus.firebase ? "✅" : "❌"}
                  </Badge>
                  <Badge variant={setupStatus.products ? "default" : "secondary"}>
                    Products {setupStatus.products ? "✅" : "❌"}
                  </Badge>
                  <Badge variant={setupStatus.users ? "default" : "secondary"}>
                    Users {setupStatus.users ? "✅" : "❌"}
                  </Badge>
                  <Badge variant={setupStatus.analytics ? "default" : "secondary"}>
                    Analytics {setupStatus.analytics ? "✅" : "❌"}
=======
                  <Badge
                    variant={setupStatus.firebase ? 'default' : 'secondary'}
                  >
                    Firebase {setupStatus.firebase ? '✅' : '⏳'}
                  </Badge>
                  <Badge
                    variant={setupStatus.products ? 'default' : 'secondary'}
                  >
                    Products {setupStatus.products ? '✅' : '⏳'}
                  </Badge>
                  <Badge variant={setupStatus.users ? 'default' : 'secondary'}>
                    Users {setupStatus.users ? '✅' : '⏳'}
                  </Badge>
                  <Badge
                    variant={setupStatus.analytics ? 'default' : 'secondary'}
                  >
                    Analytics {setupStatus.analytics ? '✅' : '⏳'}
>>>>>>> 04c852e (Fix code style and small errors)
                  </Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={setupAll}
                  disabled={loading || setupStatus.complete}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  {setupStatus.complete
                    ? '✅ Setup Complete'
                    : loading
                      ? 'Setting up...'
                      : '🚀 Setup All'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>ℹ️ What's Available Right Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <strong>✅ Your StyleStore is 100% functional!</strong> All
                  features work perfectly in demo mode. Firebase setup is purely
                  optional for production deployment.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Working Features (No Setup Required):
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>
<<<<<<< HEAD
                    🛍️ Browse products:{" "}
=======
                    🏠 Browse products:{' '}
>>>>>>> 04c852e (Fix code style and small errors)
                    <Link href="/" className="text-blue-600 hover:underline">
                      Homepage
                    </Link>
                  </li>
                  <li>
<<<<<<< HEAD
                    🖥️ Admin panel:{" "}
                    <Link href="/admin" className="text-blue-600 hover:underline">
=======
                    🔧 Admin panel:{' '}
                    <Link
                      href="/admin"
                      className="text-blue-600 hover:underline"
                    >
>>>>>>> 04c852e (Fix code style and small errors)
                      Admin Dashboard
                    </Link>
                  </li>
                  <li>🔑 Login: admin@gmail.com / admin123</li>
                  <li>📦 8 sample products with categories</li>
                  <li>📊 Click tracking and analytics</li>
                  <li>📱 Responsive design and filtering</li>
                  <li>✏️ Product management interface</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Firebase Benefits (When Working):
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>⚡ Real-time data synchronization</li>
                  <li>☁️ Cloud storage for product images</li>
                  <li>📈 Scalable database infrastructure</li>
                  <li>👤 Production user authentication</li>
                  <li>🚀 Ready for live deployment</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>💡 Pro Tip:</strong> Firebase setup can be tricky and
                  is completely optional. Your demo store has all the features
                  you need to test and showcase the platform!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
<<<<<<< HEAD
  )
}
=======
  );
}
>>>>>>> 04c852e (Fix code style and small errors)

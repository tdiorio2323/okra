import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { FanLandingPage } from '@/components/core/FanLandingPage';
import { CreatorDashboard } from '@/components/creator/CreatorDashboard.simple';
import { SubscriptionFlow } from '@/components/payments/SubscriptionFlow';
import { AdminDashboard } from '@/components/admin/AdminDashboard.simple';
import { useOCRIntegration } from '@/services/OCRIntegration';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import type { 
  User, 
  Creator, 
  AnalyticsData, 
  OCRResult,
  SubscriptionTier 
} from '@/types';

// Mock data for development
const MOCK_CREATOR: Creator = {
  id: 'creator-1',
  user_id: 'user-1',
  stage_name: 'Rubi Rose',
  bio: 'Model • Artist • Entrepreneur. Creating exclusive content for my inner circle 💎',
  profile_image: '/api/placeholder/400/400',
  banner_image: '/api/placeholder/1200/400',
  social_links: {
    instagram: 'https://instagram.com/rubirose',
    twitter: 'https://twitter.com/rubirose',
    tiktok: 'https://tiktok.com/@rubirose'
  },
  settings: {
    pricing: {
      subscription_tiers: {
        basic: 19,
        premium: 75,
        elite: 200
      },
      message_price: 10,
      custom_request_price: 100
    },
    notifications: {
      new_subscribers: true,
      new_messages: true,
      tips_received: true,
      revenue_milestones: true
    },
    privacy: {
      show_online_status: true,
      auto_message_responses: false
    },
    content: {
      watermark_enabled: true,
      download_protection: true
    }
  },
  verified: true,
  created_at: '2025-01-01T00:00:00Z',
  updated_at: '2025-08-23T00:00:00Z',
  total_revenue: 125000,
  subscriber_count: 15420
};

const MOCK_ANALYTICS: AnalyticsData = {
  total_revenue: 125000,
  subscriber_count: 15420,
  content_views: 487000,
  engagement_rate: 0.085,
  top_content: [
    { id: '1', title: 'Behind the Scenes', views: 45000, revenue: 2500 },
    { id: '2', title: 'Q&A Session', views: 38000, revenue: 1800 },
    { id: '3', title: 'Exclusive Photoshoot', views: 52000, revenue: 3200 }
  ],
  revenue_by_tier: {
    basic: 45600,
    premium: 56250,
    elite: 23150
  },
  subscriber_growth: [
    { date: '2025-01-01', count: 8500 },
    { date: '2025-02-01', count: 10200 },
    { date: '2025-03-01', count: 12100 },
    { date: '2025-04-01', count: 13800 },
    { date: '2025-05-01', count: 15420 }
  ],
  recent_activity: [
    { type: 'new_subscriber', description: 'New VIP subscriber', timestamp: '2025-08-23T10:30:00Z' },
    { type: 'content_upload', description: 'Posted new content', timestamp: '2025-08-23T09:15:00Z' },
    { type: 'message_received', description: '3 new messages', timestamp: '2025-08-23T08:45:00Z' }
  ]
};

const MOCK_RECENT_CREATORS: Creator[] = [
  { ...MOCK_CREATOR, id: '1', stage_name: 'Rubi Rose', total_revenue: 125000, subscriber_count: 15420 },
  { ...MOCK_CREATOR, id: '2', stage_name: 'Megan Thee Stallion', total_revenue: 89000, subscriber_count: 12300 },
  { ...MOCK_CREATOR, id: '3', stage_name: 'Doja Cat', total_revenue: 76500, subscriber_count: 11800 },
  { ...MOCK_CREATOR, id: '4', stage_name: 'City Girls', total_revenue: 65000, subscriber_count: 9500 },
  { ...MOCK_CREATOR, id: '5', stage_name: 'Saweetie', total_revenue: 58000, subscriber_count: 8700 }
];

const MOCK_RECENT_OCR_PROCESSES: OCRResult[] = [
  {
    id: 'ocr_1',
    filename: 'instagram_profile_1.jpg',
    username: '@newcreator1',
    display_name: 'New Creator 1',
    platform: 'Instagram',
    follower_count: '85.2K',
    bio_text: 'Model • Content Creator • Entrepreneur',
    bio_links: ['https://linktr.ee/newcreator1'],
    extracted_links: [],
    suggested_tiers: [],
    revenue_projection: 15000,
    processed_at: '2025-08-23T12:00:00Z'
  }
];

interface AppState {
  currentUser: User | null;
  currentCreator: Creator | null;
  isAdmin: boolean;
  isLoading: boolean;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentUser: null,
    currentCreator: null,
    isAdmin: false,
    isLoading: true
  });

  const ocrIntegration = useOCRIntegration();

  useEffect(() => {
    // Simulate auth check
    setTimeout(() => {
      setAppState({
        currentUser: null,
        currentCreator: null,
        isAdmin: false,
        isLoading: false
      });
    }, 1000);
  }, []);

  const handleCreatorOnboarding = async (imageFile: File) => {
    try {
      const ocrResult = await ocrIntegration.processImage(imageFile);
      const creatorProfile = await ocrIntegration.createCreator(ocrResult);
      
      // In a real app, this would create the creator account
      console.log('Creator profile generated:', creatorProfile);
      
      return creatorProfile;
    } catch (error) {
      console.error('Creator onboarding failed:', error);
      throw error;
    }
  };

  const handleSubscription = async (creatorId: string, tier: SubscriptionTier, paymentMethod: string) => {
    // Mock subscription logic
    console.log(`Subscribing to creator ${creatorId} with tier ${tier} using ${paymentMethod}`);
    
    // Simulate payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          subscription_id: `sub_${Date.now()}`,
          creator_id: creatorId,
          tier,
          status: 'active'
        });
      }, 2000);
    });
  };

  if (appState.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Rubi Platform</h2>
          <p className="text-white/60">Initializing your experience...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
          <AnimatePresence mode="wait">
            {
              // Lazy-load site skeleton pages to avoid impacting initial bundle
            }
            {(() => {
              const SiteHome = lazy(() => import('@/components/site/pages/Home'));
              const SiteAbout = lazy(() => import('@/components/site/pages/About'));
              const SiteServices = lazy(() => import('@/components/site/pages/Services'));
              const SiteWork = lazy(() => import('@/components/site/pages/Work'));
              const SiteContact = lazy(() => import('@/components/site/pages/Contact'));
              return (
                <Routes>
                  {/* Site skeleton */}
                  <Route path="/site" element={<Suspense fallback={<div className="p-8 text-white">Loading…</div>}><SiteHome /></Suspense>} />
                  <Route path="/site/about" element={<Suspense fallback={<div className="p-8 text-white">Loading…</div>}><SiteAbout /></Suspense>} />
                  <Route path="/site/services" element={<Suspense fallback={<div className="p-8 text-white">Loading…</div>}><SiteServices /></Suspense>} />
                  <Route path="/site/work" element={<Suspense fallback={<div className="p-8 text-white">Loading…</div>}><SiteWork /></Suspense>} />
                  <Route path="/site/links" element={<Suspense fallback={<div className="p-8 text-white">Loading…</div>}>{React.createElement(lazy(() => import('@/components/site/pages/Links')))}</Suspense>} />
                  <Route path="/site/contact" element={<Suspense fallback={<div className="p-8 text-white">Loading…</div>}><SiteContact /></Suspense>} />
                  {/* Public Routes */}
                <Route 
                  path="/" 
                  element={
                    <FanLandingPage 
                      creator={MOCK_CREATOR}
                      onSubscribe={handleSubscription}
                    />
                  } 
                />
              
              <Route 
                path="/creator/:creatorId" 
                element={
                  <FanLandingPage 
                    creator={MOCK_CREATOR}
                    onSubscribe={handleSubscription}
                  />
                } 
              />
              
              <Route 
                path="/subscribe/:creatorId/:tier" 
                element={
                  <SubscriptionFlow 
                    creator={MOCK_CREATOR}
                    selectedTier="premium"
                    onSubscriptionComplete={(result) => {
                      console.log('Subscription completed:', result);
                      // Redirect to creator content or success page
                    }}
                  />
                } 
              />

              {/* Creator Routes */}
              <Route 
                path="/creator-dashboard" 
                element={
                  appState.currentCreator ? (
                    <CreatorDashboard 
                      creator={MOCK_CREATOR}
                      analytics={MOCK_ANALYTICS}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />

              {/* Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  appState.isAdmin ? (
                    <AdminDashboard
                      totalRevenue={2500000}
                      totalCreators={145}
                      totalUsers={25000}
                      activeSubscriptions={18500}
                      recentCreators={MOCK_RECENT_CREATORS}
                      recentOCRProcesses={MOCK_RECENT_OCR_PROCESSES}
                      platformAnalytics={MOCK_ANALYTICS}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />

              {/* Demo Routes for Development */}
              <Route 
                path="/demo/creator" 
                element={
                  <CreatorDashboard 
                    creator={MOCK_CREATOR}
                    analytics={MOCK_ANALYTICS}
                  />
                } 
              />

              <Route 
                path="/demo/admin" 
                element={
                  <AdminDashboard
                    totalRevenue={2500000}
                    totalCreators={145}
                    totalUsers={25000}
                    activeSubscriptions={18500}
                    recentCreators={MOCK_RECENT_CREATORS}
                    recentOCRProcesses={MOCK_RECENT_OCR_PROCESSES}
                    platformAnalytics={MOCK_ANALYTICS}
                  />
                } 
              />

              {/* OCR Integration Demo Route */}
              <Route 
                path="/demo/ocr-onboarding" 
                element={
                  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-md mx-auto p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                    >
                      <h2 className="text-2xl font-bold text-white mb-6 text-center">
                        Creator Onboarding Demo
                      </h2>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const profile = await handleCreatorOnboarding(file);
                              alert('Creator profile generated successfully! Check console for details.');
                            } catch (error) {
                              alert('OCR processing failed. Please try again.');
                            }
                          }
                        }}
                        className="w-full p-4 bg-white/5 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white hover:file:bg-purple-600"
                      />
                      <p className="text-white/60 text-sm mt-4 text-center">
                        Upload a social media profile screenshot to generate an automated creator profile
                      </p>
                    </motion.div>
                  </div>
                }
              />

                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              );
            })()}

            {
              // Willow Ryder site (config-driven) mounted at /willowryder/*
            }
            {(() => {
              // Import config and renderer locally to avoid impacting other routes
              const PageRenderer = lazy(() => import('./site-runtime/engine/PageRenderer'));
              const loadConfig = async () => (await import('./creators/willowryder/site.config')).default;

              const WillowRoutes = lazy(async () => {
                const cfg = await loadConfig();
                const Mod = () => (
                  <Suspense fallback={<div className="p-8 text-white">Loading…</div>}>
                    <Routes>
                      {cfg.pages.map(({ path, page }) => (
                        <Route
                          key={path}
                          path={path}
                          element={<PageRenderer page={page} theme={cfg.theme} nav={cfg.nav} footer={cfg.footer} />}
                        />
                      ))}
                      <Route
                        path="*"
                        element={<PageRenderer page={cfg.pages[0].page} theme={cfg.theme} nav={cfg.nav} footer={cfg.footer} />}
                      />
                    </Routes>
                  </Suspense>
                );
                return { default: Mod };
              });

              return <Route path="/willowryder/*" element={<Suspense fallback={<div className="p-8 text-white">Loading…</div>}><WillowRoutes /></Suspense>} />;
            })()}
          </AnimatePresence>

          {/* Global Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(15, 23, 42, 0.95)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)'
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: 'white'
                }
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: 'white'
                }
              }
            }}
          />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

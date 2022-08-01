import renderHydrogen from '@shopify/hydrogen/entry-server';
import {
  Router,
  Route,
  FileRoutes,
  ShopifyProvider,
  PerformanceMetricsServerAnalyticsConnector,
  CookieSessionStorage,
  ShopifyAnalytics,
} from '@shopify/hydrogen';
import {Suspense} from 'react';
import shopifyConfig from '../shopify.config';
import DefaultSeo from './components/DefaultSeo.server';
import NotFound from './components/NotFound.server';
import LoadingFallback from './components/LoadingFallback';
import CartProvider from './components/CartProvider.client';
import {
  PerformanceMetrics,
  PerformanceMetricsDebug,
} from '@shopify/hydrogen/client';

function App({routes}) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ShopifyProvider shopifyConfig={shopifyConfig}>
        <ShopifyAnalytics />
        <CartProvider>
          <DefaultSeo />
          <Router>
            <FileRoutes routes={routes} />
            <Route path="*" page={<NotFound />} />
          </Router>
        </CartProvider>
        <PerformanceMetrics />
        {process.env.LOCAL_DEV && <PerformanceMetricsDebug />}
      </ShopifyProvider>
    </Suspense>
  );
}

const routes = import.meta.globEager('./routes/**/*.server.[jt](s|sx)');

export default renderHydrogen(App, {
  routes,
  shopifyConfig,
  session: CookieSessionStorage('__session', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
  }),
  serverAnalyticsConnectors: [PerformanceMetricsServerAnalyticsConnector],
});

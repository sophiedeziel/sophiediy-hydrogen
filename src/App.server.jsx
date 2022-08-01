import renderHydrogen from '@shopify/hydrogen/entry-server';
import {
  Router,
  Route,
  FileRoutes,
  ShopifyProvider,
  ShopifyAnalytics,
  PerformanceMetrics,
  PerformanceMetricsDebug,
  LocalizationProvider,
} from '@shopify/hydrogen';
import {Suspense} from 'react';
import shopifyConfig from '../shopify.config';
import DefaultSeo from './components/DefaultSeo.server';
import NotFound from './components/NotFound.server';
import LoadingFallback from './components/LoadingFallback';
import CartProvider from './components/CartProvider.client';

function App({routes, request}) {
  const pathname = new URL(request.normalizedUrl).pathname;
  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : null;
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ShopifyProvider shopifyConfig={shopifyConfig}>
        <LocalizationProvider countryCode={countryCode}>
          <ShopifyAnalytics cookieDomain="sophiediy.shop" />
          <CartProvider>
            <DefaultSeo />
            <Router>
              <FileRoutes
                basePath={countryCode ? `/${countryCode}/` : null}
                routes={routes}
              />
              <Route path="*" page={<NotFound />} />
            </Router>
          </CartProvider>
          <PerformanceMetrics />
          {process.env.LOCAL_DEV && <PerformanceMetricsDebug />}
        </LocalizationProvider>
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);

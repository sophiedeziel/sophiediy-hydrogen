import {
    defineConfig,
    CookieSessionStorage,
    PerformanceMetricsServerAnalyticsConnector,
    ShopifyServerAnalyticsConnector,
   } from '@shopify/hydrogen/config'

export default defineConfig({
  routes: '/src/routes',
  shopify: {
    defaultLocale: 'fr',
    storeDomain: 'sophie-diy.myshopify.com',
    storefrontToken: 'd4cc7a336fc5d79ffc83f30067f9d489',
    storefrontApiVersion: '2022-07',
  },
  session: CookieSessionStorage('__session', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
  }),
  serverAnalyticsConnectors: [
    PerformanceMetricsServerAnalyticsConnector,
    ShopifyServerAnalyticsConnector,
  ],
});

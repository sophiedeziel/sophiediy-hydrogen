import {defineConfig} from '@shopify/hydrogen/config';

export default defineConfig({
  routes: import.meta.globEager('./src/routes/**/*.server.[jt](s|sx)'),
  shopify: {
    defaultLocale: 'fr',
    storeDomain: 'sophie-diy.myshopify.com',
    storefrontToken: 'd4cc7a336fc5d79ffc83f30067f9d489',
    storefrontApiVersion: '2022-07',
  },
});

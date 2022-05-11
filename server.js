import {hydrogenMiddleware} from '@shopify/hydrogen/middleware';
import serveStatic from 'serve-static';
import compression from 'compression';
import bodyParser from 'body-parser';
import connect from 'connect';
import path from 'path';
const port = process.env.PORT || 8080;
// Initialize your own server framework like connect
const app = connect();
// Add desired middlewares and handle static assets
app.use(compression());
app.use(serveStatic(path.resolve(__dirname, '../', 'client'), {index: false}));
app.use(bodyParser.raw({type: '*/*'}));
app.use(
  '*',
  hydrogenMiddleware({
    getServerEntrypoint: () => import('./src/App.server'),
    indexTemplate: () => import('./dist/client/index.html?raw'),
    // Optional: Provide a strategy for caching in production
    cache: customCacheImplementation,
  })
);
app.listen(port, () => {
  console.log(`Hydrogen server running at http://localhost:${port}`);
});
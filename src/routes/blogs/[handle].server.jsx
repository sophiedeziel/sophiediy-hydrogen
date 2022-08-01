import {
  flattenConnection,
  useShopQuery,
  useRouteParams,
  gql,
} from '@shopify/hydrogen';
import ArticleCard from '../../components/ArticleCard';

import Layout from '../../components/Layout.server';

export default function Blogs() {
  const {handle} = useRouteParams();

  const {
    data: {blog},
  } = useShopQuery({
    query: QUERY,
    variables: {
      handle,
    },
    preload: true,
  });

  const articles = flattenConnection(blog.articles);

  return (
    <Layout>
      <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-6 mt-6">
        {blog.title}
      </h1>
      <p className="text-sm text-gray-500 mt-5 mb-5">
        {articles.length} {articles.length > 1 ? 'articles' : 'article'}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </Layout>
  );
}

const QUERY = gql`
  query Blog($handle: String!) {
    blog(handle: $handle) {
      title
      articles(first: 20) {
        edges {
          node {
            title
            excerptHtml
            image {
              id
              altText
              height
              url
              width
            }
            publishedAt
            onlineStoreUrl
          }
        }
      }
    }
  }
`;

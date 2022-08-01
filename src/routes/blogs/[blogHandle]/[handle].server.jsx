import {useRouteParams, useShopQuery, gql} from '@shopify/hydrogen';

import Layout from '../../../components/Layout.server';
import NotFound from '../../../components/NotFound.server';

export default function Article() {
  const {handle, blogHandle} = useRouteParams();

  const {
    data: {blog},
  } = useShopQuery({
    query: QUERY,
    variables: {
      handle,
      blogHandle,
    },
    preload: true,
  });

  if (!blog) {
    return <NotFound />;
  }

  const article = blog.articleByHandle;

  return (
    <Layout>
      <div
        className="h-96 bg-sky-900 bg-cover"
        style={{backgroundImage: `url(${article.image.url})`}}
      >
        <div className="flex items-center justify-center backdrop-brightness-75 backdrop-blur-md w-full h-full">
          <div className="text-center">
            <h1 className="font-bold text-4xl md:text-5xl text-white mb-6 mt-6 drop-shadow-lg">
              {article.title}
            </h1>
          </div>

          <div className="flex justify-center mt-8"></div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-5 mb-5">
        {new Date(article.publishedAt).toLocaleDateString('fr-CA', {
          dateStyle: 'medium',
        })}
      </p>
      <div
        dangerouslySetInnerHTML={{__html: article.contentHtml}}
        className="prose prose-md max-w-none leading-relaxed prose-stone"
      />
    </Layout>
  );
}

const QUERY = gql`
  query Blog($blogHandle: String!, $handle: String!) {
    blog(handle: $blogHandle) {
      id
      title
      seo {
        title
        description
      }
      articleByHandle(handle: $handle) {
        id
        title
        publishedAt
        excerptHtml
        tags
        onlineStoreUrl
        contentHtml
        image {
          url(transform: {maxWidth: 400, maxHeight: 200, crop: CENTER})
          altText
          width
          height
        }
      }
    }
  }
`;

import {useShopQuery, Seo, CacheLong, gql} from '@shopify/hydrogen';

/**
 * A server component that fetches a `shop.name` and sets default values and templates for every page on a website
 */
export default function DefaultSeo() {
  const {
    data: {
      shop: {name, description},
    },
  } = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
    preload: '*',
  });

  return (
    <Seo
      type="defaultSeo"
      data={{
        title: name,
        description,
      }}
    />
  );
}

const QUERY = gql`
  query shopInfo {
    shop {
      name
      description
    }
  }
`;

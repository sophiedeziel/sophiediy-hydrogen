import {
  useShop,
  useShopQuery,
  Link,
  Seo,
  CacheDays,
  gql,
} from '@shopify/hydrogen';

import Layout from '../components/Layout.server';
import FeaturedCollection from '../components/FeaturedCollection';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero.client';
import {Suspense} from 'react';

export default function Index({country = {isoCode: 'US'}}) {
  return (
    <Layout hero={<Hero />}>
      <Suspense fallback={null}>
        <SeoForHomepage />
      </Suspense>
      <div className="relative mb-12 ">
        <Suspense fallback={<BoxFallback />}>
          <FeaturedProductsBox country={country} />
        </Suspense>
        <Suspense fallback={<BoxFallback />}>
          <FeaturedCollectionBox country={country} />
        </Suspense>
      </div>
    </Layout>
  );
}

function SeoForHomepage() {
  const {
    data: {
      shop: {title, description},
    },
  } = useShopQuery({
    query: SEO_QUERY,
    cache: CacheDays(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title,
        description,
      }}
    />
  );
}

function BoxFallback() {
  return <div className="bg-white p-12 shadow-xl mb-10 h-40"></div>;
}

function FeaturedProductsBox({country}) {
  const {languageCode} = useShop();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
      language: languageCode,
    },
    preload: true,
  });

  const collections = data ? data.collections.nodes : [];
  const featuredProductsCollection = collections[0];
  const featuredProducts = featuredProductsCollection
    ? featuredProductsCollection.products.nodes
    : null;

  return (
    <div className="bg-white p-12 shadow-xl  mb-10">
      {featuredProductsCollection ? (
        <>
          <div className="flex justify-between items-center mb-8 text-md font-medium">
            <span className="font-bold text-4xl md:text-5xl text-gray-900 mt-2">
              {featuredProductsCollection.title}
            </span>
            <span className="hidden md:inline-flex">
              <Link
                to={`/collections/${featuredProductsCollection.handle}`}
                className="text-blue-600 hover:underline"
              >
                Voir tout
              </Link>
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="md:hidden text-center">
            <Link
              to={`/collections/${featuredProductsCollection.handle}`}
              className="text-blue-600"
            >
              Shop all
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

function FeaturedCollectionBox({country}) {
  const {languageCode} = useShop();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
      language: languageCode,
    },
    preload: true,
  });

  const collections = data ? data.collections.nodes : [];
  const featuredCollection =
    collections && collections.length > 1 ? collections[1] : collections[0];

  return <FeaturedCollection collection={featuredCollection} />;
}

const SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      description
    }
  }
`;

const QUERY = gql`
  query indexContent($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(
      first: 2
      query: "(title:Objets imprimés en 3D) OR (title:stickers)"
    ) {
      nodes {
        handle
        id
        title
        image {
          id
          url
          altText
          width
          height
        }
        products(first: 3) {
          nodes {
            handle
            id
            title
            variants(first: 1) {
              nodes {
                id
                title
                availableForSale
                image {
                  id
                  url
                  altText
                  width
                  height
                }
                priceV2 {
                  currencyCode
                  amount
                }
                compareAtPriceV2 {
                  currencyCode
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

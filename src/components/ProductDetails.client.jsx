import {
  useProductOptions,
  ProductPrice,
  AddToCartButton,
  BuyNowButton,
  ProductOptionsProvider,
} from '@shopify/hydrogen/client';
import ProductOptions from './ProductOptions.client';
import Gallery from './Gallery.client';
import {
  BUTTON_PRIMARY_CLASSES,
  BUTTON_SECONDARY_CLASSES,
} from './Button.client';

function AddToCartMarkup() {
  const {selectedVariant} = useProductOptions();
  const isOutOfStock = !selectedVariant.availableForSale;

  return (
    <div className="space-y-2 mb-8">
      <AddToCartButton
        className={BUTTON_PRIMARY_CLASSES}
        disabled={isOutOfStock}
      >
        {isOutOfStock ? 'Non disponible' : 'Ajouter au panier'}
      </AddToCartButton>
      {isOutOfStock ? (
        <p className="text-black text-center">Disponible bientôt</p>
      ) : (
        <BuyNowButton
          variantId={selectedVariant.id}
          className={BUTTON_SECONDARY_CLASSES}
        >
          Acheter maintenant
        </BuyNowButton>
      )}
    </div>
  );
}

function SizeChart() {
  return (
    <>
      <h3
        className="text-xl text-black font-semibold mt-8 mb-4"
        id="size-chart"
      >
        Size Chart
      </h3>
      <table className="min-w-full table-fixed text-sm text-center bg-white">
        <thead>
          <tr className="bg-black text-white">
            <th className="w-1/4 py-2 px-4 font-normal">Board Size</th>
            <th className="w-1/4 py-2 px-4 font-normal">154</th>
            <th className="w-1/4 py-2 px-4 font-normal">158</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border border-black">Weight Range</td>
            <td className="p-3 border border-black">120-180 lbs. /54-82kg</td>
            <td className="p-3 border border-black">150-200 lbs. /68-91 kg</td>
          </tr>
          <tr>
            <td className="p-3 border border-black">Waist Width</td>
            <td className="p-3 border border-black">246mm</td>
            <td className="p-3 border border-black">255mm</td>
          </tr>
          <tr>
            <td className="p-3 border border-black">Stance Width</td>
            <td className="p-3 border border-black">-40</td>
            <td className="p-3 border border-black">-40</td>
          </tr>
          <tr>
            <td className="p-3 border border-black">Binding Sizes</td>
            <td className="p-3 border border-black">
              Men&rsquo;s S/M, Women&rsquo;s S/M
            </td>
            <td className="p-3 border border-black">
              Men&rsquo;s L, Women&rsquo;s L
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function ProductPrices({product}) {
  const {selectedVariant} = useProductOptions();

  return (
    <>
      <ProductPrice
        className="text-gray-500 line-through text-lg font-semibold"
        priceType="compareAt"
        variantId={selectedVariant.id}
        data={product}
      />
      <ProductPrice
        className="text-gray-900 text-lg font-semibold"
        variantId={selectedVariant.id}
        data={product}
      />
    </>
  );
}

export default function ProductDetails({product}) {
  const initialVariant = product.variants.nodes[0];

  return (
    <>
      <ProductOptionsProvider
        data={product}
        initialVariantId={initialVariant.id}
      >
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-x-8 my-16">
          <div className="md:hidden mt-5 mb-8">
            <h1 className="text-4xl font-bold text-gray-700 mb-4">
              {product.title}
            </h1>
            {product.vendor && (
              <div className="text-sm font-medium mb-2 text-gray-900">
                {product.vendor}
              </div>
            )}
            <span />
            <div className="flex justify-between md:block">
              <ProductPrices product={product} />
            </div>
          </div>

          <Gallery product={product} />

          <div>
            <div className="hidden md:block">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              <ProductPrices product={product} />
            </div>
            {/* Product Options */}
            <div className="mt-8">
              <ProductOptions />
              <AddToCartMarkup />
            </div>
            {/* Product Description */}
            <div className="prose pt-6 text-black text-md">
              {product.description}
            </div>
          </div>
        </div>
      </ProductOptionsProvider>
    </>
  );
}

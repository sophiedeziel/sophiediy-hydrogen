import {Image} from '@shopify/hydrogen';
import {Link} from '@shopify/hydrogen/client';

export default function ArticleCard({article}) {
  return (
    <div className="text-md mb-4 rounded-lg border-2 border-gray-200 bg-white relative">
      <Link to={article.onlineStoreUrl.replace('https://sophiediy.shop', '')}>
        <div className="overflow-hidden">
          {article.image ? (
            <Image
              className="rounded-t-lg max-h-72 transition-all duration-500 ease-in-out transform hover:scale-110 object-contain"
              data={article.image}
            />
          ) : null}
        </div>
        <div className="p-4">
          <div className="h-12">
            <div className="justify-between mb-0 text-md font-medium max-h-12">
              <h2 className="text-black uppercase">{article.title}</h2>
            </div>
            <div className="text-xs">
              <span>
                {new Date(article.publishedAt).toLocaleDateString('fr-CA', {
                  dateStyle: 'medium',
                })}
              </span>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{__html: article.excerptHtml}}
            className="prose mt-8"
          />
        </div>
      </Link>
    </div>
  );
}

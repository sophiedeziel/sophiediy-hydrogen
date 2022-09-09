import {Image} from '@shopify/hydrogen';
import {Link} from '@shopify/hydrogen/client';

export default function ArticleCard({article}) {
  return (
    <div className="text-md mb-4 bg-white relative">
      <Link to={'/blogs/news/' + article.handle}>
        <div className="overflow-hidden">
          {article.image ? (
            <Image
              className="max-h-72 transition-all duration-500 ease-in-out transform hover:scale-110 object-contain"
              data={article.image}
            />
          ) : null}
        </div>
        <div className="h-12">
          <div className="justify-between mt-2 mb-0 text-md font-medium max-h-12">
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
          className="prose mt-2"
        />
      </Link>
    </div>
  );
}

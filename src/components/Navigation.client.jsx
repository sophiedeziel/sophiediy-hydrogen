import {Link} from '@shopify/hydrogen/client';

/**
 * A client component that defines the navigation for a web storefront
 */
export default function Navigation({menu}) {
  return (
    <nav className="hidden lg:block text-center">
      <ul className="md:flex items-center justify-center">
        {menu.items?.map((item) => (
          <li key={item.id}>
            <Link
              to={item.url.replace('https://sophie-diy.myshopify.com', '')}
              className="block py-4 px-2 hover:text-yellow-400"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

import {useQuery} from '@shopify/hydrogen';

export default function useSophieDIYQuery(query, variables = {}) {
  return useQuery(query, async () => {
    const response = await fetch(
      process.env.NODE_ENV == 'development'
        ? 'https://sophiediy.herokuapp.com/graphql'
        : 'https://sophiediy.herokuapp.com/graphql',
      {
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          query,
          variables,
        }),
      },
    );
    return await response.json();
  }).data;
}

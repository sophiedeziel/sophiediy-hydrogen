import {useQuery} from '@shopify/hydrogen';

export default function useSophieDIYQuery(query, variables = {}) {
  return useQuery(query.definitions[0].name.value, async () => {
    const response = await fetch(
      process.env.NODE_ENV == 'development'
        ? 'http://localhost:5000/graphql'
        : 'https://sophiediy.herokuapp.com/graphql',
      {
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          query: query.loc.source.body,
          variables,
        }),
      },
    );
    return await response.json();
  }).data;
}

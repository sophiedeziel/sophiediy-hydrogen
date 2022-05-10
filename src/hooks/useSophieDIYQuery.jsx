import {useQuery} from '@shopify/hydrogen';

export default function useSophieDIYQuery(query, variables = {}) {
  return useQuery(query.definitions[0].name.value, async () => {
    const response = await fetch(
      'https://sophiediy.herokuapp.com/graphql.json',
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

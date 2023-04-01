import { Button, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query';

const client = new QueryClient();

export function ReactQuery() {
  return (
    <QueryClientProvider client={client}>
      <QueryComponent />
    </QueryClientProvider>
  );
}

function QueryComponent() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useIsEvenQuery();
  if (isLoading) return <Spinner />;
  if (isError) return <Text>Hiba</Text>;
  if (!data) return null;
  return (
    <>
      <Text my={10}>{data.iseven ? 'Páros' : 'Páratlan'}</Text>
      <Text my={10}>{data.ad}</Text>
      <Button onClick={() => queryClient.invalidateQueries('isEven')}>Refresh</Button>
    </>
  );
}

const useIsEvenQuery = () =>
  useQuery('isEven', async () => {
    const response = await axios.get<{ iseven: boolean; ad: string }>('https://api.isevenapi.xyz/api/iseven/420');
    return response.data;
  });

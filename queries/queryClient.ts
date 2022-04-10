import { QueryClient } from 'react-query';

// Override QueryClient Config go here
const config: ConstructorParameters<typeof QueryClient>[0] = {
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
      notifyOnChangeProps: 'tracked',
    },
  },
};

export const queryClient = new QueryClient(config);

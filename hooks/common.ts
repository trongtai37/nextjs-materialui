import { SafeAny } from '@/models/index';
import { isFunction } from 'lodash-es';
import React from 'react';
import { useQuery, useQueryClient } from 'react-query';

export const useGlobalState = <T>(key: SafeAny[], initialData: T) => {
  const queryClient = useQueryClient();
  const stateQueries = useQuery<T>(
    key,
    () => Promise.reject('This thing never happens.'),
    {
      initialData,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );

  const setData = React.useCallback(
    (param: React.SetStateAction<T>) => {
      const oldState = queryClient.getQueryData<T>(key)!;
      queryClient.setQueryData(
        key,
        isFunction(param) ? param(oldState) : param,
      );
    },
    [queryClient, key],
  );

  return {
    setData,
    data: stateQueries.data,
  };
};

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import * as API from '../../api/API';
import { Shops } from '../../type/shopType';
import { initialShops } from '../../type/utilType';

const fetchAllShops = async () => await API.get(`/api/shops`);

type useAllShopQuery = {
  onSuccessCb: (data: Shops[]) => void;
};

export const useAllShopQuery = ({ onSuccessCb }: useAllShopQuery) => {
  const {
    isLoading: isAllShopLoading,
    isError: isAllShopError,
    data: shops = [],
    isSuccess,
  } = useQuery<Shops[], AxiosError>(['shops'], () => fetchAllShops(), {
    refetchOnMount: false,
    staleTime: Infinity,
    cacheTime: Infinity,

    onSuccess: (data) => {
      onSuccessCb(data);
    },
  });

  return { isAllShopLoading, isAllShopError, shops, isSuccess };
};

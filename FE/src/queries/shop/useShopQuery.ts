import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import * as API from '../../api/API';
import { Shops } from '../../type/shopType';
import { initialShopState } from '../../type/utilType';

const fetchShop = async (shopId: number) => await API.get(`/api/shops/${shopId}`);

export const useShopQuery = (shopId: number) => {
  const {
    isLoading: isShopLoading,
    isError: isShopError,
    data: shopState = initialShopState,
    isSuccess,
  } = useQuery<Shops, AxiosError>(['shop', shopId], () => fetchShop(shopId), {
    refetchOnMount: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return { isShopLoading, isShopError, shopState, isSuccess };
};

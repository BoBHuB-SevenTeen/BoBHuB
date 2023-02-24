import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import * as API from '../../api/API';
import { Menu } from '../../type/menuType';

const fetchMenu = async (shopId: number) => await API.get(`/api/food?shopId=${shopId}`);

export const useMenuQuery = (shopId: number) => {
  const {
    isLoading: isMenuLoading,
    isError: isMenuError,
    data: menuState = [],
    isSuccess,
  } = useQuery<Menu[], AxiosError>(['menu', shopId], () => fetchMenu(shopId), {
    refetchOnMount: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return { isMenuLoading, isMenuError, menuState, isSuccess };
};

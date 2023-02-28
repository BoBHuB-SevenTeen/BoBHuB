import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import * as API from '../../api/API';
import { Category } from '../../type/shopType';

const fetchCategories = async () => await API.get(`/api/categories`);

export const useCategoryQuery = () => {
  const {
    isLoading: isCategoryLoading,
    isError: isCategoryError,
    data: categories = [],
    isSuccess,
  } = useQuery<Category[], AxiosError>(['categories'], () => fetchCategories(), {
    refetchOnMount: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return { isCategoryLoading, isCategoryError, categories, isSuccess };
};

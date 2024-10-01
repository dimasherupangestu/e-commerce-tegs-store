import { create } from 'zustand';
import { IProductDetail } from '../types/product-detail';

type ProductsResultState = {
    productsResult: {
      data: IProductDetail[];
      total: number;         
      currentPage: number;   
      totalPages: number; 
    };
    setProductsResult: (productsResult: {
      data: IProductDetail[];
      total: number;
      currentPage: number;
      totalPages: number;
    }) => void;
  }

  const useProductsResult = create<ProductsResultState>((set) => ({
    productsResult: { data: [], total: 0, currentPage: 1, totalPages: 0 },
    setProductsResult: (productsResult) => {
        console.log("Setting productsResult:", productsResult);
        set({ productsResult });
    },
}));


export default useProductsResult;

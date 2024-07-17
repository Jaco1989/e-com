import { PRODUCTS_URL, UPLOADS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getProducts: builder.query({
        query: () => ({
          url: PRODUCTS_URL,
        }),
        keepUnusedDataFor: 5,
        providesTags: ['products'],
      }),
      getProductDetails: builder.query({
        query: (productId) => ({
          url: `${PRODUCTS_URL}/${productId}`,
        }),
        keepUnusedDataFor: 5,
      }),
      createProduct: builder.mutation({
        query: () => ({
          url: `${PRODUCTS_URL}`,
          method: 'POST',
        }),
        invalidatesTags: ['products'],
      }),
      updateProduct: builder.mutation({
        query: (data) => ({
          url: `${PRODUCTS_URL}/${data.productId}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['products'],
      }),
      uploadProductImage: builder.mutation({
        query: (data) => ({
          url: `${UPLOADS_URL}`,
          method: 'POST',
          body: data,
        }),
      }),
      deleteProduct: builder.mutation({
        query: (productId) => ({
          url: `${PRODUCTS_URL}/${productId}`,
          method: 'DELETE',
        }),
        providesTags: ['products'],
      }),
    })
})

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation} 
= productsApiSlice
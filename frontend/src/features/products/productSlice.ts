import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Iproduct from '../../interface/product';
import api from '../../api/axiosConfig';


interface ProductsState {
  products: Iproduct[];
  selectedProduct: Iproduct | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await api.get('');
  return response.data.data
});

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product: Iproduct, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', product.title);
      formData.append('description', product.description);
      formData.append('price', product.price.toString());
      formData.append('category', product.category);
      formData.append('rating', product.rating.toString());

      if (product.imageUrl.startsWith('data:')) {
        const response = await fetch(product.imageUrl);
        const blob = await response.blob();
        formData.append('image', blob, 'product-image.jpg');
      } else {
        formData.append('imageUrl', product.imageUrl);
      }

      const response = await api.post('', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (product: Iproduct, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', product.title);
      formData.append('description', product.description);
      formData.append('price', product.price.toString());
      formData.append('category', product.category);
      formData.append('rating', product.rating.toString());

      if (product.imageUrl.startsWith('data:')) {
        const response = await fetch(product.imageUrl);
        const blob = await response.blob();
        formData.append('image', blob, 'product-image.jpg');
      } else {
        formData.append('imageUrl', product.imageUrl);
      }

      const response = await api.put(`/${product._id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
     return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Iproduct[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch products';
      });

    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Iproduct>) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch product';
      });

    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Iproduct>) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to add product';
      });

    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Iproduct>) => {
        state.loading = false;
        const index = state.products.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.selectedProduct = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to update product';
      });

    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.products = state.products.filter((product) => product._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to delete product';
      });
  },
});

export const { clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
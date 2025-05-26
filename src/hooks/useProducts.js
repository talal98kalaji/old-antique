import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';

export function useProducts(initialParams = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);
  
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAll(params);
      setProducts(data.results || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [params]);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  const updateParams = (newParams) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };
  
  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    updateParams,
  };
}

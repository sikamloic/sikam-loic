import { useState, useEffect, useCallback } from 'react';

interface UseDataResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useData<T>(
  fetcher: () => Promise<T>,
  dependencies: unknown[] = []
): UseDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    fetchData();
  }, [...dependencies, fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

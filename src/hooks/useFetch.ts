import { useEffect, useState, type DependencyList } from "react";

interface UseFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useFetch<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  dependencyList: DependencyList = [],
): UseFetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    fetcher(controller.signal)
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(
          err instanceof Error ? err : new Error("Something went wrong."),
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, dependencyList);

  return { data, isLoading, error };
}

import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type FetchNextPage = (
  options?: FetchNextPageOptions,
) => Promise<InfiniteQueryObserverResult>;

type ObserverType = {
  fetchNextPage: FetchNextPage;
  hasNextPage: boolean;
};

const useObserverInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
}: ObserverType) => {
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1, rootMargin: "40px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return {
    sentinelRef,
  };
};

export default useObserverInfiniteScroll;

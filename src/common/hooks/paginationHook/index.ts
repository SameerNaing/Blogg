import { useRef, useEffect, useCallback, useState } from "react";

import { Status } from "@/common/constants/status";

/**
 * Hook for pagination
 * @param hasMoreData - more data left to paginate
 * @param paginationStatus - paginate fetching data status
 */
function usePagination<T extends HTMLElement>(
  hasMoreData: boolean,
  paginationStatus: Status
) {
  /** html element to track */
  const ref = useRef<T>(null);

  /** track pagination page number */
  const [pageNumber, setPageNumber] = useState<number>(1);

  /** handler pagination pageNumber state */
  const handler = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (
        target.isIntersecting &&
        hasMoreData &&
        paginationStatus !== Status.Error &&
        paginationStatus !== Status.Loading
      ) {
        setPageNumber((prev) => prev + 1);
      }
    },
    [paginationStatus, hasMoreData]
  );

  /** set observer on html element */
  useEffect(() => {
    const observer = new IntersectionObserver(handler);
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [hasMoreData, paginationStatus]);

  return { ref, pageNumber };
}

export default usePagination;

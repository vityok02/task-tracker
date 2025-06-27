export interface PagedList<T> {
  totalCount: number;
  pageSize: number;
  items: T[];
  currentPageNumber: number;
  totalPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

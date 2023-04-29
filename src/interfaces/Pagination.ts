export interface IPaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

export interface IPaginationPropsHook {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
};
"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { setPage } from "@/redux/productSlice";

const PaginationControl = () => {
  const dispatch = useAppDispatch();
  const { currentPage, filteredProducts, itemsPerPage } = useAppSelector((state) => state.product);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="main-footer flex justify-center p-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setPage(Math.max(currentPage - 1, 1)));
              }}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={currentPage === i + 1}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setPage(i + 1));
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setPage(Math.min(currentPage + 1, totalPages)));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationControl;

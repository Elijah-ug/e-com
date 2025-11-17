import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

export const ProductPagination = ({ page, setPage, totalPages }) => {
  const [current, setCurrent] = useState(page);
  const pagesArr = Array.from({ length: totalPages }, (_, i) => i + 1);
  console.log("pagesArr=>", pagesArr);
  useEffect(() => {
    if (page) {
      console.log("page is ", page, typeof page);
      // setCurrent(page);
    }
  });
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="cursor-pointer hover:bg-gray-300"
          />
        </PaginationItem>

        {pagesArr.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              onClick={() => setPage(p)}
              className={page === p ? "text-gray-700 bg-gray-400 hover:bg-gray-300" : "hover:bg-gray-300"}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="cursor-pointer hover:bg-gray-300"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

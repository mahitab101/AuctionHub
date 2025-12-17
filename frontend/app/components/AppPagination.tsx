"use client";
import { Pagination } from "flowbite-react";
import { useState } from "react";
import MahiPagination from "./MahiPagination";

type AppPaginationProps = {
    currentPage: number;
    pageCount: number;
    pageChanged : (page:number)=> void;
}

export default function AppPagination({ currentPage, pageCount,pageChanged }: AppPaginationProps) {
    return (
//  <div className="flex justify-center">
//       <Pagination
//         currentPage={currentPage}
//         totalPages={pageCount}
//         onPageChange={pageChanged}
//         showIcons
//         className="
//           [&>ul]:flex
//           [&>ul]:flex-row
//           [&>ul]:items-center
//           [&>ul]:gap-2

//           [&_li]:list-none
//           [&_button]:rounded-lg
//           [&_button]:border
//           [&_button]:px-3
//           [&_button]:py-1
//           [&_button:hover]:bg-blue-100

//           [&_[aria-current='page']]:bg-blue-600
//           [&_[aria-current='page']]:text-white
//         "
//       />
//     </div>
<>
 <MahiPagination
      currentPage={currentPage}
      totalPages={pageCount}
      onPageChange={pageChanged}
    />
</>
    );
}

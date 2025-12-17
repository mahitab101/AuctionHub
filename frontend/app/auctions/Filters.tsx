'use client';

import { useParamsStore } from "@/hooks/useParsmsStore";
import { AiOutlineClockCircle, AiOutlineSortAscending } from "react-icons/ai";
import { BsFillStopCircleFill, BsStopwatchFill } from "react-icons/bs";
import { GiFinishLine, GiFlame } from "react-icons/gi";

const pageSizeButtons = [4, 8, 12];

const orderButtons = [
  { label: 'Alphabetical', icon: AiOutlineSortAscending, value: 'make' },
  { label: 'End date', icon: AiOutlineClockCircle, value: 'endingSoon' },
  { label: 'Recently added', icon: BsFillStopCircleFill, value: 'new' },
];
const filterButtons = [
  { label: 'Live', icon: GiFlame, value: 'live' },
  { label: 'Ending < 6 hours', icon: GiFinishLine, value: 'endingSoon' },
  { label: 'Completed', icon: BsStopwatchFill, value: 'finished' },
];

export default function Filters() {
  const { setParams, pageSize, orderBy,filterBy } = useParamsStore();

  function setPageSize(pageSize: number) {
    setParams({ pageSize });
  }

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <span className="uppercase text-sm text-gray-500 whitespace-nowrap">
          Filter
        </span>

        <div className="flex">
          {filterButtons.map(({label,icon:Icon,value}) => {

            return (
              <button
                key={label}
                onClick={() => setParams({filterBy:value})}
                className={`flex items-center gap-2 px-3 py-1 text-sm border-r border-gray-400 last:border-r-0
                   ${filterBy === value
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-400 hover:bg-gray-600 text-white'
                }
                  `}
              >
                <Icon className="mr-3 h-4 w-4" />
                {label}
              </button>
            );
          })}

        </div>
      </div>
      {/* Page Size */}
      <div className="flex items-center gap-3">
        <span className="uppercase text-sm text-gray-500 whitespace-nowrap">
          Page Size
        </span>

        <div className="flex">
          {pageSizeButtons.map((value) => (
            <button
              key={value}
              onClick={() => setPageSize(value)}
              className={`
                px-3 py-1 text-sm border-r border-gray-400 last:border-r-0
                ${pageSize === value
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-400 hover:bg-gray-600 text-white'
                }
              `}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-3">
        <span className="uppercase text-sm text-gray-500 whitespace-nowrap">
          Sort by
        </span>

        <div className="flex">
          {orderButtons.map(({label,icon:Icon,value}) => {

            return (
              <button
                key={label}
                onClick={() => setParams({orderBy:value})}
                className={`flex items-center gap-2 px-3 py-1 text-sm border-r border-gray-400 last:border-r-0
                   ${orderBy === value
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-400 hover:bg-gray-600 text-white'
                }
                  `}
              >
                <Icon className="mr-3 h-4 w-4" />
                {label}
              </button>
            );
          })}

        </div>
      </div>

    </div>
  );
}

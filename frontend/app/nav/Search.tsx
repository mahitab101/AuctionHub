'use client'
import { useParamsStore } from "@/hooks/useParsmsStore";
import { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const { searchTerm, setParams } = useParamsStore();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setParams({ searchTerm: e.target.value });
  }

  function handleSearch() {
    setParams({ searchTerm });
  }

  return (
    <div className="flex w-[50%] items-center border-2 border-gray-300 rounded-full py-2 shadow-sm">
      <input
        type="text"
        placeholder="Search for cars by make, model or color"
        className="grow pl-5 bg-transparent focus:outline-none text-sm text-gray-600"
        value={searchTerm ?? ''}
        onChange={handleChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}>
        <FaSearch
          className="bg-red-500 text-white rounded-full p-2 cursor-pointer mx-2"
          size={28}
        />
      </button>
    </div>
  );
}

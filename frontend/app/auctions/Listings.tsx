'use client'
import AuctionCard from "./AuctionCard";
import AppPagination from "../components/AppPagination";
import { useEffect, useState } from "react";
import { Auction, PageResult } from "@/types";
import { getData } from "../actions/auctionactions";
import Filters from "./Filters";
import { useParamsStore } from "@/hooks/useParsmsStore";
import { useShallow } from "zustand/shallow";
import queryString from "query-string";
import EmptyFilter from "../components/EmptyFilter";


export default function Listings() {
    const [data, setdata] = useState<PageResult<Auction>>();
    const params = useParamsStore(useShallow((state) => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        pageCount: state.pageCount,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy,
        seller: state.seller,
        winner: state.winner,
    })))

    const setParams = useParamsStore(state => state.setParams)

    const url = queryString.stringifyUrl({ url: '', query: params }, { skipEmptyString: true })

    function setPageNumber(pageNumber: number) {
        setParams({ pageNumber });
    }

    useEffect(() => {
        getData(url).then(data => {
            setdata(data);
        });
    }, [url])

    if (!data) return <h3>Loading...</h3>

    return (
        <>
            <Filters />
            {data?.totalCount === 0 ?
                (<EmptyFilter showReset />) : (
                    <>
                        <div className="grid grid-cols-4 gap-6">
                            {data && data.results.map((auction) => (
                                <AuctionCard auction={auction} key={auction.id} />
                            ))}
                        </div>
                        <div className="flex justify-center mt-4">
                            <AppPagination
                                pageChanged={setPageNumber}
                                currentPage={params.pageNumber}
                                pageCount={params.pageCount} />
                        </div>
                    </>
                )}

        </>
    )
}

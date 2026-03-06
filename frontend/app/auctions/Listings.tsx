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
import { useAuctionStore } from "@/hooks/useAuctionStore";


export default function Listings() {
    // const [data, setdata] = useState<PageResult<Auction>>();
    const [loading, setLoading] = useState<boolean>(true);
    const params = useParamsStore(useShallow((state) => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        pageCount: state.pageCount,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy,
        seller: state.seller,
        winner: state.winner,
    })));

    const data = useAuctionStore(useShallow((state)=>({
        auctions : state.auctions,
        totalCount : state.totalCount,
        pageCount : state.pageCount
    })))

    const setdata= useAuctionStore(state => state.setData)

    const setParams = useParamsStore(state => state.setParams)

    const url = queryString.stringifyUrl({ url: '', query: params }, { skipEmptyString: true })

    function setPageNumber(pageNumber: number) {
        setParams({ pageNumber });
    }

    useEffect(() => {
        getData(url).then(data => {
            setdata(data);
            setLoading(false);
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
                            {data && data.auctions.map((auction) => (
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

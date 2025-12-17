export type PageResult<T> = {
    results:    T[];
    pageCount:  number;
    totalCount: number;
}

export type Auction = {
  seller: string
  winner?: string
  soldAmount?: number
  currentHighBid?: number
  reservePrice?: number
  createdAt: string
  updatedAt: string
  auctionEnd: string
  status: string
  make: string
  model: string
  year: number
  color: string
  mileage: number
  imageUrl: string
  id: string
}

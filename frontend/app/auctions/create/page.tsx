import Heading from '@/app/components/Heading'
import React from 'react'
import AuctionForm from '../AuctionForm'

export default function Create() {
    return (
        <div className='mx-auto max-w-[75%] p-10 bg-white rounded-lg shadow-2xl'>

            <Heading title='Sell your car!' subTitle='Please enter the details of your car!' />
            <AuctionForm />
        </div>
    )
}

import { getAuctionDetails } from '@/app/actions/auctionactions';
import Heading from '@/app/components/Heading';
import AuctionForm from '../../AuctionForm';

export default async function Update({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auction = await getAuctionDetails(id);
  return (
           <div className='mx-auto max-w-[75%] p-10 bg-white rounded-lg shadow-2xl'>
   
               <Heading title='Update your auction!' subTitle='Please update the details of your car ( only these auction proberity can be updated )!' />
               <AuctionForm auction={auction} />
           </div>
  )
}

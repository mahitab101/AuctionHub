"use client";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import Input from "../components/Input";
import DateInput from "../components/DateInput";
import { createAuction, updateAuction } from "../actions/auctionactions";
import toast from "react-hot-toast";
import { Auction } from "@/types";
import { useEffect } from "react";

type AuctionFormProps = {
    auction?: Auction;
}

export default function AuctionForm({ auction }: AuctionFormProps) {
    const router = useRouter();
    const { control, handleSubmit, reset, setFocus,
        formState: { isSubmitting, isValid, isDirty } } = useForm({
            mode: "onTouched"
        });

    useEffect(() => {
        if(auction){
            const {make, model, color, mileage, year,imageUrl,reservePrice,auctionEnd} = auction;
            reset({make, model, color, mileage, year,imageUrl,reservePrice,auctionEnd})
        }
        setFocus('make')
    }, [setFocus,auction,reset])

    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    async function onSubmit(data: FieldValues) {
        try {
             let id='';
            let res;
            await delay(2000);
            if(auction){
                res = await updateAuction(data,auction.id);
                id=auction.id
            }else{
                 res = await createAuction(data);
                 id=res.id
            }
            if (res.error) throw res.error;

            router.push(`/auctions/details/${id}`)

        } catch (error: any) {
            toast.error(error.status + ' ' + error.message);
            console.log(error);
        }
    }

    return (
        <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
            <Input
                name="make"
                control={control}
                label="Make"
                rules={{ required: "Make is required" }}
            />

            <Input
                name="model"
                control={control}
                label="Model"
                rules={{ required: "Model is required" }}
            />
            <Input
                name="color"
                control={control}
                label="color"
                rules={{ required: "color is required" }}
            />

            <div className="grid grid-cols-2 gap-3">
                <Input
                    name="year"
                    control={control}
                    label="year"
                    type="number"
                    rules={{ required: "year is required" }}
                />
                <Input
                    name="mileage"
                    control={control}
                    label="Mileage"
                    type="number"
                    rules={{ required: "mileage is required" }}
                />
            </div>
            <Input
                name="imageUrl"
                control={control}
                label="Image Url"
                type="text"
                rules={{ required: "Image Url is required" }}
            />
            <div className="grid grid-cols-2 gap-3">
                <Input
                    name="reservePrice"
                    control={control}
                    label="reserved Price (enter 0 if no reserve)"
                    type="number"
                    rules={{ required: "Reserved Price is required" }}
                />
                <DateInput
                    name="auctionEnd"
                    disabled={!!auction}
                    control={control}
                    label="auction End date/time"
                    showTimeSelect
                    dateFormat={"dd MMMM yyyy h:mm a"}
                    rules={{ required: "Auction end date is required" }}
                />
            </div>

            <div className="flex justify-between">
                <button className="
                            px-4 py-2 rounded-md border-2 flex items-center justify-center gap-2
                            bg-amber-500 text-white border-amber-500
                            hover:bg-amber-600 transition-colors"
                    type="button"
                    onClick={() => router.push('/')}>
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={!isValid || !isDirty || isSubmitting}
                    className="
                            px-4 py-2 rounded-md border-2 flex items-center justify-center gap-2
                            bg-green-500 text-white border-green-500
                            hover:bg-green-600 transition-colors
                            disabled:bg-gray-300
                            disabled:border-gray-300
                            disabled:text-gray-600
                            disabled:cursor-not-allowed
                            disabled:hover:bg-gray-300
                            "
                >
                    {isSubmitting && <FaSpinner className="animate-spin" />}
                      {auction ? 'Update Auction' : 'Create Auction'}
                </button>


            </div>
        </form>
    )
}

"use client";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import Input from "../components/Input";
import DateInput from "../components/DateInput";

export default function AuctionForm() {
    const router = useRouter();
    const { control, handleSubmit,
        formState: { isSubmitting, isValid, isDirty } } = useForm({
            mode:"onTouched"
        });

    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    async function onSubmit(data: FieldValues) {
        await delay(2000)
        console.log(data);

    }
    return (
        <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
            {/* <div className='mb-3 block'>
                <input
                    type="text"
                    {...register("make", { required: "make is required" })}
                    placeholder="Make"
                    className={clsx(
                        "w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2",
                        errors.make
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    )}
                />
                {errors.make && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.make.message as string}
                    </p>
                )}

            </div>
            <div className='mb-3 block'>
                <input
                    type="text"
                    {...register("model", { required: "model is required" })}
                    placeholder="model"
                    className={clsx(
                        "w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2",
                        errors.model
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    )}
                />
                {errors.model && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.model.message as string}
                    </p>
                )}

            </div> */}
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

            <div className="grid grid-cols-2 gap-3">
                <Input
                    name="reservedPrice"
                    control={control}
                    label="reserved Price (enter 0 if no reserve)"
                    type="number"
                    rules={{ required: "Reserved Price is required" }}
                />
                <DateInput
                    name="auctionEnd"
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
                    Submit
                </button>


            </div>
        </form>
    )
}

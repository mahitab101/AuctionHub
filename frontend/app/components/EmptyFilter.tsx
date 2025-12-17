import { useParamsStore } from "@/hooks/useParsmsStore";
import Heading from "./Heading";

type EmptyFilterProps = {
    title?: string;
    subTitle?: string;
    showReset?: boolean;
}
export default function EmptyFilter(
    { title = 'No matches for this filter',
        subTitle = 'Try changing the filter or search term',
        showReset }
        : EmptyFilterProps) {
    const { reset } = useParamsStore();
    return (
        <div className="flex flex-col gap-2 items-center justify-center h-[40vh] shadow-lg">
            <Heading title={title} subTitle={subTitle} center />
            <div className="mt-4">
                {showReset &&
                    <button
                        className="inline-flex items-center justify-center
                                    px-4 py-2 text-sm font-medium
                                    rounded-lg
                                    bg-gray-600 text-white
                                    hover:bg-gray-600
                                    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                                    transition"
                        onClick={reset}>
                        Reset</button>
                }
            </div>
        </div>
    )
}

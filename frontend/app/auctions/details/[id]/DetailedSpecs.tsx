'use client';

import { Auction } from "@/types";

type DetailedSpecsProps = {
    auction: Auction;
};

export default function DetailedSpecs({ auction }: DetailedSpecsProps) {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-400">
                    <tr className="bg-white dark:bg-gray-200">
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-dark"
                        >
                            Seller
                        </th>
                        <td className="px-6 py-4">
                            {auction.seller}
                        </td>
                    </tr>

                    <tr className="bg-white dark:bg-gray-100">
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-dark"
                        >
                            Make
                        </th>
                        <td className="px-6 py-4">
                            {auction.make}
                        </td>
                    </tr>

                    <tr className="bg-white dark:bg-gray-100">
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-dark"
                        >
                            Model
                        </th>
                        <td className="px-6 py-4">
                            {auction.model}
                        </td>
                    </tr>

                    <tr className="bg-white dark:bg-gray-100">
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-dark"
                        >
                            Year manufactured
                        </th>
                        <td className="px-6 py-4">
                            {auction.year}
                        </td>
                    </tr>

                    <tr className="bg-white dark:bg-gray-100">
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-dark"
                        >
                            Mileage
                        </th>
                        <td className="px-6 py-4">
                            {auction.mileage}
                        </td>
                    </tr>

                    <tr className="bg-white dark:bg-gray-100">
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-dark"
                        >
                            Has reserve price?
                        </th>
                        <td className="px-6 py-4">
                            {auction.reservePrice > 0 ? 'Yes' : 'No'}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

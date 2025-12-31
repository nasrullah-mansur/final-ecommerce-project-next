import FlashDealItem from '@/components/share/flashDealItem'
import React from 'react'

export default function FlashDeal() {
    return (
        <>
            <div className="my-container">
                <div className="flex items-end border-b-2 border-gray-200">
                    <h2 className="text-2xl font-semibold py-2">
                        <span className="border-b-2 border-primary -mb-0.5 py-2">Flash Deal</span>
                    </h2>


                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 my-container py-6">
                <FlashDealItem />
                <FlashDealItem />
            </div>
        </>
    )
}

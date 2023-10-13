import OrderCard from '@/app/components/OrderCard'
import React from 'react'

export default function page() {
    return (
        <div className='bg-white px-3 py-10 space-y-5'>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
        </div>
    )
}

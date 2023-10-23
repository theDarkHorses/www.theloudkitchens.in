import OrderCard from '@/app/components/OrderCard'
import { DB } from '@/app/firebaseConfig'
import { auth } from '@clerk/nextjs'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import React from 'react'

async function getOrders() {
    const { userId } = auth()
    const ordersRef = collection(DB, "orders");
    const ordersQuery = query(ordersRef, where("userId", "==", userId), orderBy("createdAt", "desc"));
    const orders = await getDocs(ordersQuery)
    return orders.docs.map(doc => ({ id: doc.id, ...doc.data() }))

}

export default async function page() {
    const orders = await getOrders()
    return (
        <div className='bg-white px-3 py-10 space-y-5'>
            {orders.map((order) =>
                <OrderCard
                    key={order.id} orderId={order.id}
                    address={`${order.selectedAddress.name}, ${order.selectedAddress.address}, ${order.selectedAddress.landmark}`}
                    total={order.total}
                    status={order.status}
                    time={order.createdAt}
                    cartItems={order.items}
                    orderStatus={order.status}
                />)}
        </div>
    )
}

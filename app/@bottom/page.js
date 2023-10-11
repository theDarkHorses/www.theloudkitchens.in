import React from 'react'

const fetchRight = async () => {
    return new Promise((resolve)=>setTimeout(()=>resolve(200),2000))
}

export default async function page() {
    const res = await fetchRight()
    return (
        <div className='w-1/2'>{JSON.stringify(res)}</div>
    )
}

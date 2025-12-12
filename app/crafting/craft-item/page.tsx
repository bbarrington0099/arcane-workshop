// render the component returned by items-logic.tsx
import React, { Suspense } from 'react'
import CraftItemContent from './_components/CraftItemContent';

export interface CraftItemPageComponentProps {
    items: string
}

export interface CraftItemPageProps {
    searchParams: Promise<{
        ["item-type"]: string
        items: string
    }>
}
const CraftItemPage = async (props: CraftItemPageProps) => {    
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CraftItemContent {...props} />
        </Suspense>
    )
}

export default CraftItemPage
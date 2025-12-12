import React from 'react'
import { CraftingItemType, getCraftingItems } from '../items-logic';
import { notFound } from 'next/navigation';
import { CraftItemPageProps, CraftItemPageComponentProps } from '../page';
import { Smithing_Item_Category } from '@prismagen/index';

const itemTypeMap: Record<string, CraftingItemType> = {
    'weapons': Smithing_Item_Category.WEAPONS,
    'armor': Smithing_Item_Category.ARMOR
};

const CraftItemContent = async (props: CraftItemPageProps) => {
    const searchParams = await props.searchParams;
    const item_type = itemTypeMap[searchParams["item-type"].toLowerCase()];
    const items = searchParams.items.toLowerCase();
    
    const Component = getCraftingItems(item_type) as React.ComponentType<CraftItemPageComponentProps>;

    if (!Component) notFound();

    return <Component items={items} />;
}

export default CraftItemContent
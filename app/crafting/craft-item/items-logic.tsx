// determine which _items_client to render
import React from 'react'
import WeaponsItems from './_components/WeaponsItems';
import ArmorItems from './_components/ArmorItems';
import { Smithing_Item_Category } from "@prismagen/index";

export type CraftingItemType = Smithing_Item_Category;

export const getCraftingItems = (item_type: CraftingItemType) => {
    switch (item_type) {
        case Smithing_Item_Category.WEAPONS:
            return WeaponsItems
        case Smithing_Item_Category.ARMOR:
            return ArmorItems
        default:
            return null;
    }
}

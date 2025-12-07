"use cache";

import { slugToEnum } from '@lib/utils'
import CraftingPageClient from '../CraftingPageClient'
import { Crafting_Category, Smithing_Item_Category } from '@prismagen/client'
import { notFound } from 'next/navigation'
import { getCraftingItemCategories } from './category_page_logic'

export const generateStaticParams = async () => {
    return Object.values(Crafting_Category).map(category => ({
        category: category.toString()
    }));
}

interface CraftingCategoryPageProps {
    params: Promise<{
        category: string
    }>
}
const CraftingCategoryPage = async (props: CraftingCategoryPageProps) => {
    const params = await props.params;
    const craftingCategory = slugToEnum(params.category) as Crafting_Category;
    const craftingItemCategories = getCraftingItemCategories(craftingCategory);

    if (!craftingItemCategories) notFound();

    return (
        <CraftingPageClient categories={craftingItemCategories}/>
    )
}

export default CraftingCategoryPage
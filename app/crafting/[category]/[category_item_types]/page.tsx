"use cache";

import { enumToSlug, slugToEnum } from '@lib/utils';
import { Crafting_Category, Smithing_Item_Category } from '@prismagen/client';
import React, { Suspense } from 'react'
import { notFound } from 'next/navigation';
import { getCraftingItemTypes } from './crafting_item_page_logic';

export const generateStaticParams = async () => {
  const params: { category: string; category_item_types: string }[] = [];

  Object.values(Smithing_Item_Category).forEach(itemType => {
    params.push({
      category: enumToSlug(Crafting_Category.SMITHING),
      category_item_types: enumToSlug(itemType)
    });
  });

  return params;
}

interface CraftingItemTypePageProps {
  params: Promise<{
    category: string
    category_item_types: string
  }>
}
const CraftingItemTypePage = async (props: CraftingItemTypePageProps) => {
  const params = await props.params;
  const category = slugToEnum(params.category) as Crafting_Category;
  const itemType = slugToEnum(params.category_item_types) as Smithing_Item_Category
  
  const Component = getCraftingItemTypes(category, itemType);

  if (!Component) notFound();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  )
}

export default CraftingItemTypePage
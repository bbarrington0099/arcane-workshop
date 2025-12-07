"use cache";

import { Crafting_Category } from '@prismagen/client';
import CraftingPageClient from './CraftingPageClient';
import { cacheLife } from 'next/cache';
import { CACHE_LIFE } from '@lib/db';

const CraftingPage = async () => {
  cacheLife(CACHE_LIFE);

  const craftingCategories = Object.values(Crafting_Category);
  
  return (
    <CraftingPageClient categories={craftingCategories} />
  )
}

export default CraftingPage
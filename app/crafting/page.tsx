"use cache";

import { Crafting_Category } from '@prismagen/client';
import CraftingPageClient from './CraftingPageClient';

const CraftingPage = async () => {
  const craftingCategories = Object.values(Crafting_Category);
  
  return (
    <CraftingPageClient categories={craftingCategories} />
  )
}

export default CraftingPage
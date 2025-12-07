import { Crafting_Category, Smithing_Item_Category } from "@prismagen/index";

export const getCraftingItemCategories = (craftingCategory: Crafting_Category) => {
    switch (craftingCategory) {
        case Crafting_Category.SMITHING:
            return Object.values(Smithing_Item_Category);
        default:
            return null;
    }
}
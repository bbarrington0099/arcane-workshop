import { Crafting_Category, Smithing_Item_Category } from "@prismagen/index";
import SmithingItemWeaponTypes from "./_item_type_clients/SmithingItemWeaponTypes";
import SmithingItemArmorTypes from "./_item_type_clients/SmithingItemArmorTypes";

export const getCraftingItemTypes = (craftingCategory: Crafting_Category, itemType: Smithing_Item_Category) => {
    switch (craftingCategory) {
    case Crafting_Category.SMITHING:
        switch (itemType) {
            case Smithing_Item_Category.WEAPONS:
                return SmithingItemWeaponTypes
            case Smithing_Item_Category.ARMOR:
                return SmithingItemArmorTypes
            default:
                return null;
            }
    default:
        return null;
    }
}
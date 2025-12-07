import * as db from './db'
import * as Prisma from '@prismagen/client';

const OFFICIAL: boolean = true;

export const createSmithingItemWeaponType = async (
    props: db.SmithingItemWeaponTypeProps
): Promise<Prisma.Smithing_Item_Weapon_Type> => {
    return await db.createSmithingItemWeaponType(props, OFFICIAL);
}

export const createSmithingItemWeaponSubtype = async (
    props: db.SmithingItemWeaponSubtypeProps
): Promise<Prisma.Smithing_Item_Weapon_Subtype> => {
    return await db.createSmithingItemWeaponSubtype(props, OFFICIAL);
}

export const createSmithingItemWeaponTypeRelationshipSmithingItemWeaponSubtype = async (
    props: db.SmithingItemWeaponTypeRelationshipSmithingItemWeaponSubtypeProps
): Promise<Prisma.Smithing_Item_Weapon_Type__Smithing_Item_Weapon_Subtype> => {
    return await db.createSmithingItemWeaponTypeRelationshipSmithingItemWeaponSubtype(props, OFFICIAL);
}

export const createSmithingItemArmorType = async (
    props: db.SmithingItemArmorTypeProps
): Promise<Prisma.Smithing_Item_Armor_Type> => {
    return await db.createSmithingItemArmorType(props, OFFICIAL);
}

export const createSmithingEffect = async (
    props: db.SmithingEffectProps
): Promise<Prisma.Smithing_Effect> => {
    return await db.createSmithingEffect(props, OFFICIAL);
}

export const createSmithingRequirement = async (
    props: db.SmithingRequirementProps
): Promise<Prisma.Smithing_Requirement> => {
    return await db.createSmithingRequirement(props, OFFICIAL);
}

export const createSmithingMaterial = async (
    props: db.SmithingMaterialProps
): Promise<Prisma.Smithing_Material> => {
    return await db.createSmithingMaterial(props, OFFICIAL);
}

export const createSmithingMaterialSlot = async (
    props: db.SmithingMaterialSlotProps
): Promise<Prisma.Smithing_Material_Slot> => {
    return await db.createSmithingMaterialSlot(props, OFFICIAL);
}
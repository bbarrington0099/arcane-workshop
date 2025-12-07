"use cache";

import { cacheTag, cacheLife } from 'next/cache'
import * as db from '@lib/db'
import * as Prisma from '@prismagen/client'

export const getSmithingItemWeaponType = async (id: string): Promise<Prisma.Smithing_Item_Weapon_Type| null> => {
    cacheTag(db.CACHE_TAGS.SMITHING_WEAPON_TYPES);
    cacheLife(db.CACHE_LIFE);
    return await db.getSmithingItemWeaponType(id)
}

export const getSmithingItemWeaponSubtype = async (id: string): Promise<Prisma.Smithing_Item_Weapon_Subtype| null> => {
    cacheTag(db.CACHE_TAGS.SMITHING_WEAPON_SUBTYPES);
    cacheLife(db.CACHE_LIFE);
    return await db.getSmithingItemWeaponSubtype(id)
}

export const getSmithingItemWeaponTypeRelationshipSmithingItemWeaponSubtypes = async (): Promise<Prisma.Smithing_Item_Weapon_Type__Smithing_Item_Weapon_Subtype[] | null> => {
    cacheTag(db.CACHE_TAGS.SMITHING_WEAPON_TYPE_RELATIONSHIPS);
    cacheLife(db.CACHE_LIFE);
    return await db.getSmithingItemWeaponTypeRelationshipSmithingItemWeaponSubtypes();
}
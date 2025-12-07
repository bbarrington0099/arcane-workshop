import { prisma } from "./prisma"
import * as Prisma from '@prismagen/client';

export enum CACHE_TAGS {
    SMITHING_WEAPON_TYPES = "smithing-weapon-types",
    SMITHING_WEAPON_SUBTYPES = "smithing-weapon-subtypes",
    SMITHING_WEAPON_TYPE_RELATIONSHIPS = "smithing-weapon-type-relationships",
}

export interface SmithingItemWeaponTypeProps {
    name: string
}
export const createSmithingItemWeaponType = async (
    props: SmithingItemWeaponTypeProps,
    official: boolean
): Promise<Prisma.Smithing_Item_Weapon_Type> => {
    const result = await prisma.smithing_Item_Weapon_Type.create({
        data: {
            id: `${official ? 'official-' : ''}smithing-item-weapon-type-${props.name}`.toLowerCase(),
            name: props.name,
            official: official,
        }
    });
    return result;
}
export const getSmithingItemWeaponType = async (id: string): Promise<Prisma.Smithing_Item_Weapon_Type| null> => {
    return await prisma.smithing_Item_Weapon_Type.findUnique({
        where: {
            id: id
        }
    })
}

export interface SmithingItemWeaponSubtypeProps {
    name: string,
    baseCraftingDC: number
}
export const createSmithingItemWeaponSubtype = async (
    props: SmithingItemWeaponSubtypeProps,
    official: boolean
): Promise<Prisma.Smithing_Item_Weapon_Subtype> => {
    return await prisma.smithing_Item_Weapon_Subtype.create({
        data: {
            id: `${official ? 'official-' : ''}smithing-item-weapon-subtype-${props.name}`.toLowerCase(),
            name: props.name,
            baseCraftingDC: props.baseCraftingDC,
            official: official,
        }
    });
}
export const getSmithingItemWeaponSubtype = async (id: string): Promise<Prisma.Smithing_Item_Weapon_Subtype | null> => {
    return await prisma.smithing_Item_Weapon_Subtype.findUnique({
        where: {
            id: id
        }
    })
}

export interface SmithingItemWeaponTypeRelationshipSmithingItemWeaponSubtypeProps {
    smithingItemWeaponType: Prisma.Smithing_Item_Weapon_Type, 
    smithingItemWeaponSubtype: Prisma.Smithing_Item_Weapon_Subtype
}
export const createSmithingItemWeaponTypeRelationshipSmithingItemWeaponSubtype = async (
    props: SmithingItemWeaponTypeRelationshipSmithingItemWeaponSubtypeProps,
    official: boolean
): Promise<Prisma.Smithing_Item_Weapon_Type__Smithing_Item_Weapon_Subtype> => {
    const combinationExists = await prisma.smithing_Item_Weapon_Type__Smithing_Item_Weapon_Subtype.findUnique({
        where: {
            typeId_subtypeId: {
                typeId: props.smithingItemWeaponType.id,
                subtypeId: props.smithingItemWeaponSubtype.id
            }
        }
    })

    if (combinationExists) return combinationExists;

    return await prisma.smithing_Item_Weapon_Type__Smithing_Item_Weapon_Subtype.create({
        data: {
            id: `${official ? 'official-' : ''}${props.smithingItemWeaponType.name}-type-${props.smithingItemWeaponSubtype.name}-subtype`,
            name: `${props.smithingItemWeaponType.name}-${props.smithingItemWeaponSubtype.name}`.toLowerCase(),
            type: { connect: { id: props.smithingItemWeaponType.id } },
            subtype: { connect: { id: props.smithingItemWeaponSubtype.id } },
            official: official,
        }
    });
}
export const getSmithingItemWeaponTypeRelationshipSmithingItemWeaponSubtypes = async (): Promise<Prisma.Smithing_Item_Weapon_Type__Smithing_Item_Weapon_Subtype[] | null> => {
    return await prisma.smithing_Item_Weapon_Type__Smithing_Item_Weapon_Subtype.findMany()
}

export interface SmithingItemArmorTypeProps {
    name: string, 
    baseCraftingDC: number
}
export const createSmithingItemArmorType = async (
    props: SmithingItemArmorTypeProps,
    official: boolean
): Promise<Prisma.Smithing_Item_Armor_Type> => {
    return await prisma.smithing_Item_Armor_Type.create({
        data: {
            id: `${official ? 'official-' : ''}smithing-item-armor-type-${props.name}`.toLowerCase(),
            name: props.name,
            official: official,
            baseCraftingDC: props.baseCraftingDC,
        }
    });
}

export interface SmithingEffectProps {
    name: string, 
    description: string, 
    category: Prisma.Smithing_Effect_Category
}
export const createSmithingEffect = async (
    props: SmithingEffectProps,
    official: boolean
): Promise<Prisma.Smithing_Effect> => {
    return await prisma.smithing_Effect.create({
        data: {
            id: `${official ? 'official-' : ''}smithing-effect-${props.name}`.toLowerCase(),
            name: props.name,
            official: official,
            description: props.description,
            category: props.category,
        }
    });
}

export interface SmithingRequirementProps {
    name: string, 
    description: string, 
    category: Prisma.Smithing_Requirement_Category
}
export const createSmithingRequirement = async (
    props: SmithingRequirementProps,
    official: boolean
): Promise<Prisma.Smithing_Requirement> => {
    return await prisma.smithing_Requirement.create({
        data: {
            id: `${official ? 'official-' : ''}smithing-requirement-${props.name}`.toLowerCase(),
            name: props.name,
            official: official,
            description: props.description,
            category: props.category,
        }
    });
}

export interface SmithingMaterialProps {
    name: string, 
    modifierDC: number, 
    cost: number, 
    weight: number,
    category: Prisma.Smithing_Material_Category, 
    effects: Prisma.Smithing_Effect[], 
    requirements: Prisma.Smithing_Requirement[]
}
export const createSmithingMaterial = async (
    props: SmithingMaterialProps,
    official: boolean
): Promise<Prisma.Smithing_Material> => {
    return await prisma.smithing_Material.create({
        data: {
            id: `${official ? 'official-' : ''}smithing-material-${props.category}-${props.name}`.toLowerCase(),
            name: props.name,
            official: official,
            category: props.category,
            modifierDC: props.modifierDC,
            cost: props.cost,
            weight: props.weight,
            effects: {
                connect: props.effects.map(effect => ({ id: effect.id }))
            },
            requirements: {
                connect: props.requirements.map(requirement => ({ id: requirement.id }))
            }
        }
    });
}

export interface SmithingMaterialSlotProps {
    category: Prisma.Smithing_Material_Category, 
    quantity: number, 
    mixable: boolean
}
export const createSmithingMaterialSlot = async (
    props: SmithingMaterialSlotProps,
    official: boolean
): Promise<Prisma.Smithing_Material_Slot> => {
    const combinationExists = await prisma.smithing_Material_Slot.findUnique({
        where: {
            category_quantity_mixable: {
                category: props.category,
                quantity: props.quantity,
                mixable: props.mixable
            }
        }
    })

    if (combinationExists) return combinationExists;

    return await prisma.smithing_Material_Slot.create({
        data: {
            id: `${official ? 'official-' : ''}smithing-material-slot-${props.category}-${props.quantity}-${props.mixable ? 'mixable' : 'nonmixable'}`.toLowerCase(),
            official: official,
            category: props.category,
            quantity: props.quantity,
            mixable: props.mixable,
        }
    });
}
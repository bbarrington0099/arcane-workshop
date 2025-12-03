import { prisma } from '../lib/prisma'
import * as Prisma from '../generated/prisma/client';
import * as db from '../lib/db-seed'

async function main() {   
    await deleteAllOfficialData();
    
    // Add Weapon Types
    const meleeSmithingItemWeaponType = await db.createSmithingItemWeaponType({ name: 'melee' });
    const rangedSmithingItemWeaponType = await db.createSmithingItemWeaponType({ name: 'ranged' });
    
    // Add Weapon Subtypes
    const simpleSmithingItemWeaponSubtype = await db.createSmithingItemWeaponSubtype({ name: 'simple', baseCraftingDC: 10 });
    const martialSmithingItemWeaponSubtype = await db.createSmithingItemWeaponSubtype({ name: 'martial', baseCraftingDC: 12 });
    const advancedSmithingItemWeaponSubtype = await db.createSmithingItemWeaponSubtype({ name: 'advanced', baseCraftingDC: 14 });

    // Add Weapon Type/Subtype Relationships
    const meleeSimple = await db.createSmithingItemWeaponTypeRelationshipSmithingItemWeaponSubtype({ smithingItemWeaponType: meleeSmithingItemWeaponType, smithingItemWeaponSubtype: simpleSmithingItemWeaponSubtype });
    const meleeMartial = await db.createSmithingItemWeaponTypeRelationshipSmithingItemWeaponSubtype({ smithingItemWeaponType: meleeSmithingItemWeaponType, smithingItemWeaponSubtype: martialSmithingItemWeaponSubtype });
    const meleeAdvanced = await db.createSmithingItemWeaponTypeRelationshipSmithingItemWeaponSubtype({ smithingItemWeaponType: meleeSmithingItemWeaponType, smithingItemWeaponSubtype: advancedSmithingItemWeaponSubtype });
    const rangedSimple = await db.createSmithingItemWeaponTypeRelationshipSmithingItemWeaponSubtype({ smithingItemWeaponType: rangedSmithingItemWeaponType, smithingItemWeaponSubtype: simpleSmithingItemWeaponSubtype });
    const rangedMartial = await db.createSmithingItemWeaponTypeRelationshipSmithingItemWeaponSubtype({ smithingItemWeaponType: rangedSmithingItemWeaponType, smithingItemWeaponSubtype: martialSmithingItemWeaponSubtype });
    const rangedAdvanced = await db.createSmithingItemWeaponTypeRelationshipSmithingItemWeaponSubtype({ smithingItemWeaponType: rangedSmithingItemWeaponType, smithingItemWeaponSubtype: advancedSmithingItemWeaponSubtype });

    // Add Armor Types
    const light = await db.createSmithingItemArmorType({ name: 'light', baseCraftingDC: 10 });
    const medium = await db.createSmithingItemArmorType({ name: 'medium', baseCraftingDC: 12 });
    const heavy = await db.createSmithingItemArmorType({ name: 'heavy', baseCraftingDC: 14 });
    const shield = await db.createSmithingItemArmorType({ name: 'shield', baseCraftingDC: 12 });

    // Add Material Effects
    const testEffect = await db.createSmithingEffect({ name: 'test', description: 'Proves the material has the effect.', category: Prisma.Smithing_Effect_Category.POSITIVE });

    // Add Material Requirements
    const steelsmithing = await db.createSmithingRequirement({ name: 'steelsmithing', description: 'Knowledge of mixing steel.', category: Prisma.Smithing_Requirement_Category.KNOWLEDGE  });
    const fielddressing = await db.createSmithingRequirement({ name: 'fielddressing', description: 'Knowledge of working with limited materials.', category: Prisma.Smithing_Requirement_Category.KNOWLEDGE  });
    const solidcarving = await db.createSmithingRequirement({ name: 'solidcarving', description: 'Knowledge of working with dense woods.', category: Prisma.Smithing_Requirement_Category.KNOWLEDGE  });

    // Add Materials
    const ironOre = await db.createSmithingMaterial({ name: 'iron', modifierDC: 0, cost: 1.0, weight: 1, category: Prisma.Smithing_Material_Category.ORE, effects: [testEffect], requirements: [] });
    const steelOre = await db.createSmithingMaterial({ name: 'steel', modifierDC: 1, cost: 1.5, weight: 1, category: Prisma.Smithing_Material_Category.ORE, effects: [], requirements: [steelsmithing] });
    const cowLeather = await db.createSmithingMaterial({ name: 'cow', modifierDC: 0, cost: 1.0, weight: 1, category: Prisma.Smithing_Material_Category.LEATHER, effects: [], requirements: [] });
    const rabbitLeather = await db.createSmithingMaterial({ name: 'rabbit', modifierDC: 0, cost: 0.8, weight: 1, category: Prisma.Smithing_Material_Category.LEATHER, effects: [], requirements: [fielddressing] });
    const oakHardwood = await db.createSmithingMaterial({ name: 'oak', modifierDC: 0, cost: 1.0, weight: 1, category: Prisma.Smithing_Material_Category.HARDWOOD, effects: [], requirements: [] });
    const yewHardwood = await db.createSmithingMaterial({ name: 'yew', modifierDC: 1, cost: 1.4, weight: 1, category: Prisma.Smithing_Material_Category.HARDWOOD, effects: [], requirements: [solidcarving] });
}

const deleteAllOfficialData = async (): Promise<void> => {
    // Delete in reverse dependency order (children first, parents last)
    const tables: Array<{ deleteMany: Function }> = [
        prisma.smithing_Material,
        prisma.smithing_Effect,
        prisma.smithing_Requirement,
        prisma.smithing_Material_Slot,
        prisma.smithing_Item_Weapon_Type__Smithing_Item_Weapon_Subtype,
        prisma.smithing_Item_Weapon_Type,
        prisma.smithing_Item_Weapon_Subtype,
        prisma.smithing_Item_Armor_Type,
    ];

    for (const table of tables) {
        await table.deleteMany({
            where: { official: true }
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
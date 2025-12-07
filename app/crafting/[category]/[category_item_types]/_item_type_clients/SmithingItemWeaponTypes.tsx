"use cache";

import * as smithingItemReadActions from '@actions/smithingItemReadActions'
import { Smithing_Item_Weapon_Subtype } from '@prismagen/client'
import styles from './SmithingItemWeaponTypes.module.scss'
import { cacheLife } from 'next/cache';
import { CACHE_LIFE } from '@lib/db';

interface Relationship {
  relationshipId: string;
  subtype: Smithing_Item_Weapon_Subtype;
}

const SmithingItemWeaponTypes = async () => {
  cacheLife(CACHE_LIFE);

  const relationshipsMap: { [ key: string ]: Relationship[] } = {};
  const relationshipsData = await smithingItemReadActions.getSmithingItemWeaponTypeRelationshipSmithingItemWeaponSubtypes();

  if (!relationshipsData) return null

  await Promise.all(relationshipsData.map(async (relationship) => {
    const item_type = await smithingItemReadActions.getSmithingItemWeaponType(relationship.typeId);
    if (!item_type) throw new Error(`item type ${relationship.typeId} not found`);

    const item_subtype = await smithingItemReadActions.getSmithingItemWeaponSubtype(relationship.subtypeId);
    if (!item_subtype) throw new Error(`item subtype ${relationship.subtypeId} not found`)

    const key = item_type.name;
    if (!relationshipsMap[key]) relationshipsMap[key] = [];

    relationshipsMap[key].push({
      relationshipId: relationship.id,
      subtype: item_subtype
    });
  }));

  return (
    <div>
      {Object.keys(relationshipsMap).map((item_type) => {
        const relationships = relationshipsMap[item_type];

        return (
          <div className={styles.smithingItemWeaponTypeContainer} key={item_type}>
            {item_type}
            {relationships.map((relationship) => {
              return (
                <div className={styles.smithingItemWeaponSubtypeContainer} key={relationship.relationshipId}>
                  {relationship.subtype.name}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default SmithingItemWeaponTypes
"use cache";
// make db calls and render list of weapon items for crafting
import React from 'react'
import { CraftItemPageComponentProps } from '../page'
import { cacheLife } from 'next/cache';
import { CACHE_LIFE } from '@lib/db';


const WeaponsItems = async (props: CraftItemPageComponentProps) => {
  cacheLife(CACHE_LIFE);
  
  return (
    <div>WeaponsItems {props.items}</div>
  )
}

export default WeaponsItems
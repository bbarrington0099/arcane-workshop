import React from 'react'
import Link from 'next/link';

import styles from './Link.module.scss'

export interface PathLinkProps {
  path: string
  label?: string
  additionalClasses?: string[]
}
const PathLink = (props: PathLinkProps) => {
  const combinedClasses = [
    styles.link,
    ...(props.additionalClasses ?? [])
  ].join(' ');

  const path = props.path.startsWith('/') ? props.path : `/${props.path}`

  return (
    <div className={styles.linkContainer}>
      <Link 
        href={path.toLowerCase().replaceAll(/_/g, '-')}
        className={combinedClasses}
      >
        {props.label || props.path.split('/')[-1]}
      </Link>
    </div>
  )
}

export default PathLink
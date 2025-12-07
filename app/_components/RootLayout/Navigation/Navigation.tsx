import React from 'react'

import styles from './Navigation.module.scss';
import PathLink from '@components/common/Link/PathLink';

const Navigation = () => {
  return (
    <div className={styles.navigationContainer}>
      Navigation
      <PathLink
        path='crafting'
        label='Crafting'
      />
    </div>
  )
}

export default Navigation
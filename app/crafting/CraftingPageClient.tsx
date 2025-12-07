"use client";

import { usePathname } from 'next/navigation';
import { enumToSlug } from '@lib/utils';

import styles from './CraftingPage.module.scss';
import PathLink from '@common/Link/PathLink';

interface CraftingPageClientProps {
    categories: string[];
}
const CraftingPageClient = (props: CraftingPageClientProps) => {
    const pathname = usePathname()

    return (
        <div className={styles.craftingPageContainer}>
            {props.categories.map((craftingCategory) => (
                <PathLink
                    key={craftingCategory}
                    path={`${pathname}/${enumToSlug(craftingCategory)}`}
                    label={craftingCategory}
                />
            ))}
        </div>
    )
}

export default CraftingPageClient
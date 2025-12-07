export function enumToSlug(enumValue?: string): string {
    if (!enumValue) {
        throw new Error("enumToSlug: enumValue is undefined");
    }
    
    return enumValue.toLowerCase().replace(/_/g, '-');
}

export function slugToEnum(slug?: string): string {
    if (!slug) {
        throw new Error("slugToEnum: slug is undefined");
    }

    return slug.toUpperCase().replace(/-/g, '_');
}
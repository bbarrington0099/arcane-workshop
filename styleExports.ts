type Unit = '#' | 'px' | 'em' | 'rem' | '%' | 'vh' | 'vw' | null;
type UnitPosition = 'prefix' | 'suffix' | null;

interface StyleValue {
    raw: string | number;
    dressed?: string;
}

interface StyleValues {
    [key: string]: StyleValue;
}

interface StyleExport {
    unit: Unit;
    unitPosition: UnitPosition;
    stringify: boolean;
    values: StyleValues;
}

export const styleExports: { [key: string]: StyleExport } = {
    colors: createStyleExport({
        unit: '#',
        unitPosition: 'prefix',
        stringify: false,
        values: {
            primaryBackgroundLight: { raw: "ffffff" },
            primaryBackgroundDark: { raw: "0a0a0a" },
            primaryForegroundLight: { raw: "171717" },
            primaryForegroundDark: { raw: "ededed" },
        }
    }),
    breakpoints: createStyleExport({
        unit: "px",
        unitPosition: "suffix",
        stringify: false,
        values: {
            lg: { raw: 1920 },
            md: { raw: 1024 },
            sm: { raw: 768 },
        }
    })
};

/**
 * Adds unit and formatting to each style value in the StyleExport.
 * @param styleExport The StyleExport object to process.
 * @returns The updated StyleExport with dressed values.
 */ 
function createStyleExport(styleExport: StyleExport): StyleExport {
    for (const [key, styleValue] of Object.entries(styleExport.values)) {
        let dressedValue = '';
        dressedValue += styleExport.unit && styleExport.unitPosition === 'prefix' ? styleExport.unit : '';
        dressedValue += styleValue.raw;
        dressedValue += styleExport.unit && (!styleExport.unitPosition || styleExport.unitPosition === 'suffix') ? styleExport.unit : '';
        styleExport.values[key].dressed = styleExport.stringify ? `"${dressedValue}"` : dressedValue;
    }
    return styleExport;
};
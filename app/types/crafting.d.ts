interface Craftable {
    id: number;
    name: string;
}

interface CraftableSubType {
    id: number;
    name: string;
    baseCraftingDC: number;
    craftables: Craftable[];
}

interface CraftableType {
    id: number;
    name: string;
    subTypes: CraftableSubType[];
}
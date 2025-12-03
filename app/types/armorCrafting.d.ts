interface Armor extends Craftable {
}

interface ArmorSubType extends CraftableSubType {
    craftables: Armor[];
}

interface ArmorType extends CraftableType {
    subTypes: ArmorSubType[];
}
interface Weapon extends Craftable {
}

interface WeaponSubType extends CraftableSubType {
    craftables: Weapon[];
}

interface WeaponType extends CraftableType {
    subTypes: WeaponSubType[];
}
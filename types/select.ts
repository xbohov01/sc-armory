export type SelectOption = {
  value: string;
  label: string;
  type: string;
};

export type KeyValue<K, V> = {
  key: K;
  value: V;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type LooseAutocomplete<T extends string> = T | string & {};

export type ArmorType = typeof armorTypes[number];

export type WeaponType = typeof weaponTypes[number];

export type GearType = LooseAutocomplete<
  ArmorType | WeaponType | "Sidearm" | "Backpack" | "Usable" | "Tool"
>;

export const armorTypes = ["Helmet", "Arms", "Core", "Legs", "Undersuit"];
export const weaponTypes = ["Primary", "Secondary"];

export type SelectOption = {
  value: string;
  label: string;
  type: LooseAutocomplete<"Heavy" | "Medium" | "Light">;
};

export type KeyValue<K, V> = {
  key: K;
  value: V;
};

export type LooseAutocomplete<T extends string> = T | Omit<string, T>;

export type ArmorType = typeof armorTypes[number];

export type WeaponType = typeof weaponTypes[number];

export type GearType = LooseAutocomplete<
  ArmorType | WeaponType | "Sidearm" | "Backpack" | "Usable" | "Tool"
>;

export const armorTypes = ["Helmet", "Arms", "Core", "Legs", "Undersuit"];
export const weaponTypes = ["Primary", "Secondary"];

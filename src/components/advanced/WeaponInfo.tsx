import React, { useEffect, useState } from "react";

import { VStack } from "@chakra-ui/layout";

import WeaponInfoDisplay from "./weapoonInfo/WeaponInfoDisplay";

import { getWeaponListInfo } from "~/util/gearInfo";
import type { Weapon } from "~type/loadout";

type WeaponInfoProps = {
  weapons: string[];
};

export default function WeaponInfo(props: WeaponInfoProps) {
  const [weaponData, setWeaponData] = useState<Weapon[]>([]);

  useEffect(() => {
    getWeaponListInfo(props.weapons).then((res) => {
      setWeaponData(res);
    });
  }, [props.weapons]);

  return (
    <VStack id="weapons-info">
      {weaponData.length === 0 ? (
        <p>No weapons selected</p>
      ) : (
        weaponData.map((d) => (
          <WeaponInfoDisplay key={Math.random()} weapon={d} />
        ))
      )}
    </VStack>
  );
}

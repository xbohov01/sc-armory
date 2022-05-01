import React, { useEffect, useState } from "react";

import { VStack } from "@chakra-ui/layout";

import gearInfoProvider from "../../providers/gearInfoProvider";

import WeaponInfoDisplay from "./weapoonInfo/WeaponInfoDisplay";

import type { Weapon } from "~type/loadout"

type WeaponInfoProps = {
  weapons: string[];
};

export default function WeaponInfo(props: WeaponInfoProps) {
  const [weaponData, setWeaponData] = useState<Weapon[]>([]);

  useEffect(() => {
    gearInfoProvider.GetWeaponListInfo(props.weapons).then((res) => {
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

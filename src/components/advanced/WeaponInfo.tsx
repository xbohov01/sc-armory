import React from "react";
import { useQuery } from "react-query";

import { VStack } from "@chakra-ui/layout";

import WeaponInfoDisplay from "./weapoonInfo/WeaponInfoDisplay";

import { getWeaponListInfo } from "~/util/gearInfo";

type WeaponInfoProps = {
  weapons: string[];
};

export default function WeaponInfo(props: WeaponInfoProps) {
  const { data: weaponData } = useQuery(["weaponData", props.weapons], () =>
    getWeaponListInfo(props.weapons)
  );

  return (
    <VStack id="weapons-info">
      {!weaponData || weaponData.length === 0 ? (
        <p>No weapons selected</p>
      ) : (
        weaponData.map((d) => (
          <WeaponInfoDisplay key={Math.random()} weapon={d} />
        ))
      )}
    </VStack>
  );
}

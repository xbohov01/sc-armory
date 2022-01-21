import { VStack } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { WeaponVM } from "../../client/viewModels/WeaponVM";
import gearInfoProvider from "../../providers/gearInfoProvider";
import WeaponInfoDisplay from "./weapoonInfo/WeaponInfoDisplay";

type WeaponInfoProps = {
  weapons: string[];
};

export default function WeaponInfo(props: WeaponInfoProps) {
  const [weaponData, setWeaponData] = useState<WeaponVM[]>([]);

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

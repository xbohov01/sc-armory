import React from "react";
import Chart from "react-google-charts";
import { useQuery } from "react-query";

import { Box, Heading } from "@chakra-ui/layout";

import { getAmmunitionByReference } from "~/util/gear";
import { DamageType } from "~type/loadout";

type DamageDropDisplayProps = {
  ammoContainerReference: string;
};

export default function DamageDropDisplay(props: DamageDropDisplayProps) {
  const { data: ammo, isLoading } = useQuery(
    ["ammo", props.ammoContainerReference],
    () => getAmmunitionByReference(props.ammoContainerReference)
  );

  const generateDamageValue = (distance: number, damageType: DamageType) => {
    if (ammo === undefined) return 0;

    if (distance < damageType.damageDropMinDistance) {
      return damageType.damage;
    }

    const calculatedDamage =
      damageType.damage -
      damageType.damageDropPerMeter *
        (distance - damageType.damageDropMinDistance);

    if (calculatedDamage < damageType.damageDropMinDamage) {
      return damageType.damageDropMinDamage;
    }

    return calculatedDamage;
  };

  const generateGraphData = () => {
    if (ammo === undefined) return [];

    const data = [];

    for (
      let distance = 0;
      distance <= ammo.lifetime * ammo.speed;
      distance += 10
    ) {
      data.push([
        distance,
        generateDamageValue(distance, ammo.damagePhysical),
        generateDamageValue(distance, ammo.damageEnergy),
        generateDamageValue(distance, ammo.damageDistortion),
        generateDamageValue(distance, ammo.damageThermal),
        generateDamageValue(distance, ammo.damageBiochemical),
        generateDamageValue(distance, ammo.damageStun),
      ]);
    }
    return data;
  };

  return (
    <Box>
      <Heading size="sm" textAlign="center" paddingTop="5pt">
        Damage over distance
      </Heading>
      {isLoading ? (
        "Loading..."
      ) : (
        <Chart
          chartType="LineChart"
          data={[
            [
              "Distance",
              "Physical",
              "Energy",
              "Distortion",
              "Thermal",
              "Biochemical",
              "Stun",
            ],
            ...generateGraphData(),
          ]}
          options={{
            hAxis: {
              minValue: 0,
              textColor: "whitesmoke",
              title: "Distance (m)",
              titleColor: "whitesmoke",
              titleFont: "Exo",
            },
            vAxis: {
              textColor: "whitesmoke",
              title: "Damage",
              titleColor: "whitesmoke",
            },
            legend: "none",
            backgroundColor: "transparent",
            chartArea: { width: "80%", height: "70%" },
          }}
        />
      )}
    </Box>
  );
}

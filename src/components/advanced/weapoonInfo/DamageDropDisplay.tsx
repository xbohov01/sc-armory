import { Box, Heading } from "@chakra-ui/layout";
import { max } from "lodash";
import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import {
  AmmunitionInfo,
  AmmunitionVM,
  DamageType,
} from "../../../client/viewModels/AmmunitionVM";
import gearProvider from "../../../providers/gearProvider";

type DamageDropDisplayProps = {
  ammoContainerReference: string;
};

export default function DamageDropDisplay(props: DamageDropDisplayProps) {
  const [isLoading, setLoading] = useState(true);
  const [ammo, setAmmo] = useState<AmmunitionInfo>();

  useEffect(() => {
    gearProvider
      .GetAmmunitionByReference(props.ammoContainerReference)
      .then((res) => {
        setAmmo(res);
        setLoading(false);
      });
  }, [props.ammoContainerReference]);

  const generateGraphData = () => {
    if (ammo === undefined) return [];

    const data = [];

    for (let distance = 0; distance <= ammo.lifetime * ammo.speed; distance += 10) {
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

  return (
    <Box borderLeft="1pt solid whitesmoke" padding="5pt" bgColor="#1a2130">
      <Heading size="sm" textAlign="center" paddingTop="5pt">
        Damage drop over distance
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
            },
            vAxis: {
              textColor: "whitesmoke",
            },
            legend: "none",
            backgroundColor: "#1a2130",
            chartArea: { width: "90%", height: "80%" },
          }}
        />
      )}
    </Box>
  );
}

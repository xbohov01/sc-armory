import React, { useState } from "react";
import { useQuery } from "react-query";

import { Box } from "@chakra-ui/react";

import { getTimes } from "~/util/weaponDemo";

export type WeaponDemoDisplayProps = {
  name: string;
};

export function WeaponDemoDisplay(props: WeaponDemoDisplayProps) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useQuery(["times", props.name], () => {
    const times = getTimes(props.name);
    setStart(times[0]);
    setEnd(times[1]);
  });

  return start !== "" ? (
    <Box display="flex" marginTop="10px" padding="10px">
      <iframe
        src={`https://www.youtube.com/embed/t5RhsLjsmKM?start=${start}&end=${end}&mute=1`}
        title="Weapon Demo"
        width="400px"
        height="195px"
        allowFullScreen
      />
    </Box>
  ) : (
    <Box />
  );
}

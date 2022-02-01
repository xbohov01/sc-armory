import { Heading, HStack } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/switch";
import React, { useEffect, useState } from "react";
import client from "../../client/client";
import gearServiceClient from "../../client/gearServiceClient";

type VersionSwitchProps = {
  isEnabled: boolean;
};

export default function VersionSwitch(props: VersionSwitchProps) {
  const [isPtu, setIsPtu] = useState(false);

  const getStoredValue = () => {
    const value = localStorage.getItem("wasPtu");
    if (value === undefined || value === "false") {
      return false;
    }
    return true;
  };

  const wasPtuToggled = () => {
    if (!props.isEnabled && getStoredValue()) {
      setIsPtu(false);
      client.ChangeAPIs(false);
      gearServiceClient.ChangeAPIs(false);

      localStorage.setItem("wasPtu", "false");
      return false;
    }
    return getStoredValue();
  };

  const toggleVersion = async () => {
    localStorage.setItem("wasPtu", isPtu ? "false" : "true");

    client.ChangeAPIs(!isPtu);
    gearServiceClient.ChangeAPIs(!isPtu);

    setIsPtu(!isPtu);
    window.location.reload();
  };

  useEffect(() => {
    setIsPtu(wasPtuToggled());
  }, []);

  return (
    <HStack id="version-switch" hidden={!props.isEnabled}>
      <Heading size="lg">LIVE</Heading>
      <Switch size="lg" isChecked={isPtu} onChange={toggleVersion} />
      <Heading size="lg">PTU</Heading>
    </HStack>
  );
}

import { Button, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { KeyValue, ListKey, LocatedItem } from "../../types/types";
import LoadoutExportText from "./LoadoutExportText";

type LoadoutExporterProps = {
  gear: KeyValue<ListKey, LocatedItem[]>[];
};

export default function LoadoutExporter(props: LoadoutExporterProps) {
  const [textExport, setTextExport] = useState("");
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    let text = "";

    props.gear.forEach((location) => {
      text += `${location.key.name} - ${location.key.chain
        .split(" - ")
        .reverse()
        .join(" - ")}\n`;
      location.value.forEach((item) => {
        text += `\t${item.item} - ${item.price} aUEC\n`;
      });
      text += "\n";
    });
    setTextExport(text);
  }, [props.gear]);

  return (
    <VStack id="export">
      <Button
        colorScheme="blue"
        marginBottom="10pt"
        marginTop="10pt"
        marginLeft="auto"
        marginRight="auto"
        width="15vw"
        minWidth="150pt"
        maxWidth="300pt"
        onClick={() => setShowExport(!showExport)}
        isDisabled={props.gear.length === 0}
      >
        Export shopping list
      </Button>
      {showExport ? <LoadoutExportText text={textExport} /> : ""}
    </VStack>
  );
}

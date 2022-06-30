import React from "react";
import { useQuery } from "react-query";

import { Accordion, Box, Heading } from "@chakra-ui/react";
import { Cloudinary } from "@cloudinary/url-gen";

import { LoadoutFormValues } from "../loadout/LoadoutBuilder";

import { ImageItem } from "./ImageItem";

import { getGearListReferences } from "~/util/gearInfo";

type ImageDisplayProps = {
  gear: LoadoutFormValues;
};

export default function ImageDisplay(props: ImageDisplayProps) {
  
  const items: string[] = Object.values(props.gear).flat().filter(item => item.length)

  const { data: references, isLoading } = useQuery(
    ["references", items],
    () => getGearListReferences(items)
  );

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: "thespacecoder",
    },
  });

  return (
    <Box
      id="image-display"
      color="whitesmoke"
      width="32vw"
      maxWidth="320pt"
      minWidth="260pt"
      boxShadow="4px 4px 8px rgba(0, 0, 0, 0.25), -2px -2px 6px #293342"
      backgroundColor="#1a2130"
      borderRadius="8px"
      padding="10px"
    >
      <Heading size="lg" marginBottom="10pt">
        Images
      </Heading>
      {isLoading ? (
        "Loading... "
      ) : (
        <Accordion 
          width="30vw"
          maxWidth="305pt"
          minWidth="255pt" 
          allowMultiple
        >
          {!references
            ? "No images"
            : references.map((r) => (
                <ImageItem item={r} cloud={cloudinary} key={Math.random()} />
              ))}
        </Accordion>
      )}
    </Box>
  );
}

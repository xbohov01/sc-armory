import React from "react";
import { useQuery } from "react-query";

import { Accordion, Box, Heading } from "@chakra-ui/react";
import { Cloudinary } from "@cloudinary/url-gen";

import { ImageItem } from "./ImageItem";

import { getGearListReferences } from "~/util/gearInfo";

type ImageDisplayProps = {
  gear: string[];
};

export default function ImageDisplay(props: ImageDisplayProps) {
  const { data: references, isLoading } = useQuery(
    ["references", props.gear],
    () => getGearListReferences(props.gear)
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
      width="30vw"
      maxWidth="300pt"
      minWidth="200pt"
    >
      <Heading size="lg" marginBottom="10pt">
        Images
      </Heading>
      {isLoading ? (
        "Loading... "
      ) : (
        <Accordion width="30vw" maxWidth="300pt" minWidth="200pt" allowMultiple>
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

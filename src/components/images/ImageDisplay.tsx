import { Box, Heading, Accordion } from "@chakra-ui/react";
import { Cloudinary } from "@cloudinary/base";
import React, { useEffect, useState } from "react";
import gearInfoProvider from "../../providers/gearInfoProvider";
import { NameReference } from "../../types/types";
import { ImageItem } from "./ImageItem";

type ImageDisplayProps = {
  gear: string[];
};

export default function ImageDisplay(props: ImageDisplayProps) {
  const [references, setReferences] = useState<NameReference[]>([]);

  useEffect(() => {
    gearInfoProvider.GetGearListReferences(props.gear).then((res) => {
      setReferences(res);
    });
  }, [props.gear]);

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
      <Accordion width="30vw" maxWidth="300pt" minWidth="200pt" allowMultiple>
        {references.map((r) => (
          <ImageItem item={r} cloud={cloudinary} key={Math.random()} />
        ))}
      </Accordion>
    </Box>
  );
}

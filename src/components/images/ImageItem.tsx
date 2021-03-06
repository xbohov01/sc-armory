import React, { useEffect, useState } from "react";

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Link,
} from "@chakra-ui/react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

import client from "../../client/client";

import { WeaponDemoDisplay } from "./WeaponDemoDisplay";

import type { NameReference } from "~type/image";

export type ImageItemProps = {
  item: NameReference;
  cloud: Cloudinary;
};

export function ImageItem(props: ImageItemProps) {
  const [imageExists, setImageExists] = useState(false);

  useEffect(() => {
    client.CheckIfImageExists(props.item.reference).then((res) => {
      setImageExists(res);
    });
  });

  const isWeapon = (): boolean =>
    props.item.name.includes("Pistol") ||
    props.item.name.includes("Rifle") ||
    props.item.name.includes("Shotgun");

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {props.item.name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {imageExists ? (
          <AdvancedImage
            cldImg={props.cloud.image(`armory/${props.item.reference}`)}
          />
        ) : (
          <Box>
            This image is not yet in the Armory. You can help get it added by
            submitting it{" "}
            <Link
              textDecoration="underline"
              href="https://forms.gle/P1TQnhtueK6wmmbn8"
            >
              here
            </Link>
            .
          </Box>
        )}
        {isWeapon() ? <WeaponDemoDisplay name={props.item.name} /> : ""}
      </AccordionPanel>
    </AccordionItem>
  );
}

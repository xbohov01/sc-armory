import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { HStack } from "@chakra-ui/layout";

import weaponAttachmentProvider from "../../providers/weaponAttachmentProvider";
import { KeyValue, WeaponAttachmentSlot } from "../../types/types";

import { WeaponAttachmentSelector } from "./WeaponAttachmentSelector";

type WeaponAttachmentsListProps = {
  weapon: string;
  updater: Dispatch<SetStateAction<string[]>>;
};

export default function WeaponAttachmentsList(
  props: WeaponAttachmentsListProps
) {
  const [slots, setSlots] = useState<WeaponAttachmentSlot[]>([]);
  const [selected, setSelected] = useState<KeyValue<string, string>[]>([]);

  useEffect(() => {
    weaponAttachmentProvider.GetAttachmentSlots(props.weapon).then((res) => {
      setSlots(res);
    });
  }, [props.weapon]);

  const update = (type: string, name: string) => {
    const newSelected = selected.filter((s) => s.key !== type);
    newSelected.push({ key: type, value: name });

    setSelected(newSelected);
    props.updater(newSelected.map((s) => s.value));
  };

  return (
    <HStack
      marginTop="5pt"
      marginBottom="10pt"
      borderLeft="1pt solid whitesmoke"
      borderRight="1pt solid whitesmoke"
      paddingLeft="5pt"
      paddingRight="5pt"
    >
      {slots.map((s) => (
        <WeaponAttachmentSelector
          key={s.Type}
          attachmentSlot={s}
          updater={update}
        />
      ))}
    </HStack>
  );
}

import React, { Dispatch, SetStateAction, useState } from "react";
import { useQuery } from "react-query";

import { HStack } from "@chakra-ui/layout";

import { WeaponAttachmentSelector } from "./WeaponAttachmentSelector";

import { getAttachmentSlots } from "~/util/weaponAttachment";
import type { KeyValue } from "~type/select";

type WeaponAttachmentsListProps = {
  weapon: string;
  onUpdate: Dispatch<SetStateAction<string[]>>;
};

export default function WeaponAttachmentsList(
  props: WeaponAttachmentsListProps
) {
  const [selected, setSelected] = useState<KeyValue<string, string>[]>([]);

  const { data: slots, isLoading } = useQuery(
    ["attachmentSlots", props.weapon],
    () => getAttachmentSlots(props.weapon)
  );

  const update = (type: string, name: string) => {
    const newSelected = selected.filter((s) => s.key !== type);
    newSelected.push({ key: type, value: name });

    setSelected(newSelected);
    props.onUpdate(newSelected.map((s) => s.value));
  };

  if (isLoading || !slots) {
    return <></>;
  }

  return (
    <HStack
      marginTop="5pt"
      marginBottom="10pt"
      borderLeft="2pt solid #F58F29"
      borderRight="2pt solid #F58F29"
      paddingLeft="5pt"
      paddingRight="5pt"
    >
      {slots.map((s) => (
        <WeaponAttachmentSelector
          key={s.Type}
          attachmentSlot={s}
          onUpdate={update}
        />
      ))}
    </HStack>
  );
}

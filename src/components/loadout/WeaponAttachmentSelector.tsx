import React, { useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";

import { Heading, VStack } from "@chakra-ui/layout";

import { compactStyles } from "../../selectStyle";

import { getAttachments } from "~/util/weaponAttachment";
import type { Attachment, WeaponAttachmentSlot } from "~type/loadout";

export type WeaponAttachmentSelectorProps = {
  attachmentSlot: WeaponAttachmentSlot;
  updater: (type: string, name: string) => void;
};
export function WeaponAttachmentSelector(props: WeaponAttachmentSelectorProps) {
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState("");

  const { data: attachments } = useQuery(
    [
      "attachments",
      props.attachmentSlot.Type,
      props.attachmentSlot.MinSize,
      props.attachmentSlot.MaxSize,
    ],
    () =>
      getAttachments(
        props.attachmentSlot.Type,
        props.attachmentSlot.MaxSize,
        props.attachmentSlot.MinSize
      ).then((attachmentItems) =>
        attachmentItems
          .filter((a) =>
            a.localizedName.toLowerCase().includes(filter.toLowerCase())
          )
          .map((a) => ({
            ...a,
            value: a.localizedName,
            label: a.localizedName,
          }))
      )
  );

  const handleGearChange = (
    selectedOption: (Attachment & { value: string; label: string }) | null
  ) => {
    // Check for selection clearing
    if (selectedOption === null) {
      props.updater(props.attachmentSlot.Type, "");
      setSelected("");
      return;
    }
    props.updater(props.attachmentSlot.Type, selectedOption.label);
    setSelected(selectedOption.label);
  };

  const determineZeroing = (): string => {
    if (!attachments) {
      return "";
    }
    const vm = attachments.find((a) => a.localizedName === selected);
    if (vm === undefined || vm.type !== "IronSight") {
      return "";
    }
    if (vm.autoZeroingTime > 0) {
      return "Automatic ranging";
    }
    if (vm.rangeIncrement > 0 && vm.autoZeroingTime === 0) {
      return "Manual ranging";
    }
    return "No ranging";
  };

  return (
    <VStack flex={1} width="auto" height="65pt">
      <Heading fontSize="sm">{props.attachmentSlot.Type}</Heading>
      <Select
        styles={compactStyles}
        options={attachments ?? []}
        onChange={handleGearChange}
        onInputChange={setFilter}
        isMulti={false}
        defaultOptions
        isClearable
      />
      <Heading fontSize="xs">{determineZeroing()}</Heading>
    </VStack>
  );
}

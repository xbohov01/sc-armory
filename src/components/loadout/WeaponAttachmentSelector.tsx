import React, { useEffect, useState } from "react";
import Select from "react-select";

import { Heading, VStack } from "@chakra-ui/layout";

import weaponAttachmentProvider from "../../providers/weaponAttachmentProvider";
import { compactStyles } from "../../selectStyle";

import type { Attachment, WeaponAttachmentSlot } from "~type/loadout";

export type WeaponAttachmentSelectorProps = {
  attachmentSlot: WeaponAttachmentSlot;
  updater: (type: string, name: string) => void;
};
export function WeaponAttachmentSelector(props: WeaponAttachmentSelectorProps) {
  const [filter, setFilter] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    weaponAttachmentProvider
      .GetAttachments(
        props.attachmentSlot.Type,
        props.attachmentSlot.MaxSize,
        props.attachmentSlot.MinSize
      )
      .then((res) => {
        setAttachments(res);
      });
  }, [
    props.attachmentSlot.Type,
    props.attachmentSlot.MaxSize,
    props.attachmentSlot.MinSize,
  ]);

  const handleGearChange = (selectedOption: Record<string, string> | null) => {
    // Check for selection clearing
    if (selectedOption === null) {
      props.updater(props.attachmentSlot.Type, "");
      setSelected("");
      return;
    }
    props.updater(props.attachmentSlot.Type, selectedOption.label);
    setSelected(selectedOption.label);
  };

  const loadOptions = () =>
    attachments
      .filter((a) =>
        a.localizedName.toLowerCase().includes(filter.toLowerCase())
      )
      .map((a) => ({ value: a.localizedName, label: a.localizedName }));

  const determineZeroing = (): string => {
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
        options={loadOptions()}
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

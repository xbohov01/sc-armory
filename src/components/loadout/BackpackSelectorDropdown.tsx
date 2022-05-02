import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Select from "react-select";

import { Box, Heading } from "@chakra-ui/layout";

import { customStyles } from "../../selectStyle";

import CustomSelectOption from "./CustomSelectOption";
import WrongSizeWarning from "./WrongSizeWarning";

import { getBackpacksWithMinimumSize } from "~/util/gear";
import type { SelectOption } from "~type/select";

export type BackpackSelectorDropdownProps = {
  setBackpack: Dispatch<SetStateAction<string>>;
  maxBackpackSize: number;
};

export function BackpackSelectorDropdown(props: BackpackSelectorDropdownProps) {
  const [filter, setFilter] = useState("");
  const [backpacks, setBackpacks] = useState<SelectOption[]>([]);
  const [currentPack, setCurrentPack] = useState("");
  const [sizeWarning, setSizeWarning] = useState(false);

  const checkSize = (selected: string, options: SelectOption[]) => {
    if (selected !== "" && !options.some((r) => r.label === selected)) {
      setSizeWarning(true);
    } else {
      setSizeWarning(false);
    }
  };

  useEffect(() => {
    getBackpacksWithMinimumSize("", props.maxBackpackSize).then((res) => {
      setBackpacks(res);
      checkSize(currentPack, res);
    });
  }, [props.maxBackpackSize, currentPack]);

  const loadOptions = () =>
    backpacks.filter((b) => b.label.toLowerCase().includes(filter));

  const handleGearChange = (selected: { label: string } | null) => {
    // Check for selection clearing
    if (selected === null) {
      props.setBackpack("");
      setCurrentPack("");
      return;
    }
    props.setBackpack(selected.label);
    setCurrentPack(selected.label);
    checkSize(selected.label, backpacks);
  };

  return (
    <Box maxWidth="300pt" id="component-backpack" padding="2pt" margin="auto">
      <Heading fontSize="md">Backpack</Heading>
      {sizeWarning ? <WrongSizeWarning /> : ""}
      <Box paddingTop="2pt">
        <Select
          id="backpack"
          styles={customStyles}
          options={loadOptions()}
          onChange={handleGearChange}
          onInputChange={setFilter}
          isMulti={false}
          isDisabled={props.maxBackpackSize === 0}
          defaultOptions
          formatOptionLabel={CustomSelectOption}
          placeholder="Start typing..."
          isClearable
        />
      </Box>
    </Box>
  );
}

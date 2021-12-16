import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Heading } from '@chakra-ui/layout';
import { customStyles } from '../../selectStyle';
import gearProvider from '../../providers/gearProvider';
import { FormatProps, SelectOption } from "../../types/types";
import Select from "react-select"
import { Alert, AlertIcon } from "@chakra-ui/react";

type BackpackSelectorComponentProps = {
    coreName: string;
    undersuitName: string;
    setBackpack: Dispatch<SetStateAction<string>>;
}

export function BackpackSelectorComponent(props: BackpackSelectorComponentProps) {
    const [maxBackpackSize, setMaxBackpackSize] = useState(0);

    useEffect(() => {
        if (props.undersuitName.includes("Pembroke") || props.undersuitName.includes("Novikov")) {
            setMaxBackpackSize(3);
            return;
        }
        if (props.coreName === '') {
            setMaxBackpackSize(0);
        } else {
            gearProvider.GetCore(props.coreName).then((result) => {
                setMaxBackpackSize(result.BackpackMaxSize);
            });
        }

    }, [props.coreName, props.undersuitName])

    return (
        <BackpackSelectorDropdown setBackpack={props.setBackpack} maxBackpackSize={maxBackpackSize} />
    )
}

type BackpackSelectorDropdownProps = {
    setBackpack: Dispatch<SetStateAction<string>>;
    maxBackpackSize: number;
}

function BackpackSelectorDropdown(props: BackpackSelectorDropdownProps) {
    const [filter, setFilter] = useState('');
    const [backpacks, setBackpacks] = useState<SelectOption[]>([]);
    const [currentPack, setCurrentPack] = useState('');
    const [sizeWarning, setSizeWarning] = useState(false);

    useEffect(() => {
        gearProvider.GetBackpacksWithMaxSize('', props.maxBackpackSize).then(res => {
            setBackpacks(res);
            checkSize(currentPack, res);
        })
    }, [props.maxBackpackSize, currentPack])

    const loadOptions = () => backpacks.filter(b => b.label.toLowerCase().includes(filter));

    const checkSize = (selected: string, options: SelectOption[]) => {
        if (selected !== '' && !options.some(r => r.label === selected)) {
            setSizeWarning(true);
        } else {
            setSizeWarning(false);
        }
    }

    const handleGearChange = (selected: any) => {
        props.setBackpack(selected.label);
        setCurrentPack(selected.label);
        checkSize(selected.label, backpacks);
    }

    const formatOptionLabel = (props: FormatProps) => (
        <div style={{ display: "flex" }}>
            <div>{props.label}</div>
            <div style={{ marginLeft: "10px", color: "#ccc" }}>
                {props.type}
            </div>
        </div>
    );

    return (
        <Box maxWidth='300pt' id='component-backpack' padding='2pt' margin='auto'>
            <Heading fontSize='md'>Backpack</Heading>
            {sizeWarning ? <WrongSizeWarning /> : ''}
            <Box paddingTop='2pt'>
                <Select
                    id='backpack'
                    styles={customStyles}
                    options={loadOptions()}
                    onChange={handleGearChange}
                    onInputChange={setFilter}
                    isMulti={false}
                    isDisabled={props.maxBackpackSize === 0}
                    defaultOptions
                    formatOptionLabel={formatOptionLabel}
                    placeholder='Start typing...'
                />
            </Box>
        </Box>
    )
}

function WrongSizeWarning() {
    return (
        <Alert status='warning' variant='solid' borderRadius='5px' width='inherit'>
            <AlertIcon />
            This backpack is too large for the selected core. Select a different core or a backpack.
        </Alert>
    )
}
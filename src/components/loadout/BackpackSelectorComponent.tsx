import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Heading } from '@chakra-ui/layout';
import { customStyles } from '../../selectStyle';
import gearProvider from '../../gearProvider';
import { SelectOption } from "../../types/types";
import Select from "react-select"

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

    useEffect(() => {
        gearProvider.GetBackpacksWithMaxSize('', props.maxBackpackSize).then(res => {
            setBackpacks(res);
        })
    }, [props.maxBackpackSize])

    const loadOptions = () => backpacks.filter(b => b.label.toLowerCase().includes(filter));

    const handleGearChange = (selected: any) => {
        props.setBackpack(selected.label);
    }

    return (
        <Box maxWidth='300pt' id='component-backpack' padding='2pt' margin='auto'>
            <Heading fontSize='md'>Backpack</Heading>
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
                />
            </Box>
        </Box>
    )
}
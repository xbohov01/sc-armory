import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Heading } from '@chakra-ui/layout';
import AsyncSelect from "react-select/async"
import { customStyles } from '../../selectStyle';
import gearProvider from '../../gearProvider';

type BackpackSelectorComponentProps = {
    coreName: string;
    undersuitName: string;
    setBackpack: Dispatch<SetStateAction<string>>;
}

export function BackpackSelectorComponent(props: BackpackSelectorComponentProps) {
    const [maxBackpackSize, setMaxBackpackSize] = useState(0);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        if (props.undersuitName.includes("Pembroke") || props.undersuitName.includes("Novikov")){
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

    const loadOptions = async () => await gearProvider.GetBackpacksWithMaxSize(filter, maxBackpackSize);

    const handleGearChange = (selected: any) => {
        props.setBackpack(selected.label);
    }

    return (
        <Box maxWidth='300pt' id='component-backpack' padding='2pt' margin='auto'>
            <Heading fontSize='md'>Backpack</Heading>
            <Box paddingTop='2pt'>
                <AsyncSelect
                    id='backpack'
                    styles={customStyles}
                    loadOptions={loadOptions}
                    onChange={handleGearChange}
                    onInputChange={setFilter}
                    isMulti={false}
                    isDisabled={maxBackpackSize === 0}
                    defaultOptions
                />
            </Box>
        </Box>
    )
}
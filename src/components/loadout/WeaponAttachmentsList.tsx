import { Heading, HStack, VStack } from "@chakra-ui/layout"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Select from "react-select"
import { compactStyles } from "../../selectStyle"
import { KeyValue, WeaponAttachment, WeaponAttachmentSlot } from "../../types/types"
import weaponAttachmentProvider from "../../weaponAttachmentProvider"

type WeaponAttachmentsListProps = {
  weapon: string,
  updater: Dispatch<SetStateAction<string[]>>;
}

export function WeaponAttachmentsList(props: WeaponAttachmentsListProps) {
  const [slots, setSlots] = useState<WeaponAttachmentSlot[]>([]);
  const [selected, setSelected] = useState<KeyValue<string,string>[]>([]);

  useEffect(() => {
    setSlots(weaponAttachmentProvider.GetAttachmentSlots(props.weapon))
  }, [props.weapon])

  const update = (type:string, name:string) => {
    var newSelected = selected.filter(s => s.key !== type);
    newSelected.push({key:type, value:name});

    setSelected(newSelected);
    props.updater(newSelected.map(s => s.value));
  }

  return (
    <HStack marginTop='5pt'>
      {slots.map(s => <WeaponAttachmentSelector key={s.type} attachmentSlot={s} updater={update}/>)}
    </HStack>
  )
}

type WeaponAttachmentSelectorProps = {
  attachmentSlot: WeaponAttachmentSlot,
  updater: (type:string, name:string) => void,
}

export function WeaponAttachmentSelector(props: WeaponAttachmentSelectorProps) {
  const [filter, setFilter] = useState('');
  const [attachments, setAttachments] = useState<WeaponAttachment[]>([]);

  useEffect(() => {
    setAttachments(weaponAttachmentProvider
      .GetAttachments(props.attachmentSlot.type, props.attachmentSlot.size));
  }, [props.attachmentSlot.type, props.attachmentSlot.size]);
  
  const handleGearChange = (selected: any) => {
    props.updater(props.attachmentSlot.type, selected.label);
  }

  const loadOptions = () => 
    attachments
    .filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))
    .map(a => ({value: a.name, label: a.name}));


  return (
    <VStack flex={1} width='auto'>
      <Heading fontSize='sm'>{props.attachmentSlot.type}</Heading>
      <Select
        styles={compactStyles}
        options={loadOptions()}
        onChange={handleGearChange}
        onInputChange={setFilter}
        isMulti={false}
        defaultOptions
      />
    </VStack>
  )
}
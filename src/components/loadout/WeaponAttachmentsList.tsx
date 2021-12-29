import { Heading, HStack, VStack } from "@chakra-ui/layout"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Select from "react-select"
import { compactStyles } from "../../selectStyle"
import { KeyValue, WeaponAttachmentSlot } from "../../types/types"
import weaponAttachmentProvider from "../../providers/weaponAttachmentProvider"
import { AttachmentVM } from "../../client/viewModels/AttachmentVM"

type WeaponAttachmentsListProps = {
  weapon: string,
  updater: Dispatch<SetStateAction<string[]>>;
}

export function WeaponAttachmentsList(props: WeaponAttachmentsListProps) {
  const [slots, setSlots] = useState<WeaponAttachmentSlot[]>([]);
  const [selected, setSelected] = useState<KeyValue<string,string>[]>([]);

  useEffect(() => {
    weaponAttachmentProvider.GetAttachmentSlots(props.weapon).then(res => {
      setSlots(res);
    })
  }, [props.weapon])

  const update = (type:string, name:string) => {
    var newSelected = selected.filter(s => s.key !== type);
    newSelected.push({key:type, value:name});

    setSelected(newSelected);
    props.updater(newSelected.map(s => s.value));
  }

  return (
    <HStack marginTop='5pt' marginBottom='10pt' borderLeft='1pt solid whitesmoke' borderRight='1pt solid whitesmoke' paddingLeft='5pt' paddingRight='5pt'>
      {slots.map(s => <WeaponAttachmentSelector key={s.Type} attachmentSlot={s} updater={update}/>)}
    </HStack>
  )
}

type WeaponAttachmentSelectorProps = {
  attachmentSlot: WeaponAttachmentSlot,
  updater: (type:string, name:string) => void,
}

export function WeaponAttachmentSelector(props: WeaponAttachmentSelectorProps) {
  const [filter, setFilter] = useState('');
  const [attachments, setAttachments] = useState<AttachmentVM[]>([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    weaponAttachmentProvider.GetAttachments(
      props.attachmentSlot.Type, 
      props.attachmentSlot.MaxSize,
      props.attachmentSlot.MinSize).then((res) => {
      setAttachments(res);
    })
  }, [props.attachmentSlot.Type, props.attachmentSlot.MaxSize, props.attachmentSlot.MinSize]);
  
  const handleGearChange = (selected: any) => {
    // Check for selection clearing
    if (selected === null) return; 
    props.updater(props.attachmentSlot.Type, selected.label);
    setSelected(selected.label);
  }

  const loadOptions = () => 
    attachments
    .filter(a => a.LocalizedName.toLowerCase().includes(filter.toLowerCase()))
    .map(a => ({value: a.LocalizedName, label: a.LocalizedName}));

  const determineZeroing = ():string => {
    let vm = attachments.find(a => a.LocalizedName === selected);
    if (vm === undefined || vm.Type !== 'IronSight'){
      return '';
    }
    if (vm.AutoZeroingTime > 0){
      return 'Automatic ranging';
    } else if (vm.RangeIncrement > 0 && vm.AutoZeroingTime === 0){
      return 'Manual ranging'
    }
    return 'No ranging';
  }

  return (
    <VStack flex={1} width='auto' height='65pt'>
      <Heading fontSize='sm'>{props.attachmentSlot.Type}</Heading>
      <Select
        styles={compactStyles}
        options={loadOptions()}
        onChange={handleGearChange}
        onInputChange={setFilter}
        isMulti={false}
        defaultOptions
        isClearable
      />
      <Heading fontSize='xs'>{determineZeroing()}</Heading>
    </VStack>
  )
}
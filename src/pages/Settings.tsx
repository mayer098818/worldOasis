import { useForm } from "react-hook-form";
import CabinForm from "../features/cabins/CabinForm";
import Heading from "../ui/Heading";
import useSettings from "../features/settings/useSettings";
import Spinner from "../ui/Spinner";
import { Empty } from "antd";
import { useEffect } from "react";
import useEditSettings from "../features/settings/useEditSettings";
const settingsConfig = [
  {
    id: 'minBookingLength', label: 'MinBookingLength', type: 'numberInput', changeOnBlur: true, rules: {
      required: 'this field is required',
      min: { value: 1, message: 'MinBookingLength min value is 1' },
      max: { value: 30, message: 'MinBookingLength max value is 30' },
      valueAsNumber: true
    }
  },
  {
    id: 'maxBookingLength', label: 'MaxBookingLength', type: 'numberInput', changeOnBlur: true, rules: {
      required: 'this field is required',
      min: { value: 1, message: 'MinBookingLength min value is 1' },
      max: { value: 30, message: 'MinBookingLength max value is 30' },
      valueAsNumber: true
    }
  },
  {
    id: 'maxGuestsPerBooking', label: 'MaxGuestsPerBooking', type: 'numberInput', changeOnBlur: true, rules: {
      required: 'this field is required', min: { value: 1, message: 'MinBookingLength min value is 1' },
      max: { value: 30, message: 'MinBookingLength max value is 30' },
      valueAsNumber: true
    }
  },
  {
    id: 'breakfastPrice', label: 'Breakfast price', type: 'numberInput', changeOnBlur: true, rules: {
      min: { value: 1, message: 'MinBookingLength min value is 1' },
      max: { value: 30, message: 'MinBookingLength max value is 30' },
      valueAsNumber: true
    }
  }
]
function Settings() {
  const { settings, isLoading, error } = useSettings()
  const { control, reset } = useForm({ defaultValues: {} })
  const { editSettings, isPending } = useEditSettings()
  const handleBlur = (name: string, value: any) => {
    editSettings({ ...settings, [name]: value })
  }
  useEffect(() => {
    if (settings) {
      reset(settings)
    }
  }, [settings])
  if (isLoading) return <Spinner />
  if (error) return <Empty />
  return <>
    <Heading as="h1">Update hotel settings</Heading>
    <CabinForm isPending={isPending} cabinConfig={settingsConfig} control={control} onInputBlur={handleBlur} />
  </>;
}

export default Settings;

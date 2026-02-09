import { useEffect } from "react";

import Form from "../../ui/Form";

import useUser from "./useUser";
import CabinForm from "../cabins/CabinForm";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { Col, Row } from "antd";
import useUpdateUser from "./useUpdateUser";

const userConfig = [
  {
    id: 'email', label: 'email', type: 'input', disabled: true
  }, {
    id: 'fullName', label: 'Full Name', type: 'input',
  }, {
    id: 'avatar', label: 'Avatar', type: 'upload',
    maxCount: 1,
  }, {
    id: 'password', label: 'Password', type: 'inputPassword', rules: {
      validate: (value: string) => {
        if (value === '' || value === undefined) return true
        if (value.length < 6) return 'Password must be at least 6 characters'
        return true
      }
    }
  },
  // {
  //   id: 'passwordConfirm', label: 'Password Confirm', type: 'inputPassword', rules: {
  //     validate: (value: string, formValues: any) => {
  //       if (value === undefined || value === '') return 'Password is required'
  //       if (value.length < 6) return 'Password must be at least 6 characters'
  //       if (value !== formValues.password) return 'Passwords do not match'
  //       return true
  //     }
  //   }
  // },
]

function UpdateUserDataForm() {
  const { control, handleSubmit, formState: { errors }, reset } = useForm()
  const {
    user
  } = useUser()
  const { updateUser, isUpdating } = useUpdateUser()
  useEffect(() => {
    if (!user) return
    const { email, user_metadata } = user
    reset({
      email: email || '',
      fullName: (user_metadata?.fullName as string) || '',
      password: '',
      avatar: user_metadata?.avatar
        ? [
          {
            uid: '-1',
            name: 'avatar',
            status: 'done',
            url: user_metadata.avatar,
          },
        ]
        : [],
    })
  }, [user, reset])

  const onSubmit = (data) => {
    const avatarFile =
      data.avatar?.[0]?.originFileObj ?? undefined;
    updateUser({ fullName: data?.fullName, avatarFile, password: data?.password }, {
      onSuccess: () => reset({
        fullName: '',
        password: '',
        avatar: [],
      })
    })
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <CabinForm cabinConfig={userConfig} isPending={isUpdating} control={control} errors={errors} />
      <Row style={{ marginTop: '8px' }}>
        <Col span={14}></Col>
        <Col span={10}><Button variation="primary" >Submit</Button></Col>
      </Row>
    </Form>
  );
}

export default UpdateUserDataForm;

import { useForm } from "react-hook-form"
import CabinForm from "../cabins/CabinForm"
import Button from "../../ui/Button"
import styled from "styled-components"
import Form from "../../ui/Form.tsx"
import useSignup from "./useSignup"
import SpinnerMini from "../../ui/SpinnerMini"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
// import { useEffect, useState } from "react"
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-image:url('../../public/backgroundimage.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-blend-mode: overlay;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.4rem;
  
  & > * {
    width: 100%;
  }
`;
const cabinConfig: any[] = [
    {
        id: 'fullName',
        label: 'Full Name',
        type: 'input',
        rules: { required: 'Full Name is required' }
    },

    {
        id: 'email',
        label: 'Email',
        type: 'input',
        rules: { required: 'Email is required' }
    },

    {
        id: 'password',
        label: 'Password',
        type: 'inputPassword',
        rules: {
            required: 'Password is required', validate: (value: string) => {
                if (value.length < 6) {
                    return 'Password must be at least 6 characters'
                }
                return true
            }
        }
    },
    {
        id: 'passwordConfirm',
        label: 'Password Confirm',
        type: 'inputPassword',
        rules: {
            required: 'Password Confirm is required',
            validate: (value: string, formValues: any) => {
                if (value.length < 6) {
                    return 'Password must be at least 6 characters'
                }
                if (value !== formValues.password) {
                    return 'Passwords do not match'
                }
                return true
            }
        }
    },

]
const Signup = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm()
    const { signup, isSignupPending } = useSignup()
    const navigate = useNavigate()
    const onSubmit = (data: any) => {
        const { passwordConfirm, ...rest } = data
        signup(rest, {
            onSettled: () => reset(),
            onSuccess: () => {
                toast.success('Account created successfully.')
                navigate('/login', {
                    state: {
                        email: rest.email,
                        from: 'signup'
                    }
                })
            }
        })
    }
    return (
        <LoginLayout>
            <Form type="login" onSubmit={handleSubmit(onSubmit)}>
                <CabinForm type="vertical" cabinConfig={cabinConfig} isPending={isSignupPending} errors={errors} control={control}></CabinForm>
                <ButtonWrapper>
                    <Button variation="primary" disabled={isSignupPending}>
                        {!isSignupPending ? 'Create an account' : <SpinnerMini />}
                    </Button>
                </ButtonWrapper>
            </Form>
        </LoginLayout>
    )
}
export default Signup
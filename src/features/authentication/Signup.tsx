import { useForm } from "react-hook-form"
import CabinForm from "../cabins/CabinForm"
import Button from "../../ui/Button"
import styled from "styled-components"
import Form from "../../ui/Form"
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
        type: 'input',
        rules: { required: 'Password is required' }
    },
    {
        id: 'passwordConfirm',
        label: 'Password Confirm',
        type: 'input',
        rules: { required: 'Password Confirm is required' }
    },

]
const Signup = () => {
    const { control, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = (data) => {
        console.log(data, 'onSubmit')
    }
    // return (
    //     <Form type="regular" onSubmit={handleSubmit(onSubmit)}>
    //         <CabinForm cabinConfig={cabinConfig} control={control} errors={errors} />
    //         <Box>
    //             {/* <Button>Cancel</Button> */}
    //             <Button variation='primary'>Signup</Button>
    //         </Box>
    //     </Form>
    // )
    return (
        <LoginLayout>
            <Form type="login" onSubmit={handleSubmit(onSubmit)}>
                <CabinForm type="vertical" cabinConfig={cabinConfig} errors={errors} control={control}></CabinForm>
                <ButtonWrapper>
                    <Button variation="primary" >Create an account</Button>
                </ButtonWrapper>
            </Form>
        </LoginLayout>
    )
}
export default Signup
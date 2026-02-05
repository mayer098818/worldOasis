import { useForm } from "react-hook-form"
import CabinForm from "../cabins/CabinForm"
import Button from "../../ui/Button"
import styled from "styled-components"
import Form from "../../ui/Form"

const Box = styled.div`
display:flex;
justify-content:center;
margin-top:2.4rem;
`
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

]
const Signup = () => {
    const { control, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = (data) => {
        console.log(data, 'onSubmit')
    }
    return (
        <Form type="regular" onSubmit={handleSubmit(onSubmit)}>
            <CabinForm cabinConfig={cabinConfig} control={control} errors={errors} />
            <Box>
                {/* <Button>Cancel</Button> */}
                <Button variation='primary'>Signup</Button>
            </Box>
        </Form>
    )
}
export default Signup
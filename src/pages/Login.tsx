import styled from "styled-components";
// import LoginForm from "../features/authentication/LoginForm";
import Form from "../ui/Form";
import { useForm } from "react-hook-form";
import CabinForm from "../features/cabins/CabinForm";
import Button from "../ui/Button";
import { useEffect } from "react";
import useLogin from "../features/authentication/useLogin";
import Spinner from "../ui/Spinner";
import { Link, useLocation } from "react-router-dom";


const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-image: url('/backgroundimage.jpeg');
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
const LoginLink = styled.div`
  display:flex;
  justify-content:end;
  margin-top:1.4rem;
  color: var(--color-grey-700);
  &:hover {
    color: var(--color-brand-600);
  }
`;
const cabinConfig = [
  {
    id: 'email', label: 'Email', type: 'input', rules: {
      required: 'this email is required'
    }
  },
  {
    id: 'password', label: 'Password', type: 'inputPassword', rules: {
      required: 'this password is required',
      // validate: (value) => {
      //   if (value.length < 6) return "Password must be at least 6 characters";
      //   if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
      //   if (!/[!@#$%^&*]/.test(value)) return "Password must contain a special character";
      //   return true; // 校验通过
      // }
    }
  }
]

type LoginFormValues = {
  email: string;
  password: string;
};

function Login() {
  const { handleSubmit, formState: { errors }, control, reset } = useForm<LoginFormValues>()
  const { login, isLogining } = useLogin()
  const { state } = useLocation()
  useEffect(() => {
    if (state?.email && state.from === 'signup') {
      reset({ email: state.email })
    }
  }, [state, reset])
  const onSubmit = ({ email, password }: { email: string; password: string }) => {
    login(
      { email, password },
      {
        onSettled: () => {
          reset({ email: '', password: '' })
        },
      }
    )
  }
  if (isLogining) return <Spinner />
  return <LoginLayout>
    <Form type="login" onSubmit={handleSubmit(onSubmit)}>
      <CabinForm type="vertical" cabinConfig={cabinConfig} isPending={isLogining} errors={errors} control={control}></CabinForm>
      <LoginLink >
        <Link to="/signup">
          Don't have an account? Sign up here
        </Link>
      </LoginLink>
      <ButtonWrapper>
        <Button variation="primary" >Login</Button>
      </ButtonWrapper>
    </Form>
  </LoginLayout>;
}

export default Login;

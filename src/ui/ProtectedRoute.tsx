import { Navigate } from "react-router-dom"
import useUser from "../features/authentication/useUser"
import Spinner from "./Spinner"
import styled from "styled-components";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading, isAuthenticated } = useUser()
    console.log(user, isAuthenticated, 'user')
    if (isLoading) return <FullPage><Spinner /></FullPage>
    if (!isLoading && !isAuthenticated) return <Navigate to="/login" />
    if (isAuthenticated) return children
}
export default ProtectedRoute
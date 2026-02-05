import { LogOut } from "lucide-react";
import ButtonIcon from "../../ui/ButtonIcon.tsx";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
    const { logout, isLogouting } = useLogout();

    return (
        <ButtonIcon disabled={isLogouting} onClick={logout}>
            {!isLogouting ? <LogOut /> : <SpinnerMini />}
        </ButtonIcon>
    );
}

export default Logout;

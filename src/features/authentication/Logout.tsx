import { LogOut } from "lucide-react";
import ButtonIcon from "../../ui/ButtonIcon.tsx";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
    const { logout, isLogouting } = useLogout();

    return (
        <ButtonIcon disabled={isLogouting} onClick={logout}>
            {!isLogouting ? <LogOut color="var(--color-grey-600)" /> : <SpinnerMini color="var(--color-grey-600)" />}
        </ButtonIcon>
    );
}

export default Logout;

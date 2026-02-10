import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";
import { Moon, SunMedium } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

function HeaderMenu() {
    const navigate = useNavigate();
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <StyledHeaderMenu>
            <li onClick={() => navigate("/account")}>
                <ButtonIcon >
                    <UserAvatar />
                </ButtonIcon>
            </li>
            <li>
                <ButtonIcon
                    onClick={toggleDarkMode}
                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                    title={isDarkMode ? "Light mode" : "Dark mode"}
                >
                    {isDarkMode ? <SunMedium color="var(--color-grey-600)" /> : <Moon color="var(--color-grey-600)" />}
                </ButtonIcon>
            </li>
            <li>
                <Logout />
            </li>
        </StyledHeaderMenu>
    );
}

export default HeaderMenu;

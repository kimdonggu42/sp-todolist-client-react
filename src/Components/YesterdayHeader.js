import * as Header from "./Header";
import SideBar from './SideBar';
import { useState, useContext } from 'react';
import { ThemeContext } from "../theme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';

function YesterdayHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const { isChange, changeMode } = useContext(ThemeContext);

    const sideBarHandle = () => {
        setIsOpen(true);
    }

    return (
        <Header.HeaderContainer>
            <div className='title'>
                어제 한 일
            </div>
            <Header.ModeChangeButton>
                <FontAwesomeIcon icon={isChange ? faMoon : faSun} size="lg" onClick={changeMode} />
            </Header.ModeChangeButton>
            <Header.SideBarButton onClick={sideBarHandle}>
                <FontAwesomeIcon icon={faBars} size="lg" />
            </Header.SideBarButton>
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        </Header.HeaderContainer>
    );
}

export default YesterdayHeader;
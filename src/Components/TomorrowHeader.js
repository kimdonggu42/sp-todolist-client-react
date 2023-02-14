import * as Header from "./Header";
import SideBar from './SideBar';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';

function TomorrowHeader({ isChange, changeMode }) {
    const [isOpen, setIsOpen] = useState(false);

    const sideBarHandle = () => {
        setIsOpen(true);
    }

    return (
        <Header.HeaderContainer>
            <div className='title'>
                내일 할 일
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

export default TomorrowHeader;
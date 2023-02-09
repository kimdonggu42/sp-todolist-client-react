import * as Header from "./Header";
import SideBar from './SideBar';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";

function YesterdayHeader() {
    const [isOpen, setIsOpen] = useState(false);

    const sideBarHandle = () => {
        setIsOpen(true);
    }

    return (
        <Header.HeaderContainer>
            <div className='title'>
                어제 한 일
            </div>
            <Header.SideBarButton onClick={sideBarHandle}>
                <FontAwesomeIcon icon={faBars} size="lg" />
            </Header.SideBarButton>
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        </Header.HeaderContainer>
    );
}

export default YesterdayHeader;
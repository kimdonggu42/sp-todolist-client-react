import './Header.css';
import { useState } from 'react';
import SideBar from './SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const sideBarHandle = () => {
        setIsOpen(true);
    }

    return (
        <header>
            <div className='title'>
                TODO LIST
            </div>
            <div className='sideBarButton' onClick={sideBarHandle}>
                <FontAwesomeIcon icon={faBars} size="lg" />
            </div>
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        </header>
    );
}

export default Header;
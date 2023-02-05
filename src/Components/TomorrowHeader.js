import './TodayHeader.css';
import { useState } from 'react';
import SideBar from './SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";

function TomorrowHeader() {
    const [isOpen, setIsOpen] = useState(false);

    const sideBarHandle = () => {
        setIsOpen(true);
    }

    return (
        <header>
            <div className='titleWrapper'>
                <div className='today_Title'>
                    TODO LIST
                </div>
                <div className='today_subTitle'>
                    내일 할 일
                </div>
            </div>
            <div className='sideBarButton' onClick={sideBarHandle}>
                <FontAwesomeIcon icon={faBars} size="lg" />
            </div>
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        </header>
    );
}

export default TomorrowHeader;
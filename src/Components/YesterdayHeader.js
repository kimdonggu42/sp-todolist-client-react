import './TodayHeader.css';
import { useState } from 'react';
import SideBar from './SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";

function YesterdayHeader() {
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
                    어제 한 일
                </div>
            </div>
            <div className='sideBarButton' onClick={sideBarHandle}>
                <FontAwesomeIcon icon={faBars} size="lg" />
            </div>
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        </header>
    );
}

export default YesterdayHeader;
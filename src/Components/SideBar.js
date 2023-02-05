import './SideBar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from "@fortawesome/free-regular-svg-icons";


function SideBar({ isOpen, setIsOpen }) {
    const sideBarCloseHandle = () => {
        setIsOpen(false);
    }

    return (
        <>
        {isOpen ?
        <div className='back'>
            <div className={`displayNone ${isOpen ? 'open' : null}`}>
                <div className='closeSideBar'>
                    <button className='closeButton' onClick={sideBarCloseHandle}>
                        ✕
                    </button>
                </div>
                <ul className='sideList'>
                    <li>
                        <Link to='/'><FontAwesomeIcon className='icon' icon={faFile} size="lg" />전체 할 일 보기</Link>
                    </li>
                    <li>
                        <Link to='/today'><FontAwesomeIcon className='icon' icon={faFile} size="lg" />오늘 할 일 보기</Link>
                    </li>
                    <li>
                        <Link to='/tomorrow'><FontAwesomeIcon className='icon' icon={faFile} size="lg" />내일 할 일 보기</Link>
                    </li>
                    <li>
                        <Link to='/yesterday'><FontAwesomeIcon className='icon' icon={faFile} size="lg" />어제 한 일 보기</Link>
                    </li>
                </ul>
                </div>
        </div> : null}
        </>
    );
}

export default SideBar;
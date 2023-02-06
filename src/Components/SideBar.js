import './SideBar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faFileCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faFileCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faFileCircleExclamation } from '@fortawesome/free-solid-svg-icons';

function SideBar({ isOpen, setIsOpen }) {
    const sideBarCloseHandle = () => {
        setIsOpen(false);
    };

    // const userMenu = useRef(null)

    // const sideBarClose = ({ target }) => {
    //     if (isOpen && userMenu.current.contains(target)) {
    //         setIsOpen(false);
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener('click', sideBarClose);
    //     return () => {
    //         window.addEventListener('click', sideBarClose);
    //     };
    // });

    return (
        <>
            {isOpen ?
                <div className='back'>
                    <div className={`displayNone ${isOpen ? 'open' : null}`}>
                        <div className='closeSideBar'>
                            <button className='closeButton' onClick={sideBarCloseHandle}>
                                <FontAwesomeIcon className='icon' icon={faXmark} size="lg" />
                            </button>
                        </div>
                        <ul className='sideList'>
                            <li>
                                <Link to='/'><FontAwesomeIcon className='icon' icon={faHouse} size="lg" />전체 할 일 보기</Link>
                            </li>
                            <li>
                                <Link to='/today'><FontAwesomeIcon className='icon' icon={faFileCircleExclamation} size="lg" />오늘 할 일 보기</Link>
                            </li>
                            <li>
                                <Link to='/tomorrow'><FontAwesomeIcon className='icon' icon={faFileCircleQuestion} size="lg" />내일 할 일 보기</Link>
                            </li>
                            <li>
                                <Link to='/yesterday'><FontAwesomeIcon className='icon' icon={faFileCircleCheck} size="lg" />어제 한 일 보기</Link>
                            </li>
                        </ul>
                    </div>
                </div> : null}
        </>
    );
}

export default SideBar;
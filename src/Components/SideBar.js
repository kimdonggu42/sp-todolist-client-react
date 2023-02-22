import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faHouse, faFileCircleCheck, faFileCircleQuestion, faFileCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const BackDrop = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);

    > .displayNone {
        z-index: 5;
        background-color: ${(props) => props.theme.popUpBackgroundColor};
        height: 100%;
        width: 200px;
        right: -200px;
        position: fixed;
        transition: 0.2s ease;
        box-shadow: 0 0 20px rgba(0,0,0,0.19), 0 10px 10px rgba(0,0,0,0.10);

    @media screen and (min-width: 550px) {
            height: 270px;
            width: 600px;
            top: -600px;
            position: relative;
        }
    }

    > .open {
        right: 0;
        transition: 0.2s ease;

    @media screen and (min-width: 550px) {
            top: 0;
            transition: 0.2s ease;
        }
    }
`;

const CloseButton = styled.button`
    float: right;
    border: none;
    background-color: transparent;
    margin: 33.5px 25.5px 0 0;
    font-size: 20px;
    color: ${(props) => props.theme.text};
    &:hover {
        text-decoration: none;
    }
    &:active {
        color: gray;
    }

    @media screen and (min-width: 550px) {
        margin: 33.5px 11px 0 0;
    }
`;

const SideList = styled.ul`
    margin-top: 97px;
    list-style: none;

    @media screen and (min-width: 550px) {
        margin-top: 70px;
    }
`;

const SideListMenu = styled.li`
    padding-left: 15px;
    height: 50px;
    line-height: 50px;
    color: ${(props) => props.theme.text};
    &:hover {
        background-color: ${(props) => props.theme.sideListHover};
    }

    > a {
        display: block;
        text-decoration: none;
        color: inherit;
        font-weight: 500;
        padding-left: 5px;
    }

    .icon {
        margin-right: 15px;
    }

    @media screen and (min-width: 550px) {
        padding-left: 20px;

        .icon {
            margin-right: 20px;
        }
    }
`;

function SideBar({ isOpen, setIsOpen }) {
    const sideBarCloseHandle = () => {
        setIsOpen(false);
        // 모달 창 오픈 시 뒷 페이지 스크롤 방지 해제
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
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
                <BackDrop>
                    <div className={`displayNone ${isOpen ? 'open' : null}`}>
                        <CloseButton onClick={sideBarCloseHandle}>
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                        </CloseButton>
                        <SideList>
                            <SideListMenu>
                                <Link to='/'>
                                    <FontAwesomeIcon className='icon' icon={faHouse} size="lg" />전체 할 일 보기
                                </Link>
                            </SideListMenu>
                            <SideListMenu>
                                <Link to='/today'>
                                    <FontAwesomeIcon className='icon' icon={faFileCircleExclamation} size="lg" />오늘 할 일 보기
                                </Link>
                            </SideListMenu>
                            <SideListMenu>
                                <Link to='/tomorrow'>
                                    <FontAwesomeIcon className='icon' icon={faFileCircleQuestion} size="lg" />내일 할 일 보기
                                </Link>
                            </SideListMenu>
                            <SideListMenu>
                                <Link to='/yesterday'>
                                    <FontAwesomeIcon className='icon' icon={faFileCircleCheck} size="lg" />어제 한 일 보기
                                </Link>
                            </SideListMenu>
                        </SideList>
                    </div>
                </BackDrop> : null}
        </>
    );
}

export default SideBar;
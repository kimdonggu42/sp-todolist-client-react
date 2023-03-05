import styled from 'styled-components';
import SideBar from './SideBar';
import { useState, useContext } from 'react';
import { ThemeContext } from '../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';


export const HeaderContainer = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.backgroundColor};

    > .title {
        margin-bottom: 20px;
        font-size: 35px;
        color: ${(props) => props.theme.title};
        font-weight: bolder;
        flex: 10;
    }
`;

export const ModeChangeButton = styled.div`
    height: 15px;
    margin: 16px 20px 0 0;
    color: ${(props) => props.theme.text};
`;

export const SideBarButton = styled.div`
    height: 15px;
    margin: 16px 4.5px 0 0;
    color: ${(props) => props.theme.text};
    &:active {
        color: gray;
    }

    @media screen and (min-width: 550px) {
        margin: 16px 10px 0 0;
    }
`;

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { isChange, changeMode } = useContext(ThemeContext);

    const sideBarHandle = () => {
        setIsOpen(true);
        // 모달 창 오픈 시 뒷 페이지 스크롤 방지
        document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    }

    return (
        <HeaderContainer>
            <div className='title'>
                TODO LIST
            </div>
            <ModeChangeButton>
                <FontAwesomeIcon icon={isChange ? faMoon : faSun} size="lg" onClick={changeMode} />
            </ModeChangeButton>
            <SideBarButton onClick={sideBarHandle}>
                <FontAwesomeIcon icon={faBars} size="lg" />
            </SideBarButton>
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        </HeaderContainer>
    );
}

export default Header;
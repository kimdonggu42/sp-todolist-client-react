import { createContext } from "react"

export const ThemeContext = createContext(null);

export const lightTheme = {
    backgroundColor: `white`,
    title: `#46554a`,
    button: `black`,
    text: 'black',
    pagenationFocus: `#e3e5e9`,
    popUpBackgroundColor: `white`,
    sideListHover: `lightgray`,
    modalInputBack: `white`
}

export const darkTheme = {
    backgroundColor: `#171a1b`,
    title: '#e3e5e9',
    button: '#e3e5e9',
    text: '#e3e5e9',
    pagenationFocus: 'black',
    popUpBackgroundColor: '#232527',
    sideListHover: `#393b3d`,
    modalInputBack: `#393b3d`
}
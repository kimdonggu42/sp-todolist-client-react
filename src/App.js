import './App.css';
import AllTodoList from './Pages/AllTodoList';
import TodayTodoList from './Pages/TodayTodoList';
import TomorrowTodoList from './Pages/TomorrowTodoList';
import YesterdayTodoList from './Pages/YesterdayTodoList';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ThemeContext } from './theme';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    display: flex;
    justify-content: center;
    height: 100vh;
    background-color: ${(props) => props.theme.backgroundColor};;
}
`;

function App() {
  const [isChange, setIsChange] = useState(false);

  const changeMode = () => {
    setIsChange(!isChange);
  }

  return (
    <ThemeContext.Provider value={{ isChange, changeMode }}>
      <ThemeProvider theme={isChange ? darkTheme : lightTheme}>
        <div className="App">
          <GlobalStyle />
          <Routes>
            <Route path='/' element={<AllTodoList />} />
            <Route path='/today' element={<TodayTodoList />} />
            <Route path='/tomorrow' element={<TomorrowTodoList />} />
            <Route path='/yesterday' element={<YesterdayTodoList />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
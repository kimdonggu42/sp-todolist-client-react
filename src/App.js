import './App.css';
import AllTodoList from './Pages/AllTodoList';
import TodayTodoList from './Pages/TodayTodoList';
import TomorrowTodoList from './Pages/TomorrowTodoList';
import YesterdayTodoList from './Pages/YesterdayTodoList';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
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
    <ThemeProvider theme={isChange ? darkTheme : lightTheme}>
      <div className="App">
        <GlobalStyle />
          <Routes>
            <Route path='/' element={<AllTodoList isChange={isChange} changeMode={changeMode} />} />
            <Route path='/today' element={<TodayTodoList isChange={isChange} changeMode={changeMode} />} />
            <Route path='/tomorrow' element={<TomorrowTodoList isChange={isChange} changeMode={changeMode} />} />
            <Route path='/yesterday' element={<YesterdayTodoList isChange={isChange} changeMode={changeMode} />} />
          </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
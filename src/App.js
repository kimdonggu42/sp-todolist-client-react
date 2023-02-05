import './App.css';
import AllTodoList from './Pages/AllTodoList';
import TodayTodoList from './Pages/TodayTodoList';
import TomorrowTodoList from './Pages/TomorrowTodoList';
import YesterdayTodoList from './Pages/YesterdayTodoList';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<AllTodoList />} />
        <Route path='/today' element={<TodayTodoList />} />
        <Route path='/tomorrow' element={<TomorrowTodoList />} />
        <Route path='/yesterday' element={<YesterdayTodoList />} />
      </Routes>
    </div>
  );
}

export default App;
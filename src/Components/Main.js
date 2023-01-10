import React, { useState, useEffect } from "react";
import './Main.css';
import uuid from "react-uuid";
import dummyData from "../dummyData";
import TodoList from "./TodoList";
import Pagenation from "./Pagenation";

function Main() {
    const [todoData, setTodoData] = useState(() => JSON.parse(window.localStorage.getItem('localData')) || dummyData);
    const [checkedItems, setCheckedItems] = useState(() => JSON.parse(window.localStorage.getItem('localCheckedData')) || []);
    const [todoText, setTodoText] = useState('');

    // 페이지 당 표시할 데이터 수 상태
    const [limit, setLimit] = useState(10);  // 기본값: 10개씩 노출
    // 현재 페이지 번호 상태
    const [page, setPage] = useState(1);  // 기본값: 1페이지부터 노출
    // 각 페이지에서 첫 데이터의 위치(index) 계산
    const offset = (page - 1) * limit;

    useEffect(() => {
        window.localStorage.setItem('localData', JSON.stringify(todoData))
    }, [todoData])

    useEffect(() => {
        window.localStorage.setItem('localCheckedData', JSON.stringify(checkedItems))
    }, [checkedItems])

    // 새로운 todo 추가하는 이벤트 핸들러
    const addTodoText = () => {
        const newTodoText = {
            id: uuid(),
            createdAt: new Date(),
            content: todoText,
        };
        if (todoText) {  // input에 입력값이 없으면 새로운 todo를 추가하지 못하게 함
            setTodoData([newTodoText, ...todoData]);
            return setTodoText('');
        };
    };

    // DELETE
    const deleteTodoText = (deleteId) => {
        setTodoData(todoData.filter((value) => value.id !== deleteId));
    };

    // input 상태 관리
    const handleChangeTodoText = (event) => {
        setTodoText(event.target.value)
    };

    // Enter 키 입력 시에도 동일하게 addTodoText 이벤트 핸들러 동작하게 하는 이벤트 핸들러
    const handleKeyupTodoText = (event) => {
        if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
            addTodoText(event);
        }
    };

    // 체크박스 상태 체크
    const handleCheckChange = (checked, id) => {
        if (checked) {
            setCheckedItems([...checkedItems, id]);
        } else {
            setCheckedItems(checkedItems.filter((value) => value !== id));
        }
        console.log(checked)
    };

    // 새로고침하면 날자 다 바뀜 
    // data 등록 날짜 및 시간 변환 함수 
    // const inputTime = () => {
    //     let now = new Date();
    //     let year = now.getFullYear();
    //     let month = now.getMonth() + 1;
    //     let date = now.getDate();
    //     let hour = now.getHours();
    //     let min = now.getMinutes();
    //     return `${year}/${month}/${date} ${hour} : ${min}`;
    // }

    return (
        <main>
            <div className="inputContainer">
                <input className="input" type='text' value={todoText} placeholder="text" onChange={handleChangeTodoText} onKeyUp={handleKeyupTodoText} />
            </div>
            <div className="selectDataCount">
                <select type="number" value={limit} onChange={({ target: { value } }) => setLimit(Number(value))}>
                    <option value="5">5개씩</option>
                    <option value="10">10개씩</option>
                    <option value="20">20개씩</option>
                    <option value="30">30개씩</option>
                </select>
            </div>
            <ul>
                {todoData.slice(offset, offset + limit).map((value, index) =>
                    <TodoList
                        list={value}
                        key={index}
                        deleteButton={deleteTodoText}
                        handleCheckChange={handleCheckChange}
                        checkedItems={checkedItems}
                        todoData={todoData}
                        setTodoData={setTodoData}
                    />
                )}
            </ul>
            <Pagenation total={todoData.length} limit={limit} page={page} setPage={setPage} />
        </main>
    );

}

export default Main;
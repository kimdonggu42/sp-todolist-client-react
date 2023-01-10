import React, { useState, useEffect } from "react";
import './Input.css';
import dummyData from "../dummyData";
import TodoList from "./TodoList";

function Input() {
    const [todoData, setTodoData] = useState(() => JSON.parse(window.localStorage.getItem('localData')) || dummyData);

    useEffect(() => {
        window.localStorage.setItem('localData', JSON.stringify(todoData))
    }, [todoData])

    // localData 추가
    const [todoText, setTodoText] = useState('');
    const addTodoText = (e) => {
        e.preventDefault();
        const newTodoText = {
            id: todoData.length + 10,
            createdAt: new Date(),
            content: todoText,
        };
        if (todoText) {  // input에 입력값이 없으면 새로운 todo를 추가하지 못하게 함
            setTodoData([newTodoText, ...todoData]);
            return setTodoText('');
        }
    };

    const handleChangeTodoText = (event) => {
        setTodoText(event.target.value)
    };

    // localData 삭제
    const deleteTodoText = (deleteId) => {
        setTodoData(todoData.filter((value) => value.id !== deleteId));
    };

    // Enter 키 입력 시에도 동일하게 addTodoText 이벤트 핸들러 동작하게 하는 이벤트 핸들러
    const handleKeyupTodoText = (event) => {
        if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
            addTodoText(event);
        }
    };

    // 체크박스 상태 체크
    const [checkedItems, setCheckedItems] = useState(() => JSON.parse(window.localStorage.getItem('localCheckedData')) || []);

    useEffect(() => {
        window.localStorage.setItem('localCheckedData', JSON.stringify(checkedItems))
    }, [checkedItems])

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
        <div>
            <div className="inputContainer">
                <input className="input" type='text' value={todoText} placeholder="text" onChange={handleChangeTodoText} onKeyUp={handleKeyupTodoText} />
            </div>
            {todoData.map((value, index) =>
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
        </div>
    );

}

export default Input;
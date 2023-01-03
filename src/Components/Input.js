import React, { useState, useEffect } from "react";
import './Input.css';
import dummyData from "../dummyData";
import TodoList from "./TodoList";

function Input() {
    const [todoData, setTodoData] = useState(() =>
        JSON.parse(window.localStorage.getItem('localData')) || dummyData
    );

    useEffect(() => {
        window.localStorage.setItem('localData', JSON.stringify(todoData))
    }, [todoData])


    // localData 추가
    const [todoText, setTodoText] = useState('');

    const addTodoText = () => {  // event가 인자로 안 들어오면 키를 누를때도 실행되고 땠을때도 실행되고 2번 실행된다 ??
        const newTodoText = {
            id: todoData.length + 10,
            createdAt: new Date(),
            content: todoText,
        };
        setTodoData([newTodoText, ...todoData]);
        return setTodoText('');
    };

    // localData 삭제
    const deleteTodoText = (deleteId) => {
        setTodoData(todoData.filter((value) => value.id !== deleteId));
    };

    const handleChangTodoText = (event) => {
        setTodoText(event.target.value)
    };

    // Enter 키 입력 시에도 동일하게 addTodoText 이벤트 핸들러 동작하게 하는 이벤트 핸들러
    const handleKeyupTodoText = (event) => {
        if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
            addTodoText(event);
        }
    };

    // 체크박스 상태 체크
    const [checkedItems, setCheckedItems] = useState([])

    const handleCheckChange = (checked, id) => {
        if (checked) {
            setCheckedItems([...checkedItems, id]);
        } else {
            setCheckedItems(checkedItems.filter((value) => value !== id));
        }
        console.log(checked)
    };

    return (
        <div>
            <div className="inputContainer">
                <input className="input" type='text' value={todoText} placeholder="What's your plan?" onChange={handleChangTodoText} onKeyUp={handleKeyupTodoText} />
            </div>
            {todoData.map((value, index) =>
                <TodoList list={value} key={index} deleteButton={deleteTodoText} handleCheckChange={handleCheckChange} checkedItems={checkedItems} />
            )}
        </div>
    );

}

export default Input;
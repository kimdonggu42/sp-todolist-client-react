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
    const addTodoText = () => {
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
    }

    const handleChangText = (event) => {
        setTodoText(event.target.value)
    };

    return (
        <div>
            <div className="inputContainer">
                <div className="input">
                    <input type='text' value={todoText} onChange={handleChangText} />
                </div>
                <div className="submit">
                    <button onClick={addTodoText}>추가</button>
                </div>
            </div>
            {todoData.map((value) =>
                <TodoList list={value} key={value.id} deleteButton={deleteTodoText} />
            )}
        </div>
    );

}

export default Input;
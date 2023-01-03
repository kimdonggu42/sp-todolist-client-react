import React from "react";
import './TodoList.css';

function TodoList({ list, deleteButton, handleCheckChange, checkedItems }) {

    return (
        <div className="todoListContainer">
            <div className="checkTodo"> 
                <input
                    type='checkbox'
                    id={list.id}
                    onChange={(e) => { handleCheckChange(e.target.checked, list.id) }}
                    checked={checkedItems.includes(list.id) ? true : false}
                />
                <label htmlFor={list.id}></label>
            </div>
            <div className="todocontent">{list.content}</div>
            <div className="information">{new Date(list.createdAt).toLocaleString()}</div>
            <div className="delete">
                <button className="deleteButton" onClick={() => deleteButton(list.id)}><i className="fa-regular fa-square-minus"></i></button>
            </div>
        </div>
    );
}

export default TodoList;
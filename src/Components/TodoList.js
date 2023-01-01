import React from "react";
import './TodoList.css';

function TodoList({ list, deleteButton }) {

    return (
        <div className="todoListContainer">
            <div className="checkTodo">
                <input type='checkbox' />
            </div>
            <div className="todocontent">{list.content}</div>
            <div className="information">{new Date(list.createdAt).toLocaleString()}</div>
            <div className="delete">
                <button onClick={() => deleteButton(list.id)}>삭제</button>
            </div>
        </div>
    );
}

export default TodoList;
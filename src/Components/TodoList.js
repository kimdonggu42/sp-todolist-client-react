import React, { useState, useEffect, useRef } from "react";
import './TodoList.css';

function TodoList({ list, deleteButton, handleCheckChange, checkedItems, todoData, setTodoData }) {
    const [edit, setEdit] = useState(false);
    const [newText, setNewText] = useState('');  // 기존에 작성한 값 불러오기가 안 되고 있음

    const editInputRef = useRef(null);

    useEffect(() => {
        if (edit) {
            editInputRef.current.focus();
        }
    }, [edit]);

    const onClickEditButton = () => {
        setEdit(true);
    };

    const onChangeEditInput = (e) => {
        setNewText(e.target.value);
    };

    const onClickSubmitButton = (e) => {
        const nextList = todoData.map((value) => ({
            ...value, content: value.id === list.id ? newText : value.content,
        }))
        setTodoData(nextList)
        setEdit(false)
    };

    return (
        <div className="todoListContainer">
            <div className="checkTodo">
                {/* 체크박스 */}
                <input
                    type='checkbox'
                    id={list.id}
                    onChange={(e) => { handleCheckChange(e.target.checked, list.id) }}
                    checked={checkedItems.includes(list.id) ? true : false}
                />
                <label htmlFor={list.id}></label>
            </div>
            {/* 기존에 등록해둔 content 수정 */}
            {edit ? (<input className="editTodoContent" type='text' value={newText} ref={editInputRef} onChange={onChangeEditInput}></input>)
                : (<div className="todocontent">{list.content}</div>)}
            {/* 데이터 등록 날짜 및 시간 */}
            <div className="inputDate">{new Date(list.createdAt).toLocaleString()}</div>
            {/* 평소(수정 상태가 아닐 때)에는 수정 버튼을 띄우고, 클릭 시 수정 완료 버튼을 띄운다. */}
            {edit ? (<div className="complete">
                <button className="completeButton" onClick={onClickSubmitButton}><i className="fa-regular fa-square-check"></i></button>
            </div>) : (<div className="edit">
                <button className="editButton" onClick={onClickEditButton}><i className="fa-regular fa-pen-to-square"></i></button>
            </div>)}
            {/* 삭제 버튼 */}
            <div className="delete">
                <button className="deleteButton" onClick={() => deleteButton(list.id)}><i className="fa-regular fa-trash-can"></i></button>
            </div>
        </div>
    );
}

export default TodoList;
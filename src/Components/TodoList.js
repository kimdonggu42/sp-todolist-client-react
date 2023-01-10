import React, { useState, useEffect, useRef } from "react";
import './TodoList.css';

function TodoList({ list, deleteButton, handleCheckChange, checkedItems, todoData, setTodoData }) {
    const [edit, setEdit] = useState(false);
    const [newText, setNewText] = useState(list.content);  // 기존에 작성한 값 불러오기가 안 되고 있음

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

    const onClickSubmitButton = () => {
        const nextList = todoData.map((value) => ({ ...value, content: value.id === list.id ? newText : value.content }));
        setTodoData(nextList)
        setEdit(false)
    };

    return (
        // 체크된 todoList 컬러 변경 조건부 렌더링
        <li key={list.id} className={`todoListContainer ${checkedItems.includes(list.id) ? 'clearTodoContent' : null}`}>
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
            {/* todo 텍스트 */}
            {/* edit 버튼을 클릭하면 todoContent 수정 상태가 되고, 다시 edit 버튼을 클릭하면 수정한 todoContent가 저장된다. */}
            {edit ?
                (<input className="editTodoContent" type='text' value={newText} ref={editInputRef} onChange={onChangeEditInput}></input>)
                : (<div className="todocontent">{list.content}</div>)}
            {/* 데이터 등록 날짜 및 시간 */}
            <div className="inputDate">{new Date(list.createdAt).toLocaleString()}</div>
            {/* todo 수정 버튼 */}
            {/* 평소(수정 상태가 아닐 때)에는 수정 버튼을 띄우고, 클릭 시 수정 완료 버튼을 띄운다. &&  체크된 todo라면 수정 버튼을 숨긴다.*/}
            {!checkedItems.includes(list.id) ?
                (edit ?
                    (<div className="complete">
                        <button className="completeButton" onClick={onClickSubmitButton}><i className="fa-regular fa-square-check"></i></button>
                    </div>)
                    : (<div className="edit">
                        <button className="editButton" onClick={onClickEditButton}><i className="fa-regular fa-pen-to-square"></i></button>
                    </div>))
                : null}
            {/* todo 삭제 버튼 */}
            <div className="delete">
                <button className="deleteButton" onClick={() => deleteButton(list.id)}><i className="fa-regular fa-trash-can"></i></button>
            </div>
        </li>
    );
}

export default TodoList;
import React, { useState, useEffect, useRef } from "react";
import './TodoList.css';

function TodoList({ list, deleteButton, handleCheckChange, checkedItems, todoData, setTodoData }) {
    // 수정 모드 상태
    const [edit, setEdit] = useState(false);
    // 수정한 값이 담길 변수
    const [newContent, setNewContent] = useState(list.content);

    const editInputRef = useRef(null);
    // edit 버튼을 클릭했을 때, ref를 props로 넘겨준 input 속성에 focus된다.
    useEffect(() => {
        if (edit) {
            editInputRef.current.focus();
        }
    }, [edit]);

    // 수정 버튼 클릭 시 수정 모드 활성화하는 이벤트 핸들러
    const onClickEditButton = () => {
        setEdit(true);
    };

    // 수정 모드 시 입력되는 텍스트 input 상태 관리
    const onChangeEditInput = (e) => {
        setNewContent(e.target.value);
    };

    // 수정 버튼 클릭 시 수정한 텍스트 저장하는 이벤트 핸들러
    const onClickSubmitButton = () => {
        // 기존 todoData의 id와 클릭한 todoData가 일치하면 클릭한 todoData의 content를 newContent로 바꾸고 나머지 todoData는 그대로 둔다.
        const editTodoList = todoData.map((value) => ({ ...value, content: value.id === list.id ? newContent : value.content }));
        // 수정한 리스트를 새로 넣어준다.
        setTodoData(editTodoList)
        // 수정 모드 끄기
        setEdit(false)
    };

    return (
        // 체크된 todoList 컬러 변경 조건부 렌더링
        <li className={`todoListContainer ${checkedItems.includes(list.id) ? 'clearTodoContent' : null}`}>
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
            {/* todoContent */}
            {/* edit 버튼을 클릭하면 todoContent 수정 상태가 되고, 다시 edit 버튼을 클릭하면 수정한 todoContent가 저장된다. */}
            {edit ?
                <input className="editTodoContent" type='text' value={newContent} ref={editInputRef} onChange={onChangeEditInput}></input>
                // (<input className="editTodoContent" type='text' value={newContent} onChange={onChangeEditInput}></input>)
                : <div className="todocontent">{list.content}</div>}
            {/* 데이터 등록 날짜 및 시간 */}
            <div className="inputDate">{new Date(list.createdAt).toLocaleString()}</ div>
            {/* todo 수정 버튼 */}
            {/* 평소(수정 상태가 아닐 때)에는 수정 버튼을 띄우고, 클릭 시 수정 완료 버튼을 띄운다. &&  체크된 todo라면 수정 버튼을 숨긴다.*/}
            {!checkedItems.includes(list.id) ?
                (edit ?
                    <div className="complete">
                        <button className="completeButton" onClick={onClickSubmitButton}><i className="fa-regular fa-square-check"></i></button>
                    </div>
                    : <div className="edit">
                        <button className="editButton" onClick={onClickEditButton}><i className="fa-regular fa-pen-to-square"></i></button>
                    </div>)
                : null}
            {/* todo 삭제 버튼 */}
            <div className="delete">
                <button className="deleteButton" onClick={() => deleteButton(list.id)}><i className="fa-regular fa-trash-can"></i></button>
            </div>
        </li>
    );
}

export default TodoList;
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
    const [currentTab, setCurrentTab] = useState(0);

    const menuArr = [
        { name: 'ALL' },
        { name: 'Complete' },
        { name: 'Incomplete' },
    ];

    const selectMenuHandler = (index) => {
        console.log('tab change')
        setCurrentTab(index);
    };

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
            checked: false
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

    // 새로운 todoData 등록 시 input 상태 관리
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


    return (
        <main>
            {/* 투두데이터 입력 창 */}
            <div className="inputContainer">
                <input className="todoInput" type='text' value={todoText} placeholder="text" onChange={handleChangeTodoText} onKeyUp={handleKeyupTodoText} />
            </div>
            {/* 리스트 목록 선택 탭 및 리스트 노출 개수 선택 드롭다운 */}
            <div className="selectContainer">
                <ul className="listTab">
                    {menuArr.map((tab, index) => {
                        return (
                            <li key={index} className={currentTab === index ? 'tab focused' : 'tab'} onClick={() => selectMenuHandler(index)}>
                                {tab.name}
                            </li>
                        )
                    })}
                </ul>
                <div className="listCountDropDown">
                    <select type="number" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
                        <option value="5">5개씩</option>
                        <option value="10">10개씩</option>
                        <option value="20">20개씩</option>
                        <option value="30">30개씩</option>
                    </select>
                </div>
            </div>
            {/* 조건별 리스트 목록 */}
            {currentTab === 0 ?
                <ul className="todoList">
                    {todoData.slice(offset, offset + limit).map((value) =>
                        <TodoList
                            list={value}
                            key={value.id}
                            deleteButton={deleteTodoText}
                            handleCheckChange={handleCheckChange}
                            checkedItems={checkedItems}
                            todoData={todoData}
                            setTodoData={setTodoData}
                        />)}
                </ul>
                : (currentTab === 1 ?
                    <ul className="todoList">
                        {todoData.filter((value) => checkedItems.includes(value.id)).slice(offset, offset + limit).map((value) =>
                            <TodoList
                                list={value}
                                key={value.id}
                                deleteButton={deleteTodoText}
                                handleCheckChange={handleCheckChange}
                                checkedItems={checkedItems}
                                todoData={todoData}
                                setTodoData={setTodoData}
                            />)}
                    </ul>
                    : <ul className="todoList">
                        {todoData.filter((value) => !checkedItems.includes(value.id)).slice(offset, offset + limit).map((value) =>
                            <TodoList
                                list={value}
                                key={value.id}
                                deleteButton={deleteTodoText}
                                handleCheckChange={handleCheckChange}
                                checkedItems={checkedItems}
                                todoData={todoData}
                                setTodoData={setTodoData}
                            />)}
                    </ul>
                )}
            {/* 페이지네이션 */}
            <Pagenation total={todoData.length} limit={limit} page={page} setPage={setPage} />
        </main>
    );

}

export default Main;
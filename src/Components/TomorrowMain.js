import React, { useState, useEffect } from "react";
import './Main.css';
import uuid from "react-uuid";
import dummyData from "../dummyData";
import TodoList from "./TodoList";
import Pagenation from "./Pagenation";

function TomorrowMain() {
    const [todoData, setTodoData] = useState(() => JSON.parse(window.localStorage.getItem('localData')) || dummyData);
    const [checkedItems, setCheckedItems] = useState(() => JSON.parse(window.localStorage.getItem('localCheckedData')) || []);
    const [todoText, setTodoText] = useState('');
    const [todoDate, setTodoDate] = useState('');
    const [currentTab, setCurrentTab] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    // 메뉴 리스트 조건부 렌더링 배열 리스트
    const menuArr = [
        { name: '전체' },
        { name: '완료' },
        { name: '미완료' },
    ];
    // 메뉴 리스트 조건부 렌더링 이벤트 핸들러
    const selectMenuHandler = (index) => {
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
            createdAt: todoDate,
            content: todoText,
        };
        if (todoText) {  // input에 입력값이 없으면 새로운 todo를 추가하지 못하게 함
            setTodoData([newTodoText, ...todoData]);
            return setTodoText('');
        };
    };

    // 새로운 todoData 등록 시 input 상태 관리
    const handleChangeTodoText = (event) => {
        setTodoText(event.target.value)
    };

    const handleChangeTodoDate = (event) => {
        setTodoDate(event.target.value)
    };

    // Enter 키 입력 시에도 동일하게 addTodoText 이벤트 핸들러 동작하게 하는 이벤트 핸들러
    // const handleKeyupTodoText = (event) => {
    //     if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
    //         addTodoText(event);
    //     }
    // };

    // 체크박스 상태 체크
    const handleCheckChange = (checked, id) => {
        if (checked) {
            setCheckedItems([...checkedItems, id]);
        } else {
            setCheckedItems(checkedItems.filter((value) => value !== id));
        }
    };
    
    // 모달 오픈 이벤트 핸들러
    const openModalHandler = () => {
        setIsOpen(!isOpen)
    };

    // 이벤트 버블링 방지
    const stopEvent = (event) => {
        event.stopPropagation()
    };

    // 오늘 날짜를 구해서 dateFormat 변수에 저장
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate() + 1;
    const dateFormat = year + "-" + (("00" + month.toString()).slice(-2)) + "-" + (("00" + day.toString()).slice(-2));
    // 투두데이터 중 내일 날짜의 투두만 보이도록 필터링한 변수
    const tomorrowTodoData = todoData.filter((value) => value.createdAt === dateFormat);

    return (
        <main>
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
                <div className="addTodo">
                    <button className="addModalOpenButton" onClick={openModalHandler}>Add</button>
                    {isOpen ?
                        <div className="addTodoModalBackdrop">
                            <div className="addTodoModalView" onClick={stopEvent}>
                                <div className="addTodoTitle">
                                    Add Todo
                                </div>
                                {/* 투두날짜 입력 창 */}
                                <div className="inputModalDate">
                                    <input className="todoDate" type='date' onChange={handleChangeTodoDate} />
                                </div>
                                {/* 투두데이터 입력 창 */}
                                <div className="inputContainer">
                                    <input className="todoInput" type='text' value={todoText} placeholder="할 일을 입력해주세요" onChange={handleChangeTodoText} />
                                </div>
                                <div className="buttonContainer">
                                    <button className="addButton" onClick={() => { addTodoText(); openModalHandler(); }}>등록</button>
                                    <button className="addCancelButton" onClick={openModalHandler}>취소</button>
                                </div>
                            </div>
                        </div>
                        : null}
                </div>
            </div>
            <div className="todoCount">
                {currentTab === 0 ?
                    <div className="todoNum">
                        {tomorrowTodoData.length} 개
                    </div>
                    : (currentTab === 1 ?
                        <div className="todoNum">
                            {tomorrowTodoData.filter((value) => checkedItems.includes(value.id)).length} 개
                        </div>
                        : <div className="todoNum">
                            {tomorrowTodoData.filter((value) => !checkedItems.includes(value.id)).length} 개
                        </div>)}
                <div className="listCountDropDown">
                    <select className="dropDown" type="number" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
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
                    {tomorrowTodoData.slice(offset, offset + limit).map((value) =>
                        <TodoList
                            list={value}
                            key={value.id}
                            handleCheckChange={handleCheckChange}
                            checkedItems={checkedItems}
                            todoData={todoData}
                            setTodoData={setTodoData}
                        />)}
                </ul>
                : (currentTab === 1 ?
                    <ul className="todoList">
                        {tomorrowTodoData.filter((value) => checkedItems.includes(value.id)).slice(offset, offset + limit).map((value) =>
                            <TodoList
                                list={value}
                                key={value.id}
                                handleCheckChange={handleCheckChange}
                                checkedItems={checkedItems}
                                todoData={todoData}
                                setTodoData={setTodoData}
                            />)}
                    </ul>
                    : <ul className="todoList">
                        {tomorrowTodoData.filter((value) => !checkedItems.includes(value.id)).slice(offset, offset + limit).map((value) =>
                            <TodoList
                                list={value}
                                key={value.id}
                                handleCheckChange={handleCheckChange}
                                checkedItems={checkedItems}
                                todoData={todoData}
                                setTodoData={setTodoData}
                            />)}
                    </ul>
                )}
            {/* 페이지네이션 */}
            <Pagenation
                allPageLength={tomorrowTodoData.length}
                completePageLength={tomorrowTodoData.filter((value) => checkedItems.includes(value.id)).length}
                incompletePageLength={tomorrowTodoData.filter((value) => !checkedItems.includes(value.id)).length}
                limit={limit}
                page={page}
                setPage={setPage}
                currentTab={currentTab}
            />
        </main>
    );

}

export default TomorrowMain;
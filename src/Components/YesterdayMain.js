import * as Main from "./Main";
import TodoList from "./TodoList";
import Pagination from "./Pagination";
import uuid from "react-uuid";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function YesterdayMain() {
    const [todoData, setTodoData] = useState([]);  // 전체 데이터가 담겨 있는 변수
    const [checkedItems, setCheckedItems] = useState(() => JSON.parse(window.localStorage.getItem('localCheckedData')) || []);
    const [todoText, setTodoText] = useState('');  // 작성한 텍스트 값이 담긴 변수
    const [todoDate, setTodoDate] = useState('');  // 선택한 날짜 값이 담긴 변수
    const [currentTab, setCurrentTab] = useState(0);  // 탭 이동 상태 관리 변수
    const [addModalOpen, setAddModalOpen] = useState(false);  // 투두 추가 모달 오픈 상태 관리 변수

    // Get
    const getTodoData = async () => {
        const res = await axios.get('http://localhost:3001/todos');
        setTodoData(res.data);
    };
    useEffect(() => {
        getTodoData();
    }, []);

    useEffect(() => {
        window.localStorage.setItem('localCheckedData', JSON.stringify(checkedItems));
    }, [checkedItems]);

    // Post
    const addTodoText = async () => {
        const newTodoText = {
            id: uuid(),
            createdAt: todoDate,
            content: todoText
        };
        if (todoText) {  // input에 입력값이 없으면 새로운 todo를 추가하지 못하게 함
            const res = await axios.post('http://localhost:3001/todos', newTodoText);
            getTodoData(res.data);
            return setTodoText('');
        };
    };

    // 투두 추가 모달 오픈 이벤트 핸들러
    const openModalHandler = () => {
        setAddModalOpen(!addModalOpen);
    };

    // 투두 추가 모드 시 입력되는 텍스트 input 상태 관리
    const handleChangeTodoText = (event) => {
        setTodoText(event.target.value);
    };

    // 투두 추가 모드 시 입력되는 텍스트 input 상태 관리
    const handleChangeTodoDate = (event) => {
        setTodoDate(event.target.value);
    };

    // 이벤트 버블링 방지
    const stopEvent = (event) => {
        event.stopPropagation();
    };

    // 메뉴 리스트 조건부 렌더링 배열 리스트
    const menuArr = [
        { name: '전체' },
        { name: '완료' },
        { name: '미완료' }
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

    // 오늘 날짜를 구해서 dateFormat 변수에 저장
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate() - 1;
    const dateFormat = year + "-" + (("00" + month.toString()).slice(-2)) + "-" + (("00" + day.toString()).slice(-2));
    // 투두데이터 중 어제 날짜의 투두만 보이도록 필터링한 변수 && 배열 뒤집음
    const yesterdayTodoData = todoData.filter((value) => value.createdAt === dateFormat).slice().reverse();

    return (
        <main>
            {/* 리스트 목록 선택 탭 및 리스트 노출 개수 선택 드롭다운 */}
            <Main.SelectContainer>
                <Main.ListTab>
                    {menuArr.map((tab, index) => {
                        return (
                            <li key={index} className={currentTab === index ? 'tab focused' : 'tab'} onClick={() => selectMenuHandler(index)}>
                                {tab.name}
                            </li>
                        )
                    })}
                </Main.ListTab>
                <div className="add">
                    <Main.PopUpAddModalButton onClick={openModalHandler}><FontAwesomeIcon icon={faPlus} size="lg" /></Main.PopUpAddModalButton>
                    {addModalOpen ?
                        <Main.AddModalBackdrop>
                            <Main.AddModalView onClick={stopEvent}>
                                <div className="addModalTitle">
                                    Add Todo
                                </div>
                                <Main.AddModalDateArea>
                                    <input className="addModalDateInput" type='date' onChange={handleChangeTodoDate} />
                                </Main.AddModalDateArea>
                                <Main.AddModalContentArea>
                                    <input className="addModalContentInput" type='text' placeholder="할 일을 입력해주세요" onChange={handleChangeTodoText} />
                                </Main.AddModalContentArea>
                                <Main.AddModalButtonArea>
                                    <button className="addButton" onClick={() => { addTodoText(); openModalHandler(); }}>등록</button>
                                    <button className="addCancelButton" onClick={openModalHandler}>취소</button>
                                </Main.AddModalButtonArea>
                            </Main.AddModalView>
                        </Main.AddModalBackdrop>
                        : null}
                </div>
            </Main.SelectContainer>
            <Main.TodoCount>
                {currentTab === 0 ?
                    <div className="todoNum">
                        {yesterdayTodoData.length} 개
                    </div>
                    : (currentTab === 1 ?
                        <div className="todoNum">
                            {yesterdayTodoData.filter((value) => checkedItems.includes(value.id)).length} 개
                        </div>
                        : <div className="todoNum">
                            {yesterdayTodoData.filter((value) => !checkedItems.includes(value.id)).length} 개
                        </div>)}
                <Main.ListCountDropDown>
                    <select className="dropDown" type="number" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
                        <option value="5">5개씩</option>
                        <option value="10">10개씩</option>
                        <option value="20">20개씩</option>
                        <option value="30">30개씩</option>
                    </select>
                </Main.ListCountDropDown>
            </Main.TodoCount>
            {/* 조건별 리스트 목록 */}
            {currentTab === 0 ?
                <ul className="todoList">
                    {yesterdayTodoData.slice(offset, offset + limit).map((value) =>
                        <TodoList
                            list={value}
                            key={value.id}
                            handleCheckChange={handleCheckChange}
                            checkedItems={checkedItems}
                            getTodoData={getTodoData}
                        />)}
                </ul>
                : (currentTab === 1 ?
                    <ul className="todoList">
                        {yesterdayTodoData.filter((value) => checkedItems.includes(value.id)).slice(offset, offset + limit).map((value) =>
                            <TodoList
                                list={value}
                                key={value.id}
                                handleCheckChange={handleCheckChange}
                                checkedItems={checkedItems}
                                getTodoData={getTodoData}
                            />)}
                    </ul>
                    : <ul className="todoList">
                        {yesterdayTodoData.filter((value) => !checkedItems.includes(value.id)).slice(offset, offset + limit).map((value) =>
                            <TodoList
                                list={value}
                                key={value.id}
                                handleCheckChange={handleCheckChange}
                                checkedItems={checkedItems}
                                getTodoData={getTodoData}
                            />)}
                    </ul>
                )}
            {/* 페이지네이션 */}
            <Pagination
                allPageLength={yesterdayTodoData.length}
                completePageLength={yesterdayTodoData.filter((value) => checkedItems.includes(value.id)).length}
                incompletePageLength={yesterdayTodoData.filter((value) => !checkedItems.includes(value.id)).length}
                limit={limit}
                page={page}
                setPage={setPage}
                currentTab={currentTab}
            />
        </main>
    );
}

export default YesterdayMain;
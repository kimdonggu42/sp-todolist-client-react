import styled from 'styled-components';
import TodoList from "./TodoList";
import Pagination from './Pagination';
import uuid from "react-uuid";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const SelectContainer = styled.div`
    border-bottom: solid 0.5px gray;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: ${(props) => props.theme.backgroundColor};
`;

/* 전체, 완료, 미완료 탭 선택 부분 */
export const ListTab = styled.ul`
    display: flex;
    list-style: none;

    .tab {
        width: 60px;
        text-align: center;
        padding: 7px 7px;
        color: ${(props) => props.theme.text};
    }

    .focused {
        color: black;
        border-bottom: 2px solid ${(props) => props.theme.text};
        font-weight: bold;
        color: ${(props) => props.theme.text};
    }
`;

/* 투두 추가 부분 */
export const PopUpAddModalButton = styled.button`
    margin-right: 5px;
    font-size: 16px;
    background-color: transparent;
    border: none;
    text-decoration: none;
    text-align: center;
    color: ${(props) => props.theme.text};
    &:active {
        color: gray;
    }

    @media screen and (min-width: 550px) {
        margin-right: 10px;
}
`;

export const AddModalBackdrop = styled.div`
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: grid;
    place-items: center;
`;

export const AddModalView = styled.div`
    border-radius: 10px;
    background-color: ${(props) => props.theme.popUpBackgroundColor};
    width: 90vw;
    height: 250px;
    font-weight: 600;
    box-shadow: 0 0 20px rgba(0,0,0,0.19), 0 10px 10px rgba(0,0,0,0.10);

    > .addModalTitle {
        font-size: 30px;
        color: ${(props) => props.theme.title};
        font-weight: 600;
        margin: 10px 0px 0px 20px;
    }

    @media screen and (min-width: 550px) {
        width: 550px;
    }
`;

export const AddModalDateArea = styled.div`
    margin: 30px 0px 20px 0px;

    > input {
        margin-left: 17px;
        border-radius: 10px;
        padding: 0px 10px 0px 10px;
        border: none;
        width: 60vw;
        height: 35px;
        box-shadow: 0px 0px 5px lightgray;
        background-color: ${(props) => props.theme.modalInputBack};
        color: ${(props) => props.theme.text};
        &:focus {
            outline: none;
            border: solid 1px grey;
        }

        @media screen and (min-width: 550px) {
            width: 220px;
            margin-left: 27px;
        }
    }
`;

export const AddModalContentArea = styled.div`
    margin-bottom: 15px;
    display: flex;
    justify-content: center;

    > input {
        margin: auto;
        width: 90%;
        height: 45px;
        padding: 0px 15px 0px 15px;
        border: none;
        border-radius: 10px;
        box-shadow: 0px 0px 5px lightgray;
        font-weight: 500;
        background-color: ${(props) => props.theme.modalInputBack};
        color: ${(props) => props.theme.text};
        &:focus {
            outline: none;
            border: solid 1px grey;
        }
    }
`;

export const AddModalButtonArea = styled.div`
    text-align: center;

    > .addButton+.addCancelButton {
        margin-left: 15px;
    }

    > .addButton {
        font-weight: 500;
        margin-top: 12px;
        width: 70px;
        height: 27px;
        color: white;
        border: none;
        border-radius: 7px;
        text-decoration: none;
        background-color: #3184d5;
        &:hover {
            text-decoration: none;
        }
        &:active {
            background-color: #64AAFF;
        }
    }

    > .addCancelButton {
        font-weight: 500;
        margin-top: 12px;
        width: 70px;
        height: 27px;
        color: white;
        border: none;
        border-radius: 7px;
        text-decoration: none;
        background-color: #a0a0a0;
        &:hover {
            text-decoration: none;
        }
        &:active {
            background-color: lightgray;
        }
    }
`;

/* 투두 개수 드롭다운 부분 */
export const TodoCount = styled.div`
    margin-left: 10px;
    display: flex;
    justify-content: space-between;
    color: ${(props) => props.theme.text};

    > .todoNum {
        font-size: 14px;
    }
`;

export const ListCountDropDown = styled.div`
    text-align: right;

    > .dropDown {
        border: none;
        color: ${(props) => props.theme.text};
        background-color: ${(props) => props.theme.backgroundColor};
        &:focus {
            outline: none;
        }
    }
`;

function Main() {
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

    // 투두 추가 모드 시 입력되는 날짜 input 상태 관리
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

    const [limit, setLimit] = useState(10);  // 페이지 당 표시할 데이터 수 (기본값: 10개씩 노출)
    const [page, setPage] = useState(1);  // 현재 페이지 번호 (기본값: 1페이지부터 노출)
    const offset = (page - 1) * limit;  // 각 페이지에서 첫 데이터의 위치(index) 계산

    // Enter 키 입력 시에도 동일하게 addTodoText 이벤트 핸들러 동작하게 하는 이벤트 핸들러
    // const handleKeyupTodoText = (event) => {
    //     if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
    //         addTodoText(event);
    //     }
    // };

    // 체크박스 상태 체크 함수
    const handleCheckChange = (checked, id) => {
        if (checked) {
            setCheckedItems([...checkedItems, id]);
        } else {
            setCheckedItems(checkedItems.filter((value) => value !== id));
        }
    };

    // 새로 추가하는 데이터가 배열 앞에서 부터 추가되도록 배열을 뒤집어서 불러옴
    const reverseTodoData = todoData.slice().reverse();

    return (
        <main>
            {/* 리스트 목록 선택 탭 및 리스트 노출 개수 선택 드롭다운 */}
            <SelectContainer>
                <ListTab>
                    {menuArr.map((tab, index) => {
                        return (
                            <li key={index} className={currentTab === index ? 'tab focused' : 'tab'} onClick={() => selectMenuHandler(index)}>
                                {tab.name}
                            </li>
                        )
                    })}
                </ListTab>
                <div className="add">
                    <PopUpAddModalButton onClick={openModalHandler}><FontAwesomeIcon icon={faPlus} size="lg" /></PopUpAddModalButton>
                    {addModalOpen ?
                        <AddModalBackdrop>
                            <AddModalView onClick={stopEvent}>
                                <div className='addModalTitle'>
                                    Add Todo
                                </div>
                                <AddModalDateArea>
                                    <input className="addModalDateInput" type='date' onChange={handleChangeTodoDate} />
                                </AddModalDateArea>
                                <AddModalContentArea>
                                    <input className="addModalContentInput" type='text' placeholder="할 일을 입력해주세요" onChange={handleChangeTodoText} />
                                </AddModalContentArea>
                                <AddModalButtonArea>
                                    <button className="addButton" onClick={() => { addTodoText(); openModalHandler(); }}>등록</button>
                                    <button className="addCancelButton" onClick={openModalHandler}>취소</button>
                                </AddModalButtonArea>
                            </AddModalView>
                        </AddModalBackdrop>
                        : null}
                </div>
            </SelectContainer>
            <TodoCount>
                {currentTab === 0 ?
                    <div className="todoNum">
                        {todoData.length} 개
                    </div>
                    : (currentTab === 1 ?
                        <div className="todoNum">
                            {todoData.filter((value) => checkedItems.includes(value.id)).length} 개
                        </div>
                        : <div className="todoNum">
                            {todoData.filter((value) => !checkedItems.includes(value.id)).length} 개
                        </div>)}
                <ListCountDropDown>
                    <select className="dropDown" type="number" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
                        <option value="5">5개씩</option>
                        <option value="10">10개씩</option>
                        <option value="20">20개씩</option>
                        <option value="30">30개씩</option>
                    </select>
                </ListCountDropDown>
            </TodoCount>
            {/* 조건별 리스트 목록 */}
            {currentTab === 0 ?
                <ul>
                    {reverseTodoData.slice(offset, offset + limit).map((value) =>
                        <TodoList
                            list={value}
                            key={value.id}
                            handleCheckChange={handleCheckChange}
                            checkedItems={checkedItems}
                            getTodoData={getTodoData}
                        />)}
                </ul>
                : (currentTab === 1 ?
                    <ul>
                        {reverseTodoData.filter((value) => checkedItems.includes(value.id)).slice(offset, offset + limit).map((value) =>
                            <TodoList
                                list={value}
                                key={value.id}
                                handleCheckChange={handleCheckChange}
                                checkedItems={checkedItems}
                                getTodoData={getTodoData}
                            />)}
                    </ul>
                    : <ul>
                        {reverseTodoData.filter((value) => !checkedItems.includes(value.id)).slice(offset, offset + limit).map((value) =>
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
                allPageLength={todoData.length}
                completePageLength={todoData.filter((value) => checkedItems.includes(value.id)).length}
                incompletePageLength={todoData.filter((value) => !checkedItems.includes(value.id)).length}
                limit={limit}
                page={page}
                setPage={setPage}
                currentTab={currentTab}
            />
        </main>
    );
}

export default Main;
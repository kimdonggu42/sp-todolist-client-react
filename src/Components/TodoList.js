import styled from 'styled-components';
import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const TodoListContainer = styled.li`
    &.todoListContainer {
        display: flex;
        padding: 10px 0px 10px 0px;
        min-height: 70px;
        border-bottom: 0.5px solid lightgray;
    }

    &.clearTodoContent {
        color: gray; 

        .todoContent {
            text-decoration: line-through;
        }
    }
`;

// 체크 박스 부분
const CheckTodo = styled.div`
    flex: 0.5;
    margin: auto;
    padding-left: 5px;

    > input[type="checkbox"] {
    display: none;

    &:checked {
        &+label:before {
                position: absolute;
                width: 6px;
                top: -12px;
                left: 8px;
                border-radius: 0;
                border-color: none black black transparent;
                border-top-color: transparent;
                border-left-color: transparent;
                -ms-transform: rotate(45deg);
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
            }
        }
    }

    > label {
        display: inline-block;
        position: absolute;
        cursor: pointer;
        &:before {
            content: ' ';
            display: inline-block;
            width: 15px;
            height: 15px;
            background: none;
            border: 2px solid #cacece;
            border-radius: 3px;
            position: absolute;
            left: 0;
            top: -10px;
            margin-top: 0;
            border-color: ${(props) => props.theme.button};
            -webkit-transition: all .12s, border-color .08s;
            transition: all .12s, border-color .08s;
        }
    }

    @media screen and (min-width: 550px) {
        flex: 0.6;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 7.5;

    > .todoContent {
        display: flex;
        align-items: center;
        flex: 5;
        text-align: left;
        padding-left: 10px;
        font-size: 15px;
        font-weight: 500;
        color: ${(props) => props.theme.text};
    }

    > .todoCreatedAt {
        flex: 5;
        font-size: 13px;
        text-align: left;
        padding-left: 12px;
        color: gray;
    }

    @media screen and (min-width: 550px) {
        flex: 16;
    }
`;

// 투두 수정 부분
const Edit = styled.div`
    flex: 0.8;
    text-align: center;
    margin: auto;
`;

const PopUpEditModalButton = styled.button`
    border: none;
    background-color: transparent;
    font-size: 18px;
    color: ${(props) => props.theme.button};
    &:active {
        color: gray;
    }
`;

const EditModalBackdrop = styled.div`
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

const EditModalView = styled.div`
    text-align: left;
    border-radius: 10px;
    background-color: ${(props) => props.theme.popUpBackgroundColor};
    width: 90vw;
    height: 250px;
    color: black;
    font-weight: 600;
    box-shadow: 0 0 20px rgba(0,0,0,0.19), 0 10px 10px rgba(0,0,0,0.10);

    > .editModalTitle {
        font-size: 30px;
        color: ${(props) => props.theme.title};
        font-weight: 600;
        margin: 10px 0px 0px 20px;
    }

    @media screen and (min-width: 550px) {
        width: 550px;
    }
`;

const EditModalDateArea = styled.div`
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

const EditModalContentArea = styled.div`
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

const EditModalButtonArea = styled.div`
    text-align: center;

    > button {
        font-weight: 500;
        margin-top: 12px;
        width: 70px;
        height: 27px;
        color: white;
        border: none;
        border-radius: 7px;
        text-decoration: none;
        &:hover {
            text-decoration: none;
        }
    }

    > .editButton+.editCancelButton {
        margin-left: 15px;
    }

    > .editButton {
        background-color: #3184d5;
        &:active {
            background-color: #64AAFF;
        }
    }

    > .editCancelButton {
        background-color: #a0a0a0;
        &:active {
            background-color: lightgray;
        }
    }
`;

// 투두 삭재 부분
const Delete = styled.div`
    flex: 0.8;
    text-align: center;
    margin: auto;
`;

const PopUpDeleteModalButton = styled.button`
    border: none;
    background-color: transparent;
    color: ${(props) => props.theme.button};;
    font-size: 18px;
    &:active {
        color: gray;
    }
`;

const DeleteModalBackdrop = styled.div`
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

const DeleteModalView = styled.div`
    border-radius: 10px;
    background-color: ${(props) => props.theme.popUpBackgroundColor};
    width: 90vw;
    height: 190px;
    color: ${(props) => props.theme.text};
    font-weight: 600;
    box-shadow: 0 0 20px rgba(0,0,0,0.19), 0 10px 10px rgba(0,0,0,0.10);

    > .deleteModalTitle {
        font-size: 30px;
        color: ${(props) => props.theme.title};
        font-weight: 600;
        text-align: left;
        margin: 10px 0px 30px 20px;
    }

    > .warningText {
        font-size: 17px;
        margin-bottom: 10px;
    }

    > button {
        margin-top: 20px;
        font-weight: 500;
        width: 70px;
        height: 27px;
        color: white;
        border: none;
        border-radius: 7px;
        text-decoration: none;
        &:hover {
            text-decoration: none;
        }
    }

    > .deleteCancelButton+.deleteButton {
        margin-left: 15px;
    }

    > .deleteCancelButton {
        background-color: #a0a0a0;
        &:active {
            background-color: lightgray;
        }
    }

    > .deleteButton {
        background-color: #d33031;
        &:active {
            background-color: #E68282;
        }
    }

    @media screen and (min-width: 550px) {
        width: 550px;
    }
`;

function TodoList({ list, handleCheckChange, checkedItems, getTodoData }) {
    const [newDate, setNewDate] = useState(list.createdAt);  // 수정한 날짜 값이 담긴 변수
    const [newContent, setNewContent] = useState(list.content);  // 수정한 텍스트 값이 담긴 변수
    const [editModalOpen, setEditModalOpen] = useState(false);  // 투두 수정 모달 오픈 상태 관리 변수
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);  // 투두 삭제 모달 오픈 상태 관리 변수

    // Patch
    const onClickSubmitButton = async (patchId) => {
        const editTodoList = {
            content: newContent,
            createdAt: newDate
        };
        const res = await axios.patch(`http://localhost:3001/todos/${patchId}`, editTodoList);
        getTodoData(res.data);
    };

    // 투두 수정 모달 오픈 이벤트 핸들러
    const openEditModalHandler = () => {
        setEditModalOpen(!editModalOpen);
    };

    // 투두 수정 모드 시 입력되는 텍스트 input 상태 관리
    const onChangeEditInput = (e) => {
        setNewContent(e.target.value);
    };

    // 투두 수정 모드 시 입력되는 날짜 input 상태 관리
    const onChangeEditDate = (e) => {
        setNewDate(e.target.value);
    };

    // Delete
    const deleteButton = async (deleteId) => {
        const res = await axios.delete(`http://localhost:3001/todos/${deleteId}`);
        getTodoData(res);
    };

    // Delete useParams 사용할 경우
    // const onDelete = async () => {
    //     await axios.delete(`http://localhost:3001/questions/${id}`);
    //   };

    // 투두 삭제 모달 오픈 이벤트 핸들러
    const openModalHandler = () => {
        setDeleteModalOpen(!deleteModalOpen);
    };

    // 이벤트 버블링 방지
    const stopEvent = (event) => {
        event.stopPropagation();
    };

    return (
        // 체크된 todoList 컬러 변경 조건부 렌더링
        <TodoListContainer className={`todoListContainer ${checkedItems.includes(list.id) ? 'clearTodoContent' : null}`}>
            {/* 체크박스 */}
            <CheckTodo>
                <input
                    type='checkbox'
                    id={list.id}
                    onChange={(e) => { handleCheckChange(e.target.checked, list.id) }}
                    checked={checkedItems.includes(list.id) ? true : false}
                />
                <label htmlFor={list.id}></label>
            </CheckTodo>
            {/* 투두 내용 & 등록 날짜 */}
            <ContentWrapper>
                <div className="todoContent">{list.content}</div>
                <div className="todoCreatedAt">{list.createdAt}</ div>
            </ContentWrapper>
            {/* 투두 수정 버튼(체크된 투두라면 수정 버튼 숨김) */}
            {!checkedItems.includes(list.id) ?
                (<Edit>
                    <PopUpEditModalButton onClick={openEditModalHandler}><FontAwesomeIcon icon={faPenToSquare} /></PopUpEditModalButton>
                    {editModalOpen ?
                        (<EditModalBackdrop>
                            <EditModalView onClick={stopEvent}>
                                <div className="editModalTitle">
                                    Edit Todo
                                </div>
                                <EditModalDateArea>
                                    <input type='date' value={newDate} onChange={onChangeEditDate} />
                                </EditModalDateArea>
                                <EditModalContentArea>
                                    <input className="editModalContentInput" type='text' value={newContent} placeholder="할 일을 입력해주세요" onChange={onChangeEditInput} />
                                </EditModalContentArea>
                                <EditModalButtonArea>
                                    <button className="editButton" onClick={() => { onClickSubmitButton(list.id); openEditModalHandler(); }}>수정</button>
                                    <button className="editCancelButton" onClick={openEditModalHandler}>취소</button>
                                </EditModalButtonArea>
                            </EditModalView>
                        </EditModalBackdrop>) : null}
                </Edit>) : null}
            {/* 투두 삭제 버튼 */}
            <Delete>
                <PopUpDeleteModalButton onClick={openModalHandler}><FontAwesomeIcon icon={faTrashCan} /></PopUpDeleteModalButton>
                {deleteModalOpen ?
                    <DeleteModalBackdrop>
                        <DeleteModalView onClick={stopEvent}>
                            <div className='deleteModalTitle'>Delete Todo</div>
                            <div className='warningText'>정말 삭제하시겠습니까?</div>
                            <button className="deleteCancelButton" onClick={openModalHandler}>취소</button>
                            <button className="deleteButton" onClick={() => deleteButton(list.id)}>삭제</button>
                        </DeleteModalView>
                    </DeleteModalBackdrop>
                    : null}
            </Delete>
        </TodoListContainer>
    );
}

export default TodoList;
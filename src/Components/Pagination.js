import styled from 'styled-components';
import { useState } from 'react';

const PageNum = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    /* 더블 클릭이나 드래그로 텍스트 선택 방지 */
    user-select: none;

    > .pageTab, .leftHandle, .rightHandle {
        width: 20px;
        height: 20px;
        background-color: transparent;
        border: none;
        color: ${(props) => props.theme.text};
    }

    > .pageFocused {
        border-radius: 3px;
        background-color: #f9f9f9;
        border: 1px solid black;
        font-weight: 600;
        color: black
        
    }

    > button:hover {
        text-decoration: underline;
    }
`;

function Pagination({ allPageLength, completePageLength, incompletePageLength, limit, page, setPage, currentTab }) {
    const [blockNum, setBlockNum] = useState(0);  // 페이지 당 표시할 페이지네이션 수
    const pageLimit = 10;  // 페이지 당 표시할 페이지네이션 수 (기본값 : 10개의 페이지네이션 노출)
    const blockArea = blockNum * pageLimit;  // 각 페이지에서 첫 페이지네이션의 위치 계산

    // 필요한 페이지 개수 === 총 데이터 수(allPageLength === todoData.length) / 페이지 당 표시할 데이터 수(limit === 10)
    const numAllPages = Math.ceil(allPageLength / limit);
    const numCompletePages = Math.ceil(completePageLength / limit);
    const numIncompletePages = Math.ceil(incompletePageLength / limit);

    // 새로운 배열 생성 함수
    const createArr = (n) => {
        const iArr = new Array(n);
        for (let i = 0; i < n; i++) {
            iArr[i] = i + 1;
        }
        return iArr;
    };
    const allArr = createArr(numAllPages);  // nArr 함수에 전체 페이지의 개수를 배열로 담음
    const completeArr = createArr(numCompletePages);
    const inCompletenArr = createArr(numIncompletePages);

    // 현재 페이지의 이전 페이지로 이동하는 버튼 이벤트 핸들러
    const prevPageHandler = () => {
        if (page <= 1) {
            return;
        } else if (page - 1 <= pageLimit * blockNum) {
            setBlockNum((n) => n - 1);
        }
        setPage((n) => n - 1);
    }

    // 현재 페이지의 다음 페이지 이동하는 버튼 이벤트 핸들러
    const nextPageHandler = () => {
        if (page >= numAllPages) {
            return;
        } else if (pageLimit * (blockNum + 1) < page + 1) {
            setBlockNum((n) => n + 1);
        }
        setPage((n) => n + 1);
    };

    return (
        <>
            {currentTab === 0 ?
                <PageNum>
                    {/* 왼쪽 버튼 클릭시 현재 페이지에서 1 페이지 이전 페이지로 이동하고, 현재 페이지가 1페이지가 되면 왼쪽 버튼은 비활성화 된다.*/}
                    <button className="leftHandle" onClick={prevPageHandler} disabled={page === 1}>
                        &lt;
                    </button>
                    {allArr.slice(blockArea, pageLimit + blockArea).map((n) => (
                        <button className={page === n ? 'pageTab pageFocused' : 'pageTab'} key={n} onClick={() => setPage(n)}>  {/* 클릭한 페이지로 바로 이동하는 버튼 이벤트 핸들러 */}
                            {n}
                        </button>
                    ))}
                    {/* 오른쪽 버튼 클릭시 현재 페이지에서 1 페이지 이후 페이지로 이동하고, 현재 페이지가 마지막 페이지가 되면 오른쪽 버튼은 비활성화 된다.*/}
                    <button className="rightHandle" onClick={nextPageHandler} disabled={page === numAllPages}>
                        &gt;
                    </button>
                </PageNum>
                : (currentTab === 1 ?
                    <PageNum>
                        <button className="leftHandle" onClick={prevPageHandler} disabled={page === 1}>
                            &lt;
                        </button>
                        {completeArr.slice(blockArea, pageLimit + blockArea).map((n) => (
                            <button className={page === n ? 'pageTab pageFocused' : 'pageTab'} key={n} onClick={() => setPage(n)}>
                                {n}
                            </button>
                        ))}
                        <button className="rightHandle" onClick={nextPageHandler} disabled={page === numCompletePages}>
                            &gt;
                        </button>
                    </PageNum>
                    : <PageNum>
                        <button className="leftHandle" onClick={prevPageHandler} disabled={page === 1}>
                            &lt;
                        </button>
                        {inCompletenArr.slice(blockArea, pageLimit + blockArea).map((n) => (
                            <button className={page === n ? 'pageTab pageFocused' : 'pageTab'} key={n} onClick={() => setPage(n)}>
                                {n}
                            </button>
                        ))}
                        <button className="rightHandle" onClick={nextPageHandler} disabled={page === numIncompletePages}>
                            &gt;
                        </button>
                    </PageNum>)}
        </>
    );
}

export default Pagination;
import React from "react";
import './Pagenation.css'

function Pagenation({ total, limit, page, setPage }) {
    // 필요한 페이지 개수 === 총 데이터 수(total === todoData.length) / 페이지 당 표시할 데이터 수(limit === 10)
    const numPages = Math.ceil(total / limit);  // Math.ceil -> 올림

    // 현재 페이지의 이전 페이지로 이동하는 버튼 이벤트 핸들러
    const prevPageHandler = () => {
        setPage(page - 1);
    };

    // 현재 페이지의 다음 페이지 이동하는 버튼 이벤트 핸들러
    const nextPageHandler = () => {
        setPage(page + 1);
    };

    return (
        <div className='pagenation'>
            {/* 왼쪽 버튼 클릭시 현재 페이지에서 1 페이지 이전 페이지로 이동하고, 현재 페이지가 1페이지가 되면 왼쪽 버튼은 비활성화 된다.*/}
            {/* disabled -> 버튼 태그의 버튼 비활성화 속성 */}
            <button className="leftHandle" onClick={prevPageHandler} disabled={page === 1}>
                &lt;
            </button>
            {new Array(numPages).fill().map((_, index) => (
                <button className={page === index + 1 ? 'pageTab pageFocused' : 'pageTab'} key={index + 1} onClick={() => setPage(index + 1)}>  {/* 클릭한 페이지로 바로 이동하는 버튼 이벤트 핸들러 */}
                    {index + 1}
                </button>
            ))}
            {/* 오른쪽 버튼 클릭시 현재 페이지에서 1 페이지 이후 페이지로 이동하고, 현재 페이지가 마지막 페이지가 되면 오른쪽 버튼은 비활성화 된다.*/}
            <button className="rightHandle" onClick={nextPageHandler} disabled={page === numPages}>
                &gt;
            </button>
        </div>
    );
}

export default Pagenation;
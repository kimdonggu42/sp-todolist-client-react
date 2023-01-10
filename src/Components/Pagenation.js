import React from "react";
import './Pagenation.css'

function Pagenation({ total, limit, page, setPage }) {
    // 최대 페이지 개수 === 총 데이터 수(total === todoData.length) / 페이지 당 표시할 데이터 수(limit === 10)
    const numPages = Math.ceil(total / limit);  // Math.ceil -> 올림

    // 이전 페이지 이동 이벤트 핸들러
    const prevPageHandle = () => {
        setPage(page - 1);
    };

    // 다음 페이지 이동 이벤트 핸들러
    const nextPageHandle = () => {
        setPage(page + 1);
    };

    return (
        <div className='pagenation'>
            {/* 왼쪽 버튼 클릭시 현재 페이지에서 1 페이지 이전 페이지로 이동하고, 현재 페이지가 1페이지가 되면 왼쪽 버튼은 비활성화 된다.*/}
            {/* disabled -> 버튼 태그의 버튼 비활성화 속성 */}
            <button className="leftHandle" onClick={prevPageHandle} disabled={page === 1}>
                &lt;
            </button>
            {Array(numPages)
                .fill()
                .map((_, idx) => (
                    <button key={idx + 1} onClick={() => setPage(idx + 1)}>
                        {idx + 1}
                    </button>
                ))}
            {/* 오른쪽 버튼 클릭시 현재 페이지에서 1 페이지 이후 페이지로 이동하고, 현재 페이지가 마지막 페이지가 되면 오른쪽 버튼은 비활성화 된다.*/}
            <button className="rightHandle" onClick={nextPageHandle} disabled={page === numPages}>
                &gt;
            </button>
        </div>
    );
}

export default Pagenation;
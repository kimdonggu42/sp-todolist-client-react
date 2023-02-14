import TodayHeader from "../Components/TodayHeader";
import TodayMain from "../Components/TodayMain";

function TodayTodoList({ isChange, changeMode }) {

    return (
        <div className="mainPage">
            <TodayHeader isChange={isChange} changeMode={changeMode} />
            <TodayMain />
        </div>
    );
}

export default TodayTodoList;
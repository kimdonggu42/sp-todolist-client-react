import YesterdayHeader from "../Components/YesterdayHeader";
import YesterdayMain from "../Components/YesterdayMain";

function YesterdayTodoList({ isChange, changeMode }) {

    return (
        <div className="mainPage">
            <YesterdayHeader isChange={isChange} changeMode={changeMode} />
            <YesterdayMain />
        </div>
    );
}

export default YesterdayTodoList;
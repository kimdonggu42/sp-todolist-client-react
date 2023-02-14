import TomorrowHeader from "../Components/TomorrowHeader";
import TomorrowMain from "../Components/TomorrowMain";

function TomorrowTodoList({ isChange, changeMode }) {

    return (
        <div className="mainPage">
            <TomorrowHeader isChange={isChange} changeMode={changeMode} />
            <TomorrowMain />
        </div>
    );
}

export default TomorrowTodoList;
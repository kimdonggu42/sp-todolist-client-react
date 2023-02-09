import Header from "../Components/Header";
import Main from "../Components/Main";

function AllTodoList({ isChange, changeMode }) {

    return (
        <div className="mainPage">
            <Header isChange={isChange} changeMode={changeMode} />
            <Main />
        </div>
    );
}

export default AllTodoList;
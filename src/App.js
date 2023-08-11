import "./App.css";
import DiaryEditor from "./Components/DiaryEditor";
import DiaryList from "./Components/DiaryList";
import { useEffect, useReducer, useRef, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newState = [action.newItem, ...state];
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "DELETE": {
      const newState = state.filter((item) => item.id !== action.targetId);
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "EDIT": {
      const newState = state.map((item) =>
        item.id === action.targetId
          ? { ...item, content: action.newContent }
          : item
      );
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
}

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [diary, dispatch] = useReducer(reducer, []);
  //const [data, setData] = useState([]);
  const idRef = useRef(1);
  useEffect(() => {
    const rawData = localStorage.getItem("diary");
    if (!rawData) {
      setIsDataLoaded(true);
      return;
    }
    const localData = JSON.parse(rawData);
    if (localData.length == 0) {
      setIsDataLoaded(true);
      return;
    }
    dispatch({ type: "INIT", data: localData });
    setIsDataLoaded(true);
  }, []);
  const onCreate = (author, content, emotion) => {
    dispatch({
      type: "CREATE",
      newItem: {
        author,
        content,
        emotion,
        createdDate: new Date().getTime(),
        id: idRef.current,
      },
    });
    // const createdDate = new Date().getTime();
    // const newItem = {
    //   author,
    //   content,
    //   emotion,
    //   createdDate,
    //   id: idRef.current,
    // };
    idRef.current += 1;
    //setData([newItem, ...data]);
  };

  const onDelete = (targetId) => {
    dispatch({ type: "DELETE", targetId });
    // const newDiaryList = data.filter((item) => item.id !== targetId);
    // setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
    // setData(
    //   data.map((item) =>
    //     item.id === targetId ? { ...item, content: newContent } : item
    //   )
    // );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={diary} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

export default App;

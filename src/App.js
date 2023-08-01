import logo from "./logo.svg";
import "./App.css";
import DiaryEditor from "./Components/DiaryEditor";
import DiaryList from "./Components/DiaryList";
import { useRef, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const idRef = useRef(1);
  const onCreate = (author, content, emotion) => {
    const createdDate = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      createdDate,
      id: idRef.current,
    };
    idRef.current += 1;
    setData([newItem, ...data]);
  };

  const onDelete = (targetId) => {
    const newDiaryList = data.filter((item) => item.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((item) =>
        item.id === targetId ? { ...item, content: newContent } : item
      )
    );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

export default App;

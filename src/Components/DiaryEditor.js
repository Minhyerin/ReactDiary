import React, { useRef, useState } from "react";

const DiaryEditor = ({ onCreate }) => {
  const [diary, setDiary] = useState({
    author: "",
    content: "",
    emotion: 1,
  });
  const onChangeDiary = (e) => {
    setDiary({ ...diary, [e.target.name]: e.target.value });
  };

  const authorRef = useRef();
  const contentRef = useRef();
  const handleOnSubmit = () => {
    if (diary.author.length < 1) {
      authorRef.current.focus();
      return;
    }
    if (diary.content.length < 3) {
      contentRef.current.focus();
      return;
    }
    onCreate(diary.author, diary.content, diary.emotion);
    alert("저장완료!");
    setDiary({
      author: "",
      content: "",
      emotion: "",
    });
  };

  return (
    <div className="DiaryEditor">
      <div>
        <h1>My Diary</h1>
      </div>
      <div className="author">
        <label>작성자</label>
        <input
          ref={authorRef}
          onChange={onChangeDiary}
          name="author"
          value={diary.author}
          type="text"
          placeholder="이름을 입력하세요"
        />
      </div>
      <div className="content">
        <textarea
          ref={contentRef}
          onChange={onChangeDiary}
          name="content"
          value={diary.content}
          placeholder="일기를 입력하세요!"
        />
      </div>
      <div className="bottom">
        <div className="emotion">
          <span>오늘 내 감정은?</span>
          <select onChange={onChangeDiary} name="emotion" value={diary.emotion}>
            <option value="😐">😐</option>
            <option value="😊">😊</option>
            <option value="😥">😥</option>
            <option value="😩">😩</option>
          </select>
        </div>
        <div>
          <button onClick={handleOnSubmit}>저장하기 💾</button>
        </div>
      </div>
    </div>
  );
};

export default DiaryEditor;

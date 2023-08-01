import React, { useState, useRef } from "react";

const DiaryItem = ({
  id,
  author,
  content,
  emotion,
  createdDate,
  onDelete,
  onEdit,
}) => {
  const localContentInput = useRef();
  const [localContent, setLocalContent] = useState(content);
  const [isEdit, setIsEdit] = useState(false);
  const handleOnEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleOnQuit = () => {
    setIsEdit(!isEdit);
  };
  const handelRemoveItem = () => {
    if (window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)) {
      onDelete(id);
    }
  };
  const handleOnEditDone = () => {
    if (localContent.length < 3) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번째 일기를 수정 하시겠습니까?`)) {
      onEdit(id, localContent);
      handleOnEdit();
    }
  };
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>작성자 : {author}</span>
        <span>제 감정은요.. {emotion}</span>
      </div>
      <div className="date">
        <span>{new Date(createdDate).toLocaleString()}에 작성했어요</span>
      </div>
      <div className="content">
        {isEdit ? (
          <textarea
            onChange={(e) => setLocalContent(e.target.value)}
            value={localContent}
          />
        ) : (
          content
        )}
      </div>
      <div className="btns">
        {isEdit ? (
          <>
            <button onClick={handleOnQuit}>수정취소</button>
            <button onClick={handleOnEditDone}>수정완료</button>
          </>
        ) : (
          <>
            <button onClick={handelRemoveItem}>삭제하기</button>
            <button onClick={handleOnEdit}>수정하기</button>
          </>
        )}
      </div>
    </div>
  );
};

export default DiaryItem;

import React from "react";
import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList, onDelete, onEdit }) => {
  return (
    <div className="DiaryList">
      <div className="title">
        <h2>일기 리스트</h2>
        <h4>- 현재 {diaryList.length}개의 일기가 있습니다</h4>
      </div>
      <div>
        {diaryList.map((item) => (
          <DiaryItem
            key={item.id}
            {...item}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;

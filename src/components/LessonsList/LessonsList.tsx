import React from "react";
import Lesson from "../Lesson/Lesson";
import { ILessonListProp } from "../../interfaces/Courses";

const LessonsList:React.FC<ILessonListProp> = ({ lessons, openLesson, toggleLessonVideo }) => {
  return (
    <ul>
      {lessons?.map((lesson, i) => {
        return (
          <Lesson
            key={lesson.id}
            lesson={lesson}
            i={i}
            openLesson={openLesson}
            toggleLessonVideo={toggleLessonVideo}
          />
        );
      })}
    </ul>
  );
};

export default LessonsList;
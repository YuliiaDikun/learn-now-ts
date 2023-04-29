import React from "react";
import Lesson from "../Lesson/Lesson";
import { ILessonItem } from "../../interfaces/Courses";
interface ILessonListProps {  
  lessons: ILessonItem[];
  openLesson: string;
  toggleLessonVideo: (lessonId: string) => void;
}

const LessonsList:React.FC<ILessonListProps> = ({ lessons, openLesson, toggleLessonVideo }) => {
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
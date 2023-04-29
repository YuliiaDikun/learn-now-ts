import CourseItem from "../CourseItem/CourseItem";
import { StyledList } from "./CourseList.styled";
import { ICoursesList } from "../../interfaces/Courses";

const CourseList: React.FC<ICoursesList> = ({ memoCourses }) => {
  return (
    <StyledList>
      {memoCourses.map((course) => {
        return <CourseItem key={course.id} course={course} />;
      })}
    </StyledList>
  );
};

export default CourseList;
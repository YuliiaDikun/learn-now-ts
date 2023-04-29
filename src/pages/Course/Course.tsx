import React, { useEffect, useState } from 'react';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useParams, useLocation } from 'react-router-dom';
import wiseyAPI from '../../services/genesysApi';
import LessonsList from '../../components/LessonsList/LessonsList';
import Loader from '../../components/Loader/Loader';
import Skill from '../../components/Skill/Skill';
import { ICoursesItem } from '../../interfaces/Courses';
import { Container } from '../../components/SharedLayout/SharedLayout.style';
import {
  StyledSection,
  StyledCourse,
  GoBackLink,
  ImgWrapper,
  DescrWrapper,
  StyledProductTitle,
  StyledP,
} from './Course.styled';
import { toast } from 'react-toastify';

const Course: React.FC = () => {
  const [course, setCourse] = useState<ICoursesItem | null>(null);
  const [openLesson, setOpenLesson] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';
  const { id } = useParams();

  useEffect(() => {
    const getResults = async () => {
      try {
        if (!id) return;
        const res = await wiseyAPI.getCourseById(id);
        setCourse(res);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    getResults();
  }, [id]);

  useEffect(() => {
    if (!course) return;
    const firstLesson = course.lessons![0];
    if (firstLesson.status === 'unlocked') {
      setOpenLesson(firstLesson.id);
    }
  }, [course]);

  const toggleLessonVideo = (lessonId: string) => {
    setOpenLesson(prevId => {
      if (prevId === lessonId) {
        return '';
      }
      if (lessonId === 'locked') {
        toast.error('Current video is locked...');
        return '';
      }
      return lessonId;
    });
  };

  if (!course) return <Loader />;

  return (
    <StyledSection>
      <Container>
        {isLoading && <Loader />}
        <GoBackLink to={backLinkHref}>
          <MdOutlineArrowBackIosNew size={20} /> Back to courses
        </GoBackLink>
        <StyledCourse>
          <ImgWrapper>
            <img
              src={`${course.previewImageLink}/cover.webp`}
              alt={course.title}
            />
          </ImgWrapper>
          <DescrWrapper>
            <StyledProductTitle>{course.title}</StyledProductTitle>
            <StyledP>{course.description}</StyledP>
            <Skill skills={course.meta?.skills} />
          </DescrWrapper>
        </StyledCourse>
        <h3>Course Lessons: </h3>
        {course.lessons && (
          <LessonsList
            lessons={course.lessons}
            openLesson={openLesson}
            toggleLessonVideo={toggleLessonVideo}
          />
        )}
      </Container>
    </StyledSection>
  );
};

export default Course;

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import wiseyAPI from '../../services/genesysApi';
import { sortedByDate } from '../../helpers/sortedByDate';
import { Container } from '../../components/SharedLayout/SharedLayout.style';
import Logo from '../../components/Logo/Logo';
import CourseList from '../../components/CourseList/CourseList';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import { ICoursesItem } from '../../interfaces/Courses';
import { StyledSection, MainTitle } from './Home.styled';
import { toast } from 'react-toastify';

const PAGE_SIZE = 10;
const FIRST_PAGE = '1';

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState<ICoursesItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const page: string = searchParams.get('page') ?? FIRST_PAGE;

  useEffect(() => {
    const getResults = async () => {
      try {
        const { courses } = await wiseyAPI.getCourses();
        const sortedCourses = sortedByDate(courses);
        setCourses(sortedCourses);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    getResults();
  }, []);

  const updateQueryString = (page: string) => {
    const nextParams: Record<string, string> = page !== '' ? { page } : {};
    setSearchParams(nextParams);
  };

  const currentCourseData = useMemo(() => {
    const firstPageIndex: number = (Number(page) - 1) * PAGE_SIZE;
    const lastPageIndex: number = firstPageIndex + PAGE_SIZE;
    return courses.slice(firstPageIndex, lastPageIndex);
  }, [page, courses]);

  return (
    <StyledSection>
      <Container>
        {isLoading && <Loader />}
        <MainTitle>
          <Logo /> - Learning has never been more convenient!
        </MainTitle>
        <CourseList memoCourses={currentCourseData} />
        <Pagination
          currentPage={Number(page)}
          totalCount={courses.length}
          pageSize={PAGE_SIZE}
          onPageChange={(page: number) => updateQueryString(String(page))}
        />
      </Container>
    </StyledSection>
  );
};

export default Home;

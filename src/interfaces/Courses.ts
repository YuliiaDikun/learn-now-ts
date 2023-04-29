export interface ILessonItem {
  id: string;
  duration?: number;
  link?: string;
  order?: number;
  meta?: null;
  previewImageLink?: string;
  status?: string;
  title?: string;
  type?: string;
}

export interface ILessonListProp {  
  lessons: ILessonItem[];
  openLesson: string;
  toggleLessonVideo: (lessonId: string) => void;
}

export interface ICoursesItem {
  id: string;
  title: string;
  tags: String[];
  launchDate: string;
  lessons?: ILessonItem[];
  status: string;
  description: string;
  duration: string;
  lessonsCount: number;
  containsLockedLessons: boolean;
  previewImageLink: string;
  rating: number;
  meta: {
    slug: string;
    skills: string[];
    courseVideoPreview: {
      link: string;
      duration: number;
      previewImageLink: string;
    };
  };
}

export interface ICoursesList {
  memoCourses: ICoursesItem[];
}

export interface LessonProps {
  lesson: ILessonItem;
  i: number;
  openLesson: string;
  toggleLessonVideo: (id: string | 'locked') => void;
}

export interface IProgressBarStyles { 
  width?: string;
  backgroundColor?: string;
  boxShadow?: string;
}

export interface CourseItemProps { 
  course: ICoursesItem
}

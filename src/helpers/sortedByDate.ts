import { ICoursesItem } from "../interfaces/Courses";

export function sortedByDate(array: ICoursesItem[]): ICoursesItem[] {
  return [...array].sort((a, b) => Date.parse(a.launchDate) - Date.parse(b.launchDate));
}
import { createContext } from "react";

export const dashContext=createContext({
    currentPage: 1,
    setCurrentPage: () => {},
    perPage: 5,
    handlePageChange: () => {},
    currentCourse: {},
    setSearch: () => {},
    openNewCourseDialog: () => {},
    openEditCourseDialog: () => {},
    openDeleteCourseDialog: () => {},
    courseData: [],
    filteredCourses: [],
    sortCoursesAsc: () => {},
    sortCoursesDes: () => {},
})
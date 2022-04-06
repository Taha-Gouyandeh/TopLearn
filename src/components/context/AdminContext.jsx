import React, { useEffect, useState } from "react";
import { paginate } from "../../utils/paginate";
import NewCourseDialog from "../admin/dialogs/NewCourseDialog";
import EditCourseDialog from "../admin/dialogs/EditCourseDialog";
import { dashContext } from "./dashContext";
import DeleteCourseDialog from "../admin/dialogs/DeleteCourseDialog";
import { orderBy } from "lodash";

const AdminContext = ({ courses, children }) => {
    const [currentPage, setCurrenPage] = useState(1);
    const [perPage] = useState(5);
    const [newCourseDialog, setNewCourseDialog] = useState(false);
    const [editCourseDialog, setEditCourseDialog] = useState(false);
    const [deleteCourseDialog, setDeleteCourseDialog] = useState(false);
    const [currentCourse, setCurrenCourse] = useState({});

    const [courseList, setCourseList] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setCourseList(courses);
    }, [courses]);

    const openNewCourseDialog = () => {
        setNewCourseDialog(true);
    };
    const closeNewCourseDialog = () => {
        setNewCourseDialog(false);
    };

    const openEditCourseDialog = (course) => {
        setEditCourseDialog(true);
        setCurrenCourse(course);
    };
    const closeEditCourseDialog = () => {
        setEditCourseDialog(false);
    };

    const handlePageChanges = (page) => {
        setCurrenPage(page);
    };

    const filteredCourses = courseList.filter((course) =>
        course.title.toLowerCase().includes(search)
    );

    const courseData = paginate(filteredCourses, currentPage, perPage);

    const openDeleteCourseDialog = (course) => {
        setDeleteCourseDialog(true);
        setCurrenCourse(course);
    };
    const closeDeleteCourseDialog = () => {
        setDeleteCourseDialog(false);
    };

    const sortCoursesAsc = () => {
        setCourseList(orderBy(courseList, "price", "asc"));
    };

    const sortCoursesDes = () => {
        setCourseList(orderBy(courseList, "price", "desc"));
    };

    return (
        <dashContext.Provider
            value={{
                currentPage,
                perPage,
                handlePageChanges,
                courseData,
                openNewCourseDialog,
                openEditCourseDialog,
                openDeleteCourseDialog,
                setSearch,
                filteredCourses,
                sortCoursesAsc,
                sortCoursesDes,
            }}
        >
            <NewCourseDialog
                showDialog={newCourseDialog}
                closeDialog={closeNewCourseDialog}
            />
            <EditCourseDialog
                showDialog={editCourseDialog}
                closeDialog={closeEditCourseDialog}
                course={currentCourse}
            />
            <DeleteCourseDialog
                showDialog={deleteCourseDialog}
                closeDialog={closeDeleteCourseDialog}
                course={currentCourse}
            />
            {children}
        </dashContext.Provider>
    );
};

export default AdminContext;

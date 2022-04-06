import { toast } from "react-toastify";
import {
    getCourses,
    newCourse,
    updateCourse,
    deleteCourse,
} from "../services/courseService";

export const getAllCourses = () => {
    return async (dispatch) => {
        const { data } = await getCourses();
        await dispatch({ type: "INIT", payload: data.courses });
    };
};

export const createNewCourse = (course) => {
    return async (dispatch, getState) => {
        const { data, status } = await newCourse(course);
        if (status === 201) {
            toast.success("دوره با موفقیت ساخته شد", {
                position: "top-right",
                closeOnClick: true,
            });
            await dispatch({
                type: "ADD_COURSE",
                payload: [...getState().course, data.course],
            });
        }
    };
};

export const handleCourseUpdate = (courseId, updatedCourse) => {
    return async (dispatch, getState) => {
        const courses = [...getState().courses];

        const filteredCourses = courses.filter(
            (course) => course._id !== courseId
        );

        // const updatedCourses = [...courses];
        // const courseIndex = updatedCourses.findIndex(
        //     (course) => (course._id = courseId)
        // );

        // let course = updatedCourses[courseIndex];

        // course = { ...Object.fromEntries(updatedCourse) };
        // updatedCourses[courseIndex] = course;

        try {
            const { data, status } = await updateCourse(
                courseId,
                updatedCourse
            );
            if (status == 200) {
                toast.success("با موفقیت تغییر کرد", {
                    position: "top-right",
                    closeOnClick: true,
                });
                await dispatch({
                    type: "UPDATE_COURSE",
                    payload: [...filteredCourses,data.course],
                });
            }
        } catch (ex) {
            await dispatch({ type: "UPDATE_COURSE", payload: [...courses] });
        }
    };
};

export const handleCourseDelete = (courseId) => {
    return async (dispatch, getState) => {
        const courses = [...getState().courses];
        const filteredCourses = courses.filter(
            (course) => course._id !== courseId
        );
        try {
            await dispatch({
                type: "DELETE_COURSE",
                paylaod: [...filteredCourses],
            });
            const { status } = await deleteCourse(courseId);
            if (status == 200) {
                toast.success("با موفقیت پاک شد", {
                    position: "top-right",
                    closeOnClick: true,
                });
            }
        } catch (ex) {
            await dispatch({ type: "DELETE_COURSE", payload: [...courses] });
        }
    };
};

import React, { Fragment, useEffect } from "react";
import Course from "../components/Course/Course";
import MainLayout from "../components/Layouts/MainLayout";
import Login from "../components/Login/Login";
import Logout from "../components/Login/Logout";
import { Route, Routes } from "react-router-dom";
import Register from "../components/Register/Register";
import Archive from "../components/Course/Archive";
import SingleCourse from "../components/Course/SingleCourse";
import UserProfile from "../components/Profile/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { paginate } from "../utils/paginate";
// import jsonwebtoken from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { addUser, cleareUser } from "../actions/user";
import NotFound from "../components/common/NotFound";
import PrivateLayout from "../components/Layouts/PrivateLayout";
import { isEmpty } from "lodash";
import Dashboard from "../components/admin/Dashboard";
import { useLocation, useNavigate } from "react-router";
import CourseTable from "../components/admin/CourseTable";
import AdminContext from "../components/context/AdminContext";

const Toplearn = (props) => {
    const courses = useSelector((state) => state.courses);
    const indexCourses = paginate(courses, 1, 8);
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const location = useLocation().pathname;
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const decodedToken = jwtDecode(token, { complete: true });
            const dateNow = Date.now() / 1000;
            if (decodedToken.exp < dateNow) {
                localStorage.removeItem("token");
                dispatch(cleareUser());
            } else {
                dispatch(addUser(decodedToken.user));
            }
        }
    }, []);

    if (
        (user.isAdmin && location === "/dashboard") ||
        location === "/dashboard/course"
    ) {
        return (
            <PrivateLayout>
                <Routes>
                    <Route
                        path="/dashboard/course"
                        element={
                            <AdminContext courses={courses}>
                                <CourseTable />
                            </AdminContext>
                        }
                    />
                    <Route
                        path="/dashboard"
                        exact
                        element={<Dashboard courses={courses} />}
                    />
                </Routes>
            </PrivateLayout>
        );
    } else {
        return (
            <MainLayout>
                <Routes>
                    <Route
                        path="/"
                        exact
                        element={<Course courses={indexCourses} />}
                        // render={() => <Course courses={indexCourses} />}
                    />
                    <Route path="/Login" exact element={<Login />} />
                    <Route path="/Logout" exact element={<Logout />} />
                    <Route path="/Register" exact element={<Register />} />
                    <Route path="/Archive" exact element={<Archive />} />
                    <Route
                        path="/course/:id"
                        exact
                        element={<SingleCourse />}
                    />
                    <Route
                        path="/user-profile"
                        exact
                        element={<UserProfile />}
                    />
                    <Route
                        path="/dashboard"
                        exact
                        element={
                            user.isAdmin ? (
                                <PrivateLayout courses={courses} />
                            ) : (
                                <NotFound />
                            )
                        }
                    />

                    <Route path="*" exact element={<NotFound />} />
                </Routes>
            </MainLayout>
        );
    }
};

export default Toplearn;

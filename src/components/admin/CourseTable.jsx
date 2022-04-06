import React, { useContext } from "react";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/Pagination";
import { dashContext } from "../context/dashContext";

const CourseTable = () => {
    const context = useContext(dashContext);

    const {
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
        sortCoursesDes
    } = context;

    return (
        <section
            style={{ marginTop: "5em", marginRight: "2em", marginLeft: "2em" }}
        >
            <div>
                <div>
                    <h3 className="alert alert-info text-center">
                        لیست دوره ها
                    </h3>
                    <div className="row inline-block">
                        <button
                            className="btn btn-primary"
                            onClick={openNewCourseDialog}
                        >
                            <span
                                className="fa fa-plus"
                                style={{
                                    verticalAlign: "middle",
                                    marginLeft: "1em",
                                }}
                            ></span>
                            اضافه کردن دوره ی جدید
                        </button>
                        <input
                            type={"text"}
                            placeholder="جستجو دوره"
                            onChange={(event) =>
                                setSearch(event.target.value.toLowerCase())
                            }
                            className="form-control"
                            style={{
                                width: "50%",
                                float: "left",
                                marginLeft: "2em",
                            }}
                        ></input>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">عنوان دوره</th>
                                <th scope="col">تصویر دوره</th>
                                <th scope="col">
                                    قیمت دوره(تومان)
                                    <span
                                        className="fa fa-long-arrow-up"
                                        style={{ marginRight: "0.5em" , cursor:'pointer'}}
                                        onClick={sortCoursesDes}
                                    ></span>
                                    <span
                                        className="fa fa-long-arrow-down"
                                        style={{ marginRight: "0.5em" ,cursor:'pointer' }}
                                        onClick={sortCoursesAsc}
                                        
                                    ></span>
                                </th>
                                <th scope="col">ویراش</th>
                                <th scope="col">حذف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseData.map((course) => (
                                <tr key={course._id}>
                                    <td>{course.title}</td>
                                    <td>
                                        <a
                                            href={`https://toplearnapi.ghorbany.dev/${course.imageUrl}`}
                                            target="_blank"
                                            className="btn btn-info btn-sm"
                                        >
                                            نمایش تصویر
                                        </a>
                                    </td>
                                    <td>
                                        {course.price === 0
                                            ? "رایگان"
                                            : `${course.price} تومان `}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() =>
                                                openEditCourseDialog(course)
                                            }
                                        >
                                            {" "}
                                            ویرایش
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                openDeleteCourseDialog(course);
                                            }}
                                        >
                                            {" "}
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="navbar-fixed-bottom text-center footer">
                    <Pagination
                        totalCourses={filteredCourses.length}
                        currentPage={currentPage}
                        perPage={perPage}
                        onPageChange={handlePageChanges}
                    />
                </div>
            </div>
        </section>
    );
};

export default CourseTable;

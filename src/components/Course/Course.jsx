import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ShowImage from "../common/ShowImage";

const Course = ({ courses }) => {
    useEffect(() => {
        document.title = "تاپ لرن";
    }, []);

    return (
        <section className="terms-items">
            <header>
                <h2> آخرین دوره های تاپ لرن </h2>
                <Link to="/Archive"> مشاهده همه دوره ها </Link>
            </header>
            <div className="row">
                {courses.map((course) => (
                    <div
                        key={course._id}
                        className="col-lg-3 col-md-4 col-sm-6 col-xs-12 term-col"
                    >
                        <article>
                            <Link
                                to={`/Course/${course._id}`}
                                className="img-layer"
                            >
                                {/* <img  src={`https://toplearnapi.ghorbany.dev/${course.imageUrl}`} /> */}
                                <ShowImage
                                    image={course.imageUrl}
                                    style={{
                                        objectFit: "cover",
                                        height: "200px",
                                    }}
                                />
                            </Link>
                            <h2>
                                <Link to={`/Course/${course._id}`}>
                                    {" "}
                                    {course.title}{" "}
                                </Link>
                            </h2>
                            <span> {course.price} </span>
                            <i>1:52:32</i>
                        </article>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Course;

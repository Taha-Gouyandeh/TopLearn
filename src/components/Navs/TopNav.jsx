import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { isEmpty } from "lodash";

const TopNav = () => {
    const loc = useLocation().pathname;

    const user = useSelector((state) => state.user);

    return (
        <nav>
            <div className="row">
                <div className="col-sm-6 col-xs-12">
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                style={loc === "/" ? { color: "lime" } : {}}
                            >
                                صفحه اصلی
                            </NavLink>
                            <a href=""> درباره ما </a>
                            <a href=""> تماس با ما </a>
                        </li>
                    </ul>
                </div>
                <div className="col-sm-6 col-xs-12">
                    <div className="clientarea">
                        {!isEmpty(user) ? (
                            <div className="loggein ">
                                <i className="zmdi zmdi-account"></i>
                                <NavLink to="/user-profile">
                                    {user.fullname}
                                </NavLink>
                                {user.isAdmin ? (
                                    <NavLink to="/dashboard">
                                        /پنل ادمین
                                    </NavLink>
                                ) : null}{" "}
                                / <NavLink to="/logout">خروج</NavLink>
                            </div>
                        ) : (
                            <div className="signin ">
                                <i className="zmdi zmdi-account"></i>
                                <NavLink
                                    to="/login"
                                    style={
                                        loc === "/login"
                                            ? { color: "lime" }
                                            : {}
                                    }
                                >
                                    ورود
                                </NavLink>
                                /
                                <NavLink
                                    to="/register"
                                    style={
                                        loc === "/register"
                                            ? { color: "lime" }
                                            : {}
                                    }
                                >
                                    عضویت
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopNav;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminSidbar from "../admin/AdminSidbar";
import AdminTopNav from "../admin/AdminTopNav";
import Dashboard from "../admin/Dashboard";

const PrivateLayout = (props) => {
    const user = useSelector;

    useEffect(() => {
        document.title = "داشبورد | تاپلرن";
    }, []);

    return (
        <div id="wrapper">
            <nav
                className="navbar navbar-inverse navbar-fixed-top"
                role="navigation"
            >
                <div className="navbar-header">
                    <Link className="navbar-brand"to='/dashboard'>تاپلرن داشبورد</Link>
                </div>
                <AdminTopNav user={user}/>
                <AdminSidbar/>
            </nav>
            <div id="page-wrapper">
                {props.children}
            </div>
        </div>
    );
};

export default PrivateLayout;

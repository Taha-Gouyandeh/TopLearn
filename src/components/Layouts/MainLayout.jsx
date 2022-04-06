import React, { Fragment,useEffect } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import MainNav from "../Navs/MainNav";
import TopNav from "../Navs/TopNav";

import {useLocation} from 'react-router-dom'
import { LoadingBar } from "react-redux-loading-bar";



const MainLayout = (props) => {

    const loc= useLocation().pathname;
    return (
        <Fragment>
            <div className="landing-layer">
                <LoadingBar style={{backgroundColor:"lime",height:'5px'}}/>
                <div className="container">
                    <TopNav />
                    {loc=== '/'?<Header />:null}
                </div>
            </div>

            <MainNav />

            <main id="home-page">
                <div className="container">{props.children}</div>
            </main>

            <Footer />
        </Fragment>
    );
};

export default (MainLayout);

import React, { useState, useRef ,useEffect} from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";

import { Sugar } from "react-preloaders";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../actions/user";
import { decodeToken } from "../../utils/decodeToken";
import { isEmpty } from "lodash";
import { hideLoading, showLoading } from "react-redux-loading-bar";

// for admin login user: younes.gh@chmail.ir and password: 123456
const Login = () => {
    const user=useSelector(state=>state.user)
    const dispatch=useDispatch()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const reset = () => {
        setEmail("");
        setPassword("");
    };

    const [, forceUpdate] = useState();
    const validator = useRef(
        new SimpleReactValidator({
            messages: {
                required: "پر کردن این فیلد الزامی میباشد",
                email: "ایمیل نوشته شده صحیح نمیباشد",
            },
            element: (message) => <div style={{ color: "red" }}>{message}</div>,
        })
    );
    
    useEffect(()=>{
        document.title='تاپلرن| ورود به سایت'
    },[])


    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = { email, password };

        try {
            if (validator.current.allValid()) {
                setLoading(true);
                dispatch(showLoading());
                const { status, data } = await loginUser(user);
                if (status === 200) {
                    dispatch(hideLoading());
                    toast.success("با موفقیت وارد شدید", {
                        position: "top-right",
                        closeOnClick: true,
                    });
                    // console.log(data);

                    localStorage.setItem("token", data.token);

                    dispatch(addUser(decodeToken(data.token).user))

                    setLoading(false);
                    navigate("/", { replace: true });
                    reset();
                }
            } else {
                validator.current.showMessages();
                forceUpdate(1);
            }
        } catch (ex) {
            dispatch(hideLoading());
            toast.error("با مشکل مواجه شدید", {
                position: "top-right",
                closeOnClick: true,
            });
            console.log(ex);
        }
    };

    if(!isEmpty(user)){
        navigate("/", { replace: true });
    }

    return (
        <main className="client-page">
            {/* <Helmet>
                <meta charSet="utf-8" />
                <title>login</title>
            </Helmet> */}
            <div className="container-content">
                <header>
                    <h2> ورود به سایت </h2>
                </header>

               
                    {/* <Sugar time={0} color="#fc03d7" customLoading={loading} /> */}
                

                <div className="form-layer">
                    <form action="" method="" onSubmit={handleSubmit}>
                        <div className="input-group"> 
                            <span
                                className="input-group-addon"
                                id="email-address"
                            >
                                <i className="zmdi zmdi-email"></i>
                            </span>
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                placeholder="ایمیل"
                                aria-describedby="email-address"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    validator.current.showMessageFor("email");
                                }}
                            />
                            {validator.current.message(
                                "email",
                                email,
                                "required|email"
                            )}
                        </div>

                        <div className="input-group">
                            <span className="input-group-addon" id="password">
                                <i className="zmdi zmdi-lock"></i>
                            </span>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="رمز عبور "
                                aria-describedby="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    validator.current.showMessageFor(
                                        "password"
                                    );
                                }}
                            />
                            {validator.current.message(
                                "password",
                                password,
                                "required"
                            )}
                        </div>

                        <div className="remember-me">
                            <label>
                                <input type="checkbox" name="" /> مرا بخاطر
                                بسپار{" "}
                            </label>
                        </div>

                        <div className="link">
                            <a href="">
                                {" "}
                                <i className="zmdi zmdi-lock"></i> رمز عبور خود
                                را فراموش کرده ام !
                            </a>
                            <a href="">
                                {" "}
                                <i className="zmdi zmdi-account"></i> عضویت در
                                سایت{" "}
                            </a>
                        </div>

                        <button className="btn btn-success">
                            {" "}
                            ورود به سایت{" "}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;

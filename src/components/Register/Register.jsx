import React, { useState, useRef , useEffect} from "react";
import { toast } from "react-toastify";
import { registerUser } from "../../services/userService";
import SimpleReactValidator from "simple-react-validator";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const Register = () => {
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate=useNavigate();
    const user=useSelector(state=>state.user);

    if(!isEmpty(user)){
        navigate('/',{replace:true})
    }

    const reset = () => {
        setFullName("");
        setEmail("");
        setPassword("");
    };

    useEffect(()=>{
        document.title='تاپلرن|عضویت در سایت'
    },[])

    //state for validator
    const [policy, setPolicy] = useState();
    const [, forceUpdate] = useState();
    const validator = useRef(
        new SimpleReactValidator({
            messages: {
                required: "پر کردن این فیلد الزامی میباشد",
                min: "کمتر از 5 کاراکتر نمیتواند باشد",
                email: "ایمیل نوشته شده صحیح نمیباشد",
            },
            element: (message) => <div style={{ color: "red" }}>{message}</div>,
        })
    );

    const dispatch=useDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const user={
        //     fullName:fullName,
        //     email:email,
        //     password:password
        // }
        //in es7 If the variable and value are the same you can

        const user = {
            fullname,
            email,
            password,
        };

        // const requestOption={
        //     type:'POST',
        //     headers:{"Content-Type":"application/json"},
        //     body:user
        // }
        // fetch("https://toplearnapi.ghorbany.dev/api/register",requestOption)
        // .then(({ data, status }) => {
        //     if (status === 201) {
        //         toast.success("کاربر با موفقیت ساخته شد.", {
        //             position: "top-right",
        //             closeOnClick: true,
        //         });
        //         console.log(data);
        //         reset();
        //     }
        // })
        // .catch(ex => {
        //     toast.error("مشکلی پیش آمده.", {
        //         position: "top-right",
        //         closeOnClick: true
        //     });
        //     console.log(ex);
        // });

        // axios
        //     .post(
        //         "https://toplearnapi.ghorbany.dev/api/register",
        //         JSON.stringify(user),
        //         {
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //         }
        //     )

        try {
            if (validator.current.allValid()) {
                dispatch(showLoading())
                const { status } = await registerUser(user);
                if (status === 201) {
                    dispatch(hideLoading());
                    toast.success("کاربر با موفقیت ساخته شد.", {
                        position: "top-right",
                        closeOnClick: true,
                    });
                    reset();
                }
            } else {
                validator.current.showMessages();
                forceUpdate(1);
            }
        } catch (ex) {
            dispatch(hideLoading());
            toast.error("مشکلی پیش آمده.", {
                position: "top-right",
                closeOnClick: true,
            });
            console.log(ex);
        }

        // .then(({ data, status }) => {
        //     if (status === 201) {
        //         toast.success("کاربر با موفقیت ساخته شد.", {
        //             position: "top-right",
        //             closeOnClick: true,
        //         });
        //         console.log(data);
        //         reset();
        //     }
        // })
        // .catch(ex => {
        //     toast.error("مشکلی پیش آمده.", {
        //         position: "top-right",
        //         closeOnClick: true
        //     });
        //     console.log(ex);
        // });
    };

    return (
        <main className="client-page">
            <div className="container-content">
                <header>
                    <h2> عضویت در سایت </h2>
                </header>

                <div className="form-layer">
                    <form onSubmit={handleSubmit} action="" method="">
                        <div className="input-group">
                            <span className="input-group-addon" id="username">
                                <i className="zmdi zmdi-account"></i>
                            </span>
                            <input
                                type="text"
                                name="fullname"
                                className="form-control"
                                placeholder="نام و نام خانوادگی"
                                aria-describedby="username"
                                value={fullname}
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                    validator.current.showMessageFor(
                                        "fullname"
                                    );
                                }}
                            />
                            {validator.current.message(
                                "fullname",
                                fullname,
                                "required|min:5"
                            )}
                        </div>

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
                                type="text"
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
                                "required|min:5"
                            )}
                        </div>

                        <div className="accept-rules">
                            <label>
                                <input
                                    type="checkbox"
                                    name="policy"
                                    value={policy}
                                    onChange={(e) => {
                                        setPolicy(e.currentTarget.checked);
                                        validator.current.showMessageFor(
                                            "policy"
                                        );
                                    }}
                                />{" "}
                                قوانین و مقررات سایت را میپذیرم{" "}
                            </label>
                            {validator.current.message('policy',policy,'required')}
                        </div>

                        <div className="link">
                            <a href="">
                                {" "}
                                <i className="zmdi zmdi-assignment"></i> قوانین
                                و مقررات سایت !
                            </a>
                            <a href="">
                                {" "}
                                <i className="zmdi zmdi-account"></i> ورود به
                                سایت{" "}
                            </a>
                        </div>

                        <button className="btn btn-success">
                            {" "}
                            عضویت در سایت{" "}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Register;

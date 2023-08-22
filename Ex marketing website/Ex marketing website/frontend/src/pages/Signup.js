// import React from "react";
// import BreadCrumb from "../components/BreadCrumb";
// import Meta from "../components/Meta";
// import { Link } from "react-router-dom";
// import Container from "../components/Container";
// import CustomInput from "../components/CustomInput";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { useDispatch } from "react-redux";
// import { registerUser } from "../features/user/userSlice";


// const signUpSchema = yup.object({
//   firstname: yup.string().required("First Name is Required"),
//   lastname: yup.string().required("Last Name is Required"),
//   email: yup.string().nullable().email("Email should be valid").required("Email is Required"),
//   mobile: yup.string().required("Mobile No is Required"),
//   password: yup.string().required("Password is Required"),
// });

// const Signup = () => {
//   const dispatch=useDispatch();
//   const formik = useFormik({
//     initialValues: {
//       firstname: "",
//       lastname: "",
//       email: "",
//       mobile: "",
//       password: "",
//     },
//     validationSchema: signUpSchema,
//     onSubmit: (values) => {
//       dispatch(registerUser(values));
//     },
//   });

//   return (
//     <>
//       <Meta title={"Sign Up"} />
//       <BreadCrumb title="Sign Up" />
//       <Container class1="login-wrapper py-5 home-wrapper-2">
//         <div className="row">
//           <div className="col-12">
//             <div className="auth-card">
//               <h3 className="text-center mb-3">Sign Up</h3>
//               <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
//                 <CustomInput
//                   type="text"
//                   name="firstname"
//                   placeholder="First Name"
//                   value={formik.values.firstname}
//                   onChange={formik.handleChange("firstname")}
//                   onBlur={formik.handleBlur("firstname")}
//                 />

//                 <div className="error" style={formik.touched.firstname && formik.errors.firstname ? { color: "red", fontSize: "small" } : {}}>
//                   {formik.touched.firstname && formik.errors.firstname}
//                 </div>
//                 <CustomInput
//                   type="text"
//                   name="lastname"
//                   placeholder="Last Name"
//                   value={formik.values.lastname}
//                   onChange={formik.handleChange("lastname")}
//                   onBlur={formik.handleBlur("lastname")}
//                 />

//                 <div className="error" style={formik.touched.lastname && formik.errors.lastname ? { color: "red", fontSize: "small" } : {}}>
//                   {formik.touched.lastname && formik.errors.lastname}
//                 </div>

//                 <CustomInput
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={formik.values.email}
//                   onChange={formik.handleChange("email")}
//                   onBlur={formik.handleBlur("email")}
//                 />

//                 <div className="error" style={formik.touched.email && formik.errors.email ? { color: "red", fontSize: "small" } : {}}>
//                   {formik.touched.email && formik.errors.email}
//                 </div>

//                 <CustomInput
//                   type="tel"
//                   name="mobile"
//                   placeholder="Mobile Number"
//                   value={formik.values.mobile}
//                   onChange={formik.handleChange("mobile")}
//                   onBlur={formik.handleBlur("mobile")}
//                 />

//                 <div className="error" style={formik.touched.mobile && formik.errors.mobile ? { color: "red", fontSize: "small" } : {}}>
//                   {formik.touched.mobile && formik.errors.mobile}
//                 </div>

//                 <CustomInput
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   value={formik.values.password}
//                   onChange={formik.handleChange("password")}
//                   onBlur={formik.handleBlur("password")}
//                 />

//                 <div className="error" style={formik.touched.password && formik.errors.password ? { color: "red", fontSize: "small" } : {}}>
//                   {formik.touched.password && formik.errors.password}
//                 </div>

//                 <div>
//                   <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
//                     <button className="button border-0" type="button" onClick={handleSubmit}>Sign Up</button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default Signup;

import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/user/userSlice";

const signUpSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  email: yup.string().email("Email should be valid").required("Email is Required"),
  mobile: yup.string().required("Mobile No is Required"),
  password: yup.string().required("Password is Required"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                <CustomInput
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                />
                <div className="error" style={formik.touched.firstname && formik.errors.firstname ? { color: "red", fontSize: "small" } : {}}>
                  {formik.touched.firstname && formik.errors.firstname}
                </div>

                <CustomInput
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                />
                <div className="error" style={formik.touched.lastname && formik.errors.lastname ? { color: "red", fontSize: "small" } : {}}>
                  {formik.touched.lastname && formik.errors.lastname}
                </div>

                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error" style={formik.touched.email && formik.errors.email ? { color: "red", fontSize: "small" } : {}}>
                  {formik.touched.email && formik.errors.email}
                </div>

                <CustomInput
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                />
                <div className="error" style={formik.touched.mobile && formik.errors.mobile ? { color: "red", fontSize: "small" } : {}}>
                  {formik.touched.mobile && formik.errors.mobile}
                </div>

                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error" style={formik.touched.password && formik.errors.password ? { color: "red", fontSize: "small" } : {}}>
                  {formik.touched.password && formik.errors.password}
                </div>

                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                  <button className="button border-0">Sign Up</button>
              
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;


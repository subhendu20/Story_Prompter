import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './css/Login.css'
import { Link } from "react-router-dom"
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { chageLogIn } from '../Action';


const Login: React.FC = () => {
          
          const dispatch = useDispatch();
          const formik = useFormik({
                    initialValues: {

                              email: '',
                              password: '',

                    },
                    validationSchema: Yup.object({

                              email: Yup.string().email('Invalid email address').required('Email is required'),
                              password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),

                    }),

                    onSubmit: (values) => {
                              axios.post('http://localhost:7001/auth/login', values, {
                                        withCredentials: true
                              }).then((res) => {

                                        sessionStorage.setItem('uid',res.data)
                                        dispatch(chageLogIn())
                                     

                              }).catch(() => {

                                        console.log("error in login");
                              })




                    },
          });

          return (
                    <form onSubmit={formik.handleSubmit} className='log-form'>
                              <h1>Sign in</h1>


                              <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                                  type="email"
                                                  id="email"
                                                  name="email"
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  value={formik.values.email}
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                                  <div className="error-message">{formik.errors.email}</div>
                                        )}
                              </div>

                              <div>
                                        <label htmlFor="password">Password</label>
                                        <input
                                                  type="password"
                                                  id="password"
                                                  name="password"
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  value={formik.values.password}
                                        />
                                        {formik.touched.password && formik.errors.password && (
                                                  <div className="error-message">{formik.errors.password}</div>
                                        )}
                              </div>



                              <button type="submit">Sign in</button>
                              <div className='msg-d'><p>Don't have an account?</p><Link to="/signup">Register</Link></div>
                    </form>
          );
};

export default Login;

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom"
import './css/Login.css'
import axios from 'axios'


const Signup: React.FC = () => {
          const navigate = useNavigate();
          const formik = useFormik({
                    initialValues: {
                              firstName: '',
                              lastName: '',
                              email: '',
                              password: '',
                              confirmPassword: '',
                    },
                    validationSchema: Yup.object({
                              firstName: Yup.string().required('First Name is required'),
                              lastName: Yup.string().required('Last Name is required'),
                              email: Yup.string().email('Invalid email address').required('Email is required'),
                              password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
                              confirmPassword: Yup.string()
                                        .oneOf([Yup.ref('password')], 'Passwords must match')
                                        .required('Confirm Password is required'),
                    }),

                    onSubmit: (values) => {
                              axios.post('http://localhost:7001/auth/signup', values, {
                                        withCredentials: true
                              }).then(() => {
                                        navigate('/')

                              }).catch(() => {

                                        console.log("error in signup");
                              })

                    },
          });

          return (
                    <form onSubmit={formik.handleSubmit} className='log-form'>
                              <h1>Register</h1>
                              <div>
                                        <label htmlFor="firstName">First Name</label>
                                        <input
                                                  type="text"
                                                  id="firstName"
                                                  name="firstName"
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  value={formik.values.firstName}
                                        />
                                        {formik.touched.firstName && formik.errors.firstName && (
                                                  <div className="error-message">{formik.errors.firstName}</div>
                                        )}
                              </div>

                              <div>
                                        <label htmlFor="lastName">Last Name</label>
                                        <input
                                                  type="text"
                                                  id="lastName"
                                                  name="lastName"
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  value={formik.values.lastName}
                                        />
                                        {formik.touched.lastName && formik.errors.lastName && (
                                                  <div className="error-message">{formik.errors.lastName}</div>
                                        )}
                              </div>

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

                              <div>
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input
                                                  type="password"
                                                  id="confirmPassword"
                                                  name="confirmPassword"
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  value={formik.values.confirmPassword}
                                        />
                                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                                  <div className="error-message">{formik.errors.confirmPassword}</div>
                                        )}
                              </div>

                              <button type="submit">Sign Up</button>
                              <div className='msg-d'><p>Already have an account?</p><Link to="/">Sign in</Link></div>
                    </form>
          );
};

export default Signup;

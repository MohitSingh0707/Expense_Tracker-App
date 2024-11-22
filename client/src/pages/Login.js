import React, { useState, useEffect } from 'react';
import '../../src/style/login.css';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Layout/Spinner';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form submit handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post('http://localhost:8080/api/v1/users/login', values);
      setLoading(false);
      message.success('Login successful');
      localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }));
      navigate('/');
    } catch (error) {
      setLoading(false);
      message.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  // Prevent login for already authenticated users
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="login-cont">
      {loading && <Spinner />}
      <div className="signin">
        <div className="content">
          <h2>Login Form</h2>

          {/* Login Form */}
          <Form layout="vertical" onFinish={submitHandler}>
            {/* Email */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input type="email" />
            </Form.Item>

            {/* Password */}
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            {/* Button */}
            <div className="links">
              <Link to="/register">Not a user? Click here to register</Link>
              <button className="inputBx" type="submit">
                Login
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState ,useEffect} from 'react';
import { Form, Input, message } from 'antd';
import '../../src/style/register.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Layout/Spinner';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form submit handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      console.log(values);

      await axios.post('http://localhost:8080/api/v1/users/register', values);
      message.success('Registration successful');
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      message.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  // Prevent for login user
  useEffect(()=>{
    if(localStorage.getItem('user')){
      navigate('/')
    }
  },[navigate]);
  
  return (
    <div className="register-page">
      {loading && <Spinner />}
      <Form layout="vertical" onFinish={submitHandler}>
        <h1>Register Form</h1>

        {/* Name */}
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please enter your name!' },
            { min: 3, message: 'Name must be at least 3 characters!' },
          ]}
        >
          <Input type="text" />
        </Form.Item>

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
          rules={[
            { required: true, message: 'Please enter your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* Button */}
        <div className="d-flex justify-content-between">
          <Link to="/login">Already registered? Click here to login</Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
 
import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Spinner from '../components/Layout/Spinner';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // form submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      console.log(values);
      
      await axios.post('/users/register', values);
      message.success("Registration Successful");
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  return (
    <div className='register-page'>
      {loading && <Spinner />}
      <Form layout='vertical' onFinish={submitHandler}>
        <h1>Register Form</h1>

        {/* Name */}
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input type='text' />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please enter your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
        >
          <Input type='email' />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        {/* Button */}
        <div className='d-flex justify-content-between'>
          <Link to="/login">Already registered? Click here to login</Link>
          <button className='btn btn-primary' type='submit'>Register</button>
        </div>
      </Form>
    </div>
  );
};

export default Register;

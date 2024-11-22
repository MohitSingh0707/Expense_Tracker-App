import React, { useState } from 'react';
import { Modal, Form, Input, Select } from 'antd'; // Import Form and Input from Ant Design
import Layout from './../components/Layout/Layout';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);

  // Form handling
  const handleSubmit = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <Layout>
      <div className="filters">
        <div>Range Filters</div>
        <div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add New
          </button>
        </div>
      </div>

      <div className="content"></div>

      {/* Modal */}
      <Modal
        title="Add Transaction"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null} // No footer
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          {/* Amount Field */}
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please enter an amount!' }]}
          >
            <Input type="number" />
          </Form.Item>

          {/* Type Field */}
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please select a type!' }]}
          >
            <Select placeholder="Select transaction type">
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          {/* Category Field */}
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select placeholder="Select a category">
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="subscription">Subscription</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="travel">Travel</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="rent">Rent</Select.Option>
            </Select>
          </Form.Item>

          {/* Date Field */}
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select a date!' }]}
          >
            <Input type="date" />
          </Form.Item>

          {/* Reference Field */}
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>

          {/* Description Field */}
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please provide a description!' }]}
          >
            <Input type="text" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;

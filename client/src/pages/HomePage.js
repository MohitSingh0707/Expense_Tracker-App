import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, message, Table, DatePicker } from 'antd'; // Import Form and Input from Ant Design
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Layout from './../components/Layout/Layout';
import axios from 'axios';
import Spinner from "./../components/Layout/Spinner";
import moment from 'moment';
import Analytics from '../components/Layout/Analytics';
const { RangePicker } = DatePicker;


const HomePage = () => {
  // all state
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([])
  const [frequency, setFrequency] = useState('7')
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState('all')
  const [viewData, setViewData] = useState('table')
  const [editable, setEditable] = useState(null)

  // table data
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Reference',
      dataIndex: 'reference'
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            setEditable(record)
            setShowModal(true)
          }} />
          <DeleteOutlined className='mx-2' onClick={() =>{handleDelete(record)}}/>
        </div>
      )
    },
  ];


  const getAllTransaction = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      const res = await axios.post('http://localhost:8080/api/v1/transactions/get-transaction', {
        userId: user._id,
        frequency,
        selectedDate,
        type
      });
      setLoading(false)
      setAllTransaction(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
      message.error('Fetch issue with transaction')
    }
  };

  // useEffect hook
  useEffect(() => {
    getAllTransaction()
  }, [frequency, selectedDate, type]);

  // delete handler
  const handleDelete=async(record)=>{
    try {
      setLoading(true);
      await axios.post('http://localhost:8080/api/v1/transactions/delete-transaction',{transactionId:record._id});
      setLoading(false);
      message.success("Transaction deleted");
      getAllTransaction();
    } catch (error) {
      setLoading(false)
      console.log(error)
      message.error("Unable to delete")
    }
  };

  // Form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true);
      if (editable) {
        await axios.post('http://localhost:8080/api/v1/transactions/edit-transaction', {
          payload: {
            ...values,
            userId: user._id
          },
          transactionId: editable._id
        });
        setLoading(false);
        message.success('Transaction updated successfully');
      } else {
        await axios.post('http://localhost:8080/api/v1/transactions/add-transaction', { ...values, userid: user._id })
        getAllTransaction();
        setLoading(false)
        message.success('Transaction added successfully')
      }
      setShowModal(false)
      setEditable(null)
    } catch (error) {
      setLoading(false)
      message.error("Failed to add transaction")
    }
  };

  return (
    <Layout>
      {loading && <Spinner/>}
      <div className="filters">
        <div><h6>Select Filter</h6>
          <div>
            <Select value={frequency} onChange={(values) => {
              setFrequency(values);
            }}>
              <Select.Option value='7'>Last 1 Week</Select.Option>
              <Select.Option value='30'>Last 1 Month</Select.Option>
              <Select.Option value='365'>Last 1 Year</Select.Option>

            </Select>

          </div>
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => {
            setType(values);
          }}>
            <Select.Option value='all'>All</Select.Option>
            <Select.Option value='expense'>Expense</Select.Option>
            <Select.Option value='income'>Income</Select.Option>
          </Select>

        </div>
        <div className='switch-icons'>
          <UnorderedListOutlined className={`mx-2 ${viewData == 'table' ? 'active-icon' : 'inactive-icon '}`} onClick={() => setViewData('table')} />
          <AreaChartOutlined className={`mx-2 ${viewData == 'analytics' ? 'active-icon' : 'inactive-icon '}`} onClick={() => setViewData('analytics')} />
        </div>

        <div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add New
          </button>
        </div>
      </div>

      <div className="content">
        {viewData === 'table' ? <Table columns={columns} dataSource={allTransaction} />
          : <Analytics allTransaction={allTransaction} />}

      </div>

      {/* Modal */}
      <Modal
        title={editable ? 'Edit Transaction' : 'Add Transaction'}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null} // No footer
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
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

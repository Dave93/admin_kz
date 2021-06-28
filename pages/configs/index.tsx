import Head from 'next/head'
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Table,
  Space,
  Tooltip,
  TimePicker,
  Switch,
} from 'antd'
import { PlusOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons'
import getConfig from 'next/config'
import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { useDarkMode } from 'next-dark-mode'
import MainLayout from '@components/ui/MainLayout'
import authRequired from '@services/authRequired'
import LoadingScreen from '@components/ui/LoadingScreen'
const { publicRuntimeConfig } = getConfig()
const format = 'HH:mm'

const Configs = () => {
  const user = authRequired({})
  const {
    darkModeActive, // boolean - whether the dark mode is active or not
  } = useDarkMode()

  useEffect(() => {
    if (!user) {
      return
    }
  }, [])

  const [isDrawerVisible, setDrawer] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })
  const [data, setData] = useState([])
  const [editingRecord, setEditingRecord] = useState(null as any)
  const [isSubmittingForm, setIsSubmittingForm] = useState(false)
  let webAddress = 'http://localhost:3000'
  if (typeof window !== 'undefined') {
    webAddress = window.location.origin
  }

  let searchInput = useRef(null)

  const showDrawer = () => {
    setDrawer(true)
  }

  const closeDrawer = () => {
    setEditingRecord(null)
    setDrawer(false)
  }

  const editRecord = (record: any) => {
    setEditingRecord(record)
    form.resetFields()
    form.setFieldsValue(record)
    setDrawer(true)
  }

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm()
    // this.setState({
    //   searchText: selectedKeys[0],
    //   searchedColumn: dataIndex,
    // })
  }

  const handleReset = (clearFilters: any) => {
    clearFilters()
    // this.setState({ searchText: '' })
  }

  const fetchData = async () => {
    setIsLoading(true)
    const {
      data: { data: result },
    } = await axios.get(`${webAddress}/api/configs`)
    setData(result)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const Tooltip = (_: any, record: any) => {
    return (
      <Tooltip title="Редактировать">
        <Button
          type="primary"
          shape="circle"
          size="small"
          icon={<EditOutlined />}
          onClick={() => {
            editRecord(record)
          }}
        />
      </Tooltip>
    )
  }

  const columns = [
    {
      title: 'Действие',
      dataIndex: 'action',
      render: Tooltip,
    },
    {
      title: 'Код',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Значение',
      dataIndex: 'val',
      key: 'val',
    },
    {
      title: 'Тип значения',
      dataIndex: 'type',
      key: 'type',
    },
  ]
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    setIsSubmittingForm(true)
    if (editingRecord) {
      await axios.put(`${webAddress}/api/configs/${editingRecord?.id}`, {
        ...editingRecord,
        ...values,
      })
    } else {
      await axios.post(`${webAddress}/api/configs/`, {
        ...values,
      })
    }
    setIsSubmittingForm(false)
    closeDrawer()
    fetchData()
  }

  const submitForm = () => {
    form.submit()
  }

  const addRecord = () => {
    setEditingRecord(null)
    form.resetFields()
    setDrawer(true)
  }

  const onSearch = async (value: any) => {
    setIsLoading(true)
    const {
      data: { data: result },
    } = await axios.get(`${webAddress}/api/configs?search=${value}`)
    setData(result)
    setIsLoading(false)
  }

  return (
    <MainLayout title="Настройки">
      <div className="flex justify-between mb-3">
        <Input.Search
          loading={isLoading}
          onSearch={onSearch}
          style={{ maxWidth: 400 }}
        />
        <Button type="primary" onClick={addRecord}>
          <PlusOutlined /> Добавить
        </Button>
      </div>
      <Drawer
        title={
          editingRecord ? 'Редактировать настройку' : 'Добавить новую настройку'
        }
        width={720}
        onClose={closeDrawer}
        visible={isDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
              Отмена
            </Button>
            <Button
              onClick={submitForm}
              loading={isSubmittingForm}
              type="primary"
            >
              Сохранить
            </Button>
          </div>
        }
      >
        <Form
          layout="vertical"
          form={form}
          hideRequiredMark
          size="small"
          onFinish={onFinish}
          initialValues={editingRecord ? editingRecord : undefined}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Код"
                rules={[{ required: true, message: 'Просьба ввести код' }]}
              >
                <Input placeholder="Просьба ввести код" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="val"
                label="Значение"
                rules={[{ required: true, message: 'Просьба ввести значение' }]}
              >
                <Input placeholder="Просьба ввести значение" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Тип значения"
                rules={[
                  { required: true, message: 'Просьба ввести тип значения' },
                ]}
              >
                <Input placeholder="Просьба ввести тип значения" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="id"
        scroll={{ x: 'calc(700px + 50%)' }}
        size="small"
        bordered
      />
    </MainLayout>
  )
}

Configs.displayName = 'Configs'
export default Configs

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
  Radio,
  Tabs,
  Divider,
  InputNumber,
} from 'antd'
import { PlusOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons'
import getConfig from 'next/config'
import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { useDarkMode } from 'next-dark-mode'
import MainLayout from '@components/ui/MainLayout'
import authRequired from '@services/authRequired'
import LoadingScreen from '@components/ui/LoadingScreen'
import Cookies from 'js-cookie'
import moment from 'moment'

const { publicRuntimeConfig } = getConfig()
let webAddress = publicRuntimeConfig.apiUrl

const format = 'HH:mm'

axios.defaults.withCredentials = true

const { TabPane } = Tabs

const { Option } = Select

const Cities = () => {
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

    const formData = { ...record }

    form.setFieldsValue(formData)
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
    } = await axios.get(`${webAddress}/api/cities`)
    setData(result)
    setIsLoading(false)
  }

  const setAxiosCredentials = async () => {
    let csrf = Cookies.get('X-XSRF-TOKEN')
    if (!csrf) {
      const csrfReq = await axios(`${webAddress}/api/keldi`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          crossDomain: true,
        },
        withCredentials: true,
      })
      let { data: res } = csrfReq
      csrf = Buffer.from(res.result, 'base64').toString('ascii')

      var inTenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000)
      Cookies.set('X-XSRF-TOKEN', csrf, {
        expires: inTenMinutes,
      })
    }
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf
    axios.defaults.headers.common['XCSRF-TOKEN'] = csrf
  }
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    setIsSubmittingForm(true)
    await setAxiosCredentials()
    if (editingRecord) {
      await axios.put(`${webAddress}/api/cities/${editingRecord?.id}`, {
        ...editingRecord,
        ...values,
      })
    } else {
      await axios.post(`${webAddress}/api/cities/`, {
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
    } = await axios.get(`${webAddress}/api/terminals?search=${value}`)
    setData(result)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    {
      title: '????????????????',
      dataIndex: 'action',
      render: (_: any, record: any) => {
        return (
          <Tooltip title="??????????????????????????">
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
      },
    },
    {
      title: '????????????????????',
      dataIndex: 'active',
      key: 'active',
      render: (_: any) => {
        return <Switch disabled defaultChecked={_} />
      },
    },
    {
      title: '????????????????????',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '????????????????(RU)',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a: any, b: any) => a.name - b.name,
      },
    },
    {
      title: '????????????????(UZ)',
      dataIndex: 'name_uz',
      key: 'name_uz',
      sorter: {
        compare: (a: any, b: any) => a.name_uz - b.name_uz,
      },
    },
    {
      title: '????????????????(EN)',
      dataIndex: 'name_en',
      key: 'name_en',
      sorter: {
        compare: (a: any, b: any) => a.name_en - b.name_en,
      },
    },
    {
      title: '????????????',
      dataIndex: 'lat',
      key: 'lat',
    },
    {
      title: '??????????????',
      dataIndex: 'lon',
      key: 'lon',
    },
    {
      title: '?????????????? ??????????',
      dataIndex: 'map_zoom',
      key: 'map_zoom',
    },
    {
      title: '??????????????',
      dataIndex: 'phone',
      key: 'phone',
    },
  ]

  return (
    <MainLayout title="????????????">
      <div className="flex justify-between mb-3">
        <Input.Search
          loading={isLoading}
          onSearch={onSearch}
          style={{ maxWidth: 400 }}
        />
        <Button type="primary" onClick={addRecord}>
          <PlusOutlined /> ????????????????
        </Button>
      </div>
      <Drawer
        title={editingRecord ? '?????????????????????????? ??????????' : '???????????????? ?????????? ??????????'}
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
              ????????????
            </Button>
            <Button
              onClick={submitForm}
              loading={isSubmittingForm}
              type="primary"
            >
              ??????????????????
            </Button>
          </div>
        }
      >
        <Form
          layout="vertical"
          form={form}
          size="small"
          onFinish={onFinish}
          initialValues={editingRecord ? editingRecord : undefined}
        >
          <Tabs type="card">
            <TabPane tab="??????????" key="1">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="active"
                    label="????????????????????"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="sort" label="????????????????????">
                    <InputNumber />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="????????????????"
                    rules={[
                      { required: true, message: '?????????????? ???????????? ????????????????' },
                    ]}
                  >
                    <Input placeholder="?????????????? ???????????? ????????????????" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="name_uz"
                    label="????????????????(UZ)"
                    rules={[
                      { required: true, message: '?????????????? ???????????? ????????????????' },
                    ]}
                  >
                    <Input placeholder="?????????????? ???????????? ????????????????" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name_en"
                    label="????????????????(EN)"
                    rules={[
                      { required: true, message: '?????????????? ???????????? ????????????????' },
                    ]}
                  >
                    <Input placeholder="?????????????? ???????????? ????????????????" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="lat" label="????????????">
                    <InputNumber />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="lon" label="??????????????">
                    <InputNumber />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="map_zoom" label="?????????????? ??????????">
                    <InputNumber />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="phone" label="??????????????">
                    <Input placeholder="?????????????? ???????????? ??????????????" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="bounds" label="?????????????? ????????????">
                    <Input placeholder="?????????????? ?????????????? ????????????" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="polygons" label="???????????????? ????????????">
                    <Input placeholder="?????????????? ???????????????? ????????????" />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
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

Cities.displayName = 'Cities'
export default Cities

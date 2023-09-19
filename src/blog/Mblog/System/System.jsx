import React, { useEffect, useState } from 'react'
import './System.scss'
import { Col, Container, Row } from 'react-bootstrap'
import SelectSearch from "react-select-search";
import apiRoot from '../../../store/apiRoot';
import { Bar, Pie } from 'react-chartjs-2';
import LineChart, { data } from '../../../components/LineChart/LineChart';
import { FaWarehouse } from "react-icons/fa";
import { AiOutlineShopping } from 'react-icons/ai'
import { BsBoxArrowDownLeft, BsBoxArrowUpLeft, BsBuildings } from 'react-icons/bs'
import VerticalChart, { BarData, options } from '../../../components/VerticalChart/VerticalChart';
import Income from '../../../assets/image/svg/arrow-down-right-square-fill.svg'
import Outgo from '../../../assets/image/svg/arrow-up-right-square-fill.svg'
import ChevronDown from '../../../assets/image/chevron-down.svg'
import Filter from '../../../assets/image/filter-outline.svg'
const System = () => {

  const token = localStorage.getItem('access_token')
  const [options1, setOptions1] = useState([])
  const [options2, setOptions2] = useState([])
  const [options3, setOptions3] = useState([])
  const [options4, setOptions4] = useState([])
  const [value1, setValue1] = useState("3")
  const [value2, setValue2] = useState("all")
  const [value3, setValue3] = useState("all")
  const [value4, setValue4] = useState("all")
  const [monitoring, setMonitoring] = useState([])
  const [products, setProducts] = useState()
  const [linechart, setLinechart] = useState(null)
  const [lengthData, setLengthData] = useState(0)
  const [allShed, setAllShed] = useState([])
  const [allCategoryData, setAllCategoryData] = useState([])
  const [charts, setCharts] = useState(null)



  const arrDate = [
    {
      name: "Сегодня",
      value: '1'
    },
    {
      name: "Вчера",
      value: '2'
    },
    {
      name: "Неделя",
      value: '3'
    },
    {
      name: "Месяц",
      value: '4'
    }
  ]
  const arrAttendes = [
    {
      name: "Все",
      status: "all"
    },
    {
      name: "Входящие",
      status: '1',
    },
    {
      name: "Выходящие",
      status: '0'
    }
  ]
  useEffect(() => {
    const data = arrAttendes?.map((item) => {
      return {
        name: item?.name,
        value: item?.status
      }
    })
    setOptions4(data)
  }, [])
  useEffect(() => {
    apiRoot.get(`warehouses/list`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setAllShed(res.data)
      const dates = res?.data?.map((item) => {
        return {
          name: item?.name,
          value: item?.id
        }
      })
      dates?.push({
        name: "Все",
        value: "all"
      })
      setOptions2(dates?.reverse())
    })
  }, [])
  useEffect(() => {
    apiRoot.get(`products/list`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setProducts(res?.data)
      const dates = res?.data?.map((item) => {
        return {
          name: item?.name,
          value: item?.id
        }
      })
      dates?.push({
        name: "Все",
        value: "all"
      })
      setOptions3(dates.reverse())
    })
  }, [])
  useEffect(() => {
    const dates = arrDate?.map((item) => {
      return {
        name: item?.name,
        value: item?.value
      }
    })
    setOptions1(dates)
  }, [])


  const onSubmit = (e) => {
    e.preventDefault()
    const data = {
      date_id: value1,
      warehouse_id: value2,
      product_id: value3,
      status: value4
    }
    apiRoot.post(`products/monitoring/chart`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res?.data, "data chart");
      setCharts(res.data)
    })
    apiRoot.post(`products/monitoring/linechart`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setLinechart(res?.data)
    })
    apiRoot.post(`products/monitoring`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setMonitoring(res?.data)
      setLengthData(res.data?.products?.length)

      const allID = res.data?.products?.map((item) => item.warehouse.id)
      const sortData = Array.from(new Set(allID))
      const map1 = new Map();

      for (let i = 0; i < sortData.length; i++) {
        let arr = []
        const element = sortData[i];
        for (let j = 0; j < res.data.length; j++) {
          const element2 = res.data[j];
          if (element2.warehouse.id === element) {
            arr.push(element2)
          }
        }
        map1.set(element, arr)
      }
      setAllCategoryData(Array.from(map1))


    })
  }
  const calc = (length) => {
    const a = length * 100
    const b = a / lengthData
    return b
  }
  const xurshid = () => {
    let data = []
    allCategoryData?.map((item) => {
      data.push(calc(item[1]?.length) + "%")
    })
    return data.reverse()
  }

  const chartData = {
    // labels: ['Sklad-1','Sklad-2','Sklad-3','Sklad-4','Sklad-5'],
    labels: allShed.map((item) => item.name).reverse(),
    datasets: [
      {

        data: xurshid(),
        backgroundColor: ['rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',],
        borderColor: ['rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',],
        borderWidth: 2,
        // label:'%'
      }
    ],
  }
  useEffect(() => {
    const data = {
      date_id: "3",
      warehouse_id: "all",
      product_id: "all",
      status: "all"
    }
    apiRoot.post(`products/monitoring/chart`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setCharts(res.data)
    })
    apiRoot.post(`products/monitoring/linechart`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setLinechart(res?.data)
    })
    apiRoot.post(`products/monitoring`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setMonitoring(res?.data)
      setLengthData(res.data?.products?.length)


      const allID = res.data?.products?.map((item) => item.warehouse.id)
      const sortData = Array.from(new Set(allID))
      console.log(sortData, "bu sort");
      const map1 = new Map();

      for (let i = 0; i < sortData.length; i++) {
        let arr = []
        const element = sortData[i];
        for (let j = 0; j < res.data.length; j++) {
          const element2 = res.data[j];
          if (element2.warehouse.id === element) {
            arr.push(element2)
          }
        }
        map1.set(element, arr)
      }
      setAllCategoryData(Array.from(map1))


    })
  }, [])



  return (
    <div className='system'>
      <Container fluid="md">
        <Row>
          <form onSubmit={(e) => onSubmit(e)} >
            <div className="form_group_select mt-4">
              <Col md="8">
                <div className="form_filter_item">
                  <div className="form_control">
                    <label>
                      Выберите день
                    </label>
                    <SelectSearch
                      options={options1}
                      defaultValue={"all"}
                      value={value1}
                      onChange={setValue1}
                      search
                      placeholder="Выберите день"
                    />
                    <img src={ChevronDown} alt="" />
                  </div>
                  <div className="form_control">
                    <label>
                      Выберите склад
                    </label>
                    <SelectSearch
                      options={options2}
                      value={value2}
                      onChange={setValue2}
                      search
                      placeholder="Выберите склад"
                    />
                    <img src={ChevronDown} alt="" />
                  </div>
                  <div className="form_control">
                    <label>
                      Выберите продукт
                    </label>
                    <SelectSearch
                      options={options3}
                      value={value3}
                      onChange={setValue3}
                      search
                      placeholder="Выберите продукт"
                    />
                    <img src={ChevronDown} alt="" />
                  </div>
                  <div className="form_control">
                    <label>
                      Действия
                    </label>
                    <SelectSearch
                      options={options4}
                      value={value4}
                      onChange={setValue4}
                      search
                      placeholder="Действия"
                    />
                    <img src={ChevronDown} alt="" />
                  </div>
                </div>
              </Col>
              <Col md={{ span: 2, offset: 1 }}>
                <div className='all_btn'>
                  <button className="save">Фильтр <img src={Filter} alt="filter_icon" /></button>
                </div>
              </Col>
            </div>
          </form>
        </Row>
        <Row className='mb-5'>
          <Col md="2">
            <div className="system_card_shed">
              <div className="title">
                <p>Склады</p>
                <span>
                  {allShed?.length}
                </span>
              </div>
              <div className="photo">
                <FaWarehouse size={42} color='#fff' />
              </div>
            </div>
          </Col>
          <Col md="2">
            <div className="system_card_obj">
              <div className='title'>
                <p>Обьекты</p>
                <span>{products?.length}+ </span>
              </div>
              <div className="photo">
                <BsBuildings size={42} color='#fff' />
              </div>
            </div>
          </Col>
          <Col md="2">
            <div className="system_card_pro">
              <div className='title'>
                <p>Продукты</p>
                <span>{products?.length}+ </span>
              </div>
              <div className="photo">
                <AiOutlineShopping size={42} color='#fff' />
              </div>
            </div>
          </Col>
          <Col md="3">
            <div className="system_card_k">
              <div className='title'>
                <p>Входящие</p>
                <span>
                  {monitoring?.kelgan_summa?.toLocaleString()} сум
                </span>
              </div>
              <div className="photo">
                <BsBoxArrowDownLeft size={36} color='#fff' />
              </div>
            </div>
          </Col>
          <Col md="3">
            <div className="system_card_s">
              <div className="title">
                <p>Выходящие</p>
                <span>
                  {monitoring?.ketgan_summa?.toLocaleString()} сум
                </span>
              </div>
              <div className="photo">
                <BsBoxArrowUpLeft size={36} color='#fff' />
              </div>
            </div>
          </Col>
        </Row>
        <div className="chart_menu">
          <Row>
            <Col md="8">
              <VerticalChart data={linechart}/>
            </Col>
            <Col md="4">
              {
                charts && <LineChart data={charts} />
              }
            </Col>
          </Row>
        </div>
        <div className="system_blog mt-4">
          <Row>
            <Col md="12">
              <div className="teacher_page">
                <table responsive variant='#F3F6FA'>
                  <thead className='table__head'>
                    <tr>
                      <th col-md-1>№</th>
                      <th col-md-2>Название</th>
                      <th col-md-2>Количество</th>
                      <th col-md-2>Стоимость</th>
                      <th col-md-1>Название складa</th>
                      <th col-md-1>Дoставчик</th>
                      <th col-md-1>Статус</th>
                    </tr>
                  </thead>
                  <tbody className='table__body'>
                    {monitoring?.products?.map((item, index) => (
                      <tr key={item?.id}>
                        <td col-md-1>{index + 1}</td>
                        <td col-md-2>{item?.name}</td>
                        <td col-md-2>{item.amount} {item?.size}</td>
                        <td col-md-1>{Number(item?.total_price)?.toLocaleString()}</td>
                        <td col-md-1>{item?.warehouse?.name}</td>
                        <td col-md-1>{item?.delivery?.name}</td>
                        <td col-md-1>
                          {item?.status === true ? 
                              <img src={Income} alt="" />
                            : item?.status === false ? 
                              <img src={Outgo} alt="" />
                            : null
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default System
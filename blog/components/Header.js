import React, { useState, useEffect } from 'react'
import '../static/style/components/header.css'
import { Row, Col, Menu  } from 'antd'
import { createFromIconfontCN , HomeOutlined, VideoCameraOutlined, CoffeeOutlined} from '@ant-design/icons';
import { GET_TYPE_INFO } from '../utils/apiUrl'
import request from '../utils/request'
import Router from 'next/router'
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  })

const Header = ( ) => {
    const [navArray, setNavArray ] = useState([])

    useEffect( () => {
        const fetchData =  async () => {
                let res = await request({
                    method: 'get',
                    url: GET_TYPE_INFO
                }).then(res => {
                    setNavArray(res.data.data)
                    return res.data.data
                })

                console.log(res)
                setNavArray(res)
            }
            fetchData()

    }, [])

    const handleClick = (e) => {
        console.log(e)
        if(e.key === 'home' ) {
            Router.push('/index')
        } else {
            Router.push(`/list?id=${e.key}`)
        }
    }
    return (
        <div className='header'>
        <Row justify='center' type='flex'>
            <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className="header-logo">web前端</span>
                <span className="header-txt">每天进步一点点</span>
            </Col>
            <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu mode='horizontal' onClick={handleClick}>
                    <Menu.Item key="home">
                        {/* <Icon type="home" /> */}
                        {/* <IconFont type="icon-tuichu" /> */}
                        <HomeOutlined/>
                        首页
                    </Menu.Item>
                    {
                        navArray.map(item => {
                            return (
                            <Menu.Item key={item.id}>{item.typeName}</Menu.Item>
                            )
                        })
                    }
                    {/* <Menu.Item key="video">
                        <VideoCameraOutlined />
                        视频
                    </Menu.Item>
                    <Menu.Item key="life">
                        <CoffeeOutlined />
                        生活
                    </Menu.Item> */}
                </Menu>
            </Col>
        </Row>
    </div>
    )
}



export default Header

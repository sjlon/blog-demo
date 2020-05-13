import React, { useState, useEffect } from 'react'
import request from '../utils/request'
import { List, Row, Col, Modal, message , Button } from 'antd'
import { GET_ARTICLE_LIST, DEL_ARTICLE } from '../utils/apiUrl'
import '../static/css/ArticleList.css'

const { confirm } = Modal
function ArticleList (props) {
    const [list, setList] = useState([])
    useEffect(() => {
        getList()
    }, [])
    const getList = () => {
        request({
            method: 'get', url: GET_ARTICLE_LIST, withCredentials: true
        }).then(res => {
            console.log(res.data.data)
            setList(res.data.data)
        })
    }
    const handleModify = id => {
        props.history.push(`/index/add/${id}`)
    }
    const delArticle = id => {
        confirm({
            title: '确认要删除这篇博客文章吗？',
            content: '确认删除，文章将永久删除，无法恢复！',
            onOk() {
                request({
                    method: 'get', url: DEL_ARTICLE + id, withCredentials: true
                }).then(res => {
                    message.success('删除文章成功')
                    getList()
                })
            },
            onCancel() {
                message.success('取消删除')
            }
        })
    }
    return (
        <div>
            <List bordered
                header={
                <Row className='list-div'>
                    <Col span={8}><b>标题</b></Col>
                    <Col span={4}><b>类别</b></Col>
                    <Col span={4}><b>发布时间</b></Col>
                    <Col span={4}><b>浏览量</b></Col>
                    <Col span={4}><b>操作</b></Col>
                </Row>}
                dataSource={list}
                renderItem={ item => (
                                <List.Item>
                                    <Row className='list-div'>
                                        <Col span={8}>{item.title}</Col>
                                        <Col span={4}>{item.typeName}</Col>
                                        <Col span={4}>{item.addTime}</Col>
                                        <Col span={4}>{item.view_count}</Col>
                                        <Col span={4}>
                                            <Button type='primary' onClick={() => handleModify(item.id)}>修改</Button> &nbsp;
                                            <Button onClick={() => delArticle(item.id)}>删除</Button>
                                        </Col>
                                    </Row>
                                </List.Item>
                            )}>

            </List>
        </div>
    )
}

export default ArticleList

import React, { useState } from 'react'
import '../static/css/Login.css'
import { Card, Input, Icon, Button, Spin,  message } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import request from '../utils/request'
import { CHECK_OPEN_ID } from '../utils/apiUrl'

function Login(props) {
    const [ userName, setUserName ] = useState('baill')
    const [password, setPassword] = useState('123456')
    const [isLoading, setIsLoading] = useState(false)
    const checkLogin = () => {
        if(!userName) {
            message.error('用户名不能为空')
            return
        }
        if(!password) {
            message.error('密码不能为空')
            return
        }
        setIsLoading(true)
        let dataProps = {
            userName, password
        }
        request({ method: 'post', url: CHECK_OPEN_ID, data: dataProps, withCredentials: true}).then(res => {
            setIsLoading(false)
            if(res.data.data === '登录成功') {
                localStorage.setItem('openId', res.data.openId)
                props.history.push('/index')
            } else {
                message.error('用户名密码错误')
            }
        })
        setTimeout(() => {
            setIsLoading(false)
        },200)
    }
    return (
        <div className='login-div'>
            <Card title='blog-adimin' bordered={true} className='login-card'>
                <Spin spinning={isLoading} tips='loading...'>

                    <Input id="userName" size='large' placeholder="请输入用户名" prefix={<UserOutlined/>} defaultValue={userName} onChange={(e) => setUserName(e.target.value)}/>
                    <br/><br/>
                    <Input.Password placeholder="请输入用户密码" size="large" prefix={<KeyOutlined/>} defaultValue={password} onChange={e => setPassword(e.target.value)}/>
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin}>登录</Button>
                </Spin>
            </Card>

        </div>
    )
}

export default Login

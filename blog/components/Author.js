import { Avatar, Divider } from 'antd'
import '../static/style/components/auther.css'
import { GithubOutlined, QqOutlined , WechatOutlined, UserOutlined} from '@ant-design/icons'

const Auther = () => {
    return <div className='author-div comm-box'>
        <div> <Avatar size={100} icon={<UserOutlined/>}  /></div>
            <div className="author-introduction">
                web前端开发者
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<GithubOutlined />} className="account"  />
                <Avatar size={28} icon={<QqOutlined />}  className="account" />
                <Avatar size={28} icon={<WechatOutlined />}  className="account"  />

            </div>
    </div>
}
export default Auther

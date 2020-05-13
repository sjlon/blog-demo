import Head from 'next/head'
import { Fragment, useState } from 'react'
import { Icon, Row, Col, List } from 'antd'
import Link from 'next/link'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import '../static/style/pages/index.css'
import Footer from '../components/Footer'
import request from '../utils/request'
import { GET_ARTICLE_LIST } from '../utils/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'


const Home = ({list}) => {
  const [ myList, setMyList ] = useState(list)
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight(code) {
      return hljs.highlightAuto(code).value
    }
  })
  return <Fragment>
    <Head>
      <title>Home</title>
    </Head>
    <Header/>
    <Row className='comm-main' type='flex' justify='center'>
      {/* 左侧 */}
      <Col xs={24} sm={24} md={16} ls={18} xl={14} className='comm-left'>
        <div>
          <List header={<div>最新日志</div>} itemLayout='vertical' dataSource={myList} renderItem={ item => <List.Item>
            <div className="list-title">
              <Link href={{pathname:'/detailed', query: { id: item.id}}}>
                <a>{item.title}</a>
              </Link>
            </div>
            <div className="list-icon">
              <span>
                {/* <Icon type="calendar" /> */}
          {item.addTime}</span>
              <span>
                {/* <Icon type="folder" /> */}
                {item.typeName}</span>
              <span>
                {/* <Icon type="fire" /> */}
          {item.view_count}人</span>
            </div>
            <div className="list-context" dangerouslySetInnerHTML={{__html: marked(item.introduce)}}></div>
          </List.Item>} >
          </List>
        </div>
      </Col>
      {/* 右侧 */}
      <Col xs={0} sm={0} md={7} lg={5} xl={4} className='comm-right'>
        <div>
          <Author/>
          <Advert/>
        </div>
      </Col>
    </Row>
    <Footer/>
 </Fragment>
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve, reject) => {
    request({
      method: 'get',
      url: GET_ARTICLE_LIST
    }).then(res => {
      resolve(res.data.data)
    })

  })
  let list = await promise
  return {list}
}

export default Home

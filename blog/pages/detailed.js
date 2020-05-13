import React,{useState} from 'react'
import Head from 'next/head'
import {Row, Col , Icon ,Breadcrumb  } from 'antd'
import request from '../utils/request'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import { GET_ARTICLE_BY_ID } from '../utils/apiUrl'
// import ReactMarkdown from 'react-markdown'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detailed.css'
// import MarkNav from 'markdown-navbar';
// import 'markdown-navbar/dist/navbar.css';


const Detailed = ({article}) => {

  const tocify = new Tocify()
  const renderer = new marked.Renderer()
    renderer.heading = function(text, level, raw) {
      const anchor = tocify.add(text, level);
      return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
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
  let html = marked(article.article_content)
  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>{article.typeName}</Breadcrumb.Item>
                  <Breadcrumb.Item>{article.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>

             <div>
                <div className="detailed-title">
                {article.title}
                </div>

                <div className="list-icon center">
                  <span>
                    {/* <Icon type="calendar" /> */}
                    {article.addTime}</span>
                  <span>
                    {/* <Icon type="folder" /> */}
                  {article.typeName}</span>
                  <span>
                    {/* <Icon type="fire" /> */}
                  {article.view_count}人</span>
                </div>


                <div className="detailed-content" dangerouslySetInnerHTML={{__html: html}}>
                  {/* <ReactMarkdown
                    source={markdown}
                    escapeHtml={false}
                  /> */}
              </div>
             </div>

            </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          <Advert/>
          <div className="detailed-nav comm-box">
          <div className="nav-title">文章目录</div>
          {/* <MarkNav
            className="article-menu"
            source={html}
            ordered={false}
          /> */}
          {tocify && tocify.render()}
        </div>

        </Col>
      </Row>
      <Footer/>

   </>
  )
  }

  Detailed.getInitialProps = async context => {
    let { id } = context.query
    let promise = new Promise((resolve, reject) => {
      request({
        method: 'get',
        url: `${GET_ARTICLE_BY_ID}/${id}`
      }).then(res => {

        resolve(res.data.data[0])
      })
    })
    let article = await promise
    return {article}
  }
export default Detailed

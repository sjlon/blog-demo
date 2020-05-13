import React, { Component , useState, useEffect} from 'react';
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import request from '../utils/request'
import { GET_TYPE_INFO, ADD_ARTICLE, UPDATE_ARTICLE, GET_ARTICLE_BY_ID } from '../utils/apiUrl'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
const { Option } = Select
const { TextArea } = Input

function AddArticle(props) {
    console.log(props)
    const [articleId, setArticleId ] = useState(0) // 0新增， 非0 修改
    const [articleTitle, setArticleTitle ] = useState('') //标题
    const [articleContent, setArticleContent ] = useState('') // 文章内容
    const [markdownContent, setMarkdownContent ] = useState('预览内容') // html预览内容
    const [introducemd, setIntroducemd ] = useState() // 简介内容
    const [ introducehtml, setIntroducehtml] = useState('等待编辑') // 简介的html预览
    const [showDate, setShowDate ] = useState() // 发布日期
    const [ updateDate, setUpdateDate ] = useState()
    const [ typeInfo, setTypeInfo ] = useState([]) // 文章类别信息
    const [ selectedType, setSelectedType ] = useState() // 选择的文章类别

    marked.setOptions({
        renderer: new marked.Renderer(),
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
    useEffect( () => {
        getTypeInfo()
        getArticleById(props.match.params.id)
    }, [])
    const changeContent = (e)=>{
        setArticleContent(e.target.value)
        let html=marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e)=>{
         setIntroducemd(e.target.value)
         let html=marked(e.target.value)
         setIntroducehtml(html)
     }
     const selectChange= (value) => {
        setSelectedType(value)
     }
     const getTypeInfo = () => {
        request({
            method: 'get', url: GET_TYPE_INFO, withCredentials: true
        }).then(res => {
            if(res.data.data === '没有登录') {
                localStorage.removeItem('openId')
                props.history.push('/login')
            } else {
                setTypeInfo(res.data.data)
            }

        })
     }

     const saveArticle = () => {
         if(!selectedType) {
             message.error('必须选择文章类型')
             return
         }
         if(!articleTitle) {
             message.error('文章标题必须填写')
             return
         }
         if(!articleContent) {
             message.error('文章内容必须填写')
             return
         }
         if(!introducemd) {
             message.error('文章简介必须填写')
             return
         }
         if(!showDate) {
             message.error('文章发布时间必须填写')
             return
         }
         let dataProps = {}
         dataProps.type_id = selectedType
         dataProps.title = articleTitle
         dataProps.article_content = articleContent
         dataProps.introduce = introducemd
         let dateText = showDate.replace('-','/')
         dataProps.addTime = new Date(dateText).getTime() / 1000
         if(articleId === 0) {
            dataProps.view_count = 0
            request({
                method: 'post',
                url: ADD_ARTICLE,
                data: dataProps,
                withCredentials: true
            }).then(res => {
                if(res.data.isSuccess) {
                    setArticleId(res.data.insertId)
                    message.success('文章保存成功')
                } else {
                    message.error('文章保存失败')
                }
            })
         } else {
             dataProps.id = articleId
            request({
                method: 'post',
                url: UPDATE_ARTICLE,
                data: dataProps,
                withCredentials: true
            }).then(res => {
                if(res.data.isSuccess) {
                    message.success('文章修改成功')
                } else {
                    message.error('文章修改失败')
                }
            })
         }


     }
     const getArticleById = (id) => {
        if(!id) return
        request({ method: 'get', withCredentials: true, url: GET_ARTICLE_BY_ID + id}).then(res => {
            let articleInfo = res.data.data[0]
            setArticleId(id)
            setArticleTitle(articleInfo.title)

            setArticleContent(articleInfo.article_content)
            let html = marked(articleInfo.article_content)
            setMarkdownContent(html)
            setIntroducemd(articleInfo.introduce)
            setIntroducehtml(marked(articleInfo.introduce))
            setShowDate(articleInfo.addTime)
            setSelectedType(articleInfo.typeId)
        })
     }
    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={[10, 10]}>
                        <Col span={18}>
                            <Input placeholder='请输入博客标题' value={articleTitle} size='large' onChange={e => setArticleTitle(e.target.value)}/>
                        </Col>
                        <Col span={6}>
                            &nbsp;
                            <Select defaultValue={selectedType} size='large' onChange={selectChange} placeholder='请选择文章类别'>
                                { typeInfo.map(item => (
                                    <Option value={item.id} key={item.id}>{item.typeName}</Option>
                                    ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={12}>
                        <TextArea
                            value={articleContent}
                            className="markdown-content"
                            rows={35}
                            onChange={changeContent}
                            onPressEnter={changeContent}
                            placeholder="文章内容"
                        />

                        </Col>
                        <Col span={12}>
                            <div className="show-html" dangerouslySetInnerHTML={{__html:markdownContent}} ></div>
                        </Col>

                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size='large'>暂存文章</Button>
                            &nbsp;
                            <Button size='large' type='primary' onClick={saveArticle}>发布文章</Button>
                            <br/>
                        </Col>
                        <Col span={24}>
                            <br/>
                            <TextArea rows={4} placeholder='文章简介' rows={4}
                                value={introducemd}
                                onChange={changeIntroduce}
                                onPressEnter={changeIntroduce}
                                placeholder="文章简介"/>
                            <br/><br/>
                            <div className='introduce-html' dangerouslySetInnerHTML = {{__html:'文章简介：'+introducehtml}}></div>
                        </Col>
                        <Col span={12}>
                            <div className='date-select'>
                                <DatePicker  placeholder='发布日期' size='large' onChange={(date, dateString) => setShowDate(dateString)}/>
                            </div>
                        </Col>
                        {/* <Col span={12}>
                            <div className='date-select'>
                                <DatePicker  placeholder='修改日期' size='large'/>
                            </div>
                        </Col> */}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}


export default AddArticle

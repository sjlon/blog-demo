'use strict'

const Controller = require('egg').Controller

class ArticleController extends Controller {
    async index() {
        const { ctx } = this
        ctx.body = 'admin'
    }

    async checkLogin() {
        let {userName , password } = this.ctx.request.body
        const sql = `SELECT  userName FROM admin_user WHERE userName = '${userName}' AND password = '${password}'`

        let result = await this.app.mysql.query(sql)
        if(result.length > 0) {
            let openId = new Date().getTime()
            this.ctx.session.openId = { openId }
            this.ctx.body = {
                data: '登录成功', openId: openId
            }
        } else {
            this.ctx.body = {
                data: '登录失败'
            }
        }


    }

    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')
        this.ctx.body = { data: resType}
    }

    async addArticle() {
        let tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.insert('article', tmpArticle)
        let insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId
        }
    }
    async updateArticle() {
        let tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.update('article', tmpArticle)
        let updateSuccess = result.affectedRows === 1
        this.ctx.body = {
            isSuccess: updateSuccess,
        }
    }

    async getArticleList() {
        let sql = `SELECT article.id as id, article.title as title, article.introduce as introduce, FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime, article.view_count as view_count, type.typeName as typeName FROM article LEFT JOIN type ON article.type_id = type.id ORDER BY article.id DESC`
        const results = await this.app.mysql.query(sql)
        this.ctx.body = { data: results}
    }

    async delArticle() {
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article', { id })
        this.ctx.body = {
            data: res
        }
    }
    async getArticleById() {
        let id = this.ctx.params.id
        let sql = `SELECT article.id as id, article.title as title, article.introduce as introduce, FROM_UNIXTIME(article.addTime, '%Y-%m-%d') as addTime, article.article_content as article_content, article.view_count as view_count, type.typeName as typeName,type.id as typeId FROM article LEFT JOIN type ON article.type_id = type.id WHERE article.id = ${id}`
        const result = await this.app.mysql.query(sql)
        this.ctx.body = {
            data: result
        }
    }
}

module.exports = ArticleController

'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'result';
  }
  // 获取所有文章
  async getArticleList() {
    const sql = 'SELECT article.id as id, ' +
         'article.title as title,' +
         'article.introduce as introduce,' +
         "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime," +
         'article.view_count as view_count,' +
         'type.typeName as typeName ' +
        'FROM article LEFT JOIN type ON article.type_id = type.Id';

    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results, isSuccess: true };
  }
  // 根据ID获取文章详情
  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id, ' +
        'article.title as title,' +
        'article.introduce as introduce,' +
        'article.article_content as article_content,' +
        "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime," +
        'article.view_count as view_count,' +
        'type.typeName as typeName, ' +
        'type.id as typeId ' +
       'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
       'WHERE article.id = ' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
  // 获取文章类别信息
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }

  async getListById() {
    const id = this.ctx.params.id;
    const sql = `SELECT article.id as id, article.title as title, article.introduce as introduce, FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime, article.view_count as view_count, type.typeName as typeName FROM article LEFT JOIN type ON article.type_id = type.Id WHERE type_id = ${id}`;
    const results = await this.app.mysql.query(sql);
    console.log(results);
    this.ctx.body = { data: results };
  }
}

module.exports = HomeController;

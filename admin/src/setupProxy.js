const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/admin',
    createProxyMiddleware({
      target: 'http://localhost:7002',
      changeOrigin: true,
    })
  );
};

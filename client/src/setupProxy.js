const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/', // Specify the path to proxy
    createProxyMiddleware({
      target: 'http://localhost:8080/api', // Specify the production server URL
      changeOrigin: true,
    })
  );
};
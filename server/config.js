const path = require('path');

const env = process.env.NODE_ENV || 'production';
const localStaticPath = env === 'production' ? '../client' : '../dist/client';

module.exports = {
  env,
  db: 'mongodb://localhost/mimosa',
  port: process.env.PORT || 9000,
  staticPath: path.resolve(__dirname, localStaticPath),
  jwtSecret: process.env.JWT_SECRET || 'mimosaasomim',
  uploadDir: '/tmp',
  email: 'admin@email.com',
  password: 'mimosa',
};

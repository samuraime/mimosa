const fs = require('fs');
const Promise = require('bluebird');
const path = require('path');
const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const multer = require('koa-multer');
const config = require('./config');
const jwtMiddleware = require('koa-jwt')({ secret: config.jwtSecret });
const Archive = require('./models/archive');

const upload = multer({ dest: config.uploadDir });
const unlink = Promise.promisify(fs.unlink);

router.post('/login', (ctx) => {
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;

  const result = { success: false };

  if (email === config.email && password === config.password) {
    result.success = true;
    result.authToken = jwt.sign({ email }, config.jwtSecret);
  }
  if (!result.success) {
    ctx.throw(401);
  }

  ctx.body = result;
});

router.get('/archives', async (ctx) => {
  try {
    const archives = await Archive.list();
    ctx.body = archives;
  } catch (e) {
    ctx.throw(e);
  }
});

router.get('/archives/:id', async (ctx) => {
  try {
    const id = ctx.params.id;
    const archive = await Archive.findById(id);
    ctx.response.body = archive;
  } catch (e) {
    ctx.throw(e);
  }
});

router.get('/archives/:id/download', async (ctx) => {
  try {
    const id = ctx.params.id;
    const archive = await Archive.findById(id);
    ctx.response.append('Content-Disposition', `attachment; filename=${archive.name}`);
    ctx.response.body = fs.createReadStream(archive.path);
  } catch (e) {
    ctx.throw(404);
  }
});

router.put('/archives/:id', jwtMiddleware, async (ctx) => {
  try {
    const id = ctx.params.id;
    const update = ctx.request.body;
    await Archive.findByIdAndUpdate(id, update);
    ctx.response.body = true;
  } catch (e) {
    ctx.throw(e);
  }
});

router.delete('/archives/:id', jwtMiddleware, async (ctx) => {
  try {
    const id = ctx.params.id;
    const archive = await Archive.findByIdAndRemove(id);
    await unlink(archive.path);
    ctx.response.body = true;
  } catch (e) {
    ctx.throw(e);
  }
});

router.post('/archives', jwtMiddleware, upload.single('archive'), async (ctx) => {
  try {
    const file = ctx.req.file;
    const archive = new Archive({
      name: path.basename(file.originalname),
      originalName: file.originalname,
      size: file.size,
      path: file.path,
      mimetype: file.mimetype,
      url: file.path.replace(/\\/g, '/'),
    });
    await archive.save();
    ctx.response.body = archive;
  } catch (e) {
    ctx.throw(e);
  }
});

router.get('*', (ctx) => {
  ctx.redirect('/');
});

module.exports = router;

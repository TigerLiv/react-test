const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('koa-router')();

const app=new koa();
app.use(bodyparser());
app.use(router.routes());

const home = require('./home')

router.get('/api/list',async (ctx,next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.body=home;
    await next();
})
app.on('error',(err,ctx) =>{
    console.error(err,ctx)
})
app.listen(5000);
console.log('server starting')

const express = require("express");
const dotenv = require('dotenv');
const unirest = require('unirest');
const crypto = require('crypto');
dotenv.config();

function generateUniqueId(){
    return crypto.randomBytes(10).toString('HEX');
 }

const app = express();
const routes = express.Router();

routes.get('/',(req, res)=>{
      let state = generateUniqueId()
      return res.status(200).send(`<a href='https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri={YOUR_CALLBACK_URL}&scope=repo%20user&state=${state}&allow_signup=false' target='_blank'>here</a>`);
})


async function getToken(code,state){
  let token = ''
  await unirest.post("https://github.com/login/oauth/access_token")
  .type("json")
  .send({
    "client_id": process.env.CLIENT_ID,
    "client_secret": process.env.CLIENT_SECRET,
    "code": code,
    "state":state,
    "redirect_uri":"http://localhost:3333/user"
  })
  .then((response)=>{
    if (!response.body.error){
      token = response.body.access_token
    }
  })
  return token
}

routes.get('/logged/:access_token',(req, res)=>{
  console.log(req.headers,req.body,req.params)
  return res.status(200).send(`<h1> Your Acces token is: ${req.params.access_token}`)
})
routes.get('/user',async (req, res)=>{
  const code = req.query.code;
  const state = req.query.state;
  var access_token = await getToken(code,state)
  return res.status(200).redirect('/logged/'+access_token);

})

app.use(express.json())
app.use(routes);

app.listen(process.env.PORT);

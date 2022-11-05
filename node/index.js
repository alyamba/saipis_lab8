const express = require('express')
const app = express()

const router = require('./router');
const { initializeDataBase } = require('./utils');

const PORT = 8000

initializeDataBase()

app.use(express.json())

app.use((req, res, next) => {
  var origins = [
     'http://127.0.0.1:5500'
  ];

  for(var i = 0; i < origins.length; i++){
    var origin = origins[i];

    if(req.headers.origin?.indexOf(origin) > -1){
      res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use("", router);

app.listen(PORT, () => {
  console.log('Example app listening on port 8000!')
});
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.config');
app.use(express.json());
const user = require("./models/user.model");

mongoose.set('strictQuery', false);
mongoose.connect(serverConfig.DB_URL);
const db = mongoose.connection;
 db.on("error", ()=>{
      console.log("error while connecting to DB");
  });
  db.once("open",()=>{
     console.log("connected to Mongo DB ")
  });

require('./routes/user.routes')(app);

app.get('/', (req,res)=>{
  res.send('users details')
})
app.get('/api/allusers/paginate', paginatedResults(user), (req, res) => {
  res.json(res.paginatedResults)
})

function paginatedResults(model) { 
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < await model.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec()
      res.paginatedResults = results
      next()
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}
  app.listen(serverConfig.PORT, () => {
    console.log(`Application started on the port num : ${serverConfig.PORT}`);
})
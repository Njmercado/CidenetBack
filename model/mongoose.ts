import mongoose from 'mongoose';

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

mongoose.connect(url)

const db = mongoose.connection

db.on('error', console.log.bind(`connection error on ${url}: `))
db.on('open', function(){
  console.log(`connection to db mongoose has been successful: ${url}`)
})

export default mongoose

import mongoose from 'mongoose';

const url = 'mongodb://localhost/cidenetback'

mongoose.connect(url)

const db = mongoose.connection

db.on('error', console.log.bind(`connection error on ${url}: `))
db.on('open', function(){
  console.log(`connection to db mongoose has been successful: ${url}`)
})

export default mongoose

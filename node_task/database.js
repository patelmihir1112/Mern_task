var mongoose = require('mongoose');

let db = process.env.MONGO_URI ;
console.log(db)
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));
const connection = mongoose.connection;
 
module.exports = connection;
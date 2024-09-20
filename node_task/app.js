require("dotenv/config");
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const path = require("path")
const productRoutes = require('./routes/productRoutes');
const comboOfferRoutes = require('./routes/comboOfferRoutes');


const cors = require('cors');

let port = process.env.PORT || 8080;
require("./database")

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api/products', productRoutes);
app.use('/api/combo', comboOfferRoutes);


app.use("*", (req, res, next) => {
    const error = {
      status: 404,
      message: API_ENDPOINT_NOT_FOUND_ERR,
    };
    next(error);
  });
  

  app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || SERVER_ERR;
    const data = err.data || null;
    return res.status(status).json({
      status: status,
      success: false,
      message,
      data,
    });
  });

app.listen(port, function(){
    console.log('app listening on port: '+port);
});
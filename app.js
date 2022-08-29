const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = express.Router();
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(routes);

app.use(morgan('dev'));
app.use(express.json());

app.get('/ping', (req, res)=> {
    res.json({message : 'pong'});
})

app.listen(PORT, ()=> {
    console.log(`server listening on PORT ${PORT}`);
}
);
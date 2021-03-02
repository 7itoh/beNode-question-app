import express from 'express'
import bodyParser from 'body-parser'
import dotENV from 'dotenv'
import router from './route/index'

dotENV.config();
const port = process.env.ENV_PORT;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(bodyParser.urlencoded({
    extended: true
  }))
app.use(bodyParser.json());

app.use(express.static('dist/public'));
app.use('/', router);

app.listen(port, () => { 
    console.log(`Listening Port_Num: ${port}`);
})
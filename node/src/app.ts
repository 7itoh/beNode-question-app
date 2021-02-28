import express from 'express'
import dotENV from 'dotenv'
import router from './route/index'

dotENV.config();
const port = process.env.ENV_PORT;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('dist/public'));
app.use('/', router);

app.listen(port, () => { 
    console.log(`Listening Port_Num: ${port}`);
})
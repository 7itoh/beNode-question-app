import Express from 'express'
import dotENV from 'dotenv'

dotENV.config();
const port = process.env.ENV_PORT;

const app = Express();

app.listen(port, () => { 
    console.log(`Listening Port_Num: ${port}`);
})
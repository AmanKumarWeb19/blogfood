const express = require('express');
const cors = require('cors');
const colors = require('colors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

// Config location
const { dbConnection } = require('./configs/db');


// Routes location
const { userRouter } = require('./routes/userRoutes');


// Middlewares location
const { authentication } = require('./middlewares/authMiddleware');


app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="text-align:center; color:blue">Welcome to Blog App Backend</h1>`);
});


// Routes || Endpoints
app.use('/auth',userRouter);
app.use(authentication);



app.listen(PORT,async()=>{
    try {
        await dbConnection;
        console.log(colors.blue(`Database Conncected Successfully`))        
        console.log(colors.blue(`Server is listening in PORT: ${PORT}`))
    } catch (error) {
        console.error(colors.red(`Error in Listening: ${error.message}`))
    }
});
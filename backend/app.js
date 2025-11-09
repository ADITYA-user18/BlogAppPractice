import express from 'express';
import UserRoutes  from './routes/userRoutes.js'
import morgan from "morgan"
const app = express()
import cors from "cors";


app.use(express.json())
app.use(morgan("dev"))
app.use(cors({ origin: "http://localhost:5173" }));


app.get('/',(req,res)=>{
    console.log('Demo Route')
});


app.use('/user',UserRoutes)

export default app;


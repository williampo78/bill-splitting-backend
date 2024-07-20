import express from 'express';
import billRoutes from './routes';

const app = express();
const port = 3000;


//middleware

app.use(express.json());
app.use((req, res, next) => {
    console.log(123465);
    next()
})

app.use('/api/bills', billRoutes)

app.listen(port, () => {
    console.log(`server is listening on ${port} !!!`);
});


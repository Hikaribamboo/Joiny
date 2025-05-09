import express from 'express';
import greetingController from './controllers/greetings';

const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/greetings', greetingController);

app.listen(5000, () => {
    console.log('Start app on PORT: 5000!');

});
import express from 'express';
import router from './controllers/BookController';
import populate from './database/seeder'; 

const app = express();
app.use(express.json());
app.use('/books', router);

populate();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

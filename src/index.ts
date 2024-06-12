import express from 'express';
import bookRoutes from './routes/BookRoutes';
import RunSeeder from './database/seed/RunSeeder'; 

const app = express();
app.use(express.json());
app.use('/books', bookRoutes);

RunSeeder();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

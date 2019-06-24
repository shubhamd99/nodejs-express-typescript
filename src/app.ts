import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import exphbs from 'express-handlebars';
import logger from './middleware/logger';
import router from './routes/memberRoutes';
import { members } from './members';

const app: Application = express();

// Init middleware
app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars'); // Template Engine

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage
app.get('/', (req: Request, res: Response) => res.render('index', {
  title: 'Member App',
  members
}))

// Set static folder with express
// app.use(express.static(path.join(__dirname, '../public')))

// Member API Routes
app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

import errorHandler from 'errorhandler';
import express from 'express'
import mongoose from 'mongoose'
import {PostsController, WelcomeController} from './controllers';

const app: express.Application = express();
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port: number = 3000;

app.use('/', WelcomeController)
app.use('/posts', PostsController)
app.use(express.static('public'))
app.use(errorHandler())

// Set up database connection
mongoose.connect('mongodb://localhost:27017/posts', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to database!')
})

// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});

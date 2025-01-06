require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const session = require('express-session');

const connectDB = require('./config/db');
//const MongoStore = require('connect-mongo');

const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');



const app = express();
connectDB();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);

// const isAuthenticated = (req, res, next) => {
//     if (req.session.user) {
//         return next();
//     }
//     res.status(401).json({ message: 'Unauthorized' });
// };

app.use(session({
    secret: 'your_jwt_secret',
    resave: false,          
    saveUninitialized: false, 
    cookie: {
        secure: false,      
        httpOnly: true,     
        maxAge: 1000 * 60 * 60,
    },
}));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

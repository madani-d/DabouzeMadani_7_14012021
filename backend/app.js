import express, { json } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import articleRoutes from './routes/article.js';
import userRoutes from './routes/user.js';
import commentRoutes from './routes/comment.js';
import likeRoutes from './routes/like.js';
import moderatorRoutes from './routes/moderator.js';
import chatRoutes from './routes/chat.js';

const app = express();

// Initialize limit limit requests (100 by 15min)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300
})

app.use(helmet());
app.use(limiter)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/images', express.static('images'));
app.use('/api/auth', userRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api', likeRoutes);
app.use('/api/moderator', moderatorRoutes);
app.use('/api/chat', chatRoutes);

export default app;
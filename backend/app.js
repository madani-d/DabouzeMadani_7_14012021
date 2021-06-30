import express, { json } from 'express';
import articleRoutes from './routes/article.js';
import userRoutes from './routes/user.js';
import commentRoutes from './routes/comment.js';
import likeRoutes from './routes/like.js';
import moderatorRoutes from './routes/moderator.js'

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(json());

app.use('/images', express.static('images'));
app.use('/api/auth', userRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api', likeRoutes);
app.use('/api/moderator', moderatorRoutes);

export default app;
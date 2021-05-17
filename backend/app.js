const express = require('express');
const articleRoutes = require('./routes/article');
const userRoutes = require('./routes/user');

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

// Get all users

// app.get('/getall', (req, res, next) => {
//   let sql = "SELECT * FROM User;";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send({result});
//     next();
//   })
// });

// app.get('/postOne/:id',(req, res, next) => {
//   let data = [
//     req.params.id,
//     req.params.id,
//     `${req.params.id}@test.fr`,
//     'U',
//     '2021-05-08 14:55:00',
//     'azerty'
//   ];
//   console.log(req.params);
//   let sql = "INSERT INTO User (nom, prenom, email, role, date_signin, mdp) values (?, ?, ?, ?, ?, ?);";
//   db.query(sql, data, (err, result) => {
//     if (err) throw err;
//     console.log(data);
//   })
// })


app.use('/api/auth', userRoutes);
app.use('/api', articleRoutes);

module.exports = app;
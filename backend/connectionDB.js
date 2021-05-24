import { createConnection } from 'mysql';

// Create connection 
const db = createConnection({
    host: 'localhost',
    user: 'betatesteur',
    password: 'groupomania123',
    database: 'groupomania'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Mysql connected...');
});

export { db };
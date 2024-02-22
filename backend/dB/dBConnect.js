import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'your host',
    user: 'your user name',
    password: 'your password',
    database: 'database name'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

export default db;

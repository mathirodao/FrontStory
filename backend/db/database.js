const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conexión exitosa a la base de datos SQLite');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS campaigns  (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name  TEXT NOT NULL,
            start_date TEXT NOT NULL,
            end_date TEXT NOT NULL,
            clicks INTEGER NOT NULL,
            cost REAL NOT NULL,
            revenue REAL NOT NULL
        )
    `);

    db.run(`CREATE INDEX IF NOT EXISTS idx_campaign_name ON campaigns(name)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_campaign_start_date ON campaigns(start_date)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_campaign_end_date ON campaigns(end_date)`);
});

module.exports = db;
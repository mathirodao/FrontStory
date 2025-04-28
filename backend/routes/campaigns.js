const express = require('express');
const router = express.Router();
const db = require('../db/database'); 

router.get('/', (req, res) => {
    db.all(`
        SELECT *, (revenue - cost) AS profit FROM campaigns
         `, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { name, start_date, end_date, clicks, cost, revenue } = req.body;

    if (!name || !start_date || !end_date || clicks == null || cost == null || revenue == null) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    const query = `
        INSERT INTO campaigns (name, start_date, end_date, clicks, cost, revenue)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [name, start_date, end_date, clicks, cost, revenue], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Campaign created', id: this.lastID });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM campaigns WHERE id = ?`;

    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.json({ message: 'Campaign deleted' });
    });
});


module.exports = router;
import express from 'express';
import db from './dBConnect.js';

const router = express.Router();

router.get('/country', (req, res) => {
    const sql = "SELECT * FROM addressbook.country";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

router.post('/country/new', (req, res) => {
    const sql = "INSERT INTO addressbook.country (`COUNTRY_NAME`, `COUNTRY_CODE`) VALUES (?)";
    const data = [
        req.body.namem,
        req.body.codem
    ]
    db.query(sql, [data], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });

});

router.put('/country/edit/:id', (req, res) => {
    const sql = "UPDATE addressbook.country SET `COUNTRY_NAME` = ?, `COUNTRY_CODE` = ? WHERE COUNTRY_ID = ?";
    const data = [
        req.body.namem,
        req.body.codem
    ]
    const id = req.params.id;
    db.query(sql, [...data, id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });

});

router.delete('/country/delete/:id', (req, res) => {
    const sql = "DELETE FROM addressbook.country WHERE COUNTRY_ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

export default router;
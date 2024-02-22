import express from 'express';
import db from './dBConnect.js';

const router = express.Router();

router.get('/address_type', (req, res) => {
    const sql = "SELECT * FROM addressbook.address_type";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

router.post('/address_type/new', (req, res) => {
    const sql = "INSERT INTO addressbook.address_type (`ADDRESS_TYPE_NAME`) VALUES (?)";
    const data = [
        req.body.namem
    ]
    db.query(sql, [data], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });

});

router.put('/address_type/edit/:id', (req, res) => {
    const sql = "UPDATE addressbook.address_type SET `ADDRESS_TYPE_NAME` = ? WHERE ADDRESS_TYPE_ID = ?";
    const data = [
        req.body.namem
    ]
    const id = req.params.id;
    db.query(sql, [data, id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });

});

router.delete('/address_type/delete/:id', (req, res) => {
    const sql = "DELETE FROM addressbook.address_type WHERE ADDRESS_TYPE_ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

export default router;

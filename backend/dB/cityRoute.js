import express from 'express';
import db from './dBConnect.js';

const router = express.Router();

router.get('/city', (req, res) => {
    const sql = "SELECT city.CITY_ID, city.CITY_NAME, country.COUNTRY_ID, country.COUNTRY_CODE, country.COUNTRY_NAME FROM addressbook.city INNER JOIN addressbook.country ON city.COUNTRY_ID = country.COUNTRY_ID";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

router.post('/city/new', (req, res) => {
    const sql = "INSERT INTO addressbook.city (`CITY_NAME`, `COUNTRY_ID`) VALUES (?)";
    const data = [
        req.body.namem,
        req.body.idm
    ]
    db.query(sql, [data], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

router.put('/city/edit/:id', (req, res) => {
    const sql = "UPDATE addressbook.city SET `CITY_NAME` = ?, `COUNTRY_ID` = ? WHERE CITY_ID = ?";
    const data = [
        req.body.namem,
        req.body.idm
    ]
    const id = req.params.id;
    db.query(sql, [...data, id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });

});

router.delete('/city/delete/:id', (req, res) => {
    const sql = "DELETE FROM addressbook.city WHERE CITY_ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

export default router;

import express from 'express';
import db from './dBConnect.js';

const router = express.Router();

router.get('/address/:id', (req, res) => {
    const sql = "SELECT address.*, address_type.*, city.*, country.* \
    FROM addressbook.address \
    LEFT JOIN addressbook.address_type ON address.ADDRESS_TYPE_ID = address_type.ADDRESS_TYPE_ID \
    LEFT JOIN addressbook.city ON address.CITY_ID = city.CITY_ID \
    LEFT JOIN addressbook.country ON city.COUNTRY_ID = country.COUNTRY_ID \
    WHERE address.PERSON_ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

router.post('/address/new', (req, res) => {
    const sql = "INSERT INTO addressbook.address (`ADDRESS`, `POSTCODE`, `CITY_ID`, `ADDRESS_TYPE_ID`, `PERSON_ID`) VALUES (?)";
    const data = [
        req.body.addressm,
        req.body.postcodem,
        req.body.cidm,
        req.body.aidm,
        req.body.personidm
    ]
    db.query(sql, [data], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

router.put('/address/edit/:id', (req, res) => {
    const sql = "UPDATE addressbook.address SET `ADDRESS` = ?, `POSTCODE` = ?, `CITY_ID` = ?, `ADDRESS_TYPE_ID` = ? WHERE ADDRESS_ID = ?";
    const data = [
        req.body.addressm,
        req.body.postcodem,
        req.body.cidm,
        req.body.aidm
    ]
    const id = req.params.id;
    db.query(sql, [...data, id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

router.delete('/address/delete/:id', (req, res) => {
    const sql = "DELETE FROM addressbook.address WHERE ADDRESS_ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

export default router;

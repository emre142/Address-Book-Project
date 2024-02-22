import express from 'express';
import db from './dBConnect.js';

const router = express.Router();

router.get('/person', (req, res) => {
    const sql = "SELECT person.*, COUNT(address.PERSON_ID) AS ADDRESS_COUNT \
    FROM addressbook.person \
    LEFT JOIN addressbook.address ON person.PERSON_ID = address.PERSON_ID \
    GROUP BY person.PERSON_ID";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

router.post('/person/new', (req, res) => {
    const sql = "INSERT INTO addressbook.person (`FIRST_NAME`,`LAST_NAME`, `EDU_LEVEL`) VALUES (?)";
    const data = [
        req.body.fnamem,
        req.body.lnamem,
        req.body.enamem
    ]
    db.query(sql, [data], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

router.put('/person/edit/:id', (req, res) => {
    const sql = "UPDATE addressbook.person SET `FIRST_NAME` = ?, `LAST_NAME` = ?, `EDU_LEVEL` = ? WHERE PERSON_ID = ?";
    const data = [
        req.body.fnamem,
        req.body.lnamem,
        req.body.enamem
    ]
    const id = req.params.id;
    db.query(sql, [...data, id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});


export default router;

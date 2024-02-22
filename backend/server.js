import express from 'express';
import cors from 'cors';
import addressRoute from './dB/addressRoute.js';
import addressTypeRoute from './dB/addressTypeRoute.js';
import cityRoute from './dB/cityRoute.js';
import countryRoute from './dB/countryRoute.js';
import personRoute from './dB/personRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

app.use(addressRoute);
app.use(addressTypeRoute);
app.use(cityRoute);
app.use(countryRoute);
app.use(personRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));
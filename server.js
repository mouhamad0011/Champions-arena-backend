require('dotenv').config();
const connection = require('./config/connection');
const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { initializeApp } = require('firebase/app');
const firebaseConfig = require('./config/firebase');
initializeApp(firebaseConfig);


const userRoutes = require('./routes/userRoute');
const terrainRoutes = require('./routes/terrainRoute');
const storeRoutes = require('./routes/storeRoute');
const cafeteriaRoutes = require('./routes/cafeteriaRoute');
const eventsRoutes = require('./routes/eventRoute');
const bookingsRoutes = require('./routes/bookingRoute');
 
app.use('/users', userRoutes);
app.use('/terrains', terrainRoutes);
app.use('/store', storeRoutes);
app.use('/cafeteria', cafeteriaRoutes);
app.use('/events', eventsRoutes);
app.use('/bookings', bookingsRoutes);

app.listen(process.env.PORT,()=>{
    connection.checkConnection();
    console.log(`server is running on port:${process.env.PORT}`)
})
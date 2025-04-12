const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const PgMem = require("pg-mem");
const fs = require("fs");
const db = PgMem.newDb();

const render = require("./render.js");
// Measurements database setup and access

let database = null;
const collectionName = "measurements";

async function startDatabase() {
    const uri = "mongodb://localhost:27017/?maxPoolSize=20&w=majority";
    const connection = await MongoClient.connect(uri, { useNewUrlParser: true });
    database = connection.db();
}

async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}

async function insertMeasurement(message) {
    const { insertedId } = await database.collection(collectionName).insertOne(message);
    return insertedId;
}

async function getMeasurements() {
    return await database.collection(collectionName).find({}).toArray();
}

// API Server

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('spa/static'));

const PORT = 8080;

let id_measurement = 0;

app.post('/measurement', function (req, res) {
    -       console.log("device id: " + req.body.id + "  key: " + req.body.key + "  temperature: " + req.body.t + "  humidity: " + req.body.h + "  pressure: " + req.body.p + "  temperature_dht11: " + req.body.t_dht11 + "  humidity_dht11: " + req.body.h_dht11);
    
    let now= new Date();
    let fecha = now.toLocaleString('es-AR', {timeZone: 'America/Argentina/Buenos_Aires'});
    
    const { insertedId } = insertMeasurement({ id: req.body.id, t: req.body.t, h: req.body.h, p: req.body.p, t_dht11: req.body.t_dht11, h_dht11: req.body.h_dht11, fecha: fecha});

    let data = {};
    if (fs.existsSync("data.json")) {
        const file = fs.readFileSync("data.json");
        data = JSON.parse(file);
        id_measurement++;
    }

    let new_measurement = { id: req.body.id, t: req.body.t, h: req.body.h, p: req.body.p, t_dht11: req.body.t_dht11, h_dht11: req.body.h_dht11, fecha: fecha };

    data[id_measurement] = new_measurement;
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.send("received measurement into " + insertedId);
});

app.post('/device', function (req, res) {
    console.log("device id    : " + req.body.id + " name        : " + req.body.n + " key         : " + req.body.k);
    try {
        const devices_aux = db.public.query("SELECT * FROM devices");
        const devices = devices_aux.rows;
        let flag_device_reg = false;
        for (let i = 0; i < devices.length; i++) {

            console.log(devices[i].name);
            if (req.body.n == devices[i].name) {
                flag_device_reg = true;
                break;
            }

        }

        if (flag_device_reg == false) {
            db.public.none("INSERT INTO devices VALUES ('" + req.body.id + "', '" + req.body.n + "', '" + req.body.k + "')");
            res.send("received new device");
            console.log("Nuevo dispositivo registrado");
        }
        else {
            res.send("ya registrado");
            console.log("Dispositivo ya registrado");
        }
    } catch (error) {
        console.error(error);
    }
});


app.get('/web/device', function (req, res) {
    var devices = db.public.many("SELECT * FROM devices").map(function (device) {
        console.log(device);
        return '<tr><td><a href=/web/device/' + device.device_id + '>' + device.device_id + "</a>" +
            "</td><td>" + device.name + "</td><td>" + device.key + "</td></tr>";
    }
    );
    res.send("<html>" +
        "<head><title>Sensores</title></head>" +
        "<body>" +
        "<table border=\"1\">" +
        "<tr><th>id</th><th>name</th><th>key</th></tr>" +
        devices +
        "</table>" +
        "</body>" +
        "</html>");
});

app.get('/web/device/:id', function (req, res) {
    var template = "<html>" +
        "<head><title>Sensor {{name}}</title></head>" +
        "<body>" +
        "<h1>{{ name }}</h1>" +
        "id  : {{ id }}<br/>" +
        "Key : {{ key }}" +
        "</body>" +
        "</html>";


    var device = db.public.many("SELECT * FROM devices WHERE device_id = '" + req.params.id + "'");
    console.log(device);
    res.send(render(template, { id: device[0].device_id, key: device[0].key, name: device[0].name }));
});


app.get('/term/device/:id', function (req, res) {
    var red = "\33[31m";
    var green = "\33[32m";
    var blue = "\33[33m";
    var reset = "\33[0m";
    var template = "Device name " + red + "   {{name}}" + reset + "\n" +
        "       id   " + green + "       {{ id }} " + reset + "\n" +
        "       key  " + blue + "  {{ key }}" + reset + "\n";
    var device = db.public.many("SELECT * FROM devices WHERE device_id = '" + req.params.id + "'");
    console.log(device);
    res.send(render(template, { id: device[0].device_id, key: device[0].key, name: device[0].name }));
});

app.get('/measurement', async (req, res) => {
    res.send(await getMeasurements());
});

app.get('/device', function (req, res) {
    res.send(db.public.many("SELECT * FROM devices"));
});

startDatabase().then(async () => {

    const addAdminEndpoint = require("./admin.js");
    addAdminEndpoint(app, render);

    await insertMeasurement({ id: '00', t: '18', h: '78' });
    await insertMeasurement({ id: '00', t: '19', h: '77' });
    await insertMeasurement({ id: '00', t: '17', h: '77' });
    await insertMeasurement({ id: '01', t: '17', h: '77' });
    console.log("mongo measurement database Up");

    db.public.none("CREATE TABLE devices (device_id VARCHAR, name VARCHAR, key VARCHAR)");
    db.public.none("INSERT INTO devices VALUES ('00', 'Fake Device 00', '123456')");
    db.public.none("INSERT INTO devices VALUES ('01', 'Fake Device 01', '234567')");
    db.public.none("CREATE TABLE users (user_id VARCHAR, name VARCHAR, key VARCHAR)");
    db.public.none("INSERT INTO users VALUES ('1','Ana','admin123')");
    db.public.none("INSERT INTO users VALUES ('2','Beto','user123')");

    console.log("sql device database up");


    try {

        if (fs.existsSync("data.json")) {
            const data = fs.readFileSync("data.json");
            const list_data = JSON.parse(data);
            //console.log(list_data);

            for (let index in list_data) {
                const measurenment = list_data[index];

                const id = measurenment.id;

                const t = measurenment.t;
                const h = measurenment.h;
                const t_dht11 = measurenment.t_dht11;
                const h_dht11 = measurenment.h_dht11;
                const fecha = measurenment.fecha;

                if (id == "esp32") {
                    const p = measurenment.p;
                    await insertMeasurement({ id: id, t: t, h: h, p: p, t_dht11: t_dht11, h_dht11: h_dht11, fecha: fecha });
                } else {
                    await insertMeasurement({ id: id, t: t, h: h });
                }

                //const add_device = "INSERT INTO devices (device_id, name, key) VALUES ('" + device_id + "', '" + name + "', '" + key + "')";
                // db.public.none(add_device);

                id_measurement = parseInt(index);

            }

        }

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error("El archivo 'data.json' no existe.");
        } else {
            console.error("Error al leer o parsear el JSON:", error);
        }
    }

    app.listen(PORT, () => {
        console.log(`Listening at ${PORT}`);
    });
});

const express = require("express");
const cors = require("cors");

const { users } = require(`./database/users`);

const app = express();

app.use(cors());
app.use(express.json());

const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "login sistem",
  password: "123456",
  port: 5432,
});
client.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/", async (req, res) => {
  const users = await client.query(`SELECT * from "users"`);
  res.json(users);
});

app.post("/login", async (req, res) => {
  const userLoginInfo = req.body;
  console.log(userLoginInfo);

  const userQuery = await client.query(`SELECT * from "users" where firstname='${userLoginInfo.username}'`);
  const user = userQuery.rows[0] ? userQuery.rows[0] : null



  if (user) {
    if (user.password === userLoginInfo.password) {
      res.status(201).json(user);
    } else {
      res.status(404)
        .json({ message: `Girdiğiniz kullanıcı bilgileri yanlıştır...` });
    }
  } else {
    res.status(222).json({ message: `Kullanıcı Bulunamadı...` });
  }
});

app.post("/register", async (req, res) => {
  const userLoginInfo = req.body;
  console.log(userLoginInfo);

  const userQuery = await client.query(`SELECT * from "users" where firstname='${userLoginInfo.username}'`);
  const user = userQuery.rows[0] ? userQuery.rows[0] : null

  if (user) {
    res.status(400).send('Bu kullanıcı kayıtlı')
  } else {
    await client.query(`insert into "users" (firstname, lastname, email, password) values('${userLoginInfo.firstname}', '${userLoginInfo.lastname})'`)
    res.status(204).json({ message: `Kayıt Başarılı...` });
  }
});

app.listen(3000, () => {
  console.log("3000 portunda su an server calisiyor");
});
const express = require("express");
const cors = require("cors");

const { users } = require(`./database/users`);

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const userLoginInfo = req.body;
  console.log(userLoginInfo);

  const user = users.find((u) => u.username === userLoginInfo.username);




  
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

app.listen(3000, () => {
  console.log("3000 portunda su an server calisiyor");
});
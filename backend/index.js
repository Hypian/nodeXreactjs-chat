const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
// the get or create a user from chat engine platform
  try{
const r = await axios.put(
    'https://api.chatengine.io/users/',
    {username: username, secret: username, first_name: username },
    { headers: { "Private-Key": "b038f56e-2060-484a-beba-9233e126aea5"}
    }
);
return res.status(r.status).json(r.data)
  } catch (e){
return res.status(e.response.status).json(e.response.data)
  }
});

app.listen(3001);

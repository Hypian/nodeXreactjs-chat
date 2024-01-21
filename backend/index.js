const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Make sure to import the axios library

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  // Get or create a user from the ChatEngine.io platform
  try {
    const r = await axios.put(
      'https://api.chatengine.io/users/',
      {
        username: username,
        secret: username,
        first_name: username
      },
      {
        headers: { "Private-Key": "b038f56e-2060-484a-beba-9233e126aea5" }
      }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    if (e.response && e.response.status) {
      // If response is defined and has status property
      return res.status(e.response.status).json(e.response.data);
    } else {
      // Handle other error cases
      console.error('Error:', e.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



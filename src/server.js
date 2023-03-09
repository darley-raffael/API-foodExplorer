const express = require("express");
const app = express();
const PORT = 3000;


app.use(express.json());

app.get("/", (req, res) => {
	res.send("olá mundo");
});

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});


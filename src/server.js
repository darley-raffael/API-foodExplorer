const express = require("express");
const routes = require("./routes");

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(routes);

// app.get("/welcome", (req, res) => {
// 	res.send("Bem vindo ao Restaurante");
// });

app.listen(PORT, () => {
	console.log(`Server running on port: http://localhost:${PORT}`);
});




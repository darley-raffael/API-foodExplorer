require("express-async-errors");
const express = require("express");
const sqliteConnection = require("./database/sqlite");
const routes = require("./routes");
const AppError = require("./utils/AppError");

const app = express();
sqliteConnection();


app.use(express.json());
app.use(routes);
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			status: "error",
			message: error.message
		});
	}

	console.log(error);

	return res.status(500).json({
		status: "error",
		message: "Internal Server error"
	});
});




const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running on port: http://localhost:${PORT}`);
});




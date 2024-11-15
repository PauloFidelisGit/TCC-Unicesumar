import { RequestHandler } from "express";
import { Logger } from "../../utils/logger.js";

export const manyRequestsController: RequestHandler = (req, res) => {
  Logger.warn("Many requests in a short period of time", { req });

  res.status(429).send(`
	<!DOCTYPE html>
	<html lang="pt-BR">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Muitas Requisições</title>
		<style>
			body {
				font-family: Arial, sans-serif;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100vh;
				margin: 0;
				background-color: #f8f9fa;
			}
			.container {
				text-align: center;
				padding: 20px;
				border: 1px solid #ddd;
				border-radius: 8px;
				background-color: #fff;
				box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
			}
			h1 {
				color: #dc3545;
			}
			p {
				color: #6c757d;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<h1>Ops! Houve um erro.</h1>
			<p>Você fez muitas requisições em um curto período. Por favor, tente novamente mais tarde.</p>
		</div>
	</body>
	</html>
	`);
};

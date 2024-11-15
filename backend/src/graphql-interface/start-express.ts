import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import * as fs from "node:fs";
import * as https from "node:https";
import { AddressInfo } from "node:net";
import { ENV } from "../env.js";
import { Logger } from "../utils/logger.js";
import { ResolverContext } from "./context/resolver.context.js";
import { setContext } from "./context/set-context.js";
import { delayController } from "./controllers/delay.js";
import { errorController } from "./controllers/error.controller.js";
import { manyRequestsController } from "./controllers/many-requests.controller.js";
import { notFoundController } from "./controllers/not-found.controller.js";
import { formatGraphqlError } from "./errors/format-graphql-error.js";
import { schema } from "./field-config/schema.js";
import { setUserInRequestMiddleware } from "./middlewares/set-user-in-request.middleware.js";
import { handleUnauthorizedErrorPlugin } from "./plugins/handle-401-error.plugin.js";
import { LoggerErrorPlugin } from "./plugins/logger-error.plugin.js";
import { releaseMySQLConnectionPlugin } from "./plugins/release-connection.plugin.js";

Logger.info(`Starting express server`);

const app = express();

const sslOptions: https.ServerOptions = {
	key: fs.readFileSync("src/graphql-interface/ssl/aeonsistemas.local-key.pem"),
	cert: fs.readFileSync("src/graphql-interface/ssl/aeonsistemas.local.pem"),
};

const httpsServer = https.createServer(sslOptions, app);

export const apolloServer = new ApolloServer<ResolverContext>({
	schema,
	plugins: [
		releaseMySQLConnectionPlugin(),
		ApolloServerPluginDrainHttpServer({ httpServer: httpsServer }),
		handleUnauthorizedErrorPlugin(),
		ENV.NODE_ENV === "production"
			? ApolloServerPluginLandingPageDisabled()
			: ApolloServerPluginLandingPageLocalDefault(),
		LoggerErrorPlugin(),
	],
	includeStacktraceInErrorResponses: true,
	formatError: formatGraphqlError,
});

await apolloServer.start();

app.use(delayController);

app.use(
	rateLimit({
		windowMs: 60000 * 15,
		limit: 200,
		standardHeaders: "draft-7",
		legacyHeaders: false,
		handler: manyRequestsController,
	}),
);

app.use(
	"/graphql",
	cors(),
	express.json(),
	setUserInRequestMiddleware,
	expressMiddleware(apolloServer, {
		context: setContext,
	}),
);

app.use("*", notFoundController);

app.use(errorController);

await new Promise<void>((resolve) => {
	httpsServer.listen(4000, ENV.BACKEND_HOST, () => {
		const { address, port } = httpsServer.address() as AddressInfo;
		Logger.info(`Servidor online: https://${address}:${port}/graphql`);
		resolve();
	});
});

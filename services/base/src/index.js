const { Logger, LogLevel } = require("./logger");
const { createServer } = require("./api");

async function main() {
  const configFilePath = "./config.json";
  const config = require(configFilePath);

  const logger = new Logger(
    LogLevel.fromString(config.logLevel) || LogLevel.info
  );

  logger.info("configuration", `read configuration from "${configFilePath}"`);
  logger.info(
    "configuration",
    `log level was set to "${logger.logLevel.name}"`
  );

  const app = createServer(config.api.port, config.api.hostname, logger);

  return app;
}

main();

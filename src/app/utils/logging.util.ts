import winston, { transports } from "winston";
import path from "path";
const logger = winston.createLogger({
  level: "info",
  format: winston.format.printf((info) => {
    let message = `${new Date().toLocaleString()} |  ${info.level.toUpperCase()} | ${
      info.message
    } | `;
    message = info.obj
      ? message + `data ${JSON.stringify(info.obj)} | `
      : message;
    return message;
  }),
  transports: [
    new transports.File({
      filename: path.join(__dirname, "../../../logs", "logfile.log"),
    }),
    new transports.File({
      level: "error",
      filename: path.join(__dirname, "../../../logs", "errlogfile.log"),
    }),
  ],
});
const info = async (message: string, obj: any = null) => {
  logger.log("info", message, { obj });
};
const error = async (message: string, obj: any = null) => {
  logger.log("error", message, { obj });
};
export { info, error };

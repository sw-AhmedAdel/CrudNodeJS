// import { NextFunction, Request, Response } from "express";
// import { createLogger, level, transports } from "winston";
// import path from "path";
// import expressWinston from "express-winston";
// const logger = createLogger({
//   level: "info",
//   transports: [
//     new transports.File({
//       filename: path.join(__dirname, "../../../logs", "logfile.log"),
//     }),
//     new transports.File({
//       level: "error",
//       filename: path.join(__dirname, "../../../logs", "errlogfile.log"),
//     }),
//   ],
// });

// const loggingMw = (level: string) =>
//   expressWinston.logger({
//     level,
//     winstonInstance: logger,
//     meta: false,
//     msg: (req: Request, res: Response) => {
//       const msg = `protocol : ${req.protocol} ,
//       method : ${req.method},
//       url : ${req.originalUrl},
//       statusCode : ${res.statusCode},
//       date : ${new Date().toISOString()}
//       message : ${res.locals.message},
//       result    : ${res.locals.result}`;
//       return msg;
//     },
//   });

// export default loggingMw;

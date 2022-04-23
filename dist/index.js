var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { promises as fs } from "fs";
import fetch from "node-fetch";
class ConsoleLogger {
    constructor() {
        this.log = (message) => __awaiter(this, void 0, void 0, function* () {
            console.log(message);
        });
    }
}
class FileLogger {
    constructor(fileName) {
        this.log = (message) => __awaiter(this, void 0, void 0, function* () {
            yield fs.writeFile(this.fileName, message, { flag: "wx" });
        });
        this.fileName = fileName;
    }
}
class ServerLogger {
    constructor(url) {
        this.log = (message) => __awaiter(this, void 0, void 0, function* () {
            const json = { message };
            const body = JSON.stringify(json);
            yield fetch(this.url, {
                method: "POST",
                body
            });
        });
        this.url = url;
    }
}
class FinalLogger {
    constructor() {
        this.loggers = [new ConsoleLogger(), new FileLogger("file.txt"), new ServerLogger("http://bohemian.local:1337")];
        this.log = (message) => __awaiter(this, void 0, void 0, function* () {
            for (const logger of this.loggers) {
                logger.log(message);
            }
        });
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const finalLogger = new FinalLogger();
        yield finalLogger.log("ddd");
    });
}
main();

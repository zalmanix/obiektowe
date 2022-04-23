import { promises as fs } from "fs"
import fetch from "node-fetch"

interface Logger {
	log(message: string): Promise<void>
}

class ConsoleLogger implements Logger {
	log = async (message: string): Promise<void> => {
		console.log(message)
	}
}

class FileLogger implements Logger {
	fileName: string

	constructor(fileName: string) {
		this.fileName = fileName
	}

	log = async (message: string): Promise<void> => {
		await fs.writeFile(this.fileName, message, { flag: "wx" })
	}
}

class ServerLogger implements Logger {
	url: string

	constructor(url: string) {
		this.url = url
	}

	log = async (message: string): Promise<void> => {
		const json = { message }
		const body = JSON.stringify(json)
		await fetch(this.url, {
			method: "POST",
			body
		})
	}
}

class FinalLogger {
	private loggers: Logger[] = [new ConsoleLogger(), new FileLogger("file.txt"), new ServerLogger("http://bohemian.local:1337")]

	log = async (message: string): Promise<void> => {
		for (const logger of this.loggers) {
			logger.log(message)
		}
	}
}

async function main() {
	const finalLogger = new FinalLogger()
	await finalLogger.log("ddd")
}

main()

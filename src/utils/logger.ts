import {getEnv} from "./env";

const TraceEnabled: boolean = getEnv("TRACE_ENABLED", "false") === "true";
const DebugEnabled: boolean = getEnv("DEBUG_ENABLED", "false") === "true";
const InfoEnabled: boolean = getEnv("INFO_ENABLED", "false") === "true";
const WarnEnabled: boolean = getEnv("WARN_ENABLED", "true") === "true";
const ErrorEnabled: boolean = getEnv("ERROR_ENABLED", "true") === "true";
const FatalEnabled: boolean = getEnv("FATAL_ENABLED", "true") === "true";

type LoggerFn = (message: string) => void;
const disabledLogger: LoggerFn = (message: string) => {};

export namespace log {
	export const trace: LoggerFn = TraceEnabled
		? (message: string) => console.log(`Trace: ${message}`)
		: disabledLogger;

	export const debug: LoggerFn = DebugEnabled
		? (message: string) => console.log(`Debug: ${message}`)
		: disabledLogger;

	export const info: LoggerFn = InfoEnabled
		? (message: string) => console.log(`Info: ${message}`)
		: disabledLogger;

	export const warn: LoggerFn = WarnEnabled
		? (message: string) => console.error(`Warn: ${message}`)
		: disabledLogger;

	export const error: LoggerFn = ErrorEnabled
		? (message: string) => console.error(`Error: ${message}`)
		: disabledLogger;

	export const fatal: LoggerFn = FatalEnabled
		? (message: string) => console.error(`Fatal: ${message}`)
		: disabledLogger;
}

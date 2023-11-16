import "dotenv/config";

export function getEnv(varName: string, alt: string = null): string {
	if (process.env[varName]) {
		return process.env[varName];
	} else if (alt) {
		return alt;
	} else {
		throw new Error(`Environment variable ${varName} is not defined.`);
	}
}

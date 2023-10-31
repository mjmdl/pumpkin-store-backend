import "dotenv/config";

export default function envVar(
	varName: string,
	optional = false
): string | null {
	if (!optional && !process.env[varName]) {
		throw new Error(`Could not find environment variable '${varName}'.`);
	} else {
		return process.env[varName] ?? null;
	}
}

export function generateValidEmail(): string {
	const randomInt = Math.floor(Math.random() * 1_000_000) + 1;
	return `user${randomInt}@email.com`;
}

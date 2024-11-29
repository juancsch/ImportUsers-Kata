export type User = ReturnType<typeof newUser>

export function newUser (data: string[]) {
	return {
		id: data[0],
		gender: data[1],
		name: data[2],
		country: data[3],
		postcode: data[4],
		email: data[5],
		birthdate: data[6]
	}
}

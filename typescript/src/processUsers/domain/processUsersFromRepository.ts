import path from 'path'
import { fileURLToPath } from 'url'
import { type User, newUser } from './User.js'

export type UserRepository = (filename: string, encoding: string) => Promise<string>

export async function processUsersFromRepository (userRepository: UserRepository) {
	const filename = fileURLToPath(import.meta.url)
	const getcurrentworkingDirectory = path.dirname(filename)

	// fields: ID, gender, Name ,country, postcode, email, Birthdate
	const q = (await userRepository(
		getcurrentworkingDirectory + '/../../../../users.csv', 'utf8'
	)).split('\n')

	const csvProvider: User[] = []
	for (let h = 1; h < q.length; h++) {
		if (q[h] === '') continue
		csvProvider.push(newUser(q[h].split(',')))
	}

	return csvProvider
}

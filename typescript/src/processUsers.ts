/* eslint-disable @typescript-eslint/no-magic-numbers */
import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

export async function processUsers (log = console.log): Promise<void> {
	const usersFromCSV = await processUsersCSV(readFile)
	const usersFromAPI = await processUsersAPI(fetch)
	const users = usersFromCSV.concat(usersFromAPI)
	printUsers(users, log)
}

async function processUsersCSV (readFileCSV: typeof readFile) {
	const filename = fileURLToPath(import.meta.url)
	const getcurrentworkingDirectory = path.dirname(filename)

	// fields: ID, gender, Name ,country, postcode, email, Birthdate
	const q = (await readFileCSV(
		getcurrentworkingDirectory + '/../../users.csv', 'utf8'
	)).split('\n')

	const csvProvider: User[] = []
	for (let h = 1; h < q.length; h++) {
		if (q[h] === '') continue
		csvProvider.push(newUser(q[h].split(',')))
	}

	return csvProvider
}

async function processUsersAPI (fetchAPI: typeof fetch) {
	/** This kata uses "fetch()", be aware you need at least Node 18 to run the script */
	const USER_URL = 'https://randomuser.me/api/?inc=gender,name,email,location&results=5&seed=a9b25cd955e2037h'

	const response = await (await fetchAPI(USER_URL)).json() as { results: Array<{ gender: string, name: { first: string, last: string }, location: { country: string, postcode: string }, email: string } > }
	const webProvider = response.results // eslint-disable-line @typescript-eslint/prefer-destructuring

	const b: User[] = []
	let i = 100000000000
	for (let j = 0; j < webProvider.length; j++) {
		i++
		if (webProvider[j] instanceof Object) {
			b.push(newUser([
				i.toString(), // id
				webProvider[j].gender,
				webProvider[j].name.first + ' ' + webProvider[j].name.last,
				webProvider[j].location.country,
				webProvider[j].location.postcode,
				webProvider[j].email,
				new Date().getFullYear().toString() // birhtday
			]))
		}
	}
	return b
}

function printUsers (users: User[], log: typeof console.log) {
	log('*********************************************************************************')
	log('* ID\t\t* COUNTRY\t* NAME\t\t* EMAIL\t\t\t\t*')
	log('*********************************************************************************')
	for (let j = 0; j < users.length; j++) {
		log(`* ${users[j].id}\t* ${users[j].country}\t* ${users[j].name}\t* ${users[j].email}\t*`)
	}
	log('*********************************************************************************')
	log(users.length + ' users in total!')
}

type User = ReturnType<typeof newUser>
function newUser (data: string[]) {
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

/* eslint-disable @typescript-eslint/no-magic-numbers */
import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

export async function processUsers (log = console.log): Promise<void> {

	// Parse CSV file
	const csvProvider: string[][] = await processUsersCSV(readFile)

	// Parse URL content
	const b: string[][] = await processUsersAPI(fetch)

	/**
	 * Shape: providers array[ id -> number,
	 *                   email -> string
	 *                   first_name -> string
	 *                   last_name -> string ]
	 */
	const providers = csvProvider.concat(b) // merge arrays

	// Print users
	printUsers(providers, log)
}

async function processUsersCSV (readFileCSV: typeof readFile) {
	const filename = fileURLToPath(import.meta.url)
	const getcurrentworkingDirectory = path.dirname(filename)

	// fields: ID, gender, Name ,country, postcode, email, Birthdate
	const q = (await readFileCSV(
		getcurrentworkingDirectory + '/../../users.csv', 'utf8'
	)).split('\n')

	const csvProvider: string[][] = []
	for (let h = 0; h < q.length; h++) {
		if (q[h] === '') continue
		csvProvider.push(q[h].split(','))
	}

	const csvProviders: string[][] = []
	csvProviders.forEach((a) => {
		a.concat(csvProvider[0])
	})
	csvProvider.shift() // Remove header column
	return csvProvider
}

async function processUsersAPI (fetchAPI: typeof fetch) {
	/** This kata uses "fetch()", be aware you need at least Node 18 to run the script */
	const USER_URL = 'https://randomuser.me/api/?inc=gender,name,email,location&results=5&seed=a9b25cd955e2037h'

	const response = await (await fetchAPI(USER_URL)).json() as { results: Array<{ gender: string, name: { first: string, last: string }, location: { country: string, postcode: string }, email: string } > }
	const webProvider = response.results // eslint-disable-line @typescript-eslint/prefer-destructuring

	const b: string[][] = []
	let i = 100000000000
	for (let j = 0; j < webProvider.length; j++) {
		i++
		if (webProvider[j] instanceof Object) {
			b.push([
				i.toString(), // id
				webProvider[j].gender,
				webProvider[j].name.first + ' ' + webProvider[j].name.last,
				webProvider[j].location.country,
				webProvider[j].location.postcode,
				webProvider[j].email,
				new Date().getFullYear().toString() // birhtday
			])
		}
	}
	return b
}

function printUsers (providers: string[][], log: typeof console.log) {
	log('*********************************************************************************')
	log('* ID\t\t* COUNTRY\t* NAME\t\t* EMAIL\t\t\t\t*')
	log('*********************************************************************************')
	for (let j = 0; j < providers.length; j++) {
		log(`* ${providers[j][0]}\t* ${providers[j][3]}\t* ${providers[j][2]}\t* ${providers[j][5]}\t*`)
	}
	log('*********************************************************************************')
	log(providers.length + ' users in total!')
}

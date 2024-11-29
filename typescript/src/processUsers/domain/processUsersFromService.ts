import { type User, newUser } from './User.js'

export type UserService = (url: string) => Promise<{ json: () => Promise<unknown> }>

export async function processUsersFromService (fetchAPI: UserService) {
	/** This kata uses "fetch()", be aware you need at least Node 18 to run the script */
	const USER_URL = 'https://randomuser.me/api/?inc=gender,name,email,location&results=5&seed=a9b25cd955e2037h'

	const response = await (await fetchAPI(USER_URL)).json() as { results: Array<{ gender: string, name: { first: string, last: string }, location: { country: string, postcode: string }, email: string } > }
	const webProvider = response.results

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

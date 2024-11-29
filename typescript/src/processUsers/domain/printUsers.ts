import type { User } from './User.js'

export type Log = (...message: string[]) => void

export function printUsers (users: User[], log: Log) {
	log('*********************************************************************************')
	log('* ID\t\t* COUNTRY\t* NAME\t\t* EMAIL\t\t\t\t*')
	log('*********************************************************************************')
	for (let j = 0; j < users.length; j++) {
		log(`* ${users[j].id}\t* ${users[j].country}\t* ${users[j].name}\t* ${users[j].email}\t*`)
	}
	log('*********************************************************************************')
	log(users.length + ' users in total!')
}

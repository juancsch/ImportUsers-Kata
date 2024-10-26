/* eslint-disable @typescript-eslint/no-magic-numbers */
import assert from 'node:assert'
import { describe, test } from 'node:test'

import { processUsers } from '../src/main.js'

void describe('Import User Kata', () => {

	void test('should run process users', async () => {
		// Given
		const logs: string[] = []
		const logSpy = (msg: string) => {
			logs.push(msg)
		}

		// When
		await processUsers(logSpy)

		// Then
		assert.strictEqual(logs[0], '*********************************************************************************')
		assert.strictEqual(logs[1], '* ID		* COUNTRY	* NAME		* EMAIL				*')
		assert.strictEqual(logs[2], '*********************************************************************************')
		assert.strictEqual(logs[3], '* 200189617246	* Germany	* Lukas Schmidt	* lukas.shmidt@example.com	*')
		assert.strictEqual(logs[4], '* 200189016257	* Germany	* Maria Fischer	* maria.fischer@example.com	*')
		assert.strictEqual(logs[5], '* 230573109005	* Spain 	* Luis Sanchez	* luis.sanchez@example.com	*')
		assert.strictEqual(logs[6], '* 230854119034	* Italy 	* Elio Pausini	* elio.pausini@example.com	*')
		assert.strictEqual(logs[7], '* 270054311737	* India 	* Mitesh Kumari	* mitesh.kumari@example.com	*')
		assert.strictEqual(logs[8], '* 202160712259	* Germany	* Elena Mueller	* elena.muller@example.com	*')
		assert.strictEqual(logs[9], '* 270554319031	* India 	* Natasha Shah	* natasha.shah@example.com	*')
		assert.strictEqual(logs[10], '* 100000000001	* Australia	* Nevaeh Dunn	* nevaeh.dunn@example.com	*')
		assert.strictEqual(logs[11], '* 100000000002	* Norway	* Sara Abdallah	* sara.abdallah@example.com	*')
		assert.strictEqual(logs[12], '* 100000000003	* France	* Melvin Perrin	* melvin.perrin@example.com	*')
		assert.strictEqual(logs[13], '* 100000000004	* Australia	* Dawn Snyder	* dawn.snyder@example.com	*')
		assert.strictEqual(logs[14], '* 100000000005	* Netherlands	* Irina Kaptein	* irina.kaptein@example.com	*')
		assert.strictEqual(logs[15], '*********************************************************************************')
		assert.strictEqual(logs[16], '12 users in total!')

	})
})

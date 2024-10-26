/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import eslintLove from 'eslint-config-love'

export default [
	{ files: ['**/*.ts'] },
	eslint.configs.recommended,
	stylistic.configs.customize({
		semi: false,
		indent: 'tab',
		quotes: 'single',
		commaDangle: 'never',
		braceStyle: '1tbs',
		jsx: false
	}),
	{ ...eslintLove },
	{
		languageOptions: {
			globals: {
				console: true
			}
		},
		rules: {
			// eslint base rules
			'@stylistic/padded-blocks': 'off', // ['error', 'always'],
			'@stylistic/space-before-function-paren': ['error', 'always'],
			// typescript rules
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			'@typescript-eslint/no-magic-numbers': ['error', { ignore: [0, 1] }]
			// '@typescript-eslint/explicit-module-boundary-types': ['error']
		}
	}
]

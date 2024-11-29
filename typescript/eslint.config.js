import eslint from '@eslint/js'
import eslintStylistic from '@stylistic/eslint-plugin'
import eslintTypescript from 'typescript-eslint'

export default [
	{
		files: ['**/*.ts'],
		ignores: ['node_modules/**/*', 'lib/**/*']
	},
	eslint.configs.recommended,
	eslintStylistic.configs.customize({
		semi: false,
		indent: 'tab',
		quotes: 'single',
		commaDangle: 'never',
		braceStyle: '1tbs'
	}),
	...eslintTypescript.config(
		eslintTypescript.configs.strictTypeChecked,
		eslintTypescript.configs.stylisticTypeChecked
	),
	{
		languageOptions: {
			globals: {
				console: true,
				fetch: true,
				BufferEncoding: true
			},
			parserOptions: {
				// ecmaVersion: 'latest',
				// sourceType: 'module',
				project: './tsconfig.json'
			}
		},
		rules: {
			// eslint base rules
			'@stylistic/padded-blocks': 'off', // ['error', 'always'],
			'@stylistic/space-before-function-paren': ['error', 'always'],
			// typescript rules
			'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			'@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
			'@typescript-eslint/restrict-template-expressions': ['error', { allowNullish: true }],
			'@typescript-eslint/prefer-for-of': 'off',
			'@typescript-eslint/restrict-plus-operands': 'off'
		}
	}
]

module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		'@typescript-eslint/no-explicit-any': 'off',
		'linebreak-style': 'off',
	},
	overrides: [
		{
			rules: {
				'max-len': ['error', { code: 160, comments: 170, ignoreRegExpLiterals: true }],
				'no-console': 'off',
				'import/order': 'off',
				'consistent-return': 'off',
				'object-curly-newline': 'off',
				'object-curly-spacing': 'off',
				'object-property-newline': 'off',
				'import/prefer-default-export': 'off',
				'@typescript-eslint/comma-dangle': 'off',
				'@typescript-eslint/no-unused-vars': 'off',
				'@typescript-eslint/default-param-last': 'off',
				'@typescript-eslint/object-curly-newline': 'off',
				'@typescript-eslint/no-use-before-define': 'off',
				'@typescript-eslint/object-curly-spacing': ['error', 'always', { objectsInObjects: true }],
				'prettier/prettier': 'off',
			},
		},
	],
};

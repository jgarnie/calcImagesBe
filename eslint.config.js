const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const compat = require('eslint-plugin-compat');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const globals = require('globals');

module.exports = [
	// Needs to be in its own object (⌐■_■)
	{
		ignores: [
			'**/node_modules/**',
			'**/dist/**',
			'/integrator/dist/**.js',
			'**/build/**',
			'**/*.config.js',
			'**/*.config.ts',
			'**/coverage/**',
			'**/.sst/**',
			'**/.next/**',
			'**/.open-next/**'
		]
	},
	{
		files: ['**/**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2018,
			sourceType: 'module',
			parser: require('@typescript-eslint/parser'),
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			},
			globals: {
				...globals.browser
			}
		},
		settings: {
			react: {
				version: 'detect'
			}
		},
		plugins: {
			'@typescript-eslint': typescriptEslint,
			react: react,
			'react-hooks': reactHooks,
			compat: compat
		},
		rules: {
			...react.configs.recommended.rules,
			...compat.configs.recommended.rules,
			...typescriptEslint.configs['recommended'].rules,
			...reactHooks.configs.recommended.rules,
			'no-console': [
				// TODO: switch back to error but use info wrapper at utils/error to handle request
				'warn',
				{
					allow: ['warn', 'error', 'info']
				}
			],
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'react/no-find-dom-node': 'warn',
			'react/display-name': 'warn',
			'@typescript-eslint/ban-ts-comment': 'warn',
			// TODO: Adjust rule to error in future,
			'@typescript-eslint/triple-slash-reference': 'warn',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-require-imports': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					varsIgnorePattern: '^_',
					argsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			],
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/no-use-before-define': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off'
		}
	}
];

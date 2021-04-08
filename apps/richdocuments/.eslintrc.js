module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		node: true,
		jest: true
	},
	globals: {
		t: true,
		n: true,
		OC: true,
		OCA: true,
		OCP: true,
		'$': true,
		'_': true,
		Vue: true,
		VueRouter: true
	},
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 6
	},
	extends: [
		'eslint:recommended',
		'plugin:node/recommended',
		'plugin:vue/essential',
		'plugin:vue/recommended',
		'standard'
	],
	plugins: ['vue', 'node'],
	rules: {
		// TODO: remove when all fixed
		'no-unused-vars': 'warn',
		'no-mixed-operators': 'warn',
		'camelcase': 'warn',
		'no-global-assign': 'warn',

		// space before function ()
		'space-before-function-paren': ['error', 'never'],
		// curly braces always space
		'object-curly-spacing': ['error', 'always'],
		// stay consistent with array brackets
		'array-bracket-newline': ['error', 'consistent'],
		// 1tbs brace style
		'brace-style': 'error',
		// tabs only
		indent: ['error', 'tab'],
		'no-tabs': 0,
		'vue/html-indent': ['error', 'tab'],
		// only debug console
		'no-console': ['error', { allow: ['error', 'warn', 'debug'] }],
		// classes blocks
		'padded-blocks': ['error', { classes: 'always' }],
		// always have the operator in front
		'operator-linebreak': ['error', 'before'],
		// ternary on multiline
		'multiline-ternary': ['error', 'always-multiline'],
		// es6 import/export and require
		'node/no-unpublished-require': ['off'],
		'node/no-unsupported-features/es-syntax': ['off'],
		'node/no-missing-import': ['error', {
			'tryExtensions': ['.js', '.json', '.tsx', '.vue']
		}],
		// kebab case components for vuejs
		'vue/component-name-in-template-casing': ['error', 'kebab-case'],
		// space before self-closing elements
		'vue/html-closing-bracket-spacing': 'error',
		// newline before closing bracket
		'vue/html-closing-bracket-newline': ["error", {
			"singleline": "never",
			"multiline": "never"
		}],
		// code spacing with attributes
		'vue/max-attributes-per-line': [
			'error',
			{
				singleline: 3,
				multiline: {
					max: 3,
					allowFirstLine: true
				}
			}
		]
	}
}

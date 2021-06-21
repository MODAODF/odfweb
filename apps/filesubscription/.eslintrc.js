module.exports = {
    globals: {
		t: true,
		n: true,
		OC: true,
		OCA: true,
		OCP: true,
		'$': true,
		'_': true,
		__webpack_nonce__: true,
		__webpack_public_path__: true,
		moment: true,
		escapeHTML: true,
		oc_userconfig: true,
		dayNames: true,
		firstDay: true
	},
    extends: [
        '@nextcloud'
    ],
    rules: {
		'no-unreachable': process.env.NODE_ENV === 'production' ? 'error': 'off',
		'no-console': ['error', { allow: ['error', 'warn', 'debug'] }],
		'no-tabs': 0,
		'dot-notation': 'off',
        'eqeqeq': 'off'
	}
};

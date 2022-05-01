const config = {
	verbose: true,
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
	}
}

module.exports = config

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	mount: {
		public: { url: '/', static: true },
		src: { url: '/dist' }
	},
	plugins: [
		'@snowpack/plugin-react-refresh',
		'@snowpack/plugin-dotenv',
		'@snowpack/plugin-typescript'
	],
	routes: [],
	optimize: {},
	packageOptions: {},
	devOptions: {},
	buildOptions: {
		baseUrl: '/shortcuts'
	},
	alias: { '@app': './src' }
};

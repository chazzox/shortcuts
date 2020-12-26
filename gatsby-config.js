const path = require('path');

module.exports = {
	pathPrefix: `/shortcuts`,
	plugins: [
		// typescript compatibility
		`gatsby-plugin-typescript`,
		// gives us theming ability
		`gatsby-plugin-react-helmet`,
		// sass compatibility
		`gatsby-plugin-sass`,
		// this plugin means that we don't have to use ../../../ and so on
		{
			resolve: 'gatsby-plugin-root-import',
			options: {
				src: path.join(__dirname, 'src'),
				components: path.join(__dirname, 'src/components'),
				reduxStore: path.join(__dirname, 'src/reduxStore'),
				stylesheets: path.join(__dirname, 'src/stylesheets'),
				routes: path.join(__dirname, 'src/routes'),
				assets: path.join(__dirname, 'src/assets'),
				utils: path.join(__dirname, 'src/utils'),
				pages: path.join(__dirname, 'src/pages')
			}
		},
		// means we can import svg's as component
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: /svgs/
				}
			}
		}
	]
};

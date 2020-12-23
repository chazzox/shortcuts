const path = require('path');

module.exports = {
	plugins: [
		`gatsby-plugin-typescript`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				display: `standalone`
			}
		},
		// this plugin means that we don't have to use ../../../ and so on
		{
			resolve: 'gatsby-plugin-root-import',
			options: {
				src: path.join(__dirname, 'src'),
				components: path.join(__dirname, 'src/components'),
				reduxStore: path.join(__dirname, 'src/reduxStore'),
				stylesheets: path.join(__dirname, 'src/stylesheets'),
				routes: path.join(__dirname, 'src/routes'),
				assets: path.join(__dirname, 'src/assets')
			}
		}
	]
};

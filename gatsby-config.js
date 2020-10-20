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

				display: `standalone`,
				icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
			}
		}
	]
};

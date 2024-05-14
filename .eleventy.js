const CleanCSS = require("clean-css");
const faviconPlugin = require("eleventy-favicon");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");

/* Nav */
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor');

const mdOptions = {
	html: true,
	breaks: true,
	linkify: true,
	typographer: true
}
const mdAnchorOpts = {
	permalink: false,
	permalinkClass: 'anchor-link',
	permalinkSymbol: '#',
	level: [1, 2, 3, 4]
}

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyRenderPlugin);
	eleventyConfig.addPassthroughCopy("assets");

	/* CSS minifier as per https://www.11ty.dev/docs/quicktips/inline-css/ */
	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

	eleventyConfig.setLibrary(
		'md',
		markdownIt(mdOptions)
			.use(markdownItAnchor, mdAnchorOpts)
	);
	
	/* Reload on CSS changes, since 11ty doesn't see them */
	eleventyConfig.addWatchTarget("style");
	eleventyConfig.addWatchTarget("assets");

	/* HTML minifier */
	eleventyConfig.addPlugin(eleventyPluginFilesMinifier);

	/* SVG -> All Favicon variants packer */
	eleventyConfig.addPlugin(faviconPlugin);
};
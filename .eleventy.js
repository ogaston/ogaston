// const pluginRss = require("@11ty/eleventy-plugin-rss"); // optional
const readingTime = require("reading-time");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    // Passthrough assets
    eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

    // Filters
    eleventyConfig.addFilter("readableDate", (dateObj, fmt = "LLL dd, yyyy") =>
        DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(fmt)
    );
    eleventyConfig.addFilter("readingTime", content =>
        Math.max(1, Math.round(readingTime(content).minutes)) + " min read"
    );
    eleventyConfig.addFilter("head", (arr, n) => arr.slice(0, n));

    // Collections
    eleventyConfig.addCollection("posts", (collection) =>
        collection.getFilteredByGlob("src/blog/**/*.md")
            .filter(p => !p.data.draft)
            .sort((a, b) => b.date - a.date)
    );

    // Watch targets (if you build Tailwind)
    eleventyConfig.addWatchTarget("./src/assets/css/");

    // Optional: RSS
    // eleventyConfig.addPlugin(pluginRss);

    return {
        dir: { input: "src", output: "dist", includes: "_includes", data: "_data" },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        templateFormats: ["md", "njk"]
    };
};

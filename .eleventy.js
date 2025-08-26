// const pluginRss = require("@11ty/eleventy-plugin-rss"); // optional
const readingTime = require("reading-time");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

    eleventyConfig.addGlobalData("isProd", process.env.ELEVENTY_ENV === "production" || process.env.NODE_ENV === "production");

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
    eleventyConfig.addFilter("truncate", (str, length = 100) =>
        str.length > length ? str.substring(0, length) + "…" : str
    );
    eleventyConfig.addFilter("date", (dateObj, format) => {
        if (format === "c") {
            return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
        }
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
    });
    eleventyConfig.addFilter("striptags", str => str ? str.replace(/<[^>]*>/g, "") : "");
    eleventyConfig.addFilter("wordcount", str => str ? str.split(/\s+/).length : 0);

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
        dir: { input: "src", output: "dist", includes: "_includes", data: "_data", exclude: ["assets"] },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        templateFormats: ["md", "njk"]
    };
};

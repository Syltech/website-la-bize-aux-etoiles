const yaml = require("js-yaml");
const moment = require("moment");
moment.locale("fr");
moment;

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml", (contents) => {
    return yaml.load(contents);
  });
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addHandlebarsShortcode("sortAndFilterByDate", (a) => {
    const now = new Date();
    return a
      .sort((a, b) => {
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);
        return date1 - date2;
      })
      .filter((a) => a.date - now > 0)
      .map((a) => ({
        ...a,
        formattedDate: {
          weekDay: moment.utc(a.date).format("dddd"),
          day: moment.utc(a.date).format("DD"),
          month: moment.utc(a.date).format("MMMM"),
          year: moment.utc(a.date).format("YYYY"),
        },
      }));
  });
  eleventyConfig.addHandlebarsShortcode("linkMaps", (payload) => {
    const gjson = JSON.parse(payload);
    return `http://maps.apple.com/?q=${gjson.coordinates[1]},${gjson.coordinates[0]}`;
  });

  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};

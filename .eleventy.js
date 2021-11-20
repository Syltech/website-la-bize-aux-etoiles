module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("css");

  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};

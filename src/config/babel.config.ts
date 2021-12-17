/*
 * @author: Archy
 * @Date: 2021-12-14 10:27:13
 * @LastEditors: Archy
 * @LastEditTime: 2021-12-17 16:07:58
 * @FilePath: \ink-cli\src\config\babel.config.ts
 * @description:
 */

module.exports = (api: any) => {
  if (api) api.cache.never();
  const isCommonJS = process.env.COMPILE_TARGET === "commonjs";
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          modules: isCommonJS ? "commonjs" : false,
        },
      ],
      require.resolve("@babel/preset-typescript"),
    ],
  };
};

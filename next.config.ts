import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    const rules = config.module.rules
      // @ts-ignore
      .find((rule) => typeof rule.oneOf === 'object').oneOf.filter((rule) => Array.isArray(rule.use));
    // @ts-ignore
    rules.forEach((rule) => {
      // @ts-ignore
      rule.use.forEach((moduleLoader) => {
        if (
          moduleLoader.loader !== undefined
          && moduleLoader.loader.includes('css-loader')
          && typeof moduleLoader.options.modules === 'object'
        ) {
          moduleLoader.options = {
            ...moduleLoader.options,
            modules: {
              ...moduleLoader.options.modules,
              // This is where we allow camelCase class names
              exportLocalsConvention: "dashes"
            }
          };
        }
      });
    });

    return config;
  }
};

export default nextConfig;

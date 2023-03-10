module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images2.imgbox.com', 'i.imgur.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

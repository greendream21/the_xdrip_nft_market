module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.io","dweb.link","ipfs.nftstorage.link"],
    formats: ["image/webp"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "videos/",
          publicPath: "/videos",
          
        },
      },
    });
    return config;
  },
};
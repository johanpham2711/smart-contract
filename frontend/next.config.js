const nextConfig = {
  compiler: {
    styledComponents: true
  },
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/] // wp5
      },
      use: ['@svgr/webpack']
    })
    return config
  }
}

module.exports = nextConfig

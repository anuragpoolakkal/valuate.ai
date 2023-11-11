const nextConfig = {
    images: {
        domains: ["images.unsplash.com"]
    }
}

module.exports = {
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        
        return config;
     },
    ...nextConfig
     
}

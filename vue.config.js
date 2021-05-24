module.exports = {
    devServer: {
        proxy: {
            '^/api/v1': {
                target: 'https://testnet.bitmex.com/',
                ws: true,
                changeOrigin: true
            },
        }
    }
}
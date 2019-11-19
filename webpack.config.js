module.exports = {
    "entry": {
        "react": "./src/index.js"
    },
    "output": {
        "path": __dirname,
        "publicPath": "/",
        "filename": "[name]Bundle.js"
    },
    "resolve": {
        "modules": [ "src", "node_modules" ],
        "extensions": [ ".js" ]
    },
    "module": {
        "loaders": [
            {
                "test": /\.js$/,
                "loader": "babel-loader",
                "exclude": /node_modules/
            },
            {
                "test": /\.jsx$/,
                "loader": "babel-loader",
                "exclude": /node_modules/
            },
            {
                "test": /\.scss$/,
                "use": [
                    {
                        "loader": "style-loader"
                    },
                    {
                        "loader": "css-loader"
                    },
                    {
                        "loader": "sass-loader"
                    }
                ]
            }
        ]
    },
    "devServer": {
        "historyApiFallback": true,
        "contentBase": "./"
    }
};

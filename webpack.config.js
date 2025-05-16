const path = require("path"); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: { main: "./src/scripts/index.js" },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.[hash].js",
        publicPath: "",
    },
    mode: "development", // добавили режим разработчика

    devServer: {
        static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

        open: true, // сайт будет открываться сам при запуске npm run dev
    },
    module: {
        rules: [
            // rules — это массив правил
            // добавим в него объект правил для бабеля
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        configFile: "./babel.config.js", // Явно указываем конфиг
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: "asset/resource",
                generator: {
                    filename: "images/[name].[hash][ext]",
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name].[hash][ext]",
                },
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { importLoaders: 1 },
                    },
                    "postcss-loader",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
    ],
};

module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    edge: "17",
                    ie: "11",
                    firefox: "50",
                    chrome: "64",
                    safari: "11.1",
                },
                useBuiltIns: "usage", // Важно: меняем с "entry" на "usage"
                corejs: "3.29",
                modules: "auto", // Добавляем эту строку
            },
        ],
    ],
    sourceType: "unambiguous", // Критически важно!
};

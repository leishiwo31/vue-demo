const path         = require("path");
const DllPlugin    = require("webpack/lib/DllPlugin");
module.exports = {
    entry: ["vue-router","axios","vant"],        // 想统一打包的类库
    output: {
        filename: "[name].dll.js",               //输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称
        path: path.resolve(__dirname, "../dll"),    // 输出的文件都放到 dll 目录下
        library: "_dll_[name]",                  //存放动态链接库的全局变量名称,例如对应 vant 来说就是 _dll_vant
    },
    plugins: [
        new DllPlugin({
            // 动态链接库的全局变量名称，需要和 output.library 中保持一致
            // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
            // 例如 vant.manifest.json 中就有 "name": "_dll_vant"
            name: "_dll_[name]",
            // 描述动态链接库的 manifest.json 文件输出时的文件名称
            path: path.resolve(__dirname, '../dll', "[name].manifest.json"),
        }),
    ],
};
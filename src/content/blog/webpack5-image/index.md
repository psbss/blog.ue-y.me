---
title: "webpack5はデフォルトで画像をいい感じにできるみたい"
date: "2021-05-11"
category: "dev"
description: "webpack5はデフォルトで画像をいい感じにできるみたい"
emoji: "🔧"
---

webpack5が2020年10月にリリースされた。破壊的変更を含む今回のメジャーアップデートによって、外部プラグインが必要だった処理が標準モジュールで行えるようになったらしい。

## assetModules type の追加
webpack5では assetModules typeという新しいモジュール機能が追加された。

これは今まで url-loader, file-loader, raw-loader を利用して画像のパス変換をしていた処理を標準モジュールで行えるようになった。

これまでの書き方
```js:title=webpack.config.js
{
    test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
              loader: 'file-loader',
              options: {
                  outputPath: 'img',
              },
          },
          {
              loader: 'image-webpack-loader',
          }
    ],
},
```

これからの書き方
```js:title=webpack.config.js
output: {
    path: `${__dirname}/public`,
    filename: "bundle.js",
    assetModuleFilename: "img/[hash][ext]"
},

.
. 省略
.

{
    test: /\.(gif|png|jpe?g|svg)$/i,
    type: 'asset/resource',
    loader: 'image-webpack-loader'
}
```

いままで `file-loader` や `url-loader` を利用していた場所を `type: 'asset/resource'` とするだけで画像のPath変更が可能になった。（例では `image-webpack-loader` を併用することで画像の圧縮も行っている）

### Options
- asset/inline : url-loader の代替
- asset/source : raw-loader の代替
- asset/resource : file-loader の代替

---
title: "React-Shareを利用してGatsby.jsにSNS共有ボタンを作る"
date: "2020-03-26"
description: "『Gatsby 使い始めたのに、ソーシャルボタンないし使いづらい』そんなお悩みを React-Share で解決します"
category: "dev"
emoji: "💻"
---

『Gatsby 使い始めたのに、SNS共有ボタンないし使いづらい』そんなお悩みを React-Share で解決します。

## Agenda
1. React-Share とは
2. ソーシャルボタンの実装
3. ソースコード


## React-Share とは

ソーシャルボタン(SNS共有ボタン)を簡単に実装するために用いるのが [React-Share](https://github.com/nygardk/react-share#readme) というプラグインです。  
本来であればURL処理やアイコンを拾ってきて設置するなど、面倒な作業をやらないといけませんが、このプラグインを利用することでほぼ一瞬でできます。  
ネット上には同様の記事が沢山出回っていますが、React/Gatsby初心者の私は盛大にハマってしまったので、できる限り詳しく書きます。（覚書）

React-Share は2020年3月時点でかなり豊富な種類のSNSに対応しています。
- Twitter
- Facebook
- Telegram
- Whatsapp
- LinkedIn
- Pinterest
- VK
- Odnoklassniki
- Reddit
- Tumblr
- LiveJournal
- Viber
- Workplace
- Line
- Weibo
- Pocket
- Instapaper
- email

といっても馴染みのないSNSが多いので、今回は以下のソーシャルボタンを実装します。

- Twitter
- LINE

その他のSNSを実装したい人は、[公式ドキュメント](https://github.com/nygardk/react-share#readme)読んでくださいまし。

## ソーシャルボタンの実装

### 1. Install
npm でインストールする場合
```bash:title=bash(npm)
npm install --save react-share
```

yarn でインストールする場合
```bash:title=bash(yarn)
yarn add react-share
```

### 2. 設置

設置場所はGatsby-sterter-blogを利用している人は```./src/templates/blog-post.js```に置いてあるテンプレートディレクトリ内に React-Share をインポートします。

```js:title=blog-post.js
import {
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from "react-share"
```
このときファイル上部の他のモジュールをimportを行っている部分で追記します。別のソーシャルボタンも追加したい場合は同様に、importすれば簡単に利用できます。

次に表示部分を変更します。
今回はfooter直前、作者プロフィール前にソーシャルボタンを設置したいので
```js:title=blog-post.js
// ここから
<TwitterShareButton title={post.frontmatter.title + "\n"} via="psnzbss" url={location.href}>
    <TwitterIcon round size={32} />
</TwitterShareButton>
<LineShareButton title={post.frontmatter.title + "\n"} via="psnzbss" url={location.href}>
    <LineIcon round size={32} />
</LineShareButton>
// ここまで
<footer>
    <Bio />
</footer>
```
このような感じで記述しました。

### 解説

```
// 1行目
title={post.frontmatter.title + "\n"}
```
この部分にて記事のタイトルを指定しています。{post.frontmatter.title}というのはblog-post.jsの下の方で指定している、graphqlから拾ってきています。  
graphqlは一度```const post = data.markdownRemark```としてpostオブジェクト内に格納され、post内のfrontmatter配下titleにて定義されているので、上記のような書き方になっています。（たぶん）

対してURLは```url={location.href}```にて指定しています。

それぞれのソーシャルボタンには特有のオプションを付ける必要があります。例えばTwitterの場合、アカウント名を```via=""```にて指定しています。

ついでにここで表示するアイコンのサイズもしていします。  
```~~Icon round size={32}```という部分でサイズを簡易的に指定しています。

## ソースコード
https://github.com/psbss/yuu-blog/blob/master/blog/src/templates/blog-post.js

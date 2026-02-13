---
title: "Mixed content Error"
date: "2020-04-12"
description: ""
category: "dev"
emoji: "💻"
---
 
## 経緯
CodiMD（のオンプレミス版）を利用していると Mixed content Error というものが Chrome の 開発者ツール/consoleに表示された。


## Mixed content Error とは

これはホスト側の通信をhttpsで行っているのに、コンテンツサーバとの通信の一部がhttpで行われているときに発生するエラーのことである。  
それぞれのブラウザで独自の挙動をするようだが、主に使われれいるChromeの場合だと以下の挙動をする。

- 画像がhttpで配信された場合
    - 鍵マークを付けない
- CSSやjavascriptがhttpで配信された場合
    - 読み込みをブロックし、表示しない
    - よって画面が崩れる等の表示となる

## 確認方法
Chromeの場合 F12 で Chrome Developer tools を開いてConsoleやNetworkより確認を行うことができる（正常に配信されていない場合赤く表示される）

## 解決方法
- パスを確認する
    - 配信のパスがhttpになっている場合はhttpsに変更する。


今回の場合CodiMDの設定（config.json）の
```
CMD_PROTOCOL_USESSL
```
をTrueにすることで簡単に対応することができた。（なんじゃそりゃ

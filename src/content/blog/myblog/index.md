---
title: "Github actions+Gatsby.jsで最高のブログ環境を構築する"
date: "2020-03-22"
description: "試行錯誤"
category: "dev"
emoji: "✏️"
---

ブログを新しくしました。素晴らしくナウい構成だと思います。  
ひたすら試行錯誤して慣れない環境でデプロイすることができました。  
ブログを新しくした経緯については後で熱く語ります！

## 構成
- Gatsby.js (React Static Site Generator)
- Github Actions (Build & Deploy)
- Mixhost (Hosting Server)

### Gatsby.js

Gatsby(ギャッツビー)？なにそれ？Man○om？って人用にざっくり説明すると、

> Reactというフレームワークで作られている  
> Node.js パッケージが色々使える  
> 静的サイトジェネレータ  
> 表示が爆速

という特徴があります。

以前はWordPressというPHPで作られたソフトウェアを利用しており、動的なブログだったため動作がモッサリしていましたが、今回は爆速です。

### Github Actions

ビルド及びデプロイをGithub Actionsに統合しました。

ActionsのWorkflowは以下のような手順で行っています。
1. Node.jsのセットアップ
2. Gatsbyのビルド
3. 生成物(Artifact)のアップロード(一時保存)
4. Artifactのダウンロード
5. デプロイ先のサーバSSH Keyのインストール
6. rsyncにてデプロイ


これにより、Githubにpushすれば自動的にビルドしてデプロイを行ってくれます。非常に便利。

## ハマったところ

Gatsby自体は以前利用した経験があったため詰まることはなかったですが、Github Actionsは初めての利用だったためかなり詰まりました。

どのくらい詰まったかは、[コミットログ](https://github.com/psbss/yuu-blog/commits/develop)を見ていただければ分かるかと。

中でも手順6のrsyncにてデプロイを行う部分はかなり手こずりました。  
rsync自体は非常に簡単で、

```bash:title=bash
rsync [option] 同期元ディレクトリ/ 同期先ディレクトリ/
```

と書けばいい感じに動いてくれます。これが、SSHを利用したrsyncになると、同期先サーバとディレクトリを指定します。ソースコードは以下の感じになります。

```bash:title=bash
rsync [option] 同期元ディレクトリ/ ユーザ名@ホストアドレス:同期先ディレクトリ/
```

Github Actionsの場合は環境変数のようなsecretsという機能を利用することができるので、以下のように書き直せます。

```bash:title=bash
[option] 同期元ディレクトリ/ ${{secrets.REMOTE_USER}}@${{secrets.REMOTE_HOST}}:同期先ディレクトリ
```
このとき、REMOTE_HOST側のsecretsがうまく動かない場合があるので、そのときは直書する。

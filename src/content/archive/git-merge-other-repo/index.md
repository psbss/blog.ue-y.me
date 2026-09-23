---
title: "Gitで異なる２つのリポジトリを連結（統合）する方法"
date: "2020-06-07"
description: "gitで異なる２つのリポジトリを統合することが実はできます。Githubのリポジトリを整理したいときなどに利用できるテクニックをまとめました。"
category: "dev"
emoji: "🌴"
---
## 課題
以前書いたコードを見直していると煩雑なリポジトリ構成（複数親ディレクトリ：１リポジトリ）だったため１つのリポジトリに統合して管理したいと考えた。

```git fetch```コマンドを利用することで過去の変更履歴を引き継いだまま複数のリポジトリを一つにまとめることが可能らしい。ということで実践してみた。

## 準備
- ベースとなるリポジトリの作成
- 素材となるリポジトリ（１つ以上）

まずはベース（複数のリポジトリをまとめる親）となるリポジトリを作りましょう。といっても普段通りに作ればおｋです。

```bash
~$ mkdir base_dir
~$ cd base_dir
base_dir$ git init
base_dir$ touch README.md
```

```README.md``` 内は各自適当に操作してください。

素材となるリポジトリは ```base_dir``` と同じ階層に置いておくと操作が簡単です。  
※ 階層が異なっていたり、Github上に置いていても同様に連結することができます。

## 実践

まずはベースリポジトリ(base_dir)にリモートリポジトリと登録しましょう。リモートリポジトリと聞くとGithub等のサーバ上のリポジトリを想像される方いるでしょう。別にサーバに無くて、ローカルの別のリポジトリでもリモートリポジトリとして登録することができます。

```bash
# ベースリポジトリにリモートリポジトリとして対象のリポジトリを登録する
base_dir$ git remote add rimote_repo ../remote_dir
```

```remote_repo``` の部分はfetchするときの名称なのでorigin以外であれば何でもおｋです。
```remote_dir``` はベースリポジトリに連結する素材となるリポジトリが置いてあるディレクトリを指定します。

一連のディレクトリ構造を表すと以下のようになっているかと思います。

```
.
├── base_dir
│   ├── .git
│   │   ├── HEAD
│   .   .
│   .   .
│   .   .
│   │   └── refs
│   │       ├── heads
│   │       └── tags
│   └── README.md
└── remote_dir
    ├── .git
    │   ├── HEAD
    .   .
    .   .
    .   .
    │   └── refs
    │       ├── heads
    │       └── tags
    └── README.md
```

```bash
# ベースリポジトリ内からリモートリポジトリの中身を取得する
base_dir$ git fetch rimote_repo
```

取得すると、ベースリポジトリ内に新しいブランチとして登録されるので、マージします。

```bash
# リモートリポジトリの内容をマージする
base_dir$ git merge --allow-unrelated-histories rimote_repo/master
```

ベースとなるリポジトリの内容よりも古い情報をマージする可能性が高いので```--allow-unrelated-histories```オプションをつけています。

これは Git2.9 より無関係な２つのブランチをmergeするときには```--allow-unrelated-histories```オプションをつけないとmergeできなくなったからです。

Doc: [https://git-scm.com/docs/git-merge#Documentation/git-merge.txt---allow-unrelated-histories](https://git-scm.com/docs/git-merge#Documentation/git-merge.txt---allow-unrelated-histories)

これで２つの異なるリポジトリを統合することができました

## 補足
参考：  
[Git で複数のリポジトリをまとめたり、逆に切り出したりする](https://qiita.com/uasi/items/77d41698630fef012f82)

統合する素材となるリポジトリのコミットユーザやメールアドレスを変更する場合は以下の記事を参照：  
[ユーザを間違えたままgithubにpushしたときの書き換え](https://qiita.com/nagito25/items/2463a677e46210c6a90f)

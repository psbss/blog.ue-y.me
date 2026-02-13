---
title: "Github Actions でビルドして Mixhost にデプロイする方法"
date: "2020-06-15"
description: "以前このブログをデプロイする際に利用した Github Actions ですが、久しぶりに利用したところ、SSH認証に手こずったので、方法をまとめておく。"
category: "dev"
emoji: "🔐"
---

以前このブログをデプロイする際に利用した Github Actions ですが、久しぶりに利用したところ、SSH認証に手こずったので、方法をまとめておく。

## Github Actions の Workflow 設定
ymlファイルなのでインデントに気をつけましょう。  
ソースコード：[https://github.com/psbss/yuu-blog/blob/master/.github/workflows/build.yml](https://github.com/psbss/yuu-blog/blob/master/.github/workflows/build.yml)

## Mixhost 側で SSH key を生成する
今回作成する SSH Key はコントロールパネルの 「セキュリティ」 → 「SSHアクセス」 からでは作れないので、 「詳細」 → 「Terminal」 から作ります。

Terminal を開いて、コマンドを入力します。

```bash
# ディレクトリの移動
cd ~/.ssh
# SSH key の生成
ssh-keygen -t rsa -b 4096
```
と実行すると、
```
Enter file in which to save the key (/home/***/.ssh/id_rsa):
```
と、「鍵どこに保存する？｝と聞かれるので、問題なければデフォルトのままEnterを押します。  
すると、パスフレーズを聞かれます。
```bash
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```
今回は利用上の問題があるので（セキュリティ的には問題有りますが）パスフレーズを設定せず2回Enterを押して次に進みます。

以上で SSH-Key（秘密鍵・公開鍵） を作れました。

それぞれの鍵の中身を表示するには以下のコードを打って表示します。
```bash
# 保存時にSSH-Keyの鍵名を変更してない場合
cat id_rsa # 秘密鍵
cat id_rsa.pub # 公開鍵
```

## Github の Secret に登録する

SSH-Keyの登録では先程用意した公開鍵・秘密鍵を利用します。

Github Actions を動かす対象のリポジトリに移動して 「Settings」 → 「Secret」に移動します。

次に、 「New secret」 を押して以下の情報を入力します

---

Name： REMOTE_USER
Value： Mixhost のログイン名

Name： SSH_KEY
Value： 秘密鍵（id_rsa）の中の情報全て

Name： KNOWN_HOSTS
Value： 後述

---

この ```KNOWN_HOSTS``` ですが、普通に作ると ssh-rsa 方式で作成されますが、なぜか利用する際には ecdsa-sha2-nistp256 方式になります。

少し厄介なので、自動で作ってもらいます。

### KNOWN_HOSTS を作成する

流れ：

- 秘密鍵をダウンロードして配置する
- configファイルを作る
- SSHを実行する
- known_hosts の中の情報をコピーしてGithubのSecretに登録する


まずは手持ちの端末から Mixhost にSSH接続します。接続できると自動でKNOWN_HOSTSが生成されます。

Mixhost の 「SSHアクセス」より秘密鍵をダウンロードして手持ちの端末の ~/.ssh/に配置します。配置する際は以下のコマンドを実行（Mac / Linux）Windowsの人は```Windows SubSystem for Linux```を利用しましょう。
```bash
cd Download # ファイルのダウンロード先
mv ./id_rsa ~/.ssh/ ## ファイルを.sshディレクトリにコピー
```
次に configファイルを作ります。

```bash
vim config
```

vimの使い方はザックリまとめると以下
```
i で挿入モード
Esc でコマンド入力モード
:wq で保存
```
続けて入力していく
```vim
Host Mixhost # 自由
HostName ***.mixh.jp # ***部分はコントロールパネル横プライマリドメインの部分
User ログイン名
Port 22
IdentityFile ~/.ssh/id_rsa
```
以上でconfigファイルの設定は完了する。
```bash
ssh Mixhost
```
を実行すると「このハッシュ値で合っているか？」と鍵が改ざんされていないか聞かれるので、問題なければ y を押して進む。正常に認証されると SSHアクセスが可能になる。

といった手順でアクセスができるようになります。

一度アクセスできると ~/.ssh/known_hosts ファイルが自動生成されるので、```cat ~/.ssh/known_hosts```で中身をコピーします。

これがGithubのSecretに登録する中身です。

## Actions を動かす
以上の手順で Actions を動かすための SSH 周りの設定が出来ました

何か詰まった場合は[DM](https://twitter.com/psnzbss)へどうぞ

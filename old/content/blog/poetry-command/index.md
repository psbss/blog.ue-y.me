---
title: "Pythonパッケージマネージャ『Poetry』の基本的なコマンド"
date: "2021-12-04"
category: "dev"
description: "PythonのパッケージマネージャであるPoetryで利用頻度の高いコマンドをまとめました。"
emoji: "🐍"
---

個人的な備忘録です。最新の情報は[公式サイト](https://python-poetry.org/docs/cli/)を確認してください。

## 利用頻度の高いコマンドの説明
利用頻度の高いコマンド順で表示しています。

### ヘルプの表示
とりあえずこれだけ覚えとけばどうにかなるやつ

```shell
$ poetry --help
# or
$ poetry -h
```


### パッケージ一覧表示

```shell
$ poetry show

# option
$ poetry show --outdated  # 更新のあるパッケージを一覧表示
$ poetry show --no-dev  # 開発用パッケージを表示しない
$ poetry show --tree  # 依存するパッケージをツリー表示する
```


### パッケージ追加

```shell
$ poetry add "パッケージ名"
# or
$ poetry add "パッケージ名@バージョン指定"

# option
$ poetry add --dev "パッケージ名"  # 開発用パッケージを追加
$ poetry add -D "パッケージ名"  # 開発用パッケージを追加
```


### パッケージ削除

```shell
$ poetry remove "パッケージ名"

# option
$ poetry remove --dev "パッケージ名"  # 開発用パッケージを削除
```


### パッケージ更新

```shell
$ poetry update
# or
$ poetry update "パッケージ名"

# option
$ poetry update --dry-run  # 更新のあるパッケージを表示
```


### インストール
環境を整える際に利用するコマンド

```shell
$ poetry install

# oprion
$ poetry install --no-dev  # 開発用パッケージをインストールしない（本版環境の構築で利用）
```


### 初期セットアップ（既存プロジェクト有）
既にあるプロジェクトにPoetryを適用する。実行すると `pyproject.toml` ファイルが作成される。

```shell
$ poetry init

# option
$ poetry init --python "Pythonバージョン"
$ poetry init --dependency "利用するパッケージ名"
$ poetry init --dev-dependency "開発時に利用するパッケージ名"
```

## 参考
- Poetry Document : [https://python-poetry.org/docs/cli/](https://python-poetry.org/docs/cli/)

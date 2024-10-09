SHELL := /bin/bash # シェルをbashに指定
SAIL := ./vendor/bin/sail # Sailコマンドのパス

# プロジェクトのセットアップ
setup:
	# Sailのインストール
	php artisan sail:install --with=mysql # Docker環境をセットアップ
	php artisan sail:publish # Docker環境の設定ファイルを作成
	$(SAIL) up -d # Docker環境を起動

	# セットアップ
	$(SAIL) artisan key:generate
	$(SAIL) artisan storage:link
	$(SAIL) artisan migrate
	$(SAIL) artisan db:seed

	# Laravel Breezeのインストール
	composer require laravel/breeze --dev # Breezeをインストール
	$(SAIL) artisan breeze:install react # BreezeのReact版をインストール

	# パッケージのインストール
	npm install
	npm run dev
# 開発環境の起動
start:
	./vendor/bin/sail up -d

# 開発環境の停止
stop:
	./vendor/bin/sail down

# クリーニング
clean:
	./vendor/bin/sail down -v
	rm -rf node_modules
	rm -rf vendor
	rm -rf public/hot
	rm -rf public/storage
	rm -rf storage/app/public

# 再ビルド
rebuild:
	./vendor/bin/sail build --no-cache
	./vendor/bin/sail up -d

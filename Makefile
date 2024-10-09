SHELL := /bin/bash # シェルをbashに指定

# プロジェクトのセットアップ
setup:
	composer require laravel/breeze --dev
	composer install
	./vendor/bin/sail up -d
	./vendor/bin/sail npm install
	./vendor/bin/sail npm install react react-dom
	./vendor/bin/sail npm install @vitejs/plugin-react
	./vendor/bin/sail npm install -D tailwindcss postcss autoprefixer
	./vendor/bin/sail npx tailwindcss init
	echo -e "@tailwind base;\n@tailwind components;\n@tailwind utilities;" > ./resources/css/app.css
	./vendor/bin/sail artisan breeze:install react
	./vendor/bin/sail artisan sail:publish
	./vendor/bin/sail artisan key:generate
	./vendor/bin/sail artisan storage:link
	./vendor/bin/sail artisan migrate
	./vendor/bin/sail artisan db:seed

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

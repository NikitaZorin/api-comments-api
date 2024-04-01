# **Saas-App API Comments**
## **Описание**
Данное приложение сохраняет комментарии как обычным текстом так и с файлом в базе данных sqlite используя ORM Sequalizer.

Здесь присутствует работа с файлами и валидация данных перед попаданием в БД.

## **Установка**
1. Клонируйте репозиторий:

```
git clone https://github.com/NikitaZorin/api-comments-app.git
```
2. Перейдите в директорию проекта:

```
cd api-comments-app
```

3. Установите зависимости:
```
npm install
```
## **Использование**
### **Запуск сервера**
```
npm start
```

4. Конфигурация .env
Создайте файл .env в директории проекта там где находятся package.json и package-lock.json
```
AWS_ACCESS_KEY_ID=**********
AWS_SECRET_ACCESS_KEY=**********
AWS_REGION=eu-north
S3_BUCKET_NAME=commentsfiles
```

Данные креды используются для сохранения файла в виде url'a по методу upload

## **API Endpoints**

В качестве документации можно перейти на /api-docs для ознакомлением с endpoints.

## **Запуск с помощью Docker**
1. Установите Docker на свой компьютер, если он еще не установлен.
2. Создайте Docker-образ:
```
docker build -t commentsapp .
```
3. Запустите контейнер:
```
docker run -it -p 3000:3000 -t commentsapp 
```

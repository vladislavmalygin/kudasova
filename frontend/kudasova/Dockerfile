# Dockerfile для React
FROM node:14

# Установка зависимостей
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install

# Копирование кода
COPY . .

# Сборка приложения
RUN npm run build

# Открытие порта
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]

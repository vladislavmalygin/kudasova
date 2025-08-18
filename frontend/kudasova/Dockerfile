# Dockerfile для React
FROM node:14

# Установка зависимостей
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

# Копирование кода
COPY . .

# Сборка приложения
RUN npm run build

# Открытие порта

# Команда для запуска приложения
CMD ["npx", "-y", "http-server", "-p", "8000", "/app/build"]

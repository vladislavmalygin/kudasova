FROM python:3.11

WORKDIR /app

# Установите зависимости
COPY requirements.txt .
RUN pip install -r requirements.txt --no-cache-dir

# Копирование всех файлов
COPY . .

# Открытие порта
EXPOSE 8000

# Используйте Gunicorn для запуска приложения
CMD ["gunicorn", "kudasova.wsgi:application", "--bind", "0.0.0.0:8080"]

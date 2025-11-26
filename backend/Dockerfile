FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy and install requirements
COPY requirements.txt .
RUN pip install -r requirements.txt --no-cache-dir

# Copy project files
COPY . .

# Create entrypoint script
RUN echo '#!/bin/sh\n\
echo "Running migrations..."\n\
python manage.py migrate\n\
echo "Starting Gunicorn..."\n\
gunicorn kudasova.wsgi --bind 0.0.0.0:8000\n\
' > /app/entrypoint.sh

RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]

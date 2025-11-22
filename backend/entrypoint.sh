#!/bin/sh

echo 'Running migrations...'
python manage.py migrate
echo 'Loading data...'
python manage.py load_data
gunicorn kudasova.wsgi --bind 0.0.0.0:8080

exec "$@"

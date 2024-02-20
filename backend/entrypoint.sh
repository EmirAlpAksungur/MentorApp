#!/bin/bash
APP_PORT=${PORT:-8000}

set -o errexit
set -o pipefail
set -o nounset

postgres_ready() {
python << END
import sys
import psycopg2
try:
    psycopg2.connect(
        dbname="${POSTGRES_DB}",
        user="${POSTGRES_USER}",
        password="${POSTGRES_PASSWORD}",
        host="${POSTGRES_HOST}",
        port="${POSTGRES_PORT}",
    )
except psycopg2.OperationalError:
    sys.exit(-1)
sys.exit(0)
END
}

until postgres_ready; do
 >&2 echo "Waiting for PostgreSQL to become available....:-("
 sleep 1
done
>&2 

echo "PostgreSQL is ready!!!!...:-)"

echo "Migrating database..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput
echo "Database migrated"

echo "Creating superuser..."
python manage.py superuser || true
echo "Superuser created"

echo "Importing files..."
python manage.py importExel || true
echo "Files imported"

echo "Collecting static files..."
python manage.py collectstatic --noinput
echo "Static files collected"

echo "Starting Server"
daphne -b 0.0.0.0 -p 8000 core.asgi:application

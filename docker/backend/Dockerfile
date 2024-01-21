# 3.12.0

FROM python:3.10.12-slim-buster

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /backend

COPY ./backend .
RUN apt-get update 
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN chmod +x /backend/entrypoint.sh

CMD ["/backend/entrypoint.sh"]
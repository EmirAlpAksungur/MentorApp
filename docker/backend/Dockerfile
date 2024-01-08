# 3.12.0

FROM python:3.10.12-slim-buster

WORKDIR /backend

COPY ./backend .

RUN python -m venv /opt/venv
RUN /opt/venv/bin/pip install --upgrade pip
RUN /opt/venv/bin/pip install -r requirements.txt
RUN chmod +x /backend/entrypoint.sh

CMD ["/backend/entrypoint.sh"]
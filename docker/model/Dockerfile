FROM python:3.9-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /model

COPY ./model .
RUN apt-get update && apt-get install -y libgl1-mesa-glx
RUN apt-get install -y libglib2.0-0
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD ["uvicorn", "model_server:app", "--host", "0.0.0.0", "--port", "8001"]
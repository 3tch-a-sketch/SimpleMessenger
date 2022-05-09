FROM python

WORKDIR /server

COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY . .

ENV PORT=8000
EXPOSE 8000

CMD ["python3", "server.py"]
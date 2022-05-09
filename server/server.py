from flask import Flask, request
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
import os
import psycopg2
import psycopg2.pool
import sys

minConnections = 1
maxConnections = 20

app = Flask(__name__)
# CORS(app, support_credentials=True)
CORS(app, methods=['POST','GET','PUT','DELETE'])
# cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)


try:
    pool = psycopg2.pool.ThreadedConnectionPool(minConnections, maxConnections, 
            host="172.16.239.16",
            database="data",
            user="docker",
            password="password")
except:
    print("Unable to connect to database with 172.16.238.11 attempting to connect to localhost")
    try:
        pool = psycopg2.pool.ThreadedConnectionPool(minConnections, maxConnections, 
            host="0.0.0.0",
            database="data",
            user="docker",
            password="password")
    except:
        print("Unable to connect to database with 0.0.0.0")
        sys.exit(1)

if pool:
    print("Connection pool created")
else:
    sys.exit("Connection pool not created")


class Message(Resource):
    def post(self):
        conn = pool.getconn()
        cur = conn.cursor()

        cur.execute("INSERT INTO messages (message) VALUES (%s)", (request.json['message'],))

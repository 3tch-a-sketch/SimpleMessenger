from flask import Flask, request
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
from psycopg2.extensions import AsIs
import os
import psycopg2
import psycopg2.pool
import sys
import datetime

minConnections = 1
maxConnections = 1000

app = Flask(__name__)
# CORS(app, support_credentials=True)
CORS(app, methods=['POST','GET','PUT','DELETE'])
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)


try:
    pool = psycopg2.pool.ThreadedConnectionPool(minConnections, maxConnections, 
            host="172.16.239.16",
            database="docker",
            user="docker",
            password="password")
except:
    print("Unable to connect to database with 172.16.239.16 attempting to connect to 127.0.0.1")
    try:
        pool = psycopg2.pool.ThreadedConnectionPool(minConnections, maxConnections, 
            host="127.0.0.1",
            database="docker",
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

        # verify that the user exists and if so the password hashes match
        # SELECT password_hash FROM users WHERE username = 'username'

        # add the user if the user doesn't exist
        # INSERT INTO users (username, password_hash, created_at) VALUES ('username', 'password_hash', datetime.datetime.now())

        # add the message if the user exists
        # SELECT user_id FROM users WHERE username = 'username'
        # INSERT INTO messages (user_id, body, created_at) VALUES (user_id, 'body', datetime.datetime.now())


        username = request.json['username']
        message = request.json['message']
        passwordHash = request.json['password_hash']

        cur.execute("SELECT password_hash FROM users WHERE username = %s", (username,))

        if request.json['password_hash'] == cur.fetchall()[0][0]:
            cur.execute("SELECT user_id FROM users WHERE username = %s", (username,))
            user_id = cur.fetchall()[0][0]
            cur.execute(f"INSERT INTO posts (user_id, body, created_at) VALUES ({user_id}, '{message}', '{datetime.datetime.now()}')")
            conn.commit()

            return {'message': 'Message posted'}


        pool.putconn(conn)

    def get(self):
        conn = pool.getconn()
        cur = conn.cursor()

        cur.execute("SELECT post_id, username, body, posts.created_at FROM posts,users WHERE users.user_id = posts.user_id LIMIT 100")

        rows = cur.fetchall()
        json = {}
        # app.logger.info(rows[0][2])
        for r in range(len(rows)):
            json[r] = {
                "post_id": rows[r][0],
                "username": rows[r][1],
                "body": rows[r][2],
                "created_at": rows[r][3].strftime("%Y-%m-%d %H:%M:%S")
            }

        pool.putconn(conn)

        return json
         
class User(Resource):
    def post(self):
        conn = pool.getconn()
        cur = conn.cursor()

        cur.execute(f"SELECT password_hash FROM users WHERE username = '{request.json['username'].lower()}'")
        result = cur.fetchall()
        if len(result) == 1:
            app.logger.info(result[0][0])
            password = request.json['password_hash'] == result[0][0]
            app.logger.info(password)
            app.logger.info(request.json['password_hash'])
            pool.putconn(conn)
            return {'login': password, 'new_user': False}
        else:
            cur.execute("INSERT INTO users (username, password_hash, created_at) VALUES (%s, %s, %s)", (request.json['username'], request.json['password_hash'], datetime.datetime.now()))
            conn.commit()
            pool.putconn(conn)
            return {'new_user': True, 'login': True}

if __name__ == '__main__':
    api.add_resource(Message, '/message')
    api.add_resource(User, '/user')
    app.run(host='0.0.0.0', port=8000, debug=True) 
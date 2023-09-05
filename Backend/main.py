from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO

from Database.crud import add_room, add_user_to_room, remove_user_from_room, delete_room, get_users_from_room
from Database.config import client

app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

@socketio.on('connect')
def onConnectCallback(sid, data):
    socketio.emit('acknowledge', data = {'status': 'success'}, room = sid)

@socketio.on('connected')
def onConnectCallback(data):
    add_user_to_room(client, request.sid, data.room)
    socketio.emit('connectCallback', {'data': request.sid }, room= request.sid)

@socketio.on('disconnect')
def onDisconnectCallback(sid, data):
  remove_user_from_room(client, sid, data.room)

@socketio.on('message')
def onMessageCallback(data):
  sid = request.sid
  socketio.emit('message', {data: data.message}, room = sid)

if __name__ == '__main__':
    socketio.run(app, debug=True)
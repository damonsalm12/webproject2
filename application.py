import os
from channels import Channel
from flask import Flask, render_template, redirect
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channels = {}


@app.route("/")
def index():
    return render_template("index.html", channels=channels)

@app.route("/create")
def create():
    # Provides user the form to create a new name
    return render_template("create.html")

@app.route("/disp_channels/<string:channel>")
def disp_channels(channel):
    # Displays channel shown by user 
    return render_template("channel.html", messages=channels[channel].getlist(), name=channel)

@socketio.on("check name exists")
def getname(data):
    # Check if user does not yet have name and redirect to create if needed
    if not(data['name exists']):
        return redirect("/create")
    else:
        return None

@socketio.on("new user")
def newuser():
    # Redirect when a user creates a new screenname
    return redirect("/")

@socketio.on("new channel")
def newchannel(data):
    channelname = data["new channel"]
    my_channel= Channel(channelname)
    channels[channelname] = my_channel
    socketio.emit("create channel", {"create channel": channelname})

if __name__ == '__main__':
    socketio.run(app)
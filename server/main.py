import os
import json
from flask import Flask, request
from flask_cors import CORS
from util import get_file_list, get_next_id, id_to_filename, new_file_object, get_name, id_exists, write_file
from constants import NOTES_DIR

app = Flask(__name__)
CORS(app)


@app.route('/files', methods=['GET'])
def listfiles():
    filelist = get_file_list()
    return json.dumps(filelist)


@app.route('/files/<id>', methods=['GET'])
def readfile(id):
    filename = id_to_filename(id)
    try:
        f = open(os.path.join(NOTES_DIR, filename), 'r')
        return f.read()
    except:
        return 'File not found'


@app.route('/files', methods=['POST'])
def createfile():
    content = request.data.decode("utf-8")

    id = get_next_id()

    write_file(id, content)
    name = get_name(content)

    return new_file_object(id, name)


@app.route('/files/<id>', methods=['PUT'])
def updatefile(id):
    content = request.data.decode("utf-8")

    if not id_exists(id):
        return 'File does not exist'

    write_file(id, content)

    return 'OK'


@app.route('/files/<id>', methods=['DELETE'])
def deletefile(id):
    if not id_exists(id):
        return 'File does not exist'

    filename = id_to_filename(id)

    try:
        os.remove(os.path.join(NOTES_DIR, filename))
        return 'OK'
    except:
        return 'File not removed'
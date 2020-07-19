import os
import json
from flask import Flask, request
from flask_cors import CORS
from util import get_file_list, get_next_id, id_to_filename, new_file_object, get_name, id_exists, write_file, new_error
from constants import NOTES_DIR


# JSON format for response
#
# Error:
# {
#   status: 'Ok' | 'Error',
#   description: string,
# }
#
# GET /files:
# {
#   status: 'Ok' | 'Error',
#   files: [ FILE ],
# }
#
# GET /files/<id>:
# {
#   status: 'Ok' | 'Error',
#   content: string,
# }
#
# POST /files:
# {
#   status: 'Ok' | 'Error',
#   file: FILE,
# }
#
# PUT /files/<id>:
# {
#   status: 'Ok' | 'Error',
#   file: FILE,
# }
#
# DELETE /files/<id>:
# {
#   status: 'Ok' | 'Error',
# }
#
# TYPES
# -----
#
# FILE = {
#   id: string,
#   name: string,
# }
#


app = Flask(__name__)
CORS(app)


@app.route('/files', methods=['GET'])
def listfiles():
    query = request.args.get('query')
    if query == None:
        query = ''

    filelist = get_file_list(query)
    return json.dumps({'status': 'Ok', 'files': filelist})


@app.route('/files/<id>', methods=['GET'])
def readfile(id):
    filename = id_to_filename(id)
    try:
        with open(os.path.join(NOTES_DIR, filename), 'r') as f:
            content = f.read()
            return json.dumps({'status': 'Ok', 'content': content})
    except OSError as error:
        return new_error(str(error))


@app.route('/files', methods=['POST'])
def createfile():
    content = request.data.decode("utf-8")

    id = get_next_id()

    try:
        write_file(id, content)
    except OSError as error:
        return new_error(str(error))

    name = get_name(content)

    return json.dumps({'status': 'Ok', 'file': new_file_object(id, name)})


@app.route('/files/<id>', methods=['PUT'])
def updatefile(id):
    content = request.data.decode("utf-8")

    if not id_exists(id):
        return 'File does not exist'

    try:
        write_file(id, content)
    except OSError as error:
        return new_error(str(error))

    return json.dumps({'status': 'Ok', 'file': {'id': id, 'name': get_name(content)}})


@app.route('/files/<id>', methods=['DELETE'])
def deletefile(id):
    if not id_exists(id):
        return new_error('File does not exist')

    filename = id_to_filename(id)

    try:
        os.remove(os.path.join(NOTES_DIR, filename))
        return json.dumps({'status': 'Ok'})
    except OSError as error:
        return new_error(str(error))

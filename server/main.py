import os
import json
from flask import Flask, request
from flask_cors import CORS
from util import get_file_list
from constants import NOTES_DIR

app = Flask(__name__)
CORS(app)


(filelist, filemap) = get_file_list()
print(json.dumps(filelist))

@app.route('/files', methods=['GET'])
def listfiles():
    return json.dumps(filelist)


@app.route('/files', methods=['POST'])
def createfile(file):
    content = request.data.decode("utf-8")
    f = open(os.path.join(NOTES_DIR, file), 'w')
    f.write(content)
    f.close()
    return 'writing ' + file


@app.route('/files/<id>', methods=['GET'])
def readfile(id):
    f = open(os.path.join(NOTES_DIR, id), 'r')
    return f.read()


@app.route('/files/<id>', methods=['PUT'])
def updatefile(id):
    # Fail if file exists (guards against concurrent access errors)
    pass


@app.route('/files/<id>', methods=['DELETE'])
def deletefile(id):
    pass

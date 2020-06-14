import os
import json
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

NOTES_DIR = '/home/florian/Notes'

@app.route('/getfiles')
def getfiles():
    files = get_file_list()
    return json.dumps(files)

@app.route('/read/<file>')
def readfile(file):
    f = open(os.path.join(NOTES_DIR, file), 'r')
    return f.read()

@app.route('/write/<file>', methods = ['POST'])
def writefile(file):
    print(file)
    content = request.data.decode("utf-8")
    f = open(os.path.join(NOTES_DIR, 'testfile.md'), 'w')
    f.write(content)
    f.close()
    return 'writing ' + file

def get_file_list():
    filenames = []

    for root, dirs, files in os.walk(NOTES_DIR):
        for d in dirs:
            fullpath = os.path.join(root, d)
            partialpath = fullpath[len(NOTES_DIR) + 1:]
            filenames.append(partialpath)
        for f in files:
            fullpath = os.path.join(root, f)
            partialpath = fullpath[len(NOTES_DIR) + 1:]
            filenames.append(partialpath)

    return sorted(filenames)
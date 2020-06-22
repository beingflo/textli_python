import os
import json
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

NOTES_DIR = '/home/florian/Notes'

@app.route('/list')
def listfiles():
  files = get_file_list()
  return json.dumps(files)

@app.route('/create/<file>', methods=['POST'])
def createfile(file):
  content = request.data.decode("utf-8")
  f = open(os.path.join(NOTES_DIR, file), 'w')
  f.write(content)
  f.close()
  return 'writing ' + file

@app.route('/read/<file>')
def readfile(file):
  f = open(os.path.join(NOTES_DIR, file), 'r')
  return f.read()

@app.route('/update/<file>')
def updatefile(file):
  pass

@app.route('/delete/<file>')
def deletefile(file):
  pass

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

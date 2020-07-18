import os
import re
from constants import NOTES_DIR, EXTENSION

# JSON format for file list
#
# [
#   id: string,
#   name: string,
# ]
#

def get_file_list():
    # files to be sent on list request
    filelist = []

    for root, dirs, files in os.walk(NOTES_DIR):
        for f in files:
            fullpath = os.path.join(root, f)

            content = open(fullpath, 'r').read()
            name = get_name(content)
            id = os.path.splitext(f)[0]

            filelist.append(new_file_object(id, name))

    return filelist

def new_file_object(id, name):
   return {'id': id, 'name': name}

def get_name(content):
    line = content.partition('\n')[0]
    clean_line = re.sub('[#]', '', line)
    return clean_line.lstrip()

def id_to_filename(id):
    return str(id) + EXTENSION

def get_next_id():
    max_id = 0
    for root, dirs, files in os.walk(NOTES_DIR):
        for f in files:
            id = int(os.path.splitext(f)[0])
            max_id = max(max_id, id)

    return max_id+1
import os
import hashlib
from constants import NOTES_DIR

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

    # map from id to fullpath for reading files
    filemap = {}

    for root, dirs, files in os.walk(NOTES_DIR):
        for f in files:
            fullpath = os.path.join(root, f)
            hash = hashlib.sha1(fullpath.encode('utf-8'))
            id = hash.hexdigest()
            filemap[id] = fullpath
            filelist.append({'id': id, 'name': f})

    return (filelist, filemap)

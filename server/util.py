import os
import re
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

    for root, dirs, files in os.walk(NOTES_DIR):
        for f in files:
            fullpath = os.path.join(root, f)
            content = open(fullpath, 'r').read().partition('\n')[0]
            name = re.sub('[#]', '', content)
            id = os.path.splitext(f)[0]
            filelist.append({'id': id, 'name': name.lstrip()})

    return filelist

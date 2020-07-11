import os
from main import NOTES_DIR

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
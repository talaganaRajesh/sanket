import os
import sys

# 1. Add the video-model directory to the Python path
backend_dir = os.path.join(os.path.dirname(__file__), 'video-model')
sys.path.append(backend_dir)

# 2. Change the working directory so the app can find the model and label files
os.chdir(backend_dir)

# 3. Import the Flask app instance from the backend folder
# This makes 'gunicorn app:app' work from the root folder
from app import app as application
app = application

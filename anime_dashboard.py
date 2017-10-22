from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os

app = Flask(__name__)

MONGO_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017')
DBS_NAME = os.getenv('MONGO_DB_NAME', 'animeData')
COLLECTION_NAME = 'anime'


@app.route("/")
def home():
    """
    A Flask view to serve the landing page.
    """
    return render_template("home.html")

@app.route("/ref")
def ref():
    """
    A Flask view to serve the reference page.
    """
    return render_template("ref.html")


@app.route("/about")
def about():
    """
    A Flask view to serve the about page.
    """
    return render_template("about.html")

@app.route("/dash")
def dash():
    """
    A Flask view to serve the dashboard page.
    """
    return render_template("dashboard.html")


@app.route("/anime")
def anime_data():

    """
    A Flask view to serve the project data from
    MongoDB in JSON format.
    """

    # The record fields to retrieve.
    FIELDS = {
        '_id': False, 'name': True,
        'genre': True, 'type': True, 'episodes': True,
        'rating': True, 'members': True
    }

    # Open a connection to MongoDB using a with statement
    # Connection will be closed as soon as we exit the with statement
    with MongoClient(MONGO_URI) as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set, filter type field, retrieve only the fields listed below
        #  limit the number of retrieved fields to 6000
        anime = collection.find({
            'type': {
                '$in': ['Movie', 'TV', 'OVA', 'ONA', 'Special']}}, projection=FIELDS, limit=6000)
        # Convert anime to a list in a JSON object and return the JSON data
        return json.dumps(list(anime))



if __name__ == "__main__":
    app.run(debug=True)
period_cramps = [
    {
        "id": 1,
        "genre": "period_cramps",
        "url": "https://open.spotify.com/playlist/0dko0RjzooKQ7yUJDxbHmp?si=f0e958fe36644cf8",
    },
    {
        "id": 2,
        "genre": "period_cramps",
        "url": "https://open.spotify.com/playlist/2a2N6pyaDRRCFRCYWT8xAv?si=b4f70e23845442cb",
    },
    {
        "id": 3,
        "genre": "period_cramps",
        "url": "https://open.spotify.com/playlist/4iSgwUYd8azUlaxjvkVWpO?si=204076f9094b4aeb",
    },
    {
        "id": 4,
        "genre": "period_cramps",
        "url": "https://open.spotify.com/playlist/3F0vFrBqnTrSw7O1ddGxMX?si=8929c6abda224fb5",
    },

]

sad = [
    {
        "id": 1,
        "genre": "sad",
        "url": "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1?si=219faf953fb542c8",
    },
    {
        "id": 2,
        "genre": "sad",
        "url": "https://open.spotify.com/playlist/5I9As02pKBVN1kONkCX71l?si=2c20c20370104394",
    },
    {
        "id": 3,
        "genre": "sad",
        "url": "https://open.spotify.com/playlist/69fQr3TyOSjcq9Doei86I7?si=74423ee8f1cc45c0",
    },
    {
        "id": 4,
        "genre": "sad",
        "url": "https://open.spotify.com/playlist/2V54AkhxCDLeORKeBtDZGr?si=2ea29e7ba0584095",
    },

]

good = [
    {
        "id": 1,
        "genre": "good",
        "url": "https://open.spotify.com/playlist/5zeiXWuSLl4tVhJ1KO1RoY?si=ac19352109b5475f",
    },
    {
        "id": 2,
        "genre": "good",
        "url": "https://open.spotify.com/playlist/37i9dQZF1DWURugcFfOfEH?si=5f3a19d0990d404e",
    },
    {
        "id": 3,
        "genre": "good",
        "url": "https://open.spotify.com/playlist/37i9dQZF1DX0b1hHYQtJjp?si=d75697edf8d846ca",
    },
    {
        "id": 4,
        "genre": "good",
        "url": "https://open.spotify.com/playlist/3IBrsav3Sh8AImtaGoaP07?si=919e3e2a51a847a1",
    },

]

happy = [
    {
        "id": 1,
        "genre": "happy",
        "url": "https://open.spotify.com/playlist/37i9dQZF1DWVlYsZJXqdym?si=28bd3a4d838248e5",
    },
    {
        "id": 2,
        "genre": "happy",
        "url": "https://open.spotify.com/playlist/37i9dQZF1DWSf2RDTDayIx?si=90a07e76b7eb473d",
    },
    {
        "id": 3,
        "genre": "happy",
        "url": "https://open.spotify.com/playlist/37i9dQZF1DX9u7XXOp0l5L?si=686b9b3054124479",
    },
    {
        "id": 4,
        "genre": "happy",
        "url": "https://open.spotify.com/playlist/0RH319xCjeU8VyTSqCF6M4?si=55862361e7234244",
    },

]

import flask
from flask import request, jsonify
import random

app = flask.Flask(__name__)
# app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return '''<h1>Spotify Mood API</h1></p>'''

@app.route('/periodCramp', methods=['GET'])
def api_pd():
    results = []
    r = random.randint(1,4)
    for pdc in period_cramps:
        if pdc['id'] == r:
            results.append(pdc)

    # Use the jsonify function from Flask to convert our list of
    # Python dictionaries to the JSON format.
    return jsonify(results)

@app.route('/sad', methods=['GET'])
def api_sad():
    results = []
    r = random.randint(1,4)
    for sd in sad:
        if sd['id'] == r:
            results.append(sd)

    # Use the jsonify function from Flask to convert our list of
    # Python dictionaries to the JSON format.
    return jsonify(results)

@app.route('/good', methods=['GET'])
def api_good():
    results = []
    r = random.randint(1,4)
    for gd in good:
        if gd['id'] == r:
            results.append(gd)

    # Use the jsonify function from Flask to convert our list of
    # Python dictionaries to the JSON format.
    return jsonify(results)

@app.route('/happy', methods=['GET'])
def api_hpy():
    results = []
    r = random.randint(1,4)
    for hpy in happy:
        if hpy['id'] == r:
            results.append(hpy)

    # Use the jsonify function from Flask to convert our list of
    # Python dictionaries to the JSON format.
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug = True, use_reloader=False)
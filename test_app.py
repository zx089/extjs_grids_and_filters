from flask import Flask, render_template, jsonify

import json

app = Flask(__name__)
app.static_folder = 'static'

@app.route('/')
def hello_world():
    return render_template('main.html')

@app.route('/get_cities')
def get_cities():
	cities_data = read_json_file('russian-cities.json')

	total_count = len(cities_data)
	res = {'data': cities_data, 'totalCount': total_count}
	return jsonify(res)


def read_json_file(filename):
	with open(filename, 'r') as f:
		datastore = json.load(f)
	return datastore


if __name__ == '__main__':
    app.run()
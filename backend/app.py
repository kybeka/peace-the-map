from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This allows cross-origin requests, necessary for communication between frontend and backend

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///markers.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Marker(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    message = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def serialize(self):
        return {
            'id': self.id,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'message': self.message,
            'created_at': self.created_at.isoformat()
        }

# Create the database and the tables within the application context
with app.app_context():
    db.create_all()

@app.route('/markers', methods=['POST'])
def add_marker():
    data = request.json
    new_marker = Marker(latitude=data['latitude'], longitude=data['longitude'], message=data['message'])
    db.session.add(new_marker)
    db.session.commit()
    return jsonify(new_marker.serialize())

@app.route('/markers', methods=['GET'])
def get_markers():
    markers = Marker.query.all()
    return jsonify([marker.serialize() for marker in markers])

if __name__ == '__main__':
    app.run(debug=True)

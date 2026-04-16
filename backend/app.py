from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# ---------- DB ----------
def init_db():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phone TEXT,
        event TEXT
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        password TEXT,
        role TEXT
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT
    )
    ''')

    conn.commit()
    conn.close()

init_db()

# ---------- REGISTER ----------
@app.route("/register-event", methods=["POST"])
def register_event():
    data = request.json

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO registrations (name, email, phone, event) VALUES (?, ?, ?, ?)",
        (data["name"], data["email"], data["phone"], data["event"])
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Registered successfully"})

# ---------- GET REGISTRATIONS ----------
@app.route("/get-registrations", methods=["GET"])
def get_data():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM registrations")
    data = cursor.fetchall()

    conn.close()
    return jsonify(data)

# ---------- ADD EVENT ----------
@app.route("/add-event", methods=["POST"])
def add_event():
    data = request.json

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("INSERT INTO events (name, description) VALUES (?, ?)",
                   (data["name"], data["description"]))

    conn.commit()
    conn.close()

    return jsonify({"message": "Event added"})

# ---------- GET EVENTS ----------
@app.route("/get-events", methods=["GET"])
def get_events():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM events")
    data = cursor.fetchall()

    conn.close()
    return jsonify(data)

# ---------- LOGIN ----------
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email=? AND password=?",
                   (data["email"], data["password"]))
    user = cursor.fetchone()

    conn.close()

    if user:
        return jsonify({"role": user[4]})
    return jsonify({"message": "Invalid"}), 401

# ---------- CREATE ADMIN ----------
@app.route("/create-admin")
def create_admin():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
                   ("Admin", "admin@gmail.com", "admin123", "admin"))

    conn.commit()
    conn.close()

    return "Admin created"

# ---------- RUN ----------
if __name__ == "__main__":
    app.run(debug=True)
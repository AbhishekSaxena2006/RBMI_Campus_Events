from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# ---------- DB ----------
def init_db():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    # users table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        password TEXT
    )
    ''')

    # registrations table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phone TEXT,
        event TEXT
    )
    ''')

    # events table
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

# ---------- SIGNUP ----------
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO users (name,email,password) VALUES (?,?,?)",
        (data["name"], data["email"], data["password"])
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Signup success"})


# ---------- LOGIN ----------
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email=? AND password=?",
        (data["email"], data["password"])
    )

    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({"message": "Login success"})
    else:
        return jsonify({"message": "Invalid credentials"}), 401


# ---------- REGISTER EVENT ----------
@app.route("/register-event", methods=["POST"])
def register_event():
    data = request.json

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO registrations (name,email,phone,event) VALUES (?,?,?,?)",
        (data["name"], data["email"], data["phone"], data["event"])
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Registered successfully"})


# ---------- GET REGISTRATIONS ----------
@app.route("/get-registrations")
def get_registrations():
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

    cursor.execute(
        "INSERT INTO events (name, description) VALUES (?, ?)",
        (data["name"], data["description"])
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Event added"})


# ---------- GET EVENTS ----------
@app.route("/get-events")
def get_events():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM events")
    data = cursor.fetchall()

    conn.close()
    return jsonify(data)


# ---------- DELETE EVENT ----------
@app.route("/delete-event/<int:id>", methods=["DELETE"])
def delete_event(id):
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("DELETE FROM events WHERE id=?", (id,))

    conn.commit()
    conn.close()

    return jsonify({"message": "Event deleted"})


# ---------- RUN -----------
if __name__ == "__main__":
    app.run(debug=True)
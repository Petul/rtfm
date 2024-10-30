import psycopg2
from psycopg2.extras import execute_values
import json

def insert_to_db(data, cursor):
    for key in data:
        q = "INSERT INTO pages (name, section, description) VALUES (%s, %s, %s)"
        cursor.execute(q, (key, data[key]["section"], data[key]["description"]))

if __name__ == '__main__':
    f = open("db.json")
    data = json.load(f)
    conn = psycopg2.connect(
        dbname='rtfmdb',
        user='youruser',
        password='yourpassword',
        host='localhost',
        port=5432)
    cursor = conn.cursor()
    insert_to_db(data, cursor)
    cursor.close()
    conn.commit()
    conn.close()


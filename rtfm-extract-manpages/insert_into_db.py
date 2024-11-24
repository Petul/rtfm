import psycopg2
from psycopg2.extras import execute_values
import json

def insert_to_db(data, cursor):
    for key in data:
        q = "INSERT INTO pages (name, section, description, html_content) VALUES (%s, %s, %s, %s)"
        cursor.execute(q, (key, data[key]["section"], data[key]["description"], data[key]["html_content"]))

if __name__ == '__main__':
    f = open("db2.json")
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


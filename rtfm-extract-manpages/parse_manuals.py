#!/usr/bin/env python3

import subprocess
import json
import sys
from bs4 import BeautifulSoup

MANTOHTML_PATH = "./mantohtml/mantohtml"

def get_description(page_name, section):
    out = subprocess.run(["whatis", "-e", page_name], capture_output=True, encoding="utf-8") 
    results = out.stdout.split("\n")
    for line in results:
        line = line.split()
        page = line[0]
        section2 = line[1].strip("()")
        description = " ".join(line[3:])
        if (page_name == page and section == section2):
            return(description)
    return ("Description missing")

def parse_page_to_db(db, raw_page):
    soup = BeautifulSoup(raw_page, "html.parser")
    title = soup.h1
    if (title == None):
        return
    title = title.attrs['id'].split('-')
    section = title[1]
    int(section[0]) #check that first character is an integer
    title = title[0]
    description = get_description(title, section)
    db[title] = {"section": section, "description": description, "html_content": raw_page}

def read_pages(db, pages_list):
    for page in pages_list: 
        try:
            if page[-3:] != ".gz":
                raise Exception("Already decompressed")
            unzip = subprocess.run(["gunzip", "-c", page], stdout=subprocess.PIPE, text=True)
            out = subprocess.run([MANTOHTML_PATH, "--skip-header", "--stdin"], input=unzip.stdout, text=True, capture_output=True, encoding="utf-8")
            parse_page_to_db(db, out.stdout)
        except Exception as e:
            print(f"Failed to parse page {page}: {e}", file=sys.stderr)

def get_pages(page_path):
    regex_string = ".*/[a-z]+\\.[0-9].*"
    out = subprocess.run(["find", page_path, "-regex", regex_string],
                         capture_output=True, encoding="utf-8")
    out = out.stdout.split("\n")
    return (out)

if __name__ == '__main__':
    db = {}
    pages_dir = '/usr/share/man'
    pages_list = get_pages(pages_dir)
    read_pages(db, pages_list)
    obj = json.dumps(db)
    print(obj)
    

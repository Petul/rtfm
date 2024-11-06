#!/usr/bin/env python3

import subprocess
import json
import sys

def parse_line_info(line, db):
    try:
        line = line.split()
        page = line[0]
        section = line[1].strip("()")
        description = " ".join(line[3:])
        db[page] = {"section": section, "description": description}
    except:
        sys.stderr.write(f"Failed to parse line: {line}")


if __name__ == '__main__':
    out = subprocess.run(["man", "-k", "."], capture_output=True, encoding='utf-8')
    db = {}
    for l in out.stdout.split('\n'):
        parse_line_info(l, db)
    obj = json.dumps(db)
    print(obj)

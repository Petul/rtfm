#!/bin/bash

SUBDIR=mandb
PAGES=$(man -k . | awk '{ print $1 }' | xargs)

for PAGE in $PAGES
do
	CMD="man --html=cat $PAGE > ${SUBDIR}/${PAGE}.html"
	eval "$CMD" &
done

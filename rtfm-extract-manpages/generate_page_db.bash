#!/bin/bash

SUBDIR=$1
if [[ -z $SUBDIR ]]
then
	echo "Please enter a path for the generated pages"
	exit 1
fi

PAGES=$(man -k . | awk '{ print $1 }' | xargs)

for PAGE in $PAGES
do
	CMD="man --html=cat $PAGE > ${SUBDIR}/${PAGE}.html"
	eval "$CMD" &
done

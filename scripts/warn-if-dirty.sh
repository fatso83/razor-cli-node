#!/bin/bash
if (( $(git status --porcelain | wc -l) != 0)) ; then 
    echo "The repository is dirty"
    echo "Exiting to prevent further damage"
    exit 1
fi

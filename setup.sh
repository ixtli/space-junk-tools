#!/bin/bash

git submodule init
git submodule update
cd jquery
npm install
grunt custom:-exports/global

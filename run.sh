#!/bin/bash
npx tailwindcss -i ./main.css -o ./dist/main.css --watch &
npx tailwindcss -i ./blog.css -o ./dist/blog.css --watch &
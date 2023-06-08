#!/bin/bash
npx tailwindcss -i ./main.css -o ./dist/main.css --watch &
disown
npx tailwindcss -i ./blog.css -o ./dist/blog.css --watch &
disown
npx tailwindcss -i ./post.css -o ./dist/post.css --watch &
disown
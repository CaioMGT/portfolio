REM I don't know enough batch to convert this over to the new deploy commands lol
START "Main Page" npx tailwindcss -i ./main.css -o ./dist/main.css --watch
START "Main Page" npx tailwindcss -i ./blog.css -o ./dist/blog.css --watch
START "Main Page" npx tailwindcss -i ./post.css -o ./dist/post.css --watch
REM I don't know enough batch to convert this over to the new deploy commands lol
START "Main Page" npx tailwindcss -i ./styles.css -o ./dist/styles.css --watch
START "404 Page" npx tailwindcss -i ./nopage.css -o ./dist/nopage.css --watch
START "Portfolio" npx tailwindcss -i ./portfolio.css -o ./dist/portfolio.css --watch
START "Laptob" npx tailwindcss -i ./laptob.css -o ./dist/laptob.css --watch
START "Troy redirect" npx tailwindcss -i ./troy.css -o ./dist/troy.css --watch
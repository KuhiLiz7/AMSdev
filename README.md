# This repository contains apartment management system API build with nodejs,express,mongodb

- Apartment management system is an application for managing apartment/user's data. This branch contains the backend code supporting the application. This includes the API,database intergrations and security measures.

## WE ARE USING THE MVC(model,view,controller) SOFTWARE ARCHITECTURE DESIGN

- If you are running on windows machine,setting environment variables manually using scripts of even in the terminal will not work. On linux or Unix it will work smoothly.

  `"scripts": {
"start": "node --watch server.js",
"start:prod": "NODE_ENV=production node  --watch server.js"
}`

---

### Quick fix

- [1] Install cross-env package globally or on that project (in this case pnpm)
  `pnpm add cross-env --save-dev
pnpm add -g cross-env`

- [2] Edit the script start:prod to
  `"scripts": {
"start": "node --watch server.js",
"start:prod": "cross-env NODE_ENV=production node  --watch server.js"
}`

-[3] run pnpm run start:prod

- For custom cmd/shell cmd you can also use the same flag cross-env NODE_ENV='you-env'

## Setup (Node Express Typescript)

1. tsc --init (es6, outDir - /dist, rootDir - /src, moduleResolution: node)
2. npm init -y
3. npm i express
4. npm i -D typescript ts-node nodemon @types/node @types/express (dev dependency)
5. add these scripts to package.json:

  ```
  "start": "node dist/app.js",
  "dev": "nodemon src/app.ts",
  "build": "tsc -p ."
  ```
6. npm run dev


## Stuff
1. For importing few static files in nodejs
```
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
```
2. For multiple static imports in nodejs
```
app.use(express.static(path.join(__dirname, '../public')))
```

![alt_img](https://i.imgur.com/VUj4A28.png)

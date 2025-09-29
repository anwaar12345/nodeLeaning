import fs from "fs";
const routes = (req, res) => {

  if(req.url == '/test')
  {
    if(req.method == "GET"){
    console.log('test');
     res.write(`<!DOCTYPE html>
      <html>
      <head>
        <title>Simple Form</title>
      </head>
      <body>
        <h2>Login Form</h2>
        <form action="/chunk" method="POST">
          <label>Username:</label>
          <input type="text" name="username" required>
          <br><br>

          <label>Password:</label>
          <input type="password" name="password" required>
          <br><br>

          <button type="submit">Login</button>
        </form>
      </body>
      </html>
  `);
   }
  }
//    if(req.url == '/chunk'){
//     console.log('first');
//     const body = [];
//       req.on('data', (chunk) => {
//         console.log('second')
//         body.push(chunk);
//       });
//       req.on('end', () => {
//         const fullbody = Buffer.concat(body).toString();
//         const params = new URLSearchParams(fullbody);
//         const bodyObj = Object.fromEntries(params);
//         fs.writeFileSync("wow.txt",JSON.stringify(bodyObj));
//         console.log('third')
//       }); 
//    }
//    console.log('fourth')
//   res.end();
  if(req.url == "/sequence"){
   console.log('one');
 
 Promise.resolve().then(() => console.log('two'));

 setInterval(()=>console.log('three'),2000)
 setTimeout(()=>console.log('four'),2000)
 fs.readFile('wow.txt', () => console.log('I/O operation five'));
 setImmediate(() => console.log('immediate'));
 process.on('exist',(code)=> console.log('last'))
}
}



export default routes;
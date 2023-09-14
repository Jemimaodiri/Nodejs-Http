import http, { IncomingMessage, ServerResponse } from "http";
import os from 'os'
const Port: Number = 2000;
const Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.writeHead(200);
    res.write("Server Is Up And Running");


    const Browser = req.rawHeaders[7].split(",")[2];
    const Device = req.rawHeaders[11];
    const Post= req.rawHeaders[6]
    console.log(Browser)
    console.log(Post);
   
    if (res ) {
      res.write(`\nYou Are Using Browser ${Browser} on ${Device}to access me`);
      res.end();
    }else{
          
    }
//     res.end()
  }
);

Server.listen(Port, () => {
  console.log("Listening on port:", Port);
});

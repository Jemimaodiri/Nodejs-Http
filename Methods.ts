import http, { IncomingMessage, ServerResponse } from 'http';

const port:number=4202;

interface iMessage{
         message:string;
         data:null| {}|{}[]
         success:boolean
}
interface iData{
      name:string;
      category:string;
      gender:string;

}
const Data:iData[]=[
         {
               name:'Joan',
               category:'Front-end',
               gender:'Female',   
         },
         {
               name:'Regina',
               category:'Back-end',
               gender:'Female',   
         },
         {
               name:'Jessica',
               category:'Back-end',
               gender:'Female',   
         }
]
const Server=http.createServer((req:IncomingMessage,res:ServerResponse<IncomingMessage>)=>{
         res.setHeader('Content-Type', 'application/json');
         const {url,method}=req
         let Status:number=404;
         let Response:iMessage={
                  message: 'Failed',
                  data: null,
                  success: false
         }
         const Container:any=[];
         req.on('data',(chunk:any)=>{
Container.push(chunk);
         }).on('end',()=>{
                  
                  if (url==='/' && method==='GET'){ 
                           Status=200;
                           Response.message='Success getting data';
                           Response.success=true;
                           Response.data=Data;
                           res.write(JSON.stringify({Status,Response}))
                           res.end();
                  }
                  if (url==='/' && method==='POST'){ 
                           Status=201;
                           const body = JSON.parse(Container)
                           Data.push(body)
                           Response.message='Success getting data';
                           Response.success=true;
                           Response.data=Data;
                           res.write(JSON.stringify({Status,Response}))
                           res.end();
                  }
         })
})
Server.listen(port,()=>{
         console.log('Server listening on port',port)
})
import http, { IncomingMessage, ServerResponse, request } from 'http';
const Port:number=2100;
interface iMessage{
         message:string;
         data:null|{}|{}[]
         success:boolean
}
interface iData{
         id:number
         name:string
         category:string
         age:number
}
let Student:iData[]=[
         {
                  id:1,
                  name:'Ayomide',
                  category:'Back-end',
                  age:19
         },
         {
                  id:2,
                  name:'Prince',
                  category:'Front-end',
                  age:21
         },
]
const Server=http.createServer((req:IncomingMessage,res:ServerResponse<IncomingMessage>)=>{
res.setHeader('Content-Type', 'application/json');
const {method,url}=req
let Status:number=404;
let Response:iMessage={
message:'Invalid',
data:null,
success:false
}
const contain:any=[]
req.on('data',(chunk:any)=>{
         contain.push(chunk)
}).on('end',()=>{
         if (url==='/' && method==='GET') {
                  Status=200;
                  Response.message='Success data of codelab student';
                  Response.data=Student
                  res.write(JSON.stringify({Status,Response}))
                  res.end()
         }

         if (url==='/' && method==='POST') {
                  Status=201;
                  const body=JSON.parse(contain)
                  Student.push(body)
                  Response.message='Success creating data of another codelab student';
                  Response.data=Student
                  Response.success=true
                  res.write(JSON.stringify({Status,Response}))
                  res.end()
         }
})
})
         
Server.listen(Port,()=>{
         console.log('listening on port',Port)
})

import http, { IncomingMessage, ServerResponse } from 'http'
const port:number=1300;

interface iMessage{
         message:string;
         sucess:boolean;
         data:null| {}| {}[]
}
interface iDetail{
         name:string;
         prepost:string
         experience:string
}
const detail:iDetail[]=[
         {
                  name:'Exper',
                  prepost:'gateman',
                  experience:'5years'
         },
         {
                  name:'Exper',
                  prepost:'gateman',
                  experience:'5years'
         }
]
const Server=http.createServer((req:IncomingMessage,res:ServerResponse<IncomingMessage>)=>{
         res.setHeader('Content-Type', 'application/json')
         const {method,url}=req
         let Status:number=404;
         let Response:iMessage={
                  message:'Failed',
                  sucess:false,
                  data:null,
         }
         const Contain:any=[]
         req.on('data',(chunk:any)=>{
                  Contain.push(chunk)
         }).on('end',()=>{
                
                  if (url==='/' && method==='GET') {
                           Status=200;
                           Response.message='Gotten';
                           Response.sucess=true;
                           Response.data=detail;

                           res.write(JSON.stringify({Status,Response}))
                           res.end()
                  }
                
                  if (url==='/' && method==='POST') {
                           Status=201;
                           const body=JSON.parse(Contain)
                           detail.push(body);
                           Response.message='created successfully';
                           Response.sucess=true;
                           Response.data=detail;
                           res.write(JSON.stringify({Status,Response}))
                           res.end()
                  }

         })
}) 
Server.listen(port,()=>{
         console.log('Server listening on port',port)
})
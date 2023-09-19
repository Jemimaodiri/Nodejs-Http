import http, { IncomingMessage, ServerResponse } from 'http'

const Port:number=6000;

interface iMessage{
         message:string;
         data:null|[]| {}[]
         success:boolean;
}
interface iData{
         name:string;
         age:number;
}
const Person:iData[]=[
         {
                  name:'John',
                  age:55
         }
]
const Server=http.createServer((req:IncomingMessage,res:ServerResponse<IncomingMessage>)=>{
         res.setHeader('Content-Type', 'application/json');

         const {method,url}=req;
         let Status:number=404;
         let Respond:iMessage={
                  message:'Failed',
                  data:null,
                  success:false
         }
         const Container:any=[]
         req.on('data',(chunk:any)=>{
                  Container.push(chunk)
         }).on('end',()=>{


         if (url==='/' && method==='GET') {
                  Status=200;
                  Respond.message='Success getting data'
                  Respond.success=true;
                  Respond.data=Person;
                 res.write(JSON.stringify({Status,Respond}))
                  res.end();


         }
         if (url==='/' && method==='POST') {
                  Status=201;
                  const body=JSON.parse(Container)
                  Person.push(body)
                  Respond.message='Success in creating';
                  Respond.success=true;
                  Respond.data=Person;
                  res.write(JSON.stringify({Respond,Status}))
                  res.end()
         }
         })

})
Server.listen(Port,()=>{
         console.log('listening on port',Port)
})
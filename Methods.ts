import http, { IncomingMessage, ServerResponse } from 'http'
const Port:number=2500;
interface iMsg{
         message:string;
         data:null| []| {}[]
         success:boolean
}
interface iData{
         name:string
         class:string
         teacher:string
}
const Students:iData[]=[
         {
                  name:'Adeola',
                  class:'Jss2 ',
                  teacher:'Mr Bubemi'
         }
]
const MyServer=http.createServer((req:IncomingMessage,res:ServerResponse<IncomingMessage>)=>{
         res.setHeader('Content-Type','Application/json');
 const {method,url}=req;

 let status:number=404;

 let Response:iMsg={
         message:'Failed Operation',
         data:null,
         success:false
 }
 const Container:any=[]
 req.on('data',(chunk:any)=>{
         Container.push(chunk);
 }).on('end',()=>{
         if (url==='/' && method=== 'GET') {
status=200;
        Response.message='Success Getting a student data'
        Response.success=true;
        Response.data=Students;
        res.write(JSON.stringify({Response,status}))
        res.end()
         }
         if (url==='/' && method=== 'POST') {
status=201;
const body=JSON.parse(Container)
Students.push(body)
        Response.message='Success adding a student data'
        Response.success=true;
        Response.data=Students;
        res.write(JSON.stringify({Response,status}))
        res.end()
         }
 })

})
MyServer.listen(Port,()=>{
         console.clear()
         console.log('listening on port number',Port)
})
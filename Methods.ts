import http, { IncomingMessage, ServerResponse } from 'http'
const port:number=4000;
interface iMessage{
         message:string;
         data:null | {}|{}[];
         success:boolean;
}
interface iArrayemp{
         name:string;
         age:number;
         height:string;
         phone:number;
}
let ArrOfEmployees:iArrayemp[]=[
         {
       name:'Ade',
       age:22,
       height:'6,2',
       phone:2533428109
         },
         {
       name:'Amidat',
       age:19,
       height:'5,4',
       phone:449900221345
         }

]
const MyServer=http.createServer((req:IncomingMessage,res:ServerResponse<IncomingMessage>)=>{
         res.setHeader('Content-Type', 'application/json')
         const {method,url}=req;
         let Status:number=404;
         let Res:iMessage={
                 message:'Failde Operation',
                 success:false,
                 data:null
         }
         const Container:any=[];
         req.on('data',(chunk:any)=>{
                  Container.push(chunk);
         }).on('end',()=>{
                  
                  if (url==='/' && method==='GET') {
                           Status=200;
                           Res.message='Data of Employess Gotten',
                           Res.success=true;
                           Res.data=ArrOfEmployees
                           res.write(JSON.stringify({Res,Status}))
                           res.end()
                  }
                  if (url==='/' && method==='POST') {
                           const body=JSON.parse(Container)
                           ArrOfEmployees.push(body)
                           Status=201;
                           Res.message='Added Successfully'
                           Res.success=true;
                           Res.data=ArrOfEmployees;
                           res.write(JSON.stringify({Res,Status}));
                           res.end()
                  }
         })

})
MyServer.listen(port,()=>{
         console.log("Server listening on port number",port)
})
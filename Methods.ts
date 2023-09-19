import http, { IncomingMessage, ServerResponse } from 'http';
const Port:number=3700;
interface iMessage{
         message:string;
         data:null|any| {}|{}[]
         success:boolean
}
interface iData{
         name:string
         school:string
         gender:string
}
let Id:iData[]=[
         {
                  name:'Amen',
                  school:'AmenIntlsch',
                  gender:'male'
         },
         {
                  name:'Glory',
                  school:'GloryIntlsch',
                  gender:'female'
         }
]
const Server=http.createServer((req:IncomingMessage,res:ServerResponse<IncomingMessage>)=>{
         res.setHeader('Content-Type', 'application/json');
         const {method,url}=req
         const Contain:any=[]
         res.on('data',(chunk:any)=>{
                  Contain.push(chunk)
         }).on('end',()=>{
                  let Status:number=404;
                  let Return:iMessage={
                           message:'Failed',
                           success:true,
                           data:Id
                  }
                
                  if (url==='/' && method==='GET') {
                           Status=200;
                           Return.message='Success',
                           Return.success=true,
                           Return.data=Id
                           res.write(JSON.stringify({Status,Return}));
                           res.end();
                  }
                  if (url==='/' && method==='POST') {
                           Status=201;
                           const body=JSON.parse(Contain)
                           Id.push(body)
                           Return.message='Created',
                           Return.success=true,
                           Return.data=Id
                           res.write(JSON.stringify({Status,Return}));
                           res.end();
                  }
         })

});
Server.listen(Port,()=>{
         console.log('listening on port',Port)
})
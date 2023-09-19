import http, { IncomingMessage, ServerResponse } from 'http'
const port:number=1212;

interface iMessage{
         message:string;
         data:null| {}| {}[];
         success:boolean;
}
interface iData{
         name:string;
         age:number;
         color:string;
}
const Data:iData[]=[
         {
                  name:'helen',
                  age:20,
                  color:'black',
         },
         {
                  name:'helarry',
                  age:23,
                  color:'purple',
         }
]
const Server=http.createServer((req:IncomingMessage,
         res:ServerResponse<IncomingMessage>)=>{

                  const {url,method}=req
                 let Status:number=404;
                  const Response:iMessage={
                           message:'Failed',
                           success:false,
                           data:null,
                  }
                  const Container:any=[]
                  req.on('data',(chunk:any)=>{
                  Container.push(chunk)
                  }).on('end',()=>{

                           if (url==='/' && method==='GET') {
                                    Status=200;
                                    Response.message='Succes'
                                    Response.success=true;
                                    Response.data=Data
                                    res.write(JSON.stringify({Status,Response}))
                                    res.end()
                           }
                           if (url==='/' && method==='POST') {
                                    Status=201;
                                    const body=JSON.parse(Container)
                                    Data.push(body)
                                    Response.message='created'
                                    Response.success=true;
                                    Response.data=Data
                                    res.write(JSON.stringify({Status,Response}))
                                    res.end()
                           }
                  })
})
Server.listen(port,()=>{
         console.log('Listening on port',port)
})
import http from "http"; 
import app from "../dist/app"; 
const port = 4000; 
const server = http.createServer(app); 
server.listen(port); 

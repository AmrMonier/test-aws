
import express from 'express';
import cors from "cors";
import sum from "./module.js";

//import routes from './routes';

class Server {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  
  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }
  
  routes() {
    //this.server.use(routes);
    this.server.get("/", (req, res, next) => {
      res.json({ msg: "Hello" + sum(5,7) });
    });
  }
}
const PORT = process.env.PORT || 3000;

let x =  new Server().server;
x.listen(PORT, () => {
  console.log(`APP Running on ${PORT}`);
});
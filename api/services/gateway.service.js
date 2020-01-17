const { ServiceBroker } = require("moleculer");
const HTTPServer = require("moleculer-web");
const pino = require("pino")({ level: "info" });

const brokerNode1 = new ServiceBroker({
  nodeID: "node-1",
  transporter: "NATS",
  logger: bindings => pino.child(bindings)
});

brokerNode1.createService({
  name: "gateway",

  mixins: [HTTPServer],

  settings: {
    routes: [
      {
        aliases: {
          // When the "GET /products" request is made the "listProducts" action of "products" service is executed
          "GET /products": "products.listProducts",
          "POST /products": "products.addProducts",
          "GET /users": "users.listUsers",
          "POST /users": "users.addUser",
          "GET /hello": "gateway.sayHello"
        }
      }
    ]
  },

  actions: {
      sayHello(ctx){
          return {
              message: "Hello",
          }
      }
  }
});

module.exports = brokerNode1.start();
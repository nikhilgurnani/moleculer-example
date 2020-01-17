const {ServiceBroker} = require('moleculer');
const {DbService} = require('./../mixins');
const {Products} = require('../libs/models');
const Fakerator = require("fakerator");
const fake = new Fakerator();
const pino = require("pino")({ level: "info" });

const brokerNode2 = new ServiceBroker({
    nodeID: "node-2",
    transporter: "NATS",
    logger: bindings => pino.child(bindings)
  });

brokerNode2.createService({
    name: "products",

    mixins: [DbService(Products)],

    actions: {
        async listProducts(ctx) {
            return this.adapter.find({});
        },

        async addProducts(ctx){
            return this.validateEntity(ctx.params)
                .then(() => {
                    return this.adapter.insert(ctx.params);
                });
        }
    },

    methods: {
		seedDB() {
			return Promise.resolve()
				.then(() => this.adapter.insert({
					name: fake.random.string(5),
				}))
				.then(products => {
					this.logger.info(`Generated products!`);
				});
		}
	},

	afterConnected() {
		return this.adapter.count().then(count => {
			if (count == 0) {
				this.seedDB();
			}
		});
	}
});

module.exports = brokerNode2.start();

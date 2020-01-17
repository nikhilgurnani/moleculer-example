const {ServiceBroker} = require('moleculer');
const {DbService} = require('./../mixins');
const {Users} = require('../libs/models');
const Fakerator = require("fakerator");
const fake = new Fakerator();
const pino = require("pino")({ level: "info" });

// Define nodeID and set the communication bus
const brokerNode2 = new ServiceBroker({
    nodeID: "node-3",

    transporter: "NATS",

    logger: bindings => pino.child(bindings)
  });


brokerNode2.createService({
    name: "users",

    mixins: [DbService(Users)],

    actions: {
        // Define service action that returns the available products
        async listUsers(ctx) {
            return this.adapter.find({});
        },
        async addUser(ctx){
            return this.validateEntity(ctx.params)
                .then(() => {
                    return this.adapter.insert(ctx.params);
                });
        }
    },

    methods: {
		seedDB() {
			return Promise.resolve()
				.then(() => {
                    let data = [];
                    for (let i = 0; i < 50; i++){
                        data.push({
                            name: fake.names.nameM(5),
                            email: fake.internet.email(),
                            phone: fake.phone.number(),
                            displayPicture: fake.internet.avatar(),
                        });
                    }
                    this.adapter.insertMany(data)})
				.then(users => {
					this.logger.info(`Generated Users!`);
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

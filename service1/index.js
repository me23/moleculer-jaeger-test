const moleculer = require('moleculer');

const broker = new moleculer.ServiceBroker({
	internalServices: false,
	transporter: {
		type: "AMQP",
		options: {
			url: process.env.AMQP_URL,
			eventTimeToLive: 5000,
			prefetch: 1,
			socketOptions: {
				noDelay: true,
			},
			autoDeleteQueues: true,
		},
	},
	tracing: {
		enabled: true,
		stackTrace: true,
		exporter: [
		  {
			type: "Jaeger",
			options: {
			  endpoint: process.env.JAEGER,
			  sampler: {
				type: "const",
				options: {
				},
			  },
			  tracerOptions: {
			  },
			},
		  },
		],
	},
});

broker.createService({
	name: 'service1',
	actions: {
		ping(ctx) {
			return new Promise((resolve) => {
				ctx.call('service2.ping')
					.then( (res) => {
						resolve( {service1: res} );
					});
			});
		}
	}
})

broker.start()
	.then(() => {
		console.log('service1 started');

		//broker.call('service1.ping'); //<= called locally works

	});
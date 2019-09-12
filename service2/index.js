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
	name: 'service2',
	actions: {
		ping(ctx) {
			return Promise.resolve({service2: 'pong'});
		}
	}
})

broker.start()
	.then(() => {
		console.log('service2 started');

		//broker.call('service2.ping'); //<= called locally works

	});
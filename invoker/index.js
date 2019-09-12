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

broker.start()
	.then(() => {
		console.log('invoker started');
		setTimeout(() => {
			broker.call('service1.ping')
				.then((res) => {
					console.log(res)
				});
		}, 15000);

	});
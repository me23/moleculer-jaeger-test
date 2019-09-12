# moleculer-jaeger-test
repo to reproduce a bug: Tracing from moleculer to jaeger does not work remotely for moleculer 0.14-beta

run `docker-compose up`

and browse to the jaeger-gui `http://localhost:16686` 

after 15 seconds invoker should call service1 but this is not exported to jaeger...

But calling the service locally works:

uncommented the follwoing lines in service1 and service2 (index.js)

`//broker.call('service1.ping'); //<= called locally works`

and then restart with `docker-compose up --build`

after both services are up running, you should see 2 traces in jaeger...

'use strict';
const
    cluster=require('cluster'),
    fs = require('fs'),
    zmq = require('zmq');

if(cluster.isMaster){
    let
        router = zmq.socket('router').bind('tcp://127.0.0.1:5433'),
        dealer = zmq.socket('dealer').bind('tcp://127.0.0.1:5432');

    router.on('message', function(){
        let frames = Array.prototype.slice.call(arguments);
        dealer.send(frames);
    });

    dealer.on('message', function(){
        let frames = Array.prototype.slice.call(arguments);
        router.send(frames);
    });

    cluster.on('online', function(worker){
        console.log('Worker '+worker.process.pid + ' is online.');
    });

    //fork 3 worker processes
    for(let i=0; i<3; i++){
        cluster.fork();
    }
}else{

    //worker process - create REP scoket, connect to DEALER
    let responder = zmq.socket('rep').connect('tcp://127.0.0.1:5432');

    responder.on('message',function(data){
        let request = JSON.parse(data);
        console.log(process.pid + ' received request for: ' +request.path);

        // read file and reply with content
       fs.readFile(request.path, function(err, data){
            console.log(process.pid + ' sending response.');
            responder.send(JSON.stringify({
                pid: process.pid,
                data: data.toString(),
                timestamp: Date.now()
            }));
       });
    });


}

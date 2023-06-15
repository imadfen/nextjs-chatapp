import { Socket } from "socket.io";
// const { MongoClient } = require('mongodb');
const io = require('socket.io')(5000, {
  cors: {
    origin: ["http://localhost:3000"]
  }
});


// const client = new MongoClient('<mongodb_connection_string>', { useUnifiedTopology: true });
// const collectionName = '<your_collection_name>';


// io.on('connection', (socket: Socket) => {
//   console.log('Client connected');

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// server.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });








// const runChangeStream = async () => {
//   await client.connect();

//   const collection = client.db().collection(collectionName);
//   const changeStream = collection.watch();

//   changeStream.on('change', (change: string) => {
//     // Emit the change to connected clients
//     io.emit('dataChange', change);
//   });
// };

// runChangeStream().catch(console.error);

console.log("server started");


io.on('connection', (socket: Socket) => {
  console.log(socket.id);
})
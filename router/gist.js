import Router from 'koa-router';
import share from '../db';
import uuid from 'uuid/v1';


const router = new Router();

let rooms = [];

function getIdByDocName(arr, docName) {
  if(arr.length == 0) {
    return null;
  }
  else {
    for(var i=0; i<arr.length; i++) {
      var tmp = arr[i];
      if(tmp.name == docName) {
        return tmp.id;
      }
    }
    return null;
  }
}

async function newGist(name) {
  var roomName = name || null;
  const id = uuid();
  const time = new Date().toDateString();
  const conn = share.connect();
  const doc = conn.get(roomName, id);
  await new Promise( (resolve, reject) => {
    doc.create({
      "code": "# welcome to online code editor...\n# room name: "+roomName+"\n# create time: "+time+"\n\n",
    }, function(err) {
      if (err) reject(err);
      rooms.push({id: id, name: roomName});
      resolve();
    }); 
  });
  console.log("created a new gist:", id, roomName);
  return id;
}

// For testing only
// newGist("官方房间");

// Gists
router.post('/gists/new', async (ctx) => {
  let ctxBody = ctx.request.body;
  console.log('print ctx:', ctx.request.body);
  const id = await newGist(ctxBody.name);
  console.log('rooms: ', rooms);
  ctx.body = {id: id, name: ctxBody.name}; 
});

router.get('/gists/room', async (ctx) => {
  let roomName = ctx.query.name;
  const id = getIdByDocName(rooms, roomName);
  ctx.body = {id: id, name: roomName};
});

router.get('/gists/roomlist', async (ctx) => {
  ctx.body = {rooms: rooms};
  console.log("get a get req: ", ctx.body);
});

export default router;

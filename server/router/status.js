import express from 'express';
const UserRouter = express.Router();

let myStatusList = [{id:'1', name:'status 1'}, {id:'2', name:'status 2'}, {id:'3', name:'status 3'}, {id:'4', name:'status 4'}]


UserRouter.get('/:id', (req, res) => {

  let id = req.params.id;
  const idx = myStatusList.findIndex((item) => item.id === id);
  const  status = (idx !== -1)  ? myStatusList[idx] : {};

  res.json({status})
});


UserRouter.put('/', (req, res) => {

  let status = req.body.status;
  myStatusList = myStatusList.map(item => {
    if(item.id === status.id){
      return status
    }
    return item;
  })
  res.json({statusList: myStatusList})
});

UserRouter.post('/', (req, res) => {

  const item = req.body.status
  const status = {name:item.name, id: new Date().toISOString()}

  myStatusList = myStatusList.concat([status])
  console.log('myStatusList', myStatusList);
  res.json({statusList: myStatusList})
});


UserRouter.delete('/:id', (req, res) => {

  let id = req.params.id;
  myStatusList = myStatusList.filter((item) => item.id !== id);

  res.json({statusList: myStatusList})
});

UserRouter.get('/', (req, res) => {
  res.json({statusList: myStatusList})
});

export default UserRouter

const express = require('express');
const path = require('path');
const app = express();
const port = 1020;

app.use('/alarm',express.static(path.join(__dirname,'alrm_project')));
 app.get('/',(reque,respo)=>{
      respo.send('<a href="http://localhost:1020/alarm " target="_blank"><i>Alarm</i></a>');
  });
 app.get('/around/hii',(reque,respo)=>{
     respo.send('Around the World!')
 });
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
});

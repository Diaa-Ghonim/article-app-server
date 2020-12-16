import app from './webAPI/http/app';

app.listen(
  app.get('port'),
  () => console.log(`Server is running now on ${app.get('port')} !!!`)
);

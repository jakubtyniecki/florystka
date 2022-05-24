const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser')
const methodOverride = require('method-override');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

app.set('port', PORT);
app.set('env', NODE_ENV);

app.set('view engine', 'jade');
app.set('views', './web/views');

app.use(logger('tiny'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(express.static('./web/public'));

const site = require('./web/site')
app.use('/', site);

const plants = require('./web/plants')
app.use('/plants', plants);

const admin = require('./web/admin')
app.use('/admin', admin);

const api = require('./api/api')
app.use('/api', api);

app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Not Found`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(
    `Express Server started on Port ${app.get('port')} | Environment : ${app.get('env')}`
  );
});

module.exports = app;

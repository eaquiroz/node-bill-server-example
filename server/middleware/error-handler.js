'use strict';

/**
 * Module dependencies.
 */

const errorHandler = require('errorhandler');
const notifier = require('node-notifier');
const chalk = require('chalk');

module.exports = app => {

  if (process.env.NODE_ENV === 'development') {
    // only use in development env
    app.use(errorHandler({log: errorNotifier}));
  }

  function errorNotifier(err, str, req, next) {
    const title = 'Error in ' + req.method + ' ' + req.url;
    console.log(chalk.red(title));
    console.log(chalk.red('Error in ' + JSON.stringify(err)));
    notifier.notify({
      title: title,
      message: JSON.stringify(err.message)
    });
    // next();
  }

  app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).send({err});
  });

};

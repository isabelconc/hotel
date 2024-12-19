const pino = require('pino')

//transporte
const transporte = pino.transport({
    target: 'pino-pretty',
    options: { destination: './pino/output.logs', colorize: false }     
})
            
const logger = pino(transporte)


const username = 'joaozinho'
const usernameLogger = logger.child({username: username}) //util se vc vai colocar o usuário muitas vezes

usernameLogger.info('ola do pino1')
usernameLogger.error('erro do pino1')


// node ./pino/index.js | pino-pretty                
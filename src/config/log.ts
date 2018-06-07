import * as log4js from 'log4js'

log4js.configure({
    appenders: {
        stdout: {type: 'stdout'},
        file: {type: 'file', filename: 'log/log.log'}
    },
    categories: {
        default: {appenders: ['stdout'], level: 'info'},
        err: {appenders: ['stdout', 'file'], level: 'error'}
    }
})

// logger.trace('Entering cheese testing')
// logger.debug('Got cheese.')
// logger.info('Cheese is Gouda.')
// logger.warn('Cheese is quite smelly.')
// logger.error('Cheese is too ripe!')
// logger.fatal('Cheese was breeding ground for listeria.')

export const err = log4js.getLogger('err')
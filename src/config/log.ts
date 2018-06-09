import * as log4js from 'log4js'

log4js.configure({
    appenders: {
        stdout: {type: 'stdout'},
        err: {type: 'file', filename: 'log/err.log', maxLogSize: 10 * 1024 * 1024},
        log: {type: 'file', filename: 'log/log.log', maxLogSize: 10 * 1024 * 1024}
    },
    categories: {
        default: {appenders: ['stdout'], level: 'info'},
        err: {appenders: ['err'], level: 'error'},
        log: {appenders: ['log'], level: 'info'}
    }
})

// logger.trace('Entering cheese testing')
// logger.debug('Got cheese.')
// logger.info('Cheese is Gouda.')
// logger.warn('Cheese is quite smelly.')
// logger.error('Cheese is too ripe!')
// logger.fatal('Cheese was breeding ground for listeria.')

export const err = log4js.getLogger('err')
export const log = log4js.getLogger('log')
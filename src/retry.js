const wait = require('./wait')

/**
 * @typedef Result
 * @property {Boolean}		success					True/false - whether the job done or not
 * @property {Object}		[data]					The return data from async job if the job success (If not, there will be no data in the result object)
 * @property {Number}		[tries]					Number of tries
 */

/**
 * Retry an async job until the job success or stop after a maximum number of tries
 *
 * @param {Promise}   		asyncJob           			Async job to try.
 * @param {Object}   		options           			Options
 * @param {Number}   		[options.maxTries=10]     		Maximum times to try job.
 * @param {Number}   		[options.delay=1000] 			Time after between each try in ms.
 * @param {Number}   		[options.startAfter=0] 			Time to start the 1st try in ms.
 * @param {Function}   		[options.process=void] 			A process function to run before each try with the "tries" count argument
 * @param {Function}   		[options.errorHandler=void] 		A function to handle error in each try with the "err" argument
 * @param {Function}   		[options.check=void => Boolean] 	A function with the job reponse argument to verify whether the job response is expected or not (throw an error if not)
 *
 * @return {Promise<Result>} 						A promise that contains job data when fulfilled
 */

module.exports = async function retry(asyncJob, options) {
	const { maxTries = 10, delay = 1000, startAfter = 0, process, errorHandler, check } = options

	return new Promise(async (resolve) => {
		await wait(startAfter)

		let tries = 0
		async function fn() {
			try {
				tries += 1
				if (typeof process === "function") process(tries)

				const data = await asyncJob()
				if (typeof check === "function" && !check(data)) throw new Error("Unexpected data")

				resolve({ success: true, tries, data })
			} catch (err) {
				if (typeof errorHandler === "function") errorHandler(err)
				if (tries >= maxTries) {
					resolve({ success: false, tries })
				} else {
					await wait(delay)
					await fn()
				}
			}
		}

		await fn()
	})
}

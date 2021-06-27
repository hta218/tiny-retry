const wait = require('./wait')

/**
 * @typedef Result
 * @property {Boolean}	success			True/false - whether the job done or not
 * @property {Object}		[data]			The return data from async job if the job success (If not, there will be no data in the result object)
 */

/**
 * Retry an async job until the job success or stop after a maximum number of retries
 *
 * @param {Promise}   asyncJob           	Async job to try.
 * @param {Number}   	[maxRetries=10]     Maximum times to retry job.
 * @param {Number}   	[delay=1000] 				Time after between each retries in ms.
 * @param {Number}   	[startAfter=0] 			Time to start the 1st try in ms.

 * @return {Promise<Result>} 				A promise that contains job data when fulfilled
 */

module.exports = async function retry(asyncJob, maxRetries = 10, delay = 1000, startAfter = 0) {
	return new Promise(async (resolve) => {
		await wait(startAfter)

		let retryCount = 1
		async function fn() {
			try {
				const data = await asyncJob()
				resolve({ success: true, data })
			} catch (err) {
				if (retryCount >= maxRetries) {
					resolve({ success: false })
				} else {
					retryCount += 1
					await wait(delay)
					fn()
				}
			}
		}

		await fn()
	})
}

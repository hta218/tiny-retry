const wait = require('./wait')

/**
 * @typedef Result
 * @property {Boolean}		success					True/false - whether the job done or not
 * @property {Object}		[data]					The return data from async job if the job success (If not, there will be no data in the result object)
 * @property {Number}		[retryCount]			Number of retries
 */

/**
 * Retry an async job until the job success or stop after a maximum number of retries
 *
 * @param {Promise}   		asyncJob           		Async job to try.
 * @param {Number}   		[maxTries=10]     	Maximum times to retry job.
 * @param {Number}   		[delay=1000] 			Time after between each retries in ms.
 * @param {Number}   		[startAfter=0] 			Time to start the 1st try in ms.
 *
 * @return {Promise<Result>} 						A promise that contains job data when fulfilled
 */

module.exports = async function retry(asyncJob, options) {
	const { maxTries = 10, delay = 1000, startAfter = 0, process, errorHandler, check } = options

	return new Promise(async (resolve) => {
		await wait(startAfter)

		let tries = 0
		const fn = async () => {
			try {
				tries += 1
				process?.(tries)

				const data = await asyncJob()
				if (typeof check === "function" && !check?.(data)) throw new Error("Unexpected data")

				resolve({ success: true, tries, data })
			} catch (err) {
				errorHandler?.(err)
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

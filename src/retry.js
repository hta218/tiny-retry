const wait = require('./wait')

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

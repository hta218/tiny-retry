const wait = require('./wait')

module.exports = async function retry(asyncJob, maxRetries = 10, delay = 1000, startAfter = 0) {
	return new Promise(async (resolve) => {
		await wait(startAfter)

		let retryCount = 1;
		async function fn() {
			try {
				console.log(`[Tiny retry]: ${retryCount} time(s)`);
				const data = await asyncJob(); // Job will throw error if failed

				// Stop if job done
				resolve({
					success: true,
					message: `Job done after ${retryCount} retries`,
					data
				});
			} catch (err) {
				if (retryCount >= maxRetries) {
					resolve({
						success: false,
						message: `Retry ${maxRetries} times. Job failed!`
					});
				} else {
					retryCount += 1;
					await wait(delay);
					fn();
				}
			}
		}

		await fn();
	});
}

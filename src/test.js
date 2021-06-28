const retry = require('../dist/retry')
const wait = require('./wait')

let count1 = 0;
const fakeJobThatDoneAfter5Tries = async () => {
	await wait(2000);
	count1 += 1;
	if (count1 < 3) {
		throw new Error('Job 1 failed!');
	} else if (count1 < 5) {
		return false
	} else {
		console.log('Job 1 done!');
		return "Job 1 data"
	}
};

let count2 = 0;
const fakeJobThatDoneAfter10Tries = async () => {
	await wait(1000);
	count2 += 1;
	if (count2 >= 10) {
		console.log('Job 2 done!');
		return "Job 2 data"
	} else {
		throw new Error('Job 2 failed!');
	}
};

(async () => {
	console.log('Try job 1...')
	console.time('JOB_1_TIME')
	const result1 = await retry(fakeJobThatDoneAfter5Tries, {
		process: tries => console.log(`[TRY]: ${tries} time(s)`),
		errorHandler: err => console.log(err.toString()),
		check: Boolean,
		maxTries: 10, delay: 1000, startAfter: 0
	})
	console.log('Job 1 result: ', result1)
	console.log('Time expect: 0 + 2*5 + 1*(5-1) = 14s')
	console.timeEnd('JOB_1_TIME')

	console.log('\n****************************')
	console.log('Try job 2...')
	console.time('JOB_2_TIME')
	const result2 = await retry(fakeJobThatDoneAfter10Tries, {
		process: tries => console.log(`[TRY]: ${tries} time(s)`),
		errorHandler: err => console.log(err.toString()),
		maxTries: 3, delay: 2000, startAfter: 1000
	})
	console.log('Job 2 result: ', result2)
	console.log('Time expect: 1 + 1*3 + 2*(3-1) = 8s')
	console.timeEnd('JOB_2_TIME')
})();

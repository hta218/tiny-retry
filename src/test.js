const retry = require('../dist/retry')
const wait = require('./wait')

let count = 0;
const fakeJobThatDoneAfter5Tries = async () => {
	await wait(2000);
	count += 1;
	if (count < 3) {
		throw new Error('Job failed!');
	} else if (count < 5) {
		return false
	} else {
		console.log('Job done!');
		return "Job data"
	}
};

/////////////////////////// TEST
(async () => {
	console.log(`/********/ \nTesting a job that need 2s for each run, return unexpect data after 3 tries and success after 5 tries \n/********/`);

	console.log("\nTest 1 (10 tries max)..");
	console.time("TEST_1_TIME");
	const result1 = await retry(fakeJobThatDoneAfter5Tries, {
		process: (tries) => console.log(`[TRY]: ${tries} time(s)`),
		errorHandler: (err) => console.log(err.toString()),
		check: Boolean,
		maxTries: 10,
		delay: 1000,
		startAfter: 0
	});
	console.log("\nJob result: ", result1);
	console.log("Time expect: 0 + 2*5 + 1*(5-1) = 14s");
	console.timeEnd("TEST_1_TIME");

	count = 0 // Reset count
	console.log("\n****************************");
	console.log("Test 2 (3 tries max)...");
	console.time("TEST_2_TIME");
	const result2 = await retry(fakeJobThatDoneAfter5Tries, {
		process: (tries) => console.log(`[TRY]: ${tries} time(s)`),
		errorHandler: (err) => console.log(err.toString()),
		maxTries: 3,
		delay: 2000,
		startAfter: 1000
	});
	console.log("\nJob result: ", result2);
	console.log("Time expect: 1 + 2*3 + 2*(3-1) = 11s");
	console.timeEnd("TEST_2_TIME");
})();

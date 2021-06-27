const retry = require('../dist/retry')
const wait = require('./wait')

let count1 = 1;
const fakeJobThatDoneAfter5Tries = async () => {
  await wait(2000);
  if (count1 >= 5) {
    console.log('Job 1 done!');
		return "Job 1 data"
  } else {
    count1 += 1;
    throw new Error('Job 1 failed!');
  }
};

let count2 = 1;
const fakeJobThatDoneAfter10Tries = async () => {
  await wait(2000);
  if (count2 >= 10) {
    console.log('Job 2 done!');
		return "Job 2 data"
  } else {
    count2 += 1;
    throw new Error('Job 2 failed!');
  }
};

(async () => {
	console.log('Try job 1...')
	console.time('JOB_1_COST')
	const result1 = await retry(fakeJobThatDoneAfter5Tries, 8, 1000, 1000)
	console.log('Job 1 result: ', result1)
	console.log('Time expect: 1 + 2 * 5 + 1 * (5 - 1) = 15s')
	console.timeEnd('JOB_1_COST')

	console.log('\n****************************')
	console.log('Try job 2...')
	console.time('JOB_2_COST')
	const result2 = await retry(fakeJobThatDoneAfter10Tries, 8, 1000, 1000)
	console.log('Job 2 result: ', result2)
	console.log('Time expect: 1 + 2 * 8 + 1 * (8 - 1) = 24s')
	console.timeEnd('JOB_2_COST')
})();

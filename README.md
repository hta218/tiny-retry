# Tiny retry JS 👷

![size](https://img.badgesize.io/hta218/tiny-retry/main/dist/retry.js?compression=gzip&label=npm)

A lightweight function (**~0.5kb** ✨) that retry an async job until the job success or stop after a maximum number of tries

![package size](https://i.imgur.com/sOdcMX8.png)

## Usage

- Install package

	```bash
	npm install tiny-retry
	# or yarn add tiny-retry
	```

- Use it

	```js
	import retry from "tiny-retry";

	// Async context
	const result = await retry(asyncJob, options);

	if (result.success) {
		// Do something with job data
		console.log(result.data)
	} else {
		// Do other thing
	}
	```

## Parameters

```javascript
const result = await retry(asyncJob, { maxTries, delay, startAfter, process, errorHandler, check });
```

- `asyncJob` [Function]: async function that throw an `Error` if failed
- `options` [Object]: Retry options
  - `options.maxTries` [Number]: number of maximum time to try to run job
  - `delay` [Number]: the number in miliseconds of time after between each tries
  - `starAfter` [Number]: the number in miliseconds to start the 1st try
  - `process` [Function]: A process function to run before each try with the `tries` count argument
  - `errorHandler` [Function]: A function to handle error in each try with the `err` argument
  - `check` [Function]: A function with the job reponse argument to verify whether the job response is expected or not (throw an `Error` if not)

## Return value

- `result`: Object - represent the value of the job done or not and include job's data (if job return)

```javascript
console.log(result)

// Expect: { success: true, data: "Async job data", tries }
// If job failed: { success: false, tries }
```

## Example

[Codesandbox Example](https://codesandbox.io/s/test-tiny-retry-pjbqs?file=/src/index.js:0-1198)

```javascript
import retry from "tiny-retry";

const wait = (secs) => new Promise((resolve) => setTimeout(resolve, secs));

let count = 0;
const fakeJobThatDoneAfter6Tries = async () => {
	await wait(2000);
	count += 1;
	if (count < 4) {
		throw new Error('Job failed!');
	} else if (count < 6) {
		return false
	} else {
		console.log('Job done!');
		return "Job data"
	}
};

(async () => {
	console.log("Start Job");
	console.time("JOB_COST");
	const result = await retry(fakeJobThatDoneAfter6Tries, {
		process: (tries) => console.log(`[TRY]: ${tries} time(s)`),
		errorHandler: (err) => console.log(err.toString()),
		check: Boolean,
		maxTries: 10,
		delay: 1000,
		startAfter: 0
	});
	console.log("Job result: ", result);
	console.log("Time expect: 0 + 2*6 + 1*(6-1) = 17s");
	console.timeEnd("JOB_COST"); // Expect 17s
})();

```

## License

Copyright (c) 2021 Leo Huynh @ [https://leohuynh.dev](https://leohuynh.dev) under [MIT LICENSE](/LICENSE.md)

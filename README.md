# Tiny retry JS 👷

A lightweight function (only **360bytes** ✨) that retry an async job until the job success or stop after a maximum number of retries

![package size](https://i.imgur.com/pBlMS7b.png)

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
	const result = await retry(asyncJob, maxRetries, delay, starAfter);

	if (result.success) {
		// Do something with job data
		console.log(result.data)
	} else {
		// Do other thing
	}
	```

## Parameters

```javascript
const result = await retry(asyncJob, maxRetries, delay, starAfter);
```

- `asyncJob`: async function that throw an `Error` if failed
- `maxRetries`: number of maximum time to try to run job
- `delay`: the number in miliseconds of time after between each retries
- `starAfter`: the number in miliseconds to start the 1st try

## Return value

- `result`: Object - represent the value of the job done or not and include job's data (if job return)

```javascript
console.log(result)

// Expect: { success: true, data: "Async job data", retryCount }
// If job failed: { success: false, retryCount }
```

## Example

[Codesandbox demo](https://codesandbox.io/s/test-tiny-retry-pjbqs?file=/src/index.js:0-1198)

```javascript
import retry from "tiny-retry";

const wait = (secs) => new Promise((resolve) => setTimeout(resolve, secs));

let count = 1;
const fakeJobThatDoneAfter5Tries = async () => {
  await wait(2000);
  if (count >= 5) {
    console.log("Job done!");
    return "Job data";
  } else {
    count += 1;
    throw new Error("Job failed!");
  }
};

(async () => {
  console.log("Start Job 1");
  console.time("JOB_COST");
  const result1 = await retry(fakeJobThatDoneAfter5Tries, 8, 1000, 1000);
  console.log("Job 1 result: ", result1);
  console.log("Time expect: 1 + 2 * 5 + 1 * (5 - 1) = 15s");
  console.timeEnd("JOB_COST"); // Expect: 15s
})();

```

## License

Copyright (c) 2021 Leo Huynh @ [https://leohuynh.dev](https://leohuynh.dev) under [MIT LICENSE](/LICENSE.md)

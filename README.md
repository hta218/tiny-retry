## Tiny retry JS

A lightweight function (only **360bytes**) that retry an async job until the job success or stop after a maximum number of retries

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
		// Do other things
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

## Returned value

- `result`: Object - represent the value of the job done or not and include job's data (if job return)

```javascript
console.log(result)

/**
 * Job run success
 * { success: true, data: "Async job data" }
 *
 * Job failed
 * { success: false }
 *
 * /
```

## License

Copyright (c) 2021 Leo Huynh @ [https://leohuynh.dev](https://leohuynh.dev) under [MIT LICENSE](/LICENSE.md)

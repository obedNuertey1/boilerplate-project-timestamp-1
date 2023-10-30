# Timestamp Microservice - Documentation
### Overview:
- [Introduction](#introduction)
- [Api End Points Manual](#api-end-points-manual)
- [Visit Site](https://obn-timestamp-microservice.onrender.com/)

## Introduction
Welcome to our Timestamp Microservice! We've got your date and time needs covered. With a simple request to `/api/:date?`, you'll receive a JSON object with two valuable keys:

1. **unix**: Get the Unix timestamp of the input date in milliseconds (as a Number).
2. **utc**: Enjoy the input date in a user-friendly string format like "Thu, 01 Jan 1970 00:00:00 GMT."

Whether you're exploring historical dates or need the current time, we're here for you. An empty date parameter will fetch the current time and present it in both Unix and UTC formats. Plus, rest assured with our error handling. If you input an invalid date, we've got your back with an error message: `{ error : "Invalid Date" }`. Discover the world of time with ease using our Timestamp Microservice.

![image](https://github.com/obedNuertey1/boilerplate-project-timestamp-1/assets/101027384/42ea0029-1a1a-4439-8e68-f7eb0df86e47)

  
## Api End Points Manual
* A request to `/api/:date?` with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
* A request to `/api/:date?` with a valid date should return a JSON object with a utc key that is a string of the input date in the `format: Thu, 01 Jan 1970 00:00:00 GMT`
* A request to `/api/1451001600000` should return `{ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }`
* If the input date string is invalid, the API returns an object having the structure `{ error : "Invalid Date" }`
* An empty date parameter should return the current time in a JSON object with a unix key
* An empty date parameter should return the current time in a JSON object with a utc key


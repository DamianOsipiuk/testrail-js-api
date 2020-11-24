[![NPM](https://img.shields.io/npm/v/testrail-js-api)](https://www.npmjs.com/package/testrail-js-api) [![NPM](https://img.shields.io/npm/l/testrail-js-api)](https://github.com/DamianOsipiuk/testrail-js-api/blob/master/LICENSE) [![NPM](https://img.shields.io/node/v/testrail-js-api)](https://github.com/DamianOsipiuk/testrail-js-api/blob/master/package.json)

# Notice

Please make sure to check the API reference: https://www.gurock.com/testrail/docs/api

To upload attachments for test results you have to enable an option to edit test reults:

>Please note the ability to edit test results must be enabled under 'Site Settings' in order for add_attachment_to_result endpoints to work.

# Usage

1. Create new instance of the TestRail class by passing:

- **host** - TestRail server address
- **user** - Username that has access to the target project.
- **apiKey** - Generate API Key from TestRail options.

```
const testrail = new TestRail(host, user, apiKey);
```

2. Invoke API methods. All methods return a promise with response and a value as an object.

```
const { response, value } = await testrail.addRun(
    projectId,
    runPayload,
);
```
```
testrail.addRun(
    projectId,
    runPayload,
).then(({ response, value }) => {
    ...
});
```

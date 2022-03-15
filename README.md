https://codecept.io/

https://runebook.dev/ru/docs/codeceptjs/best

### install

branch - `develop`

```bash
npm сi
```

### Run local

1. add env var URI_PREFIX

```bash
export  URI_PREFIX={env}
```
or write in /misc/urls.js

2. Run tests:

```bash
npx codeceptjs run   --config=codecept.conf.js  --steps   --grep @s --verbose
or
npx codeceptjs run   --config=codecept.conf.ci.js  --steps   --grep @s -p allure
or
npx codeceptjs run-workers 5 --grep @q1 -p allure
or
npx codeceptjs run --grep @protocol -p allure
```

options:

- configs:
  `--config codecept.conf.js`
  `--config codecept.conf.api.js`
  `--config codecept.conf.ci.js`

- run in ci

https://codecept.discourse.group/t/codeceptjs-gitlab-integration/427

- run separate (tag)
  `--grep @r` regress
  `--grep @s` smoke
- print scenarious without run
  `dry-run`
- save to Allure report
  `--plugins allure`

other options https://codecept.io/commands or `--help`

For start local allure service with data from `output/`

```bash
allure serve output
```

### Run eslint

Install:

```bash
npm install -g eslint
```

Run command: `eslint ./ --fix`

### Run build

#### Tags

Tags in project:

- Types of testing:
  - `@s_` - smoke
  - `@a_` - api
  - `@q_` - diff q
  - `@inprogress` - not ready;
- External tags:

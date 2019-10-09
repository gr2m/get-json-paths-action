# Flatten output action

> A GitHub Action to access deep values of a JSON output

[![Build Status](https://github.com/gr2m/flatten-output-action/workflows/Test/badge.svg)](https://github.com/gr2m/flatten-output-action/actions)
[![Greenkeeper](https://badges.greenkeeper.io/gr2m/flatten-output-action.svg)](https://greenkeeper.io/)

## Usage

Minimal example

```yml
Name: Flatten output example
on: [push]

jobs:
  minimal_example:
    runs-on: ubuntu-latest
    steps:
      - id: action_with_json_output
        run: 'echo ::set-output name=data::{ "foo": { "bar":"baz" } }'
      - id: data
        uses: gr2m/flatten-output-action@v1.x
        with:
          json: ${{ steps.action_with_json_output.outputs.data }}
          bar: "foo.bar"
      - run: "echo bar is ${{ steps.data.outputs.bar }}"
```

Example with [`octokit/request-action`](https://github.com/octokit/request-action/)

```yml
Name: Request output example
on:
  push:
    branches:
      - master

jobs:
  request_example:
    runs-on: ubuntu-latest
    steps:
      - id: get_latest_release_request
        uses: octokit/request-action@v1.x
        with:
          route: GET /repos/:owner/:repo/releases/latest
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - id: get_latest_release_result
        uses: gr2m/flatten-output-action@v1.x
        with:
          json: ${{ steps.get_latest_release_request.outputs.data }}
          name: "data.name"
          tag_name: "data.tag_name"
          created_by: "data.author.login"
      - run: "echo latest release: ${{ steps.get_latest_release_result.outputs.name }} (${{ steps.get_latest_release_result.outputs.name }}) by ${{ ${{ steps.get_latest_release_result.outputs.login }}"
```

## Debugging

To see additional debug logs, create a secret with the name: `ACTIONS_STEP_DEBUG` and value `true`.

## How it works

`flatten-output-action` is using [`lodash.get`](https://lodash.com/docs/4.17.15#get) to access deep properties at the provided path. `json` is the only required `input`. All other inputs are turned into equally named outputs with the value at the given paths.

## License

[MIT](LICENSE)

# 💁‍♂️ This action is now obsolete

Use the built-in [`fromJSON(value)`](https://help.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#fromjson) function instead

# Get JSON paths action

> A GitHub Action to access deep values of JSON strings

[![Build Status](https://github.com/gr2m/get-json-paths-action/workflows/Test/badge.svg)](https://github.com/gr2m/get-json-paths-action/actions)
[![Greenkeeper](https://badges.greenkeeper.io/gr2m/get-json-paths-action.svg)](https://greenkeeper.io/)

## Usage

Minimal example

```yml
Name: Minimal example
on: [push]

jobs:
  minimal_example:
    runs-on: ubuntu-latest
    steps:
      - id: action_with_json_output
        run: 'echo ::set-output name=data::{ "foo": { "bar":"baz" } }'
      - id: data
        uses: gr2m/get-json-paths-action@v1.x
        with:
          json: ${{ steps.action_with_json_output.outputs.data }}
          bar: "foo.bar"
      - run: "echo bar is ${{ steps.data.outputs.bar }}"
```

Example with [`octokit/request-action`](https://github.com/octokit/request-action/)

```yml
Name: Request example
on:
  push:
    branches:
      - master

jobs:
  request_example:
    runs-on: ubuntu-latest
    steps:
      - id: request
        uses: octokit/request-action@v2.x
        with:
          route: GET /repos/:owner/:repo/releases/latest
          owner: gr2m
          repo: get-json-paths-action
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - id: result
        uses: gr2m/get-json-paths-action@v1.x
        with:
          json: ${{ steps.request.outputs.data }}
          name: "name"
          tag_name: "tag_name"
          created_by: "author.login"
      - run: "echo latest release: ${{ steps.result.outputs.name }} (${{ steps.result.outputs.tag_name }}) by ${{ ${{ steps.result.outputs.login }}"
```

## Debugging

To see additional debug logs, create a secret with the name: `ACTIONS_STEP_DEBUG` and value `true`.

## How it works

`get-json-paths-action` is using [`lodash.get`](https://lodash.com/docs/4.17.15#get) to access deep properties at the provided path. `json` is the only required `input`. All other inputs are turned into equally named outputs with the value at the given paths.

## License

[MIT](LICENSE)

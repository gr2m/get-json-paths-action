const { inspect } = require("util");

const get = require("lodash.get");
const core = require("@actions/core");

const { json, ...paths } = getAllInputs();
const jsonParsed = JSON.parse(json);

try {
  core.debug(`json input: ${inspect(jsonParsed)}`);
  core.debug(`paths inputs: ${inspect(paths)}`);

  for (const [name, path] of Object.entries(paths)) {
    const value = get(jsonParsed, path);
    const strValue = JSON.stringify(value);
    core.debug(`setting output ${name} to "${strValue}" (${typeof value}) using "${path}"`);
    core.setOutput(name, strValue);
  }
} catch (error) {
  core.setFailed(error);
  process.exit(1);
}

function getAllInputs() {
  return Object.entries(process.env).reduce((result, [key, value]) => {
    if (!/^INPUT_/.test(key)) return result;

    const inputName = key.substr("INPUT_".length).toLowerCase();
    result[inputName] = value;
    return result;
  }, {});
}

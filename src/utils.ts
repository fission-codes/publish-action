import * as core from "@actions/core";
import * as exec from "@actions/exec";

export const runFission = async (opts: Array<string>) => {
  let defaultOpts: Array<string> = [];
  const remote = core.getInput("REMOTE");
  if (remote) {
    defaultOpts.push(`-R ${remote}`);
  }

  const verbose = core.getBooleanInput("VERBOSE");
  if (verbose) {
    defaultOpts.push("--verbose");
  }
  const options = opts.concat(defaultOpts);
  await exec.exec("fission", options);
};

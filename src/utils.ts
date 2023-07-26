import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as github from "@actions/github";

export const runFission = async (opts: Array<string>) => {
  let defaultOpts: Array<string> = [];
  const remote = core.getInput("REMOTE");
  if (remote) {
    defaultOpts.push(`-R ${remote}`);
  }

  const verbose = core.getBooleanInput("VERBOSE");
  defaultOpts.push("--verbose");
  if (verbose) {
    defaultOpts.push("--verbose");
  }

  const execOptions: exec.ExecOptions = {
    // silent: true,
    
  }
  execOptions.listeners = {

      errline: (data: string) => {
      if(data.includes('Directory CID is')){

        const regex = /Directory CID is (.+)/
        const match = data.match(regex);
        
        if (match) {
          core.setOutput('cid', match[1])
        } 
      }
    }
  }
  const options = opts.concat(defaultOpts);
  await exec.exec("fission", options, execOptions);
};

export const statusUpdate = async (
  state: "pending" | "success" | "failure",
  target_url: string = ""
) => {
  const githubToken = core.getInput("token");
  const octokit = github.getOctokit(githubToken);
  const context = github.context;

  let description = "";
  switch (state) {
    case "pending":
      description = "Working...";
      break;
    case "success":
      description = "Success!";
      break;
    case "failure":
      description = "Failed.";
      break;
  }

  await octokit.rest.repos.createCommitStatus({
    ...context.repo,
    sha: context.sha,
    state,
    target_url,
    description,
    context: "Publish to Fission",
  });
};

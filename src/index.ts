import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as installer from "./installer";
import * as fs from "fs";
import * as path from "path";
import YAML from "yaml";
import { runFission } from "./utils";

type FissionConfig = {
  url: string;
  build: string;
};

const run = async () => {
  try {
    const machineKey = core.getInput("MACHINE_KEY", { required: true });

    await installer.getFissionCLI();
    await installer.importKey(machineKey);

    const workingDir = core.getInput("WORKDIR");
    if (workingDir) {
      process.chdir(workingDir);
    }

    let config: FissionConfig;
    const configPath = path.join(process.cwd(), "fission.yaml");
    const appURL = core.getInput("APP_URL");
    const buildDir = core.getInput("BUILD_DIR");
    if (!fs.existsSync(configPath)) {
      if (appURL) {
        fs.writeFileSync(
          configPath,
          YAML.stringify({ url: appURL, build: buildDir })
        );
      } else {
        await runFission(["app", "register"]);
      }
    } else if (appURL || buildDir) {
      // Override the app url (even though fission.yaml exists).
      const file = fs.readFileSync(configPath, "utf8");
      config = YAML.parse(file);
      config.url = appURL;
      config.build = buildDir;
      fs.writeFileSync(configPath, YAML.stringify(config));
    }

    await runFission(["app", "publish"]);

    const file = fs.readFileSync(configPath, "utf8");
    config = YAML.parse(file);

    core.setOutput("app_url", config.url);
  } catch (error) {
    let errorMessage = "failed to publish";
    if (error instanceof Error && error.message) {
      errorMessage = error.message;
    }
    core.setFailed(errorMessage);
  }
};

run();

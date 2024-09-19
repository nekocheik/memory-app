const ts = require("typescript");
const fs = require("fs");
const path = require("path");

function logTsConfigInfo(projectPath) {
  const configPath = ts.findConfigFile(
    projectPath,
    ts.sys.fileExists,
    "tsconfig.json"
  );

  if (!configPath) {
    console.error("Impossible de trouver le fichier tsconfig.json !");
    return;
  }

  console.log("[INFO] Fichier tsconfig.json trouvé :", configPath);

  const configFileText = fs.readFileSync(configPath, "utf8");
  const result = ts.parseConfigFileTextToJson(configPath, configFileText);

  if (result.error) {
    console.error(
      "[ERROR] Erreur lors du parsing du tsconfig.json :",
      result.error.messageText
    );
    return;
  }

  const parsedConfig = ts.parseJsonConfigFileContent(
    result.config,
    ts.sys,
    path.dirname(configPath)
  );

  if (parsedConfig.errors.length) {
    console.error(
      "[ERROR] Erreurs lors de l'analyse du fichier de configuration :",
      parsedConfig.errors
    );
    return;
  }

  console.log("[INFO] Options de compilation détectées :");
  console.log(parsedConfig.options);

  console.log("[INFO] Fichiers inclus dans le projet :");
  console.log(parsedConfig.fileNames.join("\n"));
}

// Pass the project directory as an argument
const projectDir = process.argv[2] || process.cwd();
logTsConfigInfo(projectDir);

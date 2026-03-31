import { createLogger } from "../src";

async function main() {
  const logger = createLogger({ scope: "example-logging-skill", level: "debug" });

  logger.debug("Debug message", { step: 1 });
  logger.info("Skill example started");

  try {
    // Simuler un traitement
    await new Promise((resolve) => setTimeout(resolve, 100));

    logger.warn("Ceci est un simple warning de démonstration");
    logger.info("Traitement terminé avec succès");
  } catch (error) {
    logger.error("Une erreur est survenue", error);
  }
}

main().catch((error) => {
  console.error("Erreur dans l'exemple de skill", error);
  process.exit(1);
});


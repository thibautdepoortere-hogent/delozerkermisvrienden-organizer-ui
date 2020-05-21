import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

const credential = new DefaultAzureCredential();

const vaultName = "DLV-Org-Data-KeyVault";
const url = `https://DLV-Org-Data-KeyVault.vault.azure.net`;

const client = new SecretClient(url, credential);

const secretName = "EmailEvenementen";

export async function getSecret() {
  const latestSecret = await client.getSecret(secretName);
  console.log(`Latest version of the secret ${secretName}: `, latestSecret);
  const specificSecret = await client.getSecret(secretName, {
    version: latestSecret.version,
  });
  console.log(
    `The secret ${secretName} at the version ${latestSecret.version}: `,
    specificSecret
  );
}

// main();

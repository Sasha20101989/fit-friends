import DataGeneratorCommand from './src/modules/data-generator/data-generator-command.js'

const args = process.argv.slice(2);

if (args.length !== 5) {
  console.error('Usage: node generate-data.js <login> <password> <host> <dbname> <salt>');
  process.exit(1);
}

const [login, password, host, dbname, salt] = args;

const dataGenerator = new DataGeneratorCommand();
(async () => {
  try {
    await dataGenerator.execute(login, password, host, dbname, salt);
    console.log('Data generation completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Data generation failed with an error:', error);
    process.exit(1);
  }
})();

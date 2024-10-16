const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-writer').createObjectCsvWriter;

const testDirectory = path.join(__dirname, 'tests');
const outputCsvFile = path.join(__dirname, 'testCases.csv');

const extractTestCases = (dir) => {
  const testCases = [];

  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      testCases.push(...extractTestCases(filePath));
    } else if (file.endsWith('.test.js')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const matches = content.match(/test\(['"`](.*?)['"`],/g);
      if (matches) {
        matches.forEach((match) => {
          const testCaseName = match.match(/test\(['"`](.*?)['"`],/)[1];
          testCases.push({
            file: filePath,
            name: testCaseName,
            description: '',
            steps: ''
          });
        });
      }
    }
  });

  return testCases;
};

const writeCsvFile = async (testCases) => {
  const csvWriterInstance = csvWriter({
    path: outputCsvFile,
    header: [
      { id: 'file', title: 'File' },
      { id: 'name', title: 'Test Case Name' },
      { id: 'description', title: 'Description' },
      { id: 'steps', title: 'Steps' }
    ]
  });

  await csvWriterInstance.writeRecords(testCases);
  console.log(`Test cases exported to ${outputCsvFile}`);
};

const main = async () => {
  const testCases = extractTestCases(testDirectory);
  await writeCsvFile(testCases);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
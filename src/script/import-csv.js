import { parse } from 'csv-parse'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const processFile = async () => {
    const records = [];
    const parser = fs.createReadStream(path.join(__dirname, 'tasks_to_import.csv')).pipe(parse());
    for await (const record of parser){
        records.push(record);
    }
    return records;
}

const sendRequest = async (record) => {
    const recordWithoutHeader = record.slice(1);
    recordWithoutHeader.forEach(async (item) => {
        const [title, description] = item;
        await fetch('http://localhost:3333/tasks', {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description }),
            })
    })
}

(async () => {
    const record = await processFile();
    await sendRequest(record);
})();
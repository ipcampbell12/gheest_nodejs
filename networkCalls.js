const { google } = require('googleapis');
const saKeyFile = "./gsheets-nodejs-389821-e05eab630dca.json";
const sheetId = '12U2dYRDOGuEqURhvyOzzG9u-kuwkno3tVhoN7H_voAo';
const tabName = 'Customers';
const range = 'A1:F';



async function readData() {
    const client = await getGoogleSheetsClient();
    const data = await readGoogleSheets(client, sheetId, tabName, range)

    return data

}


async function writeData(data) {
    console.log("We have a book to record here")
    const client = await getGoogleSheetsClient();
    await appendToGoogleSheet(client, sheetId, tabName, range, data)
}


async function readAndWrite() {
    await writeData()
    await readData()
}



async function getGoogleSheetsClient() {
    const auth = new google.auth.GoogleAuth({
        keyFile: saKeyFile,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();

    return google.sheets({
        version: 'v4',
        auth: authClient,
    });
};

async function readGoogleSheets(googleSheetClient, sheetId, tabName, range) {

    const res = await googleSheetClient.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: `${tabName}!${range}`,
    });

    return res.data.values;
};


async function readRowById(id) {
    const val = id.toString()
    const data = await readData();
    const value = await data.find(row => row[0] === val)

    return value
};


async function getRowNumberById(id) {
    const data = await readData();
    const row = await data.find(row => row[0] === id)
    const rowNumber = await data.indexOf(row)
    return rowNumber
}


async function updateRowById(values, id) {
    const spreadsheetId = '12U2dYRDOGuEqURhvyOzzG9u-kuwkno3tVhoN7H_voAo';
    const valueInputOption = 'USER_ENTERED'
    const rowNumber = await getRowNumberById(id)
    const range = `A${rowNumber + 1}:E${rowNumber + 1}`
    const resource = {
        values,
    };
    const client = await getGoogleSheetsClient();
    try {
        const result = await client.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption,
            resource
        });
        console.log('%d cells updated.', result.data.updatedCells);
        return result;
    } catch (err) {
        throw err;
    }
};


async function deleteRowById(id) {
    const spreadsheetId = '12U2dYRDOGuEqURhvyOzzG9u-kuwkno3tVhoN7H_voAo';

    const rowNumber = await getRowNumberById(id);

    console.log('Row Number: ', rowNumber);

    const batchUpdateRequest = {

        requests: [
            {
                deleteDimension: {
                    range: {
                        sheetId: 0,
                        dimension: "ROWS",
                        startIndex: rowNumber,
                        endIndex: rowNumber + 1
                    }
                }
            }
        ]
    };

    const client = await getGoogleSheetsClient();
    try {
        const result = await client.spreadsheets.batchUpdate({
            spreadsheetId,
            resource: batchUpdateRequest,
        });

        await result.data.replies[0].deleteDimension;

        return result;
    } catch (err) {
        throw err;
    }
};

async function deleteAllValues(rows) {
    const spreadsheetId = '12U2dYRDOGuEqURhvyOzzG9u-kuwkno3tVhoN7H_voAo';

    const batchUpdateRequest = {
        requests: [
            {
                deleteDimension: {
                    range: {
                        sheetId: 0,
                        dimension: "ROWS",
                        startIndex: 1,
                        endIndex: rows
                    }
                }
            },
        ],
    }

    const client = await getGoogleSheetsClient();

    try {
        const result = await client.spreadsheets.batchUpdate({
            spreadsheetId,
            resource: batchUpdateRequest,
        });

        await result.data.replies[0].deleteDimensions;

        return result;
    } catch (err) {
        throw err;
    }
}


deleteAllValues(5)


async function appendToGoogleSheet(googleSheetClient, sheetId, tabName, range, data) {
    await googleSheetClient.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: `${tabName}!${range}`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            "majorDimension": "ROWS",
            "values": data
        },
    })
}



module.exports = {
    readData: readData,
    readRowById: readRowById,
    writeData: writeData,
    deleteRowById: deleteRowById,
    updateRowById: updateRowById,
    deleteAllValues: deleteAllValues
}



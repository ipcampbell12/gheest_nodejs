const { google } = require('googleapis');
const networkDebugger = require('debug')('app:networkCalls')

const saKeyFile = "./gsheets-nodejs-389821-acf45dae2c3d.json";
const sheetId = '12U2dYRDOGuEqURhvyOzzG9u-kuwkno3tVhoN7H_voAo';
const tabName = 'Customers';
const range = 'A1:E';



async function readData() {
    const client = await getGoogleSheetsClient();
    const data = await readGoogleSheets(client, sheetId, tabName, range)

    // console.log(data)
    return data

}
const updatedRow = [
    [14, 'Jack', "Bojinga", "jbojinga@hellou.com", '111-222-1234']
]

async function writeData(data) {

    const client = await getGoogleSheetsClient();
    await appendToGoogleSheet(client, sheetId, tabName, range, data)
}

//writeData(updatedRow)

async function readAndWrite() {
    await writeData()
    await readData()
}

//readAndWrite()

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

async function displayValue(id) {
    try {
        const row = await readRowById(id)
        networkDebugger(row)
    } catch (error) {
        networkDebugger(error)
    }
};

//displayValue(54)

async function updateRowById(values, id) {
    const spreadsheetId = '12U2dYRDOGuEqURhvyOzzG9u-kuwkno3tVhoN7H_voAo';
    const valueInputOption = 'USER_ENTERED'
    const range = `A${id + 1}:E${id + 1}`
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
        networkDebugger('%d cells updated.', result.data.updatedCells);
        return result;
    } catch (err) {
        throw err;
    }
};




//updateRowById(updatedRow, 585)

async function deleteRowById(id) {
    const spreadsheetId = '12U2dYRDOGuEqURhvyOzzG9u-kuwkno3tVhoN7H_voAo';

    const rowNumber = await getRowNumberById(id);

    networkDebugger('Row Number: ', rowNumber);

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


//deleteRowById(26)






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


const sum = (...args) => {
    return args.reduce(function (acc, cur) {
        return acc + cur
    })

}


module.exports = {
    readData: readData,
    readRowById: readRowById,
    writeData: writeData,
    networkDebugger: networkDebugger
}



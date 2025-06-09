import fs from 'fs';
import xlsx from 'xlsx';

/**
 * Returns excel data as JSON array in both row wise format or column wise format
 *  filePath: The path to the Excel file.
 * sheetName: The name of the sheet from which you want to extract data.
 * returnType: Can be either 'column' or 'row' depending on whether you want to fetch column data or row data.
 * columnName: The name of the column to extract (when returnType is 'column').
 * Error Handling: The task handles cases where the column doesn’t exist and returns a custom error message. */

function readExcel({ filePath, sheetName, returnType, columnName }) {
    try {
        const file = fs.readFileSync(filePath); // Read the file
        const workbook = xlsx.read(file, { type: 'buffer' }); // Parse the file

        const worksheet = workbook.Sheets[sheetName]; // Get the specific sheet
        const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 }); // Convert to JSON array (header: 1 to include headers)

        if (returnType === 'column') {
            const headerRow = jsonData[0]; // Get headers
            const columnIndex = (headerRow as any).indexOf(columnName); // Get column index

            if (columnIndex === -1) {
                throw new Error(`Column "${columnName}" not found`);
            }

            // Fetch the data for the specified column
            const columnData = jsonData.slice(1).map(row => row[columnIndex]);
            return columnData;

        } else if (returnType === 'row') {
            // Return the entire row-wise data (except header)
            return jsonData.slice(1);
        }
    } catch (err) {
        return { error: err.message };
    }
}


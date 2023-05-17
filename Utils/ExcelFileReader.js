const xlsx = require('xlsx');
const readExcelFile = async (path, filePath) => {
    try {
        const file = xlsx.readFile(`${path}/${filePath}`);
        let data = []
        const sheets = file.SheetNames
        for (let i = 0; i < sheets.length; i++) {
            const temp = xlsx.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])
            temp.forEach((res) => {
                data.push(res)
            })
        }
        return data;
    }
    catch (err) {
        console.log(err);
    }
};
module.exports=readExcelFile;
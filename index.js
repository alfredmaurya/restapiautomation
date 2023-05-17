const readExcelFile = require('./Utils/ExcelFileReader');
const Rest = require('./Utils/RestHelper')
const _ = require('lodash')
var fs = require('fs');
const genarateHTML = require('./Utils/HTMLCreator.js')

const fetchAll = async (urls) => {
    let data
    try {
        data = await Promise.all(urls.map((userData) => {
            let userHeader = {}
            if (userData.Token) {
                userHeader = {
                    "Content-Type": "application/json",
                    "Autherization": "Bearer " + userData.Token
                }
            }
            let config = {
                method: userData.Type,
                url: "https://" + userData.Host + "/" + userData.Path,
                headers: userHeader
            }
            return Rest.generalFunction(config)
        }))
    } catch (err) {
        console.log(err)
    }
    let arr = []
    for (let i = 0; i < data.length; i++) {
        if (_.isEqual(data[i].data, JSON.parse(urls[i].Response))) {
            arr.push({ SNo: urls[i].No, Method: urls[i].Type, Url: "https://" + urls[i].Host + "/" + urls[i].Path, Statuscode: data[i].status ,Status:'Pass',Requestduration:data[i].headers['request-duration']})
        }else{
            arr.push({ SNo: urls[i].No, Method: urls[i].Type, Url: "https://" + urls[i].Host + "/" + urls[i].Path, Statuscode: data[i].status ,Status:'Fail',Requestduration:data[i].headers['request-duration']})
        }
    }

    return arr
}
const mainFunction = async () => {
    let data = await readExcelFile('./RestData', 'RestApi.xlsx')
    let responseData = await fetchAll(data);
    let result = await genarateHTML(responseData);
    fs.writeFile('./Output/RestAPIReport.html', result, function (err) {
        if (err) throw err;
        console.log('Replaced!');
    });
}
mainFunction();

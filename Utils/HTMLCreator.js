const htmlCreator = require("html-creator");

const genarateHTML = (data) => {
    const TableGenrator = (data) => {
        let column = []
        if (data.length) {
            column = Object.keys(data[0])
        }

        let ColumnData = column.map((head) => {
            let val = ""
            val = val + "<th>" + head + " </th>"
            return val
        })
        let rowData = data && data.map((item) => {
            let val = "";
            val = val + "<tr>" + column.map((head) => {
                let val = ""
                val = val + `<td ${item[head]=="Pass"?'style="color:green"':item[head]=="Fail"&&'style="color:red"'}>` + item[head] + " </td>"
                return val
            }).join('') + "</tr>"
            return val
        })

        return ("<table><tr>" + ColumnData.join('') + "</tr>" + rowData.join('') + "</table>")
    }
    const html = new htmlCreator([
        {
            type: "head",
            content: [
                {
                    type: "Rest_Api_Report",
                    content: "Rest Api Test Data",
                },
                {
                    type: "style",
                    content: `
            #cool-text {
              color: red;
            }
          `,
                },
            ],
        },
        {
            type: "body",
            content: [
                {
                    type: "div",
                    content: [
                        // {
                        //     type: "div",
                        //     content: "Rest Api Report",
                        //     attributes: { id: "cool-text" },
                        // },
                        {
                            type: "div",
                            content: TableGenrator(data),
                            attributes: { id: "Report" },
                        },
                    ],
                },
            ],
        },
    ]);
    const result = html.renderHTML();
    return result;
}
module.exports = genarateHTML;
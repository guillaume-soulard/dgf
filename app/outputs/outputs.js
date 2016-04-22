var check = require('check-type');
var fs = require('fs');

module.exports ={
    file: function (options) {

        if (!check(options).matches({
            path: 'string',
            encoding: 'string'
        })) {
            throw new Error('File options not matches {path:string,encoding:string}')
        }

        return {

            filePath: options.path,
            fileEncoding: options.encoding,
            write: function (data) {
                if (!fs.existsSync(this.filePath)) {
                    // create full parent file path
                    fs.mkdirSync(path.dirname(this.filePath));
                }

                fs.appendFileSync(this.filePath, data, this.fileEncoding);                    
            }
        };
    },
    stdout: function () {
        return {
            write: function (data) {
                console.log(data);
            }
        }
    }
};
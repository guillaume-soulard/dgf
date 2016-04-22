var check = require('check-type');

module.exports = {
    times: function (amount) {
            
        if (!check(amount).is('number') || amount < 0) {
            throw new Error ('Amount must be a positive number or 0');
        }

        return {
            max: amount,
            last: 0,
            canGenerate: function () {
                this.last++;
                return this.last <= this.max;
            }
        }            
    }
}
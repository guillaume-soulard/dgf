module.exports = {
    getPropertiesDeeply: function (object) {
        var properties = [];
        
        for (var key in object) {
            var subProperties = [];
            if (typeof(object[key]) === 'object') {
                subProperties = this.getPropertiesDeeply(object[key]);
            }
        
            if (subProperties.length > 0) {
                for (var subProperty in subProperties) {
                    properties.push(key + '.' +subProperties[subProperty]);
                }
            } else {
                properties.push(key);                
            }
            
        }
        
        return properties;
    }
}
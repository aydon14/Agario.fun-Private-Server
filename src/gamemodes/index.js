module.exports = {
    Mode: require('./Mode'),
    FFA: require('./FFA'),
    Teams: require('./Teams'),
    Experimental: require('./Experimental'),
};

var get = function (id) {
    var mode;
    switch (parseInt(id)) {
        case 1: // Teams
            mode = new module.exports.Teams();
            break;
        case 2: // Experimental
            mode = new module.exports.Experimental();
            break;
        default: // FFA is default
            mode = new module.exports.FFA();
            break;
    }
    return mode;
};

module.exports.get = get;

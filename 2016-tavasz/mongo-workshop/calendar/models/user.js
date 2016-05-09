module.exports = function(mongoose) {
    var Schema = new mongoose.Schema({
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: function f() {
                return new mongoose.Types.ObjectId();
            }
        },
        username: {
            type: String
        },
        password: {
            type: String
        },
        display_name: {
            type: String
        }
    });

    var Model = mongoose.model('User', Schema);

    return Model;
};
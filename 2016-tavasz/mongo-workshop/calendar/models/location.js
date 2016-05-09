module.exports = function(mongoose) {
    var Schema = new mongoose.Schema({
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: function f() {
                return new mongoose.Types.ObjectId();
            }
        },
        title: {
            type: String
        },
        address: {
            type: String
        }
    });

    var Model = mongoose.model('Location', Schema);

    return Model;
};
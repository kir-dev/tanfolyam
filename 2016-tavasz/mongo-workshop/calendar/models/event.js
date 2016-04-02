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
        start: {
            type: Date
        },
        end: {
            type: Date
        },
        location: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Location'
        }
    });

    var Model = mongoose.model('Event', Schema);

    return Model;
};
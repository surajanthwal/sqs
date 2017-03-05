var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var runSchema = new Schema({
    run: {type: String, required: true},
    created_at: Date,
    updated_at: Date
});

runSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

var Run = mongoose.model('Run', runSchema);
module.exports = Run;
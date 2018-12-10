const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KudoSchema = new Schema({
    title: {
        type: String,
        required: "Title required"
    },
    body: {
        type: String,
        trim: true,
        required: "Kudo required"
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Kudos = mongoose.model("Kudos", KudoSchema);

module.exports = Kudos;
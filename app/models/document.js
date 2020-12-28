const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
  parentDir: {type: Schema.ObjectId, default: null, ref: 'Document'},
  type: {type: String, default: 'file', enum: ['File', 'Folder']},
  content: {type: String, default: null}, // applicable only for file
  name: {type: String},
  createdBy: {type: Schema.ObjectId, ref: 'User'}
}, {timestamps: true});


mongoose.model('Document', DocumentSchema);


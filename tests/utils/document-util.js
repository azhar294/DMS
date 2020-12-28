const documentRepository = require('../../app/repositories/document-repository');

async function createDocument(doc) {
 return await documentRepository.create(doc);
}

module.exports = {
  createDocument
};

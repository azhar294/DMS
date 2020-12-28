const documentRepository = require('../repositories/document-repository');
const EntityExistError = require('../../errors/entity-exist-error');
const BadRequestError = require('../../errors/bad-request-error');

module.exports = {
  createDocument
};

async function createDocument(params) {
  let matchCriteria = {createdBy: params.user, name: params.name, type: params.type};
  if (params.rootDir) {
    if (params.type === 'Folder') {
      throw new BadRequestError("Nested folder not supported as of now", 400);
    }
    matchCriteria.rootDir = params.rootDir;
  }
  // validate
  if (await documentRepository.findOne(matchCriteria)) {
    throw new EntityExistError('File/Folder Already Exist', 409)
  }

  // create account object
  const document = {
    name: params.name,
    type: params.type,
    createdBy: params.user,
    content: params.content ? params.content : null,
    rootDir: params.rootDir
  };

  // save document
  await documentRepository.create(document);

}



const documentRepository = require('../repositories/document-repository');
const EntityExistError = require('../../errors/entity-exist-error');
const BadRequestError = require('../../errors/bad-request-error');

module.exports = {
  createDocument,
  moveFile,
  listDocuments
};

async function createDocument(params) {
  let matchCriteria = {createdBy: params.user, name: params.name, type: params.type};
  if (params.parentDir) {
    if (params.type === 'Folder') {
      throw new BadRequestError("Nested folder not supported as of now", 400);
    }
    matchCriteria.parentDir = params.parentDir;
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
    parentDir: params.parentDir
  };

  // save document
  await documentRepository.create(document);

}


async function moveFile(params) {
  let promiseArr = [];
  let fileMatchCriteria = {createdBy: params.user, _id: params.file, type: 'File'};
  promiseArr.push(documentRepository.findOne(fileMatchCriteria));
  if (params.folder) {
    let folderMatchCriteria = {createdBy: params.user, _id: params.folder, type: 'Folder'};
    promiseArr.push(documentRepository.findOne(folderMatchCriteria));
  }

  let [fileExist, folderExists] = await Promise.all(promiseArr);
  if (!fileExist || (params.folder != null && !folderExists)) {
    throw new BadRequestError('File/Folder not Exist', 400)
  }

  //update file
  fileExist.parentDir = params.folder;
  await fileExist.save();
}


async function listDocuments(params) {
  return await documentRepository.find({parentDir: params.folder, createdBy: params.user}, '-createdBy -parentDir', {lean: true});
}

const path = require('path');
const express = require('express');
const xss = require('xss'); 
const foldersService = require('./folders-service');

const foldersRouter = express.Router();
const jsonParser = express.json();

const serializeFolder = (folder) => ({
  id: folder.id,
  name: xss(folder.name),
});

foldersRouter
.route('/')
.get((req, res, next) => {
  const knexInstance = req.app.get('database');
  foldersService.getAllFolders(knexInstance)
    .then(folders =>{
      res.json(folders)
    })
    .catch(error => res.status(500).json(arguments))
})

.post(jsonParser, (req, res, next) => {
  const { name } = req.body
  const newFolder = { name }

  for (const [key, value] of Object.entries(newFolder)) {
         if (value == null) {
           return res.status(400).json({
             error: { message: `Missing '${key}' in request body` }
           })
         }
       }

  FoldersService.insertFolder(
    req.app.get('database'),
    newFolder
  )
    .then(folder => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${folder.id}`))
        .json(serializeFolder(folder));
    })
    .catch(next);
});

foldersRouter
.route('/:folder_id')
.all((req, res, next) => {
       FoldersService.getFolderById(
         req.app.get('database'),
         req.params.folder_id
       )
         .then(folder => {
           if (!folder) {
             return res.status(404).json({
               error: { message: `Folder doesn't exist` }
             })
           }
           res.folder = folder // save the folder for the next middleware
           next() 
         })
         .catch(next)
     })
      .get((req, res, next) => {
       res.json(serializeFolder(res.folder))
})
.delete((req, res, next) => {
  FoldersService.deleteFolder(
         req.app.get('database'),
         req.params.folder_id
       )
         .then(numRowsAffected => {
           res.status(204).end()
         })
         .catch(next)
     })
.patch(jsonParser, (req, res, next) => {
      const { name, folderId } = req.body
      const folderToUpdate = { name, folderId }
  
      const numberOfValues = Object.values(folderToUpdate).filter(Boolean).length
      if (numberOfValues === 0)
        return res.status(400).json({
          error: {
            message: `Request body must content either 'name' or 'folderId'`
          }
        })
  
      FoldersService.updateFolder(
        req.app.get('database'),
        req.params.folder_id,
        folderToUpdate
      )
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
      })

      module.exports = foldersRouter
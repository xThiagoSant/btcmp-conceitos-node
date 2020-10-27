const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body
  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes:0
  }
  repositories.push(repo)
  return response.json(repo)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params
  const {title, url, techs} = request.body

  const idRepo = repositories.findIndex(repo => repo.id === id)
  if(idRepo === -1) {
    return response.status(400).json({error:'Id not found.'})  }

  repositories[idRepo] = {...repositories[idRepo], title, url, techs}  

  return response.json(repositories[idRepo])
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params

  const idRepo = repositories.findIndex(repo => repo.id === id)
  if(idRepo === -1){
    return response.status(400).json({error:'Id not found'})
  }

  repositories.splice(idRepo, 1)
  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const idRepo = repositories.findIndex(repo => repo.id === id)
  if(idRepo === -1){
    return response.status(400).json({error:'Id not found'})
  }
  
  repositories[idRepo].likes ++
  return response.json(repositories[idRepo])
});

module.exports = app;

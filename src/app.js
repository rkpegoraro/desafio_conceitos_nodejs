const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repos = [];


// List all repositories created. It will be refreshed on each 
// restart, because the data is not stored in a persistent way (yet)
app.get("/repositories", (request, response) => {
  return response.json(repos)
});


//Create a new repository
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repo = { id: uuid(), title, url, techs, likes: 0};

  repos.push(repo);

  return response.json(repo)
});

// Change a repository
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repos.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "Repository not found."});
  }

  likes = repos[repoIndex].likes

  const repo = {
    id,
    title,
    url,
    techs,
    likes
  }

  repos[repoIndex] = repo;

  return response.json(repo);
});

// Delete a repository
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repos.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "Repository not found."});
  }

  repos.splice(repoIndex, 1);

  response.status(204).send();

});

// Increse the number of likes by 1
app.put("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repo = repos.find(repo => repo.id === id);

  if (!repo) {
    return response.status(400).json({ error: "Repository not found."});
  }

  repo.likes += 1


  return response.json({ likes: repo.likes });
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;

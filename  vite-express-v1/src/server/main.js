import express from "express";
import ViteExpress from "vite-express";

import session from "express-session";


const app = express();
const PORT = 3000; // Port d'Ã©coute du serveur

// Middleware pour parser les corps de requÃªtes JSON
app.use(express.json());

// Middleware pour parser les corps de requÃªtes de formulaire urlencoded
app.use(express.urlencoded({ extended: true }));

// Configuration de la session pour stocker des donnÃ©es de maniÃ¨re persistante entre les requÃªtes
app.use(
  session({
    secret: "secret key", // ClÃ© secrÃ¨te pour signer le cookie de session
    resave: false, // N'enregistre pas la session dans le store Ã  chaque requÃªte si rien n'est modifiÃ©
    saveUninitialized: true, // Sauvegarde les sessions non initialisÃ©es
    cookie: { secure: false }, // Utilisation de cookies non sÃ©curisÃ©s car l'application n'utilise pas HTTPS
  })
);

app.use((req, res, next) => {

  if (!req.session.data) {
    req.session.data = [];
  }
  next();
});

// Route GET pour rÃ©cupÃ©rer les donnÃ©es de la session
app.get("/api", (req, res) => {

  res.status(200).json(req.session.data);

});

app.post("/api", (req, res) => {
  
  const { value } = req.body; // Extraction de la valeur depuis le corps de la requÃªte
  const id = req.session.data.length + 1; // Attribution d'un nouvel ID
  const item = { id, value }; // CrÃ©ation de l'objet item

  req.session.data.push(item); // Ajout de l'item au tableau de la session
  res.status(201).json(item); // Envoi de l'item crÃ©Ã© avec un code de statut 201

});
// Route PUT pour mettre Ã  jour une donnÃ©e spÃ©cifique dans la session
app.put("/api/:id", (req, res) => {

  const { id } = req.params; // ID spÃ©cifiÃ© dans l'URL
  const { value } = req.body; // Nouvelle valeur Ã  mettre Ã  jour

  const itemIndex = req.session.data.findIndex(
    (item) => item.id === Number(id)
  );

  if(itemIndex === -1) {
    res.status(404).send("Item not found");
  } else {
    req.session.data[itemIndex] = { id: Number(id), value };
    res.status(200).json(req.session.data[itemIndex]);
  }
});

// Route DELETE pour supprimer une donnÃ©e spÃ©cifique de la session
app.delete("/api/:id", (req, res) => {

  const { id } = req.params; // ID spÃ©cifiÃ© dans l'URL

  const itemIndex = req.session.data.findIndex(
    (item) => item.id === Number(id)
  );

  if(itemIndex === -1) {

    res.status(404).send("Item not found");

  } else {

    req.session.data.splice(itemIndex, 1);
    res.status(204).send();
  }

});


ViteExpress.listen(app, PORT, () =>
  console.log("Server is listening on port PORT..."),
);

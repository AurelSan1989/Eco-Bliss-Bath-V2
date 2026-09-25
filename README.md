<div align="center">

# OpenClassrooms - Eco-Bliss-Bath
</div>

<p align="center">
    <img src="https://img.shields.io/badge/MariaDB-v11.7.2-blue">
    <img src="https://img.shields.io/badge/Symfony-v6.2-blue">
    <img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
    <img src="https://img.shields.io/badge/docker--build-passing-brightgreen">
  <br><br><br>
</p>

# Prérequis
Pour démarrer cet applicatif web vous devez avoir les outils suivants:
- Docker
- NodeJs

# Installation et démarrage
Clonez le projet pour le récupérer
``` 
git clone https://github.com/OpenClassrooms-Student-Center/Eco-Bliss-Bath-V2.git
cd Eco-Bliss-Bath-V2
```
Pour démarrer l'API avec ça base de données.
```
docker compose up -d
```
# Pour démarrer le frontend de l'applicatif
Rendez-vous dans le dossier frontend
```
cd ./frontend
```
Installez les dépendances du projet
```
npm i
ou
npm install (si vous préférez)
```

# Tests automatisés (Cypress)
Le frontend et l'API doivent être démarrés (cf sections précédentes) avant de lancer les tests
Cypress est déjà inclus dans les dépendances de développement du projet donc il s'installera automatiquement lors du `npm install` réalisé plus haut

## Lancer les tests avec l'interface graphique
```
npx cypress open
```

## Lancer tous les tests et générer le rapport 
``` 
npx cypress run
```
Un résumé s'affichera dans le terminal à la fin de l'exécution de tous les tests. Des captures d'écrans sont générées pour chaque test en échec dans le dossier 'frontend/cypress/screenshots'.
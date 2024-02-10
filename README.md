> Ce projet illustre une version simplifiée du Proxy Pattern en Solidity, avec l'utilisation du Eternel Storage Pattern pour s'assurer que les données des contrats restent accessibles et modifiables à travers différentes versions.

## Présentation

Le Proxy Pattern est un concept qui a pour but de rendre les smart contracts évolutifs sur Ethereum. Il permet une séparation entre la logique métier du contrat et son état de stockage, ce qui facilite les mises à jour du code sans perte des données. Le Eternel Storage Pattern complète cette approche en fournissant un mécanisme de stockage flexible et pérenne, indépendant des mises à jour de la logique métier du contrat.

## Les contrats

- **Proxy Contract**: Sert de façade pour router les appels vers des implémentations spécifiques de contrats, permettant le changement de logique sous-jacente sans modifier l'adresse du contrat.
- **Logic Contracts (ContractV1 et ContractV2)**: Implémentent la logique métier du contrat, qui peut être mise à jour ou remplacée au fil du temps.
- **Eternal Storage**: Un contrat de stockage qui sépare les données de la logique métier du contrat, ce qui permet d'assurer que le stockage est maintenu à travers les différentes version.

## Installation

Installez les dépendances :

```bash
npm install
```

Ou avec Yarn :

```bash
yarn
```

## Compilation

Compilez les smart contracts avec Hardhat :

```bash
npx hardhat compile
```

## Tests

Les tests illustrent comment un contrat peut être mis à jour de `ContractV1` à `ContractV2`, tout en conservant l'état dans l'Eternal Storage et en permettant des interactions transparentes via le Proxy Contract.

```bash
npx hardhat test
```

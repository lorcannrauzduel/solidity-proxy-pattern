> Ce projet illustre une version simplifiée du pattern Proxy en Solidity, en combinaison avec le pattern Eternel Storage, il permet de s'assurer que les données des contrats restent accessibles et modifiables à travers différentes versions.

## Présentation

Le Proxy Pattern est un concept qui a pour but de rendre les smart contracts évolutifs sur Ethereum. Il permet une séparation entre la logique métier du contrat et son état de stockage, ce qui facilite les mises à jour du code sans perte des données. Le Eternel Storage Pattern complète cette approche en fournissant un mécanisme de stockage flexible et pérenne, indépendant des mises à jour de la logique métier du contrat.

## Les contrats

- **Proxy Contract**: Agit comme une façade vers le smart contract contenant le code à exécuter. La façade ne change pas, mais il est possible de déployer des nouvelles versions de l'implémentation et de connecter le proxy à la version souhaitée.
- **Eternal Storage**: Sépare les données de la logique métier du contrat, ce qui permet d'assurer que le stockage est maintenu à travers les différentes version. Quand nous déployons une nouvelle version de la logique métier, le même contrat de stockage peut être utilisé, ce qui permet de conserver les données de version en version.
- **Contrats de logique métier (ContractV1 et ContractV2)**: Implémentent la logique métier du contrat, qui peut être mise à jour ou remplacée au fil du temps.

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

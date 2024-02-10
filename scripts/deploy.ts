import { ethers } from 'hardhat';

async function main() {
	const Proxy = await ethers.getContractFactory('Proxy');
	const proxy = await Proxy.deploy();
	await proxy.waitForDeployment();
	const proxyAddress = await proxy.getAddress();

	console.log('Proxy deployed to:', proxyAddress);

	const EternelStorage = await ethers.getContractFactory('EternelStorage');
	const eternelStorage = await EternelStorage.deploy();
	await eternelStorage.waitForDeployment();
	const eternelStorageAddress = await eternelStorage.getAddress();

	console.log('EternelStorage deployed to:', eternelStorageAddress);

	const ContractV1 = await ethers.getContractFactory('ContractV1');
	const contractV1 = await ContractV1.deploy();
	await contractV1.waitForDeployment();
	const contractV1Address = await contractV1.getAddress();

	console.log('ContractV1 deployed to:', contractV1Address);

	await proxy.setImplementation(await contractV1.getAddress());
	await proxy.setStorageAddress(await eternelStorage.getAddress());

	console.log('Implementation set to ContractV1');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

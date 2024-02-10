import { assert } from 'chai';
import { ethers } from 'hardhat';

describe('Proxy', () => {
	it('Should upgrade the contract', async () => {
		const Proxy = await ethers.getContractFactory('Proxy');
		const ContractV1 = await ethers.getContractFactory('ContractV1');
		const ContractV2 = await ethers.getContractFactory('ContractV2');
		const EternelStorage = await ethers.getContractFactory('EternelStorage');

		const proxyInstance = await Proxy.deploy();
		await proxyInstance.waitForDeployment();
		const contractV1Instance = await ContractV1.deploy();
		await contractV1Instance.waitForDeployment();
		const contractV2Instance = await ContractV2.deploy();
		await contractV2Instance.waitForDeployment();
		const eternelStorageInstance = await EternelStorage.deploy();
		await eternelStorageInstance.waitForDeployment();

		const contractProxy = await ethers.getContractAt(
			'ContractV1',
			await proxyInstance.getAddress()
		);

		await proxyInstance.setImplementation(
			await contractV1Instance.getAddress()
		);
		await proxyInstance.setStorageAddress(
			await eternelStorageInstance.getAddress()
		);

		assert.equal(await contractProxy.getMessage(), 'Message V1: ');

		await contractProxy.setMessage('Hello world');

		assert.equal(await contractProxy.getMessage(), 'Message V1: Hello world');

		await proxyInstance.setImplementation(
			await contractV2Instance.getAddress()
		);

		assert.equal(await contractProxy.getMessage(), 'Message V2: Hello world');

		await contractProxy.setMessage('Hello web3');

		assert.equal(await contractProxy.getMessage(), 'Message V2: Hello web3');
	});
});

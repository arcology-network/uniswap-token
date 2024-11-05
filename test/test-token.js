const hre = require("hardhat");
var frontendUtil = require('@arcologynetwork/frontend-util/utils/util')

async function main() {
  
  accounts = await ethers.getSigners(); 
  const tokens = [
      { name: "TokenA", symbol: "TKNA", initialSupply: 10 },
      { name: "TokenB", symbol: "TKNB", initialSupply: 10 },
      { name: "TokenC", symbol: "TKNC", initialSupply: 10 },
      { name: "TokenD", symbol: "TKND", initialSupply: 10 },
      { name: "TokenE", symbol: "TKNE", initialSupply: 10 },
      { name: "TokenF", symbol: "TKNF", initialSupply: 10 }
  ];
  
  let i;
  var tokenInsArray=new Array();
  let tokenFactory = await ethers.getContractFactory("Token");
  for (const token of tokens) {
    console.log(`Deploying ${token.name}...`);
    const tokenIns = await tokenFactory.deploy(token.name, token.symbol);
    await tokenIns.deployed();
    console.log(`Deployed ${token.name} at ${tokenIns.address}`);
    tokenInsArray.push(tokenIns);
  }
  
  /*
  console.log('===========start mint token=====================')
  var txs=new Array();
  for(i=0;i<5;i++) {
    txs.push(frontendUtil.generateTx(function([tokenIns,from,amount]){
      return tokenIns.mint(from.address,amount);
    },tokenInsArray[0],accounts[i],150));
  }
  await frontendUtil.waitingTxs(txs);
  
  let tx,receipt,balance,formattedBalance;
  const decimals=18;
  console.log('===========balance of token=====================')
  txs=new Array();
  for(i=0;i<10;i++) {
    balance = await tokenInsArray[0].balanceOf(accounts[i].address);
    formattedBalance = ethers.utils.formatUnits(balance, decimals);
    console.log(`Balance of account ${accounts[i].address}: ${formattedBalance} `);
  }
  
  console.log('===========start transfer token=====================')
  var txs=new Array();
  for(i=0;i<5;i++) {
    txs.push(frontendUtil.generateTx(function([tokenIns,from,recipient,amount]){
      return tokenIns.connect(from).transfer(recipient.address,amount);
    },tokenInsArray[0],accounts[i],accounts[i+5],50));
  }
  await frontendUtil.waitingTxs(txs);
  // tx = await tokenInsArray[0].connect(accounts[0]).transfer(accounts[5].address,50);
  // receipt = await tx.wait();
  // frontendUtil.showResult(frontendUtil.parseReceipt(receipt));
  // // balance=frontendUtil.parseEvent(receipt,"Step");
  // console.log(receipt);

  console.log('===========balance of token=====================')
  txs=new Array();
  for(i=0;i<10;i++) {
    balance = await tokenInsArray[0].balanceOf(accounts[i].address);
    formattedBalance = ethers.utils.formatUnits(balance, decimals);
    console.log(`Balance of account ${accounts[i].address}: ${formattedBalance} `);
  }

  console.log('===========allowance of token=====================')
  txs=new Array();
  for(i=0;i<5;i++) {
    // tx = await tokenInsArray[0].allowance(accounts[i].address,accounts[i+5].address);
    // receipt = await tx.wait();
    // frontendUtil.showResult(frontendUtil.parseReceipt(receipt));
    // balance=frontendUtil.parseEvent(receipt,"Balance");
    // console.log(balance);

    balance = await tokenInsArray[0].allowance(accounts[i].address,accounts[i+5].address);
    formattedBalance = ethers.utils.formatUnits(balance, decimals);
    console.log(`Allowance of account ${accounts[i].address}: ${formattedBalance} `);
  }
  

  console.log('===========start approve token=====================')
  txs=new Array();
  for(i=0;i<5;i++) {
    txs.push(frontendUtil.generateTx(function([tokenIns,from,recipient,amount]){
      return tokenIns.connect(from).approve(recipient.address,amount);
    },tokenInsArray[0],accounts[i],accounts[i+5],50));
  }
  await frontendUtil.waitingTxs(txs);

  console.log('===========allowance of token=====================')
  txs=new Array();
  for(i=0;i<5;i++) {
    balance = await tokenInsArray[0].allowance(accounts[i].address,accounts[i+5].address);
    formattedBalance = ethers.utils.formatUnits(balance, decimals);
    console.log(`Allowance of account ${accounts[i].address}: ${formattedBalance} `);
  }

  console.log('===========start transferFrom token=====================')
  txs=new Array();
  for(i=0;i<5;i++) {
    txs.push(frontendUtil.generateTx(function([tokenIns,from,recipient,amount]){
      return tokenIns.connect(recipient).transferFrom(from.address,recipient.address,amount);
    },tokenInsArray[0],accounts[i],accounts[i+5],50));
  }
  await frontendUtil.waitingTxs(txs);

  // tx = await tokenInsArray[0].connect(accounts[5]).transferFrom(accounts[0].address,accounts[5].address,50);
  // receipt = await tx.wait();
  // frontendUtil.showResult(frontendUtil.parseReceipt(receipt));
  // console.log(receipt);

  console.log('===========balance of token=====================')
  txs=new Array();
  for(i=0;i<10;i++) {
    balance = await tokenInsArray[0].balanceOf(accounts[i].address);
    formattedBalance = ethers.utils.formatUnits(balance, decimals);
    console.log(`Balance of account ${accounts[i].address}: ${formattedBalance} `);
  }

  console.log('===========start burn token=====================')
  txs=new Array();
  for(i=0;i<5;i++) {
    txs.push(frontendUtil.generateTx(function([tokenIns,recipient,amount]){
      return tokenIns.burn(recipient.address,amount);
    },tokenInsArray[0],accounts[i+5],100));
  }
  await frontendUtil.waitingTxs(txs);

  console.log('===========balance of token=====================')
  txs=new Array();
  for(i=0;i<10;i++) {
    balance = await tokenInsArray[0].balanceOf(accounts[i].address);
    formattedBalance = ethers.utils.formatUnits(balance, decimals);
    console.log(`Balance of account ${accounts[i].address}: ${formattedBalance} `);
  }
  
  console.log('===========start transfer token,successful 3 txs(30 40 50)=====================')
  var txs=new Array();
  for(i=0;i<5;i++) {
    txs.push(frontendUtil.generateTx(function([tokenIns,from,recipient,amount]){
      return tokenIns.connect(from).transfer(recipient.address,amount);
    },tokenInsArray[0],accounts[i],accounts[i+5],30+i*10));
  }
  await frontendUtil.waitingTxs(txs);

  console.log('===========balance of token=====================')
  txs=new Array();
  for(i=0;i<10;i++) {
    balance = await tokenInsArray[0].balanceOf(accounts[i].address);
    formattedBalance = ethers.utils.formatUnits(balance, decimals);
    console.log(`Balance of account ${accounts[i].address}: ${formattedBalance} `);
  }

  console.log('===========start burn token,successful 2 txs(tail 2)=====================')
  txs=new Array();
  for(i=0;i<5;i++) {
    txs.push(frontendUtil.generateTx(function([tokenIns,recipient,amount]){
      return tokenIns.burn(recipient.address,amount);
    },tokenInsArray[0],accounts[i],50));
  }
  await frontendUtil.waitingTxs(txs);

  console.log('===========balance of token=====================')
  txs=new Array();
  for(i=0;i<10;i++) {
    balance = await tokenInsArray[0].balanceOf(accounts[i].address);
    formattedBalance = ethers.utils.formatUnits(balance, decimals);
    console.log(`Balance of account ${accounts[i].address}: ${formattedBalance} `);
  }
    */
  
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

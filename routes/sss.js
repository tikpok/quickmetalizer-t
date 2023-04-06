

require('dotenv').config();
const express = require("express");
const crypto = require('crypto');
const fs = require('fs');
const path = require('path')
const router = express.Router();
const getsss = express.Router();

var NODE = 'https://mikun-testnet.tk:3001';
const sym  = require("symbol-sdk");
repo = new sym.RepositoryFactoryHttp(NODE);
txRepo = repo.createTransactionRepository();

const metal = require("metal-on-symbol");
const { response } = require('express');

const ss = new metal.SymbolService({
    node_url: "https://mikun-testnet.tk:3001" ,
    repo_factory_config:{
        websocketUrl:"wss://mikun-testnet.tk:3001/ws",
        
    }
});

const ms = new metal.MetalService(ss);

 privateKey = process.env.PRIKEY;
 tkpk = sym.Account.createFromPrivateKey(privateKey, sym.NetworkType.TEST_NET, );


GENERATION_HASH = '49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4';
EPOCH_ADJUSTMENT = 1667250467;
const XYM_ID = '72C0212E67A08BCE'
   const tkpk_ID = "370205831199DE9C"


getsss.get("/",(req, res) =>{


res.send("OK")
});

getsss.use(express.urlencoded({ extended: true }));
getsss.use(express.json());
getsss.post("/",(req,res) =>{
  
  async function tx() {
  try{
  privateKey = process.env.PRIKEY;
  tkpk = sym.Account.createFromPrivateKey(privateKey, sym.NetworkType.TEST_NET, );
var sssPublicAccount = req.body.data;
var ssspubkey = sssPublicAccount.publicKey;

 sss = sym.PublicAccount.createFromPublicKey(ssspubkey,sym.NetworkType.TEST_NET, );
const accountRepo = repo.createAccountRepository();
const accountInfo = await accountRepo.getAccountInfo(sss.address).toPromise();

const mosaicList = [];
accountInfo.mosaics.forEach( mosaic => {
  
		mosaicList.push({id:mosaic.id.toHex(),amount:mosaic.amount.compact()})

     if(mosaic.id.toHex() === '370205831199DE9C'){
      alice =  sym.Account.generateNewAccount(sym.NetworkType.TEST_NET );
       alicekey = alice.privateKey;
        }
});
console.log(mosaicList);
 
var totalhandlingfee = req.body.total;
console.log(totalhandlingfee);


const encryptedMessage = tkpk.encryptMessage(alicekey.toString(),sss,);


tkpktx = sym.TransferTransaction.create(
  sym.Deadline.create(EPOCH_ADJUSTMENT),
 alice.address,
[ new sym.Mosaic(
  new sym.MosaicId(XYM_ID),
  sym.UInt64.fromUint(Math.ceil(totalhandlingfee)),
)],
[],
sym.NetworkType.TEST_NET 
);

ssstx = sym.TransferTransaction.create(
  sym.Deadline.create(EPOCH_ADJUSTMENT),
  tkpk.address, 
  [ new sym.Mosaic(
    new sym.MosaicId(tkpk_ID),
    sym.UInt64.fromUint(Math.ceil(totalhandlingfee/ Math.pow(10, 6) )),
  )],
  [],
  sym.NetworkType.TEST_NET 
);

supplyMutable = false; 
    transferable = true; 
    restrictable = false;
    revokable = false; 
    
    
    nonce = sym.MosaicNonce.createRandom();
    mosaicDefTx = sym.MosaicDefinitionTransaction.create(
        undefined, 
        nonce,
        sym.MosaicId.createFromNonce(nonce, alice.address), 
        sym.MosaicFlags.create(supplyMutable, transferable, restrictable, revokable),
        0,
        sym.UInt64.fromUint(0), //duration:有効期限
        sym.NetworkType.TEST_NET 
    );
    
    mosaicChangeTx = sym.MosaicSupplyChangeTransaction.create(
        undefined,
        mosaicDefTx.mosaicId,
        sym.MosaicSupplyChangeAction.Increase,
        sym.UInt64.fromUint(1), 
        sym.NetworkType.TEST_NET 
    );
    alicetx  = sym.TransferTransaction.create(
      sym.Deadline.create(EPOCH_ADJUSTMENT),
      sss.address, 
      [],
      encryptedMessage,
      sym.NetworkType.TEST_NET 
    );

aggregateArray = [
  
  
  tkpktx.toAggregate(tkpk.publicAccount),
  ssstx.toAggregate(sss),
  mosaicDefTx.toAggregate(alice.publicAccount),
 mosaicChangeTx.toAggregate(alice.publicAccount),
 alicetx.toAggregate(alice.publicAccount),
]
console.log(aggregateArray);
 aggregateTransaction = sym.AggregateTransaction.createComplete(
  sym.Deadline.create(EPOCH_ADJUSTMENT),
  aggregateArray,
  sym.NetworkType.TEST_NET,
  [],sym.UInt64.fromUint(1000000),
  )
  console.log(aggregateTransaction);


  tkpkSignedTx = tkpk.sign(aggregateTransaction,GENERATION_HASH);
  signedHash = tkpkSignedTx.hash;
  console.log(signedHash);
  payload = tkpkSignedTx.payload;
 
aliceSignedTx = sym.CosignatureTransaction.signTransactionPayload(alice, payload, GENERATION_HASH);
//console.log(aliceSignedTx);



aliceSignedTxSignature = aliceSignedTx.signature;
aliceSignedTxSignerPublicKey = aliceSignedTx.signerPublicKey;
  
alicesignedHash = sym.Transaction.createTransactionHash(payload,Buffer.from(GENERATION_HASH, 'hex'));
console.log(alicesignedHash);

res.send (payload);
 }
 catch(e)  {
  console.error(e);
  process.exit(1);
};
 

}tx();
});

getsss.post("/recreate",(req,res) =>{
  async function recretx() {
    var ssssignedsignature = req.body.signature;
    var sssSignedTxSignerPublicKey = req.body.publickey;
    console.log(req.body.signature);

    cosignSignedTxs = [
      new sym.CosignatureSignedTransaction(signedHash,aliceSignedTxSignature,aliceSignedTxSignerPublicKey),
      new sym.CosignatureSignedTransaction(signedHash,ssssignedsignature,sssSignedTxSignerPublicKey )
    ];
    console.log(cosignSignedTxs);
    recreatedTx = sym.TransactionMapping.createFromPayload(payload);
/*    cosignSignedTxs.forEach((cosignedTx) => {
      payload += cosignedTx.version.toHex() + cosignedTx.signerPublicKey + cosignedTx.signature;
    
  });
  size = `00000000${(payload.length / 2).toString(16)}`;
  formatedSize = size.substr(size.length - 8, size.length);
  littleEndianSize = formatedSize.substr(6, 2) + formatedSize.substr(4, 2) + formatedSize.substr(2, 2) + formatedSize.substr(0, 2);
  
  signedPayload = littleEndianSize + payload.substr(8, payload.length - 8);
*/ 
  signedTx = tkpk.signTransactionGivenSignatures(recreatedTx,cosignSignedTxs,GENERATION_HASH);
  console.log(signedTx);
      await txRepo.announce(signedTx).toPromise();
       console.log(NODE + "/transactionStatus/" + signedTx.hash); 
       listener = repo.createListener();
       listener.open().then(() => {
        console.log("listener open")
    listener.confirmed(tkpk.address)
    .subscribe(tx=>{ 
      console.log(tx);
      const forgeMetal = async (
        type = Mosaic,
        sourcePubAccount = alice.PublicAccount,
        targetPubAccount = alicePublicAccount,
        targetId = mosaicDefTx.mosaicId,
        payload = f,
        signerAccount = alice,
        cosignerAccounts = alice,
        additive = new Uint8Array([0x37, 0x33, 0x33, 0x38]),
    ) => {
        const { key, txs, additive: newAdditive } = await ms.createForgeTxs(
          sym.MetadataType.Mosaic,
            sourcePubAccount,
            targetPubAccount,
            targetId,
            payload,
            additive,
        );
        const batches = await ss.buildSignedAggregateCompleteTxBatches(
            txs,
            signerAccount,
            undefined,
            0.0,
        );
        const errors = await ss.executeBatches(batches, signerAccount);
        if (errors){
          console.log("コンプリートへ")
          const completeSignedTx = ss.createSignedTxWithCosignatures(
            batches[0].signedTx,
            batches[0].cosignatures
            
        );
        await txRepo.announce(completeSignedTx).toPromise();
          
        console.log(NODE + "/transactionStatus/" + completeSignedTx.hash);
        }
        const metalId = metal.MetalService.calculateMetalId(
            type,
            sourcePubAccount.address,
            targetPubAccount.address,
            targetId,
            key,
        );
    
        return {
            metalId,
            key,
            additive: newAdditive,
        };
    };
    
    forgeMetal(
        sym.MetadataType.Mosaic,
        alice.publicAccount,
        alice.publicAccount,
        mosaicDefTx.mosaicId,
        f,
        alice,
        [],
        new Uint8Array([0x37, 0x33, 0x33, 0x38])
    ).then(({ metalId, key, additive }) => {
        console.log(`Forged! metalId=${metalId},key=${key.toHex()},additive=${(additive)}`);
mosaicId = mosaicDefTx.mosaicId.toHex();
        console.log("done");
        res.json([mosaicId,metalId]);
        listener.close();
  

    }).catch((e) => {
        console.error(e);
        process.exit(1);
    });
    
        });  
     
      })
    }recretx()

  });

 
module.exports = getsss;


/*
supplyMutable = false; 
    transferable = true; 
    restrictable = false;
    revokable = false; 
    
    
    nonce = sym.MosaicNonce.createRandom();
    mosaicDefTx = sym.MosaicDefinitionTransaction.create(
        undefined, 
        nonce,
        sym.MosaicId.createFromNonce(nonce, alice.address), 
        sym.MosaicFlags.create(supplyMutable, transferable, restrictable, revokable),
        0,
        sym.UInt64.fromUint(0), //duration:有効期限
        sym.NetworkType.TEST_NET 
    );
    console.log(mosaicDefTx);
    mosaicChangeTx = sym.MosaicSupplyChangeTransaction.create(
        undefined,
        mosaicDefTx.mosaicId,
        sym.MosaicSupplyChangeAction.Increase,
        sym.UInt64.fromUint(1), 
        sym.NetworkType.TEST_NET 
    );
const aggregateTransaction = sym.AggregateTransaction.createComplete(
sym.Deadline.create(EPOCH_ADJUSTMENT),
[
  ssstx.toAggregate(sssPublicAccount),
  tkpktx.toAggregate(tkpk.PublicAccount),
  mosaicDefTx.toAggregate(alice.publicAccount),
  mosaicChangeTx.toAggregate(alice.publicAccount),
],
sym.NetworkType.TEST_NET,
[],
).setMaxFeeForAggregate(100,2);

tkpkSignedTx = tkpk.sign(aggregateTransaction)
aliceSignedTx = alice.sign(aggregateTransaction)
payload = tkpkSignedTx.payload;
aliceSignedTx = sym.CosignatureTransaction.signTransactionPayload(alice, payload, GENERATION_HASH);
Payload = aliceSignedTx.payload;


aliceSignedTxSignature = aliceSignedTx.signature;
aliceSignedTxSignerPublicKey = aliceSignedTx.signerPublicKey;
  
signedHash = sym.Transaction.createTransactionHash(signedPayload,Buffer.from(GENERATION_HASH, 'hex'));
cosignSignedTxs = [
  new sym.CosignatureSignedTransaction(signedHash,aliceSignedTxSignature,aliceSignedTxSignerPublicKey)
];

res.send (payload);
*/
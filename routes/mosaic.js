const upload = require('./upload');
const express = require("express");
const crypto = require('crypto');
const fs = require('fs');
const path = require('path')
const mosarouter = express.Router();

var NODE = 'https://mikun-testnet.tk:3001';
const sym  = require("symbol-sdk");
const metal = require("metal-on-symbol");
const { response } = require('express');

const ss = new metal.SymbolService({
    node_url: "https://mikun-testnet.tk:3001" ,
    repo_factory_config:{
        websocketUrl:"wss://mikun-testnet.tk:3001/ws",
        
    }
});

const ms = new metal.MetalService(ss);

const privateKey = process.env.PRIKEY;
const tkpk = sym.Account.createFromPrivateKey(privateKey, sym.NetworkType.TEST_NET, );


GENERATION_HASH = '49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4';
EPOCH_ADJUSTMENT = 1667250467;

mosarouter.use(express.urlencoded({ extended: true }));
mosarouter.use(express.json());



mosarouter.get("/", (req, res) =>{
    res.send("ok");
  });

  mosarouter.post("/",upload.single("file"), async (req, res) =>{
     f = req.file.buffer;
    //console.log(f);
  // const filePath = path.join(__dirname, '../uploads', req.file.filename);
   // const fileContent = fs.readFileSync(filePath);
    uint8Array = new Uint8Array([0x37, 0x33, 0x33, 0x38]);
    const forgeMetal = async () => {

      
        const uint8Array = new Uint8Array([7,3,3,8]);
       const { key, txs,  } = await ms.createForgeTxs(
           sym.MetadataType.Mosaic, 
         tkpk.publicAccount,
         tkpk.publicAccount,
         "370205831199DE9C",
         f ,
         uint8Array
       );
       const batches = await ss.buildSignedAggregateCompleteTxBatches(
           txs,
           tkpk,
           undefined,
           0.0,
         );console.log(batches);

         total = [];
    for (let i = 0 ; i < batches.length ; i++){
    var fee =batches[i].maxFee.toString()
    var Fee= parseInt(fee) ;
    total.push(Fee);
    console.log(total);
    };
    
    totalFee = 0;
    for (let i = 0 ; i < total.length ; i++){
    totalFee += total[i];
    
      
    }
    return {
      
      key,
      uint8Array,
      totalFee
      };
  }
       forgeMetal(
        sym.MetadataType.Mosaic, 
          tkpk.publicAccount,
          tkpk.publicAccount,
          "370205831199DE9C",
          f,
          tkpk,
          []
    ).then(({key,uint8Array,totalFee}) => {

      console.log(`key=${key.toHex()},uint8array=${uint8Array}`);

      supplyMutable = false; 
      transferable = true; 
      restrictable = false;
      revokable = false; 
      
      
      nonce = sym.MosaicNonce.createRandom();
      mosaicDefTx = sym.MosaicDefinitionTransaction.create(
          undefined, 
          nonce,
          sym.MosaicId.createFromNonce(nonce, tkpk.address), 
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
      
      aggregateTx = sym.AggregateTransaction.createComplete(
          sym.Deadline.create(EPOCH_ADJUSTMENT),
          [
            mosaicDefTx.toAggregate(tkpk.publicAccount),
            mosaicChangeTx.toAggregate(tkpk.publicAccount),
          ],
          sym.NetworkType.TEST_NET,[],
      ).setMaxFeeForAggregate(100,0);
      
      const transactionSize = aggregateTx.size;
      const feeMultiplier = 100; // 手数料の乗数
      const transactionfee = Number(transactionSize * feeMultiplier); //手数料乗数に基づく手数料を計算
            
      const createmosaicfee =Number( sym.UInt64.fromUint(50000000));
      metalfee =Number(totalFee);
      totalhandlingfee =createmosaicfee + metalfee;
      console.log(totalhandlingfee);
      res.json(totalhandlingfee);
      return {totalhandlingfee ,f};
      
    });


    
   
    
    //signedTx = tkpk.sign(aggregateTx,GENERATION_HASH );
    //await txRepo.announce(signedTx).toPromise();
    //console.log(signedTx);
        
    });
    /*
    const key =  crypto.randomBytes(32);
    const algorithm = 'aes-256-cbc';
    const password = key;
    const iv = crypto.randomBytes(16);
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const fileContent = fs.readFileSync(filePath);
    
    const cipher = crypto.createCipheriv(algorithm, password, iv);
    let encryptedData = cipher.update(fileContent);
    encryptedData = Buffer.concat([encryptedData, cipher.final()]);
    
    // encryptedDataに暗号化されたファイルのデータが格納されます
    const encryptedFilePath = path.join(__dirname, '../uploads', req.file.filename);
    fs.writeFileSync(encryptedFilePath, encryptedData);

    //*ファイルを復号化する
/*
    const decipher = crypto.createDecipheriv(algorithm, password, iv);
    let decryptedData = decipher.update(encryptedData);
    decryptedData = Buffer.concat([decryptedData, decipher.final()]);
  
    // 復号化されたファイルを保存する
    const decryptedFilePath = path.join(__dirname, '../uploads/decrypted', req.file.filename);
    fs.writeFileSync(decryptedFilePath, decryptedData);
  */



  

   /* 
    const forgeMetal = async () => {
         uint8Array = new Uint8Array([0x37, 0x33, 0x33, 0x38]);
        const { key, txs, additive: newAdditive } = await ms.createForgeTxs(
            sym.MetadataType.Account, 
          tkpk.publicAccount,
          tkpk.publicAccount,
          undefined,
          data,
          uint8Array
        ); console.log({ key, txs, additive: newAdditive } );
        const batches = await ss.buildSignedAggregateCompleteTxBatches(
            txs,
            tkpk,
            undefined,
            0.0,
          );console.log(batches);
        const errors = await ss.executeBatches(batches, tkpk);
        if (errors) {console.log(errors);
            throw Error("Transaction error.");
        }
        const metalId = await ms.calculateMetalId(
            sym.MetadataType.Account, 
            tkpk.publicAccount,
            tkpk.publicAccount,
            undefined,
            key,
        );
    
        return {
            metalId,
            key,
            additive: newAdditive,
        };
    };
    uint8Array = new Uint8Array([0x37, 0x33, 0x33, 0x38]);
    forgeMetal(
        sym.MetadataType.Account, 
          tkpk.publicAccount,
          tkpk.publicAccount,
          undefined,
          data,
          tkpk,
          uint8Array
    ).then(({ metalId, key, additive }) => {
        console.log(`Forged! metalId=${metalId},key=${key.toHex()},additive=${Convert.uint8ToUtf8(additive)}`);
   
   
   
   
    }).catch((e) => {
        console.error(e);
        process.exit(1);
    });
    
 */




module.exports = mosarouter;
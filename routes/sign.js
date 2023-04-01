var NODE = 'https://mikun-testnet.tk:3001';
const sym  = require("symbol-sdk");
const express = require("express");
const { MosaicInfo } = require("symbol-sdk");

require('dotenv').config();
Buffer = require("buffer").Buffer;
cat = require("catbuffer-typescript");
sha3_256 = require('js-sha3').sha3_256;
repo = new sym.RepositoryFactoryHttp(NODE);
accountRepo = repo.createAccountRepository();
blockRepo = repo.createBlockRepository();
stateProofService = new sym.StateProofService(repo);
op  = require("rxjs/operators");

nsRepo = repo.createNamespaceRepository();
txRepo = repo.createTransactionRepository();

listener = repo.createListener();


const router = express.Router();
const privateKey = process.env.PRIKEY;
const tkpk = sym.Account.createFromPrivateKey(privateKey, sym.NetworkType.TEST_NET, );


GENERATION_HASH = '49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4';
EPOCH_ADJUSTMENT = 1667250467;

latest_block = 0;
last_finalized_block = 0;

listener.open().then(() => {
    setInterval(function(){
        listener.newBlock()
    }, 30000);

    listener.newBlock()
    .pipe(
      op.mergeMap(x=>blockRepo.getBlockByHeight(x.height))
    )
    .subscribe(x=>{
      console.log("------------------");
      if(latest_block >= x.height.compact()){
          console.log("■■■　roll back!!　■■■");
      }
      console.log("prevHash:" + x.previousBlockHash);
      console.log("timestamp:" + new Date(Number(x.timestamp.toString()) + EPOCH_ADJUSTMENT * 1000));
      console.log(x.height.compact() + ":("+ x.totalTransactionsCount  +"txs):"+ x.hash);
      latest_block = x.height.compact();

    });

    listener.finalizedBlock()
    .subscribe(x=>{
        diff_max = latest_block - last_finalized_block; 
        diff_min = latest_block - x.height.compact();
        if(last_finalized_block != 0){
          console.log("================");
          console.log("FinalizedBlock:" + x.height.compact() + ":" + diff_min.toString() +"<" + diff_max.toString() + ":" + x.hash);
        }
        last_finalized_block = x.height.compact();
    })    
});


router.get("/",(req, res) =>{
  

});

 
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.post("/",(req, res) =>{

    var signedPayload = req.body.data;
    tx = sym.TransactionMapping.createFromPayload(signedPayload);
hash = sym.Transaction.createTransactionHash(signedPayload,Buffer.from(GENERATION_HASH, 'hex'));
console.log(hash);
console.log(tx);

tx.innerTransactions.forEach(tx => {
  
  tx.mosaics.forEach(mosaic =>{
   
    console.log(tx.message.payload);
    console.log(mosaic.id.toHex());
       Mosaics = mosaic.id.toHex();
    
    if (Mosaics === "370205831199DE9C"){

      tkpkSignedTx = sym.CosignatureTransaction.signTransactionPayload(tkpk, signedPayload, GENERATION_HASH);
      tkpkSignedTxSignature = tkpkSignedTx.signature;
      tkpkSignedTxSignerPublicKey = tkpkSignedTx.signerPublicKey;
          
      signedHash = sym.Transaction.createTransactionHash(signedPayload,Buffer.from(GENERATION_HASH, 'hex'));
      cosignSignedTxs = [
          new sym.CosignatureSignedTransaction(signedHash,tkpkSignedTxSignature,tkpkSignedTxSignerPublicKey)
      ];
      recreatedTx = sym.TransactionMapping.createFromPayload(signedPayload);
      cosignSignedTxs.forEach((cosignedTx) => {
          signedPayload += cosignedTx.version.toHex() + cosignedTx.signerPublicKey + cosignedTx.signature;
      });
      size = `00000000${(signedPayload.length / 2).toString(16)}`;
      formatedSize = size.substr(size.length - 8, size.length);
      littleEndianSize = formatedSize.substr(6, 2) + formatedSize.substr(4, 2) + formatedSize.substr(2, 2) + formatedSize.substr(0, 2);
      
      signedPayload = littleEndianSize + signedPayload.substr(8, signedPayload.length - 8);
      signedTx = new sym.SignedTransaction(
          signedPayload, 
          signedHash, 
          tkpk.PublicKey,
           recreatedTx.type, 
           sym.NetworkType.TEST_NET );
      
           txRepo.announce(signedTx).toPromise();
      
      console.log(NODE + "/transactionStatus/" + signedTx.hash);
      
listener.open().then(() => {
        console.log("listener open")
    listener.confirmed(tkpk.address)
    .subscribe(tx=>{ 
        const showforgebtn = true;
   
        console.log("confirmed");
        res.json({ showforgebtn });
        listener.close();
        });  
    });

    }
  });
  
  });
});
router.get("/errors",(req, res) =>{
  res.send("errors");
});

nodemailer = require('nodemailer');

router.post("/errors",(req, res) =>{
  const {data1,data2,data3} = req.body;
  const errors = {data1,data2,data3};

  console.log(JSON.stringify(errors));
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MailAddress, // 送信元のGmailアカウント
      pass: process.env.MailPassword, // 送信元のGmailアカウントのパスワード
    }
  });
  const mailOptions = {
    from: process.env.MailAddress, // 送信元のメールアドレス
    to: process.env.MailAddress, // 送信先のメールアドレス
    subject: 'Error Notification', // メールの件名
    text: JSON.stringify(errors)// エラーメッセージの本文
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error occurred');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent');
    }
  });
});



module.exports =router;
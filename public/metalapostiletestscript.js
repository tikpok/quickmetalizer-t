var NODE = 'https://mikun-testnet.tk:3001';
  const sym = require("/node_modules/symbol-sdk");
  repo = new sym.RepositoryFactoryHttp(NODE);
  txRepo = repo.createTransactionRepository();
  const accountHttp = repo.createAccountRepository()


   GENERATION_HASH = '49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4';
   EPOCH_ADJUSTMENT = 1667250467;

   const XYM_ID = '72C0212E67A08BCE'
   const tkpk_ID = "370205831199DE9C"



const metal = require("/node_modules/metal-on-symbol");

const ss = new metal.SymbolService({
    node_url: "https://mikun-testnet.tk:3001" ,
    repo_factory_config:{
        websocketUrl:"wss://mikun-testnet.tk:3001/ws",
        websocketInjected:WebSocket
    }
});

const ms = new metal.MetalService(ss);

function dispLoading(msg) {
  if (msg == undefined) {
    msg = "";
  }

  dispMsg = "<div class='loadingMsg'>" + msg + "</div>";

  // 既存の #loading 要素を削除する
  $("#loading").remove();

  // 新しい #loading 要素を作成する
  $("body").append("<div id='loading'>" + dispMsg + "</div>");
}

function hideLoading() {
  $("#loading").hide(1000);
}


window.onload = async function () {

 setTimeout(() => {

try {
        if (window.isAllowedSSS()) {
          console.log('ACTIVE')
          Swal.fire(
            'ご確認',
            'はじめに秘密鍵の入力と暗号化の有無の選択をして下さい',
            'warning'
          );
        } else {
          Swal.fire({icon: 'error',
          title: 'Oops...',
          text: "SSSを有効にしてください"})
        }
      } catch (e) {
        console.error(e)
        
      }
    }, 400)



const dom_addr = document.getElementById('wallet-addr')
dom_addr.innerText = window.SSS.activeAddress

const sssaddress = sym.Address.createFromRawAddress(window.SSS.activeAddress);
accountHttp.getAccountInfo(sssaddress)
  .toPromise()
  .then((accountInfo) => {
    for (let m of accountInfo.mosaics) {
      if (m.id.id.toHex() === XYM_ID) {
        const dom_xym = document.getElementById('wallet-xym')
        dom_xym.innerText = `XYM Balance : ${m.amount.compact() / Math.pow(10, 6)}`
      }
    }
  })
  
 };  


let dropped = false;

 function onDrop(event) {
if(dropped == false){
    const target = document.getElementById("tar").value
    if(target == ""){
      Swal.fire(
        'ご確認',
        '秘密鍵の入力と暗号化の有無の選択をして下さい',
        'error'
      );
      return (error);
    };

     dropped = true;
    
    const taraccount = sym.Account.createFromPrivateKey(
    target,sym.NetworkType.TEST_NET);
    dispLoading("processing...");
    var files = event.dataTransfer.files;
    var disp = document.getElementById("disp");
    var imginfo = document.getElementById("imginfo");
    disp.innerHTML ="";


    for (var i=0; i< files.length; i++) {
      var f = files[i];
     disp.innerHTML += "Name :" + f.name + " Type:" + f.type + " Size:" + f.size / 1000 + " KB " + "<br />";
   
      var reader = new FileReader();

   
       reader.onload =async function (evt) {

                  
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

const dataUrl = `data:image/jpeg;base64,${arrayBufferToBase64(evt.currentTarget.result)}`;

console.log(dataUrl);

 var img = document.createElement('img');
          img.src =dataUrl;
          
          disp.appendChild(img);

   
          if(check.checked){
            const plainData = new Uint8Array(evt.currentTarget.result);
            console.log(plainData);
          
            const checksum = metal.MetalService.generateChecksum(plainData);
            console.log(checksum.toHex());
            const encryptedData =await metal.SymbolService.encryptBinary(plainData,taraccount,taraccount.publicAccount);
            console.log(encryptedData);

            const uint8Array = new Uint8Array([0x37, 0x33, 0x33, 0x38]);
forgedTxs = await ms.createForgeTxs(
			sym.MetadataType.Account, 
			taraccount.publicAccount,
			taraccount.publicAccount,
			undefined,
			encryptedData,
      uint8Array
		); 
        console.log(forgedTxs.txs);
        batches = await ss.buildSignedAggregateCompleteTxBatches(
			forgedTxs.txs,
			taraccount,
      undefined,
			0.0,
		);
    

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

console.log(totalFee);
}






	var Est = document.getElementById("Est");
	Est.innerHTML = "Estimate:" + Math.ceil (totalFee/ Math.pow(10, 6) )+("tkpk");

hideLoading();


          }else{

const uint8Array = new Uint8Array([0x37, 0x33, 0x33, 0x38]);
 	 forgedTxs = await ms.createForgeTxs(
			sym.MetadataType.Account, 
			taraccount.publicAccount,
			taraccount.publicAccount,
			undefined,
			evt.currentTarget.result,
      uint8Array
		); 
        console.log(forgedTxs.txs);
        batches = await ss.buildSignedAggregateCompleteTxBatches(
			forgedTxs.txs,
			taraccount,
      undefined,
			0.0,
		);
    console.log(batches[0]);
    const { signedTx, cosignatures } = batches; 
    console.log( batches[0].signedTx ); console.log( batches[0].cosignatures  );// SignedAggregateTx
const completeSignedTx = ss.createSignedTxWithCosignatures(
    batches[0].signedTx,
    batches[0].cosignatures
    
);console.log(completeSignedTx);


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

console.log(totalFee);
}







	var Est = document.getElementById("Est");
	Est.innerHTML = "Estimate:" + Math.ceil (totalFee/ Math.pow(10, 6) )+("tkpk");

hideLoading();
          }
};

const check = document.getElementById("check");
check.disabled = true;

const gene = document.getElementById("gene");
gene.addEventListener ('click',async function () {
  dispLoading("processing...");
    const sssPublicAccount = sym.PublicAccount.createFromPublicKey(
        window.SSS.activePublicKey,
        sym.NetworkType.TEST_NET ,
    );

const tkpk = sym.Address.createFromRawAddress("TCXFY4VFACFKNZCFPBQURXD6MNCEEDGYP6KNBZA");
const tkpkAccountInfo = await accountHttp.getAccountInfo(tkpk).toPromise();
    const tkpkPublicAccount = sym.PublicAccount.createFromPublicKey(
        tkpkAccountInfo.publicKey,
        sym.NetworkType.TEST_NET ,
    );
    const target = document.getElementById("tar").value
    const taraccount = sym.Account.createFromPrivateKey(
    target,sym.NetworkType.TEST_NET);
    console.log(taraccount);

   

  tx = sym.TransferTransaction.create(
    sym.Deadline.create(EPOCH_ADJUSTMENT),
    tkpk, 
    [ new sym.Mosaic(
      new sym.MosaicId(tkpk_ID),
      sym.UInt64.fromUint(Math.ceil(totalFee/ Math.pow(10, 6) )),
    )],
    [],
    sym.NetworkType.TEST_NET 
).setMaxFee(100);

tkpktx = sym.TransferTransaction.create(
    sym.Deadline.create(EPOCH_ADJUSTMENT),
    taraccount.address, 
    [ new sym.Mosaic(
      new sym.MosaicId(XYM_ID),
      sym.UInt64.fromUint(Math.ceil(totalFee)),
    )],
    [],
    sym.NetworkType.TEST_NET 
).setMaxFee(100);

const aggregateTransaction = sym.AggregateTransaction.createComplete(
    sym.Deadline.create(EPOCH_ADJUSTMENT),
    [
      tx.toAggregate(sssPublicAccount),
      tkpktx.toAggregate(tkpkPublicAccount)
    ],
    sym.NetworkType.TEST_NET,
    [],
).setMaxFeeForAggregate(100, 1);
hideLoading();
 window.SSS.setTransaction(aggregateTransaction )
        signedTx = await window.SSS.requestSign().then(signedTx => {
            return signedTx;
        });
        console.log(signedTx);
signedHash = signedTx.hash;

        const signedPayload = signedTx.payload;

        console.log(signedTx.payload);

       dispLoading("processing...");


axios.post("./api/sign", {
  data: signedPayload,
  
})
  .then(async response => { 
    Swal.fire(
      'Metal-IDの生成を行っています',
      'もう少しお待ちください',
      'info'
    )
     
    console.log('ok!');
    console.log(response);
    const metalId = metal.MetalService.calculateMetalId(
      sym.MetadataType.Account,
      taraccount.address,
      taraccount.address,
      undefined,
      forgedTxs.key,
    );
   if (response.data.showforgebtn ===true) {
    const errors = await ss.executeBatches(batches, taraccount);
      
    if (errors){
      const completeSignedTx = ss.createSignedTxWithCosignatures(
        batches[0].signedTx,
        batches[0].cosignatures
        
    );
    await txRepo.announce(completeSignedTx).toPromise();
      
    console.log(NODE + "/transactionStatus/" + completeSignedTx.hash);
    
      axios.post("./api/sign/errors", {
      data1: errors,
      data2:completeSignedTx.hash,
      data3:metalId
      
    })
    .then(response => console.log(response))
    hideLoading();
    Swal.fire({
      icon: 'error',
      title: '予期せぬエラーが発生',
      html: '管理者へエラー情報を送信しました',
      footer: '<a href="">連絡をお待ちください</a>'
    })
    
      throw Error("Transaction error.");
     
  }else{
  
  hideLoading();
    var element = document.getElementById('metalid');
  element.value = metalId;
  
  Swal.fire({
    icon: 'success',
    title: '成功！',
    html: 'Metal-IDの欄をご確認ください',
    footer: '<a href="https://testnet.symbol.fyi/transactions" target="_blank">エクスプローラーで確認</a>'
  })
  };
     
    }else{
      window.alert("失敗");

    }
  


  })
  .catch(error => {
    console.error(error);
  });


});

}
        reader.readAsArrayBuffer(f);
      }

  event.preventDefault();
  }

  function onDragOver(event) {
    event.preventDefault(); 
  }



        
  

   const fetch = document.getElementById("fetch");
   fetch.addEventListener ('click',async function () {
       
        dispLoading("processing...");
        const dispmetal = document.getElementById('dispmetal');
	const element = document.getElementById('metalid');
	const data = await ms.fetchByMetalId (element.value); 
        console.log(data);
        let elements = document.getElementsByName('fetch');
        let value = [];
        
        for(var i = 0; i < elements.length; i++){
          if (elements[i].checked) {
            value.push(elements[i].value);
          }console.log(value);
        }      
     	const blob = new Blob([data.payload],{type:[value]});
	console.log(blob);
        fileUrl = URL.createObjectURL(blob) ;

        if(value === "audio/mpeg"){
          let audio_element = document.createElement('audio');
  audio_element.src= fileUrl;
  audio_element.controls = true;
  document.getElementById("audiocontrol").appendChild(audio_element);
        hideLoading();
        //  $("#audiofile_dl").prop("href", window.URL.createObjectURL(audioblob));
        //document.getElementById("audiofile_dl").click();
        }else{
hideLoading();
$("#file_dl").prop("href", window.URL.createObjectURL(blob));
        document.getElementById("file_dl").click();
        }
	
   });
  
  

   const decryptfetch = document.getElementById("decryptfetch");
   decryptfetch.addEventListener ('click',async function () {
       
        dispLoading("processing...");
        const target = document.getElementById("tar").value
        const taraccount = sym.Account.createFromPrivateKey(
        target,sym.NetworkType.TEST_NET);
        const dispmetal = document.getElementById('dispmetal');
	const element = document.getElementById('metalid');
	const data = await ms.fetchByMetalId (element.value); 
        
        const plainData = metal.SymbolService.decryptBinary(data.payload,taraccount.publicAccount,taraccount);
        console.log(plainData);
        let elements = document.getElementsByName('decryptfetch');
       

        if(elements[0].checked === true){ 


	const imgblob = new Blob([plainData],{type:"image/jpeg"});
	console.log(imgblob);
        fileUrl = URL.createObjectURL(imgblob) ;
        window.open (fileUrl);
        hideLoading();
        }else{
          const audioblob = new Blob([plainData],{type: 'audio/mpeg'});
          console.log(audioblob);
          fileUrl = URL.createObjectURL(audioblob) ;
          let audio_element = document.createElement('audio');
          audio_element.src= fileUrl;
          audio_element.controls = true;
          document.getElementById("audiocontrol").appendChild(audio_element);
                hideLoading();
        }
	
   });

   const clickClip = (e) => {
    const btn_content = e.target.textContent;
    navigator.clipboard.writeText(btn_content)
        .then(() => {
            console.log("Success!");
        },
        () => {
           console.log("Ops, something went wrong...");
        });
};

document.querySelector('#clickbutton').addEventListener('click', clickClip);
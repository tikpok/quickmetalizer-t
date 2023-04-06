

var NODE = 'https://mikun-testnet.tk:3001';
  const sym = require("/node_modules/symbol-sdk");
  repo = new sym.RepositoryFactoryHttp(NODE);
  txRepo = repo.createTransactionRepository();
  const accountHttp = repo.createAccountRepository()


   GENERATION_HASH = '49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4';
   EPOCH_ADJUSTMENT = 1667250467;

   const XYM_ID = '72C0212E67A08BCE'
   


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
            '新規モザイクにメタル化します',
            'info'
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

 let myDropzone = new Dropzone("#drop", {
   url: "/api/mosaic",
   paralleUploads : 1,
   maxFiles:1,
   maxFilesize: 5, 
   success: function(file) {
    this.disable();},
   dictFileTooBig: "ファイルが大きすぎます。(@{{filesize}}MB). 最大サイズ: @{{maxFilesize}}MB.",
   acceptedFiles: "video/mp4,image/*,audio/mpeg,text/plain,application/pdf",
   addRemoveLinks: true
  
  
  
  });
 myDropzone.on("addedfile", file => {
  dispLoading("processing...");
  console.log(`File added: ${file.name}`);
}).on("success", function(file, response) {
  totalhandlingfee = response;
  console.log(totalhandlingfee);
  
  var Est = document.getElementById("Est");
	Est.innerHTML = "Estimate:" + Math.ceil (totalhandlingfee/ Math.pow(10, 6) )+("tkpk");
  hideLoading()

}).on("success", function(file, response) {
  
}).on("error", function(file, errorMessage) {
  // エラー時の処理
});

const gene = document.getElementById("gene");
gene.addEventListener ('click',async function () {
dispLoading("processing...");
  const sssPublicAccount = sym.PublicAccount.createFromPublicKey(
    window.SSS.activePublicKey,
    sym.NetworkType.TEST_NET ,
    );
    console.log(sssPublicAccount);
    pubkey = sssPublicAccount.publicKey;
    console.log(pubkey);
  axios.post("./api/sss", {
    data: sssPublicAccount,
    total: totalhandlingfee,
  })
  .then(async function (response) {
    
    tx = response.data; 
    console.log(tx);
   

window.SSS.setTransactionByPayload(tx)
hideLoading();
let ssssignedTx = await window.SSS.requestSignCosignatureTransaction();
dispLoading("processing...");
let ssssignedsignature = ssssignedTx.signature;
let sssSignedTxSignerPublicKey = ssssignedTx.signerPublicKey;


  axios
    .post("./api/sss/recreate", {
      signature: ssssignedsignature,
      publickey: sssSignedTxSignerPublicKey,
      
    })
    .then((response) => {
      let data = response.data;
      console.log(data);
      hideLoading()
  Swal.fire(
    '成功！',
    'モザイクIDとメタルIDを保管してください',
    'success'
  );

  mosaicID = data[0];
  metalID = data[1];
   mosaicid = document.getElementById('mosaicid');
  mosaicid.value= mosaicID.toString();
   metalid = document.getElementById('metalid');
  metalid.value = metalID.toString();

    })

  
  .catch(function (error) {
    Swal.fire({icon: 'error',
          title: 'Oops...',
          text: "メタル化に失敗しました"})
          hideLoading();
    console.log(error);
  });

});
  })


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



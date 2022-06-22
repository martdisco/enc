const password = ''
let encrypted
let decrypted

function readDecryptedFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    encrypted = encrypt(contents);
	displayEncryptedContents(encrypted);
	decrypted = decrypt(encrypted);
	displayDecryptedContents(decrypted);
  };
  reader.readAsText(file);
}

function readEncryptedFile(e) {
	 var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
	encrypted = contents
	displayEncryptedContents(contents);
	decrypted = decrypt(contents);
	displayDecryptedContents(decrypted);
  };
  reader.readAsText(file);
}

function displayEncryptedContents(contents) {
  var element = document.getElementById('file-content');
  element.textContent = contents;
}

function displayDecryptedContents(contents) {
  var element = document.getElementById('file-content2');
  element.textContent = contents;
}

function encrypt(contents) {
  var encryptedAES = CryptoJS.AES.encrypt(contents, password);
  return encryptedAES
}

function decrypt(contents) {
	var decryptedBytes = CryptoJS.AES.decrypt(contents, password);
	var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);
	return plaintext
}

function storeEncrypted() {
	if(!encrypted) return
	download(encrypted, 'enc', 'txt')
}

function storeDecrypted() {
	if(!decrypted) return
	download(decrypted, 'dec', 'txt')
}

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

document.getElementById('file-input-encrypted')
  .addEventListener('change', readEncryptedFile, false);
  
document.getElementById('file-input')
  .addEventListener('change', readDecryptedFile, false);
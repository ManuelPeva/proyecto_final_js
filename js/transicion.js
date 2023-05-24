var prices = document.querySelectorAll('#price-container p');
var currentIndex = 0;

function showNextPrice() {
  prices[currentIndex].style.display = 'none';
  currentIndex = (currentIndex + 1) % prices.length;
  prices[currentIndex].style.display = 'block';
}

// Mostrar el primer precio
prices[currentIndex].style.display = 'block';

// Cambiar de precio cada 3 segundos (ajusta el valor según tus necesidades)
setInterval(showNextPrice, 3000);


var toggleButton = document.getElementById('toggle-button');
var toggleText = document.getElementById('toggle-text');

toggleButton.addEventListener('click', function() {
  toggleButton.classList.toggle('on');
  toggleButton.classList.toggle('off');
  
  if (toggleButton.classList.contains('on')) {
    toggleText.textContent = 'Encender tarjeta';
    Swal.fire({
        icon: 'warning',
        title: '¡apagando tarjeta!',
        text: 'Targeta apagada',
        showConfirmButton: false,
        timer: 2000
      });
  } else {
    toggleText.textContent = 'Apagar tarjeta';
    Swal.fire({
        icon: 'success',
        title: '¡Encendiendo tarjeta!',
        text: 'Tarjeta encendida',
        showConfirmButton: false,
        timer: 2000
      });
  }
});

var amountButton = document.getElementById('amount-button');
var transferButton = document.getElementById('transfer-button');
var balanceAmount = document.querySelector('.amount');
var progressBar = document.querySelector('.progress');
var transferCount = 0;
var transferHistory = [];
var reportContainer = document.getElementById('report-container');

amountButton.addEventListener('click', ingresarMonto);
transferButton.addEventListener('click', transferirMonto);

function ingresarMonto() {
  var amountInput = document.getElementById('amount-input');
  var amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    alert('Ingrese un monto válido');
    return;
  }

  // Realiza la lógica correspondiente para el ingreso del monto, por ejemplo, agregar el monto al saldo actual, generar un reporte, etc.

  var currentBalance = parseFloat(balanceAmount.textContent.replace('$', ''));
  var newBalance = currentBalance + amount;
  balanceAmount.textContent = '$' + newBalance.toFixed(2);

  // Actualizar la barra de progreso
  var progressPercent = (newBalance / currentBalance) * 100;
  progressBar.style.width = progressPercent + '%';

  amountInput.value = ''; // Limpiar el campo de entrada

  var amountReport = {
    amount: amount,
    newBalance: newBalance,
    date: new Date().toLocaleString()
  };

  generateReport(amountReport); // Generar reporte para el ingreso del monto
}

function transferirMonto() {
  var transferInput = document.getElementById('transfer-input');
  var transferAmount = parseFloat(transferInput.value);

  if (isNaN(transferAmount) || transferAmount <= 0) {
    alert('Ingrese un monto válido');
    return;
  }

  var currentBalance = parseFloat(balanceAmount.textContent.replace('$', ''));

  if (transferAmount > currentBalance) {
    alert('Saldo insuficiente');
    return;
  }

  // Realiza la lógica correspondiente para la transferencia, por ejemplo, enviar el monto a otra cuenta, restar el saldo de la cuenta actual, generar un reporte, etc.

  var newBalance = currentBalance - transferAmount;
  balanceAmount.textContent = '$' + newBalance.toFixed(2);

  // Actualizar la barra de progreso
  var progressPercent = (newBalance / currentBalance) * 100;
  progressBar.style.width = progressPercent + '%';

  transferInput.value = ''; // Limpiar el campo de entrada

  var transferReport = {
    transferAmount: transferAmount,
    newBalance: newBalance,
    transferDate: new Date().toLocaleString()
 
  }
}

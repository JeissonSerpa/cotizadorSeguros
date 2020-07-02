//Variables
const selectAnio = document.querySelector('#anio');
const maxDate = new Date().getFullYear(),
      minDate = maxDate - 20;
const formulario = document.querySelector('#cotizar-seguro');

//Constructor
function Seguro(marca, anio, tipo){
   this.marca = marca;
   this.anio = anio;
   this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function(){
   /*
      1 = Americano 1.15
      2 = Asiatico 1.05
      3 = Europeo 1.35
   */

   let cantidad;
   const base = 2000;
   
   switch(this.marca){
      case '1':
         cantidad = base * 1.15
      break;
      case '2':
         cantidad = base * 1.05
      break;
      case '3':
         cantidad = base * 1.35
      break;
   }

   //With each year of difference the value increases 3%
   const diferenciaAnio = new Date().getFullYear() - this.anio;

   cantidad -= (diferenciaAnio * 0.03) * cantidad;

   //If insurance is Basic then 30%
   //If insurance is complete then 50%

   if(this.tipo === 'basico'){
      cantidad += cantidad * 0.3;
   }else{
      cantidad += cantidad * 0.5;
   }
   console.log(cantidad);
}

//Everything shown
function Interfaz(){}

Interfaz.prototype.mostrarError = function(mensaje, tipo){
   const div = document.createElement('div');
   const divBefore = document.querySelector('.form-group');
   if(tipo = 'error'){
      div.classList.add('mensaje', 'error');
   }else{
      div.classList.add('mensaje', 'correcto');
   }
   div.innerHTML = `${mensaje}`;
   formulario.insertBefore(div, divBefore);

   setTimeout(function(){
      document.querySelector('.mensaje').remove();
   }, 3000);
}

//Event Listener
formulario.addEventListener('submit', function(e){
   e.preventDefault();

   //car brand value
   const marca = document.querySelector('#marca');
   const marcaSeleccionada = marca.options[marca.selectedIndex].value;

   //year value
   const anioSeleccionado = selectAnio.options[selectAnio.selectedIndex].value;

   //insurance type value
   const tipo = document.querySelector('input[name="tipo"]:checked').value;

   const interfaz = new Interfaz();

   //Check that the fiels are not empty
   if (marcaSeleccionada === '' || anioSeleccionado === ''){
      interfaz.mostrarError('Faltan Datos, Intenta de Nuevo', 'error');
   }else{
      const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);

      //quote insurance
      const cantidad = seguro.cotizarSeguro();
   }

});




for(let i = maxDate; i >= minDate; i--){
   let opAnio = document.createElement('option');
   opAnio.value = i;
   opAnio.innerHTML = i;

   selectAnio.appendChild(opAnio);
}
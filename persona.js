const prompt = require('prompt');

const DEF_SEX='H';
const PESO_BAJO=-1;
const PESO_NORMAL=0;
const PESO_ALTO=1;
const letras = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const long = 8;
class Persona{
	//3 constructores en 1
	constructor(nombre,edad,sexo,peso,altura) {
		this.nss=this.generaNSS();
		if(!arguments.length) {
			/*constructor vacio*/
			this.nombre="";
			this.edad=0;
			this.sexo=DEF_SEX;
			this.peso=0;
			this.altura=0;
		}
		/*constructor con nombre edad y sexo, el resto por defecto*/
		else if(arguments.length == 3){
			this.nombre=nombre;
			this.edad=edad;
			this.sexo=sexo;
			this.peso=0;
			this.altura=0;

		}
		/*constructor con todos los atributos como parametro*/
		else if(arguments.length == 5){
			this.nombre=nombre;
			this.edad=edad;
			this.sexo=sexo;
			this.peso=peso;
			this.altura=altura;
		}else{
			console.log("Argumentos invalidos");
		}
	}
	// metodos
	calcularIMC() {
		if(this.peso == 0 || this.altura== 0){
			return "No hay datos suficientes para calcular tu IMC";
		}
		var indice=this.peso/Math.pow(this.altura,2);

		// si es hombre 
		if (this.sexo == 'H'){
			if(indice<20){
				return PESO_BAJO;
			}else if(indice>20 && indice<=25){
				return PESO_NORMAL;
			}else return PESO_ALTO;
		}
		// si es mujer 
		else{
			if(indice<19){
				return PESO_BAJO;
			}else if(indice>=19 && indice<=24){
				return PESO_NORMAL;
			}else return PESO_ALTO;
		}
	}
	esMayorDeEdad(){
		if (this.edad!=0 && this.edad >=18)
			return true;
		else
			return false;
	}
	comprobarSexo() {
		if (this.sexo == 'H' || this.sexo == 'M') {
			return true;
		}else
		return false;
	}
	toString(){
		return "Informacion de la persona:\n"
		+ "Nombre: " + this.nombre + "\n"
		+ "Sexo: " + this.sexo + "\n"
		+ "Edad: " + this.edad + " años\n"
		+ "NSS: " + this.nss + "\n"
		+ "Peso: " + this.peso + " kg\n"
		+ "Altura: " + this.altura + " metros\n";
	}
	generaNSS(){
		var code = "";
		for (let x=0; x < long; x++)
		{
			var rand = Math.floor(Math.random()*letras.length);
			code += letras.substr(rand, 1);
		}
		return code;
	}
	// setters
	setNombre(nombre) {
		this.nombre = nombre;
	}
	setEdad(edad) {
		this.edad = edad;
	}
	setSexo(sexo) {
		this.sexo = sexo;
	}
	setPeso(peso) {
		this.peso = peso;
	}
	setAltura(altura) {
		this.altura = altura;
	}
}
/******************************Creacion de personas******************************************/
// Objeto json para obtener los datos de linea de comandos.
var prompt_attributes = [
	{   //nombre de variable
		name: 'nombre',
		validator: /^[a-zA-Z\s\-]+$/,
		warning: 'Nombre invalido, solo debe contener letras'
	},
	{
		name: 'edad',
		validator: /^[0-9]+$/,
		warning: 'Edad invalida,escribe un numero'
	},
	{     
		name: 'sexo',
		validator: /^[H]|[M]$/,
		warning: 'Solo puede ser H o M'
	},
	{
		name: 'peso',
		validator: /^[0-9].?[0-9]+$/,
		warning: 'Edad invalida,escribe un numero decimal'
	},
	{
		
		name: 'altura',
		validator: /^[0-9].?[0-9]+$/,
		warning: 'La altura en metros y con un numero decimal'
	},
	];

// empieza el prompt
prompt.start();

// Desplegar datos en consola
prompt.get(prompt_attributes, function (err, result) {
	if (err) {
		console.log(err);
		return 1;
	}else {
		console.log('Datos recibidos');
		// Get user input from result object.
		var nombre = result.nombre;
		var edad = result.edad;
		var sexo = result.sexo;
		var peso = result.peso;
		var altura = result.altura;
		// var mensaje = "  nombre : " + nombre + " , edad : " + edad + " , sexo : " + sexo + " , peso : " + peso+ " , altura : " + altura;
		// console.log(mensaje);
		// primer objeto tendra las variables pedidas por teclado
		var persona1=new Persona(nombre,edad,sexo,peso,altura);
		// segundo objeto obtendra todos los anteriores menos el peso y la altura
		var persona2=new Persona(nombre,edad,sexo);
		//tercer objeto obtiene datos por medio de los setters 
		var persona3=new Persona();

		persona3.setNombre("Laura");
		persona3.setEdad(30);
		persona3.setSexo('M');
		persona3.setPeso(60);
		persona3.setAltura(1.60);

		/*MOSTRANDO DATOS */
		console.log("#######Persona 1#######");
		MuestraMensajePeso(persona1);
		MuestraMayorDeEdad(persona1);
		console.log(persona1.toString());

		console.log("#######Persona 2#######");
		MuestraMensajePeso(persona2);
		MuestraMayorDeEdad(persona2);
		console.log(persona2.toString());

		console.log("#######Persona 3#######");
		MuestraMensajePeso(persona3);
		MuestraMayorDeEdad(persona3);
		console.log(persona3.toString());

}
});

function MuestraMensajePeso(p) {
	var IMC = p.calcularIMC();
	console.log(IMC);
	switch (IMC) {
		case 0:
		console.log("La persona esta en su peso ideal");
		break;
		case -1:
		console.log("La persona esta por debajo de su peso ideal");
		break;
		case 1:
		console.log("La persona esta por encima de su peso ideal");
		break;
	}
}
function MuestraMayorDeEdad(p) {
	if (p.esMayorDeEdad()) {
		console.log("La persona es mayor de edad");
	} else {
		console.log("La persona no es mayor de edad");
	} 
}
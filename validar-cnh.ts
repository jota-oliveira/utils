export function cnhValido(cnh: string): boolean {
  let retorno = true;
  try {
    contemApenasDigitos(cnh);
    possuiMultiplosDigitos(cnh);
    calcularPrimeiroDigitoVerificador(cnh);
    calcularSegundoDigitoVerificador(cnh);
  } catch (error) {
    /* Tratar o erro da forma necessária */
    retorno = false;
  }

  return retorno;
}

function contemApenasDigitos(cnh: string): void {
  if (!cnh.match('[0-9]')) {
    throw new Error('cnhContemCaracteresInvalidos');
  }
}

function possuiMultiplosDigitos(cnh: string): void {
  const opcoesDigitosIguais = [
    '11111111111', '22222222222', '33333333333', '44444444444',
    '55555555555', '66666666666', '77777777777', '88888888888',
    '99999999999', '00000000000'
  ];

  if (opcoesDigitosIguais.includes(cnh)) {
    throw new Error('cnhInvalido');
  }
}

function calcularPrimeiroDigitoVerificador(cnh: string): void {
  const cnh9PrimeirosDigitos = cnh.substring(0, 9);
  let incremento = 2;
  let somatorio = 0;

  for (let caracter of cnh9PrimeirosDigitos) {
    somatorio += parseInt(caracter, 10) * incremento;
    incremento++;
  }

  let resto = somatorio % 11;
  let primeiroDigitoVerificador = 0;

  if (resto > 1) {
    primeiroDigitoVerificador = 11 - resto;
  }

  const primeiroDigitoVerificadorCNH = parseInt(cnh[11 - 2], 10);
  const primeiroDigitoConfere = primeiroDigitoVerificador === primeiroDigitoVerificadorCNH;

  if (!primeiroDigitoConfere) {
    throw new Error('cnhInvalido');
  }
}

function calcularSegundoDigitoVerificador(cnh: string): void {
  const cnh9PrimeirosDigitos = cnh.substring(0, 9);
  const primeiroDigitoVerificador = parseInt(cnh[11 - 2], 10);

  let somatorio = primeiroDigitoVerificador * 2;
  let incremento = 3;

  for (let caracter of cnh9PrimeirosDigitos) {
    somatorio += parseInt(caracter, 10) * incremento;
    incremento++;
  }

  const resto = somatorio % 11;
  let segundoDigitoVerificador = 0;

  if (resto > 1) {
    segundoDigitoVerificador = 11 - resto;
  }

  const segundoDigitoVerificadorCNH = parseInt(cnh[11 - 1], 10);
  const segundoDigitoConfere = segundoDigitoVerificador === segundoDigitoVerificadorCNH;

  if (!segundoDigitoConfere) {
    throw new Error('cnhInvalido');
  }
}
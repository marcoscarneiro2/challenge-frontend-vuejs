function validateCPF(cpf){
    cpf = cpf.replace(/[^\d]+/g,'');	
    if(cpf.length == 0) return false;	
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 || 
        cpf == "00000000000" || 
        cpf == "11111111111" || 
        cpf == "22222222222" || 
        cpf == "33333333333" || 
        cpf == "44444444444" || 
        cpf == "55555555555" || 
        cpf == "66666666666" || 
        cpf == "77777777777" || 
        cpf == "88888888888" || 
        cpf == "99999999999")
            return false;		
    // Valida 1o digito	
    var add = 0;	
    var rev;
    for (var i=0; i < 9; i ++)		
        add += parseInt(cpf.charAt(i)) * (10 - i);	
        rev = 11 - (add % 11);	
        if (rev == 10 || rev == 11)		
            rev = 0;	
        if (rev != parseInt(cpf.charAt(9)))		
            return false;		
    // Valida 2o digito	
    add = 0;	
    for (i = 0; i < 10; i ++)		
        add += parseInt(cpf.charAt(i)) * (11 - i);	
    rev = 11 - (add % 11);	
    if (rev == 10 || rev == 11)	
        rev = 0;	
    if (rev != parseInt(cpf.charAt(10)))
        return false;		
    return true;   
};
function validateCNPJ(s){
    let cnpj = s.replace(/[^\d]+/g, '')

// Valida a quantidade de caracteres
if (cnpj.length !== 14)
    return false

// Elimina inválidos com todos os caracteres iguais
if (/^(\d)\1+$/.test(cnpj))
    return false

// Cáculo de validação
let t = cnpj.length - 2,
    d = cnpj.substring(t),
    d1 = parseInt(d.charAt(0)),
    d2 = parseInt(d.charAt(1)),
    calc = x => {
        let n = cnpj.substring(0, x),
            y = x - 7,
            s = 0,
            r = 0

            for (let i = x; i >= 1; i--) {
                s += n.charAt(x - i) * y--;
                if (y < 2)
                    y = 9
            }

            r = 11 - s % 11
            return r > 9 ? 0 : r
    }

return calc(t) === d1 && calc(t + 1) === d2
}
export default {

validate(value) {
    return validateCPF(value) || validateCNPJ(value);
},
}
'use-strict';
// ----- ELEMENTOS -----
const homeSection = document.getElementById('home-section');
const searchSection = document.getElementById('search-section');
const couponSection = document.getElementById('coupon-section');
const productsSection = document.getElementById('products-section');
const srcProd = document.getElementById("searchedElements");
const filterTag = document.getElementById("filterTag");
const btnHome = document.querySelector('.btn_home');
const btnSearch = document.querySelector('.btn_search');
const btnCoupon = document.querySelector('.btn_coupon');
const btnProducts = document.querySelector('.btn_products');
const nbRes = document.querySelector('.numResults');
const divlistPr = document.querySelector('.listaProdutos');
const divCoupon = document.querySelector('.coupons');
const divProduct = document.querySelector('.products');
const logIn = document.getElementById("login");
const createAcc = document.getElementById("CriaConta");
const userInp = document.getElementById("userInput");
const pssInp = document.getElementById("passwordInput");
const logAlert = document.getElementById("logAlert");

// ----- VARIÁVEIS -----
let tagArr = []; //Vetor com tags buscadas
let objDB = []; //Vetor que recebe objs do banco (Dentro do ambiente de apresentacao apenas)
let accDB = []; //Vetor que recebe cadastros do banco (Dentro do ambiente de apresentacao apenas)
let objSrc = []; //Obj de itens encontrados na pesquisa
let tagString; //String de pesquisa

// ----- FUNÇÕES -----
const resetParameters = () => {
    srcProd.innerHTML = "";
    nbRes.innerHTML = "";
    filterTag.innerHTML = "";
    objSrc = [];
}

// --- Change Pag ---
//Home
const toHomeSection = () => {
    resetParameters();
    searchSection.classList.add('d-none');
    couponSection.classList.add('d-none');
    productsSection.classList.add('d-none');
    homeSection.classList.remove('d-none');
}

//Pesquisa
const toSearchSection = () => {
    resetParameters();
    tagString = document.getElementById("searchInput").value;
    if (tagString.length > 0){
        tagArr = [];
        tagArr = tagString.split(" ");
        searchSection.classList.remove('d-none');
        homeSection.classList.add('d-none');
        couponSection.classList.add('d-none');
        productsSection.classList.add('d-none');
        addSearchResults(tagArr);
    }
}

//Cupons
const toCouponSection = () => {
    resetParameters();
    searchSection.classList.add('d-none');
    homeSection.classList.add('d-none');
    productsSection.classList.add('d-none');
    couponSection.classList.remove('d-none');
}

//Produtos
const toProductsSection = () => {
    resetParameters();
    searchSection.classList.add('d-none');
    homeSection.classList.add('d-none');
    couponSection.classList.add('d-none');
    productsSection.classList.remove('d-none');
}

//Log In
const toLogInSection = () => {
    logIn.classList.remove('d-none');
    createAcc.classList.add('d-none');
}

//Create Account
const toCreateAccSection = () => {
    logIn.classList.add('d-none');
    createAcc.classList.remove('d-none');
}

// --- Funcs ---
//Habilitar pesquisa com Enter
const srcInput = (event) => {
    if (event.keyCode === 13) {
        toSearchSection();
    }
}

//Adicionar resultados da pesquisa
const addSearchResults = (param) => {
    let template = '';
    let template2 = '';
    
    tagArr.forEach(tagArr => {
            if(tagArr.length > 0){
                template2 += `  
                <i class="fa fa-tag" aria-hidden="true" style="margin: 0.35rem 0rem; color: coral"></i>
                <p style="margin: 0.1rem 2rem 0.1rem 0.35rem; color: gray">${tagArr}</p>
                `
            }
    })
    
    filterTag.innerHTML = template2;

    for(let i = 0 ; i < objDB.length ; i++){
        loop:
        for(let t = 0 ; t < objDB[i].tags.length ; t++){
            for(let z = 0 ; z < param.length ; z++){
                if((objDB[i].tags[t]).toLowerCase() == param[z].toLowerCase()){
                    objSrc.push(objDB[i]);
                        template += `  
                            <div style="width: 20rem; height: 32rem; background-color: white;">
                                <img src="${objDB[i].image}" href="#" style="width: 20rem; height: 23rem; padding: 3rem 2rem;">
                                <div style="width: 20rem; height: 9rem; padding: 1rem 2rem;">
                                    <div style="width: 100%; height: 2rem; color: black; display: flex; justify-content: center;">${objDB[i].title}</div>
                                    <div style="width: 100%; height: 2rem; margin: 1rem 0rem; color: black; display: flex; justify-content: center;">R$${objDB[i].price}</div>
                                    <a style="margin-left: 23%" class="btn btn-secondary" target="_blank" rel="noopener noreferrer" href="${objDB[i].link}">Visitar Produto</a>
                                </div>
                            </div>
                            `
                    srcProd.innerHTML = template;
                    break loop;
                } 
            }
        }
    }
    nbRes.innerHTML = objSrc.length + " resultado(s) encontrado(s)";
    document.getElementById("searchInput").value = '';
}

//Filtro Valor
function filterFunc() {
    let fil = document.getElementById("filterSelect").value;
    if (fil == "lower"){
        srcProd.innerHTML = "";
        let template = '';
        objSrc.sort((a, b) => {return a.price - b.price;});

        objSrc.forEach(objSrc => {
            template += `  
            <div style="width: 20rem; height: 32rem; background-color: white;">
                <img src="${objSrc.image}" href="#" style="width: 20rem; height: 23rem; padding: 3rem 2rem;">
                <div style="width: 20rem; height: 9rem; padding: 1rem 2rem;">
                    <div style="width: 100%; height: 2rem; color: black; display: flex; justify-content: center;">${objSrc.desc}</div>
                    <div style="width: 100%; height: 2rem; margin: 1rem 0rem; color: black; display: flex; justify-content: center;">R$${objSrc.price}</div>
                </div>
            </div>
            `
        })
        srcProd.innerHTML = template;
        document.getElementById("searchInput").value = '';
    }else if(fil == "higher"){
        srcProd.innerHTML = "";
        let template = '';
        objSrc.sort((a, b) => {return b.price - a.price;});

        objSrc.forEach(objSrc => {
            template += `  
            <div style="width: 20rem; height: 32rem; background-color: white;">
                <img src="${objSrc.image}" href="#" style="width: 20rem; height: 23rem; padding: 3rem 2rem;">
                <div style="width: 20rem; height: 9rem; padding: 1rem 2rem;">
                    <div style="width: 100%; height: 2rem; color: black; display: flex; justify-content: center;">${objSrc.desc}</div>
                    <div style="width: 100%; height: 2rem; margin: 1rem 0rem; color: black; display: flex; justify-content: center;">R$${objSrc.price}</div>
                </div>
            </div>
            `
        })
        srcProd.innerHTML = template;
        document.getElementById("searchInput").value = '';
    }
}

//Permitir apenas letras no campo nome
function ValidarLetras() {
    let campo = document.getElementById('campo-nome');
    campo.value = campo.value.replace(/[^a-zA-Z, ]+/, '');
}

// --- Verif ---
//Verificar senhas 
function verificarSenha(){
    let senha1 = document.getElementById('campo-senha').value;
    let senha2 = document.getElementById('campo-senha2').value;

    if(senha1 != senha2)
            alert("A confirmação de senha deve ser igual a senha digitada");
    else return true;
}

//Verifica os campos de cadastro
function validaCadastro(){
    let nome = document.getElementById('campo-nome').value;
    let usuario = document.getElementById('campo-usuario').value;
    let email = document.getElementById('campo-email').value;
    let datanasc = document.getElementById('campo-datanasc').value;
    let senha = document.getElementById('campo-senha').value;

    if(nome == "" || usuario == "" || email == "" || datanasc == "" || senha == "")
        false;
    else if(verificarSenha() == true)
        createAccount();
}

//Verifica os campos de cadastro de Ecommerce
function validaCadastroEcommerce(){
    let nome = document.getElementById('ecom-nome').value;
    let cnpj = document.getElementById('ecom-cnpj').value;
    let link = document.getElementById('ecom-link').value;
    let email = document.getElementById('ecom-email').value;
    let phone = document.getElementById('ecom-tel').value;
    let desc = document.getElementById('ecom-desc').value;

    if(nome == "" || cnpj == "" || link == "" || email == "" || phone == "" || desc == "")
        false;
    else createEcommerce();
}

//Verifica os campos de cadastro de cupom
function validaCadastroCupom(){
    let nome = document.getElementById('cupom-nome').value;
    let imagem = document.getElementById('cupom-imagem').value;
    let desc = document.getElementById('cupom-desc').value;
    let cod = document.getElementById('cupom-cod').value;

    if(nome == "" || imagem == "" || desc == "" || cod == "")
        false;
    else createCoupon();
}

//Verifica os campos de cadastro de produto
function validaCadastroProdutos(){
    let title = document.getElementById('prod-title').value;
    let price = document.getElementById('prod-price').value;
    let desc = document.getElementById('prod-desc').value;
    let link = document.getElementById('prod-link').value;
    let image = document.getElementById('prod-img').value;
    let tag = document.getElementById('prod-tag').value;

    if(title == "" || price == "" || desc == "" || link == "" || image == "" || tag == "")
        false;
    else createProduct();
}

//Verifica dados de login (DENTRO DO AMBIENTE DE APRESENTACAO APENAS)
function validaLogIn(){
    logAlert.classList.add("d-none");
    let usr = false;
    let pss = false;
    for(let i = 0 ; i < accDB.length ; i++){
        usr = accDB[i].username == userInp.value ? true : false;
        pss = (usr == true) ? (accDB[i].password == pssInp.value ? true : false) : false;
        if(usr == true && pss == true){
            localStorage.setItem("statusVal", true);
            window.location.replace("../../index.html");  
        }
    }
    if(usr == false || pss == false)
        logAlert.classList.remove("d-none");
}

function logOut(){
    localStorage.setItem("statusVal", false);
}

// --- Register ---
//cadastrar conta no banco
const createAccount = async () => {
    let nome = document.getElementById('campo-nome').value;
    let usuario = document.getElementById('campo-usuario').value;
    let email = document.getElementById('campo-email').value;
    let datanasc = document.getElementById('campo-datanasc').value;
    let senha = document.getElementById('campo-senha').value;

    
    const doc = {
        name: nome,
        username: usuario,
        email: email,
        birthdate: datanasc,
        password: senha
    };

    await fetch('http://localhost:3000/accounts',{
        method: 'POST',
        body: JSON.stringify(doc),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    });

    window.location.replace("../../index.html");
}

//Cadastra E-commerce no banco
const createEcommerce = async () => {

    let nome = document.getElementById('ecom-nome').value;
    let cnpj = document.getElementById('ecom-cnpj').value;
    let link = document.getElementById('ecom-link').value;
    let email = document.getElementById('ecom-email').value;
    let phone = document.getElementById('ecom-tel').value;
    let image = document.getElementById('ecom-img').value;
    let desc = document.getElementById('ecom-desc').value;

    
    const doc = {
        name: nome,
        cnpj: cnpj,
        link: link,
        email: email,
        phone: phone,
        image: image,
        desc: desc
    };

    await fetch('http://localhost:3000/ecommerces',{
        method: 'POST',
        body: JSON.stringify(doc),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    });

}

//Cadastra E-commerce no banco
const createCoupon = async () => {

    let nome = document.getElementById('cupom-nome').value;
    let imagem = document.getElementById('cupom-imagem').value;
    let desc = document.getElementById('cupom-desc').value;
    let cod = document.getElementById('cupom-cod').value;

    
    const doc = {
        title: nome,
        image: imagem,
        desc: desc,
        cod: cod
    };

    alert(JSON.stringify(doc));
    await fetch('http://localhost:3000/coupons',{
        method: 'POST',
        body: JSON.stringify(doc),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    });

}

//Cadastra produto no banco
const createProduct = async () => {

    let title = document.getElementById('prod-title').value;
    let price = document.getElementById('prod-price').value;
    let desc = document.getElementById('prod-desc').value;
    let link = document.getElementById('prod-link').value;
    let image = document.getElementById('prod-img').value;
    let tag = document.getElementById('prod-tag').value;

    tagArr = [];
    tagArr = tag.split(" ");

    
    const doc = {
        title: title,
        price: price,
        desc: desc,
        link: link,
        image: image,
        tags: tagArr
    };

    await fetch('http://localhost:3000/products',{
        method: 'POST',
        body: JSON.stringify(doc),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    });

    alert("Produto Cadastrado");
}

// --- Load ---
//Carregar os produtos na pag produtos
const renderProducts = async () => {
    let uri = 'http://localhost:3000/products';

    const res = await fetch(uri);
    const products = await res.json();

    let template = '';
    products.forEach(product => {
        template += ` 
            <div style="width: 20rem; height: 32rem; background-color: white;">
                <img src="${product.image}" href="#" style="width: 20rem; height: 23rem; padding: 3rem 2rem;">
                <div style="width: 20rem; height: 9rem; padding: 1rem 2rem;">
                    <div style="width: 100%; height: 2rem; color: black; display: flex; justify-content: center;">${product.title}</div>
                    <div style="width: 100%; height: 2rem; margin: 1rem 0rem; color: black; display: flex; justify-content: center;">R$${product.price}</div>
                    <a style="margin-left: 23%" class="btn btn-secondary" target="_blank" rel="noopener noreferrer" href="${product.link}">Visitar Produto</a>
                </div>
            </div>
        `
    })
    divProduct.innerHTML = template;
}

//Carregar os produtos na pag cupom
const renderCoupons = async () => {
    let uri = 'http://localhost:3000/coupons';

    const res = await fetch(uri);
    const coupons = await res.json();

    let template = '';
    coupons.forEach(coupon => {
        template += `  
            <div class="col">
            <div class="card">
                  <img src="${coupon.image}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${coupon.title}</h5>
                    <p class="card-text">${coupon.desc}</p>
                    <p class="card-text"><small class="text-muted">${coupon.cod}</small></p>
                  </div>
                </div>
            </div>
        `
    })
    divCoupon.innerHTML = template;

}

//Carregar lista produtos
const listProducts = async () => {
    let uri = 'http://localhost:3000/products';

    const res = await fetch(uri);
    const products = await res.json();

    let template = '';
    products.forEach(product => {
        template += `  
                <tr>
                    <th>${product.id}</th>
                    <td>${product.title}</td>
                    <td>R$${product.price}</td>
                    <td>${product.desc}</td>
                    <td>${product.tags}</td>
                    <td><button class="btn btn-secondary btn-sm" type="button" id="btn-edit-nome" style=""><i class="fas fa-edit"></i></button></td>
                    </tr>
        `
    });
    
    divlistPr.innerHTML = template;
}

// --- Sync ---
//Sync cadastros banco NAO APLICAVEL, APENAS AMBIENTE DE APRESENTACAO
const renderAccountList = async () => {
    let uri = 'http://localhost:3000/accounts';

    const res = await fetch(uri);
    const accounts = await res.json();
    
    accounts.forEach(account => {
        accDB.push(
            {
            id: account.id,
            name: account.name,
            username: account.username,
            email: account.email,
            birthdate: account.birthdate,
            password: account.password
        });
    })
}

//Sync produtos banco NAO APLICAVEL, APENAS AMBIENTE DE APRESENTACAO
const renderProductList = async () => {
    let uri = 'http://localhost:3000/products';

    const res = await fetch(uri);
    const products = await res.json();
    
    products.forEach(product => {
        objDB.push(
            {
            id: product.id,
            title: product.title,
            price: product.price,
            desc: product.desc,
            image: product.image,
            link: product.link,
            tags: product.tags
        });
    })
}

// --- Render ---
window.addEventListener('DOMContentLoaded', () => renderProductList());
window.addEventListener('DOMContentLoaded', () => renderAccountList());
window.addEventListener('DOMContentLoaded', () => renderCoupons());
window.addEventListener('DOMContentLoaded', () => renderProducts());
window.addEventListener('DOMContentLoaded', () => listProducts());

// --- BOTÕES ---
btnHome.addEventListener('click', toHomeSection);
btnSearch.addEventListener('click', toSearchSection);
btnCoupon.addEventListener('click', toCouponSection);
btnProducts.addEventListener('click', toProductsSection);
let cartIcon = document.querySelector("#cart--icon");
let cart = document.querySelector(".shopPopUp--box");
let closeCart = document.querySelector("#close--cart");

// Open cart
cartIcon.onclick = () =>{
    cart.classList.add('active');
}

// Close cart
closeCart.onclick = () =>{
    cart.classList.remove('active');
}

// Cart Working
if (document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', ready)
}
else{
    ready();
}

// Making Function

function ready(){
    //Onclick Icon To Remove Items from cart
    var removeCartButtons = document.getElementsByClassName("cart--remove");
    // console.log(removeCartButtons);
    for (var i=0; i< removeCartButtons.length;i++){
        removeCartButtons[i].addEventListener("click",removeCartItem);

    }
    // Quantity Changes Detection
    var quantityInput = document.getElementsByClassName("quantity");
    for (var i=0; i< quantityInput.length;i++){
        quantityInput[i].addEventListener("change",quantityChanged);
    }
    // Add to cart button function
    var addCart = document.querySelectorAll(".add--cart");
    for (var i=0;i<addCart.length; i++){
        addCart[i].addEventListener('click',addCartClicked);
    }
    //  Buy Button Work
    document.getElementsByClassName("btn-buy")[0].addEventListener('click',buyButtonClicked);

}

// Buy button
var itemList = [];
var priceList = [];
var quantityList = [];
var totalForVoucher = 0;

function buyButtonClicked(){
    
    var cartContent = document.getElementsByClassName('items')[0];
    var cartItems = cartContent.querySelectorAll('.item');

    for (var i=0; i<cartItems.length; i++){

        var itemName = cartItems[i].getElementsByClassName('product--title')[0];
        var price = cartItems[i].getElementsByClassName('price')[0];
        var quantity = cartItems[i].getElementsByClassName('quantity')[0];

        itemList.push(itemName.innerText);
        priceList.push(price.innerText);
        quantityList.push(quantity.value);

        
    }
    
    if (document.getElementsByClassName("total--price")[0].innerText == 0.00){
        alert ("Please choose items to make purchase.")
    }
    else{
        if (confirm("Your Order is placed. Please check whether you want to purchase more before printing voucher.")){
            while (cartContent.hasChildNodes()){
                cartContent.removeChild(cartContent.firstChild);
            }
            window.sessionStorage.setItem('itemList', JSON.stringify(itemList));
            window.sessionStorage.setItem('priceList', JSON.stringify(priceList));
            window.sessionStorage.setItem('quantityList', JSON.stringify(quantityList));
            window.sessionStorage.setItem('total',totalForVoucher);
            updateTotal();
            window.open('bouncher.html');
        }   
    }
    
}

// Remove Items from Cart

function removeCartItem(e){
    e.target.parentElement.remove();
    updateTotal();
}

// When Quantity Changes, also change total value
function quantityChanged(e){
    var input = e.target;
    if (isNaN(input.value)||input.value <=0 ){
        input.value = 1;
    }
    if (input.value > 20){
        alert("Sorry for inconvenience. At most 20 per each item can be purchased for each customer.")
        input.value = 1;
    }
    updateTotal();
}

// Add to cart(fetching data of parent element)
function addCartClicked(e){
    var button = e.target;
    var buttonParent = button.parentElement;
    var buttonAncestor = buttonParent.parentElement;
    var shopProducts = buttonAncestor.parentElement;
    var title = shopProducts.getElementsByClassName("title")[0].innerText;
    var price = shopProducts.getElementsByClassName("unit--price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product--img")[0].src;
    addProductToCart(title,price,productImg);
    updateTotal();
}

function addProductToCart(title,price,productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('item');
    var cartItems = document.getElementsByClassName("items")[0];
    var cartItemsNames = cartItems.getElementsByClassName("product--title");
    for (var i=0; i< cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            alert("You have already added this item to cart.");
            return;
        }
    }
    var cartBoxContent = `
                    <img src="${productImg}" alt="">
                    <div class="item--info">
                        <h4 class="product--title">${title}</h4>
                        <span>$ <span class="color--main fontNumber price">${price}</span></span>
                        <input type="number" value="1" min=1 max=20 class="quantity">
                    </div>
                    <i class="fa-solid fa-trash-can cart--remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart--remove")[0].addEventListener("click",removeCartItem);
    cartShopBox.getElementsByClassName("quantity")[0].addEventListener("change",quantityChanged);
}

// Update total
function updateTotal(){
    var cartContent = document.getElementsByClassName("items")[0];
    var cartBoxes = cartContent.getElementsByClassName("item");
    var total=0;
    for (var i=0; i< cartBoxes.length;i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("price")[0];
        var quantityElement = cartBox.getElementsByClassName("quantity")[0];
        var price = parseFloat(priceElement.innerText);
        var quantity = quantityElement.value;
        total = total + (price * quantity)
        totalForVoucher = total;
    }
        total = total.toFixed(2) // Or total = Math.round(total*100)/100
        document.getElementsByClassName("total--price")[0].innerText= total;
    
}

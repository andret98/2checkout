class Produs{
    constructor(id, name, price, description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }
}

function init(){
    $('#text').html('No products in your shopping cart');
    $('#captabel').hide();
    $('#cart1').hide();
    $('#cart2').hide();
    $('#cart3').hide();
    $('#cart4').hide();
    $("#remove1").hide();
    $("#remove2").hide();
    $("#remove3").hide();
    $("#remove4").hide();
    $("#continue").hide();
    $('#quantity1').val("1");
    $('#quantity2').val("1");
    $('#quantity3').val("1");
    $('#quantity4').val("1");
}

function addCart(index){
    var aux = v.splice(index,1);
    $('#text').html('Products in your shopping cart');
    $('#captabel').show();
    cart.push(aux[0]);
    quantity.push(1);
    if(aux[0].description == undefined)
        desc.push('No information is availble');
    else
        desc.push(aux[0].description);
    afisarecart(cart);
    afisare(v);
    total = totalCart(cart, quantity).toFixed(2);
    $('#total').html('Total:' + currency + total);
    updateTextarea(quantity);
}

function removeCart(index){
    var aux = cart.splice(index,1);
    v.push(aux[0]);
    v.sort(function(a,b){return b.price - a.price});
    quantity.splice(index,1);
    desc.splice(index,1);
    afisarecart(cart);
    afisare(v);
    total = totalCart(cart, quantity).toFixed(2);
    $('#total').html('Total:' + currency + total);
    updateTextarea(quantity);
} 

function quantityCart(index){
    quantity[index] = $.trim($("#quantity"+(index + 1)).val());
    total = totalCart(cart,quantity).toFixed(2);
    $('#total').html('Total:' + currency + total);
    $('#cartPrice' + (index + 1)).html(currency + (quantity[index] * cart[index].price).toFixed(2));    
}

function updateTextarea(quantity){
    for(var i = 0; i<quantity.length; i++) {
        var s = 'quantity';
        s = '#' + s + (i+1);
        $(s).val(quantity[i]);
    }
}
function totalCart(cart, quantity) {
    var total = 0;
    for(var i = 0; i<cart.length; i++) {
        total += cart[i].price * quantity[i];
    }
    return total;
}

function afisarecart(cart) {
    var name;
    var price;
    if(cart.length == 0) 
        $("#continue").hide();
    else
        $("#continue").show();
    for(var i = 0; i<4; i++) {
        if(cart.length >= i+1) {
            name= cart[i].name;
            price = currency + cart[i].price * quantity[i];
            $('#desc' + (i+1)).html(desc[i]);
            $("#cart" + (i+1)).show();
            $("#remove" + (i+1)).show();
        } else {
            $("#cart" + (i+1)).hide();
            $("#remove" + (i+1)).hide();
            return;
        }
        $('#cartProduct' + (i+1) ).html(name);
        $('#cartPrice' + (i+1)).html(price);       
    }

}
function afisare(v) {
    var name;
    var price;
    for(var i = 0; i<4; i++) {
        if(v.length >= i + 1) {
            name= v[i].name;
            price = "Price:" + currency + v[i].price;
            $("#box" + (i + 1)).show();
        } else {
            $("#box" + (i + 1)).hide();
            return;
        }
        $('#produs' + (i + 1)).html(name);
        $('#price' + (i + 1)).html(price);
    }
}

var total = 0;
let v = [];
let cart = [];
let quantity = [];
let desc = [];
var currency = '$'
var url = 'http://private-32dcc-products72.apiary-mock.com/product';
var request = new XMLHttpRequest();
request.open( "GET", url, false );
request.send( null );
var response = JSON.parse(request.responseText);

for(var i = 0; i < response.length; i++) {
    v.push(new Produs(response[i]['id'], response[i]['name'],
        response[i]['price'], response[i]['description']))
}
v.sort(function(a,b){return b.price - a.price});
$(function() {
    afisare(v);
    init();
    $('#quantity1').keyup(function(){
        quantityCart(0);
    });
    $('#quantity2').keyup(function(){
        quantityCart(1);
    });
    $('#quantity3').keyup(function(){
        quantityCart(2);
    });
    $('#quantity4').keyup(function(){
        quantityCart(3);
    });
    $('#buton1').on('click', function() {
        addCart(0);
    });
    $('#buton2').on('click', function() {
        addCart(1);
    });
    $('#buton3').on('click', function() {
        addCart(2);
    });
    $('#buton4').on('click', function() {
        addCart(3);
    });
    $('#remove1').on('click', function() {
        removeCart(0);
        if(cart.length == 0) {
            $('#text').html('No products in your shopping cart');
            $('#captabel').hide();
            $('#total').html("");
        }
    });
    $('#remove2').on('click', function() {
        removeCart(1);
    });
    $('#remove3').on('click', function() {
        removeCart(2);
    });
    $('#remove4').on('click', function() {
        removeCart(3);
    });
});
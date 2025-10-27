let basket = [];


function addDishToBasket(addedDish, price) {

    if (basket.find(item => item.dish === addedDish)) {
        basket.find(item => item.dish === addedDish).amount += 1
        renderCurrentBasket();
    } else {
        basket.push({
            "dish": addedDish,
            "price": price,
            "amount": 1,
        })
        renderCurrentBasket();
    }
}


function removeAmountDishFromBasket(addedDish) {
    let i = basket.findIndex(item => item.dish === addedDish);
    if (basket[i].amount > 1) {
        basket[i].amount -= 1
    } else {
        basket.splice(i, 1)
    }
    renderCurrentBasket();
}


function removeDishFromBastket(addedDish) {
    let i = basket.findIndex(item => item.dish === addedDish);
    basket.splice(i, 1);
    renderCurrentBasket();

}


function renderCurrentBasket() {
    let basketRef = document.getElementById('basket_content');
    basketRef.innerHTML = '';

    if (basket.length === 0) {
        basketRef.innerHTML = /*html*/ ` <p>Ihr Warenkorb ist aktuell leer.</p>`
    }
    else {
        for (let i = 0; i < basket.length; i++) {
            const dish = basket[i].dish;
            const price = basket[i].price;
            const amount = basket[i].amount;
            const totalprice = calcIndividualDishSum(price, amount);
            basketRef.innerHTML += getTemplateCurrentBasket(dish, amount, totalprice);
        }
    }
    renderMobileShoppingCartBtn()
    calcFinalOrderSum()
}


function calcIndividualDishSum(price, amount) {
    let sum = price * amount;
    return sum.toFixed(2);
}


function calcFinalOrderSum() {
    let subSumRef = document.getElementById('basket_price_sub_sum');
    let totalSumRef = document.getElementById('basket_price_total_sum')
    let currentSum = 0;
    let newSubSum = 0;
    let totalSubSum = 0;

    for (let i = 0; i < basket.length; i++) {
        currentSum = basket[i].price * basket[i].amount;
        totalSubSum = newSubSum + currentSum;
        newSubSum = totalSubSum;
    }
    let finalSum = totalSubSum + 4.90;
    subSumRef.innerHTML = totalSubSum.toFixed(2) + '€';
    totalSumRef.innerHTML = finalSum.toFixed(2) + '€';
    checkMinimumOrderValue(finalSum)
}


function checkMinimumOrderValue(price) {
    let orderButton = document.getElementById('order_btn');
    let minimumOrderMessage = document.getElementById('minimum_order_message');

    if (price > 19.90) {
        orderButton.disabled = false;
        minimumOrderMessage.classList.add('d-none')
    }
    else {
        orderButton.disabled = true;
        minimumOrderMessage.classList.remove('d-none')
    }
}


function sendOrder() {
    let dialogRef = document.getElementById('confirm_order_dialog');
    dialogRef.showModal();
    dialogRef.addEventListener('click', event => {
        dialogRef.close();
    })
    basket = [];
    renderCurrentBasket();
}


function showMobileBasket() {
    let basketRef = document.getElementById('basket_wrapper');
    basketRef.classList.add('show_mobile_basket');
}


function closeMobileBasket() {
    let basketRef = document.getElementById('basket_wrapper');
    basketRef.classList.remove('show_mobile_basket');
}


function renderMobileShoppingCartBtn() {
    let btnRef = document.getElementById('mobile_amount_basket_items')
    let totalAmount = 0;

    for (let i = 0; i < basket.length; i++) {
        const shoppingItems = basket[i].amount;
        totalAmount += shoppingItems;
    }

    btnRef.innerHTML = /*html*/ `
    (${totalAmount} Bestellungen)
    `
}
function getTemplateDishCategoriesNavigation(category) {
    return /*html*/ `
        <a href="#dish_category_${category}" class="dish_category">${category}</a>
        `
}


function getTemplateIndiviualDishSection(category) {
    return /*html*/ ` 
    <article class="dish_category_article" id='dish_category_${category}'>
        <img class="dish_category_header_img mg16" id='dish_category_${category}_img' src="" alt="">
        <h3 class="mg16 pdl-l6">${category}</h3>
        <div id="dish_container_${category}"></div>
    </article>`
}


function getTemplateIndiviualDishes(dish) {
   return /*html*/ `
        <article class="dish_container mg16 pdl-l6">
            <img src="assets/icons/add_icon.png" alt="Icon zum Hinfügen" onclick="addDishToBasket('${dish.dish}', ${dish.price})">
            <h4>${dish.dish}</h4>
            <p>${dish.description}</p>
            <h5 class="dish_price">${dish.price}€</h5>
        </article>
        `
}


function getTemplateIndividualSideDishes(dish, price) {
    return /*html*/ `
        <article class="dish_container mg16 pdl-l6">
            <img src="assets/icons/add_icon.png" alt="Icon zum Hinfügen" onclick="addDishToBasket('${dish}', ${price})">
            <h4>${dish}</h4>
            <h5 class="dish_price">${price}€</h5>
        </article>
        `
}


function getTemplateSideDishSection() {
    return /*html*/ `
    <article class="dish_category_article" id='dish_category_side_dishes'>
        <img class="dish_category_header_img mg16" src="assets/img/side_dishes.jpg" alt="Bild einer Beilagenkarte">
        <h3 class="mg16 pdl-l6">Beilagen</h3>
        <div id="dish_container_side_dishes"></div>
    </article>
    `
}


function getTemplateCurrentBasket(dish, amount, price) {
   return /*html*/ `
        <article class="basket_indiviual_dish">
            <h4>${dish}</h4> 
            <div class="basket_indiviual_dish_functions">
                <div class="basket_indiviual_dish_amount">
                    <img onclick="removeAmountDishFromBasket('${dish}')" class="basket_individual_dish_icon" src="assets/icons/minus_icon.png" alt="Bild eines Minus Symbols">
                    <span class="basket_indiviual_dish_style">${amount}</span>
                    <img onclick="addDishToBasket('${dish}', ${price})" class="basket_individual_dish_icon" src="assets/icons/add_icon.png" alt="Bild eines Plus Symbols">
                </div>
            
                <span class="basket_indiviual_dish_style">${price}€</span>
                <img onclick="removeDishFromBastket('${dish}')" class="basket_individual_dish_icon" src="assets/icons/delete.png" alt="Bild eines Löschen Symbols">
            </div>
        </article>
        `
}
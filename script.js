let allExistingDishCategories = ['Hauptgericht', 'Dessert', 'Vorspeise', 'Getränke']
let uniqueCategories = [];
let renderDishesArray = [];

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


function init() {
    includeHTML();
    renderDishCategoriesNavigation();
}


function renderDishCategoriesNavigation() {
    uniqueCategories = createUniqueDishCategoriesArray();
    let dishCategoriesRef = document.getElementById('existing_dish_categories');
    dishCategoriesRef.innerHTML = '';

    for (let i = 0; i < uniqueCategories.length; i++) {
        const category = uniqueCategories[i];
        dishCategoriesRef.innerHTML += /*html*/ `
        <span class="dish_category">${category}</span>
        `
    }
    renderDishSections();
}


function createUniqueDishCategoriesArray() {
    let allUsedCategories = []
    for (let i = 0; i < menu.dishes.length; i++) {
        const dish_section = menu.dishes[i].dish_section;
        allUsedCategories.push(dish_section);
    }

    uniqueCategories = [...new Set(allUsedCategories)];
    return uniqueCategories;
}


function renderDishSections() {
    for (let i = 0; i < allExistingDishCategories.length; i++) {
        const category = allExistingDishCategories[i];

        if (checkIfDishCategoryExist(category) != false) {
            renderIndiviualDishSection(category);
            renderDishSectionImage(category);
            renderIndiviualDishes(category);
        }
    }
}


function renderIndiviualDishSection(category) {
    let dishCategoryRef = document.getElementById('dish_category_section')
    dishCategoryRef.innerHTML += /*html*/ ` 
    <article class="dish_category_article" id='dish_category_${category}'>
        <img class="dish_category_header_img mg16" id='dish_category_${category}_img' src="" alt="">
        <h3 class="mg16 pdl-l6">${category}</h3>
        <div id="dish_container_${category}"></div>
    </article>`
}

function renderIndiviualDishes(category) {
    let dishCategoryRef = document.getElementById(`dish_container_${category}`)
    for (let i = 0; i < renderDishesArray.length; i++) {
        dish = renderDishesArray[i];
        dish.price = dish.price.toFixed(2);
        dishCategoryRef.innerHTML += /*html*/ `
        <article class="dish_container mg16 pdl-l6">
            <h4>${dish.dish}</h4>
            <p>${dish.description}</p>
            <h5 class="dish_price">${dish.price}€</h5>

        </article>
        `
    }
}


function renderDishSectionImage(category) {
    for (let i = 0; i < menu.section_images.length; i++) {
        const section = menu.section_images[i].dish_section;
        if (category == section) {
            document.getElementById(`dish_category_${category}_img`).src = menu.section_images[i].image
        }
    }
}


function checkIfDishCategoryExist(category) {
    if (uniqueCategories.includes(category) === true) {
        dishArray = createDishArray(category);
        renderDishesArray = dishArray;
    }
    else { return false }
}


function createDishArray(category) {
    let dishArray = [];
    for (let i = 0; i < menu.dishes.length; i++) {
        const dish_section = menu.dishes[i].dish_section;
        if (dish_section == category) {
            dishArray.push(menu.dishes[i]);
        }
    }
    return dishArray;
}

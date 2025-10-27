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
    renderSideDishSection();
}


function renderDishCategoriesNavigation() {
    uniqueCategories = createUniqueDishCategoriesArray();
    let dishCategoriesRef = document.getElementById('existing_dish_categories');
    dishCategoriesRef.innerHTML = '';

    for (let i = 0; i < uniqueCategories.length; i++) {
        const category = uniqueCategories[i];
        dishCategoriesRef.innerHTML += getTemplateDishCategoriesNavigation(category);
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
    dishCategoryRef.innerHTML += getTemplateIndiviualDishSection(category);
}


function renderIndiviualDishes(category) {
    let dishCategoryRef = document.getElementById(`dish_container_${category}`)
    for (let i = 0; i < renderDishesArray.length; i++) {
        let dish = renderDishesArray[i];
        dish.price = dish.price.toFixed(2);
        dishCategoryRef.innerHTML += getTemplateIndiviualDishes(dish);
    }
}


function renderDishSectionImage(category) {
    for (let i = 0; i < menu.section_images.length; i++) {
        const section = menu.section_images[i].dish_section;
        if (category == section) { document.getElementById(`dish_category_${category}_img`).src = menu.section_images[i].image }
    }
}


function renderSideDishSection() {
    let sideDishRef = document.getElementById('dish_category_side_dishes_section');
    sideDishRef.innerHTML = getTemplateSideDishSection();
    renderSideDishContent();
}

function renderSideDishContent() {
    let sideDishRef = document.getElementById('dish_container_side_dishes');
    sideDishRef.innerHTML = '';

    for (let i = 0; i < menu.side_dishes.length; i++) {
        const side_dish = menu.side_dishes[i].dish;
        const price = menu.side_dishes[i].price.toFixed(2);
        sideDishRef.innerHTML += getTemplateIndividualSideDishes(side_dish, price);
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

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
    renderDishCategories();
}

function renderDishCategories() {
    let uniqueCategories = createUniqueDishCategoriesArray();
    let dishCategoriesRef = document.getElementById('dish_categories');
    dishCategoriesRef.innerHTML = '';

    for (let i = 0; i < uniqueCategories.length; i++) {
        const category = uniqueCategories[i];
        dishCategoriesRef.innerHTML += /*html*/ `
        <span class="dish_category">${category}</span>
        `
    }}

function createUniqueDishCategoriesArray() {
    let categories = []
    for (let i = 0; i < menu.dishes.length; i++) {
        const dish_section = menu.dishes[i].dish_section;
        categories.push(dish_section);
    }
    const uniqueCategories = [...new Set(categories)];
    return uniqueCategories; 
}


const notificationSound = new Audio('./Notfication.mp3');
notificationSound.load(); // Carrega o som

function addToCart(title, price, imageUrl) {
    const cartContainer = document.querySelector('#products-container');

    const productId = `${title}-${imageUrl}`;
    let existingProduct = Array.from(cartContainer.children).find(product => {
        return product.dataset.id === productId;
    });

    if (existingProduct) {
        // Se o produto já existir, atualiza a quantidade
        const quantityElement = existingProduct.querySelector('#quantity-buttons p');
        let quantity = parseInt(quantityElement.textContent, 10);
        quantity += 1;
        quantityElement.textContent = quantity;
        updateTotal(); // Atualiza o total
        updateCartQuantity(); // Atualiza a quantidade de itens no carrinho
        showNotification(`A quantidade de "${title}" foi atualizada!`);
        notificationSound.play().catch(err => {
            console.error('Erro ao reproduzir o som:', err);
        });
    } else {
        // Se o produto não existir, cria um novo elemento de produto
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.dataset.id = productId; // Adiciona um identificador único
        productElement.dataset.price = price;

        productElement.innerHTML = `
        <img class="product-img" src="${imageUrl}" alt="product-img">
            <div>
                <h1>${title}</h1>
                <div id="quantity-buttons">
                    <button class="subtract">-</button>
                    <p>1</p>
                    <button class="add">+</button>
                </div>
                <p span='highlight_2'>R$ ${price} BRL</p>
                <button class="delete-product"><img src='src/images/icons/bin.png'></button>
            </div>
        `;

        cartContainer.appendChild(productElement);

        const addButton = productElement.querySelector('.add');
        const subtractButton = productElement.querySelector('.subtract');
        const deleteButton = productElement.querySelector('.delete-product');

        addButton.addEventListener('click', () => {
            const quantityElement = productElement.querySelector('#quantity-buttons p');
            let quantity = parseInt(quantityElement.textContent, 10);
            quantity += 1;
            quantityElement.textContent = quantity;
            updateTotal(); // Atualiza o total
            updateCartQuantity(); // Atualiza a quantidade de itens no carrinho
        });

        subtractButton.addEventListener('click', () => {
            const quantityElement = productElement.querySelector('#quantity-buttons p');
            let quantity = parseInt(quantityElement.textContent, 10);
            if (quantity > 1) {
                quantity -= 1;
                quantityElement.textContent = quantity;
                updateTotal(); // Atualiza o total
                updateCartQuantity(); // Atualiza a quantidade de itens no carrinho
            }
        });

        deleteButton.addEventListener('click', () => {
            productElement.remove();
            updateTotal(); // Atualiza o total
            updateCartQuantity(); // Atualiza a quantidade de itens no carrinho
            showNotification(`"${title}" foi removido do carrinho!`);
        });

        updateTotal(); // Atualiza o total após a adição
        updateCartQuantity(); // Atualiza a quantidade de itens no carrinho

        notificationSound.play().catch(err => {
            console.error('Erro ao reproduzir o som:', err);
        });

        showNotification(`"${title}" foi adicionado ao carrinho!`);
    }
}

// Função para mostrar a notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove a notificação após 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Função para atualizar o total do carrinho
function updateTotal() {
    let total = 0;

    // Seleciona todos os produtos no carrinho
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const quantity = parseInt(product.querySelector('#quantity-buttons p').textContent, 10);
        const unitPrice = parseFloat(product.dataset.price);

        // Calcula o subtotal do produto
        if (!isNaN(unitPrice)) {
            total += quantity * unitPrice;
        }
    });

    // Exibe o total atualizado (supondo que você tenha um elemento para exibir o total)
    const totalElement = document.querySelector('#total-price');
    if (totalElement) {
        totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
}

function updateCartQuantity() {
    const cartContainer = document.querySelector('#products-container');
    const cartQuantityElement = document.querySelector('#cart-quantity-items');

    // Conta o número total de itens no carrinho
    let totalQuantity = 0;
    const products = cartContainer.querySelectorAll('.product');

    products.forEach(product => {
        const quantity = parseInt(product.querySelector('#quantity-buttons p').textContent, 10);
        totalQuantity += quantity;
    });

    // Atualiza o texto do elemento de quantidade de itens
    cartQuantityElement.textContent = totalQuantity;
}

function createProduct(title, price, imageUrl, onEstoq, promotion) {
    const product = document.createElement('div');
    product.classList.add('shop-product');

    // Cria a parte da imagem e botão do produto
    const imageContent = document.createElement('div');
    imageContent.classList.add('shop-image-content');

    const backgroundImage = document.createElement('img');
    backgroundImage.classList.add('shop-product-background');
    backgroundImage.src = 'src/images/Backgrounds/PRODUCT_BACKGROUND.jpg';

    const productImage = document.createElement('img');
    productImage.classList.add('shop-product-img');
    productImage.src = imageUrl;
    productImage.alt = 'product-img';

    const addButton = document.createElement('button');
    addButton.classList.add('shop-product-addcart');
    addButton.textContent = '[🛒] A.D.D';

    // Adiciona os atributos ao botão
    addButton.setAttribute('data-title', title);
    addButton.setAttribute('data-price', price);
    addButton.setAttribute('data-image', imageUrl);

    imageContent.appendChild(backgroundImage);
    imageContent.appendChild(productImage);

    if (promotion) {
        const promotionLabel = document.createElement('div');
        promotionLabel.classList.add('promotion-label');
        promotionLabel.textContent = 'SALVE ' + promotion.off;
        imageContent.appendChild(promotionLabel);
    }

    // Cria a parte de conteúdo do produto (texto)
    const productContent = document.createElement('div');
    productContent.classList.add('shop-product-content');

    const textContent = document.createElement('div');
    textContent.classList.add('shop-product-textcontent');

    const titleElement = document.createElement('h1');
    titleElement.textContent = title;

    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price-container');

    const priceElement = document.createElement('p');
    priceElement.classList.add('highlight_2', 'product-price');
    priceElement.innerHTML = `R$ ${price} BRL`;

    if (promotion && promotion.oldPrice) {
        const oldPriceElement = document.createElement('p');
        oldPriceElement.classList.add('old-price');
        oldPriceElement.style.textDecoration = 'line-through';
        oldPriceElement.innerHTML = `R$ ${promotion.oldPrice} BRL`;
        oldPriceElement.style.fontSize = '0.8em'

        priceContainer.appendChild(oldPriceElement);
    }

    priceContainer.appendChild(priceElement);

    if (!onEstoq) {
        const outOfStockOverlay = document.createElement('div');
        outOfStockOverlay.classList.add('out-of-stock-overlay');
        outOfStockOverlay.textContent = 'Esgotado';
        priceElement.style.textDecoration = 'line-through';
        imageContent.appendChild(outOfStockOverlay);
    } else {
        imageContent.appendChild(addButton);
    }

    // Adiciona o título e preço ao conteúdo do produto
    textContent.appendChild(titleElement);
    textContent.appendChild(priceContainer);

    // Adiciona o texto ao container de conteúdo do produto
    productContent.appendChild(textContent);

    // Adiciona a parte da imagem e a parte de conteúdo ao produto
    product.appendChild(imageContent);
    product.appendChild(productContent);
    product.style.zIndex = '2';

    // Adiciona um evento de clique ao botão de adicionar ao carrinho
    addButton.addEventListener('click', () => {
        addToCart(title, price, imageUrl);
    });

    return product;
}



const productsContainer = document.querySelector('#shop-products-container');
const productsData = [
    { title: 'Bat', type: 'knife' , price: '39.99', imageUrl: 'src/images/Backgrounds/Banners/BAT.jpg', onEstoq: false },
    { title: 'Candy', type: 'gun' , price: '17.50', imageUrl: 'src/images/Backgrounds/Banners/CANDY.jpg', onEstoq: true, promotion: { oldPrice: '27.50', off: '10.00R$' } },
    { title: 'Candleflame', type: 'knife' , price: '15.99', imageUrl: 'src/images/Backgrounds/Banners/CD.jpg', onEstoq: true },
    { title: 'Darkshot', type: 'gun' , price: '24.55', imageUrl: 'src/images/Backgrounds/Banners/DK.jpg', onEstoq: true },
    { title: 'Evergun', type: 'gun' , price: '38.99', imageUrl: 'src/images/Backgrounds/Banners/EG.jpg', onEstoq: true, promotion: { oldPrice: '63.99', off: '25.00R$' } },
    { title: 'ElderwoodBlade', type: 'knife' , price: '12.99', imageUrl: 'src/images/Backgrounds/Banners/EWB.jpg', onEstoq: true },
    { title: 'Gingerscope', type: 'gun' , price: '345.75', imageUrl: 'src/images/Backgrounds/Banners/GSCOP.jpg', onEstoq: true },
    { title: 'Harvester', type: 'gun' , price: '65.33', imageUrl: 'src/images/Backgrounds/Banners/HARVESTER.jpg', onEstoq: true },
    { title: 'Heartblade', type: 'knife' , price: '10.55', imageUrl: 'src/images/Backgrounds/Banners/HB.jpg', onEstoq: true, promotion: { oldPrice: '15.55', off: '5.00R$' } },
    { title: 'Icebreaker', type: 'knife' , price: '8.99', imageUrl: 'src/images/Backgrounds/Banners/ICEB.jpg', onEstoq: true },
    { title: 'Icepiercer', type: 'gun' , price: '65.00', imageUrl: 'src/images/Backgrounds/Banners/ICEP.jpg', onEstoq: true },
    { title: 'RainbowGun', type: 'gun' , price: '27.88', imageUrl: 'src/images/Backgrounds/Banners/RG.jpg', onEstoq: true },
    { title: 'Sakura', type: 'knife' , price: '57.99', imageUrl: 'src/images/Backgrounds/Banners/SAKURA.jpg', onEstoq: true },
    { title: 'Spirit', type: 'knife' , price: '10.25', imageUrl: 'src/images/Backgrounds/Banners/SPIRIT.jpg', onEstoq: false },
    { title: 'Turkey', type: 'knife' , price: '79.99', imageUrl: 'src/images/Backgrounds/Banners/TURKEY.jpg', onEstoq: true },
    { title: 'VampireAxe', type: 'knife' , price: '110.50', imageUrl: 'src/images/Backgrounds/Banners/VAMPIREAXE.jpg', onEstoq: false },
    { title: 'Waves', type: 'knife' , price: '7.50', imageUrl: 'src/images/Backgrounds/Banners/WAVES.jpg', onEstoq: true },
    { title: 'Batwing', type: 'knife' , price: '6.99', imageUrl: 'src/images/Backgrounds/Banners/BATWING.jpg', onEstoq: true, promotion: { oldPrice: '10.99', off: '4.00R$' } },
    { title: 'Watergun', type: 'gun' , price: '14.88', imageUrl: 'src/images/Backgrounds/Banners/WATERGUN.jpg', onEstoq: true, promotion: { oldPrice: '19.88', off: '5.00R$'} },
    { title: 'VampireGun', type: 'gun' , price: '85.99', imageUrl: 'src/images/Backgrounds/Banners/VAMPIREGUN.jpg', onEstoq: true },
    { title: 'Sugar', type: 'knife' , price: '17.80', imageUrl: 'src/images/Backgrounds/Banners/SUGAR.jpg', onEstoq: true }
    
];
productsData.forEach(productData => {
    const productElement = createProduct(productData.title, productData.price, productData.imageUrl, productData.onEstoq, productData.promotion);
    productsContainer.appendChild(productElement);
});

const knivesContainer = document.querySelector('#shop-knives-container');
const gunsContainer = document.querySelector('#shop-guns-container');

productsData
.filter(product => product.type === 'knife') // Filtra produtos do tipo 'knife'
.forEach(productData => {
    if (productData.onEstoq !== false) {
        const productElement = createProduct(productData.title, productData.price, productData.imageUrl,productData.onEstoq, productData.promotion);
        knivesContainer.appendChild(productElement);
    }
});

productsData
.filter(product => product.type === 'gun') // Filtra produtos do tipo 'knife'
.forEach(productData => {
    if (productData.onEstoq !== false) {
        const productElement = createProduct(productData.title, productData.price, productData.imageUrl,productData.onEstoq, productData.promotion);
        gunsContainer.appendChild(productElement);
    }
});


const searchInput = document.getElementById('search-input');
const shopProductsContainer = document.querySelector('#shop-products-container');

function filterProducts(query) {
    const products = shopProductsContainer.querySelectorAll('.shop-product');

    let noResultsMessage = document.querySelector('#no-results-message');
    if (!noResultsMessage) {
        noResultsMessage = document.createElement('div');
        noResultsMessage.id = 'no-results-message';
        noResultsMessage.classList.add('highlight')
        noResultsMessage.style.fontSize = 'clamp(2.5rem, 3vw, 4rem)';
        noResultsMessage.style.fontFamily = 'var(--default-font)';
        noResultsMessage.style.fontWeight = 'bold';
        noResultsMessage.style.textAlign = 'center';
        noResultsMessage.style.marginTop = '20px';
        noResultsMessage.style.display = 'none';
        shopProductsContainer.appendChild(noResultsMessage);
    }

    query = query.toLowerCase().trim();
    let hasResults = false;

    products.forEach(product => {
        const title = product.querySelector('.shop-product-content h1').textContent.toLowerCase();

        if (title.includes(query)) {
            product.style.display = '';
            hasResults = true;
        } else {
            product.style.display = 'none';
        }
    });

    if (hasResults) {
        noResultsMessage.style.display = 'none';
    } else {
        noResultsMessage.innerHTML = `[❌] O Produto <span class='highlight'>"${query}"</span> não foi encontrado.`;
        noResultsMessage.style.display = 'block';
    }
}

// Adiciona o evento de busca ao input
searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const query = searchInput.value;
        filterProducts(query);
    }
});

const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const applyFilterButton = document.getElementById('apply-filter');

applyFilterButton.addEventListener('click', () => {
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
    const products = shopProductsContainer.querySelectorAll('.shop-product');

    let hasResults = false;

    products.forEach(product => {
        const priceElement = product.querySelector('.product-price');
        if (priceElement) {
            const priceText = priceElement.textContent.replace('R$ ', '').replace(' BRL', '').trim();
            const price = parseFloat(priceText);

            if (price >= minPrice && price <= maxPrice) {
                product.style.display = '';
                hasResults = true;
            } else {
                product.style.display = 'none';
            }
        } else {
            console.warn('Produto sem preço:', product);
            product.style.display = 'none';
        }
    });

    if (!hasResults) {
        // Adiciona a mensagem de "nenhum produto encontrado"
        const noResultsMessage = document.createElement('div');
        noResultsMessage.innerHTML = `[❌] Nenhum produto foi encontrado neste intervalo de preço.`;
        noResultsMessage.classList.add('highlight');
        noResultsMessage.style.textAlign = 'center';
        noResultsMessage.style.marginTop = '20px';
        noResultsMessage.style.fontSize = 'clamp(2.5rem, 3vw, 4rem)';
        noResultsMessage.style.fontFamily = 'var(--default-font)';
        noResultsMessage.style.fontWeight = 'bold';

        shopProductsContainer.appendChild(noResultsMessage);
    } else {
        // Remove a mensagem se ela já existir
        const existingMessage = shopProductsContainer.querySelector('.no-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }

    filterPanel.classList.remove('show');
});

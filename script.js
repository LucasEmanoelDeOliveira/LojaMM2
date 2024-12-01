const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const containers = document.querySelectorAll('#menu, #filter-panel, #cart-container');

let rotation = 0;

menuToggle.addEventListener('click', () => {
    hideOtherContainers('menu');

    if (menu.classList.contains('show')) {
        rotation += 90;
        menuToggle.style.transform = `rotate(${rotation}deg)`;
    } else {
        rotation += 90;
        menuToggle.style.transform = `rotate(${rotation}deg)`;
    }
    menu.classList.toggle('show');
});

const cartButton = document.getElementById('cart-button');

cartButton.addEventListener('click', function () {
    hideOtherContainers('cart-container');

    const container = document.getElementById('cart-container');
    container.classList.toggle('show');

    cartButton.classList.add('shake');

    cartButton.addEventListener('animationend', function () {
        cartButton.classList.remove('shake');
    }, { once: true });
});

const filterButton = document.getElementById('filter-button');
const filterPanel = document.getElementById('filter-panel');

filterButton.addEventListener('click', () => {
    hideOtherContainers('filter-panel')
    filterPanel.classList.toggle('show');
});


function hideOtherContainers(excludeId) {
    containers.forEach(container => {
        if (container.id !== excludeId && container.classList.contains('show')) {
            container.classList.remove('show');
        }
    });
}

const imageSources = [
    "src/images/Backgrounds/Banners/GSCOP.jpg",
    "src/images/Backgrounds/Banners/HARVESTER.jpg",
    "src/images/Backgrounds/Banners/SAKURA.jpg",
    "src/images/Backgrounds/Banners/TURKEY.jpg",
    "src/images/Backgrounds/Banners/VAMPIREAXE.jpg",
    "src/images/Backgrounds/Banners/SPIRIT.jpg",
    "src/images/Backgrounds/Banners/WAVES.jpg",
    "src/images/Backgrounds/Banners/ICEB.jpg",
    "src/images/Backgrounds/Banners/ICEP.jpg",
    "src/images/Backgrounds/Banners/CD.jpg",
    "src/images/Backgrounds/Banners/BAT.jpg",
    "src/images/Backgrounds/Banners/HB.jpg",
    "src/images/Backgrounds/Banners/EWB.jpg",
    "src/images/Backgrounds/Banners/CANDY.jpg",
    "src/images/Backgrounds/Banners/RG.jpg",
    "src/images/Backgrounds/Banners/DK.jpg",
    "src/images/Backgrounds/Banners/EG.jpg",
    "src/images/Backgrounds/Banners/WATERGUN.jpg",
    "src/images/Backgrounds/Banners/SUGAR.jpg",
    "src/images/Backgrounds/Banners/VAMPIREGUN.jpg",
    "src/images/Backgrounds/Banners/BATWING.jpg"
];

const imageTrack = document.querySelector('.image-track');

function addImagesToTrack() {
    const totalImages = imageSources.length;
    const amplitude = 2; // Altura da onda em rem
    const frequency = 0.5; // Frequência da onda

    // Adiciona as imagens com efeito de onda
    imageSources.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.style.zIndex = 4;

        const adjustedIndex = index % totalImages;
        const yValue = amplitude * Math.sin(adjustedIndex * frequency);

        img.style.animationDuration = `${Math.floor(Math.random() * (20 - 10 + 1)) + 10}s`;
        img.style.transform = `translateY(${yValue}rem)`;
        imageTrack.appendChild(img);
    });

    imageSources.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;

        const adjustedIndex = index % totalImages;
        const yValue = amplitude * Math.sin(adjustedIndex * frequency);

        img.style.animationDuration = `${Math.floor(Math.random() * (20 - 10 + 1)) + 10}s`;
        img.style.transform = `translateY(${yValue}rem)`;
        imageTrack.appendChild(img);
    });
}

addImagesToTrack();

// Função para inicializar a rolagem e os eventos em um contêiner específico
function initializeSlider(sliderContainerId) {
    const sliderContainer = document.querySelector(`#${sliderContainerId}`);
    if (!sliderContainer) {
        console.error(`Container com ID ${sliderContainerId} não encontrado.`);
        return;
    }

    // Seleciona os botões de navegação com base em suas classes
    const leftButton = sliderContainer.parentElement.querySelector('.left-btn');
    const rightButton = sliderContainer.parentElement.querySelector('.right-btn');

    if (!leftButton || !rightButton) {
        console.error('Botões de navegação não encontrados.');
        return;
    }

    const scrollAmount = 300; // Pixels

    function scrollRight() {
        if (sliderContainer.scrollLeft + sliderContainer.offsetWidth >= sliderContainer.scrollWidth) {
            sliderContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            sliderContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }

    let autoScroll = setInterval(scrollRight, 3000);

    sliderContainer.addEventListener('mouseover', () => clearInterval(autoScroll));
    sliderContainer.addEventListener('mouseout', () => {
        autoScroll = setInterval(scrollRight, 3000);
    });

    leftButton.addEventListener('click', () => {
        clearInterval(autoScroll);
        if (sliderContainer.scrollLeft === 0) {
            sliderContainer.scrollTo({ left: sliderContainer.scrollWidth, behavior: 'smooth' });
        } else {
            sliderContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
        autoScroll = setInterval(scrollRight, 3000);
    });

    rightButton.addEventListener('click', () => {
        clearInterval(autoScroll);
        scrollRight();
        autoScroll = setInterval(scrollRight, 3000);
    });
}

// Inicializar ambos os sliders
initializeSlider('shop-knives-container');
initializeSlider('shop-guns-container');

document.querySelectorAll('.dropdown-title').forEach(function(title) {
    title.addEventListener('click', function() {
        const content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});


document.getElementById('end-buy').addEventListener('click', function() {
    // Criar o overlay que cobre a tela
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'modal-overlay';
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = 0;
    modalOverlay.style.left = 0;
    modalOverlay.style.width = '100%';
    modalOverlay.style.height = '100%';
    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Fundo semitransparente
    modalOverlay.style.display = 'flex';
    modalOverlay.style.justifyContent = 'center';
    modalOverlay.style.alignItems = 'center';
    modalOverlay.style.zIndex = 1000;

    // Criar o container de confirmação
    const confirmationContainer = document.createElement('div');
    confirmationContainer.id = 'confirmation-container';
    confirmationContainer.style.padding = '20px';
    confirmationContainer.style.backgroundColor = 'white';
    confirmationContainer.style.border = '2px solid #ccc';
    confirmationContainer.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
    confirmationContainer.style.maxWidth = '300px'
    confirmationContainer.style.borderRadius = '10px';
    confirmationContainer.style.textAlign = 'center';
    confirmationContainer.style.transform = 'scale(0)';
    confirmationContainer.style.transition = 'transform 0.5s ease-in-out';

    const h1 = document.createElement('h1');
    h1.textContent = '✋ ESPERE AI !';
    confirmationContainer.appendChild(h1);

    const p = document.createElement('p');
    p.innerHTML = 'Este não é um Website 100% funcional, e sim um Website Modelo (para clientes escolher este modelo para sua loja), nenhum produto aqui está a venda realmente. Caso deseje comprar um Website igual a este, e funcional, você deve comprar com Lucio!!';
    confirmationContainer.appendChild(p);

    // Botão para redirecionar
    const redirectBtn = document.createElement('button');
    redirectBtn.textContent = 'Comprar Website';
    redirectBtn.style.margin = '5px';
    redirectBtn.style.padding = '10px 20px';
    redirectBtn.style.cursor = 'pointer';
    redirectBtn.addEventListener('click', function() {
        window.open('https://lucasemanoeldeoliveira.github.io/Portifolio/', '_blank');
    });    
    confirmationContainer.appendChild(redirectBtn);

    // Botão para fechar o container
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Fechar';
    closeBtn.style.margin = '5px';
    closeBtn.style.padding = '10px 20px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.addEventListener('click', function() {
        confirmationContainer.classList.remove('show');
        setTimeout(() => {
            modalOverlay.remove();
        }, 500); // Tempo para a animação de desaparecimento
    });
    confirmationContainer.appendChild(closeBtn);

    // Adicionar o container de confirmação ao overlay
    modalOverlay.appendChild(confirmationContainer);

    // Adicionar o overlay ao body
    document.body.appendChild(modalOverlay);

    // Exibir o container com animação
    setTimeout(() => {
        confirmationContainer.style.transform = 'scale(1)';
    }, 10);
});

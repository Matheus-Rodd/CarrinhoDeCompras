let products = [
    {
      "id": 1,
      "title": "Camiseta Básica de Algodão",
      "price": 29.99,
      "description": "Camiseta básica feita de algodão de alta qualidade. Disponível em várias cores.",
      "category": "Roupas",
      "image": "https://fakestoreapi.com/img/1.jpg",
      "rating": { "rate": 4.5, "count": 120 }
    },
    {
      "id": 2,
      "title": "Camiseta Estampada de Manga Curta",
      "price": 49.99,
      "description": "Camiseta estampada com design moderno. Ideal para o verão.",
      "category": "Roupas",
      "image": "https://fakestoreapi.com/img/2.jpg",
      "rating": { "rate": 4.3, "count": 130 }
    },
    {
      "id": 3,
      "title": "Tênis Esportivo",
      "price": 129.99,
      "description": "Tênis esportivo para todas as atividades físicas. Confortável e durável.",
      "category": "Calçados",
      "image": "https://fakestoreapi.com/img/3.jpg",
      "rating": { "rate": 4.7, "count": 150 }
    },
    {
      "id": 4,
      "title": "Mochila Resistente para Viagem",
      "price": 89.99,
      "description": "Mochila com vários compartimentos, ideal para viagens e aventuras.",
      "category": "Acessórios",
      "image": "https://fakestoreapi.com/img/4.jpg",
      "rating": { "rate": 4.6, "count": 110 }
    },
    {
      "id": 5,
      "title": "Smartphone com Tela de 6.5 Pol",
      "price": 599.99,
      "description": "Smartphone com tela de 6.5 polegadas, câmeras de alta qualidade e desempenho rápido.",
      "category": "Eletrônicos",
      "image": "https://fakestoreapi.com/img/5.jpg",
      "rating": { "rate": 4.8, "count": 180 }
    },
    {
      "id": 6,
      "title": "Relógio Digital Inteligente",
      "price": 249.99,
      "description": "Relógio inteligente com monitoramento de saúde e rastreamento de atividades.",
      "category": "Acessórios",
      "image": "https://fakestoreapi.com/img/6.jpg",
      "rating": { "rate": 4.4, "count": 140 }
    },
    {
      "id": 7,
      "title": "Fone de Ouvido Bluetooth",
      "price": 99.99,
      "description": "Fone de ouvido Bluetooth com cancelamento de ruído e som de alta qualidade.",
      "category": "Eletrônicos",
      "image": "https://fakestoreapi.com/img/7.jpg",
      "rating": { "rate": 4.2, "count": 160 }
    },
    {
      "id": 8,
      "title": "Cafeteira Elétrica Automática",
      "price": 149.99,
      "description": "Cafeteira elétrica automática, fácil de usar, para um café perfeito.",
      "category": "Eletrodomésticos",
      "image": "https://fakestoreapi.com/img/8.jpg",
      "rating": { "rate": 4.1, "count": 200 }
    },
    {
      "id": 9,
      "title": "Mouse e Teclado Wireless",
      "price": 59.99,
      "description": "Kit de mouse e teclado wireless com design ergonômico e longa durabilidade.",
      "category": "Informática",
      "image": "https://fakestoreapi.com/img/9.jpg",
      "rating": { "rate": 4.3, "count": 90 }
    },
    {
      "id": 10,
      "title": "Cadeira de Escritório Ergonômica",
      "price": 199.99,
      "description": "Cadeira ergonômica para escritório, com ajuste de altura e apoio lombar.",
      "category": "Móveis",
      "image": "https://fakestoreapi.com/img/10.jpg",
      "rating": { "rate": 4.6, "count": 220 }
    }
  ];
  
  let cart = [];
  
  // Seletores do DOM
  const selectors = {
    products: document.querySelector(".products"),
    cartBtn: document.querySelector(".cart-btn"),
    cartQty: document.querySelector(".cart-qty"),
    cartClose: document.querySelector(".cart-close"),
    cart: document.querySelector(".cart"),
    cartOverlay: document.querySelector(".cart-overlay"),
    cartClear: document.querySelector(".cart-clear"),
    cartBody: document.querySelector(".cart-body"),
    cartTotal: document.querySelector(".cart-total"),
  };
  
  // Inicializa a loja
  const setupListeners = () => {
    document.addEventListener("DOMContentLoaded", initStore);
    selectors.products.addEventListener("click", addToCart);
    selectors.cartBtn.addEventListener("click", showCart);
    selectors.cartOverlay.addEventListener("click", hideCart);
    selectors.cartClose.addEventListener("click", hideCart);
    selectors.cartBody.addEventListener("click", updateCart);
    selectors.cartClear.addEventListener("click", clearCart);
  };
  
  const initStore = () => {
    loadCart();
    renderProducts();
    renderCart();
  };
  
  const showCart = () => {
    selectors.cart.classList.add("show");
    selectors.cartOverlay.classList.add("show");
  };
  
  const hideCart = () => {
    selectors.cart.classList.remove("show");
    selectors.cartOverlay.classList.remove("show");
  };
  
  const clearCart = () => {
    cart = [];
    saveCart();
    renderCart();
    setTimeout(hideCart, 500);
  };
  
  const addToCart = (e) => {
    if (e.target.hasAttribute("data-id")) {
      const id = parseInt(e.target.dataset.id);
      const inCart = cart.find((x) => x.id === id);
      if (inCart) {
        alert("Item já está no carrinho.");
        return;
      }
      cart.push({ id, qty: 1 });
      saveCart();
      renderCart();
      showCart();
    }
  };
  
  const removeFromCart = (id) => {
    cart = cart.filter((x) => x.id !== id);
    renderCart();
  };
  
  const increaseQty = (id) => {
    const item = cart.find((x) => x.id === id);
    if (!item) return;
    item.qty++;
  };
  
  const decreaseQty = (id) => {
    const item = cart.find((x) => x.id === id);
    if (!item) return;
    item.qty--;
    if (item.qty === 0) removeFromCart(id);
  };
  
  const updateCart = (e) => {
    if (e.target.hasAttribute("data-btn")) {
      const cartItem = e.target.closest(".cart-item");
      const id = parseInt(cartItem.dataset.id);
      const btn = e.target.dataset.btn;
      btn === "incr" && increaseQty(id);
      btn === "decr" && decreaseQty(id);
      saveCart();
      renderCart();
    }
  };
  
  const saveCart = () => {
    localStorage.setItem("online-store", JSON.stringify(cart));
  };
  
  const loadCart = () => {
    cart = JSON.parse(localStorage.getItem("online-store")) || [];
  };
  
  const renderCart = () => {
    const cartQty = cart.reduce((sum, item) => sum + item.qty, 0);
    selectors.cartQty.textContent = cartQty;
    selectors.cartQty.classList.toggle("visible", cartQty);
    selectors.cartTotal.textContent = calculateTotal().toFixed(2);
    if (cart.length === 0) {
      selectors.cartBody.innerHTML = '<div class="cart-empty">Seu carrinho está vazio.</div>';
      return;
    }
    selectors.cartBody.innerHTML = cart
      .map(({ id, qty }) => {
        const product = products.find((x) => x.id === id);
        const { title, image, price } = product;
        const amount = price * qty;
        return `
          <div class="cart-item" data-id="${id}">
            <img src="${image}" alt="${title}" />
            <div class="cart-item-detail">
              <h3>${title}</h3>
              <h5>${price.toFixed(2)}</h5>
              <div class="cart-item-amount">
                <i class="bi bi-dash-lg" data-btn="decr"></i>
                <span class="qty">${qty}</span>
                <i class="bi bi-plus-lg" data-btn="incr"></i>
                <span class="cart-item-price">${amount.toFixed(2)}</span>
              </div>
            </div>
          </div>`;
      })
      .join("");
  };
  
  const renderProducts = () => {
    selectors.products.innerHTML = products
      .map((product) => {
        const { id, title, image, price } = product;
        const inCart = cart.find((x) => x.id === id);
        const disabled = inCart ? "disabled" : "";
        const text = inCart ? "Adicionado ao Carrinho" : "Adicionar ao Carrinho";
  
        return `
          <div class="product">
            <img src="${image}" alt="${title}" />
            <h3>${title}</h3>
            <h5>${price.toFixed(2)}</h5>
            <button ${disabled} data-id=${id}>${text}</button>
          </div>`;
      })
      .join("");
  };
  
  const calculateTotal = () => {
    return cart
      .map(({ id, qty }) => {
        const { price } = products.find((x) => x.id === id);
        return qty * price;
      })
      .reduce((sum, number) => sum + number, 0);
  };
  
  setupListeners();
  
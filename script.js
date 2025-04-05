// Données de l'application
let products = [
  {
    id: 1,
    name: "Haltères ajustables 20kg",
    category: "musculation",
    price: 89.99,
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Haltères ajustables de 2 à 20kg pour vos entraînements de musculation à domicile.",
  },
  {
    id: 2,
    name: "Tapis de course pliable",
    category: "cardio",
    price: 499.99,
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1570829053985-56e661df1ca2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Tapis de course pliable avec 12 programmes d'entraînement et écran LCD.",
  },
  {
    id: 3,
    name: "Barre de traction murale",
    category: "musculation",
    price: 49.99,
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Barre de traction murale robuste pour renforcer le haut du corps.",
  },
  {
    id: 4,
    name: "Corde à sauter professionnelle",
    category: "accessoires",
    price: 19.99,
    stock: 30,
    image:
      "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Corde à sauter professionnelle avec poignées antidérapantes pour vos entraînements cardio.",
  },
  {
    id: 5,
    name: "Protéine Whey 1kg",
    category: "nutrition",
    price: 29.99,
    stock: 25,
    image:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Protéine Whey de haute qualité pour favoriser la récupération musculaire.",
  },
  {
    id: 6,
    name: "Banc de musculation réglable",
    category: "musculation",
    price: 129.99,
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Banc de musculation réglable multi-positions pour des exercices variés.",
  },
  {
    id: 7,
    name: "Vélo d'appartement",
    category: "cardio",
    price: 299.99,
    stock: 10,
    image:
      "https://images.unsplash.com/photo-1591741849697-e05b7cd1d3c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Vélo d'appartement avec 8 niveaux de résistance et écran LCD.",
  },
  {
    id: 8,
    name: "Kettlebell 12kg",
    category: "musculation",
    price: 39.99,
    stock: 18,
    image:
      "https://images.unsplash.com/photo-1603455778956-d71245d5f7ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Kettlebell de 12kg en fonte pour des exercices de force et de cardio.",
  },
]

let cart = []
const orders = []

// Gestion des produits
function displayProducts(category = "all") {
  const productsGrid = document.getElementById("products-grid")
  productsGrid.innerHTML = ""

  // Filtrer les produits par catégorie si nécessaire
  let filteredProducts = products
  if (category !== "all") {
    filteredProducts = products.filter((p) => p.category === category)
  }

  // Afficher les produits
  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"
    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-price">${product.price.toFixed(2)} TND</div>
        <div class="product-actions">
          <span>Stock: ${product.stock}</span>
          <button class="btn btn-primary" onclick="addToCart(${product.id})">Ajouter au panier</button>
        </div>
      </div>
    `
    productsGrid.appendChild(productCard)
  })
}

// Gestion du panier
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)

  if (!product) {
    alert("Produit non trouvé.")
    return
  }

  if (product.stock <= 0) {
    alert("Ce produit est en rupture de stock.")
    return
  }

  // Vérifier si le produit est déjà dans le panier
  const cartItem = cart.find((item) => item.productId === productId)

  if (cartItem) {
    // Augmenter la quantité
    cartItem.quantity++
  } else {
    // Ajouter le produit au panier
    cart.push({
      productId: productId,
      quantity: 1,
    })
  }

  // Mettre à jour le compteur du panier
  updateCartCount()

  alert("Produit ajouté au panier.")
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count")
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  cartCount.textContent = totalItems
}

function updateCartItemQuantity(productId, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(productId)
    return
  }

  const product = products.find((p) => p.id === productId)

  if (!product) {
    alert("Produit non trouvé.")
    return
  }

  if (newQuantity > product.stock) {
    alert("Quantité non disponible en stock.")
    return
  }

  // Mettre à jour la quantité
  const cartItem = cart.find((item) => item.productId === productId)

  if (cartItem) {
    cartItem.quantity = newQuantity
  }

  // Mettre à jour l'affichage
  updateCartCount()
  displayCart()
}

function removeFromCart(productId) {
  // Supprimer l'article du panier
  cart = cart.filter((item) => item.productId !== productId)

  // Mettre à jour l'affichage
  updateCartCount()
  displayCart()
}

function displayCart() {
  const cartItems = document.getElementById("cart-items")
  cartItems.innerHTML = ""

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Votre panier est vide.</p>"
    document.getElementById("cart-total-price").textContent = "0.00"
    document.getElementById("checkout-form").style.display = "none"
    return
  }

  let total = 0

  // Afficher les articles du panier
  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.productId)

    if (product) {
      const itemTotal = product.price * item.quantity
      total += itemTotal

      const cartItem = document.createElement("div")
      cartItem.className = "cart-item"
      cartItem.innerHTML = `
        <div class="cart-item-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="cart-item-info">
          <h3>${product.name}</h3>
          <div class="cart-item-price">${product.price.toFixed(2)} TND</div>
        </div>
        <div class="cart-item-quantity">
          <button onclick="updateCartItemQuantity(${product.id}, ${item.quantity - 1})">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateCartItemQuantity(${product.id}, ${item.quantity + 1})">+</button>
        </div>
        <div class="cart-item-remove" onclick="removeFromCart(${product.id})">
          Supprimer
        </div>
      `
      cartItems.appendChild(cartItem)
    }
  })

  // Mettre à jour le total
  document.getElementById("cart-total-price").textContent = total.toFixed(2)

  // Afficher le formulaire de commande
  document.getElementById("checkout-form").style.display = "block"
}

// Ajouter ces fonctions pour la gestion des produits

// Initialisation de l'application
document.addEventListener("DOMContentLoaded", () => {
  // Afficher les produits sur la page des produits
  displayProducts()

  // Afficher les produits dans la page de gestion
  displayProductsList()

  // Initialiser le compteur du panier
  updateCartCount()
})

// Navigation - Modifier pour inclure la page de gestion des produits
function navigateTo(page) {
  // Cacher toutes les pages
  const contentPages = document.querySelectorAll(".content-page")
  contentPages.forEach((p) => p.classList.remove("active"))

  // Afficher la page sélectionnée
  document.getElementById(page + "-page").classList.add("active")

  // Actions spécifiques pour certaines pages
  if (page === "products") {
    displayProducts()
  } else if (page === "cart") {
    displayCart()
  } else if (page === "manage-products") {
    displayProductsList()
  }
}

// Fonctions de gestion des produits
function displayProductsList() {
  const productsList = document.getElementById("products-list")
  productsList.innerHTML = ""

  // Afficher les produits
  products.forEach((product) => {
    const productItem = document.createElement("div")
    productItem.className = "admin-item"
    productItem.innerHTML = `
      <div>
        <strong>${product.name}</strong>
        <div>Catégorie: ${product.category}</div>
        <div>Prix: ${product.price.toFixed(2)} TND</div>
        <div>Stock: ${product.stock}</div>
      </div>
      <div class="admin-item-actions">
        <button class="btn btn-secondary" onclick="editProduct(${product.id})">Modifier</button>
        <button class="btn btn-primary" onclick="deleteProduct(${product.id})">Supprimer</button>
      </div>
    `
    productsList.appendChild(productItem)
  })
}

function showProductForm() {
  // Réinitialiser le formulaire
  document.getElementById("product-form-title").textContent = "Ajouter un produit"
  document.getElementById("product-id").value = ""
  document.getElementById("product-name").value = ""
  document.getElementById("product-category").value = "musculation"
  document.getElementById("product-price").value = ""
  document.getElementById("product-stock").value = ""
  document.getElementById("product-image").value =
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  document.getElementById("product-description").value = ""

  // Afficher le formulaire
  document.getElementById("product-form").style.display = "block"
}

function editProduct(productId) {
  const product = products.find((p) => p.id === productId)

  if (!product) {
    alert("Produit non trouvé.")
    return
  }

  // Remplir le formulaire
  document.getElementById("product-form-title").textContent = "Modifier un produit"
  document.getElementById("product-id").value = product.id
  document.getElementById("product-name").value = product.name
  document.getElementById("product-category").value = product.category
  document.getElementById("product-price").value = product.price
  document.getElementById("product-stock").value = product.stock
  document.getElementById("product-image").value = product.image
  document.getElementById("product-description").value = product.description

  // Afficher le formulaire
  document.getElementById("product-form").style.display = "block"

  // Faire défiler jusqu'au formulaire
  document.getElementById("product-form").scrollIntoView({ behavior: "smooth" })
}

function cancelProductForm() {
  // Cacher le formulaire
  document.getElementById("product-form").style.display = "none"
}

function saveProduct(event) {
  event.preventDefault()

  // Récupérer les informations du produit
  const productId = document.getElementById("product-id").value
  const name = document.getElementById("product-name").value
  const category = document.getElementById("product-category").value
  const price = Number.parseFloat(document.getElementById("product-price").value)
  const stock = Number.parseInt(document.getElementById("product-stock").value)
  let image = document.getElementById("product-image").value
  const description = document.getElementById("product-description").value

  // Utiliser une image par défaut si le champ est vide
  if (!image) {
    // Image par défaut selon la catégorie
    switch (category) {
      case "musculation":
        image =
          "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        break
      case "cardio":
        image =
          "https://images.unsplash.com/photo-1570829053985-56e661df1ca2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        break
      case "accessoires":
        image =
          "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        break
      case "nutrition":
        image =
          "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        break
      default:
        image =
          "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  }

  if (productId) {
    // Modifier un produit existant
    const productIndex = products.findIndex((p) => p.id === Number.parseInt(productId))

    if (productIndex !== -1) {
      products[productIndex] = {
        id: Number.parseInt(productId),
        name: name,
        category: category,
        price: price,
        stock: stock,
        image: image,
        description: description,
      }
    }
  } else {
    // Ajouter un nouveau produit
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      name: name,
      category: category,
      price: price,
      stock: stock,
      image: image,
      description: description,
    }

    products.push(newProduct)
  }

  // Mettre à jour l'affichage
  displayProductsList()
  displayProducts()

  // Cacher le formulaire
  document.getElementById("product-form").style.display = "none"

  // Afficher un message de confirmation
  alert(productId ? "Produit modifié avec succès!" : "Produit ajouté avec succès!")
}

function deleteProduct(productId) {
  if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
    return
  }

  // Supprimer le produit
  products = products.filter((p) => p.id !== productId)

  // Mettre à jour l'affichage
  displayProductsList()
  displayProducts()

  // Afficher un message de confirmation
  alert("Produit supprimé avec succès!")
}

function checkout() {
  // Vérifier si le panier est vide
  if (cart.length === 0) {
    alert("Votre panier est vide.")
    return
  }

  // Afficher le formulaire de commande
  document.getElementById("checkout-form").style.display = "block"
}

function placeOrder(event) {
  event.preventDefault()

  // Vérifier si le panier est vide
  if (cart.length === 0) {
    alert("Votre panier est vide.")
    return
  }

  // Récupérer les informations de livraison
  const name = document.getElementById("checkout-name").value
  const address = document.getElementById("checkout-address").value
  const city = document.getElementById("checkout-city").value
  const postalCode = document.getElementById("checkout-postal").value
  const phone = document.getElementById("checkout-phone").value

  // Calculer le total
  let total = 0
  const orderItems = []

  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.productId)

    if (product) {
      const itemTotal = product.price * item.quantity
      total += itemTotal

      // Mettre à jour le stock
      product.stock -= item.quantity

      // Ajouter l'article à la commande
      orderItems.push({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
        total: itemTotal,
      })
    }
  })

  // Créer la commande
  const order = {
    id: orders.length + 1,
    date: new Date().toISOString(),
    items: orderItems,
    total: total,
    shipping: {
      name: name,
      address: address,
      city: city,
      postalCode: postalCode,
      phone: phone,
    },
    status: "En cours",
  }

  // Ajouter la commande à la liste
  orders.push(order)

  // Vider le panier
  cart = []
  updateCartCount()

  // Mettre à jour l'affichage
  displayCart()

  // Afficher un message de confirmation
  alert("Votre commande a été passée avec succès !")

  // Naviguer vers la page d'accueil
  navigateTo("home")
}


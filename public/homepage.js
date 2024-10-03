document.addEventListener('DOMContentLoaded', function () {
    const productContainers = document.querySelectorAll('.pro');
    const productContainer = document.getElementById('product-container');

    productContainers.forEach(container => {
        const addToCartBtn = container.querySelector('.add-to-cart');
        const decrementBtn = container.querySelector('.decrement');
        const incrementBtn = container.querySelector('.increment');
        const quantityContainer = container.querySelector('.quantity-container');
        const quantityValue = container.querySelector('.quantity-value');

        let quantity = 0;

        addToCartBtn.addEventListener('click', function () {
            addToCartBtn.style.display = 'none';
            quantityContainer.style.display = 'flex';
            quantityValue.innerText = '1';
            quantity = 1;
        });

        decrementBtn.addEventListener('click', function () {
            if (quantity > 0) {
                quantity--;
                quantityValue.innerText = quantity.toString();
                if (quantity === 0) {
                    addToCartBtn.style.display = 'block';
                    quantityContainer.style.display = 'none';
                }
            }
        });

        incrementBtn.addEventListener('click', function () {
            quantity++;
            quantityValue.innerText = quantity.toString();
        });

        const addToCartButton = container.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', function () {
            // Update this part to perform the actual add-to-cart logic
            console.log('Adding to cart:', container.querySelector('span').innerText);
        });
    });

    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', function () {
        performSearch();
    });

    searchInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const allProducts = [
            // Products from homepage
            { name: 'Unruled Books', price:'₹60', image: 'https://m.media-amazon.com/images/I/A15njMWyVAL._AC_UL960_QL65_.jpg' },
            { name: 'A4 Sheets', price: '₹300', image: 'https://images-na.ssl-images-amazon.com/images/I/514mIR3UcaL.jpg' },
            { name: 'Blue Pen ', price: '₹10', image: 'https://vlebazaar.in/image/cache/catalog/-HAUSER-XO-Ball-Pen-Pack-of-50/-HAUSER-XO-Ball-Pen-Pack-of-50-1000x1000h.jpg' },
            {name:'Scale ruler', price:'₹35', image:'https://m.media-amazon.com/images/I/51HozeOSWJL.jpg'},
            {name: 'Blue Pen XO ', price: '₹10', image: 'https://m.media-amazon.com/images/I/51rwlwK+AZL._AC_UF350,350_QL80_.jpg' },
            {name: 'Book Unruled books ', price: '₹55', image: 'https://rukminim2.flixcart.com/image/850/1000/kfoapow0/diary-notebook/a/e/t/classmate-2000234-original-imafw2qhzg7a5yhz.jpeg?q=20&crop=false' },
            
            // Add more products from homepage as needed
            // Products from stationary.html
            // Add products from stationary.html here
            // Products from books.html
            // Add products from books.html here
        ];

        const searchResults = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );

        displaySearchResults(searchResults);
    }

    function displaySearchResults(results) {
        productContainer.innerHTML = '';

        if (results.length > 0) {
            results.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('pro');

                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="des">
                        <span>${product.name}</span>
                        <h5>${product.price}</h5>
                        <div class="star">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="cart-container">
                            <button class="add-to-cart">Add to Cart</button>
                            <div class="quantity-container">
                                <button class="decrement">-</button>
                                <span class="quantity-value">0</span>
                                <button class="increment">+</button>
                            </div>
                        </div>
                    </div>
                `;

                productContainer.appendChild(productElement);
            });
        } else {
            productContainer.innerHTML = '<p>No products found</p>';
        }
    }
});







$(document).ready(function () {
    // Set the interval for the slideshow
    setInterval(nextSlide, 3000);
});

function nextSlide() {
    // Shift the images-container to the left to show the next image
    var currentMargin = parseInt($(".images-container").css("margin-left"));
    var imageWidth = $(".images-container img").width();
    $(".images-container").animate(
        {
            marginLeft: currentMargin - imageWidth + "px",
        },
        1000,
        function () {
            // Move the first image to the end after transition
            $(".images-container img:first-child").appendTo(".images-container");
            // Reset margin-left to 0
            $(".images-container").css("margin-left", "0");
        }
    );
}





function smoothScroll(targetId) {
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add an event listener to the "Shop Now" button
document.querySelector('.shop-now-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior
    smoothScroll('product1'); // Smooth scroll to the target section
});





function addToCart(productData) {
    // Check if 'cart' key exists in localStorage
    let cartItems = localStorage.getItem('cart');

    // If 'cart' doesn't exist, create an empty array
    if (!cartItems) {
        cartItems = [];
    } else {
        // Parse the existing items from JSON
        cartItems = JSON.parse(cartItems);
    }

    // Add the new product to the cart array
    cartItems.push(productData);

    // Save the updated cart array back to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Event listener for the "Add to Cart" button
document.querySelectorAll('.add-to-cart').forEach(function (button) {
    button.addEventListener('click', function () {
        // Get product details from the clicked button's parent element
        const productContainer = button.closest('.pro');
        const productId = productContainer.getAttribute('data-product-id');
        const productName = productContainer.querySelector('span').innerText;
        const productPrice = productContainer.querySelector('h4').innerText;
        const quantity = parseInt(productContainer.querySelector('.quantity-value').innerText);

        // Create an object with product details
        const productData = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: quantity,
        };

        // Add the product to the cart
        addToCart(productData);

        // Optionally, you can provide user feedback, e.g., display a message
        alert('Product added to cart!');
    });
});
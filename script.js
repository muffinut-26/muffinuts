﻿const productCards = document.querySelectorAll('.product-card');
const categoryButtons = document.querySelectorAll('.categories li[data-category]');
const menuGroups = document.querySelectorAll('.menu-group');
const menuEmptyState = document.getElementById('menuEmptyState');
const productModal = document.getElementById('productModal');
const closeProductModal = document.getElementById('closeProductModal');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const modalProductImage = document.getElementById('modalProductImage');
const modalImageFrame = document.querySelector('.modal-image-small');
const addToCart = document.getElementById('addToCart');
const toggleDetailsButton = document.getElementById('toggleDetailsButton');
const modalDescriptionWrapper = document.getElementById('modalDescriptionWrapper');
const bundleChoicesWrapper = document.getElementById('bundleChoicesWrapper');
const cartButton = document.getElementById('cartButton');
const loginButton = document.getElementById('loginButton');
const profileButton = document.getElementById('profileButton');
const cartCount = document.getElementById('cartCount');
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
const siteHeader = document.querySelector('.site-header');
const navOverlay = document.getElementById('navOverlay');
const closeNav = document.getElementById('closeNav');
const cartBackdrop = document.getElementById('cartBackdrop');
const closeCart = document.getElementById('closeCart');

if (navToggle && mainNav && siteHeader) {
  const mobileNavQuery = window.matchMedia('(max-width: 768px)');

  const closeDrawer = () => {
    siteHeader.classList.remove('nav-open');
    if (navOverlay) {
      navOverlay.classList.add('hidden');
    }
    document.body.classList.remove('nav-drawer-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  const openDrawer = () => {
    if (!mobileNavQuery.matches) {
      return;
    }

    siteHeader.classList.add('nav-open');
    if (navOverlay) {
      navOverlay.classList.remove('hidden');
    }
    document.body.classList.add('nav-drawer-open');
    navToggle.setAttribute('aria-expanded', 'true');
  };

  navToggle.addEventListener('click', () => {
    if (siteHeader.classList.contains('nav-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (navOverlay) {
    navOverlay.addEventListener('click', closeDrawer);
  }

  if (closeNav) {
    closeNav.addEventListener('click', closeDrawer);
  }

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  mobileNavQuery.addEventListener('change', (event) => {
    if (!event.matches) {
      closeDrawer();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && siteHeader.classList.contains('nav-open')) {
      closeDrawer();
    }
  });
}
const cartItemsContainer = document.getElementById('cartItems');
const promoInput = document.getElementById('promoInput');
const applyPromoButton = document.getElementById('applyPromoButton');
const promoMessage = document.getElementById('promoMessage');
const paymentSelect = document.getElementById('paymentSelect');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartDiscount = document.getElementById('cartDiscount');
const cartTotal = document.getElementById('cartTotal');
const checkoutButton = document.getElementById('checkoutButton');
const feedbackForm = document.getElementById('feedbackForm');
const toastNotification = document.getElementById('toastNotification');
const toastTitle = document.getElementById('toastTitle');
const toastMessage = document.getElementById('toastMessage');
const pickupName = document.getElementById('pickupName');
const pickupPhone = document.getElementById('pickupPhone');
const pickupTime = document.getElementById('pickupTime');
const deliveryName = document.getElementById('deliveryName');
const deliveryPhone = document.getElementById('deliveryPhone');
const deliveryAddress = document.getElementById('deliveryAddress');
const pickupDetails = document.getElementById('pickupDetails');
const deliveryDetails = document.getElementById('deliveryDetails');
const customerRow = document.getElementById('customerRow');
const customerSummary = document.getElementById('customerSummary');
const serviceOptions = document.querySelectorAll('.service-option');
const orderModeButtons = document.querySelectorAll('.order-mode-button');
const authBackdrop = document.getElementById('authBackdrop');
const closeAuth = document.getElementById('closeAuth');
const authChoiceStep = document.getElementById('authChoiceStep');
const mobileStep = document.getElementById('mobileStep');
const emailStep = document.getElementById('emailStep');
const registerStep = document.getElementById('registerStep');
const authTitle = document.getElementById('authTitle');
const authMobile = document.getElementById('authMobile');
const continueMobileButton = document.getElementById('continueMobileButton');
const authEmail = document.getElementById('authEmail');
const continueEmailButton = document.getElementById('continueEmailButton');
const showMobileLogin = document.getElementById('showMobileLogin');
const showEmailLogin = document.getElementById('showEmailLogin');
const showRegisterButton = document.getElementById('showRegisterButton');
const registerName = document.getElementById('registerName');
const registerMobile = document.getElementById('registerMobile');
const registerEmail = document.getElementById('registerEmail');
const registerAddress = document.getElementById('registerAddress');
const ordersCustomerTitle = document.getElementById('ordersCustomerTitle');
const ordersList = document.getElementById('ordersList');
const loadOrdersButton = document.getElementById('loadOrdersButton');
const profileBackdrop = document.getElementById('profileBackdrop');
const closeProfile = document.getElementById('closeProfile');
const profileAvatar = document.getElementById('profileAvatar');
const profileName = document.getElementById('profileName');
const profileStatus = document.getElementById('profileStatus');
const profileMobile = document.getElementById('profileMobile');
const profileEmail = document.getElementById('profileEmail');
const profileAddress = document.getElementById('profileAddress');
const profileOrders = document.getElementById('profileOrders');
const profileOrdersButton = document.getElementById('profileOrdersButton');

let cart = [];
let activePromo = null;
let selectedProduct = null;
let currentCategory = 'all';
let currentOrderMode = 'pickup';
let currentCustomer = null;
let authIntent = 'login';

const customerStorageKey = 'muffinutCustomers';
const ordersStorageKey = 'muffinutOrders';

const priceRange = document.querySelector('.filter input[type="range"]');
const minPriceSpan = document.getElementById('minPrice');
const maxPriceSpan = document.getElementById('maxPrice');

const bundleOptions = {
  premium: [
    'Sunlit Cradle Coco Muffin (Cheese)',
    'Golden Ember Coco Muffin (Cheesy Bacon)',
  ],
  classic: [
    'Ivory Coco Muffin (Original)',
    'Midnight Coco Muffin (Chocolate)',
    'Lavender Coco Muffin (Ube)',
  ],
  mylk: [
    'Midas Mylk (Original)',
    'Ebon Bliss (Chocolate)',
    'Zen Matcha (Matcha)',
  ],
};

const bundleChoiceLabels = {
  premium: 'Premium Muffins',
  classic: 'Classic Muffins',
  mylk: 'Mylk Flavors',
};

const bundleUpgradePrice = 15;

function formatPrice(value) {
  return `₱${value.toFixed(0)}`;
}

function parsePrice(price) {
  return Number(price.replace(/[^\d.]/g, '')) || 0;
}

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function normalizeMobile(value) {
  return value.replace(/\D/g, '');
}

function normalizeEmail(value) {
  return value.trim().toLowerCase();
}

function getCustomers() {
  try {
    return JSON.parse(localStorage.getItem(customerStorageKey)) || {};
  } catch (error) {
    return {};
  }
}

function saveCustomer(customer) {
  const customers = getCustomers();
  customers[customer.mobile] = customer;
  localStorage.setItem(customerStorageKey, JSON.stringify(customers));
}

function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(ordersStorageKey)) || [];
  } catch (error) {
    return [];
  }
}

function saveOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(ordersStorageKey, JSON.stringify(orders));
}

function renderOrders() {
  if (!currentCustomer) {
    ordersCustomerTitle.textContent = 'No customer selected';
    ordersList.innerHTML = '<p class="empty-cart">Enter your mobile number from Pick Up or Delivery to see your orders.</p>';
    return;
  }

  const customerOrders = getOrders().filter((order) => order.mobile === currentCustomer.mobile);
  ordersCustomerTitle.textContent = `${currentCustomer.name}'s Orders`;

  if (!customerOrders.length) {
    ordersList.innerHTML = '<p class="empty-cart">No orders yet. Add items to your cart and checkout first.</p>';
    return;
  }

  ordersList.innerHTML = customerOrders.map((order) => `
    <article class="order-history-card">
      <div class="order-history-head">
        <span>${escapeHTML(order.type)}</span>
        <span>${escapeHTML(order.total)}</span>
      </div>
      <p class="order-history-meta">${escapeHTML(order.date)} · ${escapeHTML(order.method)} · ${escapeHTML(order.status)}</p>
      <p class="order-history-meta">${escapeHTML(order.detail)}</p>
      <p class="order-history-items">${order.items.map((item) => `${escapeHTML(item.qty)}x ${escapeHTML(item.name)}`).join('<br>')}</p>
    </article>
  `).join('');
}

function updateProfilePanel() {
  if (!currentCustomer) {
    return;
  }

  const orderCount = getOrders().filter((order) => order.mobile === currentCustomer.mobile).length;
  profileAvatar.textContent = currentCustomer.name ? currentCustomer.name.charAt(0).toUpperCase() : 'M';
  profileName.textContent = currentCustomer.name || 'Customer';
  profileStatus.textContent = 'Logged in customer';
  profileMobile.textContent = currentCustomer.mobile || '-';
  profileEmail.textContent = currentCustomer.email || '-';
  profileAddress.textContent = currentCustomer.address || 'No saved address';
  profileOrders.textContent = orderCount;
}

function findCustomer(mobile) {
  return getCustomers()[normalizeMobile(mobile)] || null;
}

function findCustomerByEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  return Object.values(getCustomers()).find((customer) => normalizeEmail(customer.email || '') === normalizedEmail) || null;
}

function setCurrentCustomer(customer) {
  currentCustomer = customer;
  pickupName.value = customer.name;
  pickupPhone.value = customer.mobile;
  deliveryName.value = customer.name;
  deliveryPhone.value = customer.mobile;
  deliveryAddress.value = customer.address || '';
  customerSummary.textContent = `${customer.name} · ${customer.mobile}${customer.email ? ` · ${customer.email}` : ''}`;
  loginButton.classList.add('hidden');
  profileButton.classList.remove('hidden');
  updateProfilePanel();
  customerRow.classList.remove('hidden');
  renderOrders();
}

function setOrderMode(mode) {
  currentOrderMode = mode;
  serviceOptions.forEach((button) => {
    button.classList.toggle('active', button.dataset.cartMode === mode);
  });
  pickupDetails.classList.toggle('hidden', mode !== 'pickup');
  deliveryDetails.classList.toggle('hidden', mode !== 'delivery');
}

function openAuth(mode) {
  setOrderMode(mode);
  authIntent = 'order';
  authTitle.textContent = mode === 'delivery' ? 'Continue Delivery' : 'Continue Pick Up';
  registerAddress.required = mode === 'delivery';
  registerAddress.placeholder = mode === 'delivery' ? 'Required for delivery' : 'Optional for pickup';
  authMobile.value = '';
  authEmail.value = '';
  authChoiceStep.classList.remove('hidden');
  mobileStep.classList.add('hidden');
  emailStep.classList.add('hidden');
  registerStep.classList.add('hidden');
  authBackdrop.classList.remove('hidden');
}

function openLogin() {
  authIntent = 'login';
  registerAddress.required = false;
  registerAddress.placeholder = 'Optional';
  authMobile.value = '';
  authEmail.value = '';
  authChoiceStep.classList.remove('hidden');
  mobileStep.classList.add('hidden');
  emailStep.classList.add('hidden');
  registerStep.classList.add('hidden');
  authBackdrop.classList.remove('hidden');
}

function closeAuthModal() {
  authBackdrop.classList.add('hidden');
}

function openCartForMode(mode) {
  setOrderMode(mode);
  cartBackdrop.classList.remove('hidden');
  renderCart();
}

function showPersonalInfoForm(customer = {}) {
  registerName.value = customer.name || '';
  registerMobile.value = customer.mobile || '';
  registerEmail.value = customer.email || '';
  registerAddress.value = customer.address || '';
  authChoiceStep.classList.add('hidden');
  mobileStep.classList.add('hidden');
  emailStep.classList.add('hidden');
  registerStep.classList.remove('hidden');
  registerName.focus();
}

function startOrderFlow(mode) {
  if (currentCustomer) {
    openCartForMode(mode);
    return;
  }

  openAuth(mode);
}

function createOptionMarkup(options) {
  return options.map((option) => `<option value="${escapeHTML(option)}">${escapeHTML(option)}</option>`).join('');
}

function getBundleConfig(card) {
  if (card.dataset.bundle !== 'true') {
    return null;
  }

  return {
    premium: Number(card.dataset.premiumCount) || 0,
    classic: Number(card.dataset.classicCount) || 0,
    mylk: Number(card.dataset.mylkCount) || 0,
  };
}

function renderChoiceGroup(type, count) {
  if (!count) {
    return '';
  }

  const fields = Array.from({ length: count }, (_, index) => {
    const upgradeControl = type === 'classic' ? `
      <div class="upgrade-field">
        <input type="checkbox" class="bundle-upgrade-checkbox" data-choice-index="${index}" id="upgrade-${type}-${index}" />
        <label for="upgrade-${type}-${index}">Upgrade to Premium +₱${bundleUpgradePrice}</label>
      </div>
    ` : '';

    return `
      <div class="choice-field">
        <span>${type === 'mylk' ? 'Mylk' : 'Choice'} ${index + 1}</span>
        <select class="bundle-choice-select" data-choice-type="${type}" data-choice-index="${index}">
          ${createOptionMarkup(bundleOptions[type])}
        </select>
        ${upgradeControl}
      </div>
    `;
  }).join('');

  return `
    <div class="bundle-choice-section" data-group-type="${type}">
      <h3>${bundleChoiceLabels[type]}</h3>
      <div class="bundle-choice-grid">${fields}</div>
    </div>
  `;
}

function renderBundleChoices(bundleConfig) {
  if (!bundleConfig) {
    bundleChoicesWrapper.innerHTML = '';
    bundleChoicesWrapper.classList.add('hidden');
    return;
  }

  bundleChoicesWrapper.innerHTML = `
    <p class="bundle-choice-title">Choose Your Bundle Items</p>
    <p class="bundle-upgrade-summary hidden" id="bundleUpgradeSummary"></p>
    ${renderChoiceGroup('premium', bundleConfig.premium)}
    ${renderChoiceGroup('classic', bundleConfig.classic)}
    ${renderChoiceGroup('mylk', bundleConfig.mylk)}
  `;
  bundleChoicesWrapper.classList.remove('hidden');
}

function collectBundleChoices() {
  const groupedChoices = {
    premium: [],
    classic: [],
    mylk: [],
  };
  let upgradeCount = 0;

  bundleChoicesWrapper.querySelectorAll('.bundle-choice-select').forEach((select) => {
    const type = select.dataset.choiceType;
    const index = select.dataset.choiceIndex;
    const choiceValue = select.value;
    const upgradeCheckbox = select.closest('.choice-field') ? select.closest('.choice-field').querySelector('.bundle-upgrade-checkbox') : null;

    if (type === 'classic') {
      if (upgradeCheckbox?.checked) {
        // upgraded classics will be represented by premium selects elsewhere
        return;
      }
      groupedChoices.classic.push(choiceValue);
    } else if (type === 'premium') {
      groupedChoices.premium.push(choiceValue);
    } else {
      groupedChoices.mylk.push(choiceValue);
    }
  });

  // count checked upgrade boxes
  upgradeCount = bundleChoicesWrapper.querySelectorAll('.bundle-upgrade-checkbox:checked').length;

  return {
    details: Object.entries(groupedChoices)
      .filter(([, choices]) => choices.length)
      .map(([type, choices]) => `${bundleChoiceLabels[type]}: ${choices.join(', ')}`),
    upgradeCount,
  };
}

function updateBundleUpgradePreview() {
  const data = collectBundleChoices();
  const summaryElement = bundleChoicesWrapper.querySelector('#bundleUpgradeSummary');
  const basePrice = selectedProduct ? selectedProduct.price : 0;
  const upgradeTotal = data.upgradeCount * bundleUpgradePrice;

  if (summaryElement) {
    if (data.upgradeCount > 0) {
      summaryElement.textContent = `Added upgrade: +₱${upgradeTotal} (${data.upgradeCount} classic muffin${data.upgradeCount > 1 ? 's' : ''} upgraded)`;
      summaryElement.classList.remove('hidden');
    } else {
      summaryElement.textContent = '';
      summaryElement.classList.add('hidden');
    }
  }

  if (selectedProduct) {
    modalPrice.textContent = formatPrice(basePrice + upgradeTotal);
  }
}

function openProductModal(name, price, description, imageSrc, bundleConfig = null, category = '') {
  selectedProduct = {
    name,
    price: parsePrice(price),
    description,
    imageSrc,
    bundleConfig,
    category,
  };

  modalTitle.textContent = name;
  modalPrice.textContent = price;
  modalDescription.textContent = description;
  if (imageSrc) {
    modalProductImage.src = imageSrc;
    modalImageFrame.classList.remove('hidden');
  } else {
    modalProductImage.removeAttribute('src');
    modalImageFrame.classList.add('hidden');
  }
  const shouldShowDescription = category === 'mix-match' || category === 'bundles';
  modalDescriptionWrapper.classList.toggle('hidden', !shouldShowDescription);
  toggleDetailsButton.classList.toggle('hidden', shouldShowDescription);
  toggleDetailsButton.textContent = 'View More Details';
  renderBundleChoices(bundleConfig);
  updateBundleUpgradePreview();
  productModal.classList.remove('hidden');
}

bundleChoicesWrapper.addEventListener('change', (event) => {
  if (event.target.matches('.bundle-upgrade-checkbox')) {
    const checkbox = event.target;
    const choiceField = checkbox.closest('.choice-field');
    const select = choiceField ? choiceField.querySelector('.bundle-choice-select') : null;

    if (!select) return;

    if (checkbox.checked) {
      // save current classic selection so we can restore it
      select.dataset._classicValue = select.value;
      // switch options in-place to premium choices
      select.innerHTML = createOptionMarkup(bundleOptions.premium);
      select.dataset.choiceType = 'premium';
      choiceField.classList.add('upgraded');
    } else {
      // restore classic options in-place
      select.innerHTML = createOptionMarkup(bundleOptions.classic);
      select.dataset.choiceType = 'classic';
      if (select.dataset._classicValue) select.value = select.dataset._classicValue;
      choiceField.classList.remove('upgraded');
    }

    updateBundleUpgradePreview();
  }
});

function closeModal() {
  productModal.classList.add('hidden');
  bundleChoicesWrapper.classList.add('hidden');
}

toggleDetailsButton.addEventListener('click', () => {
  const isHidden = modalDescriptionWrapper.classList.toggle('hidden');
  toggleDetailsButton.textContent = isHidden ? 'View More Details' : 'Hide Details';
});

function showToast(title, message, duration = 3000) {
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  toastNotification.classList.remove('hidden');

  setTimeout(() => {
    toastNotification.classList.add('hidden');
  }, duration);
}

function filterProducts(category, maxPrice = null) {
  let visibleCount = 0;

  productCards.forEach((card) => {
    const cardPrice = parsePrice(card.dataset.price);
    const categoryMatch = category === 'all' || card.dataset.category === category;
    const priceMatch = maxPrice === null || cardPrice <= maxPrice;
    const isVisible = categoryMatch && priceMatch;
    card.style.display = isVisible ? '' : 'none';

    if (isVisible) {
      visibleCount += 1;
    }
  });

  menuGroups.forEach((group) => {
    const groupCategory = group.dataset.menuGroup;
    const groupMatchesCategory = category === 'all' || category === groupCategory;
    const hasVisibleCards = Array.from(group.querySelectorAll('.product-card')).some((card) => card.style.display !== 'none');
    group.style.display = groupMatchesCategory && hasVisibleCards ? '' : 'none';
  });

  if (menuEmptyState) {
    menuEmptyState.classList.toggle('hidden', visibleCount > 0);
  }
}

function updateCartCount() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalQuantity;
}

function calculateCartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = activePromo ? Math.round(subtotal * activePromo.percent / 100) : 0;
  const total = Math.max(subtotal - discount, 0);

  cartSubtotal.textContent = formatPrice(subtotal);
  cartDiscount.textContent = `-${formatPrice(discount)}`;
  cartTotal.textContent = formatPrice(total);
}

function renderCart() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty. Add something delicious!</p>';
  } else {
    cartItemsContainer.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        ${item.imageSrc ? `<img src="${escapeHTML(item.imageSrc)}" alt="${escapeHTML(item.name)}" />` : '<div class="cart-item-placeholder">Box</div>'}
        <div class="cart-item-info">
          <h4>${escapeHTML(item.name)}</h4>
          <p>${formatPrice(item.price)} each</p>
          ${item.details ? `<p class="cart-item-details">${escapeHTML(item.details)}</p>` : ''}
          <div class="qty-control">
            <button class="qty-btn" data-index="${index}" data-action="decrease">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
          </div>
        </div>
        <div class="cart-item-actions">
          <span>${formatPrice(item.price * item.qty)}</span>
          <button class="remove-item" data-index="${index}">Remove</button>
        </div>
      </div>
    `).join('');
  }

  updateCartCount();
  calculateCartTotals();
}

cartItemsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-item')) {
    const itemIndex = Number(event.target.dataset.index);
    const removedItem = cart[itemIndex];
    cart.splice(itemIndex, 1);
    renderCart();
    showToast('Removed', `${removedItem.name} removed from cart.`);
    return;
  }

  if (event.target.classList.contains('qty-btn')) {
    const itemIndex = Number(event.target.dataset.index);
    const action = event.target.dataset.action;
    const item = cart[itemIndex];

    if (!item) return;

    if (action === 'increase') {
      item.qty += 1;
    } else if (action === 'decrease') {
      item.qty -= 1;
      if (item.qty <= 0) {
        cart.splice(itemIndex, 1);
      }
    }

    renderCart();
    return;
  }
});

function applyPromoCode() {
  const code = promoInput.value.trim().toUpperCase();

  if (!code) {
    promoMessage.textContent = 'Enter a promo code to save.';
    activePromo = null;
  } else if (code === 'MUFFI10') {
    activePromo = { code, percent: 10 };
    promoMessage.textContent = 'Promo applied: 10% off your order.';
  } else if (code === 'SWEET5') {
    activePromo = { code, percent: 5 };
    promoMessage.textContent = 'Promo applied: 5% off your order.';
  } else {
    promoMessage.textContent = 'Invalid promo code. Try MUFFI10 or SWEET5.';
    activePromo = null;
  }

  calculateCartTotals();
}

function addToCartItem() {
  if (!selectedProduct) {
    return;
  }

  const bundleChoiceData = selectedProduct.bundleConfig ? collectBundleChoices() : { details: [], upgradeCount: 0 };
  const details = bundleChoiceData.details.join('; ');
  const upgradeTotal = bundleChoiceData.upgradeCount * bundleUpgradePrice;
  const itemPrice = selectedProduct.price + upgradeTotal;
  const productToAdd = {
    ...selectedProduct,
    price: itemPrice,
    details,
    id: details ? `${selectedProduct.name}|${details}|upgrades=${bundleChoiceData.upgradeCount}` : `${selectedProduct.name}|upgrades=${bundleChoiceData.upgradeCount}`,
  };
  const existing = cart.find((item) => item.id === productToAdd.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...productToAdd, qty: 1 });
  }

  showToast('Added to Cart!', `${selectedProduct.name} added to cart.`);
  renderCart();
  closeModal();
}

productCards.forEach((card) => {
  card.addEventListener('click', () => {
    const name = card.dataset.name;
    const price = card.dataset.price;
    const description = card.dataset.desc;
    const category = card.dataset.category;
    const imageElement = card.querySelector('.product-image');
    const imageSrc = imageElement ? imageElement.src : '';
    openProductModal(name, price, description, imageSrc, getBundleConfig(card), category);
  });
});

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    categoryButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    currentCategory = button.dataset.category;
    filterProducts(currentCategory, parseInt(priceRange.value));
  });
});

maxPriceSpan.textContent = `₱${priceRange.value}`;

priceRange.addEventListener('input', () => {
  maxPriceSpan.textContent = `₱${priceRange.value}`;
  filterProducts(currentCategory, parseInt(priceRange.value));
});

closeProductModal.addEventListener('click', closeModal);
productModal.addEventListener('click', (event) => {
  if (event.target === productModal) {
    closeModal();
  }
});

cartButton.addEventListener('click', () => {
  if (!currentCustomer) {
    openAuth(currentOrderMode);
    return;
  }

  openCartForMode(currentOrderMode);
});

loginButton.addEventListener('click', openLogin);

profileButton.addEventListener('click', () => {
  if (!currentCustomer) {
    openLogin();
    return;
  }

  updateProfilePanel();
  profileBackdrop.classList.remove('hidden');
});

closeProfile.addEventListener('click', () => {
  profileBackdrop.classList.add('hidden');
});

profileBackdrop.addEventListener('click', (event) => {
  if (event.target === profileBackdrop) {
    profileBackdrop.classList.add('hidden');
  }
});

profileOrdersButton.addEventListener('click', () => {
  profileBackdrop.classList.add('hidden');
  renderOrders();
  document.getElementById('orders').scrollIntoView({ behavior: 'smooth' });
});

showMobileLogin.addEventListener('click', () => {
  authChoiceStep.classList.add('hidden');
  emailStep.classList.add('hidden');
  registerStep.classList.add('hidden');
  mobileStep.classList.remove('hidden');
  authMobile.focus();
});

showEmailLogin.addEventListener('click', () => {
  authChoiceStep.classList.add('hidden');
  mobileStep.classList.add('hidden');
  registerStep.classList.add('hidden');
  emailStep.classList.remove('hidden');
  authEmail.focus();
});

showRegisterButton.addEventListener('click', () => {
  showPersonalInfoForm();
});

orderModeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    startOrderFlow(button.dataset.orderMode);
  });
});

serviceOptions.forEach((button) => {
  button.addEventListener('click', () => {
    const mode = button.dataset.cartMode;
    if (!currentCustomer) {
      openAuth(mode);
      return;
    }

    setOrderMode(mode);
  });
});

closeAuth.addEventListener('click', closeAuthModal);

authBackdrop.addEventListener('click', (event) => {
  if (event.target === authBackdrop) {
    closeAuthModal();
  }
});

continueMobileButton.addEventListener('click', () => {
  const mobile = normalizeMobile(authMobile.value);

  if (!mobile) {
    showToast('Mobile Required', 'Please enter your mobile number.');
    return;
  }

  const existingCustomer = findCustomer(mobile);
  if (existingCustomer) {
    showPersonalInfoForm(existingCustomer);
    return;
  }

  showPersonalInfoForm({ mobile });
});

continueEmailButton.addEventListener('click', () => {
  const email = normalizeEmail(authEmail.value);

  if (!email) {
    showToast('Email Required', 'Please enter your email address.');
    return;
  }

  const existingCustomer = findCustomerByEmail(email);
  if (existingCustomer) {
    showPersonalInfoForm(existingCustomer);
    return;
  }

  showPersonalInfoForm({ email });
});

registerStep.addEventListener('submit', (event) => {
  event.preventDefault();
  const mobile = normalizeMobile(registerMobile.value);
  const email = normalizeEmail(registerEmail.value);
  const name = registerName.value.trim();
  const address = registerAddress.value.trim();

  if (!name || !mobile) {
    showToast('Missing Details', 'Please enter your name and mobile number.');
    return;
  }

  if (currentOrderMode === 'delivery' && !address) {
    showToast('Address Required', 'Please enter your delivery address.');
    return;
  }

  const customer = { name, mobile, email, address };
  saveCustomer(customer);
  setCurrentCustomer(customer);
  closeAuthModal();
  if (authIntent === 'order') {
    openCartForMode(currentOrderMode);
  }
  showToast('Details Saved', `${name}, your customer information is ready.`);
});

closeCart.addEventListener('click', () => {
  cartBackdrop.classList.add('hidden');
});

cartBackdrop.addEventListener('click', (event) => {
  if (!event.target.closest('.cart-panel')) {
    cartBackdrop.classList.add('hidden');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
    cartBackdrop.classList.add('hidden');
    authBackdrop.classList.add('hidden');
    profileBackdrop.classList.add('hidden');
  }
});

addToCart.addEventListener('click', addToCartItem);

applyPromoButton.addEventListener('click', (event) => {
  event.preventDefault();
  applyPromoCode();
});

loadOrdersButton.addEventListener('click', () => {
  if (!currentCustomer) {
    openAuth(currentOrderMode);
    showToast('Account Needed', 'Enter your mobile number to check your orders.');
    return;
  }

  renderOrders();
});

checkoutButton.addEventListener('click', () => {
  if (cart.length === 0) {
    showToast('Cart Empty', 'Add an item before checking out.');
    return;
  }

  if (!currentCustomer) {
    openAuth(currentOrderMode);
    showToast('Account Needed', 'Please enter your mobile number before checkout.');
    return;
  }

  const method = paymentSelect.value;
  const total = cartTotal.textContent;
  const orderedItems = cart.map((item) => ({
    name: item.name,
    qty: item.qty,
    price: item.price,
  }));
  let orderType = 'Pick Up';
  let orderDetail = '';

  if (currentOrderMode === 'pickup') {
    const customerName = pickupName.value.trim();
    const customerPhone = normalizeMobile(pickupPhone.value);
    const requestedPickupTime = pickupTime.value;

    if (!customerName || !customerPhone || !requestedPickupTime) {
      showToast('Pickup Details Needed', 'Please enter your name, phone, and pickup time.');
      return;
    }

    currentCustomer = {
      ...currentCustomer,
      name: customerName,
      mobile: customerPhone,
    };
    saveCustomer(currentCustomer);
    orderType = 'Pick Up';
    orderDetail = `Pickup at Maysan Road, Valenzuela City · ${requestedPickupTime}`;
    showToast('Pickup Order Ready', `${customerName}, your ${total} order is set for pickup at ${requestedPickupTime}. Payment: ${method}.`);
  } else {
    const customerName = deliveryName.value.trim();
    const customerPhone = normalizeMobile(deliveryPhone.value);
    const address = deliveryAddress.value.trim();

    if (!customerName || !customerPhone || !address) {
      showToast('Delivery Details Needed', 'Please enter your name, phone, and delivery address.');
      return;
    }

    currentCustomer = {
      ...currentCustomer,
      name: customerName,
      mobile: customerPhone,
      address,
    };
    saveCustomer(currentCustomer);
    orderType = 'Delivery';
    orderDetail = `Deliver to ${address}`;
    showToast('Delivery Order Ready', `${customerName}, your ${total} order will be delivered after confirmation. Payment: ${method}.`);
  }

  saveOrder({
    id: `MF-${Date.now()}`,
    mobile: currentCustomer.mobile,
    name: currentCustomer.name,
    type: orderType,
    detail: orderDetail,
    total,
    method,
    status: 'Pending confirmation',
    date: new Date().toLocaleString(),
    items: orderedItems,
  });
  setCurrentCustomer(currentCustomer);
  renderOrders();
  updateProfilePanel();
  cart = [];
  activePromo = null;
  promoInput.value = '';
  pickupTime.value = '';
  promoMessage.textContent = 'Use MUFFI10 for 10% off.';
  renderCart();
  cartBackdrop.classList.add('hidden');
});

feedbackForm.addEventListener('submit', (event) => {
  event.preventDefault();
  showToast('Thanks!', 'We appreciate your feedback. Thank you!');
  feedbackForm.reset();
});

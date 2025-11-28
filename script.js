// DOM Elements
const loginPage = document.getElementById('loginPage');
const pinPage = document.getElementById('pinPage');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const pinKeys = document.querySelectorAll('.pin-key');
const notification = document.getElementById('notification');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const cardDetailsModal = document.getElementById('cardDetailsModal');
const errorModal = document.getElementById('errorModal');
const closeModals = document.querySelectorAll('.close-modal');
const showCardDetails = document.getElementById('showCardDetails');

// PIN Elements
const pinDots = document.querySelectorAll('.pin-dot');

// Section elements
const balanceOverview = document.getElementById('balanceOverview');
const accountInfo = document.getElementById('accountInfo');
const transferSection = document.getElementById('transferSection');
const depositSection = document.getElementById('depositSection');
const billsSection = document.getElementById('billsSection');
const withdrawSection = document.getElementById('withdrawSection');
const contentSections = document.querySelectorAll('.content-section');

// Button elements
const transferAction = document.getElementById('transferAction');
const depositAction = document.getElementById('depositAction');
const billsAction = document.getElementById('billsAction');
const withdrawAction = document.getElementById('withdrawAction');
const flightAction = document.getElementById('flightAction');
const cryptoAction = document.getElementById('cryptoAction');
const supportAction = document.getElementById('supportAction');
const accountAction = document.getElementById('accountAction');
const backToDashboard = document.getElementById('backToDashboard');
const backFromTransfer = document.getElementById('backFromTransfer');
const backFromDeposit = document.getElementById('backFromDeposit');
const backFromBills = document.getElementById('backFromBills');
const backFromWithdraw = document.getElementById('backFromWithdraw');

// Sidebar navigation
const sidebarItems = document.querySelectorAll('.sidebar-item');
const sidebarLogout = document.getElementById('sidebarLogout');

// Transfer type buttons
const transferTypeBtns = document.querySelectorAll('.transfer-type-btn');
const transferOptions = document.querySelectorAll('.transfer-option');

// Withdraw step elements
const withdrawStep1 = document.getElementById('withdrawStep1');
const withdrawStep2 = document.getElementById('withdrawStep2');
const nextToStep2 = document.getElementById('nextToStep2');
const methodOptions = document.querySelectorAll('.method-option');
const bankDetails = document.getElementById('bankDetails');
const cardDetails = document.getElementById('cardDetails');
const selectedMethod = document.getElementById('selectedMethod');
const prevStepButtons = document.querySelectorAll('.prev-step');

// Copy buttons
const copyButtons = document.querySelectorAll('.copy-btn');

// Valid credentials
const validEmail = "Priscaleo488@gmail.com";
const validPassword = "Prisca4321";
const validPin = "4321";

// PIN state
let currentPin = '';

// Initialize the application
function initApp() {
    console.log('Initializing Key Trust Bank App...');
    
    const emailInput = document.getElementById('email');
    if (emailInput) emailInput.focus();

    // Check stored login states
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const pinVerified = localStorage.getItem('pinVerified') === 'true';

    if (isLoggedIn && pinVerified) {
        loginPage.style.display = 'none';
        pinPage.style.display = 'none';
        dashboard.style.display = 'block';
        initializeDashboard();
    } else if (isLoggedIn) {
        loginPage.style.display = 'none';
        pinPage.style.display = 'flex';
        dashboard.style.display = 'none';
    } else {
        loginPage.style.display = 'flex';
        pinPage.style.display = 'none';
        dashboard.style.display = 'none';
    }

    initEventListeners();
    console.log('App initialized successfully');
}

// Initialize all event listeners
function initEventListeners() {
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (togglePassword && passwordInput) togglePassword.addEventListener('click', togglePasswordVisibility);
    initPinKeypad();
    initNavigation();
    initModals();
    initTransferFeatures();
    initWithdrawFunctionality();
    initFormSubmissions();
    initCopyButtons();
}

// Toggle password visibility
function togglePasswordVisibility() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email === validEmail && password === validPassword) {
        showNotification("Login successful! Redirecting...", "success");

        // Save login state
        localStorage.setItem('isLoggedIn', 'true');

        setTimeout(() => {
            loginPage.style.display = 'none';
            pinPage.style.display = 'flex';
            dashboard.style.display = 'none';
            resetPin();
        }, 1500);
    } else {
        showNotification("Invalid email or password. Please try again.", "error");
    }
}

// Initialize PIN keypad
function initPinKeypad() {
    pinKeys.forEach(key => {
        key.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            handlePinKeyPress(value);
        });
    });
}

// Handle PIN keypad button presses
function handlePinKeyPress(value) {
    switch(value) {
        case 'clear':
            resetPin();
            break;
        case 'backspace':
            if (currentPin.length > 0) {
                currentPin = currentPin.slice(0, -1);
                updatePinDisplay();
            }
            break;
        default:
            if (currentPin.length < 4) {
                currentPin += value;
                updatePinDisplay();
                
                if (currentPin.length === 4) {
                    setTimeout(() => handlePinSubmission(), 300);
                }
            }
            break;
    }
}

// Update PIN display
function updatePinDisplay() {
    pinDots.forEach((dot, index) => {
        if (index < currentPin.length) dot.classList.add('filled');
        else dot.classList.remove('filled');
    });
}

// Reset PIN
function resetPin() {
    currentPin = '';
    updatePinDisplay();
}

// Handle PIN submission
function handlePinSubmission() {
    if (currentPin.length < 4) {
        showNotification("Please enter a complete 4-digit PIN", "error");
        return;
    }
    
    if (currentPin === validPin) {
        showNotification("PIN verified! Access granted.", "success");

        // Save PIN verified state
        localStorage.setItem('pinVerified', 'true');

        setTimeout(() => {
            pinPage.style.display = 'none';
            dashboard.style.display = 'block';
            initializeDashboard();
        }, 1500);
    } else {
        showNotification("Invalid PIN. Please try again.", "error");
        resetPin();
    }
}

// Navigation Functions
function initNavigation() {
    if (hamburgerMenu) hamburgerMenu.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    const dashboardLogo = document.getElementById('dashboardLogo');
    if (dashboardLogo) dashboardLogo.addEventListener('click', e => { e.preventDefault(); showSection('balanceOverview'); });

    if (transferAction) transferAction.addEventListener('click', () => showSection('transferSection'));
    if (depositAction) depositAction.addEventListener('click', () => showSection('depositSection'));
    if (billsAction) billsAction.addEventListener('click', () => showSection('billsSection'));
    if (withdrawAction) withdrawAction.addEventListener('click', () => showSection('withdrawSection'));
    if (accountAction) accountAction.addEventListener('click', () => showSection('accountInfo'));

    if (flightAction) flightAction.addEventListener('click', showErrorModal);
    if (cryptoAction) cryptoAction.addEventListener('click', showErrorModal);
    if (supportAction) supportAction.addEventListener('click', showErrorModal);

    if (backToDashboard) backToDashboard.addEventListener('click', () => showSection('balanceOverview'));
    if (backFromTransfer) backFromTransfer.addEventListener('click', () => showSection('balanceOverview'));
    if (backFromDeposit) backFromDeposit.addEventListener('click', () => showSection('balanceOverview'));
    if (backFromBills) backFromBills.addEventListener('click', () => showSection('balanceOverview'));
    if (backFromWithdraw) backFromWithdraw.addEventListener('click', () => showSection('balanceOverview'));

    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            if (sectionId) showSection(sectionId);
            else if (this.id === 'sidebarLogout') performLogout();
        });
    });
}

// Toggle sidebar
function toggleSidebar() { sidebar.classList.toggle('active'); overlay.classList.toggle('active'); }
function closeSidebar() { sidebar.classList.remove('active'); overlay.classList.remove('active'); }

// Show section
function showSection(sectionId) {
    const allSections = document.querySelectorAll('.content-section, .balance-overview');
    allSections.forEach(section => { section.style.display = 'none'; section.classList.remove('active'); });
    sidebarItems.forEach(item => item.classList.remove('active'));

    if (sectionId === 'withdrawSection') resetWithdrawSteps();

    if (sectionId === 'balanceOverview' && balanceOverview) {
        balanceOverview.style.display = 'block';
        balanceOverview.classList.add('active');
        const dashboardItem = document.querySelector('.sidebar-item[data-section="balanceOverview"]');
        if (dashboardItem) dashboardItem.classList.add('active');
    } else {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.classList.add('active');
            const sidebarItem = document.querySelector(`.sidebar-item[data-section="${sectionId}"]`);
            if (sidebarItem) sidebarItem.classList.add('active');
        }
    }

    if (window.innerWidth <= 992) closeSidebar();
}

// Initialize dashboard
function initializeDashboard() {
    const allSections = document.querySelectorAll('.content-section');
    allSections.forEach(section => section.style.display = 'none');
    if (balanceOverview) { balanceOverview.style.display = 'block'; balanceOverview.classList.add('active'); }
    const dashboardItem = document.querySelector('.sidebar-item[data-section="balanceOverview"]');
    if (dashboardItem) dashboardItem.classList.add('active');
}

// Modal Functions
function initModals() {
    closeModals.forEach(btn => btn.addEventListener('click', closeAllModals));
    window.addEventListener('click', e => { if (e.target === cardDetailsModal || e.target === errorModal) closeAllModals(); });
    if (showCardDetails) showCardDetails.addEventListener('click', () => cardDetailsModal.style.display = 'flex');
}
function closeAllModals() { cardDetailsModal.style.display = 'none'; errorModal.style.display = 'none'; }
function showErrorModal() { errorModal.style.display = 'flex'; }

// Transfer Features
function initTransferFeatures() {
    transferTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            switchTransferType(type);
        });
    });
}
function switchTransferType(type) {
    transferTypeBtns.forEach(btn => btn.classList.remove('active'));
    transferTypeBtns.forEach(btn => { if (btn.getAttribute('data-type') === type) btn.classList.add('active'); });
    transferOptions.forEach(option => { option.classList.remove('active'); if (option.id === type + 'Transfer') option.classList.add('active'); });
}

// Withdraw Functionality
function initWithdrawFunctionality() {
    methodOptions.forEach(option => option.addEventListener('click', function() {
        methodOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        nextToStep2.disabled = false;
    }));

    if (nextToStep2) nextToStep2.addEventListener('click', function() {
        const selectedOption = document.querySelector('.method-option.selected');
        if (selectedOption) {
            const method = selectedOption.getAttribute('data-method');
            selectedMethod.value = method === 'bank' ? 'Bank Transfer' : 'Card Withdrawal';
            if (method === 'bank') { bankDetails.classList.add('active'); cardDetails.classList.remove('active'); }
            else { cardDetails.classList.add('active'); bankDetails.classList.remove('active'); }
            withdrawStep1.classList.remove('active'); withdrawStep2.classList.add('active');
        }
    });

    prevStepButtons.forEach(button => button.addEventListener('click', function() {
        withdrawStep2.classList.remove('active'); withdrawStep1.classList.add('active');
    }));
}
function resetWithdrawSteps() {
    if (withdrawStep1 && withdrawStep2) { withdrawStep1.classList.add('active'); withdrawStep2.classList.remove('active'); }
    methodOptions.forEach(option => option.classList.remove('selected'));
    if (nextToStep2) nextToStep2.disabled = true;
    if (bankDetails) bankDetails.classList.remove('active');
    if (cardDetails) cardDetails.classList.remove('active');
    const withdrawForm = document.getElementById('withdrawForm'); if (withdrawForm) withdrawForm.reset();
}

// Form submissions
function initFormSubmissions() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        if (form.id !== "loginForm") {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                if (validateForm(this)) showErrorModal();
            });
        }
    });
}
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    inputs.forEach(input => { if (!input.value.trim()) { isValid = false; input.style.borderColor = 'var(--error)'; } else { input.style.borderColor = ''; } });
    if (!isValid) showNotification("Please fill in all required fields", "error");
    return isValid;
}

// Copy buttons
function initCopyButtons() {
    copyButtons.forEach(btn => btn.addEventListener('click', function() {
        const valueToCopy = this.parentElement.querySelector('.detail-value').textContent;
        copyToClipboard(valueToCopy);
    }));
}
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => { showNotification("Copied to clipboard!", "success"); })
    .catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = text; document.body.appendChild(textArea); textArea.select();
        try { document.execCommand('copy'); showNotification("Copied to clipboard!", "success"); } 
        catch (err) { showNotification("Failed to copy to clipboard", "error"); }
        document.body.removeChild(textArea);
    });
}

// Show notification
function showNotification(message, type) {
    if (!notification) return;
    notification.textContent = message; notification.style.display = 'block';
    switch(type) {
        case 'success': notification.style.backgroundColor = '#00c853'; break;
        case 'error': notification.style.backgroundColor = '#d32f2f'; break;
        case 'info': notification.style.backgroundColor = '#2196f3'; break;
        default: notification.style.backgroundColor = '#2196f3';
    }
    setTimeout(() => notification.style.display = 'none', 3000);
}

// Logout
function performLogout() {
    dashboard.style.display = 'none';
    loginPage.style.display = 'flex';
    if (loginForm) loginForm.reset();
    resetPin();
    showSection('balanceOverview');
    closeSidebar();

    // Clear login state
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('pinVerified');

    showNotification("You have been logged out successfully", "info");
}

// Window resize
function handleResize() { if (window.innerWidth > 992) closeSidebar(); }

// Initialize app when DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initApp();
    window.addEventListener('resize', handleResize);
});
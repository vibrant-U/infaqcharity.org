// Enhanced JavaScript functionality for Infaq Charity Website
document.addEventListener('DOMContentLoaded', function() {

    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (menuToggle && navMenu && !menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    if (navMenu) {
        navMenu.addEventListener('click', function(event) {
            if (event.target.tagName === 'A') {
                navMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu after clicking
            if (navMenu) {
                navMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
        });
    });

    // Animated counters for statistics
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(element, target) {
        const duration = 2000; // 2 seconds
        const start = parseInt(element.textContent) || 0;
        const increment = (target - start) / (duration / 16); // 60fps
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    // Intersection Observer for counter animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-target'));
                animateCounter(statNumber, target);
                observer.unobserve(statNumber);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));

    // Progress bar animations
    const progressBars = document.querySelectorAll('.progress-bar');

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width || '0%';
                progressBar.style.width = width;
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));

    // Donation form functionality
    const amountButtons = document.querySelectorAll('.amount-btn');
    const donationAmount = document.getElementById('donation-amount');
    const gatewayOptions = document.querySelectorAll('.gateway-option');
    const freqButtons = document.querySelectorAll('.freq-btn');

    // Amount selection
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            amountButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const amount = this.textContent.replace('$', '');
            if (donationAmount) {
                donationAmount.value = amount;
            }
        });
    });

    // Custom amount input
    if (donationAmount) {
        donationAmount.addEventListener('input', function() {
            amountButtons.forEach(btn => btn.classList.remove('active'));
        });
    }

    // Payment gateway selection
    gatewayOptions.forEach(option => {
        option.addEventListener('click', function() {
            gatewayOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Frequency selection
    freqButtons.forEach(button => {
        button.addEventListener('click', function() {
            freqButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#e53e3e';
                    isValid = false;
                } else {
                    field.style.borderColor = '#48BB78';
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Copy to clipboard functionality for bank details
    const copyButtons = document.querySelectorAll('.btn-copy');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const textToCopy = targetElement.getAttribute('data-copy') || targetElement.textContent;

                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Visual feedback
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    this.style.background = '#48BB78';

                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.background = '';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = textToCopy;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);

                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    this.style.background = '#48BB78';

                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.background = '';
                    }, 2000);
                });
            }
        });
    });

    // Card hover effects enhancement
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // WhatsApp floating button animation
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        let pulseInterval = setInterval(() => {
            whatsappFloat.style.transform = 'scale(1.1)';
            setTimeout(() => {
                whatsappFloat.style.transform = 'scale(1)';
            }, 500);
        }, 3000);

        // Stop pulsing on hover
        whatsappFloat.addEventListener('mouseenter', () => {
            clearInterval(pulseInterval);
            whatsappFloat.style.transform = 'scale(1)';
        });

        whatsappFloat.addEventListener('mouseleave', () => {
            pulseInterval = setInterval(() => {
                whatsappFloat.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    whatsappFloat.style.transform = 'scale(1)';
                }, 500);
            }, 3000);
        });
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Newsletter signup (if exists)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            if (email) {
                // Here you would typically send to your backend
                alert('Thank you for subscribing! We\'ll keep you updated with our latest projects.');
                this.reset();
            }
        });
    }

    // Scroll-triggered animations
    const animatedElements = document.querySelectorAll('.card, .section, .testimonial-card');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(element);
    });

    // Zakat Calculator functionality
    const zakatForm = document.getElementById('zakatForm');
    const nisabValueElement = document.getElementById('nisabValue');

    if (zakatForm) {
        // Set Nisab value
        const currentNisabUSD = 650.00;
        if (nisabValueElement) {
            nisabValueElement.textContent = ` (Current Nisab Threshold: $${currentNisabUSD.toFixed(2)} USD)`;
        }

        zakatForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear previous results
            document.getElementById('zakatDue').textContent = '0.00 USD';
            document.getElementById('netWorth').textContent = '0.00 USD';

            // Get all input values
            const cashValue = parseFloat(document.getElementById('cashValue')?.value) || 0;
            const goldValue = parseFloat(document.getElementById('goldValue')?.value) || 0;
            const stockValue = parseFloat(document.getElementById('stockValue')?.value) || 0;
            const receivables = parseFloat(document.getElementById('receivables')?.value) || 0;
            const businessInventory = parseFloat(document.getElementById('businessInventory')?.value) || 0;
            const liabilities = parseFloat(document.getElementById('liabilities')?.value) || 0;

            // Validate inputs
            if (cashValue < 0 || goldValue < 0 || stockValue < 0 || receivables < 0 || businessInventory < 0 || liabilities < 0) {
                alert('Error: All financial inputs must be zero or a positive number.');
                return;
            }

            // Calculate total assets and net worth
            const totalAssets = cashValue + goldValue + stockValue + receivables + businessInventory;
            const netWorth = totalAssets - liabilities;

            let zakatDue = 0;
            let calculationMessage = '';

            // Check against Nisab threshold
            if (netWorth >= currentNisabUSD) {
                zakatDue = netWorth * 0.025;
                calculationMessage = `MashaAllah! Your Zakat obligation is $${zakatDue.toFixed(2)} USD.`;
            } else {
                calculationMessage = 'Your net worth is below the current Nisab threshold. No Zakat is due at this time.';
            }

            // Display results
            document.getElementById('netWorth').textContent = `${netWorth.toFixed(2)} USD`;
            document.getElementById('zakatDue').textContent = `${zakatDue.toFixed(2)} USD`;

            alert(calculationMessage);
        });
    }

});

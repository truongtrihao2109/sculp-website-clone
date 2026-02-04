document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.selector-option');
    const atcPrice = document.getElementById('atc-price');

    options.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active state from all
            options.forEach(opt => {
                opt.classList.remove('active');
                opt.classList.remove('border-2', 'border-black', 'bg-[#fff6f6]');
                opt.classList.add('border-gray-200', 'bg-white');
                // Hide perks
                // Tailwind group-[.active]:block handles visibility, 
                // but we need to toggle the 'active' class on the parent
            });

            // Add active state to clicked
            option.classList.add('active');
            option.classList.remove('border-gray-200', 'bg-white');
            option.classList.add('border-2', 'border-black', 'bg-[#fff6f6]');

            // Update ATC Price
            const price = option.getAttribute('data-price');
            if (atcPrice) {
                atcPrice.textContent = price;
            }
        });
    });

    // FAQ Accordion Logic
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const arrow = toggle.querySelector('span:last-child');

            // Toggle visibility
            content.classList.toggle('hidden');

            // Rotate arrow
            if (content.classList.contains('hidden')) {
                arrow.style.transform = 'rotate(0deg)';
            } else {
                arrow.style.transform = 'rotate(180deg)';
            }
        });
    });
});

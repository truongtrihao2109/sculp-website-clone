document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.selector-option');
    const atcPrice = document.getElementById('atc-price');

    options.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active state from all
            options.forEach(opt => {
                opt.classList.remove('active');
                // Reset border on inner div
                const innerDiv = opt.querySelector('div');
                if (innerDiv) {
                    innerDiv.classList.remove('border-[#039869]');
                    innerDiv.classList.add('border-gray-200');
                }
                // Reset radio button
                const radioOuter = opt.querySelector('.w-8.h-8.rounded-full');
                const radioInner = radioOuter?.querySelector('.w-4.h-4.rounded-full');
                if (radioOuter) {
                    radioOuter.classList.remove('border-[#039869]');
                    radioOuter.classList.add('border-gray-300');
                }
                if (radioInner) {
                    radioInner.classList.remove('bg-[#039869]');
                    radioInner.classList.add('bg-transparent');
                }

                // Reset perk colors to inactive state
                const perkRows = opt.querySelectorAll('.divide-y > div');
                perkRows.forEach(perk => {
                    perk.classList.remove('bg-[#039869]');
                    perk.classList.add('bg-[#5aae95]');
                });
            });

            // Add active state to clicked
            option.classList.add('active');
            // Set border on inner div
            const innerDiv = option.querySelector('div');
            if (innerDiv) {
                innerDiv.classList.remove('border-gray-200');
                innerDiv.classList.add('border-[#039869]');
            }
            // Set radio button to active
            const radioOuter = option.querySelector('.w-8.h-8.rounded-full');
            const radioInner = radioOuter?.querySelector('.w-4.h-4.rounded-full');
            if (radioOuter) {
                radioOuter.classList.remove('border-gray-300');
                radioOuter.classList.add('border-[#039869]');
            }
            if (radioInner) {
                radioInner.classList.remove('bg-transparent');
                radioInner.classList.add('bg-[#039869]');
            }

            // Set perk colors for selected state (all dark green)
            const perkRows = option.querySelectorAll('.divide-y > div');
            perkRows.forEach((perk) => {
                perk.classList.remove('bg-[#5aae95]');
                perk.classList.add('bg-[#039869]');
            });

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

    // Video Carousel Scroll Logic
    const videoScroll = document.getElementById('video-scroll');
    const scrollPrev = document.getElementById('scroll-prev');
    const scrollNext = document.getElementById('scroll-next');
    const scrollProgress = document.getElementById('scroll-progress');

    if (videoScroll && scrollPrev && scrollNext && scrollProgress) {
        const updateProgress = () => {
            const scrollPercent = (videoScroll.scrollLeft / (videoScroll.scrollWidth - videoScroll.clientWidth)) * 100;
            scrollProgress.style.width = `${Math.max(10, scrollPercent)}%`;
        };

        scrollPrev.addEventListener('click', () => {
            videoScroll.scrollBy({ left: -320, behavior: 'smooth' });
        });

        scrollNext.addEventListener('click', () => {
            videoScroll.scrollBy({ left: 320, behavior: 'smooth' });
        });

        videoScroll.addEventListener('scroll', updateProgress);
        // Initial progress
        updateProgress();
    }
});

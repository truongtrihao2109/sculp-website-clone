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
    // Generic Accordion Logic (Reusable)
    const setupAccordion = (togglesSelector, contentSelector, arrowSelector) => {
        const toggles = document.querySelectorAll(togglesSelector);
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const content = toggle.nextElementSibling;
                const arrow = toggle.querySelector(arrowSelector);

                // Toggle Open/Closed State
                if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                    // Close
                    content.style.maxHeight = '0px';
                    arrow.style.transform = 'rotate(0deg)';
                } else {
                    // Open
                    content.style.maxHeight = content.scrollHeight + 'px';
                    arrow.style.transform = 'rotate(180deg)';
                }
            });
        });
    };

    // Initialize FAQ Accordion
    setupAccordion('.faq-toggle', '.faq-content', 'span:last-child');

    // Initialize Ingredient Accordion
    setupAccordion('.ingredient-toggle', '.ingredient-content', 'svg');

    // Video Carousel Scroll Logic
    const videoScroll = document.getElementById('video-scroll');
    const scrollPrev = document.getElementById('scroll-prev');
    const scrollNext = document.getElementById('scroll-next');
    const scrollProgress = document.getElementById('scroll-progress');

    if (videoScroll && scrollPrev && scrollNext && scrollProgress) {
        const updateProgress = () => {
            const totalVideos = videoScroll.children.length;
            const visibleVideos = Math.round(videoScroll.clientWidth / videoScroll.children[0].clientWidth);
            const scrollableWidth = videoScroll.scrollWidth - videoScroll.clientWidth;
            const currentScroll = videoScroll.scrollLeft;

            // Tính số "trang" hoặc view khác nhau
            // Với 8 video và 4 video hiển thị, có 5 trang: (1-4), (2-5), (3-6), (4-7), (5-8)
            const numPages = totalVideos - visibleVideos + 1; // Số trang khác nhau
            const pagePercentage = 100 / numPages; // Mỗi trang = 20% (100% / 5 = 20%)

            if (scrollableWidth <= 0) {
                // Nếu không thể scroll, hiển thị 20% (trang đầu tiên)
                scrollProgress.style.width = `${pagePercentage}%`;
                return;
            }

            // Tính trang hiện tại dựa trên scroll position
            const videoCardWidth = videoScroll.children[0].clientWidth + 16; // width + gap
            const currentVideoIndex = Math.round(currentScroll / videoCardWidth);

            // Progress = (trang hiện tại + 1) * 20%
            // Trang 0 (đầu tiên) = 20%, trang 1 = 40%, ..., trang 4 = 100%
            const progressPercentage = Math.min(100, (currentVideoIndex + 1) * pagePercentage);
            scrollProgress.style.width = `${progressPercentage}%`;
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

    // Video Play/Pause Logic
    const videoContainers = document.querySelectorAll('.product_ugc-video');
    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const playIcon = container.querySelector('.product_ugc-play');

        if (video && playIcon) {
            // Click on play icon or video to play/pause
            const handleClick = () => {
                if (video.paused) {
                    // Play video with sound
                    video.muted = false;
                    video.play();
                    playIcon.style.display = 'none';
                } else {
                    // Pause video
                    video.pause();
                    playIcon.style.display = 'block';
                }
            };

            playIcon.addEventListener('click', handleClick);
            video.addEventListener('click', handleClick);

            // Show play icon when video ends
            video.addEventListener('ended', () => {
                playIcon.style.display = 'block';
            });
        }
    });



    // Reviews Filter Logic (Native Select)
    const filterSelect = document.getElementById('filter-select');
    const filterLabel = document.getElementById('filter-label');

    if (filterSelect && filterLabel) {
        filterSelect.addEventListener('change', (e) => {
            filterLabel.textContent = e.target.value;
        });
        // Ensure click works (just in case)
        filterSelect.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Write Review Inline Form Logic
    // Write Review Inline Form Logic
    const reviewBtn = document.getElementById('write-review-btn');
    const reviewFormContainer = document.getElementById('review-form-container');
    const cancelReviewBtn = document.getElementById('cancel-review');

    if (reviewBtn && reviewFormContainer && cancelReviewBtn) {
        // Toggle Form
        reviewBtn.addEventListener('click', () => {
            const isHidden = reviewFormContainer.classList.contains('hidden');
            if (isHidden) {
                reviewFormContainer.classList.remove('hidden');
                reviewBtn.textContent = 'Cancel review';
            } else {
                reviewFormContainer.classList.add('hidden');
                reviewBtn.textContent = 'Write a review';
            }
        });

        // Close Form (Cancel Button)
        cancelReviewBtn.addEventListener('click', () => {
            reviewFormContainer.classList.add('hidden');
            reviewBtn.textContent = 'Write a review';
        });
    }

    // File Upload Logic
    const uploadBox = document.getElementById('review-upload-box');
    const fileInput = document.getElementById('review-file-input');
    const fileNameDisplay = document.getElementById('file-name-display');
    const uploadIcon = document.getElementById('upload-icon');

    if (uploadBox && fileInput && fileNameDisplay && uploadIcon) {
        // Trigger file input click
        uploadBox.addEventListener('click', () => {
            fileInput.click();
        });

        // Handle file selection
        fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                const fileName = e.target.files[0].name;
                fileNameDisplay.textContent = fileName;
                fileNameDisplay.classList.remove('hidden');
                uploadIcon.classList.add('hidden'); // Hide icon to show name clearly
            } else {
                fileNameDisplay.textContent = '';
                fileNameDisplay.classList.add('hidden');
                uploadIcon.classList.remove('hidden');
            }
        });
    }

    // Star Rating Logic (Visual only)
    const starButtons = document.querySelectorAll('.star-rating');
    starButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Reset all
            starButtons.forEach(b => {
                b.querySelector('svg').classList.remove('fill-current');
                b.querySelector('svg').classList.add('fill-transparent');
            });
            // Fill up to clicked
            for (let i = 0; i <= index; i++) {
                starButtons[i].querySelector('svg').classList.remove('fill-transparent');
                starButtons[i].querySelector('svg').classList.add('fill-current');
            }
        });
    });
});

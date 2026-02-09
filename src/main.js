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

    // Initialize Product Tab Blocks Accordion
    const productTabThumbs = document.querySelectorAll('.product_tab-thumb');
    productTabThumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const tabBlock = thumb.closest('.product_tab-block');
            const content = thumb.nextElementSibling;
            const icon = thumb.querySelector('img');
            
            if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                // Close
                content.style.maxHeight = '0px';
                tabBlock.classList.remove('active');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            } else {
                // Close other open tabs
                document.querySelectorAll('.product_tab-block').forEach(block => {
                    if (block !== tabBlock) {
                        const otherContent = block.querySelector('.product_tab-content');
                        const otherIcon = block.querySelector('.product_tab-thumb img');
                        if (otherContent) {
                            otherContent.style.maxHeight = '0px';
                        }
                        if (otherIcon) {
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                        block.classList.remove('active');
                    }
                });
                
                // Open
                content.style.maxHeight = content.scrollHeight + 'px';
                tabBlock.classList.add('active');
                if (icon) {
                    icon.style.transform = 'rotate(45deg)';
                }
            }
        });
    });

    // Video Carousel Scroll Logic
    const videoScroll = document.getElementById('video-scroll');
    const scrollPrev = document.getElementById('scroll-prev');
    const scrollNext = document.getElementById('scroll-next');
    const scrollProgress = document.getElementById('scroll-progress');

    if (videoScroll && scrollPrev && scrollNext && scrollProgress) {
        // Tính khoảng scroll đúng bằng 1 card + gap để luôn canh theo từng "trang"
        const getScrollAmount = () => {
            const firstCard = videoScroll.querySelector('.video-card');
            if (!firstCard) return 0;

            const cardWidth = firstCard.getBoundingClientRect().width;
            const scrollStyles = window.getComputedStyle(videoScroll);
            const gapValue = scrollStyles.columnGap || scrollStyles.gap || '0';
            const gap = parseFloat(gapValue) || 0;

            return cardWidth + gap;
        };

        const getNumPages = () => {
            const totalVideos = videoScroll.children.length;
            if (totalVideos === 0) return 0;
            const firstCard = videoScroll.querySelector('.video-card') || videoScroll.children[0];
            const visibleVideos = Math.round(videoScroll.clientWidth / firstCard.clientWidth) || 1;
            return Math.max(1, totalVideos - visibleVideos + 1);
        };

        const updateProgress = () => {
            const numPages = getNumPages();
            if (numPages === 0) return;

            const pagePercentage = 100 / numPages; // ví dụ: 5 trang => 20%

            // Nếu chỉ có 1 trang (không thể scroll) thì luôn full 100%
            if (numPages === 1) {
                scrollProgress.style.width = '100%';
                return;
            }

            const pageWidth = getScrollAmount();

            if (pageWidth <= 0) {
                // Không xác định được chiều rộng trang -> để 20% (trang đầu tiên)
                scrollProgress.style.width = `${pagePercentage}%`;
                return;
            }

            // Xác định trang hiện tại (0,1,2,3,4,...)
            const currentPage = Math.round(videoScroll.scrollLeft / pageWidth);
            const clampedPage = Math.min(numPages - 1, Math.max(0, currentPage));

            // 20-40-60-80-100: mặc định = 20%, mỗi lần bấm Right tăng thêm 20%
            const progressPercentage = Math.min(100, (clampedPage + 1) * pagePercentage);
            scrollProgress.style.width = `${progressPercentage}%`;
        };

        let scrollAmount = getScrollAmount();

        // Cập nhật lại khi resize để giữ đúng 4 video trên desktop
        window.addEventListener('resize', () => {
            scrollAmount = getScrollAmount();
            updateProgress();
        });

        scrollPrev.addEventListener('click', () => {
            const numPages = getNumPages();
            if (!scrollAmount || !numPages) return;

            const currentPage = Math.round(videoScroll.scrollLeft / scrollAmount);
            const targetPage = Math.max(0, currentPage - 1);
            videoScroll.scrollTo({ left: targetPage * scrollAmount, behavior: 'smooth' });
        });

        scrollNext.addEventListener('click', () => {
            const numPages = getNumPages();
            if (!scrollAmount || !numPages) return;

            const currentPage = Math.round(videoScroll.scrollLeft / scrollAmount);
            const targetPage = Math.min(numPages - 1, currentPage + 1);
            videoScroll.scrollTo({ left: targetPage * scrollAmount, behavior: 'smooth' });
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
    const reviewsListEl = document.getElementById('reviews-list');

    // Mock review data for filtering
    const reviewsData = [
        {
            id: 1,
            author: 'Erika Wasielewski',
            rating: 4,
            verified: true,
            date: '2025-10-15',
            content: 'So far I’ve noticed less swelling in my feet by the end of the day. Haven’t noticed any cellulite repair yet and still have heaviness but not as much.',
            helpful: 32,
            hasPhoto: false,
            hasVideo: false
        },
        {
            id: 2,
            author: 'Tonia Robbins',
            rating: 4,
            verified: true,
            date: '2025-09-17',
            content: 'Am seeing results the first 30 days.',
            helpful: 18,
            hasPhoto: true,
            hasVideo: false
        },
        {
            id: 3,
            author: 'Phyllis Thompson',
            rating: 4,
            verified: true,
            date: '2025-09-08',
            content: 'Been taking Sculptique for almost thirty days now. Have noticed maybe a slight difference in appearance of skin. Will continue taking the product and see what happens.',
            helpful: 11,
            hasPhoto: false,
            hasVideo: true
        },
        {
            id: 4,
            author: 'Crystal',
            rating: 4,
            verified: true,
            date: '2025-09-03',
            content: 'So far, so good! I can definitely see a slight difference. While the results aren’t as dramatic as I initially hoped, this is the first product that has delivered noticeable improvements after all the money and effort I’ve spent on others.',
            helpful: 25,
            hasPhoto: true,
            hasVideo: true
        },
        {
            id: 5,
            author: 'MEG Tupp',
            rating: 4,
            verified: true,
            date: '2025-08-28',
            content: 'I see a small difference in the appearance of my cellulite. I am not sure if I have plateaued or if I continue taking that it will keep appearing better.',
            helpful: 7,
            hasPhoto: false,
            hasVideo: false
        }
    ];

    const formatReviewDate = (isoString) => {
        const d = new Date(isoString);
        if (Number.isNaN(d.getTime())) return isoString;
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const year = d.getFullYear();
        return `${month}/${day}/${year}`;
    };

    const renderStars = (rating) => {
        const fullStar = '<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>';
        const emptyStar = '<svg class="w-4 h-4 fill-gray-300" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>';
        let html = '';
        for (let i = 0; i < 5; i += 1) {
            html += i < rating ? fullStar : emptyStar;
        }
        return html;
    };

    const buildReviewHtml = (review) => `
        <div class="border-t border-gray-100 pt-8">
          <div class="flex items-center justify-between mb-2">
            <div class="flex text-[#ff7373]">
              ${renderStars(review.rating)}
            </div>
            <div class="text-xs text-gray-400">${formatReviewDate(review.date)}</div>
          </div>
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div class="flex justify-center items-center gap-2">
              <span class="text-[#ff7373] text-sm block">${review.author}</span>
              ${review.verified ? '<span class="text-[10px] text-white bg-[#ff7373] px-1 tracking-wide">Verified</span>' : ''}
            </div>
          </div>
          <div class="text-gray-700 text-sm leading-relaxed">
            <p>${review.content}</p>
          </div>
        </div>
    `;

    const renderReviews = (items) => {
        if (!reviewsListEl) return;
        reviewsListEl.innerHTML = items.map(buildReviewHtml).join('');
    };

    const getFilteredReviews = (filterValue) => {
        const data = [...reviewsData];
        const byDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

        switch (filterValue) {
            case 'Most Recent':
                return data.sort(byDateDesc);
            case 'Highest Rating':
                return data.sort((a, b) => (b.rating - a.rating) || byDateDesc(a, b));
            case 'Lowest Rating':
                return data.sort((a, b) => (a.rating - b.rating) || byDateDesc(a, b));
            case 'Only Pictures':
                return data.filter((r) => r.hasPhoto).sort(byDateDesc);
            case 'Pictures First':
                return data.sort((a, b) => (Number(b.hasPhoto) - Number(a.hasPhoto)) || byDateDesc(a, b));
            case 'Videos First':
                return data.sort((a, b) => (Number(b.hasVideo) - Number(a.hasVideo)) || byDateDesc(a, b));
            case 'Most Helpful':
            default:
                return data.sort((a, b) => (b.helpful - a.helpful) || byDateDesc(a, b));
        }
    };

    const applyReviewFilter = (filterValue) => {
        const items = getFilteredReviews(filterValue || 'Most Helpful');
        renderReviews(items);
    };

    if (filterSelect && filterLabel) {
        // Initial render
        applyReviewFilter(filterSelect.value);

        filterSelect.addEventListener('change', (e) => {
            const value = e.target.value;
            filterLabel.textContent = value;
            applyReviewFilter(value);
        });
        // Ensure click works (just in case)
        filterSelect.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    } else if (reviewsListEl) {
        // Fallback: render default ordering if filter UI is missing
        applyReviewFilter('Most Helpful');
    }

    // Write Review Inline Form Logic
    const reviewBtn = document.getElementById('write-review-btn');
    const reviewFormContainer = document.getElementById('review-form-container');
    const cancelReviewBtn = document.getElementById('cancel-review');
    const reviewPanel = document.getElementById('review-panel');

    if (reviewBtn && reviewFormContainer && cancelReviewBtn && reviewPanel) {
        const setReviewOpen = (open) => {
            if (open) {
                // Expand panel with smooth accordion-like animation
                reviewPanel.style.maxHeight = reviewPanel.scrollHeight + 'px';
                reviewPanel.dataset.open = 'true';
                reviewBtn.textContent = 'Cancel review';
            } else {
                // Collapse panel
                reviewPanel.style.maxHeight = '0px';
                reviewPanel.dataset.open = 'false';
                reviewBtn.textContent = 'Write a review';
            }
        };

        // Ensure initial state is closed
        setReviewOpen(false);

        // Toggle Form
        reviewBtn.addEventListener('click', () => {
            const isOpen = reviewPanel.dataset.open === 'true';
            setReviewOpen(!isOpen);
        });

        // Close Form (Cancel Button)
        cancelReviewBtn.addEventListener('click', () => {
            setReviewOpen(false);
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

    // Nutritional Information Modal Logic
    const nutritionBtn = document.getElementById('nutrition-info-btn');
    const nutritionBtnMobile = document.getElementById('nutrition-info-btn-mobile');
    const nutritionModal = document.getElementById('nutrition-modal');
    const nutritionCloseBtn = document.getElementById('nutrition-close-btn');

    const getScrollbarWidth = () => {
        // Create a temporary div to measure scrollbar width
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        outer.style.msOverflowStyle = 'scrollbar';
        document.body.appendChild(outer);
        
        const inner = document.createElement('div');
        outer.appendChild(inner);
        
        const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        
        return scrollbarWidth;
    };

    const openNutritionModal = () => {
        // Calculate scrollbar width before hiding it
        const scrollbarWidth = getScrollbarWidth();
        const bodyPaddingRight = window.getComputedStyle(document.body).paddingRight;
        const bodyPaddingRightNum = parseInt(bodyPaddingRight) || 0;
        
        // Store original padding
        document.body.dataset.originalPaddingRight = bodyPaddingRight;
        
        // Prevent background scroll and compensate for scrollbar
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${bodyPaddingRightNum + scrollbarWidth}px`;
        
        // Also apply to fixed elements if needed
        const fixedElements = document.querySelectorAll('header, .fixed, .sticky');
        fixedElements.forEach(el => {
            const elPaddingRight = window.getComputedStyle(el).paddingRight;
            const elPaddingRightNum = parseInt(elPaddingRight) || 0;
            el.dataset.originalPaddingRight = elPaddingRight;
            el.style.paddingRight = `${elPaddingRightNum + scrollbarWidth}px`;
        });
        
        nutritionModal.classList.remove('hidden');
    };

    const closeNutritionModal = () => {
        nutritionModal.classList.add('hidden');
        
        // Restore scroll and padding
        document.body.style.overflow = '';
        document.body.style.paddingRight = document.body.dataset.originalPaddingRight || '';
        delete document.body.dataset.originalPaddingRight;
        
        // Restore fixed elements padding
        const fixedElements = document.querySelectorAll('header, .fixed, .sticky');
        fixedElements.forEach(el => {
            if (el.dataset.originalPaddingRight !== undefined) {
                el.style.paddingRight = el.dataset.originalPaddingRight;
                delete el.dataset.originalPaddingRight;
            }
        });
    };

    if (nutritionBtn && nutritionModal) {
        // Open modal (Desktop)
        nutritionBtn.addEventListener('click', openNutritionModal);
    }

    if (nutritionBtnMobile && nutritionModal) {
        // Open modal (Mobile)
        nutritionBtnMobile.addEventListener('click', openNutritionModal);
    }

    if (nutritionCloseBtn && nutritionModal) {
        // Close modal
        nutritionCloseBtn.addEventListener('click', closeNutritionModal);
    }

    // Close modal when clicking outside (on the overlay)
    if (nutritionModal) {
        nutritionModal.addEventListener('click', (e) => {
            if (e.target === nutritionModal) {
                closeNutritionModal();
            }
        });
    }

    // Logo Marquee - Clone slide for seamless infinite loop
    const logosSlide = document.querySelector('.logos-slide');
    const logos = document.querySelector('.logos');
    if (logosSlide && logos) {
        const copy = logosSlide.cloneNode(true);
        logos.appendChild(copy);
    }

    // FrontrowMD Modal Logic
    const frontrowOverlay = document.getElementById('frontrow-modal-overlay');

    const openFrontrowModalInternal = () => {
        if (!frontrowOverlay) return;
        frontrowOverlay.classList.remove('hidden');
        // Giữ nguyên scroll ngoài trang (không khóa body/html)
    };

    const closeFrontrowModalInternal = () => {
        if (!frontrowOverlay) return;
        frontrowOverlay.classList.add('hidden');
    };

    if (frontrowOverlay) {
        frontrowOverlay.addEventListener('click', (e) => {
            if (e.target === frontrowOverlay) {
                closeFrontrowModalInternal();
            }
        });
    }

    // Expose functions for inline handlers
    window.openFrontrowModal = (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        openFrontrowModalInternal();
    };

    window.closeFrontrowModal = () => {
        closeFrontrowModalInternal();
    };

    window.closeAll = () => {
        closeFrontrowModalInternal();
    };

    window.toggleDetails = (event) => {
        // Optional hook – we rely mostly on CSS for plus/minus icons
        // but keep this to avoid JS errors and for future analytics if needed.
        if (!event) return;
    };

    window.openProviderModal = (event) => {
        if (!event) return;
        event.preventDefault();
        const btn = event.currentTarget;
        const website = btn?.getAttribute('data-website');
        if (website) {
            window.open(website, '_blank');
        }
    };
});

// Preloader and Entry Animation
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const topBar = document.querySelector('.top-bar');

    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                if (header) header.classList.add('loaded');
                if (nav) nav.classList.add('loaded');
                if (topBar) topBar.classList.add('loaded');
            }, 400);
        }, 1800);
    } else {
        if (nav) nav.classList.add('loaded');
        if (topBar) topBar.classList.add('loaded');
    }
});

// Reveal elements on scroll
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal();

// Dark Mode Toggle — Light is the default
const themeToggleBtn = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');
const root = document.documentElement;

// Only apply dark if explicitly saved — light is default
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    if (darkIcon) darkIcon.style.display = 'none';
    if (lightIcon) lightIcon.style.display = 'block';
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isDark = root.getAttribute('data-theme') === 'dark';
        if (isDark) {
            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            if (darkIcon) darkIcon.style.display = 'block';
            if (lightIcon) lightIcon.style.display = 'none';
        } else {
            root.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if (darkIcon) darkIcon.style.display = 'none';
            if (lightIcon) lightIcon.style.display = 'block';
        }
    });
}

// Copy to Clipboard — all terminal copy buttons
const allCopyBtns = document.querySelectorAll('.terminal-copy-btn');
allCopyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        const targetId = btn.getAttribute('data-copy-target');
        const codeBlock = document.getElementById(targetId);
        if (codeBlock) {
            try {
                await navigator.clipboard.writeText(codeBlock.innerText);
                const originalHtml = btn.innerHTML;
                btn.classList.add('success');
                btn.innerHTML = '<span>Copied!</span>';
                setTimeout(() => {
                    btn.classList.remove('success');
                    btn.innerHTML = originalHtml;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    });
});

// TOC Scrollspy — highlight active section in left nav
function updateTOC() {
    const sections = document.querySelectorAll('[data-section]');
    const navLinks = document.querySelectorAll('nav [data-toc]');
    if (!sections.length || !navLinks.length) return;

    let current = '';
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top < 200) {
            current = section.getAttribute('data-section');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('toc-active');
        if (link.getAttribute('data-toc') === current) {
            link.classList.add('toc-active');
        }
    });
}
window.addEventListener('scroll', updateTOC);
updateTOC();

// ─────────────────────────────────────────────
// Dataset Results Tabs
// ─────────────────────────────────────────────
const dsTabBtns = document.querySelectorAll('.ds-tab-btn');
const dsTabPanels = document.querySelectorAll('.ds-tab-panel');

dsTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');

        dsTabBtns.forEach(b => b.classList.remove('active'));
        dsTabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const panel = document.getElementById('tab-' + target);
        if (panel) panel.classList.add('active');
    });
});

// ─────────────────────────────────────────────
// Architecture Version Selector (v0.1.x / v0.2.x)
// ─────────────────────────────────────────────
const archVersionBtns = document.querySelectorAll('.arch-version-btn');
const archV1 = document.getElementById('arch-v1');
const archV2 = document.getElementById('arch-v2');

function switchArchVersion(version) {
    archVersionBtns.forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.arch-version-btn[data-version="${version}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    if (version === 'v1') {
        if (archV1) archV1.style.display = '';
        if (archV2) archV2.style.display = 'none';
    } else {
        if (archV1) archV1.style.display = 'none';
        if (archV2) archV2.style.display = '';
    }
}

archVersionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        switchArchVersion(btn.getAttribute('data-version'));
    });
});

// ─────────────────────────────────────────────
// Architecture Component Tabs (within each version)
// ─────────────────────────────────────────────
function setupArchTabs(containerEl) {
    if (!containerEl) return;
    const tabBtns = containerEl.querySelectorAll('.arch-tab-btn');
    const panels = containerEl.querySelectorAll('.arch-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-arch-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const panel = containerEl.querySelector('#arch-' + target);
            if (panel) panel.classList.add('active');
        });
    });
}

setupArchTabs(archV1);
setupArchTabs(archV2);

// ─────────────────────────────────────────────
// "More about v0.2.x" link — scroll to architecture
// and switch to v0.2.x tab
// ─────────────────────────────────────────────
const gotoV2Link = document.getElementById('goto-v2');
if (gotoV2Link) {
    gotoV2Link.addEventListener('click', (e) => {
        e.preventDefault();
        switchArchVersion('v2');
        const archSection = document.getElementById('architecture');
        if (archSection) {
            archSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// ─────────────────────────────────────────────
// Lightbox for result images
// ─────────────────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
}

document.querySelectorAll('.ds-img-trigger').forEach(el => {
    el.addEventListener('click', () => {
        const src = el.getAttribute('data-src');
        const alt = el.querySelector('img') ? el.querySelector('img').alt : '';
        openLightbox(src, alt);
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
        closeLightbox();
    }
});


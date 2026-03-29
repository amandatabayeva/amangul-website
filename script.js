/* ═══════════════════════════════════════════
   Script.js — Vanilla JS interactivity
   ═══════════════════════════════════════════ */

(function () {
	'use strict';

	// ─── Smooth-scroll nav ───
	const navLinks = document.querySelectorAll('.nav__links a');
	const nav = document.getElementById('nav');
	const navToggle = document.getElementById('navToggle');
	const navMenu = document.getElementById('navLinks');

	navLinks.forEach(function (link) {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			const targetId = this.getAttribute('href');
			const target = document.querySelector(targetId);
			if (target) {
				const offset = nav.offsetHeight;
				const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
				window.scrollTo({ top: top, behavior: 'smooth' });
			}
			// Close mobile menu
		closeMenu();
		});
	});

	// ─── Mobile menu toggle ───
	var navBackdrop = document.getElementById('navBackdrop');

	function closeMenu() {
		navMenu.classList.remove('open');
		navToggle.classList.remove('active');
		if (navBackdrop) navBackdrop.classList.remove('open');
	}

	navToggle.addEventListener('click', function () {
		var isOpen = navMenu.classList.toggle('open');
		navToggle.classList.toggle('active');
		if (navBackdrop) navBackdrop.classList.toggle('open', isOpen);
	});

	if (navBackdrop) {
		navBackdrop.addEventListener('click', closeMenu);
	}

	// ─── Nav scroll state ───
	function handleNavScroll() {
		if (window.scrollY > 60) {
			nav.classList.add('scrolled');
		} else {
			nav.classList.remove('scrolled');
		}
	}
	window.addEventListener('scroll', handleNavScroll, { passive: true });
	handleNavScroll();

	// ─── Reveal on scroll (Intersection Observer) ───
	var revealElements = document.querySelectorAll('.reveal');

	if ('IntersectionObserver' in window) {
		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12 }
		);

		revealElements.forEach(function (el) {
			observer.observe(el);
		});
	} else {
		// Fallback: show all
		revealElements.forEach(function (el) {
			el.classList.add('visible');
		});
	}

	// ─── Hero logo smooth-scroll ───
	var logo = document.querySelector('.nav__logo');
	if (logo) {
		logo.addEventListener('click', function (e) {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}
})();

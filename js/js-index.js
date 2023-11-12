function random(min, max) {
	const delta = max - min;
	return (direction = 1) => (min + delta * Math.random()) * direction;
}
function disableScroll() {
	// Store the current scroll position
	const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

	// Disable scrolling by preventing the default behavior of scroll events
	window.addEventListener('scroll', preventScroll, {
		passive: false
	});

	// Save the scroll position to a data attribute on the body element
	document.body.setAttribute('data-scroll-position', scrollY);

	// Add a class to the body to apply additional styles if needed
	document.body.classList.add('no-scroll');

	// Set the body's position to 'fixed' to prevent scroll position changes
	document.body.style.position = 'fixed';
	document.body.style.overflowY = 'scroll';
	document.body.style.top = `-${scrollY}px`;

	function preventScroll(event) {
		event.preventDefault();
	}
}
function enableScroll() {
	// Retrieve the stored scroll position
	const scrollY = parseInt(document.body.getAttribute('data-scroll-position'), 10);

	// Remove the event listener to allow scrolling again
	window.removeEventListener('scroll', preventScroll, {
		passive: false
	});

	// Remove the 'no-scroll' class and reset styles
	document.body.classList.remove('no-scroll');
	document.body.style.position = '';
	document.body.style.overflowY = '';
	document.body.style.top = '';
	
	// Scroll to the original position
	window.scrollTo(0, scrollY);

	function preventScroll(event) {
		event.preventDefault();
	}
}

function loading() {
	towers = gsap.utils.toArray('#herosection .svg-container g');
	const towerFilter = 'mainTower';
	const miniTowers = towers.filter(towers => !towers.classList.contains(towerFilter));

	gsap.timeline().to("#loading svg .loadingLogo", {
		opacity: 1,
		duration: 1,
		delay: .5,
		ease: "sine.out",
		onStart: () => {
			disableScroll();
			gsap.set(miniTowers, {
				y: 1000
			})
		},
	}, 0).from("#loading svg .line-base", {
		opacity: 0,
		duration: 1,
		ease: "sine.out",
	}).to("#loading svg .c1 line", {
		opacity: 1,
		duration: .8,
		ease: "expo.in",
		stagger: {
			each: -.02,
			ease: "power1.inOut",
		},
	}, 1.5).to("#loading svg .c2 line", {
		opacity: 1,
		duration: .8,
		ease: "expo.in",
		stagger: {
			each: -.02,
			ease: "power1.inOut",
		},
	}, 2).to("#loading svg .c3 line", {
		opacity: 1,
		duration: .8,
		ease: "expo.in",
		stagger: {
			each: -.015,
			ease: "power1.inOut",
		},
	}, 2.5).to("#loading svg", {
		opacity: 0,
		duration: 1.5,
		ease: "sine.in",
	}, 4).to("#loading", {
		opacity: 0,
		duration: 1.2,
		onComplete: () => {
			gsap.set("#loading", {
				display: "none",
			})
		}
	}, 5.5).from("#herosection .logotag, #herosection .textHero.notThis", {
		opacity: 0,
		y: 80,
		duration: 1.5,
		ease: 'sine.inOut',
		stagger: .5,
	}, 7).to("#herosection .btnHero", {
		scale: 1,
		duration: 1.5,
		ease: "back.out(1.7)",
	}, 8.5).from("#herosection .svg-container", {
		y: 500,
		duration: 2.5,
		ease: "sine.out",
		delay: 2,
		onComplete: () => {
			gsap.fromTo(miniTowers,{
				y: 300
			}, {
				y: 20,
				ease: "sine.out",
				duration: 2,
				stagger: {
					each: .08,
				},
			})
			gsap.from(miniTowers, {
				opacity: 0,
				ease: "sine.out",
				duration: 1.5,
				stagger: {
					each: .08,
				},
				onComplete: () => {
					const backClassMinitower = towers.filter(towers => towers.classList.contains('back'));
					const midClassMinitower = towers.filter(towers => towers.classList.contains('mid'));
					const frontClassMinitower = towers.filter(towers => towers.classList.contains('front'));

					if (backClassMinitower) {
						gsap.to(backClassMinitower, {
							scrollTrigger: {
								trigger: '#herosection',
								start: "top top",
								end: "bottom top",
								scrub: .5,
							},
							y: 100,
							ease: 'none',
						});
					}
					// if (midClassMinitower) {
					// 	gsap.to(midClassMinitower, {
					// 		scrollTrigger: {
					// 			trigger: '#herosection',
					// 			start: "top top",
					// 			end: "bottom top",
					// 			scrub: .5,
					// 		},
					// 		y: -50,
					// 		ease: 'none'
					// 	});
					// }
					if (frontClassMinitower) {
						gsap.to(frontClassMinitower, {
							scrollTrigger: {
								trigger: '#herosection',
								start: "top top",
								end: "bottom top",
								scrub: .5,
							},
							y: -200,
							ease: 'none',
						});
					}
					gsap.to('#herosection .svg-container .mainTower', {
						scrollTrigger: {
							trigger: '#herosection',
							start: "top top",
							end: "bottom top",
							scrub: .5,
						},
						y: 400,
						ease: 'none'
					});
					enableScroll()
				}
			})
		}
	}, 7)
}

function index() {
	// loading();

	new Cursor('#cursor');

	ScrollTrigger.create({
		trigger: '#herosection #underHero',
		start: "top center",
		endTrigger: "#footer",
		end: "bottom top",
		toggleClass: {
			targets: "#navigation",
			className: "active"
		},
	})
	ScrollTrigger.create({
		trigger: "#herosection",
		start: "top 70%",
		end: "bottom 70%",
		toggleClass: {
			targets: "#navigation .heroLink",
			className: "active"
		},
	});
	ScrollTrigger.create({
		trigger: "#about",
		start: "top 70%",
		endTrigger: '#story',
		end: "bottom 70%",
		toggleClass: {
			targets: "#navigation .aboutLink",
			className: "active"
		},
	});
	ScrollTrigger.create({
		trigger: "#product",
		start: "top 70%",
		end: "bottom 70%",
		toggleClass: {
			targets: "#navigation .productLink",
			className: "active"
		},
	});
	ScrollTrigger.create({
		trigger: "#culture",
		start: "top 70%",
		end: "bottom 70%",
		toggleClass: {
			targets: "#navigation .cultureLink",
			className: "active"
		},
	});
	ScrollTrigger.create({
		trigger: "#hiring",
		start: "top 70%",
		end: "bottom 70%",
		toggleClass: {
			targets: "#navigation .hiringLink",
			className: "active"
		},
	});
	ScrollTrigger.create({
		trigger: "#footer",
		start: "top 70%",
		end: "bottom 70%",
		toggleClass: {
			targets: "#navigation .footerLink",
			className: "active"
		},
	});

	let mm = gsap.matchMedia();

	mm.add({
		isMobile: "(max-width: 640px)",
		isDesktop: "(min-width: 641px)",
	}, (context) => {
		let { isMobile, isDesktop } = context.conditions;

		gsap.to("#underHero .text-container", {
			scrollTrigger: {
				trigger: "#herosection #underHero .text-container",
				start: "top bottom",
				endTrigger: "#herosection",
				end: "bottom top",
				scrub: .5
			},
			y: isMobile ? 0 : -100,
			ease: 'none'
		})
		gsap.from('#story .imgStory', {
			scrollTrigger: {
				trigger: '#about',
				start: 'top bottom',
				endTrigger: '#story',
				end: 'bottom top',
				scrub: 1,
			},
			y: isMobile ? 0 : -350,
			scale: .9,
			rotate: 8,
			ease: 'none'
		});

		gsap.from("#product .text1, #product .imgProduct2", {
			scrollTrigger: {
				trigger: "#product",
				start: "top bottom",
				end: "bottom top",
				scrub: .5,
			},
			y: isMobile ? 0 : -300,
			ease: 'none'
		})
		gsap.to("#product .text2, #product .imgProduct1", {
			scrollTrigger: {
				trigger: "#product .imgProduct1",
				start: "top bottom",
				endTrigger: '#product',
				end: "bottom top",
				scrub: .5,
			},
			y: isMobile ? 0 : -100,
			ease: 'none'
		})
		gsap.from('#footer .footerBG', {
			scrollTrigger: {
				trigger: '#footer',
				start: 'top bottom',
				end: 'bottom bottom',
				scrub: true,
			},
			y: isMobile ? 100 : 400,
			ease: 'none'
		})
	})

	pTags = gsap.utils.toArray('p');
	const classNameToFilter = 'notThis';
	const filteredPTags = pTags.filter(pTag => !pTag.classList.contains(classNameToFilter));

	filteredPTags.forEach((target) =>  {
		gsap.from(target, {
			scrollTrigger: {
				trigger: target,
				start: 'top bottom',
				toggleActions: 'play resume resume reset',
			},
			y: 60,
			opacity: 0,
			ease: 'Power1.out',
			duration: 1,
		})
	})
	

	gsap.from('#herosection .underHero img', {
		scrollTrigger: {
			trigger: "#underHero .target",
			start: "top bottom",
			toggleActions: 'play resume resume reset',
		},
		scale: 1.2,
		ease: 'sine.inOut',
		duration: 2,
	})
	gsap.to('#about .img-container img', {
		scrollTrigger: {
			trigger: '#about .img-container img',
			start: '-20 bottom',
			end: 'bottom top',
			scrub: 1,
		},
		rotate: -50,
		ease: 'none'
	})
	gsap.to('#about .img-container', {
		scrollTrigger: {
			trigger: '#about .img-container img',
			start: '-20 bottom',
			end: 'bottom top',
			scrub: 1,
		},
		y: -300,
		ease: 'none'
	})
	gsap.to('#about .text', {
		scrollTrigger: {
			trigger: '#about',
			start: '-20 bottom',
			end: 'bottom top',
			scrub: 1,
		},
		y: 100,
		ease: 'none'
	})
	gsap.from('#product .boxShadow', {
		scrollTrigger: {
			trigger: '#product .head-big',
			start: 'top 70%',
		},
		opacity: 0,
		duration: .6,
		ease: 'none'
	})

	gsap.to("#footer .footer-grid .grid-net", {
		y: 27,
		duration: 1,
		repeat: -1,
		ease: "none",
	})
}
class Cursor {
	constructor(cursorSelector) {
		this.cursor = $(cursorSelector);
		this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
		this.set = {};

		var aLinks = gsap.utils.toArray('a, button');
		const classNameToFilter = 'notThis';
		this.filteredaLinks = aLinks.filter(aLinks => !aLinks.classList.contains(classNameToFilter));

		// Create quickSetters
		this.set.x 	= gsap.quickSetter(this.cursor, "x", "px");
		this.set.y 	= gsap.quickSetter(this.cursor, "y", "px");
		this.speed = .8;

		// Run on Mouse Move
		const setFromEvent = (e) => {

			let isOverLink = false;

			this.filteredaLinks.forEach(function(link) {
				link.addEventListener('mouseenter', function() {
					var target = link.getBoundingClientRect();
					var xTarget = target.left;
					var yTarget = target.top;
					var width = target.width;
					var height = target.height;
					
					let newX = xTarget;
				});
			});

			if (!isOverLink) {
				const x = e.clientX;
				const y = e.clientY;

				gsap.to(this.pos, {
					x: x,
					y: y,
					duration: this.speed,
					ease: "expo.out",
				});
			}
			this.loop();
		};
		gsap.ticker.add(() => this.loop());

		$(document).mousemove(setFromEvent);

		$(window).scroll(() => {
			this.loop();
		});
	}

	loop() {
		const xPos = this.pos.x;
		const yPos = this.pos.y;

		this.set.x(xPos);
		this.set.y(yPos);
	}
}

$(document).ready(function(e){
	$(document).scrollTop(0);
	$(window).scrollTop(0);
	index();
})
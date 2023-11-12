const lenis = new Lenis({
	duration: 2,
	easing: (t) => (t === 1 ? 1 : 1 - Math.pow(1 - t, 5)), // https://easings.net
	direction: "vertical",
	gestureDirection: "vertical",
	smooth: true,
	smoothTouch: true,
	touchMultiplier: 1,
	// infinite: true,
});

window.lenis = lenis;
//get scroll value
// lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
// 	console.log({ scroll, limit, velocity, direction, progress })
// })

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
	lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function(e) {
		e.preventDefault();
		lenis.scrollTo(this.getAttribute('href'))
	});
})
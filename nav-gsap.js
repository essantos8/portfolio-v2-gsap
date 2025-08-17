/* NAVBAR-ANIMATIONS */
function NavbarScrollAnim() {
	const openIcon = document.querySelector("#navbarIcon");
	let navbarScrollTl = gsap.timeline({data: 'navtl', paused: true, reversed: true});
  navbarScrollTl.to(".main_navbar", {yPercent: -100, ease: 'power1.in', duration: 0.6});
  
  let lastScrollY = window.scrollY;
  
	navbarScrollHandler = () => {
  	let currentScroll = window.scrollY;
    const isLocked = openIcon.getAttribute("data-lock-navbar") === "true";

		// Scrolling down
  	if (currentScroll > lastScrollY) {
    	if (navbarScrollTl.reversed() && !isLocked) navbarScrollTl.play();
  	}
    
    // Scrolling up
    else {
    	if (!navbarScrollTl.reversed()) {
      	navbarScrollTl.reverse();
      }
  	}

  	lastScrollY = currentScroll;
  };
  
  window.addEventListener("scroll", navbarScrollHandler);
  
};


function NavbarOpenAnim () {
	//animate this: var(--_v2-portfolio---background-blur-power)
  const leftNav = document.querySelector('.navmenu_angle-left');
  const rightNav = document.querySelector('.navmenu_angle-right');
  const bottomNav = document.querySelector('.navmenu_bottom');
  
	navbarTl = gsap.timeline({data: 'navtl', paused:true, reversed: true});
  navbarTl.set('.background-blur', {pointerEvents: "none"});
  navbarTl.to('#navbarMenu', {morphSVG: '#navbarCross', ease: 'power1.inOut'});
  navbarTl.to('.background-blur', {"--_v2-portfolio---background-blur-power": '40px', ease: 'power1.inOut', backgroundColor: 'rgba(255, 204, 94, 0.8)'}, 0);
  navbarTl.set('.background-blur', {pointerEvents: "auto"});
  
  //navmenu section
  navbarTl.set('.container_navmenu', {opacity: 1, display: 'flex'}, 0);
  //navbarTl.to('.container_navmenu', {opacity: 1}, 0.2);
  navbarTl.from(leftNav, {xPercent: -10, yPercent: 5, opacity: 0, ease: 'back.out'}, '<');
  navbarTl.from(rightNav, {xPercent: 10, yPercent: -5, opacity: 0, ease: 'back.out'}, '<+0.1');
  
  navbarTl.from(bottomNav, {yPercent: 10, opacity: 0, ease: 'back.out'}, '<+0.1');
  
  const openIcon = document.querySelector("#navbarIcon");
  
  openIcon.addEventListener("click", () => {
  	if (navbarTl.reversed()) {
    	//close to open
      openIcon.setAttribute("data-lock-navbar", 'true');
    	navbarTl.play();
      
    } else {
    	console.log(navbarTl.reversed());
    	openIcon.setAttribute("data-lock-navbar", 'false');
      navbarTl.reverse();
    }
  });
  
  leftNav.addEventListener('click', () => navbarTl.reverse());
  rightNav.addEventListener('click', () => navbarTl.reverse());
  bottomNav.addEventListener('click', () => navbarTl.reverse());
  
};


function NavMenuHoverAnim() {
	const leftNav = document.querySelector('.navmenu_angle-left');
  const rightNav = document.querySelector('.navmenu_angle-right');
  const bottomNav = document.querySelector('.navmenu_bottom');

	function createHoverScaleTimeline(target, options = {}) {
  	const { scale = 1.05, ease = "back.out", duration = 0.3 } = options;

  	const tl = gsap.timeline({data: 'navtl', paused: true })
    	.to(target, { scale, ease, duration });

  	target.addEventListener("mouseenter", () => tl.play());
  	target.addEventListener("mouseleave", () => tl.reverse());

  	return tl;
	}

	// Example usage:
	let leftNavHoverTl = createHoverScaleTimeline(leftNav);
	let rightNavHoverTl = createHoverScaleTimeline(rightNav);
	let bottomNavHoverTl = createHoverScaleTimeline(bottomNav);
  
  bottomNavHoverTl.to('.navmenu_bottom_image', {scale: 1.025, ease: 'back.out', duration: 0.3}, 0);
  bottomNavHoverTl.to('#navBottomOn', {opacity: 1, ease: 'power1.out', duration: 0.3}, 0);
  
  rightNavHoverTl.to('.navmenu_image-right', {scale: 1.025, ease: 'back.out', duration: 0.3}, 0);
  rightNavHoverTl.to('#navRightOn', {opacity: 1, ease: 'power1.out', duration: 0.3}, 0);
  
  leftNavHoverTl.to('.navmenu_image-left', {scale: 1.025, ease: 'back.out', duration: 0.3}, 0);
  leftNavHoverTl.to('#navLeftOn', {opacity: 1, ease: 'power1.out', duration: 0.3}, 0);

};

/* HORIZONTAL-SCROLLER */
function HomeAboutScrollerAnim() {
  const horizontalSection = document.querySelector(".about_scroller");

  globalMatchMedia.add(
    // Desktop only
    "(min-width: 768px)", () => {
      //const horizontalTween = gsap.to(horizontalSection, {
      window.homeAboutScrollTween = gsap.to(horizontalSection, {
        x: "-200%",
        ease: "sine.inOut",
        scrollTrigger: {
          id: "home-about-scroller",
          trigger: ".section_home-about",
          start: "top top",
          end: () => "+=" + horizontalSection.scrollWidth,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          pinType: 'fixed',
          pinReparent: true,
          invalidateOnRefresh: true
        }
      });

      // Store globally if needed elsewhere
      //window.homeAboutScrollTween = horizontalTween;
    }
  );
};
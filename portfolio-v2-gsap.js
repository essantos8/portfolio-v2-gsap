
barba.init({
  transitions: [
    {
      name: 'hero-to-detail',
      to: {namespace: ['detail']},

      async enter({ current, next }) {
      	//window.scrollTo(0, 0);

        // Set next containers to fixed so they can overlap
        gsap.set(next.container, {position: 'fixed',top: 0,left: 0,width: '100%'});

        // Prepare next container off-screen to the right
        gsap.set(next.container, {x: '100%',opacity: 1,zIndex: 2});

        // Animate both containers at the same time
        const tl = gsap.timeline();

        tl.to(current.container, {
          x: '-100%',
          duration: 1,
          ease: 'power2.inOut'
        }, 0) // Start at time 0

        .to(next.container, {
          x: '0%',
          duration: 1,
          ease: 'power2.inOut'
        }, 0); // Start at same time as current
        
        tl.call(() => {window.scrollTo(0, 0);});
        tl.set(next.container, {position: 'relative'});
        
        return tl;
      },
      
      async afterEnter () {
      	  document.fonts.ready.then(() => {
          	HeaderAnim();
          });
      }
    },
    
    //detail to hero
    {
    	name: 'detail-to-hero',
      to: {namespace: ['home']},
      async enter({ current, next }) {
      	//window.scrollTo(0, 0);

        // Set next containers to fixed so they can overlap
        gsap.set(next.container, {position: 'fixed',top: 0,left: 0,width: '100%'});

        // Prepare next container off-screen to the right
        gsap.set(next.container, {x: '-100%',opacity: 1,zIndex: 2});

        // Animate both containers at the same time
        const tl = gsap.timeline();

        tl.to(current.container, {
          x: '100%',
          duration: 1,
          ease: 'power2.inOut'
        }, 0) // Start at time 0

        .to(next.container, {
          x: '0%',
          duration: 1,
          ease: 'power2.inOut'
        }, 0); // Start at same time as current
        
        tl.call(() => {window.scrollTo(0, 0);});
        tl.set(next.container, {position: 'relative'});
        
        return tl;
      }
    
    }
    
  ]
});

// Cleanup before leaving the page
barba.hooks.beforeLeave(() => {
	console.log("Home: killed all trigger animations");
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.globalTimeline.clear();
  // TODO: remove other listeners or intervals if needed
});

// Run font-dependent animations on every page transition
barba.hooks.after(() => {
  document.fonts.ready.then(() => {
    HomeIntroAnim();
    HomeAboutAnim();
    HomeAboutScrollerAnim();
    HomeWorksAnim();
    AnimWorksEntry();
  });
});

// Also run it on initial load (first visit)
document.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(() => {
    HomeIntroAnim();
    NavbarOpenAnim();
    NavbarScrollAnim();
    HomeAboutAnim();
    HomeAboutScrollerAnim();
    Scroller2ndPanelAnim();
    Scroller3rdPanelAnim();
    HomeWorksAnim();
    AnimWorksEntry();
    SectionSwipeAnim();
    ScrollTrigger.refresh();
  });
});



/* INTRO-ANIM-HOME */
function HomeIntroAnim () {

	const homeSplit = new SplitText(".home_hero_heading", { type: "lines" });
  
  let HomeTl = gsap.timeline();
	HomeTl.set(".home_hero_container", { display: "flex", width: 0, height: 4, transformOrigin: "center center" });
	HomeTl.set(homeSplit.lines, {yPercent: 100,opacity: 0});
  HomeTl.set(".home_hero_video", {opacity: 0});
  HomeTl.from(".home_hero_container", {opacity: 0});
  HomeTl.to(".home_hero_container", { width: "100%", height: 4,ease: "power2.InOut", duration: 2}, "<");
  HomeTl.to(".home_hero_container", { height: "100%",ease: "power2.InOut", duration: 2 }, "<");
  HomeTl.to(".home_hero_video", {opacity: 1, duration: 1.2}, "<");
  HomeTl.to(homeSplit.lines, {yPercent: 0,opacity: 1,duration: 1,stagger: 0.1,ease: "power3.out"});
  
};



function NavbarScrollAnim() {
	const openIcon = document.querySelector("#navbarIcon");
	let navbarScrollTl = gsap.timeline({paused: true, reversed: true});
  navbarScrollTl.to(".main_navbar", {yPercent: -100, ease: 'power1.in', duration: 0.6});
  
  let lastScrollY = window.scrollY;
	window.addEventListener("scroll", () => {
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
  });
  
}




function NavbarOpenAnim () {
	//animate this: var(--_v2-portfolio---background-blur-power)
  const leftNav = document.querySelector('.navmenu_angle-left');
  const rightNav = document.querySelector('.navmenu_angle-right');
  const bottomNav = document.querySelector('.navmenu_bottom');
  
	let navbarTl = gsap.timeline({paused:true, reversed: true});
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
    	openIcon.setAttribute("data-lock-navbar", 'false');
      navbarTl.reverse();
    }
  });
  
  //HOVER FUNCTIONS!!!
  
	function createHoverScaleTimeline(target, options = {}) {
  	const { scale = 1.05, ease = "back.out", duration = 0.3 } = options;

  	const tl = gsap.timeline({ paused: true })
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



/* ANIM-SECTION-ABOUT */

function HomeAboutAnim () {
	const aboutSplit = new SplitText(".home_about_splitter", { type: "lines" });
  

	let AboutTl = gsap.timeline({
	   scrollTrigger: {
 	   trigger: ".section_home-about",
 	   start: "top 50%",
     toggleActions: "play resume resume reverse"
      }
	});

  AboutTl.set(aboutSplit.lines, {yPercent: 100,opacity: 0});
  AboutTl.from(".home_about_left", {y: "30%", opacity: 0, duration: 1, ease: "back.out"});
  AboutTl.to(aboutSplit.lines, {yPercent: 0,opacity: 1,duration: 1, stagger: 0.1,ease: "power3.Out"});
}




function SectionSwipeAnim() {
	let homeToAboutTl = gsap.timeline();
  homeToAboutTl.fromTo(
  	document.querySelector(".section_home-hero"),
    {y: '0%' },
    {y: '-50%', ease: 'power1.out', scrollTrigger: {
    	trigger: ".section_home-about",
      start: "top 90%",
      end: "top 60%",
      scrub: true,
    	}
    }
  );
  
  let aboutToWorksTl = gsap.timeline();
  homeToAboutTl.to(
  	document.querySelector(".section_home-about"),
    {opacity: 0, ease: 'power1.out', scrollTrigger: {
    	trigger: ".section_home-works",
      //containerAnimation: window.homeAboutScrollTween,
      start: "top 50%",
      end: "top 10%",
      scrub: true,
    	}
    }
  );
 
}



function HomeAboutScrollerAnim() {
  const horizontalSection = document.querySelector(".about_scroller");

  const mm = gsap.matchMedia();

  mm.add(
    // Desktop only
    "(min-width: 768px)", () => {
      const horizontalTween = gsap.to(horizontalSection, {
        x: "-200%",
        ease: "sine.inOut",
        scrollTrigger: {
          id: "home-about-scroller",
          trigger: ".section_home-about",
          start: "top top",
          end: () => "+=" + horizontalSection.scrollWidth,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true
        }
      });

      // Store globally if needed elsewhere
      window.homeAboutScrollTween = horizontalTween;
    }
  );
  console.log("Window width:", window.innerWidth);
  console.log(mm);
}



function Scroller2ndPanelAnim() {
  const mm = gsap.matchMedia();
  const leftAngleBox = document.querySelector(".about_angle_container-left");
  const rightAngleBox = document.querySelector(".about_angle_container-right");
  const bottomContainer = document.querySelector(".about_bottom_container");

  // Desktop: min-width 768px
  mm.add("(min-width: 768px)", () => {


    return gsap.timeline({
      scrollTrigger: {
        trigger: document.querySelector("#about-section-two"),
        containerAnimation: window.homeAboutScrollTween,
        start: "left 50%",
        toggleActions: "play resume resume reverse"
      }
    })
    .fromTo(bottomContainer, { width: "0%", opacity: 0 }, { width: "100%", opacity: 1, duration: 1, ease: "power1.out" }, 0)
    .fromTo(bottomContainer.querySelector(".about_angle_header"), { opacity: 0, y: "2rem" }, { opacity: 1, y: 0, duration: 0.6, ease: "back.out" }, "<+0.6")
    .fromTo(leftAngleBox, { opacity: 0, y: "2rem" }, { opacity: 1, y: 0, duration: 1, ease: "back.out" }, 0.2)
    .fromTo(leftAngleBox.querySelector(".about_angle_header"), { opacity: 0, y: "2rem" }, { opacity: 1, y: 0, duration: 0.6, ease: "back.out" }, "<+0.6")
    .fromTo(rightAngleBox, { opacity: 0, y: "-2rem" }, { opacity: 1, y: 0, duration: 1, ease: "back.out" }, 0.3)
    .fromTo(rightAngleBox.querySelector(".about_angle_header"), { opacity: 0, y: "2rem" }, { opacity: 1, y: 0, duration: 0.6, ease: "back.out" }, "<+0.6");
  });

  // Mobile: max-width 767px
  mm.add("(max-width: 767px)", () => {

    return gsap.timeline({
      scrollTrigger: {
        trigger: document.querySelector("#about-section-two"),
        start: "top 50%",
        toggleActions: "play resume resume reverse"
      }
    })
    .fromTo(bottomContainer, { width: "0%", opacity: 0 }, { width: "100%", opacity: 1, duration: 1, ease: "power1.out" }, 0)
    .fromTo(bottomContainer.querySelector(".about_angle_header"), { opacity: 0, y: "2rem" }, { opacity: 1, y: 0, duration: 0.6, ease: "back.out" }, "<+0.6")
    .fromTo(leftAngleBox, { opacity: 0, x: "-2rem" }, { opacity: 1, x: 0, duration: 1, ease: "back.out" }, 0.2)
    .fromTo(leftAngleBox.querySelector(".about_angle_header"), { opacity: 0, y: "2rem" }, { opacity: 1, y: 0, duration: 0.6, ease: "back.out" }, "<+0.6")
    .fromTo(rightAngleBox, { opacity: 0, x: "2rem" }, { opacity: 1, x: 0, duration: 1, ease: "back.out" }, 0.3)
    .fromTo(rightAngleBox.querySelector(".about_angle_header"), { opacity: 0, y: "2rem" }, { opacity: 1, y: 0, duration: 0.6, ease: "back.out" }, "<+0.6");
  });
}




function Scroller3rdPanelAnim() {
  const mm = gsap.matchMedia();

  // Desktop: horizontal scroll using containerAnimation
  mm.add("(min-width: 768px)", () => {
    const techContainer = document.querySelector(".skillset_container-left");
    const skillContainers = document.querySelectorAll(".skill_container");

    let panel3Tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.querySelector("#about-section-three"),
        containerAnimation: window.homeAboutScrollTween,
        start: "left 70%",
        toggleActions: "play resume resume reverse"
      }
    })
    .fromTo(techContainer, { height: "0%", opacity: 0 }, { height: "100%", opacity: 1, duration: 1, ease: "power1.out" }, 0)
    .fromTo(techContainer.querySelector(".about_tech_header"), { opacity: 0, y: "2rem" }, { opacity: 1, y: 0, duration: 0.6, ease: "back.out" }, "<+0.6")
    .fromTo(skillContainers, { width: "0%", opacity: 0 }, { width: "100%", opacity: 1, duration: 0.8, ease: "power1.out", stagger: 0.1 }, 0.2);

    skillContainers.forEach((container, index) => {
      panel3Tl.fromTo(
        container.querySelector(".about_skillset_header"),
        { y: "1rem", opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out" },
        (index * 0.2) + 0.6
      );

      panel3Tl.fromTo(
        container.querySelectorAll(".skillset_pill"),
        { y: "1rem", opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out" },
        "<"
      );
    });

    return panel3Tl;
  });

  // Mobile: vertical scroll, no containerAnimation
  mm.add("(max-width: 767px)", () => {
    const techContainer = document.querySelector(".skillset_container-left");
    const skillContainers = document.querySelectorAll(".skill_container");

    let panel3Tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.querySelector("#about-section-three"),
        start: "top 70%",
        toggleActions: "play resume resume reverse"
      }
    })
    .fromTo(techContainer, { height: "0%", opacity: 0 }, { height: "100%", opacity: 1, duration: 1, ease: "power1.out" }, 0)
    .fromTo(techContainer.querySelector(".about_tech_header"), { opacity: 0, y: "2rem" }, { opacity: 1, y: 0, duration: 0.6, ease: "back.out" }, "<+0.6")
    .fromTo(skillContainers, { width: "0%", opacity: 0 }, { width: "100%", opacity: 1, duration: 0.8, ease: "power1.out", stagger: 0.1 }, 0.2);

    skillContainers.forEach((container, index) => {
      panel3Tl.fromTo(
        container.querySelector(".about_skillset_header"),
        { y: "1rem", opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out" },
        (index * 0.2) + 0.6
      );

      panel3Tl.fromTo(
        container.querySelectorAll(".skillset_pill"),
        { y: "1rem", opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out" },
        "<"
      );
    });

    return panel3Tl;
  });
}




/* ANIM-SECTION-WORKS */
function HomeWorksAnim() {

	let WorksTl = gsap.timeline({
  	   scrollTrigger: {
 	   trigger: ".section_home-works",
     //markers: true,
 	   start: "top 80%",
 	   end: "bottom center",
   	 toggleActions: "play none play reverse",
      }
  });
  
	WorksTl.set(".home_works_header-container", { width: 4, height: 0, transformOrigin: "center center" });
  WorksTl.set("#homeWorksHeader", {yPercent: 20, opacity: 0});
  WorksTl.to(".home_works_header-container", { width: 4, opacity: 1, height: "100%",ease: "power2.inOut", duration: 0.4});
  WorksTl.to(".home_works_header-container", { width: "100%",ease: "power2.inOut", duration: 0.8 });
  WorksTl.to("#homeWorksHeader", {yPercent: 0,opacity: 1,ease: "power3.out"});
  
  //section for entry boxes animation
ScrollTrigger.batch(".home_works_entry-main", {
  start: "bottom 100%",
  onEnter: batch => {
    gsap.to(batch, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: "back.out(2)",
      markers: true
    });
  },
  onLeaveBack: batch => {
    gsap.to(batch, {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "back.in(2)"
    });
  }
});

// Initial state
gsap.set(".home_works_entry-main", {
  y: 40,
  opacity: 0
});

}




/* ANIM-WORKS-ENTRY */

function AnimWorksEntry() {

const isTouchDevice = matchMedia("(hover: none)").matches;

// Predefine colors
const disabledAccentColor = getComputedStyle(document.documentElement).getPropertyValue("--_v2-portfolio---background-yellow").trim();
const disabledBorderColor = getComputedStyle(document.documentElement).getPropertyValue("--_v2-portfolio---disabled-yellow").trim();
const disabledTextColor = getComputedStyle(document.documentElement).getPropertyValue("--_v2-portfolio---blue-300").trim();

const activeAccentColor = getComputedStyle(document.documentElement).getPropertyValue("--_v2-portfolio---blue-100").trim();
const activeBorderColor = getComputedStyle(document.documentElement).getPropertyValue("--_v2-portfolio---blue-300").trim();
const activeTextColor = getComputedStyle(document.documentElement).getPropertyValue("--_v2-portfolio---text-white").trim();

    
document.querySelectorAll(".home_works_entry-main").forEach((card) => {
  const cardRight = card.querySelector(".works_entry-right");
  const cardLeft = card.querySelector(".works_entry-left");
  const cardButtons = card.querySelector(".works_entry_container-button");
  const cardHeader = card.querySelector(".works_entry_header");
  const cardPills = card.querySelectorAll(".works_entry_pill");
  const cardPillTexts = card.querySelectorAll(".works_entry_pill-text");

  // Build timeline (empty for now)
  const EntryShowTimeline = gsap.timeline({ paused: true });

  // Function to update Flip layout on demand
  function showEntry() {
    const stateRight = Flip.getState(cardRight);
    cardRight.classList.remove("gsap-works");
    const tweenRight = Flip.from(stateRight, {duration: 0.5,ease: "power2.inOut"});

    EntryShowTimeline.clear();
    EntryShowTimeline
      .to(card, {backgroundColor: activeAccentColor,borderColor: activeBorderColor,duration: 0.5,ease: "power2.inOut"}, 0)
      .to(cardLeft, {marginBottom: "0rem", duration: 0.5, ease: "power2.inOut"}, 0)
      .to(cardButtons, {opacity: 1, duration: 0.5, ease: "power2.inOut"}, "<+0.2")
      .to(cardHeader, {color: activeTextColor, duration: 0.5,ease: "power2.inOut"}, 0)
      .add(tweenRight, 0);
    
    cardPills.forEach((pill, i) => {
  		EntryShowTimeline.fromTo(pill, 
		    { width: "3rem" }, 
    		{ width: "auto", duration: 0.4, ease: "power2.inOut" }, 0 + i * 0.05);
		});

		cardPillTexts.forEach((text, i) => {
  		EntryShowTimeline.fromTo(text,
    		{ opacity: 0 },
    		{ opacity: 1, duration: 0.3, ease: "power2.out" },
    		0.1 + i * 0.05 // slightly after the width
  		);
		});

    EntryShowTimeline.restart();
  }

	//cursed technique reversal
  function hideEntry() {
  	cardRight.classList.remove("gsap-works");
  	const stateRight = Flip.getState(cardRight);
    cardRight.classList.add("gsap-works");
    const tweenRight = Flip.from(stateRight, {duration: 0.5,ease: "power2.inOut"});

		//change depending on mobile screen size.
		const responsiveBottom = window.innerWidth < 768 ? "-4.5rem" : "-3rem";
    
    EntryShowTimeline.clear();
    EntryShowTimeline
      .to(card, {backgroundColor: disabledAccentColor,borderColor: disabledBorderColor,duration: 0.5,ease: "power2.inOut"}, 0)
      .to(cardLeft, {marginBottom: responsiveBottom, duration: 0.5, ease: "power2.inOut"}, 0)
      .to(cardButtons, {opacity: 0, duration: 0.5, ease: "power2.inOut"}, 0)
      .to(cardHeader, {color: disabledTextColor, duration: 0.5,ease: "power2.inOut"}, 0)
      .add(tweenRight, 0);
      
    cardPills.forEach((pill, i) => {
  		EntryShowTimeline.to(pill, { width: "3rem", duration: 0.4, ease: "power2.inOut" }, 0 + i * 0.05);
		});

		cardPillTexts.forEach((text, i) => {
  		EntryShowTimeline.fromTo(text,
    		{ opacity: 1 },
    		{ opacity: 0, duration: 0.3, ease: "power2.out" },
    		0.1 + i * 0.05 // slightly after the width
  		);
		});
    
    EntryShowTimeline.restart();
  }

  // Device-based interaction
  if (isTouchDevice) {
    let isOpen = false;
    card.addEventListener("click", () => {
      isOpen ? hideEntry() : showEntry();
      isOpen = !isOpen;
    });
  } else {
    card.addEventListener("mouseenter", showEntry);
    card.addEventListener("mouseleave", hideEntry);
  }
});

};

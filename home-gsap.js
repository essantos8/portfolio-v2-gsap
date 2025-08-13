//matchmedia listener for all of these
let globalMatchMedia = gsap.matchMedia();

/* INTRO-ANIM-HOME */
function HomeIntroAnim() {

  const homeSplit = new SplitText(".home_hero_heading", { type: "lines" });

  let HomeTl = gsap.timeline({ data: 'hometl' });
  HomeTl.set(".home_hero_container", { display: "flex", width: 0, height: 4, transformOrigin: "center center" });
  HomeTl.set(homeSplit.lines, { yPercent: 100, opacity: 0 });
  HomeTl.set(".home_hero_video", { opacity: 0 });
  HomeTl.from(".home_hero_container", { opacity: 0 });
  HomeTl.to(".home_hero_container", { width: "100%", height: 4, ease: "power2.InOut", duration: 2 }, "<");
  HomeTl.to(".home_hero_container", { height: "100%", ease: "power2.InOut", duration: 2 }, "<");
  HomeTl.to(".home_hero_video", { opacity: 1, duration: 1.2 }, "<");
  HomeTl.to(homeSplit.lines, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" });

};


/* ANIM-SECTION-ABOUT */
function HomeAboutAnim() {
  const aboutSplit = new SplitText(".home_about_splitter", { type: "lines" });


  let AboutTl = gsap.timeline({
    data: 'hometl',
    scrollTrigger: {
      trigger: ".section_home-about",
      start: "top 50%",
      toggleActions: "play resume resume reverse"
    }
  });

  AboutTl.set(aboutSplit.lines, { yPercent: 100, opacity: 0 });
  AboutTl.from(".home_about_left", { y: "30%", opacity: 0, duration: 1, ease: "back.out" });
  AboutTl.to(aboutSplit.lines, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.Out" });
};



/* SECTION-TRANSITION */
function SectionSwipeAnim() {
  let homeToAboutTl = gsap.timeline({data: 'hometl'});
  homeToAboutTl.fromTo(
    document.querySelector(".section_home-hero"),
    { y: '0%' },
    {
      y: '-50%', ease: 'power1.out', scrollTrigger: {
        trigger: ".section_home-about",
        start: "top 90%",
        end: "top 60%",
        scrub: true,
      }
    }
  );

  let aboutToWorksTl = gsap.timeline({data: 'hometl'});
  homeToAboutTl.to(
    document.querySelector(".section_home-about"),
    {
      opacity: 0, ease: 'power1.out', scrollTrigger: {
        trigger: ".section_home-works",
        //containerAnimation: window.homeAboutScrollTween,
        start: "top 50%",
        end: "top 10%",
        scrub: true,
      }
    }
  );

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


function Scroller2ndPanelAnim() {
  const leftAngleBox = document.querySelector(".about_angle_container-left");
  const rightAngleBox = document.querySelector(".about_angle_container-right");
  const bottomContainer = document.querySelector(".about_bottom_container");

  // Desktop: min-width 768px
  globalMatchMedia.add("(min-width: 768px)", () => {


    return gsap.timeline({
      data: 'hometl',
      scrollTrigger: {
        trigger: document.querySelector("#about-section-two"),
        containerAnimation: window.homeAboutScrollTween,
        start: "left 50%",
        toggleActions: "play resume resume reverse"
      }
    })
      .fromTo(bottomContainer, { width: "0%", opacity: 0 }, { width: "100%", opacity: 1, duration: 1, ease: "power1.out" }, 0)
      .fromTo(leftAngleBox, { opacity: 0, y: "2rem" }, { opacity: 1, y: 0, duration: 1, ease: "back.out" }, 0.2)
      .fromTo(leftAngleBox.querySelector(".about_angle_header"), { opacity: 0, y: "2rem" }, { opacity: 1, y: 0, duration: 0.6, ease: "back.out" }, "<+0.6")
      .fromTo(rightAngleBox, { opacity: 0, y: "-2rem" }, { opacity: 1, y: 0, duration: 1, ease: "back.out" }, 0.3)
      .fromTo(rightAngleBox.querySelector(".about_angle_header"), { opacity: 0, y: "2rem" }, { opacity: 1, y: 0, duration: 0.6, ease: "back.out" }, "<+0.6")
      .from(".about_list li", { y: "1rem", opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, 0.6)
      .from('.about_bottom_image', {y: '1rem', opacity: 0, duration: 0.6, ease: 'power2.out'}, 0.6)
  })

  // Mobile: max-width 767px
  globalMatchMedia.add("(max-width: 767px)", () => {

    return gsap.timeline({
      data: 'hometl',
      scrollTrigger: {
        trigger: document.querySelector("#about-section-two"),
        start: "top 50%",
        toggleActions: "play resume resume reverse"
      }
    })
      .fromTo(bottomContainer, { width: "0%", opacity: 0 }, { width: "100%", opacity: 1, duration: 1, ease: "power1.out" }, 0)
      .fromTo(leftAngleBox, { opacity: 0, y: "2rem" }, { opacity: 1, y: 0, duration: 1, ease: "back.out" }, 0.2)
      .fromTo(leftAngleBox.querySelector(".about_angle_header"), { opacity: 0, y: "2rem" }, { opacity: 1, y: 0, duration: 0.6, ease: "back.out" }, "<+0.6")
      .fromTo(rightAngleBox, { opacity: 0, y: "-2rem" }, { opacity: 1, y: 0, duration: 1, ease: "back.out" }, 0.3)
      .fromTo(rightAngleBox.querySelector(".about_angle_header"), { opacity: 0, y: "2rem" }, { opacity: 1, y: 0, duration: 0.6, ease: "back.out" }, "<+0.6")
      .from(".about_list li", { y: "1rem", opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, 0.6)
      .from('.about_bottom_image', {y: '1rem', opacity: 0, duration: 0.6, ease: 'power2.out'}, 0.6)
  });
};

function Panel2Resizer() {
  const source = document.querySelector('.container_about-triple');
  const targets = document.querySelectorAll('.about_2-bg');
  const videoTargets = document.querySelectorAll('video.about_2-bg');

  new ResizeObserver(entries => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      targets.forEach(target => {
        target.style.width = width + 'px';
        target.style.height = height + 'px';
      });
    }
  }).observe(source);

  function restartVideos() {
    videoTargets.forEach(v => {
      v.currentTime = 0;
      v.play();
    });
  }

  window.addEventListener('resize', () => {
    restartVideos();
  });

};


function Scroller3rdPanelAnim() {
  // Desktop: horizontal scroll using containerAnimation
  globalMatchMedia.add("(min-width: 768px)", () => {
    const techContainer = document.querySelector(".skillset_container-left");
    const skillContainers = document.querySelectorAll(".skill_container");

    let panel3Tl = gsap.timeline({
      data: 'hometl',
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
  globalMatchMedia.add("(max-width: 767px)", () => {
    const techContainer = document.querySelector(".skillset_container-left");
    const skillContainers = document.querySelectorAll(".skill_container");

    let panel3Tl = gsap.timeline({
      data: 'hometl',
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
};




/* ANIM-SECTION-WORKS */
function HomeWorksAnim() {

  let WorksTl = gsap.timeline({
    data: 'hometl',
    scrollTrigger: {
      trigger: ".section_home-works",
      //markers: true,
      start: "top 80%",
      end: "bottom center",
      toggleActions: "play none play reverse",
    }
  });

  WorksTl.set(".home_works_header-container", { width: 4, height: 0, transformOrigin: "center center" });
  WorksTl.set("#homeWorksHeader", { yPercent: 20, opacity: 0 });
  WorksTl.to(".home_works_header-container", { width: 4, opacity: 1, height: "100%", ease: "power2.inOut", duration: 0.4 });
  WorksTl.to(".home_works_header-container", { width: "100%", ease: "power2.inOut", duration: 0.8 });
  WorksTl.to("#homeWorksHeader", { yPercent: 0, opacity: 1, ease: "power3.out" });

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

};




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
    const EntryShowTimeline = gsap.timeline({data: 'hometl', paused: true });

    // Function to update Flip layout on demand
    function showEntry() {
      const stateRight = Flip.getState(cardRight);
      cardRight.classList.remove("gsap-works");
      const tweenRight = Flip.from(stateRight, { duration: 0.5, ease: "power2.inOut" });

      EntryShowTimeline.clear();
      EntryShowTimeline
        .to(card, { backgroundColor: activeAccentColor, borderColor: activeBorderColor, duration: 0.5, ease: "power2.inOut" }, 0)
        .to(cardLeft, { marginBottom: "0rem", duration: 0.5, ease: "power2.inOut" }, 0)
        .to(cardButtons, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, "<+0.2")
        .to(cardHeader, { color: activeTextColor, duration: 0.5, ease: "power2.inOut" }, 0)
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
      const tweenRight = Flip.from(stateRight, { duration: 0.5, ease: "power2.inOut" });

      //change depending on mobile screen size.
      const responsiveBottom = window.innerWidth < 768 ? "-4.5rem" : "-3rem";

      EntryShowTimeline.clear();
      EntryShowTimeline
        .to(card, { backgroundColor: disabledAccentColor, borderColor: disabledBorderColor, duration: 0.5, ease: "power2.inOut" }, 0)
        .to(cardLeft, { marginBottom: responsiveBottom, duration: 0.5, ease: "power2.inOut" }, 0)
        .to(cardButtons, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, 0)
        .to(cardHeader, { color: disabledTextColor, duration: 0.5, ease: "power2.inOut" }, 0)
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

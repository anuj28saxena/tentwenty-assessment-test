document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger) ;

     new SplitType('.text_animation_gsap_container', {
     types: 'words',
     wordClass: 'text_animation_wrapper'
     });

    
     gsap.fromTo(
          '.text_animation_wrapper',
          {
               opacity: 0,
               yPercent: 100
          },
          {
          opacity: 1,
          yPercent: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power4.out',
               scrollTrigger: {
                    trigger: '.text_animation_gsap_container',
                    start: 'top 20%',
                    markers: false
               }
          }
     );


     // hero banner js

      const slider = document.querySelector(".mySwiper");
          if (!slider) return;

          const progressFill = document.querySelector(".hero-slider__progress-fill");
          const currentCounter = document.querySelector(".hero-slider__counter-current");
          const totalCounter = document.querySelector(".hero-slider__counter-total");
          const thumb = document.querySelector(".hero-slider__next-thumb");

          const ringFill = document.querySelector(
          ".hero-slider__ring-fill"
          );

          const ringLength = ringFill.getTotalLength();

          ringFill.style.strokeDasharray = ringLength;
          ringFill.style.strokeDashoffset = ringLength;

          const AUTOPLAY_DELAY = 5000;

          // -----------------------
          // Split Text
          // -----------------------

          document
          .querySelectorAll(
               ".hero-slider__heading, .hero-slider__eyebrow, .hero-slider__subheading"
          )
          .forEach((el) => {
               new SplitType(el, {
               types: "words"
               });
          });

          // -----------------------
          // Swiper
          // -----------------------

          const swiper = new Swiper(".mySwiper", {
               loop: true,
               speed: 0,
               effect: "fade",
               allowTouchMove: false,
               simulateTouch: false,    // mouse drag disabled
               autoplay: false

         
          });

          

          // -----------------------
          // Counter
          // -----------------------

          totalCounter.textContent = String(
          document.querySelectorAll(".hero-slider__slide").length
          ).padStart(2, "0");

          function updateCounter() {
          currentCounter.textContent =
          String(swiper.activeIndex + 1)
               .padStart(2,"0");
          }

          // -----------------------
          // Thumbnail
          // -----------------------

         function updateThumbnail() {

               const slides =
               document.querySelectorAll(
                    ".hero-slider__slide"
               );

               let nextIndex =
               swiper.activeIndex + 1;

               if(nextIndex >= slides.length){
               nextIndex = 0;
               }

               thumb.src =
               slides[nextIndex].dataset.thumb;

          }

          // -----------------------
          // Progress
          // -----------------------

          function startProgress() {

               gsap.killTweensOf(progressFill);
               gsap.killTweensOf(ringFill);

               gsap.set(progressFill,{
               scaleX:0,
               transformOrigin:"left center"
               });

               gsap.set(ringFill,{
               strokeDashoffset:ringLength
               });

               gsap.to(progressFill,{
               scaleX:1,
               duration:AUTOPLAY_DELAY / 1000,
               ease:"none"
               });

               gsap.to(ringFill,{
               strokeDashoffset:0,
               duration:AUTOPLAY_DELAY / 1000,
               ease:"none",

               onComplete: () => {

                    if(swiper.isEnd){

                    swiper.slideTo(0);

                    }else{

                    swiper.slideNext();

                    }

               }
               });

          }

          // -----------------------
          // Animate Active Slide
          // -----------------------

          function animateSlide(slide) {

          if (!slide) return;

          const clip = slide.querySelector(
               ".hero-slider__clip"
          );

          const image = slide.querySelector(
               ".hero-slider__bg-scale"
          );

          const words = slide.querySelectorAll(".word");

          const button = slide.querySelector(
               ".hero-slider__cta"
          );

          gsap.set(words, {
               yPercent: 120,
               opacity: 0
          });

          if(button){
               gsap.set(button,{
               y:30,
               opacity:0
               });
          }

          // gsap.set(clip,{
          //      clipPath:"inset(50% 0% 50% 0%)"
          // });

          gsap.set(clip,{
          clipPath:"inset(48% 20% 48% 20%)"
          });

          gsap.set(image, {
               scale: 1.25
          });

          const tl = gsap.timeline();

          tl.to(clip,{
               clipPath:"inset(0% 0% 0% 0%)",
               duration:1.6,
               ease:"power4.out"
          },0);

          tl.to(
               image,
               {
               scale: 1,
               duration: 2,
               ease: "power3.out"
               },
               0
          );

          tl.to(
               words,
               {
               yPercent: 0,
               opacity: 1,
               stagger: 0.05,
               duration: 0.8,
               ease: "power3.out"
               },
               0.4
          );

          if (button) {
               tl.to(
               button,
               {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power3.out"
               },
               "-=0.3"
               );
          }

          return tl;
          }

          // -----------------------
          // Initial
          // -----------------------
           let autoplay;

          updateCounter();
          updateThumbnail();

          requestAnimationFrame(() => {
          animateSlide(
          swiper.slides[swiper.activeIndex]
          );
          });

          startProgress();
          // startAutoplay();

          // -----------------------
          // Slide Change
          // -----------------------

          swiper.on("slideChangeTransitionStart", () => {

          updateCounter();
          updateThumbnail();

          animateSlide(
          swiper.slides[swiper.activeIndex]
          );

          startProgress();

          });

          // -----------------------
          // Custom Buttons
          // -----------------------

        document
               .querySelector(".hero-slider__next-btn")
               ?.addEventListener("click", () => {

               gsap.killTweensOf(progressFill);
               gsap.killTweensOf(ringFill);

               if(swiper.isEnd){

               swiper.slideTo(0);

               }else{

               swiper.slideNext();

               }

               });

          document
          .querySelector(".hero-slider__prev-btn")
          ?.addEventListener("click", () => {
               swiper.slidePrev();
          });

          
          // -----------------------
          // Autoplay
          // -----------------------

     


     // hero banner js


    

});


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

    

});
// Init controller
var controller = new ScrollMagic.Controller();

// Build scenes

// Main
new ScrollMagic.Scene({
  triggerElement: "#parallax1",
  triggerHook: "onEnter",
  duration: "200%"
})
  .setTween(
    TweenLite.fromTo(
      "#img-particles",
      1,
      { y: "-40%%" },
      { y: "0%", ease: Power0.easeNone }
    )
  )
  .addTo(controller);

// Trap text

new ScrollMagic.Scene({
  triggerElement: "#trap-clip",
  triggerHook: 0.5,
  duration: 250,
  offset: 500
})
  .setTween(
    new TimelineLite().add(
      TweenLite.fromTo(
        "#traptext",
        1,
        { transform: "translate(900px, -250px) scale(0.1)", opacity: "0" },
        {
          transform: "translate(0px) scale(1)",
          opacity: "1",
          ease: Power2.easeOut
        }
      )
    )
  )
  .addTo(controller);

// Hip Hop Text
new ScrollMagic.Scene({
  triggerElement: "#hip-hop-clip",
  triggerHook: 0.5,
  duration: 250,
  offset: 500
})
  .setTween(
    new TimelineLite().add(
      TweenLite.fromTo(
        "#hiphoptext",
        1,
        { transform: "translate(-900px, -250px) scale(0.1)", opacity: "0" },
        {
          transform: "translate(20px, 0px) scale(1)",
          opacity: "1",
          ease: Power2.easeOut
        }
      )
    )
  )
  .addTo(controller);

// Lyrical Text

new ScrollMagic.Scene({
  triggerElement: "#lyrical-clip",
  triggerHook: 0.5,
  duration: 250,
  offset: 500
})
  .setTween(
    new TimelineLite().add(
      TweenLite.fromTo(
        "#lyricaltext",
        1,
        { transform: "translate(900px, -250px) scale(0.1)", opacity: "0" },
        { transform: "translate(0px) scale(1)", opacity: "1", ease: Power2.easeOut }
      )
    )
  )
  .addTo(controller);

// Lofi Text

new ScrollMagic.Scene({
  triggerElement: "#lofi-clip",
  triggerHook: 0.5,
  duration: 250,
  offset: 500
})
  .setTween(
    new TimelineLite().add(
      TweenLite.fromTo(
        "#lofitext",
        1,
        { transform: "translate(-900px, -250px) scale(0.1)", opacity: "0" },
        {
          transform: "translate(20px, 0px) scale(1)",
          opacity: "1",
          ease: Power2.easeOut
        }
      )
    )
  )
  .addTo(controller);

var loaded = false;
var loadCounter = 0;
class Beats extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    persons: [
      {
        img_link:
          "https://rootzwiki.com/uploads/monthly_03_2012/post-50649-0-21085700-1331079268.jpg",
        name: "Beat",
        song_link:
          "https://freesound.org/data/previews/479/479286_1661766-lq.mp3"
      }
    ]
  };

  componentDidMount() {
    axios.get("/api/beats").then(res => {
      this.setState({ persons: res.data });
    });
  }
  componentDidUpdate() {
    loaded = true;
  }
  render() {
    return this.state.persons.map((person, index) => (
      <Beat
        coverArt={this.state.persons[index].img_link}
        beatName={this.state.persons[index].name}
        beatSRC={this.state.persons[index].song_link}
      />
    ));
  }
}
class Beat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="player">
        <img className="cover-art" src={this.props.coverArt} />
        <div className="beat-name">
          <h2>{this.props.beatName}</h2>
        </div>
        <div className="controls">
          <button className="play-pause">
            <img
              className="play-pause-img"
              src="https://raw.githubusercontent.com/DaftCreation/Custom-Audio-Player/master/Play.png"
            />
          </button>
          <div className="track-slider">
            <div className="track-slider-fill" />
            <div className="track-slider-handle" />
          </div>
        </div>
        <div className="purchase">
          <div className="purchase-button trackout-button">
            <h2 className="purchase-text trackout-text">Trackout</h2>
          </div>
          <div className="purchase-button  exclusive-button">
            <h2 className="purchase-text exclusive-text">Exclusive</h2>
          </div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(
  <Beats
    ref={beatsComponent => {
      window.beatsComponent = beatsComponent;
    }}
  />,
  document.getElementById("beats-data")
);
// Timer to check for screen updates
var loadChecker = setInterval(onceLoaded, 30);

function onceLoaded() {
  if (loaded) {
    var allPlayPauseButtons = document.querySelectorAll(".play-pause");
    var allControlPanel = document.querySelectorAll(".controls");
    var currentBeat =
      "https://s1.vocaroo.com/media/download_temp/Vocaroo_s1tI3pAdTeVb.mp3";
    var audioList;
    var beat = new Audio();
    // beat.preload = true;
    beat.src = currentBeat;
    beat.loop = true;

    var currentSongID = 0;

    var slider = document.querySelectorAll(".track-slider");
    var sliderWidth = 175;
    var fillBar = document.querySelectorAll(".track-slider-fill");
    var fillBarHandle = document.querySelectorAll(".track-slider-handle");
    var controls = document.querySelectorAll(".controls");
    var trackOutPurchaseButton = document.querySelectorAll(".trackout-button");
    var exclusivePurchaseButton = document.querySelectorAll(".exclusive-button");
    var trackoutText = document.querySelectorAll(".trackout-text");
    var exclusiveText = document.querySelectorAll(".exclusive-text");

    var sliderMoveable = false;
    var sliderChangePosition = 0;
    var shiftPercentage = 0;
    var currentPausePlayImage = "";
    var playedOnce = false;

    // play/pause beat for each player
    allPlayPauseButtons.forEach((playpausebutton, index) => {
      playpausebutton.addEventListener("click", () => {
        // Song was changed
        if (currentSongID !== index) {
          // Change audio src
          beat.src = window.beatsComponent.state.persons[index].song_link;
          // Change previous button to play mode
          allPlayPauseButtons[currentSongID].querySelector(
            ".play-pause-img"
          ).src =
            "https://raw.githubusercontent.com/DaftCreation/Custom-Audio-Player/master/Play.png";
          // Change previous fillbar to 0
          fillBar[currentSongID].style.width = "0%";
        }
        currentSongID = index;
        currentPausePlayImage = playpausebutton.querySelector(".play-pause-img")
          .src;
        playOrPauseSong(currentSongID, currentPausePlayImage);
      });
    });
    // play/pause sound depending on index
    function playOrPauseSong(index, image) {
      if (currentSongID === index && beat.paused) {
        beat.play();
        allPlayPauseButtons[index].querySelector(".play-pause-img").src =
          "https://raw.githubusercontent.com/DaftCreation/Custom-Audio-Player/master/Pause.png";
      } else if (currentSongID === index && !beat.paused) {
        beat.pause();
        allPlayPauseButtons[index].querySelector(".play-pause-img").src =
          "https://raw.githubusercontent.com/DaftCreation/Custom-Audio-Player/master/Play.png";
      }
    }

    function flipPauseImage(index) {
      // if()
    }

    // Seek time (Auto)
    beat.addEventListener("timeupdate", () => {
      var position = beat.currentTime / beat.duration;

      fillBar[currentSongID].style.width = position * 100 + "%";
    });

    // Seek time (manual)

    // Desktop
    fillBarHandle.forEach((barHandle, index) => {
      barHandle.addEventListener("mousedown", () => {
        if (!sliderMoveable) {
          sliderMoveable = true;
          beat.pause();
        }
      });
      barHandle.addEventListener("mouseup", () => {
        if (sliderMoveable) {
          sliderMoveable = false;
          beat.currentTime = shiftPercentage * beat.duration;
          if (
            allPlayPauseButtons[index].querySelector(".play-pause-img").src ===
            "https://raw.githubusercontent.com/DaftCreation/Custom-Audio-Player/master/Pause.png"
          )
            beat.play();
        }
      });

      // Mobile

      barHandle.addEventListener("touchstart", () => {
        sliderMoveable = true;
        beat.pause();
      });
      barHandle.addEventListener("touchend", () => {
        sliderMoveable = false;
        beat.currentTime = shiftPercentage * beat.duration;
        if (
          allPlayPauseButtons[index].querySelector(".play-pause-img").src ===
          "https://raw.githubusercontent.com/DaftCreation/Custom-Audio-Player/master/Pause.png"
        )
          beat.play();
      });
    });

    // Slider mouse move
    slider.forEach((slide, index) => {
      // Change slider position
      slide.addEventListener("mousemove", () => {
        sliderChangePosition = event.clientX - fillBar[index].offsetLeft;
        if (sliderMoveable) {
          shiftPercentage = sliderChangePosition / sliderWidth;
          fillBar[index].style.width = shiftPercentage * 100 + "%";
        }
      });

      slide.addEventListener("mouseleave", () => {
        // Triggers when mouse leaves slider area
        // Sets beat position to position at when mouse was left
        if (sliderMoveable) {
          sliderMoveable = false;
          beat.currentTime = shiftPercentage * beat.duration;
          if (
            allPlayPauseButtons[index].querySelector(".play-pause-img").src ===
            "https://raw.githubusercontent.com/DaftCreation/Custom-Audio-Player/master/Pause.png"
          )
            beat.play();
        }
      });
    });
    // Initial vertical size calculation
    resize();
    // Give more vertical space depending on screen width
    window.addEventListener("resize", resize);

    function resize() {
      let testPlayer = $(".player");
      // beat player width with margins wthout pixels
      let totalBeatPlayerWidth =
        parseInt(testPlayer.css("marginLeft")) +
        parseInt(testPlayer.css("marginRight")) +
        parseInt(testPlayer.css("width"));
      let topPlayerMargin = parseInt($(".player").css("marginTop"));
      let beatsData = $("#beats-data");
      let beatsEntireWidth = parseInt(beatsData.css("width"));
      let amountOfBeats = window.beatsComponent.state.persons.length;
      let beatsPerRow = Math.floor(beatsEntireWidth / totalBeatPlayerWidth);
      let rows = Math.ceil(amountOfBeats / beatsPerRow);
      let totalBeatPlayerHeight =
        parseInt(testPlayer.css("height")) + topPlayerMargin;
      let beatsDataHeight = rows * totalBeatPlayerHeight + 60;
      // Set beats container height
      beatsData.css("height", beatsDataHeight + "px");
      // Calculate main page height
      let mainPage = $("#main-page");
      // mainPage.css("height", beatsData + 20 + "px")
    }
    const stripe = Stripe("pk_test_JD0bNWtJKf9iOMUwXMX5TL0N00mUnu3GTt");
    // Trackout Purchase button
    trackOutPurchaseButton.forEach((button, index) => {
      button.addEventListener("click", () => {
        axios
          .post("/api/purchase", {
            name: window.beatsComponent.state.persons[index].name,
            description: "Trackout Licensce Used for Music Recording: Distribute up to 5000 copies, 100000 online audio streams, 1 music video, profit for live performances, and no radio broadcasting rights ",
            images: [window.beatsComponent.state.persons[index].img_link],
            amount: window.beatsComponent.state.persons[index].trackout_price*100
          })
          .then(res => {
            var id = res.data.id;
            stripe
              .redirectToCheckout({
                sessionId: id
              })
              .then(result => {
                // If `redirectToCheckout` fails due to a browser or network
                // error, display the localized error message to your customer
                // using `result.error.message`.
                console.log("Network Error");
              });
          })
          .catch(err => {
            console.log(err);
          });
      });
      button.addEventListener("mouseover", () => {
        trackoutText[index].innerHTML = "$" + window.beatsComponent.state.persons[index].trackout_price;
      });
      button.addEventListener("mouseout", () => {
        trackoutText[index].innerHTML = "Trackout";
      });
    });
    // Exclusive Purchase Button
    exclusivePurchaseButton.forEach((button, index) => {
      button.addEventListener("click", () => {
        axios
          .post("/api/purchase", {
            name: window.beatsComponent.state.persons[index].name,
            description: "Exclusive Licensce Used for Music Recording: Distribute unlimited copies, unlimited online audio streams, unlimited music videos, profit for live performances, unlimiteed radio broadcasting rights, and complete ownership of music property",
            images: [window.beatsComponent.state.persons[index].img_link],
            amount: window.beatsComponent.state.persons[index].exclusive_price*100
          })
          .then(res => {
            var id = res.data.id;
            stripe
              .redirectToCheckout({
                sessionId: id
              })
              .then(result => {
                // If `redirectToCheckout` fails due to a browser or network
                // error, display the localized error message to your customer
                // using `result.error.message`.
                console.log("Network Error");
              });
          })
          .catch(err => {
            console.log(err);
          });
      });
      button.addEventListener("mouseover", () => {
        exclusiveText[index].innerHTML = "$" + window.beatsComponent.state.persons[index].exclusive_price;
      });
      button.addEventListener("mouseout", () => {
        exclusiveText[index].innerHTML = "Exclusive";
      });
    });

    loaded = false;
  }
}

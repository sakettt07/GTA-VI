import React, { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoIosArrowRoundDown } from "react-icons/io";
import CarouselComp from "./components/CarouselComp";

const App = () => {
  const [showing, setShowing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images=["https://c4.wallpaperflare.com/wallpaper/586/507/755/gta-5-gta-v-games-4k-wallpaper-preview.jpg",
    "https://oyster.ignimgs.com/mediawiki/apis.ign.com/grand-theft-auto-5/5/59/GTAO_072222.jpg?width=1280",
    "https://wallpapercat.com/w/full/f/e/c/2475-1920x1080-desktop-1080p-grand-theft-auto-5-background-image.jpg",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "power2.inOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() > 0.8) {
          document.querySelector(".svg").remove();
          setShowing(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showing) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
    });
    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });
    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.9",
      ease: "Expo.easeInOut",
    });
    gsap.to(".girl", {
      scale: 0.7,
      x: "-50%",
      rotate: 0,
      duration: 2,
      delay: "-.9",
      ease: "Expo.easeInOut",
      bottom: "-30%",
    });
    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.9",
      ease: "Expo.easeInOut",
    });
    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${-xMove * 0.4}%`,
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
      });
    });
  }, [showing]);
  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showing && (
        <div className="main w-full rotate-[-10deg] scale-[1.6]">
          <div className="landing w-full h-screen bg-black overflow-hidden relative">
            <div className="navbar absolute top-0 left-0 z-10 w-full py-8 px-10">
              <div className="logo flex gap-6 items-center">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-10 h-2 bg-white"></div>
                  <div className="line w-7 h-2 bg-white"></div>
                  <div className="line w-4 h-2 bg-white"></div>
                </div>
                <h3 className="text-white leading-none -mt-2 text-4xl">
                  RockStar
                </h3>
              </div>
            </div>
            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="absolute bg scale-[1.8] rotate-[-5deg] w-full h-full object-cover"
                src="./bg.png"
                alt=""
              />
              <div className="text scale-[1.3] rotate-[-10deg] text-white absolute flex flex-col gap-4 left-1/2 -translate-x-1/2 top-76 -translate-y-1/2">
                <h1 className="text-[10rem] leading-none -ml-40">grand</h1>
                <h1 className="text-[10rem] leading-none ml-20">theft</h1>
                <h1 className="text-[10rem] leading-none -ml-40">auto</h1>
              </div>
              <img
                className="absolute girl left-1/2 -bottom-[150%] -translate-x-1/2 scale-[3] rotate-[-20deg] "
                src="./girlbg.png"
                alt=""
              />
            </div>
            <div className="bottombar text-white bg-gradient-to-t from-black to-transparent  w-full py-10 px-10 absolute left-0 bottom-0">
              <div className="flex items-center gap-4">
                <IoIosArrowRoundDown className="text-[40px]" />
                <h3 className="font-[Helvetica_Now_Display] text-2xl">
                  Scroll Down
                </h3>
              </div>
              <img
                className="absolute h-[57px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>
          <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="cntt flex text-white w-full h-[80%] ">
              <div className="left relative w-1/2 h-full">
                <img
                  className="absolute scale-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="right w-[30%]">
                <h1 className="text-7xl">Still Running,</h1>
                <h1 className="text-7xl">Not Hunting</h1>
                <p className="mt-10 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Distinctio possimus, asperiores nam, omnis inventore nesciunt
                  a architecto eveniet saepe, ducimus necessitatibus at
                  voluptate.
                </p>
                <p className="mt-3 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
                <p className="mt-10 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
                <button className="bg-yellow-500 px-7 py-7 text-black mt-7 text-4xl hover:bg-white hover:text-black cursor-pointer transition-all duration-300 rounded-sm">
                  Download Now
                </button>
              </div>
            </div>
          </div>
          <div className="imagslider bg-black pb-5 w-full h-screen flex flex-col items-center justify-center">
            <h1 className="text-white -mt-7 text-7xl">Gallery</h1>
                        <div className="slider relative pt-5 w-[80%] h-full">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className={`absolute w-full rounded-sm h-full object-cover  transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="footer bg-black w-full h-screen"></div>
        </div>
      )}
    </>
  );
};

export default App;

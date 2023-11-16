// import React, { useRef, useState } from "react";

// // Define the items for the carousel
// const items = [
//   {
//     src: "https://source.unsplash.com/random/800x600?nature",
//     title: "Nature",
//   },
//   {
//     src: "https://source.unsplash.com/random/800x600?city",
//     title: "City",
//   },
//   {
//     src: "https://source.unsplash.com/random/800x600?people",
//     title: "People",
//   },
// ];

// // Define the component for the carousel
// const CarouselComponent = () => {
//   // Define the state for the current item index
//   const [index, setIndex] = useState(0);
//   const carouselContainer = useRef<HTMLElement>(null);
//   const [carouselIndex, setCarouselIndex] = useState(0);

//   // Define the function to handle the carousel change
//   const handleCarouselChange = (selectedIndex: any) => {
//     setIndex(selectedIndex);
//   };

//   // Define the function to render each item
//   const renderItem = (item: any) => {
//     return (
//       <div className="carousel-item">
//         <img src={item.src} alt={item.title} className="d-block w-100" />
//         <div className="carousel-caption d-none d-md-block">
//           <h3>{item.title}</h3>
//         </div>
//       </div>
//     );
//   };
//   // Define an array of fade durations in milliseconds
//   const fadeDurations = [500, 1000, 1500];

//   // Define an array of fade effects
//   const fadeEffects = ["fade", "slide", "zoom"];

//   const activeCarousel = "bg-green-300 relative order-1";
//   const inactiveCarousel = "bg-pink-300 absolute left-4";

//   const fadeItems = () => {
//     // console.log(carouselContainer.current.childNodes);
//     const carouselItems = carouselContainer.current?.childNodes!;
//     [carouselItems].map((ec, index) => {
//       //   const to = setTimeout(() => {
//       //     // ec.classList.remove(activeClass);
//       //     // ec.classList.add("relative");
//       //   }, 2000);
//       //   clearTimeout(to);
//       carouselItems[carouselIndex].classList.remove(inactiveCarousel);
//       console.log(carouselItems[carouselIndex].classList.value);
//       console.log(carouselItems[carouselIndex]);
//       if (index === carouselIndex) {
//         carouselItems[carouselIndex].classList.add(activeCarousel);
//         setCarouselIndex(carouselIndex + 1);
//         if (carouselIndex == carouselItems.length) {
//           setCarouselIndex(0);
//         }
//       }
//     });
//   };

//   // Return a JSX element for the carousel
//   return (
//     // <div className="carousel-container">
//     //   <div className="">
//     //     {items.map((item, i) => (
//     //       <div key={i} className={`carousel-item ${fadeEffects[i]}`}>
//     //         {renderItem(item)}
//     //       </div>
//     //     ))}
//     //   </div>
//     //   <button onClick={() => handleCarouselChange(index - 1)}>Prev</button>
//     //   <button onClick={() => handleCarouselChange(index + 1)}>Next</button>
//     // </div>
//     <>
//       <section
//         className="flex flex-row bg-yellow-400 p-8 space-x-4"
//         ref={carouselContainer}
//       >
//         {items.map((item, index) => (
//           <div
//             className={`min-w-[400px] h-[400px] ${
//               index + 1 === 1 ? activeCarousel : inactiveCarousel
//             }`}
//             data-carousel-item={index + 1}
//           >
//             Item - {index + 1}
//           </div>
//         ))}
//         {/* <div
//           className={`bg-pink-300 flex-1 min-w-[400px] h-[400px] absolute left-4`}
//         ></div>
//         <div className={`bg-blue-300 min-w-[400px] h-[400px] relative`}></div> */}
//       </section>
//       <button onClick={fadeItems}>Btn one</button>
//     </>
//   );
// };

// export default CarouselComponent;

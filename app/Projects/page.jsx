"use client"

import "./projects.css"
import React, { useEffect } from "react";


function Projectpage() {
  useEffect(() => {
    // Function to open the modal with the clicked image
    function openModal(imageSrc) {
      modal.style.display = "flex"; // Display the modal
      modalImage.src = imageSrc; // Set the image source in the modal
    }

    // Function to close the modal
    function closeModal() {
      modal.style.display = "none"; // Hide the modal
    }

    // Get the modal element
    var modal = document.querySelector(".full-img");

    // Check if the modal exists before proceeding
    if (modal) {
      // Get the image and modal content elements
      var modalImage = modal.querySelector("img");

      // Attach click event handlers to each image in the gallery
      var galleryImages = document.querySelectorAll(".gallery img");
      galleryImages.forEach(function (image) {
        image.addEventListener("click", function () {
          var imageSrc = image.src;
          openModal(imageSrc);
        });
      });

      // Get the close button inside the modal
      var closeButton = modal.querySelector(".close");

      // Attach click event handler to the close button if it exists
      if (closeButton) {
        closeButton.addEventListener("click", closeModal);
      }

      // Close the modal if the user clicks outside of it
      window.onclick = function (event) {
        if (event.target === modal) {
          closeModal();
        }
      };

      // Cleanup the event listeners when the component is unmounted
      return () => {
        galleryImages.forEach(function (image) {
          image.removeEventListener("click", openModal);
        });

        if (closeButton) {
          closeButton.removeEventListener("click", closeModal);
        }

        window.onclick = null;
      };
    }
  }, []);


  return (
    <div className="overflow-x-hidden m-auto py-24">
      <div className="py-10 text-center">
        <h1 className="lg:leading-[60px] text-4xl lg:text-6xl my-3 young-serif-font ">PROJECTS</h1>
        <p className="font-sans">Few of our recent projects. </p>
      </div>

      {/* lightbox model to display the images fully individually currently i have set display to hidden and i have the first img in the main gallery in there just for demonstration  */}
      <div className="full-img z-[100] w-full h-full hidden items-center justify-center fixed top-0 left-0 bg-[rgba(0,0,0,0.8)] ">
        <img className="" src="" alt="" />
        <span className=" absolute right-[5%] top-[10%] text-[30px] text-white cursor-pointer close">X</span>
      </div>

      {/* end of model*/}


      {/*main gallery*/}
      <div className="gallery-container py-[50px] px-[8%] ">
        <div className="gallery ">
          <img src="/images/portfolio6.jpg" alt="" />
          <img src="/images/portfolio2.jpg" alt="" />
          <img src="/images/portfolio1.jpg" alt="" />
          <img src="/images/portfolio8.jpg" alt="" />
          <img src="/images/design.jpg" alt="" />
          <img src="/images/ibrand1.jpg" alt="" />
          <img src="/images/portfolio7.jpg" alt="" />
          <img src="/images/design1.jpg" alt="" />
          <img src="/images/logo.jpg" alt="" />
          <img src="/images/portfolio5.jpg" alt="" />
          <img src="/images/mine.jpg" alt="" />
          <img src="/images/logo2.jpg" alt="" />
          <img src="/images/FLYER.jpg" alt="" />
          <img src="/images/portfolio3.jpg" alt="" />
          <img src="/images/shop1.jpg" alt="" />
          <img src="/images/shop2.jpg" alt="" />
        </div>
      </div>
      <div className="btn mt-10 flex justify-between max-w-[1500px] m-auto px-6">
        <a href="/images/videography.pdf">
          <button className="border py-1 px-3 font-bold">View more</button>
        </a>
        <a href="/Contact">
          <button className="border py-1 px-3 font-bold bg-blue-500 rounded">👋 Hire us</button>
        </a>
      </div>
    </div>

  )
}

export default Projectpage
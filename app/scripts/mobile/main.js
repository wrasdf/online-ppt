"use strict";

var mySlider = new Swiper('.swiper-container',{
    createPagination: false,
    mode: 'vertical',
    onFirstInit: function(swiper){
    	addEffectForSlide(swiper);
    	cleanEffectForsiblingSlide(swiper);
    },
    onSlideChangeEnd: function(swiper){
    	addEffectForSlide(swiper);
    	cleanEffectForsiblingSlide(swiper);
    }
});

function addEffectForSlide(swiper){

	var currentSlide = $('.swiper-slide').eq(swiper.activeIndex);
	currentSlide.find("section").addClass("animated bounceInUp show");
	
}

function cleanEffectForsiblingSlide(swiper){

	var currentSildeIndex = swiper.activeIndex;
	var slides = $('.swiper-slide');
	
	if(slides.eq(swiper.activeIndex-1)[0]){
		slides.eq(swiper.activeIndex-1).find("section").removeClass("animated bounceInUp show");
	}

	if(slides.eq(swiper.activeIndex+1)[0]){
		slides.eq(swiper.activeIndex+1).find("section").removeClass("animated bounceInUp show");
	}

} 
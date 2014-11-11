"use strict";

function addEffectForSlide(swiper){

	var currentSlide = $('.swiper-slide').eq(swiper.activeIndex);
	currentSlide.find("section").addClass("animated bounceInUp show");

}

function cleanEffectForsiblingSlide(swiper){

	var slides = $('.swiper-slide');
	var currentSildeIndex = swiper.activeIndex;
	
	if(slides.eq(currentSildeIndex-1)[0]){
		slides.eq(currentSildeIndex-1).find("section").removeClass("animated bounceInUp show");
	}

	if(slides.eq(currentSildeIndex+1)[0]){
		slides.eq(currentSildeIndex+1).find("section").removeClass("animated bounceInUp show");
	}

} 

new Swiper('.swiper-container',{
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


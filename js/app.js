var pixApp =  {

	urlString :null,
	urlString2 :null,
	pixArray : null,
	url :null,
	term:null,
	displayArray:null,
	param:[],
	imageSource:null,
	lat:6.4531,
	lng:3.3958,
	farmId:null,
	server:null,
	secret:null,
	pixId:0,
	marker:null,
	imgTitle:null,
	imageSrc:null,

 	initialize: function() {

 				$("#searchBtn").click(pixApp.search);
 				$("#inputField").submit(pixApp.search);	
 				$("#pixList").on('click','#imgSelected',pixApp.imageSelected);
 				
 				pixApp.homePage("#recent","flickr.photos.getRecent");
 				pixApp.homePage("#interesting","flickr.interestingness.getList");
 				/*pixApp.setTimer();*/
 				pixApp.litebox();
 				/*$("body").append('<div id="overlay"></div>');*/
 				$('#overlay').click(function(){$(this).hide();});
 				google.maps.event.addDomListener(window, 'load', pixApp.mapInit(pixApp.lat,pixApp.lng));
        
        				},

  homePage : function(place,check) {

  				pixApp.url = "https://api.flickr.com/services/rest/?method="+check+"&api_key=6bf279c5f9d9e36bea5b3fb83f"+
        		"7a44f6&has_geo=1&extras=geo&per_page=20&page=1&format=json&jsoncallback=?";

    			$.getJSON(pixApp.url,{},function(response){
				    			console.log(response);
									pixApp.pixArray = response;
									pixApp.param = response.photos.photo;
    				//get selected div and 

    				if(pixApp.param.length < 1){
						alert("No Recent Object Found");
					  }
					   else{
    				$.each(pixApp.param, function(index,value){
									pixApp.imageSource(pixApp.param[index],place);
    														});
    							}
    												});
    						},


	 clearAll : function () {
	  			$("#prevImage").empty();
	  			$("#pixList").empty();
	  			$("#preview").empty();
	  			$('#path').empty();

  								},
 	search : function (e) {
 				e.preventDefault();
 				pixApp.term = $.trim($("#inputField").val());
				if(pixApp.term==""||pixApp.term.length < 2) {
				alert("Please Enter A Valid Name Tag");
				}
				else
				{
				
				pixApp.clearAll();   
        		pixApp.url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6bf279c5f9d9e36bea5b3fb83f"+
        		"7a44f6&tags="+pixApp.term+"&has_geo=1&extras=geo&format=json&jsoncallback=?";
				pixApp.flickrSearch();
				}
 								},
 	flickrSearch : function () {

					$.getJSON(pixApp.url,{},pixApp.callback);
 				  
 											},

 	callback : function (response) {
 		//this pastes all returned items into the div holding the image

					console.log(response);
					pixApp.pixArray = response;
					pixApp.param = response.photos.photo;

					if(pixApp.param.length < 1){
						alert("No Object Found Relating to "+pixApp.term);
					  }
						else {

					$.each(pixApp.param, function(index,value){
					pixApp.pixId = index;
					pixApp.imageSource(pixApp.param[index],"#pixList");	
					});
					}
 										},

 	imageSource : function (data,place){

					pixApp.lat = data.latitude;
					pixApp.lng = data.longitude;	
					pixApp.farmId = data.farm;
					pixApp.server = data.server;
					pixApp.secret = data.secret;
					pixApp.pId = data.id;
					pixApp.imgTitle = data.title;
					

					var imgSrc = '<div class="slide"><a>';
							imgSrc += '<img id="imgSelected" rel="'+pixApp.pixId+'" src="https://farm'+pixApp.farmId+'.staticflickr.com/';
							imgSrc += pixApp.server +'/'+pixApp.pId +'_'+pixApp.secret+'.jpg">';
							imgSrc += '</a></div>';

							$(place).append(imgSrc);

									},

 	imageSelected : function(){



 				//make sure you biuld the overlay here
 				
 				//end of biulding overlay

				var imageId = $(this).attr("rel");
				$("#preview").empty();
				pixApp.litebox();
				pixApp.imageSource(pixApp.param[imageId],"#preview");
				pixApp.mapInit(pixApp.lat,pixApp.lng);
				/*pixApp.mapInit(pixApp.lat,pixApp.lng);*/
				
				var info = '<p>Search Word : '+pixApp.term+'</br>Image Title : '+pixApp.param[imageId].title+'</br>Latitude : '+pixApp.lat+
				'</br>Longitude :'+pixApp.lng+'</p>';
				$('#mapSlideData').empty();
				$('#mapSlideData').append(info);
				
				//now show the overlay
				$("#overlay").show();
				pixApp.mapInit(pixApp.lat,pixApp.lng);
											},

 		displayPix : function (data) {
		 		$.each(data, function(index,value) {
		 				pixList +='<li><img src="'+pixApp.imageSource +'"/></li>';
		 		});
 														},
 
 /******************************this is where the map application starts to function *****************/
 		mapInit : function (lat , lng) {
	 			var mapCanvas = document.getElementById('mapper');
	      		var mapOptions = {
	      		 center: new google.maps.LatLng(lat, lng),
	      		 zoom: 8,
	       		mapTypeId: google.maps.MapTypeId.ROADMAP
	      		  						}
	      		var map = new google.maps.Map(mapCanvas, mapOptions);
	      		var marker = new google.maps.Marker({
		    	position: new google.maps.LatLng(lat, lng),
		    	map: map,
		    	title: 'Hello World!'
		 		 					});
	      },

	    litebox : function (e){

					var image = '<div id="mapper"></div><div id="mapSlide" class="mapS"><div id="mapSlideData"></div>'+
						'<div><div id="nextImage"><div id="preview"></div></div>';

					$("#overlay").empty();
					// Appending the image
					$("#overlay").append(image);
					
				
	    }
 	
    };


$(document).ready(pixApp.initialize);
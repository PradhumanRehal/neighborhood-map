var locations = [
	{title: 'first one', location: {lat: 40.741359,lng: -73.99202439}, marker: '', selected:false, infoWindow: ''},
	{title: 'second one', location: {lat: 40.741359,lng: -73.99302439}, marker: '', selected:false, infoWindow: ''},
	{title: 'third one', location: {lat: 40.741359,lng: -73.99102439}, marker: '', selected:false, infoWindow: ''}
];

var MapList = function(data){
	this.title = ko.observable(data.title);
	this.location = ko.observable(data.location);
	this.marker = ko.observable(data.marker);	
};

var initMap = function(){
		return new google.maps.Map(document.getElementById('map'),{
		center: {lat: 40.741359,lng: -73.99102439999996},
		zoom: 15
	});
};

var ViewModel = function(){
	var self = this;

	self.map = initMap();

	self.createMarker = function(location){
		var marker = new google.maps.Marker({
			map: self.map,
			position: location.location,
			title: location.title,
			//animation: google.maps.Animation.DROP
		});

		//marker.animation =  google.maps.Animation.BOUNCE;
		marker.addListener('click',function(){
			self.clickListener(marker);
		}); 
		return marker;
	};

	self.markers = ko.observableArray([]);

	locations.forEach(function(location){
		self.markers.push(new self.createMarker(location));
	});

	console.log(self.markers().length);

	self.infowindow = new google.maps.InfoWindow();

	self.clickListener = function(marker){
		google.maps.event.addListener(marker,'click',function(){
          	self.populateInfoWindow(this);	
		});
	};

	self.populateInfoWindow = function(marker) {
		if(self.infowindow.marker != marker){
			self.infowindow.marker = marker;
			self.infowindow.setContent(marker.title);
			self.infowindow.open(map,marker);
			self.infowindow.addListener('closeclick',function(){
            self.infowindow.marker = null;
            marker.setAnimation(false);
          });
		}
		for(var i=0; i<self.markers().length; i++){
			if(self.markers()[i] == marker){
				self.markers()[i].setAnimation(google.maps.Animation.BOUNCE);
			}
			else{
				self.markers()[i].setAnimation(false);
			}
		}
	};
};

ko.applyBindings(new ViewModel());
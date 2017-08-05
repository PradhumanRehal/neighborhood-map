var model = [
	{
		title: 'first one',
		location: {lat: 40.741359,lng: -73.99202439},
		maker: '',
		infoWindow: ''

	},
	{
		title: 'second one',
		location: {lat: 40.741359,lng: -73.99302439},
		marker: '',
		infoWindow: ''
	},
	{
		title: 'third one',
		location: {lat: 40.741359,lng: -73.99102439},
		marker: '',
		infoWindow: ''
	}
];

var MapList = function(data){
	this.title = ko.observable(data.title);
	this.location = ko.observable(data.location);
	this.marker = ko.observable(data.marker);	
};

var ViewModel = function(){
	var self = this;

	this.mapList = ko.observableArray([]);
	this.map='';
	this.default = {lat: 40.741359,lng: -73.99102439999996};
	this.markers = [];

	model.forEach(function(mapItem){
		self.mapList.push(new MapList(mapItem));
	});

	this.displayAlert = function(){
		console.log('log');
	};

	var initMap = function(){
		self.map = new google.maps.Map(document.getElementById('map'),{
			center: self.default,
			zoom: 15
		});
		createMarker();
	};

	var infowindow = new google.maps.InfoWindow();

	var createMarker = function() {
		var marker='';
		model.forEach(function(data){
			marker = new google.maps.Marker({
				map: self.map,
				position: data.location,
				title: data.title,
				animation: google.maps.Animation.DROP,
			});

			clickListener(marker);
		});	
	};

	var clickListener = function(marker){
		google.maps.event.addListener(marker,'click',function(){
          	populateInfoWindow(this,infowindow);
		});
	};	

	var populateInfoWindow = function(marker,infowindow) {
		var contentString = '<div id="content">'+
		'<h1 class="first-heading">'+ marker.title +'</h1>'+
		'</div>';

		if(infowindow.marker != marker){
			infowindow.marker = marker;
			infowindow.setContent(contentString);
			infowindow.open(map,marker);
			infowindow.addListener('closeClick',function(){
            infowindow.setMarker(null);
          });
		}
		//return infowindow;
	};

	this.initialize = initMap();
};

ko.applyBindings(new ViewModel());
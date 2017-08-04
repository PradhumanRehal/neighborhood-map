var model = [
	{
		title: 'first one',
		location: {lat: 40.741359,lng: -73.99202439},
		maker: '',
		infoWindow: ''

	},
	{
		title: 'second one',
		location: {lat: 40.741359,lng: -73.99102439},
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
};

var ViewModel = function(){
	var self = this;

	this.mapList = ko.observableArray([]);
	this.map='';
	this.default = {lat: 40.741359,lng: -73.99102439999996};

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
	};


	this.initialize = initMap();
};

ko.applyBindings(new ViewModel());
var model = [
	{
		title: 'first one',
		location: {lat: 40.741359,lng: -73.99202439},
		maker: ''

	},
	{
		title: 'second one',
		location: {lat: 40.741359,lng: -73.99102439},
		marker: ''
	},
	{
		title: 'third one',
		location: {lat: 40.741359,lng: -73.99102439},
		marker: ''
	}
];

var ViewModel = function(){
	var self = this;

	this.mapList = ko.observableArray([]);

	model.forEach(function(mapItem){
		self.mapList.push(new MapList(mapItem));
	});

	this.displayAlert = function(){
		console.log('log');
	};
};

var MapList = function(data){
	this.title = ko.observable(data.title);
	this.location = ko.observable(data.location);	
};

function initMap(){
	var map =new google.maps.Map(document.getElementById('map'),{
		center: {lat: 40.741359,lng: -73.99102439999996},
		zoom: 15
	});
	
	
	
}


ko.applyBindings(new ViewModel());
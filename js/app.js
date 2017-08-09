var locations = [
	{title: 'Delhi Gate (Red Fort)', location: {lat: 28.656159,lng: 77.24102}, marker: '', selected:false, infoWindow: '', wikiData:''},
	{title: 'Lotus Temple', location: {lat: 28.553492,lng: 77.258826}, marker: '', selected:false, infoWindow: '', wikiData:''},
	{title: 'India Gate', location: {lat: 28.61094,lng: 77.234482}, marker: '', selected:false, infoWindow: '', wikiData:''},	
	{title: 'National Zoological Park Delhi', location: {lat: 28.603018,lng: 77.246548}, marker: '', selected:false, infoWindow: '', wikiData:''},
	{title: 'Qutb Minar', location: {lat: 28.524428,lng: 77.185456}, marker: '', selected:false, infoWindow: '', wikiData:''},
	{title: 'National Rail Museum, New Delhi', location: {lat: 28.585499,lng: 77.180089}, marker: '', selected:false, infoWindow: '', wikiData:''}
];

var initMap = function(){
		return new google.maps.Map(document.getElementById('map'),{
		center: {lat: 28.613939,lng: 77.209021},
		zoom: 11
	});
};

var ViewModel = function(){
	var activeMarker;
	var self = this;
	self.query = ko.observable('');

	self.map = initMap();

	self.createMarker = function(location){
		var marker = new google.maps.Marker({
			map: self.map,
			position: location.location,
			title: location.title,
			animation: google.maps.Animation.DROP,
		});

		marker.addListener('click',function(){
			self.populateInfoWindow(marker);
			self.resetMarker(marker);
		}); 
		
		return marker;

	};

	self.markers = ko.observableArray([]);

	locations.forEach(function(location){
		self.markers.push(new self.createMarker(location));
	});

	self.infowindow = new google.maps.InfoWindow();

	self.getWikiData = function(){
		var wikiQuery;

		for(var i=0; i<self.markers().length; i++){
			wikiQuery = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + self.markers()[i].title + '&srproperties=snippet&format=json&callback=wikiCallback';
			
			$.ajax({
				url: wikiQuery,
				dataType:'jsonp',
				success: function(data) {
					for(var i=0; i<self.markers().length; i++){
						if(data[1][0] == self.markers()[i].title){
							self.markers()[i].wikiData=data[2][0];
						}
					}
				}
			});			
		}
	};

	self.resetMarker=function(marker){
		if(activeMarker){
		activeMarker.setAnimation(false);
		activeMarker.setIcon('https://mt.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png');	
		}
		marker.setAnimation(google.maps.Animation.BOUNCE);
		marker.setIcon('https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-waypoint-blue.png&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1');
		activeMarker = marker;
	};



	self.populateInfoWindow = function(marker) { 
		self.getWikiData();
		if(self.infowindow.marker != marker){
			self.infowindow.marker = marker;
			self.infowindow.setContent('<h2>'+marker.title+'</h2>'+'<p>'+marker.wikiData+' source Wikipedia</p>');
			self.infowindow.open(map,marker);
			self.infowindow.addListener('closeclick',function(){
            self.infowindow.marker = null;
            marker.setAnimation(false);
          });
		}
	};


	self.search = function(){
		var queryLower = self.query().toLowerCase();
		var locationList = $('.list-item').first();
		var numLocationList =$('.list-item').toArray().length;
		for(var i=0; i<numLocationList; i++){
			if(locationList.hasClass('item-hidden')){
				locationList.removeClass('item-hidden');
					self.markers()[i].setVisible(true);
			}

			if(locationList.text().toLowerCase().search(queryLower)<0 && self.markers().title!=locationList.text()){
				locationList.addClass('item-hidden');
				self.markers()[i].setVisible(false);
				self.infowindow.close();
			}
			locationList = locationList.next();
		}
	};
};

ko.applyBindings(new ViewModel());

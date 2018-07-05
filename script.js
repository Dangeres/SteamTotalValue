var now_page = 0;
var state_ = true;
var total_price = 0;

function get_pack(){
	var count_ = 100;
	var link_ = 'https://steamcommunity.com/market/myhistory/render/?l=english&start='+now_page+'&count='+count_;

	var xhr = new XMLHttpRequest();

	xhr.open('GET', link_, false);

	xhr.send();

	if (xhr.status != 200) {
	  console.log( xhr.status + ': ' + xhr.statusText ); // if you have bad status will print 404: Not Found
	} else {
		var answ = JSON.parse(xhr.responseText);
		var page = document.createElement( 'html' );
		page.innerHTML = answ['results_html'];
		var items = page.getElementsByClassName('market_listing_row market_recent_listing_row');
		
		for(var i=0; i<items.length; i++){
			var childs = items[i].childNodes;
			var anitemsold = childs[1].innerHTML.trim();
			//console.log(anitemsold);
			if( anitemsold == '-'){
      
				/*
				console.log(items[i]);
				console.log(childs);
				*/
        
				var anitemname = childs[13].childNodes[1].innerHTML;
				var anitemdesc = childs[13].childNodes[5].innerHTML;
				//console.log(anitemname);
				if(anitemdesc.indexOf('Intergalactic Steam Summer Sale Trading Card') != -1){
					var price = childs[5].innerText.trim().split(' ')[0].replace(',','.');
					total_price += parseFloat(price);
					console.log(items[i]);
				}
				//console.log('----------');
			}
		}
		
		//state_ = false;
		
		var date = items[items.length-1].childNodes[11].innerHTML.trim().split(' ');
		//console.log(date);
		
		if(answ['assets'].length == 0 || (date[1] != 'Jun' && date[1] != 'Jul')){
			state_ = false;
		}
		
		now_page += count_;
		
		console.log('page of '+(now_page/count_));
	}
}

var ticker = setTimeout(function tick() {
  if(state_){
	get_pack();
	ticker = setTimeout(tick, 1000);
  }else{
	console.log(total_price.toFixed(2));
  }
}, 1000);

var database;
var emailid = "amit.m@carwale.com";
database = initialize();

function initialize() {
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyBZLjAibU87dTVm4-9LwEXSP3lrN1fO31M",
	    authDomain: "tab-manager-6664d.firebaseapp.com",
	    databaseURL: "https://tab-manager-6664d.firebaseio.com",
	    projectId: "tab-manager-6664d",
	    storageBucket: "tab-manager-6664d.appspot.com",
	    messagingSenderId: "860645458052",
	    appId: "1:860645458052:web:32f8786cb8b1c2b48402d1",
	    measurementId: "G-WPHWP33MWQ"
	};
	firebase.initializeApp(config);
	var Auth = firebase.auth();
	console.log(firebase);
  
	database = firebase.database();
	
	return database;
}

function getvalidkey(key) 
{
	//Getting valid key by removing ".", "#", "$", "[", or "]" from the key
	var validkey="";
	for(var i=0;i<key.length;i++) {
		if(key[i]!="." && key[i]!="#" && key[i]!="$" && key[i]!="[" && key[i]!="]") {
			validkey=validkey.concat(key[i]);
		}
	}
	return validkey;
}

//changes
function checkValidity(username, password){
	var ref = database.ref();
	var key = getvalidkey(username);
	ref.once('value').then(function(snapshot){
		//console.log(key);
		if(snapshot.hasChild(key)) {
			chrome.storage.sync.set({"loggedinuser":[username,password]}, function() {
				document.getElementById("yet_to_login").style.display = "none";
				document.getElementById("loggedin").style.display = "block";
				var url = "chrome-extension://"+chrome.runtime.id+"/home.html";
				chrome.tabs.create({url: url});
			});
		}
		else 
		{
			alert("Wrong id/pass");
		}
		
	});
}
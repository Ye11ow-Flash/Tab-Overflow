var database;
var emailid = "";
database = initialize();

function initialize() {
	// Initialize Firebase
	var config = {
		apiKey: "",
	    authDomain: "",
	    databaseURL: "",
	    projectId: "",
	    storageBucket: "",
	    messagingSenderId: "",
	    appId: "",
	    measurementId: ""
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

var puppeteer=require("puppeteer");

//returs status, name, img

exports.login=async function (user_name,password){

	var browser= await puppeteer.launch({headless:false});
	var page= await browser.newPage();
	await page.goto("https://mbasic.facebook.com/",{waitUntil:"networkidle2"});
	console.log("loging in user.......");
	await page.type("[name=email]",user_name);
	await page.type("[name=pass]",password);
	await page.keyboard.press("Enter");
	await page.waitFor(5000);
	await page.goto("https://mbasic.facebook.com/profile");
	await page.waitFor(5000);
	var auth= await page.evaluate(function(){
		return document.URL});

	if(auth=="https://mbasic.facebook.com/?refsrc=https%3A%2F%2Fmbasic.facebook.com%2Fprofile&_rdr"){
		console.log("incorrext username/password");
		browser.close();
		return {status:false,
				name:"username/password incorrect",
				img:null};
	}
	else if(auth=="url"){		//url needs to be added::
		console.log("2factrory authenticatoin system\n cannot carry out futher operation :/")
		browser.close();
		return{statue:false,
				name:"soory cannot carry out 2factrory authenticatoin system",
				img:null};
		}
	else{
		console.log("user authenticated /n retriving information...........");
		//validate given information
		var info= await page.evaluate(function(){
			let link= document.getElementById("u_0_0");
			if(link==null || link.href==undefined ){
			link=document.getElementById("u_0_1");
			};
		
			return {name:document.title,
					link:link.href}
		});
		console.log("sucessfully loged_in as"+info["name"]);
		await page.goto(info["link"]);         
		await page.waitFor(5000);
		var link=await page.evaluate(function(){
			return document.getElementsByTagName("img")[1].src  //problem solved 
		})
		console.log(link);
		console.log("all done");
		await browser.close();
		return {status:true,
				name:info.name,
				img:link

				}
	};



};




		/*var str = "file:///C:/ProgFiles/Roman/XML/GitHub/Whatsapp/whatsapp.html";
		var decode = btoa(str);
		alert (decode + `\n` + atob(decode));*/
		
		function detect_platform() { 
			return ( navigator.userAgent.match(/Android/i)
				|| navigator.userAgent.match(/webOS/i)
				|| navigator.userAgent.match(/iPhone/i)
				|| navigator.userAgent.match(/iPad/i)
				|| navigator.userAgent.match(/iPod/i)
				|| navigator.userAgent.match(/BlackBerry/i)
				|| navigator.userAgent.match(/Windows Phone/i)
			) ? true : false;
		}
		
		function getNum() {			
			var num = parseInt($("#number").val().replace(/\D/g,'')) + '';
			num = $("#country_code").val().replace(/\D/g,'') + num;
			return num;
		}
		
		useWhatsapp = function () {
			var num = getNum();
			if (num == '') return;
			var txt = $("#txt").val();
			
			var url = detect_platform() ? 'api' : 'web';
			url = `https://${url}.whatsapp.com/send?phone=${num}&text=${txt}`;
			window.location.href = url;
		}
		
		useTel = function (func) {
			var num = getNum();
			if (num == '') return;

			var userName = $("#userName").val();
			var url;
			switch (func) {
				case "tel":  
					if (getNum == '') return;
					url = `tel:${num}`; break;
					
				case "skype1": 
					if (getNum == '') return;
					url = `skype:${num}?call`; break; 
					
				//case "skype1": url = "callto://" + `${num}`; break; 
				case "skype2": url = `skype:${userName}?call`; break; 
				case "skype3": url = `skype:${userName}?chat`; break; 
				//case "skype3": url = `skype:${userName}`; break; 
			}
			
			window.location.href = url;
		}

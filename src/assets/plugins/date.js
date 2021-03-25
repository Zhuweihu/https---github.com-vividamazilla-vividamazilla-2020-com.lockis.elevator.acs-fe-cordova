Date.prototype.format = function (format) {
    //eg:format="yyyy-MM-dd hh:mm:ss";
		// console.log(format)
    // if (!format) {
    //     format = "yyyy-MM-dd hh:mm:ss";
    // }
	// format='dd-MMM-yyyy''
	var types=format
    var o = {
        "M+": this.getMonth() + 1,  // month
        "d+": this.getDate(),       // day
        "H+": this.getHours(),      // hour
        "h+": this.getHours(),      // hour
        "m+": this.getMinutes(),    // minute
        "s+": this.getSeconds(),    // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds()
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }

	if(types=='yyyy-MMM-dd'){

			var monthNames = [
		    "Jan", "Feb", "Mar",
		    "Apr", "May", "Jun", "Jul",
		    "Aug", "Sep", "Oct",
		    "Nov", "Dec"
		  ];
			var	date=new Date(format)
		  var day = date.getDate();
		  var monthIndex = date.getMonth();
		  var year = date.getFullYear();

		  format= day + '-' + monthNames[monthIndex] + '-' + year;

	}






    return format;
};

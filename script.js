console.log("javascript loaded");

function calendar(params) {
  const storedPeriods = JSON.parse(localStorage.getItem('days')) || [];

  var days_labels = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'],
      months_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  var days_in_month = getDaysInMonth(params.month, params.year),
      first_day_date = new Date(params.year, params.month, 1),
      first_day_weekday = first_day_date.getDay();
  
  var prev_month = params.month == 0 ? 11 : params.month - 1,
      prev_year = prev_month == 11 ? params.year - 1 : params.year,
      prev_days = getDaysInMonth(prev_month, prev_year);
  
  // calendar header
  var html = '<h2>' + months_labels[params.month] + ' ' + params.year + '</h2>';
  
  function getDaysInMonth(month, year) {
    // 0 = last day of the previous month
    return new Date(year, month + 1, 0).getDate();
  }
  
  // calendar content
  html += '<table class="calendar-table">';
  
  // week days labels
  html += '<tr class="week-days">';
  for (var i = 0; i <= 6; i++) {
    html += '<td class="day">';
    html += days_labels[i];
    html += '</td>';
  }
  html += '</tr>';
  
  var w = 0; // week day
  var n = 1; // next days date
  var c = 1; // current date
  
  // dates loop
  for (var i = 0; i < 6*days_labels.length; i++) {
    if (w == 0) {
      // first week's day
      html += '<tr class="week">';
    }    
    
    if (i < new Date(params.year, params.month, 1).getDay()) {
      // previous month's day
      html += '<td class="day other-month">' + (prev_days - first_day_weekday + i + 1) + '</td>';
    } else if (c > days_in_month) {
      // next month's day
      html += '<td class="day other-month">' + n + '</td>';
      n++;
    } else {
      // current month's day
      var display_date = new Date(params.year, params.month, c);
      
      const dayMatch = storedPeriods.filter(day =>{
      	const testDate = new Date(day);
      	return testDate.toDateString() === display_date.toDateString();
      })
	  if (dayMatch.length > 0){
	  	html += '<td class="day marked" title="' + display_date.toDateString() + '">' + c + '</td>';	
	  } else {
      	html += '<td class="day" title="' + display_date.toDateString() + '">' + c + '</td>';
      }
      c++;
    }
    
    if (w == days_labels.length - 1) {
      // last week's day
      html += '</tr>';
      w = 0;
    } else {
      w++;
    }
  }  

  html += '</tr>'; 
  return html;
}


function renderCalendar(params){
	document.getElementById('calendar').innerHTML = calendar(params);
	const allDayElements = Array.from(document.getElementsByClassName("day"))
  	allDayElements.forEach(element => element.addEventListener('click', (ev)=>{
  		const periods = JSON.parse(localStorage.getItem('days')) || [];
  		if (!periods.includes(ev.target.title)){
			localStorage.setItem('days', JSON.stringify([...periods, ev.target.title]));
			renderCalendar({
				month: currentDate.getMonth(),
  				year: currentDate.getFullYear()	
			})
  		}
	}))
}

let currentDate = new Date();
let params = {
  month: currentDate.getMonth(),
  year: currentDate.getFullYear()
};

renderCalendar(params);
//thanks to Jack NUMBER on codepen for the calendar code(https://codepen.io/jacknumber/pen/bVgLVd);

document.getElementById('back-button').addEventListener('click', ()=>{
	currentDate = new Date(currentDate.getFullYear(),currentDate.getMonth()-1)
	renderCalendar({
		month: currentDate.getMonth(),
		year: currentDate.getFullYear()
	})
})

document.getElementById('forward-button').addEventListener('click', ()=>{
	currentDate = new Date(currentDate.getFullYear(),currentDate.getMonth()+1)
	renderCalendar({
		month: currentDate.getMonth(),
		year: currentDate.getFullYear()
	})
})

document.getElementById('clear').addEventListener('click', ()=>{
	localStorage.clear()
	location.reload();
})



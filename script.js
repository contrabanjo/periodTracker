console.log("javascript loaded");


//credit to this site: https://thewebdev.info/2021/02/27/how-to-detect-a-touch-screen-device-using-javascript/
const isTouchDevice = () => {  
  return (('ontouchstart' in window) ||  
    (navigator.maxTouchPoints > 0) ||  
    (navigator.msMaxTouchPoints > 0));  
}  
console.log(isTouchDevice())


//credit to Michael Zaporozhets: https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
const mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

console.log(mobileAndTabletCheck());

let currentDate = new Date();
let params = {
  month: currentDate.getMonth(),
  year: currentDate.getFullYear()
};

if (!isTouchDevice() && !mobileAndTabletCheck()){
	document.getElementById("main").textContent = "This site currently designed for mobile use only."
} else {
	
	renderCalendar(params);
}

//thanks to Jack NUMBER on codepen for the calendar code(https://codepen.io/jacknumber/pen/bVgLVd);
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
  
  allDayElements.forEach(element => element.addEventListener('click', dayClickHandler))
}

function dayClickHandler(ev){
  let periods = JSON.parse(localStorage.getItem('days')) || [];
  if (!periods.includes(ev.target.title)){
      localStorage.setItem('days', JSON.stringify([...periods, ev.target.title]));
  } else {
    periods = periods.filter(el => el !== ev.target.title);
    localStorage.setItem('days', JSON.stringify(periods));
  }
  renderCalendar({
    month: currentDate.getMonth(),
    year: currentDate.getFullYear() 
  })
}
  


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
  const warning = createModal("are you sure you want to delete all data? this cannot be reversed.", ()=>{
    localStorage.clear()
    location.reload();
  })
  document.getElementById('main').appendChild(warning);
})

function createModal(message, callback){
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const close = document.createElement('button');
  close.textContent = "X";
  close.addEventListener('click', closeModal);
  modal.appendChild(close);

  const text = document.createElement('p');
  text.textContent = message;

  modal.appendChild(text);

  if (callback){
    const choices = document.createElement('div');

    const yes = document.createElement('button');
    yes.textContent = "yes";
    const no = document.createElement('button');
    no.textContent = "no";
    
    no.addEventListener('click', closeModal);
    yes.addEventListener('click',(ev)=>{
      callback()
      closeModal(ev);
    })

    choices.appendChild(yes);
    choices.appendChild(no);

    modal.appendChild(choices);
  }

  return modal;
}

function closeModal(ev){
  const modals = Array.from(document.getElementsByClassName("modal"));
  modals.forEach(el => el.remove())
}

document.getElementById("about").addEventListener("click", (ev)=>{
  const text = "A period tracker that will never sell your data. All data is stored on your devices localStorage. It can be deleted from this page, or by going to your phone's settings. to see the source code or learn more, go to https://github.com/contrabanjo/periodTracker"
  document.getElementById('main').appendChild(createModal(text));
})
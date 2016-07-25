function Clock( options ) {
  this._elem = options.elem;
  this._years = this._elem.querySelector('.years');
  this._months = this._elem.querySelector('.months');
  this._days = this._elem.querySelector('.days');
  this._hours = this._elem.querySelector('.hours');
  this._minutes = this._elem.querySelector('.minutes');
  this._seconds = this._elem.querySelector('.seconds');

  // По клику на таймер осуществляется старт/стоп таймера
  this._elem.onclick = (function(){
      if(this._timer === null){
        this.start();
      } else {
        this.stop();
      }
    }).bind(this);
}

 Clock.prototype._render = function() {
    let dateNow = new Date();
    let dateStart = new Date(2018, 6, 14);
    // let t = Date.parse(dateStart) - Date.parse(dateNow);
    let t = dateStart.getTime() - dateNow.getTime();
    t = Math.floor(t / 1000);
    let years = Math.floor ( t / (3600 * 24 * 365) );

    years = years + declOfNum(years,[" год", " года"," лет" ]);

    t = t % (3600 * 24 * 365);
    let months = Math.floor( (t / (3600 * 24 * 30)));

    months = months + declOfNum(months,[" месяц", " месяца"," месяцев"]);

    t = t % (3600 * 24 * 30);
    let days = Math.floor( ( t / (3600 * 24 )));

    days = days + declOfNum(days, [" день", " дня"," дней"])

    t = t % (3600 * 24);
    let hours = Math.floor( (t / 3600 ) );

    t = t % 3600;
    let min = Math.floor( (t / 60 ));

    let sec = t % 60;

    this._years.innerHTML = years;
    this._months.innerHTML= months;
    this._days.innerHTML = days;
    this._hours.innerHTML = hours;
    this._minutes.innerHTML = min;
    this._seconds.innerHTML = sec;
  }

  Clock.prototype.stop = function() {
    clearInterval(this._timer);
    this._timer = null;
  };

  Clock.prototype.start = function() {
    this._render();
    this._timer = setInterval(this._render.bind(this), 1000);
  }

  function declOfNum(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number% 100 < 20) ? 2 : cases[(number % 10 < 5 ) ? number % 10 : 5]];
  }

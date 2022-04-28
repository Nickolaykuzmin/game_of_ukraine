const start_date = new Date();
start_date.setMonth(1); // лютий 
start_date.setDate(24);

let next_day = new Date();
next_day.setMonth(1); // лютий 
next_day.setDate(24);
let count_war_days = 0;

let rus_move = 0;
let rus_from = '';
let rus_to = '';
let consolidate = true;
let max_rus_troops = 0;
let max_ua_troops = 0;

const army = {
    UKR283: {
        name: "Крим",
        troops: 40000,
        rus: true
    },
    UKR284: {
        name: "Миколаїв",
        troops: 15000,

    },
    UKR285: {
        name: "Чернігів",
        troops: 5000
    },
    UKR286: {
        name: "Рівне",
        troops: 10000
    },
    UKR288: {
        name: "Чернівці",
        troops: 10000
    },
    UKR289: {
        name: "Івано-Франківськ",
        troops: 14000
    },
    UKR290: {
        name: "Хмельницьк",
        troops: 15000
    },
    UKR291: {
        name: "Львів",
        troops: 20000
    },
    UKR292: {
        name: "Тернопіль",
        troops: 20000
    },
    UKR293: {
        name: "Закарпатття",
        troops: 5000
    },
    UKR318: {
        name: "Волинь",
        troops: 8000
    },
    UKR319: {
        name: "Черкаси",
        troops: 10000
    },
    UKR320: {
        name: "Кіровоград",
        troops: 16000
    },
    UKR321: {
        name: "Київ",
        troops: 10000
    },
    UKR322: {
        name: "Одеса",
        troops: 20000
    },
    UKR323: {
        name: "Вінниця",
        troops: 25000
    },
    UKR324: {
        name: "Житомир",
        troops: 10000
    },
    UKR325: {
        name: "Суми",
        troops: 15000
    },
    UKR326: {
        name: "Дніпропетровськ",
        troops: 15000
    },
    UKR327: {
        name: "Донецьк",
        troops: 30000,
        rus: true
    },
    UKR328: {
        name: "Харків",
        troops: 10000
    },
    UKR329: {
        name: "Луганськ",
        troops: 16000,
        rus: true
    },
    UKR330: {
        name: "Полтава",
        troops: 10000
    },
    UKR331: {
        name: "Запоріжжя",
        troops: 10000
    },
    UKR4827: {
        name: "Херсон",
        troops: 9000
    },
    BILORUS: {
        name: 'Bilorus',
        troops: 35000,
        rus: true
    }
}
const conn = {
    UKR283: ['UKR4827'],
    UKR284: ['UKR322', 'UKR320', 'UKR326', 'UKR4827'],
    UKR285: ['UKR321', 'UKR330', 'UKR325'],
    UKR286: ['UKR318', 'UKR291', 'UKR292', 'UKR290', 'UKR324'],
    UKR288: ['UKR289', 'UKR292', 'UKR290', 'UKR323'],
    UKR289: ['UKR293', 'UKR291', 'UKR292', 'UKR288'],
    UKR290: ['UKR288', 'UKR292', 'UKR286', 'UKR324', 'UKR323'],
    UKR291: ['UKR293', 'UKR289', 'UKR292', 'UKR286', 'UKR318'],
    UKR292: ['UKR289', 'UKR291', 'UKR286', 'UKR290', 'UKR288'],
    UKR293: ['UKR291', 'UKR289'],
    UKR318: ['UKR291', 'UKR286'],
    UKR319: ['UKR323', 'UKR321', 'UKR330', 'UKR320'],
    UKR320: ['UKR323', 'UKR319', 'UKR330', 'UKR326', 'UKR284', 'UKR322'],
    UKR321: ['UKR324', 'UKR323', 'UKR319', 'UKR330', 'UKR285'],
    UKR322: ['UKR323', 'UKR320', 'UKR284'],
    UKR323: ['UKR288', 'UKR290', 'UKR324', 'UKR321', 'UKR319', 'UKR320', 'UKR322'],
    UKR324: ['UKR286', 'UKR290', 'UKR323', 'UKR321'],
    UKR325: ['UKR285', 'UKR330', 'UKR328'],
    UKR326: ['UKR284', 'UKR320', 'UKR330', 'UKR328', 'UKR327', 'UKR331', 'UKR4827'],
    UKR327: ['UKR331', 'UKR326', 'UKR328', 'UKR329'],
    UKR328: ['UKR325', 'UKR330', 'UKR326', 'UKR327', 'UKR329'],
    UKR329: ['UKR328', 'UKR327'],
    UKR330: ['UKR319', 'UKR321', 'UKR285', 'UKR325', 'UKR328', 'UKR326', 'UKR320'],
    UKR331: ['UKR4827', 'UKR326', 'UKR327'],
    UKR4827: ['UKR284', 'UKR326', 'UKR331', 'UKR283']
};
var last_news = -1;
var curr_line;


function updateLegendMap(id, troops) {
    html = $(".sm_legend_item[data-id='" + id + "']").html();
    html = html.substring(0, html.indexOf('</svg>') + 6);
    html += num(troops);
    $(".sm_legend_item[data-id='" + id + "']").html(html);
}
var news = [
    'Путін Хуйло дав наказав напасти на Україну 24 лютого 2022 року',
    'Путін Хуйло сказав скласти зброю ЗСУ та розпочати денацифікацію',
    'План по захопленню Києва - провалився!',
    'Орки вбивають мирних людей та приховують свої злочини',
    'Маріуполь - не впав!',
    'З Білорусії запускають ракети',
    'Захід допомагає Україні',
    'Україна та український народ - незламний!',
];

function newsline(n) {
    if (n <= last_news) return;
    $('#line').fadeIn(300);
    last_news = n;
    text = news[n];
    d = 300;
    if (curr_line !== text) {
        timeout = 3000;
        if (!n) timeout = 1000;
        setTimeout(function() {
            $('#line').removeClass('ani').addClass('high');
            setTimeout(function() {
                $('#line').removeClass('high').addClass('ani');
            }, 6000);
        }, timeout);
        if (text.indexOf('ÐšÐ¸Ñ—Ð²') !== -1) belarus = true;
    }
    curr_line = text;
    $('#line div').html(text);
}


function count_troops() {
    max_rus_troops = 0;
    max_ua_troops = 0;

    for (let [key, value] of Object.entries(army)) {
        if (!simplemaps_countrymap_mapdata.state_specific[key]) continue;

        if (value.rus) {
            max_rus_troops += value.troops;
            if (value.troops > max_rus_troops) max_rus_troops = value.troops
        } else {
            max_ua_troops += value.troops;
            if (value.troops > max_ua_troops) max_ua_troops = value.troops
        }
    }

    updateLegendMap(0, max_ua_troops);
    updateLegendMap(1, max_rus_troops);
    updateLegendMap(2, died_ukr);
    updateLegendMap(3, died_rus);

    if (!max_rus_troops) {
        $('#line').css('background', 'yellow');
        newsline(news.length - 1);
        return;
    }
}

function update(key) {
    if (!simplemaps_countrymap_mapdata.state_specific[key]) return;
    const arm = army[key];

    max = 230;

    if (arm.rus) {
        x = max - Math.round(arm.troops / 25000 * max);
        if (x < 0) x = 0;
        color = 'rgb(255,' + x + ',' + x + ')';
        hover = 'rgb(200,' + x + ',' + x + ')';
        text = 'орків: <b>' + num(arm.troops) + '</b>';
        who = ' орків';
    } else {
        x = max - Math.round(arm.troops / 25000 * max);
        if (x < 0) x = 0;
        color = 'rgb(' + x + ', ' + x + ', 255)';
        hover = 'rgb(' + x + ', ' + x + ', 200)';
        text = 'ЗСУ: <b>' + num(arm.troops) + '</b>';
        who = ' ЗСУ';
    }
    simplemaps_countrymap_mapdata.state_specific[key].color = color;
    simplemaps_countrymap_mapdata.state_specific[key].hover_color = "#AAA";
    simplemaps_countrymap_mapdata.state_specific[key].description = text;
    simplemaps_countrymap_mapdata.state_specific[key].description = '';
    simplemaps_countrymap_mapdata.labels[key].name = num(arm.troops) + '\n' + who;

}
let clicked = 0;

function obl_click(mapId) {
    // First click
    if (rus_move) return;

    if (clicked) {
        for (const [key, value] of Object.entries(army))
            if (simplemaps_countrymap_mapdata.state_specific[key])
                simplemaps_countrymap_mapdata.state_specific[key].inactive = false;

        update(clicked);

        if (clicked === mapId) {
            clicked = 0;
            return
        }
        clear_log();
        if (count_war_days === 1) {
            const cities = ['UKR285', 'UKR325'];
            occupy_cities(cities);
            setTimeout(() => {
                log('Кончені орки напали зі сторони Білорусії!')
            }, 3000);

        }
        fight(clicked, mapId)
        clicked = 0;
        do_rus_move();

        return;
    }

    if (army[mapId].rus) return

    simplemaps_countrymap_mapdata.state_specific[mapId].color = '#ffd300';
    simplemaps_countrymap_mapdata.state_specific[mapId].hover_color = 'yellow';

    for (let [key, value] of Object.entries(army)) {
        if (!conn[mapId].includes(key) && key !== mapId && simplemaps_countrymap_mapdata.state_specific[key]) {
            simplemaps_countrymap_mapdata.state_specific[key].inactive = true;
        }
    }

    simplemaps_countrymap.refresh();
    clicked = mapId;
}

let ratio = null;
var died_rus = 0;
var died_ukr = 0;

function decide_move() {
    bestRatio = -1;

    for (let [key, value] of Object.entries(army)) {
        if (!value.rus || !conn[key]) continue;

        conn[key].forEach(to => {
            if (!army[to.rus]) {
                ratio = value.troops / army[to].troops;

                if (ratio > bestRatio) {
                    bestRatio = ratio;
                    rus_from = key;
                    rus_to = to;
                }
            }
        });
    }

    if (bestRatio === -1) {
        rus_move = 0;
        return
    }

    attack = true;
    if (consolidate || bestRatio < 0.5) {
        found = 0;
        conn[rus_from].forEach(from => {
            if (army[from].rus && army[from].troops > found) {
                found_from = from;
                found = army[from].troops;
                attack = false;
            }
        });
        if (found > army[rus_from].troops * 0.2) {
            rus_to = rus_from;
            rus_from = found_from;
            consolidate = false;
        } else if (found) {
            found = 0;
            conn[found_from].forEach(from => {
                if (from !== rus_from && army[from].rus && army[from].troops > found) {
                    found_from2 = from;
                    found = army[from].troops;
                }
            });
            if (found > army[rus_from].troops * 0.1) {
                rus_to = found_from;
                rus_from = found_from2;
                consolidate = true;
                attack = false;
            }
        }
    }
    if (attack) consolidate = true;
}

function occupy_cities(cities) {
    for (let [key, value] of Object.entries(army)) {
        if (cities.includes(key)) {
            value.rus = true;
        }
    }
}

function do_rus_move() {
    rus_move = 1;
    decide_move();

    if (!rus_move) return;
    if (simplemaps_countrymap_mapdata.state_specific[rus_from]) {
        simplemaps_countrymap_mapdata.state_specific[rus_from].color = '#ea00ff';
        simplemaps_countrymap_mapdata.state_specific[rus_from].hover_color = '#ea00ff';
        simplemaps_countrymap.refresh();
    }
    setTimeout(function() {
        simplemaps_countrymap_mapdata.state_specific[rus_to].color = '#ea00ff';
        simplemaps_countrymap_mapdata.state_specific[rus_to].hover_color = '#ea00ff';
        simplemaps_countrymap.refresh();
        setTimeout(function() {
            simplemaps_countrymap_mapdata.state_specific[rus_to].color = '#ea00ff';
            simplemaps_countrymap_mapdata.state_specific[rus_to].hover_color = '#ea00ff';
            simplemaps_countrymap.refresh();
            fight(rus_from, rus_to);
            rus_move = 0;
            const day = next_day.getDate();
            next_day.setDate(day + 1);

            recalculate_date();

            if (count_war_days >= 40) {

                if (count_war_days % 5 === 0) {
                    newsline(count_war_days / 5);
                }
            }

        }, 1000);
    }, 1000);
}


function count_days(start_date, next_day) {
    let diffTime = Math.abs(next_day - start_date);
    diffTime = diffTime === 0 ? 1 : diffTime + 1;
    const ONE_DAY = 1000 * 60 * 60 * 24;

    return Math.ceil(diffTime / ONE_DAY)
}

function recalculate_date() {
    let text = next_day.toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' });
    text = text.substring(0, text.length - 3);
    count_war_days = count_days(start_date, next_day);
    text += ` (${count_war_days} день)`
    $('#date').html(text)
}

function update_all() {
    count_troops();
    for (let [key, _] of Object.entries(army)) update(key);
    simplemaps_countrymap.refresh();
}

function addTroopsOnMap() {
    for (let [key, value] of Object.entries(army)) {
        if (simplemaps_countrymap_mapdata.state_specific[key]) {
            let who = value.rus ? 'орків' : 'ЗСУ';
            simplemaps_countrymap_mapdata.labels[key].name = `${value.troops}\n${who}`
        }
    }
}

function num(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function fight(from, to) {
    if (army[from].rus === army[to].rus) {
        moved = Math.round(army[from].troops / 2);
        army[from].troops -= moved;
        army[to].troops += moved;
        if (army[from].rus) log('Переміщено <span class="ork">' + num(moved) + '</span> в ' + army[to].name);
        else log('Переміщено <span class="zsu">' + num(moved) + '</span> до ' + army[to].name);
    } else {
        max_die = 500;
        plus = 0;
        if (army[from].troops > 2000) plus = Math.round((army[from].troops - 2000) / 10);
        max_die += plus;
        ratio = army[from].troops / army[to].troops;
        // ratio /= 2;
        if (army[from].rus) ratio /= 9;
        attackers = army[from].troops * ratio;

        if (attackers > army[to].troops) {
            if (army[to].troops < max_die) to_die = army[to].troops;
            else to_die = max_die;
            from_die = Math.round(to_die / ratio);
        } else {
            from_die = max_die;
            if (from_die > army[from].troops / 2) from_die = Math.round(army[from].troops / 2);
            to_die = Math.round(from_die * ratio);
        }
        if (army[from].rus) {
            log('Орки атакують ' + army[to].name + '</b>');
            log('Здохло орків <span class="ork">' + num(from_die) + '</span> втрати наших ЗСУ - <span class="zsu">' + num(to_die) + '</span>');
        } else {
            log('Переміщено ' + army[to].name + '</b>');
            log('Знищено <span class="ork">' + num(to_die) + '</span> орків, втрати ЗСУ - <span class="zsu">' + num(from_die) + '</span>');
        }
        army[from].troops -= from_die;
        army[to].troops -= to_die;

        if (army[from].rus) died_rus += from_die;
        else died_ukr += from_die;
        if (army[to].rus) died_rus += to_die;
        else died_ukr += to_die;

        if (!army[to].troops) {
            if (army[from].rus) log(army[to].name + ' Захоплено!');
            else log(army[to].name + 'Звільнено!');
            army[to].rus = army[from].rus;
            fight(from, to);
        }

    }
    simplemaps_countrymap.refresh();
    update_all();
}

function clear_log() {
    $('#news').html(' ');
}

function log(text) {
    $('#news').append(text + '<br>');
}

function ukraine_init() {
    recalculate_date();
    addTroopsOnMap();
    update_all();
}
/////getparams/////////////////////////////////////////////////////////////////////////////
var getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};
var params = getParams(window.location.href);
//////////////////////////////////////////////////////////////////////////////

var kodecabang = [
/*    ['BSMI Jawa Timur', '3500'],
    ['BSMI Kota Surabaya', '3578'],
    ['BSMI Kab Sidoarjo', '3515'],
    ['BSMI Kab Mojokerto', '3516'],
    ['BSMI Kota Mojokerto', '3576'],
    ['BSMI Kab Lamongan', '3524'],
    ['BSMI Kab Gresik', '3525'],
    ['BSMI Kab Tuban', '3523'],
    ['BSMI Kab Bojonegoro', '3522'],
    ['BSMI Kota Pasuruan', '3575'],
    ['BSMI Kab Pasuruan', '3514'],
    ['BSMI Kab Bangkalan', '3526'],
    ['BSMI Kab Sampang', '3527'],
    ['BSMI Kab Pamekasan', '3528'],
    ['BSMI Kab Sumenep', '3529'],
    ['BSMI Kota Probolinggo', '3574'],
    ['BSMI Kab Probolinggo', '3513'],
    ['BSMI Kab Jember', '3509'],
    ['BSMI Kab Lumajang', '3508'],
    ['BSMI Kab Bondowoso', '3511'],
    ['BSMI Kab Situbondo', '3512'],
    ['BSMI Kab Banyuwangi', '3510'],
    ['BSMI Kab Jombang', '3517'],
    ['BSMI Kota Malang', '3573'],
    ['BSMI Kab Malang', '3507'],
    ['BSMI Kota Batu', '3579'],
    ['BSMI Kota Kediri', '3571'],
    ['BSMI Kab Kediri', '3506'],
    ['BSMI Kota Blitar', '3572'],
    ['BSMI Kab Blitar', '3505'],
    ['BSMI Kab Tulungagung', '3504'],
    ['BSMI Kota Madiun', '3577'],
    ['BSMI Kab Madiun', '3519'],
    ['BSMI Kab Ngawi', '3521'],
    ['BSMI Kab Magetan', '3520'],
    ['BSMI Kab Ponorogo', '3502'],
    ['BSMI Kab Pacitan', '3501'],
    ['BSMI Kab Trenggalek', '3503'],
    ['BSMI Kab Nganjuk', '3518'] */
];

var $$ = Dom7;

var mybsmiaktivasi = '3a76fa3439d3e90c20618add32a27b63ccc792fc55c6f1819e1df53babfec03d'; //var mybsmiaktivasi = 'd426d702f89bac9fb66b22ede9593b62a447bf4154dfac317a72fcf4f168172a';
var grecaptcharesponsedata = '';
var isLocal = false;
var DEBUG = true;
var visits = 1;
var skipuid = ["0OOBNq02038mf3ZfIdV7","0OeN3LUg0AcX3qtLZkPj"];
const usecaptcha = false
var userstatusnormal = [
	"Terbatas", //User belum verifikasi identitas
	"Terverifikasi", //User sudah verifikasi identitas
	"Tertolak" //Permintaan verifikasi user ditolak
]

if ((window.location.href.indexOf("localhost") > -1)||(window.location.href.indexOf("127.0.0.1") > -1)) 
{
  DEBUG = true;
  console.log('local development');
  isLocal = true;
  var access_token = params.access_token;
  var apiuserurl = "https://script.google.com/macros/s/AKfycbwWFxUmhmfem1mHJT7HDqJoVFNkCmUkInvOOx2K1KZy/dev?access_token="+access_token;
  var apidataurl = "https://script.google.com/macros/s/AKfycbxXCV5_Bj1-IqUtezfR_MPLrc-YRGq0pSWVQwPZ5K0/dev?access_token="+access_token;
}
else
{
  var apiuserurl = "https://script.google.com/macros/s/AKfycbys-GEdilEu0nqdjDRUlEExkamYVIRsplNMEnLl2WiQQy3DxZoikpts7bnLotnT5IcwzQ/exec";
  var apidataurl = "https://script.google.com/macros/s/AKfycbyyPrApY4R8xv-_m8LUz9XHhkdYeTPMovm8MkBXgTXlojx31nHz9GVdGa4Ikw8cELMN/exec";
  DEBUG = false;
  fganalytic();
}

function fganalytic()
{
  const head = document.getElementsByTagName("head")[0];
  var myScript = document.createElement('script');
  myScript.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=G-MSGF0B364L');
  myScript.onload = function() {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-MSGF0B364L');
  }
  head.insertBefore(myScript, head.children[1]);
}

//////////console.log/////////////////////////////////////////////////////////////////////////////////////////////

if(!DEBUG){
    if(!window.console) window.console = {};
    var methods = ["log", "debug", "warn", "info"];
    for(var i=0;i<methods.length;i++){
        console[methods[i]] = function(){};
    }
}
//////////console.log/////////////////////////////////////////////////////////////////////////////////////////////


if (params.mybsmi !== undefined )
{
  let mybsmi = params.mybsmi;
  mybsmi = mybsmi.replace('web+mybsmi://','');
  mybsmi = mybsmi.replace('javascript:','');
  mybsmi = safe(mybsmi);
  if ((mybsmi.startsWith("http://localhost:8080"))||(mybsmi.startsWith("https://mybsmi.bsmijatim.org")))
  {
    window.location.href = mybsmi;
  }
}

if (params.mode !== undefined )
{
	let mode = params.mode
	if(mode == 'full')
	{
		$$('select[name="cabang"]')[0][1].disabled = false
	}
}

var app = new Framework7({
el: '#app',
theme: 'aurora',
name: 'MyBSMI',
id: 'mybsmi.bsmijatim.org',
view: {
  browserHistory: true,
  browserHistorySeparator: '#page',
  browserHistoryStoreHistory: false,
},
on: {
  init() {
    fappready();
  },
},
routes: [
  {
    path: '/',
    url: '/',
    on: {
      pageAfterIn: function test (e, page) {
        //console.log(typeof(dashboarddata));
        if (typeof dashboarddata !== 'undefined'){getdefaultdatarun(dashboarddata);}
        if (window.deferredPrompt) fmybsminstallclick();
        if (window.mybsmiinstalled) fmybsmibukaapp();
        frefresh();
        fmybsmivisits();
      },
    },
  },
  {
    name: "dynamicLoad",
    path: "/dynamicLoad/"

  },
  {
    path: '/profilku/',
    url: 'profilku.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpageprofilku();
      },
    },
    beforeEnter: function ({ resolve, reject }) {          
          //fperiksauserdata({ resolve, reject })
		  function fperiksakesiapan({ resolve, reject })
		  {
			  if (typeof dashboarddata === 'undefined' || dashboarddata === null) {
				// variable is undefined or null
				setTimeout(function(){ fperiksakesiapan({ resolve, reject }); }, 1000);
				return;
			  }
			resolve();
		  }
		  fperiksakesiapan({ resolve, reject })		  
    },
  },
  {
    path: '/event/',
    url: 'event.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpageevent();
      },
    },
  },
  {
    path: '/feeds/',
    url: 'feeds.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpagefeeds();
      },
    },
  },
  {
    path: '/majalah/',
    url: 'majalah.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpagemajalah();
      },
    },
  },
  {
    path: '/voting/',
    url: 'musprov4voting20bacalon.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpagemusprov4voting20bacalon();
      },
    },
  },
  {
    path: '/hasilvoting/',
    url: 'musprov4voting20bacalonhasil.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpagemusprov4voting20bacalonhasil();
      },
    },
  },
  {
    path: '/pemilihvoting/',
    url: 'musprov4voting20bacalonpemilih.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpagemusprov4voting20bacalonpemilih();
      },
    },
  },
  {
    path: '/arsip/',
    url: 'materi.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpagemateri();
      },
    },
  },
  {
    path: '/lainnya/',
    url: 'lainnya.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpagelainnya();
      },
    },	
  },
  {
    path: '/ekta/',
    url: 'ekta.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpageekta();
      },
    },
    beforeEnter: function ({ resolve, reject }) {
        fperiksauserstatus({ resolve, reject })
    },
  },
  {
    path: '/aktivitas/',
    url: 'aktivitas.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpageaktivitas();
      },
    },
    beforeEnter: function ({ resolve, reject }) {          
        fperiksadashboarddata({ resolve, reject })
    },
  },
  {
    path: '/bukusaku/',
    url: 'bukusaku.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpagebukusaku();
      },
    },
    beforeEnter: function ({ resolve, reject }) {          
        fperiksadashboarddata({ resolve, reject })
    },
  },
  {
    path: '/social/',
    url: 'social.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpagesocial();
      },
    },
    beforeEnter: function ({ resolve, reject }) {          
        fperiksadashboarddata({ resolve, reject })
    },
  },
  {
    path: '/dokumen/',
    url: 'dokumen.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpagedokumen();
      },
    },
    beforeEnter: function ({ resolve, reject }) {          
        fperiksadashboarddata({ resolve, reject })
    },
  },
  {
    path: '/twibbon/:aktivitasid',
    url: 'twibbon.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpagetwibbon(page.route.params.aktivitasid);
      },
    },
    beforeEnter: function ({ resolve, reject }) {
      fperiksadashboarddata({ resolve, reject })
    },
  },
  {
    path: '/cabang/:cabangid',
    url: 'cabang.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpagecabang(true,page.route.params.cabangid);
      },
    },
    beforeEnter: function ({ resolve, reject }) {
      fperiksadashboarddata({ resolve, reject })
    },
  },
  {
    path: '/relawan/:relawanid',
    url: 'relawan.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpagerelawan(page.route.params.relawanid);
      },
    },
    beforeEnter: function ({ resolve, reject }) {
      fperiksadashboarddata({ resolve, reject })
    },
  },
  {
    path: '/riwayat/',
    url: 'riwayat.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpageriwayat();
      },
    },
    beforeEnter: function ({ resolve, reject }) {
        fperiksadashboarddata({ resolve, reject })
    },
  },
  {
    path: '/pesan/',
    url: 'pesan.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpagepesan(e, page);        
      },
    },
    beforeEnter: function ({ resolve, reject }) {
      function fperiksakesiapan({ resolve, reject })
      {
          if (typeof dashboarddata === 'undefined' || dashboarddata === null) {
            // variable is undefined or null
            setTimeout(function(){ fperiksakesiapan({ resolve, reject }); }, 1000);
            return;
          }
        resolve();
      }
      fperiksakesiapan({ resolve, reject })
    },
  },
  {
    path: '/bacapesan/:pesanId',
    url: 'bacapesan.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpagebacapesan(page.route.params.pesanId);
        //console.log(page.route.params.pesanId)
      },
    },
    beforeEnter: function ({ resolve, reject }) {
      function fperiksakesiapan({ resolve, reject })
      {
          if (typeof dashboarddata === 'undefined' || dashboarddata === null) {
            // variable is undefined or null
            setTimeout(function(){ fperiksakesiapan({ resolve, reject }); }, 1000);
            return;
          }
        resolve();
      }
      fperiksakesiapan({ resolve, reject })
    },
  },
  {
    path: '/verifikator/',
    url: 'verifikator.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpageverifikator();
      },
    },
    beforeEnter: function ({ resolve, reject }) {
      function fperiksakesiapan({ resolve, reject })
      {
          if (typeof dashboarddata === 'undefined' || dashboarddata === null) {
            // variable is undefined or null
            setTimeout(function(){ fperiksakesiapan({ resolve, reject }); }, 1000);
            return;
          }
            let data = JSON.parse(dashboarddata.user.usermydata)
            if (data.verifikator || data.admincabang)
            {
                resolve();
            }
            else
            {
                app.dialog.alert('Tidak punya izin', 'Status')
                reject();
            }
      }
      fperiksakesiapan({ resolve, reject })
    },
  },
  {
    path: '/admin/',
    url: 'admin.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpageadmin();
      },
    },
    beforeEnter: function ({ resolve, reject }) {
      function fperiksakesiapan({ resolve, reject })
      {
          if (typeof dashboarddata === 'undefined' || dashboarddata === null) {
            // variable is undefined or null
            setTimeout(function(){ fperiksakesiapan({ resolve, reject }); }, 1000);
            return;
          }
            let data = JSON.parse(dashboarddata.user.usermydata)
            if ((data.admincabang)||(data.adminlaporan))
            {
                resolve();
            }
            else
            {
                app.dialog.alert('Tidak punya izin', 'Status')
                reject();
            }
      }
      fperiksakesiapan({ resolve, reject })
    },
  },
  {
    path: '/kegiatan/',
    url: 'kegiatan.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpagekegiatan();
      },
    },
    beforeEnter: function ({ resolve, reject }) {
      function fperiksakesiapan({ resolve, reject })
      {
          if (typeof dashboarddata === 'undefined' || dashboarddata === null) {
            // variable is undefined or null
            setTimeout(function(){ fperiksakesiapan({ resolve, reject }); }, 1000);
            return;
          }
            let data = JSON.parse(dashboarddata.user.usermydata)
            if (data.admincabang)
            {
                resolve();
            }
            else
            {
                app.dialog.alert('Tidak punya izin', 'Status')
                reject();
            }
      }
      fperiksakesiapan({ resolve, reject })
    },
  },
  {
    path: '/admindonasi/',
    url: 'admindonasi.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpageadmindonasi();
      },
    },
    beforeEnter: function ({ resolve, reject }) {
      function fperiksakesiapan({ resolve, reject })
      {
          if (typeof dashboarddata === 'undefined' || dashboarddata === null) {
            // variable is undefined or null
            setTimeout(function(){ fperiksakesiapan({ resolve, reject }); }, 1000);
            return;
          }
            let data = JSON.parse(dashboarddata.user.usermydata)
            if (data.adminlaporan || data.adminlaporanadministrasi == 'bendahara')
            {
                resolve();
            }
            else
            {
                app.dialog.alert('Tidak punya izin', 'Status')
                reject();
            }
      }
      fperiksakesiapan({ resolve, reject })
    },
  },  
  {
    path: '/master/',
    url: 'master.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpagemaster();
      },
    },
    beforeEnter: function ({ resolve, reject }) {
      function fperiksakesiapan({ resolve, reject })
      {
          if (typeof dashboarddata === 'undefined' || dashboarddata === null) {
            // variable is undefined or null
            setTimeout(function(){ fperiksakesiapan({ resolve, reject }); }, 1000);
            return;
          }
            let data = JSON.parse(dashboarddata.user.usermydata)
            if (data.master)
            {
                resolve();
            }
            else
            {
                app.dialog.alert('Tidak punya izin', 'Status')
                reject();
            }
      }
      fperiksakesiapan({ resolve, reject })
    },
  },
  {
    path: '/masterdokumen/',
    url: 'masterdokumen.html',
    on: {
      pageAfterIn: function test (e, page) {
        fpagemasterdokumen();
      },
    },
    beforeEnter: function ({ resolve, reject }) {
      function fperiksakesiapan({ resolve, reject })
      {
          if (typeof dashboarddata === 'undefined' || dashboarddata === null) {
            // variable is undefined or null
            setTimeout(function(){ fperiksakesiapan({ resolve, reject }); }, 1000);
            return;
          }
            let data = JSON.parse(dashboarddata.user.usermydata)
            if (data.master)
            {
                resolve();
            }
            else
            {
                app.dialog.alert('Tidak punya izin', 'Status')
                reject();
            }
      }
      fperiksakesiapan({ resolve, reject })
    },
  },
  {
    path: '/data/',
    name: 'data',
	redirect: '/',
	//keepAlive: true,
  },
  {
    path: '(.*)',
    url: '404.html',
  },
],
});

function fperiksadashboarddata({ resolve, reject })
{
    if (typeof dashboarddata === 'undefined' || dashboarddata === null) {
            // variable is undefined or null
            setTimeout(function(){ fperiksadashboarddata({ resolve, reject }); }, 1000);
            return;
    }
    resolve();

}

function fperiksauserdata({ resolve, reject })
{
    if (typeof dashboarddata === 'undefined' || dashboarddata === null) {
      // variable is undefined or null
      setTimeout(function(){ fperiksauserdata({ resolve, reject }); }, 1000);
      return;
    }

      if (dashboarddata.user.userphoto !== '')
      {
        resolve();
      }
      else
      {
        flengkapidata();
        reject();
      }

}

function fperiksauserstatus({ resolve, reject })
{
    if (typeof dashboarddata === 'undefined' || dashboarddata === null) {
      // variable is undefined or null
      setTimeout(function(){ fperiksauserstatus({ resolve, reject }); }, 1000);
      return;
    }
    
       if (dashboarddata.user.userstatus === 'Terverifikasi')
       {
          fperiksauserdata({ resolve, reject })
       }
       else if (dashboarddata.user.userstatus === 'Terbatas')
       {

          if (dashboarddata.user.userphoto !== '')
          {

            let data = JSON.parse(dashboarddata.user.usermydata)
            if (data.verifikasiidentitas)
            {
              app.dialog.alert('Menunggu verifikasi identitas, hubungi operator', 'Status')
              reject();
            }
            else
            {
              fverifikasidata();
              reject();
            }

          }
          else
          {
            flengkapidata();
            reject();
          }

       }
       else if (dashboarddata.user.userstatus === 'Tertolak')
       {
          app.dialog.alert('Verifikasi identitas gagal hubungi admin', 'Status')
          reject();
       }
       else
       {
          reject();
       }
}

//////////on app ready////////////////////////////////////////////////////
function fappready()
{
  console.log('app ready');
  fonesignal();
  fchecksession();
  //if (!isLocal) fcountvisits();
}

//////////on dom ready////////////////////////////////////////////////////
window.addEventListener('DOMContentLoaded', () => {
  console.log('dom ready');
  
  
});

function CountDownTimer(dt, id)
{
	var end = new Date(dt);

	var _second = 1000;
	var _minute = _second * 60;
	var _hour = _minute * 60;
	var _day = _hour * 24;
	var timer;

	function showRemaining() {
		var now = new Date();
		var distance = end - now;
		if (distance < 0) {

			clearInterval(timer);
			document.getElementById(id).innerHTML = 'EXPIRED!';

			return;
		}
		var days = Math.floor(distance / _day);
		var hours = Math.floor((distance % _day) / _hour);
		var minutes = Math.floor((distance % _hour) / _minute);
		var seconds = Math.floor((distance % _minute) / _second);

		document.getElementById(id).innerHTML = days + 'days ';
		document.getElementById(id).innerHTML += hours + 'hrs ';
		document.getElementById(id).innerHTML += minutes + 'mins ';
		document.getElementById(id).innerHTML += seconds + 'secs';
	}

	timer = setInterval(showRemaining, 1000);
}

function fcountvisits()
{
  //app.request.json('https://api.countapi.xyz/hit/mybsmi.bsmijatim.org/visits').then((res) => {console.log(res.data);visits = res.data.value;});
  fetch('https://api.countapi.xyz/hit/mybsmi.bsmijatim.org/visits', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      },
  })
  .then(response => response.json())
  .then(async(response) => {
      visits = response.value;
  })
}

function fmybsmivisits()
{
  $$('.mybsmi-visits').off('click')
  $$('.mybsmi-visits').on('click', function () {
	let data = JSON.parse(dashboarddata.user.usermydata)
	if (data.master) {     
      let api = "https://cors.bsmijatim.workers.dev/?";
      let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTpD1D5K4E0TCklRc96H37RDJBRjxljBZkU9CO8wlqrEJy0_p8PdLYCOUm2hJMwI0cK_3RzqWThae3T/pub?gid=1358478407&single=true&output=csv'
      fetch(api+url)
      .then(response => response.text())
      .then(async(response) => {
          let arr = CSVToArray(response)
          app.dialog.alert(arr.length-1,'Kunjungan');
      })
	}
  });
}

function fpagereload()
{
    //location.reload();
    window.location.reload();
    //history.go(0);
}

function frefresh()
{
  $$('.mybsmi-refresh').on('click', function () {
      fpagereload();
  });
}

function fonimgerror()
{
  //return;
  var timerImgBroken = 0;
  var myVarTimerImgBroken = setInterval(myTimerImgBroken, 3000);
  function myTimerImgBroken() {
      var images = document.querySelectorAll('img');
      for (var i = 0; i < images.length; i++) {
          if ( images[i].complete
          &&   (typeof images[i].naturalWidth == "undefined"
          ||   images[i].naturalWidth == 0)                  
          ) {
            images[i].src = 'photo.svg';
            //images[i].style.display='none';
          }
      }
     if (timerImgBroken === 5) {clearInterval(myVarTimerImgBroken);}
  }
}

function fonesignal()
{
    if (typeof dashboarddata === 'undefined' || dashboarddata === null) {
      // variable is undefined or null
      setTimeout(function(){ fonesignal(); }, 1000);
      return;
    }
    
    if (!isLocal)
    {
      //try {

            function onManageWebPushSubscriptionButtonClicked(event) {
                getSubscriptionState().then(function(state) {
                    if (state.isPushEnabled) {
                        /* Subscribed, opt them out */
                        OneSignal.setSubscription(false);
                    } else {
                        if (state.isOptedOut) {
                            /* Opted out, opt them back in */
                            OneSignal.setSubscription(true);
                        } else {
                            /* Unsubscribed, subscribe them */
                            OneSignal.registerForPushNotifications();
                        }
                    }
                });
                event.preventDefault();
            }

            function updateMangeWebPushSubscriptionButton(buttonSelector) {
                var hideWhenSubscribed = false;
                var subscribeText = "Subscribe to Notifications";
                var unsubscribeText = "Unsubscribe from Notifications";

                getSubscriptionState().then(function(state) {
                    var buttonText = !state.isPushEnabled || state.isOptedOut ? subscribeText : unsubscribeText;

                    var element = document.querySelector(buttonSelector);
                    if (element === null) {
                        return;
                    }

                    element.removeEventListener('click', onManageWebPushSubscriptionButtonClicked);
                    element.addEventListener('click', onManageWebPushSubscriptionButtonClicked);
                    element.textContent = buttonText;

                    if (hideWhenSubscribed && state.isPushEnabled) {
                        element.style.display = "none";
                    } else {
                        element.style.display = "";
                    }
                });
            }

            function getSubscriptionState() {
                return Promise.all([
                  OneSignal.isPushNotificationsEnabled(),
                  OneSignal.isOptedOut()
                ]).then(function(result) {
                    var isPushEnabled = result[0];
                    var isOptedOut = result[1];

                    return {
                        isPushEnabled: isPushEnabled,
                        isOptedOut: isOptedOut
                    };
                });
            }
            
            window.OneSignal = window.OneSignal || [];

            OneSignal.push(function() {
                  // If we're on an unsupported browser, do nothing
                  if (!OneSignal.isPushNotificationsSupported()) {
                      return;
                  }

                  OneSignal.SERVICE_WORKER_PARAM = { scope: '/push/onesignal/' };
                  OneSignal.SERVICE_WORKER_PATH = 'push/onesignal/OneSignalSDKWorker.js'
                  OneSignal.SERVICE_WORKER_UPDATER_PATH = 'push/onesignal/OneSignalSDKWorker.js'
            
                  OneSignal.init({
                    appId: "142b9d52-507c-4326-bc6e-d234d208f2cd",
                    safari_web_id: "web.onesignal.auto.194684e9-1eab-45d0-91dc-36dcc25bd22e",
                    autoResubscribe: true,
                    notifyButton: {
                      enable: false,
                    },
                    promptOptions: {
                      actionMessage: 'MyBSMI ingin menampilkan notifikasi',
                      acceptButton: 'Setuju',
                      cancelButton: 'Nanti Saja',
                      slidedown: {
                        autoPrompt: false,
                      },
                    },
                    welcomeNotification: {
                      disable: true,
                    },
                    /* Your other init settings ... */
                    notificationClickHandlerMatch: 'origin', /* See above documentation: 'origin' relaxes tab matching requirements, 'exact' is default */
                    notificationClickHandlerAction: 'focus', /* See above documentation: 'focus' does not navigate the targeted tab, 'navigate' is default */
                    /* ... */
                  });          
                  OneSignal.setDefaultTitle("MyBSMI");          
                  OneSignal.on('permissionPromptDisplay', function () {
                    console.log("The prompt displayed");
                  });
                  OneSignal.isPushNotificationsEnabled(function(isEnabled) {
                    if (isEnabled)
                      console.log("Push notifications are enabled!");
                    else
                      console.log("Push notifications are not enabled yet.");
                      if (mybsmigetNotificationPermission === 'granted')
                      {
                        //OneSignal.setSubscription(true);
                      }    
                  });
                  
                  //updateMangeWebPushSubscriptionButton('#my-notification-button');          
                  // Occurs when the user's subscription changes to a new value.
                  OneSignal.on('subscriptionChange', function (isSubscribed) {
                    console.log("The user's subscription state is now:", isSubscribed);
                    //updateMangeWebPushSubscriptionButton('#my-notification-button');
                    fupdateusernotifikasi(isSubscribed);
                  });
                  
                  OneSignal.on('notificationPermissionChange', function(permissionChange) {
                    var currentPermission = permissionChange.to;
                    console.log('New permission state:', currentPermission);
                    $$('#mybsmi-promptoverlay').remove();
                    if (currentPermission === 'granted')
                    {
                      fupdateusernotifikasi(true);
                    }
                    else if (currentPermission === 'denied')
                    {
                    }
                    else if (currentPermission === 'default')
                    {
                    }
                  });
                  OneSignal.getUserId(function(userId) {
                    console.log("OneSignal User ID:", userId);
                    // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316    
                  });
                  OneSignal.on('notificationDisplay', function(event) {
                    console.warn('OneSignal notification displayed:', event);
                    window.mybsminotificationDisplay = true;
                    let url = event.url;
                    if (window.mybsmiaddListenerForNotificationOpened) 
                    {              
                      //window.location.assign(url);
                      //location.reload();
                      fnotifikasirun(event);
                      window.mybsmiaddListenerForNotificationOpened = false;
                      window.mybsminotificationDisplay = false;
                    }
                  });
                  OneSignal.on('notificationDismiss', function(event) {
                    console.warn('OneSignal notification dismissed:', event);
                  });
                  OneSignal.setExternalUserId(dashboarddata.user.useruid);
                  OneSignal.getExternalUserId().then(function(externalUserId){
                    console.log("externalUserId: ", externalUserId);
                  });
                  OneSignal.on('popoverShown', function() {
                    console.log('Slide Prompt Shown');
                  });
                  OneSignal.on('popoverAllowClick', function() {
                    console.log('Slide Prompt popoverAllowClick');
                    $$('.mybsmi-promptinfo').removeClass('display-none')
                  });
                  OneSignal.on('popoverCancelClick', function() {
                    console.log('Slide Prompt popoverCancelClick');
                    $$('#mybsmi-promptoverlay').remove();
                  });
                  OneSignal.on('popoverClosed', function() {
                    console.log('Slide Prompt popoverClosed');
                  });
            });
            OneSignal.push(["getNotificationPermission", function(permission) {
                console.log("Site Notification Permission:", permission);
                // (Output) Site Notification Permission: default
                window.mybsmigetNotificationPermission = permission;
            }]);

            const onNotificationClicked = function (data) 
            {
                console.log("Received NotificationOpened:");
                console.log(data);
                if ((app.views.current.history.length !== 2) || (app.views.current.router.currentPageEl.baseURI !== data.url))
                {
                 window.mybsmiaddListenerForNotificationOpened = true;
                }
                else
                {
                  var toastBottom = app.toast.create({ text: data.content, closeTimeout: 5000,position: 'center', });toastBottom.open();
                }
                console.log(app.views.current.history.length);
                let url = data.url;
                if (window.mybsminotificationDisplay) 
                {              
                  //window.location.assign(url);
                  //location.reload();
                  fnotifikasirun(data);
                  window.mybsmiaddListenerForNotificationOpened = false;
                  window.mybsminotificationDisplay = false;
                }
            }                
            const handler = function (data) {
              // call your primary handler
              onNotificationClicked(data);

              // add another handler right away
              OneSignal.addListenerForNotificationOpened(handler);
            };
            OneSignal.push(["addListenerForNotificationOpened", handler]);
      //} catch(err){}
    }    
}

function fnotifikasirun(data)
{
  let command = data.data.command;
  if (command === 'openpage')
  {
    let pagename = data.data.pagename;
    let pageurl = data.data.pageurl;
    if (pagename === 'pesan')
    {
        mybsmipesan = null;
        if (pageurl === app.views.current.router.url)
        {
          fpagepesan();
        }
        else
        {
          app.views.main.router.navigate(pageurl);
        }
    }
    else if (pagename === 'riwayat')
    {
        mybsmiriwayat = null;
        if (pageurl === app.views.current.router.url)
        {
          fpageriwayat();
        }
        else
        {
          app.views.main.router.navigate(pageurl);
        }
    }
  }
}

function fupdateusernotifikasi(data)
{
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'updateusernotifikasi', data:data}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function fonesignalprompt(judul = 'Terima Kasih',msg = 'Beritahu jika ada hal penting')
{
  console.log('prompt onesignal');
  
  OneSignal.push(["getNotificationPermission", function(permission) {
      console.log("Site Notification Permission:", permission);
      // (Output) Site Notification Permission: default
      fonesignalpromptrun(judul,msg,permission)
  }]);
}

function fonesignalpromptrun(judul,msg,permission)
{
  var dialog = app.dialog.create({
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="" style="width:150px;height:150px;margin: 10px 10px;object-fit: cover;">'
      +'      <p style="font-weight:bold;text-align:center;" class="mybsmi-judulprompt">'+judul+'</p>'
      +'      <div class="data-table"></div>'
+'                <div class="list media-list no-margin-top display-none mybsmi-promptlist"><ul><li>'
+'                  <label class="item-checkbox item-content">'
+'                    <input type="checkbox" name="demo-media-checkbox" id="mybsmi-promptcheck" value="1" />'
+'                    <i class="icon icon-checkbox"></i>'
+'                    <div class="item-inner">'
+'                      <div class="item-title-row">'
+'                        <div class="item-title"></div>'
+'                        <div class="item-after"></div>'
+'                      </div>'
+'                      <div class="item-subtitle">Kirim Pemberitahuan</div>'
+'                      <div class="item-text mybsmi-msgprompt" style="margin-bottom:10px;overflow:auto;">'+msg+'</div>'
+'                    </div>'
+'                  </label>'
+'                </li></ul></div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: false,
    on: {
      opened: function (dialog, e) {
        //console.log('Dialog opened')
        let src = "icon512.png";
        $$('#img').attr('src',src);
        $$('#mybsmi-promptcheck').on('click', function () {
          let cek = $$('#mybsmi-promptcheck').attr('disabled')
          if (!cek)
          {
            dialog.close();
            console.log('chek');
            $$('#mybsmi-promptcheck').attr('disabled','true');            
            const para = document.createElement("div");
            para.id = 'mybsmi-promptoverlay';
            para.innerHTML = '<div style="background: rgba(0, 0, 0, 0.8);position: fixed;z-index: 1000000000000000;align-items: center;justify-content: center;display: flex;bottom: 0;left: 0;right: 0;top: 0;"><p class="text-align-center padding text-color-white mybsmi-promptinfo display-none">Klik Izinkan (Allow)</p></div>';         
            document.body.appendChild(para);            
            $$('.mybsmi-promptinfo').on('click', function () {
              $$('#mybsmi-promptoverlay').remove();
            });
            //OneSignal.showNativePrompt();
            OneSignal.showSlidedownPrompt({force: true});            
          }
        });
        if (permission === 'default')
        {
            $$('.mybsmi-promptlist').removeClass('display-none');
        }        
      }
    },
    buttons: [
      {
        text: 'OK',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}


//////onesignal////////////////////////////////////////////////////////////





/////////install//////////////////////////////////////////////////
//https://web.dev/codelab-make-installable/
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile.
  event.preventDefault();
  console.log('??', 'beforeinstallprompt', event);
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Remove the 'hidden' class from the install button container.
  //$$('.mybsmi-install').removeClass('display-none');
  fmybsminstallclick();
});

function fmybsminstallclick()
{
  $$('.mybsmi-install').removeClass('display-none');
  $$('.mybsmi-install').on('click', async function () {
    console.log('??', 'butInstall-clicked');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log('??', 'userChoice', result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Act on the user's choice
    if (result === 'accepted') {
      console.log('User accepted the install prompt.');
    } else if (result === 'dismissed') {
      console.log('User dismissed the install prompt');
    }
    // Hide the install button.
    $$('.mybsmi-install').addClass('display-none');
  });
  $$('.mybsmi-bukaapp').addClass('display-none');
  if (localStorage.getItem("mybsmiinstalled") !== null)
  {
    localStorage.removeItem("mybsmiinstalled");
  }
}

function fmybsmibukaapp()
{
  const os = detectOS();
  const browserName = getBrowserName();
  const display = getPWADisplayMode();
  if (display === 'browser')
  {
      console.log('display :'+display);
      if (os === 'Android')
      {
        console.log('os :'+os);
        if (browserName === 'Chrome')
        {
          $$('.mybsmi-bukaapp').removeClass('display-none');
          $$('.mybsmi-bukaapp').on('click', function () {
            window.open(window.location.href, "_blank");
          });
        }
        else if (browserName === 'Samsung')
        {
          $$('#overlay-welcome .mybsmi-bukaapp').text('MyBSMI App Tersedia');
          $$('#overlay-welcome .mybsmi-bukaapp').removeClass('display-none');
          $$('#overlay-welcome .mybsmi-bukaapp').on('click', function () {
            //window.open(window.location.href, "_blank");
          });
        }
      }
      else if (os === 'Windows')
      {
        console.log('os :'+os);
        if (browserName === 'Edge')
        {
          console.log('browserName :'+browserName);
          $$('.mybsmi-bukaapp').removeClass('display-none');
          $$('.mybsmi-bukaapp').on('click', function () {
          let url = 'web+mybsmi://'+window.location.href;
            window.open(url, "_blank");
          });      
        }
        else if (browserName === 'Chrome')
        {
          $$('.mybsmi-bukaapp').removeClass('display-none');
          $$('.mybsmi-bukaapp').on('click', function () {
          let url = 'web+mybsmi://'+window.location.href;
            window.open(url, "_blank");
          });
        }
      }
  }
}

window.addEventListener('appinstalled', (event) => {
  console.log('??', 'appinstalled', event);
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
  $$('.mybsmi-install').addClass('display-none');
  window.mybsmiinstalled = true;
  localStorage.setItem("mybsmiinstalled",true)  
  const os = detectOS();
  if (os === 'Windows'){let timeout = setTimeout(fmybsmibukaapp, 5000);}else{let timeout = setTimeout(fmybsmibukaapp, 20000);}
});

function getPWADisplayMode() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  if (document.referrer.startsWith('android-app://')) {
    return 'twa';
  } else if (navigator.standalone || isStandalone) {
    return 'standalone';
  }
  return 'browser';
}

//console.log(getPWADisplayMode());

window.matchMedia('(display-mode: standalone)').addEventListener('change', (evt) => {
  let displayMode = 'browser';
  if (evt.matches) {
    displayMode = 'standalone';
  }
  // Log display mode change to analytics
  console.log('DISPLAY_MODE_CHANGED', displayMode);
});

async function tesinstall()
{
  if ('getInstalledRelatedApps' in navigator) {
      const relatedApps = await navigator.getInstalledRelatedApps();
      //console.log('instaled: '+relatedApps.length > 0);
      if (relatedApps.length > 0) {
        //window.open(window.location.href, "_blank");
        console.log('app installed');
        if (getPWADisplayMode() === 'browser')
        {
          //window.open(window.location.href, "_blank");
          //const anchor = document.createElement("a");
          //anchor.setAttribute('href', window.location.href);
          //anchor.setAttribute('target', '_blank');
          //anchor.click();
          //openapp();
          //window.location.href = 'https://mybsmi.bsmijatim.org';
          window.mybsmiinstalled = true;
          fmybsmibukaapp();
          
        }
      }else{
        console.log('app not installed');
        const os = detectOS();
        const browserName = getBrowserName();
        if ((os === 'Windows')&&((browserName === 'Edge')||(browserName === 'Chrome')))
        {
          if (localStorage.getItem("mybsmiinstalled") !== null)
          {
            let isInstalled = localStorage.getItem("mybsmiinstalled");
            if (isInstalled)
            {
              window.mybsmiinstalled = true;
              fmybsmibukaapp();
            }
          }
        }
      }
      relatedApps.forEach((app) => {
        console.log(app.id, app.platform, app.url);
      });
  } else {
    console.log('getInstalledRelatedApps not supported');
  }
}

if (!isSecureContext) {  
  location.protocol = 'https:';
}

function isWindowsAppInstalled()
{
  const os = detectOS();
  const browserName = getBrowserName();
  let isInstalled = localStorage.getItem("mybsmiinstalled");
  let isWindowsAppInstall = false;
  if ((os === 'Windows')&&(isInstalled)&&((browserName === 'Edge')||(browserName === 'Chrome')))
  {
      isWindowsAppInstall = true;
  }
  return isWindowsAppInstall;
}



function finstallload()
{
    const os = detectOS();
    if (os === 'Windows')
    {
      console.log('registerProtocolHandler');
      navigator.registerProtocolHandler('web+mybsmi', '/?mybsmi=%s');
    }
    
  // replace standalone with your display used in manifest
  window.matchMedia('(display-mode: standalone)')
      .addListener(event => {
          if (event.matches) {
             // From browser to standalone
             console.log('From browser to standalone');
          } else {
             // From standalone to browser
             console.log('From standalone to browser');
          }
      });
  tesinstall();
  console.log('isStandalone = '+isStandalone());
}

(async() => {
  finstallload();
})();


function isStandalone() {
  // For iOS
  if(window.navigator.standalone) return true

  // For Android
  if(window.matchMedia('(display-mode: standalone)').matches) return true

  // If neither is true, it's not installed
  return false
}


function openapp()
{
  var dialog = app.dialog.create({
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="" style="width:150px;height:150px;margin: 10px 10px;object-fit: cover;">'
      +'      <p style="font-weight:normal;">MyBSMI App Tersedia</p>'
      +'      <div class="data-table"></div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: false,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        let src = "icon512.png";
        $$('#img').attr('src',src);
      }
    },
    buttons: [
      {
        text: 'Nanti Saja',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
      {
        text: 'Buka App',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
            window.open(window.location.href, "_blank");
          }
      },
    ]
  });
  dialog.open();
}

const isInStandaloneMode = () =>
      (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone) || document.referrer.includes('android-app://');

 if (isInStandaloneMode()) {
    console.log("webapp is installed")
}

function detectOS() {
    const platform = navigator.platform.toLowerCase(),
        iosPlatforms = ['iphone', 'ipad', 'ipod', 'ipod touch'];

    if (platform.includes('mac')) return 'MacOS';
    if (iosPlatforms.includes(platform)) return 'iOS';
    if (platform.includes('win')) return 'Windows';
    if (/android/.test(navigator.userAgent.toLowerCase())) return 'Android';
    if (/linux/.test(platform)) return 'Linux';

    return 'unknown';
}

const getBrowserName = () => {
  let browserInfo = navigator.userAgent;
  let browser;
  if (browserInfo.includes('Opera') || browserInfo.includes('Opr')) {
    browser = 'Opera';
  } else if (browserInfo.includes('Edg')) {
    browser = 'Edge';
  } else if (browserInfo.includes('Samsung')) {
    browser = 'Samsung'
  } else if (browserInfo.includes('Chrome')) {
    browser = 'Chrome';
  } else if (browserInfo.includes('Safari')) {
    browser = 'Safari';
  } else if (browserInfo.includes('Firefox')) {
    browser = 'Firefox'
  } else {
    browser = 'unknown'
  }
    return browser;
}
/////////install//////////////////////////////////////////////////





app.on('pageInit', function (page) {
  //console.log('Page is now pageInit');
  let mypreloader = app.dialog.preloader();
  setTimeout(function () {mypreloader.close();}, 1000);
  //console.log(page.router.currentRoute);
  //console.log(app.views.current);
    $$('img').on('error', function (e) {
      $$(this).attr('src','photo.svg');
    }); 
});

app.on('pageBeforeIn', function (page) {
    $$('img').on('error', function (e) {
      $$(this).attr('src','photo.svg');
    }); 
});

app.on('pageAfterIn', function (page) {
  //console.log('Page is pageAfterIn');
  //mypreloader.close();
  
  fonimgerror();

	let myprofile = ''
	+'      <div class="right">'
	+'        <a class="link popover-open" data-popover=".profile-popover">'
	+'          <span class="margin-right-half"></span>'
	+'          <img src="avatar.png" class="avatar mybsmi-avatar"><span class="badge color-blue mybsmi-avatar-badge" style="left:-8px;bottom:-5px;display:none;"><i class="icon f7-icons" style="font-size:12px;">checkmark_seal</i></span>'
	+'        </a>'
	+'      </div>'

  //$$('.navbar-inner .title').append(myprofile);
	
	$$('a.external').off('click')
 	$$('a.external').on('click', function (e) {
		e.preventDefault()
		const url = $$(this).attr('href')
		console.log('url',url)
		if(url.includes('/img/')){
			var photoBrowser = app.photoBrowser.create({
			  photos: [
				url
			  ],
			  routableModals:true
			});
			photoBrowser.open()
		}else{
			app.dialog.confirm('Buka link di browser','Link', ()=>{
				window.open(url,'_system', 'location=yes')
			})
		}
	}) 
  
 
});

//console.log(app.views.current);
//console.log(app.views.current.router.initialUrl);
var currentrouturl = app.views.current.router.initialUrl;
var currentmybsmimenu = $$('a[href="'+currentrouturl+'"]');
currentmybsmimenu.addClass('active-link');


// Fix col sizes
function fixCols() {
setTimeout(function() {
$$('.events-col').css('height', $$('.charts-col').height() + 'px');
});
}
fixCols();
$$(window).on('resize', fixCols);



////////////////////////////////////////////////////
$$('.mybsmi-menu').on('click', function (e) {
  $$('.mybsmi-menu').removeClass('active-link');
  $$(this).addClass('active-link');
});
/////////////////////////////////////////////////////





//aktivasi kalender///////////////////////////
var calendar = app.calendar.create({
inputEl: '.calendar-input',
dateFormat: 'd-m-yyyy',
openIn: 'popover'
});
//aktivasi kalender///////////////////////////




/////fdeviceid////////////////////////////////////////
// Text with lowercase/uppercase/punctuation symbols
async function fdevice()
{
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var txt = "mybsmi.bsmijatim,org <canvas> 1.0";
ctx.textBaseline = "top";
// The most common type
ctx.font = "14px 'Arial'";
ctx.textBaseline = "alphabetic";
ctx.fillStyle = "#f60";
ctx.fillRect(125,1,62,20);
// Some tricks for color mixing to increase the difference in rendering
ctx.fillStyle = "#069";
ctx.fillText(txt, 2, 15);
ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
ctx.fillText(txt, 4, 17);
let data = canvas.toDataURL("image/png;base64");
const buf = await crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(data));
var hash = Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
return hash;
}

function fdeviceid()
{
const p = Promise.resolve(fdevice());
p.then(value => {
  window.mybsmideviceid = value;
}).catch(err => {
  return err;
});
}

fdeviceid();
/////fdeviceid////////////////////////////////////////




//form-aktivasi/////////////////////////////
$$('.mybsmi-aktivasiscreen').on('click', function () {
	
	async function aktivasi(pinhash,redirect){

			let mypreloader = app.dialog.preloader();
			app.request({
			  url: apidataurl,
			  method: 'GET',
			  cache: false,
			  data : { command: 'getpinaktivasi'}, 
			  success: async function (data, status, xhr)
				{
				  //console.log(data);
				  mypreloader.close();

				  var status = JSON.parse(data).status;
				  var data = JSON.parse(data).data;
				  if (status == "success")
				  {

					let yourDate = new Date()
					const offset = yourDate.getTimezoneOffset()
					yourDate = new Date(yourDate.getTime() - (offset*60*1000))
					let today = yourDate.toISOString().split('T')[0]
					let temp = data+today
					const buf = await crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(temp));
					let tempdata = Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');

					  if (pinhash === data || pinhash === tempdata)
					  {
						app.loginScreen.open('#my-aktivasi-screen');
						try{window.grecaptchaid = grecaptcha.render( 'mybsmi-grecaptchaaktivasi');}catch{}
					  }
					  else if (redirect)
					  {
						  app.dialog.alert('Link aktivasi kedaluwarsa','Terjadi Kesalahan',()=>{window.location = 'https://bsmijatim.org'});
					  }
					  else
					  {
						var toastBottom = app.toast.create({ text: 'Salah', closeTimeout: 5000,position: 'center', });toastBottom.open();
					  }            
				  }
				  else if (status == "failed")
				  {
					app.dialog.alert(data,'Terjadi Kesalahan');
				  }
				  else
				  {
					app.dialog.alert(data,'Terjadi Kesalahan');
				  }
				},
			  error: function (xhr, status, message)
				{
				  //console.log(message);
				  mypreloader.close();
				  app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
				},
			})
	}
  
	var pin = params.pin;
	if (pin !== undefined)
	{
		aktivasi(pin,true)
	}else{
		app.dialog.prompt("ENTER INVITE CODE", "MyBSMI", async function (pin) {
			const buf = await crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(pin));
			var pinhash = Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
			//console.log(pinhash);
			 aktivasi(pinhash,false)
		})
	}
});

$$('.persetujuanaktivasi').on('click', function () {
   let url = $$(this).attr('data-url');
   //console.log(url);
   //window.open(url);
   myviewer1('https://mybsmi.netlify.app/'+url);
});

$$('#my-aktivasi-screen .register-button').on('click', function () {

  if (!$$('#my-aktivasi-screen')[0].checkValidity()) {
        //console.log('Check Validity!');
        return;
  }
  
  if ((grecaptcharesponsedata == undefined || grecaptcharesponsedata == '')&& (usecaptcha)){grecaptcha.execute(grecaptchaid);return;}

  var email = $$('#my-aktivasi-screen [name="email"]').val();
  var password = $$('#my-aktivasi-screen [name="password"]').val();
  var konfirmpassword = $$('#my-aktivasi-screen [name="konfirmpassword"]').val();
  var nama = "'"+$$('#my-aktivasi-screen [name="nama"]').val();
  var jeniskelamin = "'"+$$('#my-aktivasi-screen [name="jeniskelamin"]').val();
  var tanggallahir = "'"+$$('#my-aktivasi-screen [name="tanggallahir"]').val();
  var alamatdomisili = "'"+$$('#my-aktivasi-screen [name="alamatdomisili"]').val();
  var profesi = "'"+$$('#my-aktivasi-screen [name="profesi"]').val();
  var golongandarah = "'"+$$('#my-aktivasi-screen [name="golongandarah"]').val();
  var nohp = "'"+$$('#my-aktivasi-screen [name="nohp"]').val();
  var cabang = "'"+$$('#my-aktivasi-screen [name="cabang"]').val();
  var tahun = "'"+$$('#my-aktivasi-screen [name="tahun"]').val();
  
  if(password != konfirmpassword) 
  {
    app.dialog.alert('Password dan Konfirm Password Harus Sama','Terjadi Kesalahan');
    return;
  }
  let mypreloader = app.dialog.preloader();
  app.request({
    url: apiuserurl,
    method: 'POST',
    cache: false,
    data : { command: 'aktivasi', grecaptcharesponsedata: grecaptcharesponsedata, email: email,password: password, nama: nama, jeniskelamin: jeniskelamin, tanggallahir: tanggallahir, alamatdomisili: alamatdomisili, profesi: profesi, golongandarah:golongandarah, nohp: nohp, cabang: cabang, tahun: tahun  }, 
    success: function (data, status, xhr)
      {
        //console.log(data);
        mypreloader.close();

        var status = JSON.parse(data).status;
        var data = JSON.parse(data).data;
        if (status == "success")
        {
          app.loginScreen.close('#my-aktivasi-screen');
          $$('#my-aktivasi-screen')[0].reset();
          //$$('#overlay-welcome').hide();
          app.dialog.alert('Pembuatan akun telah berhasil. Silahkan login menggunakan email dan password anda. Terima kasih.','Berhasil');
		  app.loginScreen.open('#my-login-screen')
        }
        else if (status == "failed")
        {
          app.dialog.alert(data,'Terjadi Kesalahan');
        }
        else
        {
          app.dialog.alert(data,'Terjadi Kesalahan');
        }
      },
    error: function (xhr, status, message)
      {
        //console.log(message);
        mypreloader.close();
        app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
      },
  })
  grecaptcharesponsedata = '';grecaptcha.reset(grecaptchaid);
});

$$("#my-aktivasi-screen").on("keydown",function(e){
   if(e.keyCode == 13){
	 e.preventDefault();
	 $$('#my-aktivasi-screen .register-button').click();
   }
});
//end form aktivasi//////////////////////////







//start form-login/////////////////////////////
$$('#my-login-screen .login-button').on('click', function () {
  if (!$$('#my-login-screen')[0].checkValidity()) {
        //console.log('Check Validity!');
        return;
  }
  
  if ((grecaptcharesponsedata == undefined || grecaptcharesponsedata == '')&& (usecaptcha)){grecaptcha.execute();return;}
  
  var email = $$('#my-login-screen [name="email"]').val();
  var password = $$('#my-login-screen [name="password"]').val();
  let mypreloader = app.dialog.preloader();
  app.request({
    url: apiuserurl,
    method: 'POST',
    cache: false,
    data : { command: 'login',grecaptcharesponsedata: grecaptcharesponsedata, email: email,password: password, deviceid:mybsmideviceid}, 
    success: function (data, status, xhr)
      {
        //console.log(data);
        mypreloader.close();
                
        var status = JSON.parse(data).status;
        var data = JSON.parse(data).data;
        if (status == "success")
        {
          app.loginScreen.close('#my-login-screen');
          $$('#my-login-screen')[0].reset();
          $$('#overlay-welcome').hide();
          //console.log(atob(data.token));
          let token = JSON.parse(atob(data.token));
          let access = token.access;
          let refresh = token.refresh;
          var json = {email:email,token:refresh};
          window.mybsmiusertoken = access;
          window.localStorage["mybsmiuser"] = btoa(refresh);
          window.dashboarddata = data;
          getdefaultdatarun(data);
          fpollsession();
          flogger('password')
        }
        else if (status == "failed")
        {
          app.dialog.alert(data,'Terjadi Kesalahan');
          $$('#my-login-screen')[0].reset();
        }
        else if (status == "verifikasiemail")
        {
          //app.dialog.alert(data,'Terjadi Kesalahan');
            $$('#my-login-screen')[0].reset();
            var dialog = app.dialog.create({
              text: 'Akun membutuhkan verifikasi email',
              closeByBackdropClick: true,
              on: {
                opened: function () {
                  console.log('Dialog opened')
                }
              },
              buttons: [
                {
                  text: 'Kirim Email',
                  close:true,
                  onClick: function(dialog, e)
                    {
                        let mypreloader = app.dialog.preloader();
                        app.request({
                          url: apiuserurl,
                          method: 'POST',
                          cache: false,
                          data : { command: 'verifikasiemail', email: email,password: password  }, 
                          success: function (data, status, xhr)
                            {
                              //console.log(data);
                              mypreloader.close();

                              var status = JSON.parse(data).status;
                              var data = JSON.parse(data).data;
                              if (status == "success")
                              {
                                dialog.close();
                                app.dialog.alert('Mohon periksa kotak masuk atau kotak spam email anda','Email terkirim');
                              }
                              else if (status == "failed")
                              {
                                app.dialog.alert(data,'Terjadi Kesalahan');
                              }
                              else if (status == "dayliquotalimit")
                              {
                                app.dialog.alert('Saat ini server mencapai limit pengiriman email harian mohon coba lagi besok.','Terjadi Masalah');
                              }
                              else
                              {
                                app.dialog.alert('Tidak dapat memproses data','Terjadi Kesalahan');
                              }
                            },
                          error: function (xhr, status, message)
                            {
                              //console.log(message);
                              mypreloader.close();
                              app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
                            },
                        })
                    }
                }
              ],
            })
            dialog.open();          
        }
        else if (status == "verifikasidata")
        {
          app.dialog.alert('Akun masih dalam proses verifikasi data','Proses Verifikasi');
          $$('#my-login-screen')[0].reset();
        }
        else if (status == "suspen")
        {
          app.dialog.alert(data,'Pemberitahuan');///////////////////////////////////////////////////////////////////////////////////////
          $$('#my-login-screen')[0].reset();
        }
        else
        {
          app.dialog.alert('Tidak dapat memproses data','Terjadi Kesalahan');
          $$('#my-login-screen')[0].reset();
        }
      },
    error: function (xhr, status, message)
      {
        //console.log(message);
        mypreloader.close();
        app.dialog.alert('Server sedang sibuk','Terjadi Kesalahan');
      },
  })
  grecaptcharesponsedata = '';grecaptcha.reset();
});

$$("#my-login-screen").on("keydown",function(e){
   if(e.keyCode == 13){
	 e.preventDefault();
	 $$('#my-login-screen .login-button').click();
   }
});
//end form-login/////////////////////////////






//login dengan cara lain//////////////////////////////
var pkce_config = {
	client_id: "5Gt0ni2q2ypr1zg0osRScr2xZZnjvpfB",
	redirect_uri: window.location.origin,
	authorization_endpoint: "https://dev-c7irc54zcpa7ng8x.us.auth0.com/authorize",
	token_endpoint: "https://dev-c7irc54zcpa7ng8x.us.auth0.com/oauth/token",
	requested_scopes: "openid profile email",
	audience: "api",
	prompt: "login"
};
	
$$('#my-login-screen .login-dengan-cara-lain').on('click', async function () {
	
	let mypreloader = app.dialog.preloader();
	
	// PKCE HELPER FUNCTIONS

	// Generate a secure random string using the browser crypto functions
	function generateRandomString() {
		var array = new Uint32Array(28);
		window.crypto.getRandomValues(array);
		return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
	}

	// Calculate the SHA256 hash of the input text. 
	// Returns a promise that resolves to an ArrayBuffer
	function sha256(plain) {
		const encoder = new TextEncoder();
		const data = encoder.encode(plain);
		return window.crypto.subtle.digest('SHA-256', data);
	}

	// Base64-urlencodes the input string
	function base64urlencode(str) {
		// Convert the ArrayBuffer to string using Uint8 array to conver to what btoa accepts.
		// btoa accepts chars only within ascii 0-255 and base64 encodes them.
		// Then convert the base64 encoded to base64url encoded
		//   (replace + with -, replace / with _, trim trailing =)
		return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
			.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
	}

	// Return the base64-urlencoded sha256 hash for the PKCE challenge
	async function pkceChallengeFromVerifier(v) {
		hashed = await sha256(v);
		return base64urlencode(hashed);
	}
	
	var code_verifier = generateRandomString();
	var code_challenge = await pkceChallengeFromVerifier(code_verifier);
	
	console.log('code_verifier',code_verifier)
	console.log('code_challenge',code_challenge)
	
	localStorage.setItem("pkce_code_verifier", code_verifier);
	
	var state = generateRandomString();
	localStorage.setItem("pkce_state", state);
	
    var url = pkce_config.authorization_endpoint 
        + "?response_type=code"
        + "&client_id="+encodeURIComponent(pkce_config.client_id)
        + "&state="+encodeURIComponent(state)
        + "&scope="+encodeURIComponent(pkce_config.requested_scopes)
        + "&redirect_uri="+encodeURIComponent(pkce_config.redirect_uri)
        + "&code_challenge="+encodeURIComponent(code_challenge)
        + "&code_challenge_method=S256"
		+ "&audience="+encodeURIComponent(pkce_config.audience)
		+ "&prompt="+encodeURIComponent(pkce_config.prompt)
        ;

	if(access_token){
		localStorage.setItem("pkce_access_token", access_token);
	}
		
	 window.location = url;
	 
})
	
if(params.code && params.state){
	if(localStorage.getItem("pkce_state") == params.state) {
		
		let mypreloader = app.dialog.preloader();
		
		const data = new URLSearchParams({
            grant_type: "authorization_code",
            code: params.code,
            client_id: pkce_config.client_id,
            redirect_uri: pkce_config.redirect_uri,
            code_verifier: localStorage.getItem("pkce_code_verifier")
        })
		
		localStorage.removeItem("pkce_state");
		localStorage.removeItem("pkce_code_verifier");
		
		
		fetch(pkce_config.token_endpoint, {
			body: data,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			method: "post",
		})
		.then(function (response) {
			// The API call was successful!
			if (response.ok) {
				return response.text();
			} else {
				return Promise.reject(response);
			}
		}).then(function (data) {
			// This is the data from our response
			console.log(data);
			let json = JSON.parse(data)
			if(json.access_token){
				let auth0_access_token = json.access_token
				localStorage.setItem("auth0_access_token", auth0_access_token);
				if(localStorage.hasOwnProperty('pkce_access_token')){
					let dev_access_token = localStorage.getItem("pkce_access_token")
					localStorage.removeItem("pkce_access_token");
					window.location = window.location.origin+'/?access_token='+dev_access_token+'&auth0_access_token=true'
				}else{
					window.location = window.location.origin+'/?auth0_access_token=true'
				}
			}			
		}).catch(function (err) {
			// There was an error
			console.warn('Something went wrong.', err);
		});
	 }
 
}

if(params.auth0_access_token){
	if(localStorage.hasOwnProperty('auth0_access_token')){
		let auth0_access_token = localStorage.getItem("auth0_access_token")
		localStorage.removeItem("auth0_access_token");
		console.log('auth0_access_token',auth0_access_token);
		let state = "/"
		if(params.access_token){
			state = '/?access_token='+params.access_token
		}
		window.history.replaceState({}, document.title, state);
		floginwithauth0(auth0_access_token)
	}
}

function floginwithauth0(token)
{

      if (typeof mybsmideviceid === 'undefined' || mybsmideviceid === null) {
        // variable is undefined or null
        setTimeout(function(){ floginwithauth0(token); }, 500);
        return;
      }
      console.log('floginwithauth0');
      //$$('#overlay-welcome').hide();    

        let mypreloader = app.dialog.preloader();
        app.request({
          url: apiuserurl,
          method: 'POST',
          cache: false,
          data : { command: 'loginwithserviceauth0', email: 'noemail', password: token, deviceid:mybsmideviceid}, 
          success: function (data, status, xhr)
            {
              console.log(data);
              mypreloader.close();
                      
              var status = JSON.parse(data).status;
              var data = JSON.parse(data).data;
              if (status == "success")
              {
                console.log(data);
                $$('#overlay-welcome').hide();
                let token = JSON.parse(atob(data.token));
                let access = token.access;
                let refresh = token.refresh;
                window.mybsmiusertoken = access;
                window.localStorage["mybsmiuser"] = btoa(refresh);
                getdefaultdata(true)
                fpollsession();
                flogger('auth0')
              }
              else if (status == "failed")
              {
                $$('#overlay-welcome').css('display','flex');
				app.dialog.alert(data,'Terjadi Kesalahan');
              }
              else
              {
                $$('#overlay-welcome').css('display','flex');
				fcekexpiredtoken(data);
              }
            },
          error: function (xhr, status, message)
            {
              //console.log(message);
              mypreloader.close();
              $$('#overlay-welcome').css('display','flex');
            },
        })
       
}
//login dengan cara lain//////////////////////////////



///logout button/////////////////////////
function flogout()
{
$$('.my-logout').off('click')
$$('.my-logout').on('click', function () {
  app.popover.close('.profile-popover', false);
  flogoutkonfirm()
});
}

function flogoutkonfirm()
{
      var dialog = app.dialog.create({
        content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          +'<div style="width:100%;">'
          +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
          +'      <img id="img" src="" style="width:150px;height:150px;margin: 10px 10px;object-fit: cover;">'
          +'      <p style="font-weight:normal;">Apkah anda yakin ingin logout?</p>'
          +'      <div class="data-table"></div>'
          +'  </div>'
          +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
        closeByBackdropClick: false,
        destroyOnClose: true,
        verticalButtons: false,
        on: {
          opened: function () {
            //console.log('Dialog opened')
            let src = "icon512.png";
            $$('#img').attr('src',src);
          }
        },
        buttons: [
          {
            text: 'Nanti Saja',
            close:true,
            color: 'gray',
            onClick: function(dialog, e)
              {

              }
          },
          {
            text: 'Logout',
            close:true,
            color: 'red',
            onClick: function(dialog, e)
              {
                  flogoutrun();
                  localStorage.removeItem("mybsmiuser");
                  window.mybsmiusertoken = '';                  
                  $$('#overlay-welcome').css('display','flex');
              }
          },
        ]
      });
      dialog.open();
}

function flogoutrun()
{
  let mypreloader = app.dialog.preloader();
  app.request({
    url: apidataurl,
    method: 'POST',
    cache: false,
    data : { token:mybsmiusertoken, command: 'logout'}, 
    success: function (data, status, xhr)
      {
        mypreloader.close();
        var status = JSON.parse(data).status;
        var content = JSON.parse(data).data;
        if (status == "success")
        {
          //console.log(content);
          window.location.href = 'https://bsmijatim.org';
        }
        else if (status == "failed")
        {
          //console.log("failed");
          app.dialog.alert(content,'Terjadi Kesalahan');
        }
        else
        {
          //console.log("failed");
          //app.dialog.alert(content,'Terjadi Kesalahan');
          fcekexpiredtoken(content);
        }
      },
    error: function (xhr, status, message)
      {
        mypreloader.close();
        app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
      },
  })
}
///logout button/////////////////////////



//start check session/////////////////////////
function fchecksession(render=true)
{

      if (typeof mybsmideviceid === 'undefined' || mybsmideviceid === null) {
        // variable is undefined or null
        setTimeout(function(){ fchecksession(render); }, 500);
        return;
      }
      console.log('fchecksession');
      $$('#overlay-welcome').hide();    
      if (localStorage.getItem("mybsmiuser") === null) {$$('#overlay-welcome').css('display','flex');} else
      if (localStorage.getItem("mybsmiuser") !== null) {
        try{var token = atob(window.localStorage["mybsmiuser"]);}catch{var token = '';}
        let mypreloader = app.dialog.preloader();
        app.request({
          url: apiuserurl,
          method: 'POST',
          cache: false,
          data : { command: 'loginwithtoken', email: 'noemail', password: token, deviceid:mybsmideviceid}, 
          success: function (data, status, xhr)
            {
              console.log(data);
              mypreloader.close();
                      
              var status = JSON.parse(data).status;
              var data = JSON.parse(data).data;
              if (status == "success")
              {
                //console.log(data);
                $$('#overlay-welcome').hide();
                let token = JSON.parse(atob(data.token));
                let access = token.access;
                let refresh = token.refresh;
                window.mybsmiusertoken = access;
                window.localStorage["mybsmiuser"] = btoa(refresh);
                if(render){getdefaultdata(true);}else{getdefaultdata(false)}
                fpollsession();
                flogger('token')
              }
              else if (status == "failed")
              {
                localStorage.removeItem("mybsmiuser");
                $$('#overlay-welcome').css('display','flex');
              }
              else
              {
                fcekexpiredtoken(data);
              }
            },
          error: function (xhr, status, message)
            {
              //console.log(message);
              mypreloader.close();
              $$('#overlay-welcome').css('display','flex');
            },
        })
      } 
}
//fchecksession();

function fpollsession()
{
  window.mybsmipolltime = new Date().getTime();
  const poll = setInterval(function () 
  {//console.log('fpollsession');
    let now = new Date().getTime();
    let selisih = now-mybsmipolltime;
    let limit = 45*60*1000;
    if (selisih>limit)
    {
      console.log('fperiodikauth');
      window.mybsmipolltime = now;
      fperiodikauth();
      clearInterval(poll);
    }
  }, 1000);
}


function fperiodikauth()
{

      if (typeof mybsmideviceid === 'undefined' || mybsmideviceid === null) {
        // variable is undefined or null
        setTimeout(function(){ fperiodikauth(); }, 1000);
        return;
      }
          
      if (localStorage.getItem("mybsmiuser") !== null) {
        var token = atob(window.localStorage["mybsmiuser"]);
        let mypreloader = app.dialog.preloader(' ');
        app.request({
          url: apiuserurl,
          method: 'POST',
          cache: false,
          data : { command: 'loginwithtoken', email: 'noemail', password: token, deviceid:mybsmideviceid}, 
          success: function (data, status, xhr)
            {
              //console.log(data);
              mypreloader.close();
                      
              var status = JSON.parse(data).status;
              var data = JSON.parse(data).data;
              if (status == "success")
              {
                //console.log(data);

                let token = JSON.parse(atob(data.token));
                let access = token.access;
                let refresh = token.refresh;
                window.mybsmiusertoken = access;
                window.localStorage["mybsmiuser"] = btoa(refresh);
                fpollsession();
              }
              else if (status == "failed")
              {
                localStorage.removeItem("mybsmiuser");
                $$('#overlay-welcome').css('display','flex');
              }
              else
              {
              }
            },
          error: function (xhr, status, message)
            {
              //console.log(message);
              mypreloader.close();
              setTimeout(function(){ fperiodikauth(); }, 1000);
            },
        })
      } 
}

function flogger(input)
{

      if (typeof dashboarddata === 'undefined' || dashboarddata === null) {
        // variable is undefined or null
        setTimeout(function(){ flogger(input); }, 500);
        return;
      }
      
      if (isLocal) return
      if(dashboarddata.user.userbid == 'BSMI3500AA')return
      if(skipuid.includes(dashboarddata.user.useruid)) return
      
      let login = input
      let nama = dashboarddata.user.usernama
      let bid = dashboarddata.user.userbid
      let deviceid = mybsmideviceid
      let os = detectOS()
      let api = "https://cors.bsmijatim.workers.dev/?";
      let loggerurl = 'https://docs.google.com/forms/d/e/1FAIpQLSfuBZEKlMZXg0GWYWMFMpKw5TfAY6CEblQlfXFtBemZbX8dGQ/formResponse?usp=pp_url&entry.1824018213='+login+'&entry.80916288='+nama+'&entry.1899221220='+bid+'&entry.1872077722='+deviceid+'&entry.1304625725='+os
      fetch(api+loggerurl)
      .then(response => response.text())
      .then(async(response) => {
          console.log('logger ok')
      })
}

function fcekexpiredtoken(data, showalert = true)
{
  if (data === 'Token sudah expired server tidak merespon')
  {

      var dialog = app.dialog.create({
        content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          +'<div style="width:100%;">'
          +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
          +'      <img id="img" src="" style="width:150px;height:150px;margin: 10px 10px;object-fit: cover;">'
          +'      <p style="font-weight:normal;">Gangguan Koneksi</p>'
          +'      <div class="data-table"></div>'
          +'  </div>'
          +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
        closeByBackdropClick: false,
        destroyOnClose: true,
        verticalButtons: false,
        on: {
          opened: function () {
            //console.log('Dialog opened')
            let src = "icon512.png";
            $$('#img').attr('src',src);
          }
        },
        buttons: [
          {
            text: 'LOGOUT',
            close:true,
            color: 'gray',
            onClick: function(dialog, e)
              {
                flogoutkonfirm();
              }
          },
          {
            text: 'RELOAD',
            close:true,
            color: 'red',
            onClick: function(dialog, e)
              {
                //window.open(window.location.href, "_blank");
                fpagereload();
              }
          },
        ]
      });
      dialog.open();

  }
  else
  {
    if (!showalert) app.dialog.alert(content,'Terjadi Kesalahan');
  }
}
//end check session///////////////////////////



/////////////verifikasiemail//////////////////

var code = params.verifikasi;//console.log(code);

if (code !== undefined)
{
  let mypreloader = app.dialog.preloader();
  app.request({
    url: apiuserurl,
    method: 'GET',
    cache: false,
    data : { command: 'verifikasiemail', code: code}, 
    success: function (data, status, xhr)
      {
        //console.log(data);
        mypreloader.close();

        var status = JSON.parse(data).status;
        var data = JSON.parse(data).data;
        if (status == "success")
        {
            var dialog = app.dialog.create({
              text: 'Alamat email berhasil diverifikasi',
              on: {
                opened: function () {
                  //console.log('Dialog opened')
                }
              },
              buttons: [
                {
                  text: 'OK',
                  close:false,
                  onClick: function(dialog, e)
                    {
                      window.location.href = 'https://mybsmi.bsmijatim.org';
                    }
                }
              ]
            })
            dialog.open();
        }
        else if (status == "failed")
        {
          app.dialog.alert(data,'Terjadi Kesalahan');
        }
        else
        {
          app.dialog.alert(data,'Terjadi Kesalahan');
        }
      },
    error: function (xhr, status, message)
      {
        //console.log(message);
        mypreloader.close();
        app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
      },
  })
}

//endverifikasiemail/////////////////////////





////pencarian///////////////////////////////////////////////
//var params = getParams(window.location.href);
var cari = params.cari;
if (cari !== undefined)
{
  let mypreloader = app.dialog.preloader();
  app.request({
    url: apidataurl,
    method: 'GET',
    cache: false,
    data : { command: 'pencarian', cari: cari}, 
    success: function (data, status, xhr)
      {
        //console.log(data);
        mypreloader.close();

        var status = JSON.parse(data).status;
        var data = JSON.parse(data).data;
        if (status == "success")
        {
            //console.log(data);
            var dialog = app.dialog.create({
              title: 'Data ditemukan',
              content: '<p>Nama : '+safe(data.nama)+'</p><p>Cabang : '+safe(data.cabang)+'</p><p>No.KTA : '+safe(data.nokta)+'</p>',
              on: {
                opened: function () {
                  //console.log('Dialog opened')
                }
              },
              buttons: [
                {
                  text: 'OK',
                  close:true,
                  onClick: function(dialog, e)
                    {
                      window.location.href = 'https://mybsmi.bsmijatim.org';
                    }
                }
              ]
            })
            dialog.open();
        }
        else if (status == "failed")
        {
          app.dialog.alert(data,'Terjadi Kesalahan');
        }
        else
        {
          app.dialog.alert(data,'Terjadi Kesalahan');
        }
      },
    error: function (xhr, status, message)
      {
        //console.log(message);
        mypreloader.close();
        app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
      },
  })
}
////pencarian//////////////////////////////////////////////




//////dev mode/////////////////////////////////////////////////////////
if (isLocal)
{
  app.dialog.prompt('', 'DEV MODE', function (pwd){fdevmode(pwd);})
}

function fdevmode(pwd)
{
  let mypreloader = app.dialog.preloader();
  let devmodeurl = 'https://script.google.com/macros/s/AKfycbztYLCDVY-nZyQJFK7QhIRboEcuRUWPIrfkGzbU6bUnTEn909HgWhwc1VadGotPDIkp7Q/exec';
  app.request({
    url: devmodeurl,
    method: 'POST',
    cache: false,
    data : { password: pwd}, 
    success: function (data, status, xhr)
      {
        console.log('devdata = '+data);
        mypreloader.close();

        var status = JSON.parse(data).status;
        var data = JSON.parse(data).data;
        if (status == "success")
        {
            //console.log(data);
            window.location.href = '/?access_token='+data;
        }
        else if (status == "failed")
        {
          app.dialog.alert(data,'Terjadi Kesalahan');
        }
        else
        {
          app.dialog.alert(data,'Terjadi Kesalahan');
        }
      },
    error: function (xhr, status, message)
      {
        //console.log(message);
        mypreloader.close();
        app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
      },
  })
}
///////dev mode/////////////////////////////////////////////////////////






////start getdefaultdata///////////////////////////
function getdefaultdata(render=true)
{
  let mypreloader = app.dialog.preloader();
  app.request({
    url: apidataurl,
    method: 'POST',
    cache: false,
    data : { token:mybsmiusertoken, command: 'getdefaultdata'}, 
    success: function (data, status, xhr)
      {
        mypreloader.close();
        var status = JSON.parse(data).status;
        var content = JSON.parse(data).data;
        if (status == "success")
        {
          //console.log(content);
          if (render){getdefaultdatarun(content)}
          window.dashboarddata = content;
        }
        else if (status == "failed")
        {
          //console.log("failed");
          app.dialog.alert(content,'Terjadi Kesalahan');
        }
        else
        {
          //console.log("failed");
          //app.dialog.alert(content,'Terjadi Kesalahan');
          fcekexpiredtoken(content);
        }
      },
    error: function (xhr, status, message)
      {
        console.log(message);
        mypreloader.close();
        app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
      },
  })
}

function getdefaultdatarun(data)
{ //console.log(data)
  kodecabang = data.kodecabang;
  $$('.mybsmi-currentusernama').text(safe(data.user.usernama));
  if (data.user.userphoto !== '') {$$('.mybsmi-avatar').attr('src','https://lh3.googleusercontent.com/d/'+safe(data.user.userphoto));}
  //if (data.user.userstatus === "Terverifikasi"){$$('.mybsmi-avatar-badge').css('display','flex');};
  flogout();

  let html = ''+
                '<div class="card data-table">'+
                  '<div class="card-header">Data</div>'+
                  '<div class="card-content">'+
                    '<table>'+
                      '<thead>'+
                        '<tr>'+
                          '<th class="label-cell">BSMI Provinsi</th>'+
                          '<th class="numeric-cell">Relawan</th>'+
                        '</tr>'+
                      '</thead>'+
                      '<tbody class="mybsmi-rekapitulasiprov">';
  var relawan = 0;relawan = relawan-skipuid.length;
  var cabang = 0;
  var rekapitulasiprov = '';
  var rekapitulasicabang = '';
  var datacabang = data.cabang;
  datacabang.sort(function(a, b){return b.relawan - a.relawan});
  for(i=0;i<datacabang.length;i++)
  {
    let kode;
    for(var j=0;j<kodecabang.length;j++)
    {
      if (datacabang[i].cabang === kodecabang[j][0])
      {
        kode = kodecabang[j][1];
      }
    }
    
    if (datacabang[i].cabang == 'BSMI Jawa Timur')
    {
      rekapitulasiprov += '<tr> <td class="label-cell"><a href="/cabang/'+kode+'">'+safe(datacabang[i].cabang)+'</a></td> <td class="numeric-cell">'+safe(datacabang[i].relawan-skipuid.length)+'</td> </tr>';
      //cabang = cabang+1;
    }
    else
    {
    rekapitulasicabang += '<tr> <td class="label-cell"><a href="/cabang/'+kode+'">'+safe(datacabang[i].cabang)+'</a></td> <td class="numeric-cell">'+safe(datacabang[i].relawan)+'</td> </tr>';
    cabang = cabang+1;
    }
    relawan = relawan+datacabang[i].relawan;
  }
  html += rekapitulasiprov;
  html += ''+
                      '</tbody>'+
                    '</table>'+
                    '<table>'+
                      '<thead>'+
                        '<tr>'+
                          '<th class="label-cell">BSMI Cabang Kota/Kabupaten</th>'+
                          '<th class="numeric-cell">Relawan</th>'+
                        '</tr>'+
                      '</thead>'+
                      '<tbody class="mybsmi-rekapitulasicabang">';
  html += rekapitulasicabang;
  html += ''+                    
                      '</tbody>'+
                    '</table>'+
                    '<div class="data-table-footer">'+
                    '</div>'+
                  '</div>'+
                '</div>';
  $$('.mybsmi-statistik').html(html);

  var ratiorelawan = relawan/(relawan*10);
  var gauge1 = app.gauge.get('#mybsmi-relawan');
  gauge1.update({
    el: '#mybsmi-relawan',
    value: ratiorelawan,
    valueText: relawan,
  })  

  var ratiocabang = cabang/38;
  var gauge2 = app.gauge.get('#mybsmi-cabang');
  gauge2.update({
    el: '#mybsmi-cabang',
    value: ratiocabang,
    valueText: cabang,
  })
  
  let statistik = $$('.beranda-data-statistik').html()
  $$('.beranda-toggle-statistik').off('click')
  $$('.beranda-toggle-statistik').on('click', function () {
    //$$('.beranda-data-statistik').toggleClass('display-none')
	
	let page = ''+
		'<div class="page" data-name="Statistik">'+
		  '<div class="navbar">'+
			'<div class="navbar-bg"></div>'+
			'<div class="navbar-inner sliding">'+
			  '<div class="left">'+
				'<a href="#" class="link back">'+
				  '<i class="icon icon-back"></i>'+
				  '<span class="ios-only">Back</span>'+
				'</a>'+
			  '</div>'+
			  '<div class="title">Dashboard</div>'+
			'</div>'+
		  '</div>'+
		  '<div class="page-content">'+
				statistik+	  
		  '</div>'+
		'</div>'
		
	app.views.main.router.navigate({url:"/data/", route:{content:page}});

  })
  
  $$('.beranda-toggle-statistik').css("cursor","pointer");
  
  let usermydata = JSON.parse(data.user.usermydata)
  if (usermydata.verifikasiidentitas)
  {
    $$('.mybsmi-ektamenu').show();
	$$('#ektamenustyle').remove();
  } 
  if (usermydata.verifikator)
  {
    $$('.mybsmi-verifikatormenu').show();
  }  
  if ((usermydata.admincabang)||(usermydata.adminlaporan))
  {
    $$('.mybsmi-adminmenu').show();
  }  
  if (usermydata.master)
  {
    $$('.mybsmi-mastermenu').show();
	if(!isLocal)$$('#experiment').remove()
  }else{
	$$('#experiment').remove();
  }
  if (!usermydata.geodata)
  {
    fkirimgeodata();
  } 
  
}
///end getdefaultdata//////////////////////////////





//////fkirimgeodata/////////////////////////////////////////////
function fkirimgeodata()
{
  fetch('https://get.geojs.io/v1/ip/geo.json', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      },
  })
  .then(response => response.json())
  .then(async(response) => {
	  if(response.city == undefined || response.region == undefined){
		fkirimgeodataupdate(response)
	  }else{
		fkirimgeodatarun(response);
	  }
  })
}

function fkirimgeodataupdate(geodata)
{
  fetch('https://freeipapi.com/api/json', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      },
  })
  .then(response => response.json())
  .then(async(response) => {
		const json = response
		geodata.city = json.cityName
		geodata.region = json.regionName
		geodata.latitude = json.latitude
		geodata.longitude = json.longitude
		fkirimgeodatarun(geodata);
  })
}

function fkirimgeodatarun(data)
{
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'updateusergeodata', data:JSON.stringify(data)}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}
//////fkirimgeodata/////////////////////////////////////////////






//////fpagecabang/////////////////////////////////////////////
function fpagecabang(run = true,cabangid)
{
  //console.log(cabangid);
  if (typeof mybsmicabangdata === 'undefined' || mybsmicabangdata === null)
  {
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'getcabangdata'}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
              window.mybsmicabangdata = content;
              if (run) fpagecabangrun(content,cabangid);
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
  }
  else
  {
    if (run) fpagecabangrun(mybsmicabangdata,cabangid);
  }

  $$('.mybsmi-cabangrefresh').on('click', function () {
    //mybsmicabangdata = null
    //fpagecabang()
  })
}

function fpagecabangrun(content,cabangid)
{
  //console.log('cabang',content);
  for (i=0;i<kodecabang.length;i++)
  {
    if (kodecabang[i][1] === cabangid) {cabangnama = kodecabang[i][0];datacabang = kodecabang[i];}
  }
  //console.log(datacabang);
  var ig;if (datacabang[4] != ''){ig = 'IG : @'+datacabang[4];}else{ig='';}
  var profil = safe(datacabang[0])+'<p style="font-size:10px;">'+safe(datacabang[2])+'</br>'+safe(datacabang[3])+'</br>'+safe(ig)+'</p>';
  //$$('.mybsmi-cabangnama').text(cabangnama);
  $$('.mybsmi-cabangnama').html(profil);
  $$('.mybsmi-cabang').html('');
  if (datacabang[5] != '' && !skipuid.includes(datacabang[5]))
  {
    $$('.mybsmi-cabang').append('<p style="font-size:10px;">Ketua : <a class="ketuacabang" data-user="'+datacabang[5]+'">'+datacabang[6]+'</a></p>');
    $$('.mybsmi-cabang .ketuacabang').on('click', function (e) {
          let data = this.attributes["data-user"].value;
          let url = "/relawan/"+safe(data);
          app.views.main.router.navigate(url);
    });
  }
  $$('.mybsmi-cabang').append('<p style="font-size:10px;">Relawan : <span class="jumlahrelawan"></span> Orang</p>');
  let struktur = JSON.parse(datacabang[8])
  if(struktur.length > 0)
  {
		let html = '<p>Dewan Pengurus</p>'+
			'<div class="list struktur">'+
				'<ul>'
		
		let arr = struktur
		let datarelawan = content
		for(let i=0;i<arr.length;i++)
		{
			let item = arr[i]
			let data = datarelawan.find((arr)=>arr[1]==item.namapengurusid)
			console.log(data)
			let el = ''+
			  '<li>'+
				'<div class="item-content">'+
				  '<div class="item-media"><a href="/relawan/'+safe(data[1])+'"><img src="https://lh3.googleusercontent.com/d/'+safe(data[5])+'" style="width:1.5em;aspect-ratio:1/1;object-fit:cover;border-radius:50% 50%;overflow:hidden;"></a></div>'+
				  '<div class="item-inner">'+
					'<div class="item-title"><a href="/relawan/'+safe(data[1])+'" class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(data))+'">'+safe(data[3])+'</a> <span style="font-size:10px;">('+safe(data[6])+')</span></div>'+
					'<div class="item-after"><a href="/relawan/'+safe(data[1])+'">'+safe(item.jabatanpengurus)+'</a></div>'+
				  '</div>'+
				'</div>'+
			  '</li>'
			  
			 html += el
		}
		
		html += '</ul></div>'	  
		$$('.mybsmi-cabang').append(html)
  }
  var data = '<p>Anggota Relawan</p><div class="data-table data-table-collapsible data-table-init"><table><thead><tr><th></th><th>Nama</th><th>No. KTA</th><th>Cabang</th></tr></thead><tbody>';
  var jumlahrelawan = 0;
  for (i=content.length-1;i>-1;i--)
  {
      if ((skipuid.includes(content[i][1]))&&(dashboarddata.user.useruid !== '0ONjeb65X5OunuRI6Ap8')){continue;}else{if ((skipuid.includes(content[i][1]))&&(!isLocal)) continue;}
      
      if ((content[i][2] === 'Terbatas')||(content[i][2] === 'Terverifikasi')||(content[i][2] === 'Tertolak')){}else{continue;}
      
      if (content[i][4] === cabangnama){}else{continue;}
      
      let date = new Intl.DateTimeFormat("id-ID", { hour12:false,dateStyle: "short" , timeStyle: "short",  timeZone: "Asia/Jakarta"}).format(new Date(content[i][0]));date = date.split(' ');date = date[0];
	  
	  let badge = content[i][2] === 'Terverifikasi' ? '<i class="icon f7-icons" style="font-size:12px;color:blue;">checkmark_seal</i>' : '';badge = ''
      
      data += '<tr class="mybsmi-admin-item-'+safe(content[i][1])+'"><td data-collapsible-title=""><img src="avatar.png" style="width:1.5em;aspect-ratio:1/1;object-fit:cover;border-radius:50% 50%;overflow:hidden;"></td><td data-collapsible-title="Nama"><a class="mybsmi-cabangaction" data-user="'+btoa(JSON.stringify(content[i]))+'">'+safe(content[i][3])+'</a> '+badge+'</td><td data-collapsible-title="No. KTA">'+safe(content[i][6])+'</td><td data-collapsible-title="Cabang">'+safe(content[i][4])+'</td></tr>';
      
      jumlahrelawan++;
  }
  data += '</tbody></table></div>';
  $$('.mybsmi-cabang').append(data);
  $$('.jumlahrelawan').text(jumlahrelawan);
  
  for (i=content.length-1;i>-1;i--)
  {
    let url = 'https://lh3.googleusercontent.com/d/'+safe(content[i][5]);
    if(content[i][5]!='')$$('.mybsmi-admin-item-'+safe(content[i][1])+' img').attr('src',url);
  }

  $$('.mybsmi-cabang a.mybsmi-cabangaction').on('click', function (e) {
        let base64 = this.attributes["data-user"].value;
        let data = JSON.parse(atob(base64));
        //console.log(data);
        let url = "/relawan/"+safe(data[1]);
        //console.log(url);
        app.views.main.router.navigate(url);
  });

  $$('.mybsmi-cabang-share').on('click', function (e) {
            let route = app.views.current.router.currentPageEl.baseURI
            if (navigator.share) {
              navigator
                .share({
                  title: "Share",
                  //text: "Share",
                  url: route
                })
                .then(() => console.log("thanks for share"))
                .catch(error => console.log("error", error));
            } 
            
  });
  
  $$('.mybsmi-cabang-share').css("cursor","pointer");
}
//////fpagecabang///////////////////////////////////////////////





//////////////////////////////////////////////////////////////
function fpagerelawan(relawanid)
{

  fpagecabang(false);
  function fperiksakesiapan()
  {
      if (typeof mybsmicabangdata === 'undefined' || mybsmicabangdata === null) {
        setTimeout(function(){ fperiksakesiapan(); }, 1000);
        return;
      }

      for (var i=0;i<mybsmicabangdata.length;i++)
      {
        if (relawanid === mybsmicabangdata[i][1])
        {
          fpagerelawanrun(mybsmicabangdata[i]);
        }
      }
  }
  fperiksakesiapan()
}

function fpagerelawanrun(data)
{
  //console.log(data);
  let date = new Intl.DateTimeFormat("id-ID", { hour12:false,dateStyle: "short" , timeStyle: "short",  timeZone: "Asia/Jakarta"}).format(new Date(data[0]));date = date.split(' ');date = date[0];
  const cabang= dashboarddata.kodecabang.find((cabang) => cabang[0]==data[4]);
  let html = ''
+'    <img class="mybsmi-relawan-userphoto" src="avatar.png" style="width:150px;height:150px;margin: 20px 10px 0px;border-radius: 50%;object-fit: cover;"><span class="badge color-blue mybsmi-relawan-avatar-badge" style="bottom:20px;right:-40px;display:none;"><i class="icon f7-icons" style="font-size:12px;">checkmark_seal</i></span>'
+'    <p class="mybsmi-relawan-data text-align-center"><span style="font-weight:bold;">'+safe(data[3])+'</span><br><span style="font-weight:normal;">No. KTA : '+safe(data[6])+'</span><br><span style="font-weight:normal;"><a href="/cabang/'+cabang[1]+'">'+safe(data[4])+'</a><span><br><span style="font-weight:normal;">Status Keanggotaan : '+safe(data[8])+'<span><br><span style="font-weight:normal;display:none;">Poin : '+safe(data[7])+' Bintang</span><br><span style="font-weight:normal;font-size:12px;">Aktivasi '+safe(date)+'</span><br><br><span><a href="#" class="button button-fill color-red display-none mybsmi-relawan-kirimpesan">Kirim Pesan</a></span><p>';
  $$('.mybsmi-relawan').html(html);
  let src = "https://lh3.googleusercontent.com/d/"+safe(data[5]);
  if(data[5]!='')$$('.mybsmi-relawan-userphoto').attr('src',src);
  if (data[2] === "Terverifikasi") $$('.mybsmi-relawan-avatar-badge').css("display","block");
  if (data[1] !== dashboarddata.user.useruid) $$('.mybsmi-relawan-kirimpesan').removeClass('display-none');
  $$('.mybsmi-relawan-kirimpesan').on('click', function (e) {
        fkirimpesan(data[1],data[3],data[5])
  });

  $$('.mybsmi-relawan-share').on('click', function (e) {
            let route = app.views.current.router.currentPageEl.baseURI
            if (navigator.share) {
              navigator
                .share({
                  title: "Share",
                  //text: "Share",
                  url: route
                })
                .then(() => console.log("thanks for share"))
                .catch(error => console.log("error", error));
            } 
            
  });
  
  $$('.mybsmi-relawan-share').css("cursor","pointer");
  
}
////////////////////////////////////////////////////////////





///grecaptcha/////////////////////////////////
function grecaptcharesponselogin(data)
{
	 grecaptcharesponse(data)
	 $$('#my-login-screen .login-button').click()
}

function grecaptcharesponseaktivasi(data)
{
	 grecaptcharesponse(data)
	 $$('#my-aktivasi-screen .register-button').click()
}

function grecaptcharesponse(data)
{
  //console.log(data);
  grecaptcharesponsedata = data;
}

function grecaptchaexpired()
{
  //console.log('expired');
  grecaptcharesponsedata = '';
}
///grecaptcha/////////////////////////////////




////fpageprofilku////////////////////////////
function fpageprofilku()
{
    var data = dashboarddata.user;
    if(data.userphoto!='')$$('.mybsmi-profilku .mybsmi-userphoto').attr('src','https://lh3.googleusercontent.com/d/'+safe(data.userphoto));
    let bintang = JSON.parse(data.usermydata).bintang;//console.log(bintang);
    if (typeof bintang === 'undefined' || bintang === null) bintang = 0;
    $$('.mybsmi-profilku .mybsmi-bintang').text(safe(bintang)+' bintang');
    $$('.mybsmi-profilku .mybsmi-usernokta').text(safe(data.userbid));
    $$('.mybsmi-profilku .mybsmi-usernama').text(safe(data.usernama));
    $$('.mybsmi-profilku .mybsmi-userjeniskelamin').text(safe(data.userjeniskelamin));
    $$('.mybsmi-profilku .mybsmi-usertanggallahir').text(safe(data.usertanggallahir));
    $$('.mybsmi-profilku .mybsmi-userprofesi').text(safe(data.userprofesi));
    $$('.mybsmi-profilku .mybsmi-usergolongandarah').text(safe(data.usergolongandarah));
    $$('.mybsmi-profilku .mybsmi-useralamatdomisili').text(safe(data.useralamatdomisili));
    $$('.mybsmi-profilku .mybsmi-useremail').text(safe(data.useremail));
    $$('.mybsmi-profilku .mybsmi-usernohp').text(safe(data.userhp));
    $$('.mybsmi-profilku .mybsmi-usercabang').text(safe(data.usercabang));
    $$('.mybsmi-profilku .mybsmi-usertahunbergabung').text(safe(data.usertahunbergabung));
    if (data.userstatus === "Terverifikasi"){
      $$('.mybsmi-avatar-badge').css('display','flex');
    }
    let mydata = JSON.parse(dashboarddata.user.usermydata)
    if (!mydata.verifikasiidentitas)
    {
      $$('.mybsmi-profilku-verifikasi').removeClass('display-none');
    }
    $$('.mybsmi-lihatprofil').on('click', function (e) {
        let url = "/relawan/"+safe(data.useruid);
        app.views.main.router.navigate(url);          
    });
    $$('.mybsmi-profilku-verifikasi').off('click');
    $$('.mybsmi-profilku-verifikasi').on('click', function (e) {
        //fverifikasiidentitas();
        let mydata = JSON.parse(dashboarddata.user.usermydata)   
        if (!mydata.verifikasiidentitas){  
            fverifikasidata()
        }else{
            app.dialog.alert('Proses verifikasi data','Proses');
        }
    });
}
////fpageprofilku////////////////////////////




///////RESET PASSWORD BUTTON/////////////////////////////////////////////////////////////////////////////////////////////////
function resetpasswordbutton()
{
    $$(".reset-password-open").click(function(){
      resetpasswordopen();
    });
}

resetpasswordbutton();

function resetpasswordopen()
{
    var dynamicPopup = app.popup.create({
      content: '<div class="popup" style="background:#fff">'+
      '<div class="block">'+
      
        '<form id="resetpasswordform" class="login-screen-content"><div class="login-screen-title">Reset Password</div> <div class="list"> <ul> <li class="item-content item-input"> <div class="item-inner"> <div class="item-title item-label">Email</div> <div class="item-input-wrap"> <input id="resetpasswordemail" type="email" name="email" placeholder="Masukkan email" required validate> </div> </div> </li> <li class="item-content item-input"> <div style="padding:20px 20px;justify-content:center;align-items:center;display:flex;width:100%;"> <div id="mybsmi-lupapassword" class="g-recaptcha" data-sitekey="6LckvswpAAAAAK93msw3SHb4x4TKkwlH1bRT16LR" data-callback="grecaptcharesponseresetpasswordemail" data-expired-callback="grecaptchaexpired" data-size="invisible"></div> </div> <li> </ul> </div> <div class="list"> <div class="block-footer"><a href="#" class="button button-raised button-fill resetpasswordemailsubmit">SUBMIT</a><center><a href="#" class="item-link list-button actions-close popup-close">Batal</a></center></div> </div></form>'+
        
       '</div></div>',
    });     
    dynamicPopup.open();
    let widgetid = grecaptcha.render( 'mybsmi-lupapassword');
        
    $$(".resetpasswordemailsubmit").click(function(){
      resetpasswordemail(dynamicPopup,widgetid);
    });

	$$("#resetpasswordform").on("keydown",function(e){
	   if(e.keyCode == 13){
		 e.preventDefault();
		 $$('.resetpasswordemailsubmit').click();
	   }
	});
	
	//$$("#resetpasswordform").focus()
}

function grecaptcharesponseresetpasswordemail(data)
{
	 grecaptcharesponse(data)
	 $$('.resetpasswordemailsubmit').click()
}

function resetpasswordemail(dynamicPopup,widgetid)
{
    if (!$$('#resetpasswordform')[0].checkValidity()) {
        //console.log('Check Validity!');
        return;
    }
    
    if ((grecaptcharesponsedata == undefined || grecaptcharesponsedata == '')&& (usecaptcha)){grecaptcha.execute(widgetid);return;}
    
    var email = $$('#resetpasswordform [name="email"]').val();
    //console.log(email);
      
      let mypreloader = app.dialog.preloader(); 
      app.request({
          method: "POST",
          data : {command:'resetpasswordemail',email: email, password: 'pwd',grecaptcharesponsedata: grecaptcharesponsedata},
          url: apiuserurl,
          error: function(xhr, status, message) 
            {
              //console.log(message);
              mypreloader.close();
              dynamicPopup.close();  
              //var toastBottom = app.toast.create({ text: 'Server sedang sibuk', closeTimeout: 5000,position: 'center', });toastBottom.open();  
              app.dialog.alert('Server sedang sibuk','Terjadi Kesalahan');       
            },
          success: function(data, status, xhr) 
            {
              //console.log(data);
              mypreloader.close(); 
              //var toastBottom = app.toast.create({ text: jqXHR.responseText, closeTimeout: 2000,position: 'center', });toastBottom.open();
              var json = JSON.parse(data); 
              var status = json['status'];
              var msg = json['data'];
              if (status === "success")
              {
                dynamicPopup.close();
                resetpasswordotpform(email,msg);
              }
              else if ((status === "error") || (status === "failed")) 
              {
                dynamicPopup.close();
                //var toastBottom = app.toast.create({ text: msg, closeTimeout: 5000,position: 'center', });toastBottom.open();
                app.dialog.alert(msg,'Terjadi Kesalahan');
              }
              else
              {
                dynamicPopup.close();
                //var toastBottom = app.toast.create({ text: msg, closeTimeout: 5000,position: 'center', });toastBottom.open();
                app.dialog.alert(msg,'Terjadi Kesalahan');
              }
              
            }
      }); 
	  grecaptcharesponsedata = '';grecaptcha.reset(widgetid);
      
}
function resetpasswordotpform(email,hash)
{
    var dynamicPopup = app.popup.create({
      content: '<div class="popup" style="background:#fff">'+
      '<div class="block">'+
      
        '<form id="resetpasswordotpform" class="login-screen-content"><div class="login-screen-title">Reset Password</div><center><p>Kode OTP telah dikirimkan ke email anda. Periksa di inbox atau folder spam. </p><p>Kedaluwarsa dalam <span id="otpexpired">120</span> detik</p></center> <div class="list"> <ul> <li class="item-content item-input"> <div class="item-inner"> <div class="item-title item-label">Kode OTP</div> <div class="item-input-wrap"> <input id="resetpasswordotp" type="text" name="otp" placeholder="Masukkan kode OTP" pattern="[0-9]{6}" required validate> </div> </div> </li> <li class="item-content item-input"> <div style="padding:20px 20px;justify-content:center;align-items:center;display:flex;width:100%;"> <div id="mybsmi-lupapasswordotp" class="g-recaptcha" data-sitekey="6LckvswpAAAAAK93msw3SHb4x4TKkwlH1bRT16LR" data-callback="grecaptcharesponseresetpasswordotp" data-expired-callback="grecaptchaexpired" data-size="invisible"></div> </div> <li></ul> </div> <div class="list"> <div class="block-footer"><a href="#" class="button button-raised button-fill resetpasswordotpsubmit">SUBMIT</a><center><a href="#" class="item-link list-button actions-close popup-close">Batal</a></center></div> </div></form>'+
        
       '</div></div>',
    });     
    dynamicPopup.open();
    let widgetid = grecaptcha.render( 'mybsmi-lupapasswordotp');
    
    otpexpired();
    
    $$(".resetpasswordotpsubmit").click(function(){
      resetpasswordotp(dynamicPopup,email,hash,widgetid);
    }); 

	$$("#resetpasswordotpform").on("keydown",function(e){
	   if(e.keyCode == 13){
		 e.preventDefault();
		 $$('.resetpasswordotpsubmit').click();
	   }
	});
}

function grecaptcharesponseresetpasswordotp(data)
{
	 grecaptcharesponse(data)
	 $$('.resetpasswordotpsubmit').click()
}

function otpexpired()
{
    setTimeout(function () {
          var expired = $$('#otpexpired').text();
          if (expired != 0)
          {
            var newexpired = expired-1;
            $$('#otpexpired').text(newexpired);
            otpexpired();
          }
    }, 1000);
}

function resetpasswordotp(dynamicPopup,email,hash,widgetid)
{
    if (!$$('#resetpasswordotpform')[0].checkValidity()) {
        //console.log('Check Validity!');
        return;
    }
    
    if ((grecaptcharesponsedata == undefined || grecaptcharesponsedata == '')&& (usecaptcha)){grecaptcha.execute(widgetid);return;}
    
    var otp = $$('#resetpasswordotpform [name="otp"]').val();
    //console.log(email);
      
      let mypreloader = app.dialog.preloader(); 
      app.request({
          method: "POST",
          data : {command:'resetpasswordotp',email:email,password:'pwd',hash:hash,otp:otp,grecaptcharesponsedata: grecaptcharesponsedata},
          url: apiuserurl,
          error: function(xhr, status, message) 
            {
              //console.log(message);
              mypreloader.close(); 
              dynamicPopup.close(); 
              //var toastBottom = app.toast.create({ text: 'Server sedang sibuk', closeTimeout: 5000,position: 'center', });toastBottom.open();          
              app.dialog.alert('Server sedang sibuk','Terjadi Kesalahan');
            },
          success: function(data, status, xhr) 
            {
              //console.log(data);
              mypreloader.close(); 
              //dynamicPopup.close();
              var json = JSON.parse(data); 
              var status = json['status'];
              var msg = json['data'];
              if (status === "success")
              {
				dynamicPopup.close();
				resetpasswordinputform(msg,email);
              }
              else if (status === "failed")
              {
                var toastBottom = app.toast.create({ text: msg, closeTimeout: 5000,position: 'center', });toastBottom.open();
                //app.dialog.alert(msg,'Terjadi Kesalahan');
              }
              else
              {
                //var toastBottom = app.toast.create({ text: msg, closeTimeout: 5000,position: 'center', });toastBottom.open();
                dynamicPopup.close();
				app.dialog.alert(msg,'Terjadi Kesalahan');
              }
            }
      }); 
	  grecaptcharesponsedata = '';grecaptcha.reset(widgetid);
}

function resetpasswordinputform(data,email)
{
    var dynamicPopup = app.popup.create({
      content: '<div class="popup" style="background:#fff">'+
      '<div class="block">'+
      
        '<form id="resetpasswordinputform" class="login-screen-content"><div class="login-screen-title">Reset Password</div><p><center>Masukkan password baru anda. </center></p> <div class="list"> <ul> <li class="item-content item-input"> <div class="item-inner"> <div class="item-title item-label">Password</div> <div class="item-input-wrap"> <input id="resetpasswordinput" type="password" name="password" placeholder="Masukkan password baru" minlength="10" required validate> </div> </div> </li> </ul> </div> <div class="list"> <div class="block-footer"><a href="#" class="button button-raised button-fill resetpasswordinputsubmit">SUBMIT</a><center><a href="#" class="item-link list-button actions-close popup-close">Batal</a></center></div> </div></form>'+
        
       '</div></div>',
    });     
    dynamicPopup.open();
    
    $$(".resetpasswordinputsubmit").click(function(){
      resetpasswordinput(dynamicPopup,data,email);
    }); 
}

function resetpasswordinput(dynamicPopup,data,email)
{
    if (!$$('#resetpasswordinputform')[0].checkValidity()) {
        //console.log('Check Validity!');
        return;
    }
    var password = $$('#resetpasswordinputform [name="password"]').val();
    //console.log(email);
      
      let mypreloader = app.dialog.preloader(); 
      app.request({
          method: "POST",
          data : {command:'resetpasswordinput',email:email,key:data,password:password},
          url: apiuserurl,
          error: function(xhr, status, message) 
            {
              //console.log(message);
              mypreloader.close();  
              dynamicPopup.close();
              //var toastBottom = app.toast.create({ text: 'Server sedang sibuk', closeTimeout: 5000,position: 'center', });toastBottom.open();  
              app.dialog.alert('Server sedang sibuk','Terjadi Kesalahan');        
            },
          success: function(data, status, xhr) 
            {
              //console.log(data);
              mypreloader.close(); 
              dynamicPopup.close();
              var json = JSON.parse(data); 
              var status = json['status'];
              var msg = json['data'];
              if (status === "success")
              {
                //var toastBottom = app.toast.create({ text: msg, closeTimeout: 5000,position: 'center', });toastBottom.open();
                app.dialog.alert(msg,'Berhasil');
              }
              else if (status === "failed")
              {
                //var toastBottom = app.toast.create({ text: msg, closeTimeout: 5000,position: 'center', });toastBottom.open();
                app.dialog.alert(msg,'Terjadi Kesalahan');
              }
              else
              {
                //var toastBottom = app.toast.create({ text: msg, closeTimeout: 5000,position: 'center', });toastBottom.open();
                app.dialog.alert(msg,'Terjadi Kesalahan');
              }
            }
      }); 
}
///////RESET PASSWORD BUTTON/////////////////////////////////////////////////////////////////////////////////////////////////




///////lengkapi data/////////////////////////////////////
function flengkapidata()
{
  var dialog = app.dialog.create({
    text: 'Silahkan lengkapi data Anda untuk membuka menu ini.',
    closeByBackdropClick: false,
    destroyOnClose: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
      }
    },
    buttons: [
      {
        text: 'Nanti Saja',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {
          }
      },
      {
        text: 'Lanjutkan',
        close:true,
        onClick: function(dialog, e)
          {
            flengkapiphoto();
          }
      },
    ]
  });
  dialog.open();
}

function flengkapiphoto()
{
  var dialog = app.dialog.create({
    title: 'Photo Profile',
    closeByBackdropClick: false,
    destroyOnClose: true,
    content: '<div style="width:100%;">'
      +'<p style="text-align:center; border:1px solid gray;padding:10px 10px;color:gray;">Pilih photo paskan wajah terlihat jelas tanpa terpotong untuk ekta, sertifikat, dll. Direkomendasikan memakai rompi BSMI jika ada. Anda tidak dapat melakukan penggantian setelah upload!</p>'
      +'<form runat="server" style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'<img id="mybsmiuploadphotopreview" src="avatar.png" style="width:150px;height:150px;margin: 10px 10px;border-radius: 50%;object-fit: cover;">'
      +'<input accept="image/jpeg" type="file" id="mybsmiuploadphoto" />'
      +'</form>'
      +'</div>',
    on: {
      opened: function () {
          mybsmiuploadphoto.onchange = evt => {
            const [file] = mybsmiuploadphoto.files
            if (file) {
              if (file.size > 10485760) //10MB
              {
                //app.dialog.alert('File tidak boleh lebih dari 500 KB','Terjadi Kesalahan');
                var toastBottom = app.toast.create({ text: 'File tidak boleh lebih dari 10 MB', closeTimeout: 5000,position: 'center', });toastBottom.open();
                mybsmiuploadphoto.value = '';
                mybsmiuploadphotopreview.src = 'avatar.png'
              }
              else
              {
                mybsmiuploadphotopreview.src = URL.createObjectURL(file)
              }
            }
            else
            {
              mybsmiuploadphotopreview.src = 'avatar.png'
            }
          }
      }
    },
    buttons: [
      {
        text: 'Nanti Saja',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {
          }
      },
      {
        text: 'Upload',
        close:false,
        onClick: function(dialog, e)
          {
            const [file] = mybsmiuploadphoto.files
            if (file) {
                const blob = imagetosquare(file)
                blob.then((value)=>{
                    const fr = new FileReader();
                    fr.onload = function(e) {
                      const obj = {
                        filename: file.name,
                        mimeType: file.type,
                        bytes: [...new Int8Array(e.target.result)]
                      };
                      fuploadphoto(dialog,obj);
                    };
                    fr.readAsArrayBuffer(value);
                })
            }
            else
            {
              var toastBottom = app.toast.create({ text: 'Anda belum memilih photo', closeTimeout: 5000,position: 'center', });toastBottom.open();
            }
          }
      },
    ]
  });
  dialog.open();


}

function fuploadphoto(dialog,obj)
{
  //console.log(obj);
  var data = JSON.stringify(obj);
  dialog.close();
  let mypreloader = app.dialog.preloader();
  app.request({
    url: apidataurl,
    method: 'POST',
    cache: false,
    data : { token:mybsmiusertoken, command: 'uploaduserphoto', data: data}, 
    success: function (data, status, xhr)
      {
        mypreloader.close();        
        var status = JSON.parse(data).status;
        var content = JSON.parse(data).data;
        if (status == "success")
        {
          //console.log(content);
          var toastBottom = app.toast.create({ text: 'Upload photo berhasil', closeTimeout: 5000,position: 'center', });toastBottom.open();
          getdefaultdata();
          
        }
        else if (status == "failed")
        {
          //console.log("failed");
          app.dialog.alert(content,'Terjadi Kesalahan');
        }
        else
        {
          //console.log("failed");
          //app.dialog.alert(content,'Terjadi Kesalahan');
          fcekexpiredtoken(content);
        }
      },
    error: function (xhr, status, message)
      {
        //console.log(message);
        mypreloader.close();
        dialog.close();
        app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
      },
  });
}
//////lengkapi data/////////////////////////////////////////////////



///////verifikasi data///////////////////////////////////////////////
function fverifikasidata()
{
  var dialog = app.dialog.create({
    title: 'Permintaan Verifikasi',
    text: 'Verifikasi identitas diperlukan.',
    closeByBackdropClick: false,
    destroyOnClose: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
      }
    },
    buttons: [
      {
        text: 'Nanti Saja',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {
          }
      },
      {
        text: 'Lanjutkan',
        close:true,
        onClick: function(dialog, e)
          {
            fverifikasiidentitas();
          }
      },
    ]
  });
  dialog.open();
}

function fverifikasiidentitas()
{
  var dialog = app.dialog.create({
    title: 'Permintaan Verifikasi',
    closeByBackdropClick: false,
    destroyOnClose: true,
    content: '<div style="width:100%;height:60vh;overflow:auto;">'
      +'<form id="mybsmi-formverifikasiidentitas" runat="server" style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'  <img id="mybsmiuploadphotopreview" src="ktpplaceholder.png" style="width:200px;height:150px;margin: 10px 10px;object-fit: contain;">'
      +'  <input accept="image/jpeg" type="file" name="mybsmiuploadphoto" id="mybsmiuploadphoto" required validate/>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            Isi Sesuai Identitas'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="nik" placeholder="NIK" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="nama" placeholder="Nama" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="ttl" placeholder="Tempat/Tgl Lahir" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="jeniskelamin" placeholder="Jenis Kelamin" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="alamat" placeholder="Alamat" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="rtrw" placeholder="RT/RW" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="keldesa" placeholder="Kel/Desa" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="kecamatan" placeholder="Kecamatan" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="kabupaten" placeholder="Kabupaten" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="provinsi" placeholder="Provinsi" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="agama" placeholder="Agama" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="statusperkawinan" placeholder="Status Perkawinan" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="pekerjaan" placeholder="Pekerjaan" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="kewarganegaraan" placeholder="Kewarganegaraan" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="berlakuhingga" placeholder="Berlaku Hingga" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'</form>'
      +'</div>',
    on: {
      opened: function () {
          mybsmiuploadphoto.onchange = evt => {
            const [file] = mybsmiuploadphoto.files
            if (file) {
              if (file.size > 10485760) //10MB
              {
                //app.dialog.alert('File tidak boleh lebih dari 500 KB','Terjadi Kesalahan');
                var toastBottom = app.toast.create({ text: 'File tidak boleh lebih dari 10 MB', closeTimeout: 5000,position: 'center', });toastBottom.open();
                mybsmiuploadphoto.value = '';
                mybsmiuploadphotopreview.src = 'ktpplaceholder.png'
              }
              else
              {
                mybsmiuploadphotopreview.src = URL.createObjectURL(file)
              }
            }
            else
            {
              mybsmiuploadphotopreview.src = 'ktpplaceholder.png'
            }
          }
      }
    },
    buttons: [
      {
        text: 'Nanti Saja',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {
          }
      },
      {
        text: 'Verifikasi',
        close:false,
        onClick: function(dialog, e)
          {            
            const [file] = mybsmiuploadphoto.files
            if (file) {
              if (!$$('#mybsmi-formverifikasiidentitas')[0].checkValidity()) {
                    //console.log('Check Validity!');
                    return;
              }
              var dataform = JSON.stringify(app.form.convertToData('#mybsmi-formverifikasiidentitas'));//console.log(dataform);
              const blob = imagetosmall(file)
              blob.then((value)=>{
                  const fr = new FileReader();
                  fr.onload = function(e) {
                    const obj = {
                      filename: file.name,
                      mimeType: file.type,
                      bytes: [...new Int8Array(e.target.result)],
                      ktp: dataform
                    };
                    fkirimverifikasiidentitas(dialog,obj);
                  };
                  fr.readAsArrayBuffer(value);
              })
            }
            else
            {
              var toastBottom = app.toast.create({ text: 'Pilih file KTP', closeTimeout: 5000,position: 'center', });toastBottom.open();
            }
          }
      },
    ]
  });
  dialog.open();
}

function fkirimverifikasiidentitas(dialog,obj)
{
  //console.log(obj);
  var data = JSON.stringify(obj);
  dialog.close();
  let mypreloader = app.dialog.preloader();
  app.request({
    url: apidataurl,
    method: 'POST',
    cache: false,
    data : { token:mybsmiusertoken, command: 'verifikasiidentitas', data: data}, 
    success: function (data, status, xhr)
      {
        //console.log(data)
        mypreloader.close();        
        var status = JSON.parse(data).status;
        var content = JSON.parse(data).data;
        if (status == "success")
        {
          console.log('kirim verifikasi sukses');
          //app.dialog.alert("Permintaan verifikasi telah terkirim. Hubungi operator jika ada kendala. Terima kasih.",'Permintaan Verifikasi');
          fonesignalprompt('Permintaan Verifikasi Terkirim','Beri tahu jika proses verifikasi selesai');
          getdefaultdata();
        }
        else if (status == "failed")
        {
          //console.log("failed");
          app.dialog.alert(content,'Terjadi Kesalahan');
        }
        else
        {
          //console.log("failed");
          //app.dialog.alert(content,'Terjadi Kesalahan');
          fcekexpiredtoken(content);
        }
      },
    error: function (xhr, status, message)
      {
        //console.log(message);
        mypreloader.close();
        dialog.close();
        app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
      },
  });
}
///////verifikasi data///////////////////////////////////////////////





//////fpageekta///////////////////////////////////////////////////
function fpageekta()
{
    let data = JSON.parse(dashboarddata.user.usermydata)
    let now  = new Date(); 
    let ekta = data.ekta;
    let ektaberlaku = data.ektaberlaku;
    let ektaberlakucurrent = '31/12/'+now.getFullYear().toString();
    if ((ekta)&&(ektaberlaku === ektaberlakucurrent))
    {
        fgetekta();
        $$('.mybsmi-ekta-keanggotaan').removeClass('display-none');
        $$('.mybsmi-statuskeanggotaan').removeClass('display-none');
    }
    else
    {
      let label = 'BUAT e-KTA';
      if (ekta)
      {
        label = 'PERBARUI e-KTA';
        app.dialog.alert('Masa berlaku e-KTA anda telah habis','Info');
      }
      $$('.mybsmi-ektabsmi').html('<a class="button button-fill">'+label+'</a>');
      $$('.mybsmi-ektabsmi a').on('click', function () {
            
            app.dialog.confirm('Penerbitan e-KTA memerlukan waktu sekitar 2-5 menit harap ditunggu.', 'Pemberitahuan', function (){fbuatekta();})
      });
    }
    try{let status = data.statuskeanggotaan.status
		let statustanggal = data.statuskeanggotaan.statustanggal
		let jenjang = data.statuskeanggotaan.jenjang
		let jenjangtanggal = data.statuskeanggotaan.jenjangtanggal
		let statushtml = '<table><tr><td>STATUS</td><td>:</td><td>'+status+'</td></tr><tr><td>JENJANG</td><td>:</td><td>'+jenjang+'</td></tr></table>'
		$$('.mybsmi-statuskeanggotaancontent').html(statushtml)
	}catch{}	
}

function fbuatekta()
{
  let mypreloader = app.dialog.preloader();
  app.request({
    url: apidataurl,
    method: 'POST',
    cache: false,
    data : { token:mybsmiusertoken, command: 'buatekta'}, 
    success: function (data, status, xhr)
      {
        mypreloader.close();
        var status = JSON.parse(data).status;
        var content = JSON.parse(data).data;
        if (status == "success")
        {
          //console.log(content);
          convertekta();
        }
        else if (status == "failed")
        {
          //console.log("failed");
          app.dialog.alert(content,'Terjadi Kesalahan');
        }
        else
        {
          //console.log("failed");
          //app.dialog.alert(content,'Terjadi Kesalahan');
          fcekexpiredtoken(content);
        }
      },
    error: function (xhr, status, message)
      {
        //console.log(message);
        app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
        mypreloader.close();
      },
  })
}

function convertekta()
{
  let mypreloader = app.dialog.preloader();
  app.request({
    url: apidataurl,
    method: 'POST',
    cache: false,
    data : { token:mybsmiusertoken, command: 'convertekta'}, 
    success: function (data, status, xhr)
      {
        mypreloader.close();
        var status = JSON.parse(data).status;
        var content = JSON.parse(data).data;
        if (status == "success")
        {
          //console.log(content);
          fgetekta(true);
          //getdefaultdata(false);
        }
        else if (status == "failed")
        {
          //console.log("failed");
          app.dialog.alert(content,'Terjadi Kesalahan');
        }
        else
        {
          //console.log("failed");
          //app.dialog.alert(content,'Terjadi Kesalahan');
          fcekexpiredtoken(content);
        }
      },
    error: function (xhr, status, message)
      {
        //console.log(message);
        app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
        mypreloader.close();
      },
  })
}

function fgetekta(getdefault = false)
{

  if (typeof mybsmiekta === 'undefined' || mybsmiekta === null)
  {
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'getekta'}, 
        success: function (data, status, xhr)
          {
            console.log('getekta = '+data);
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
              window.mybsmiekta = content;
              //$$('.mybsmi-ektabsmi').html('<img id="imgekta" src="" style="width:100%;max-width:200px;cursor:pointer;" onclick="javascript:myimage(this)">');
              //let src = "https://lh3.googleusercontent.com/d/"+safe(content);
              //$$('#imgekta').attr('src',src);
              showekta();
              if (getdefault) getdefaultdata(false);
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
            mypreloader.close();
          },
      })
  }
  else
  {
    showekta();
  }
  
  function showekta()
  {
        console.log('ekta = '+mybsmiekta);
        $$('.mybsmi-ektabsmi').html('<img id="imgekta" src="" style="width:100%;max-width:200px;cursor:pointer;">');
        let src = "https://lh3.googleusercontent.com/d/"+safe(mybsmiekta);
        $$('#imgekta').attr('src',src);
        $$('.mybsmi-ektabsmi-download').html('<a href="#" class="button mybsmi-ektabsmi-download-button">Download</a>');
        $$('.mybsmi-ektabsmi-download-button').on('click', function () {
          //fdownloadfile('https://api.allorigins.win/raw?url=https://lh3.googleusercontent.com/d/'+mybsmiekta,'ektabsmi.jpg');
          const d = new Date();
          let time = d.getTime();
          fdownloadfile('https://cors.bsmijatim.workers.dev/?https://lh3.googleusercontent.com/d/'+mybsmiekta,'ektabsmi-'+time);
        })
        $$('.mybsmi-ektabsmi img').on('click', function () {
          myimage(this);
        })
  }
}
//////fpageekta///////////////////////////////////////////////////



/////fpageriwayat////////////////////////////////////////////
function fpageriwayat()
{
  if (typeof mybsmiriwayat === 'undefined' || mybsmiriwayat === null)
  {
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'getriwayatdata'}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
              window.mybsmiriwayat = content;
              getriwayatdatarun(content)
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
  }
  else
  {
    getriwayatdatarun(mybsmiriwayat)
  }
}

function getriwayatdatarun(content)
{
  let data = '';
  for(i=content.length-1;i>-1;i--)
  {
    //let date = new Date(content[i][0]).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    let date = new Intl.DateTimeFormat("id-ID", { hour12:false,dateStyle: "long" , timeStyle: "short",  timeZone: "Asia/Jakarta"}).format(new Date(content[i][0]));
    data += '<div class="timeline-item"><div class="timeline-item-date"><small>'+date+'</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-inner"><div class="timeline-item-time"></div><div class="timeline-item-text">'+safe(content[i][5])+'</div></div></div></div>';
  }
  $$('.mybsmi-riwayat').html(data);
}
/////fpageriwayat////////////////////////////////////////////


//////////fpageverifikator////////////////////////////////////////////
function fpageverifikator()
{
  if (typeof mybsmiverifikatordata === 'undefined' || mybsmiverifikatordata === null)
  {
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'getverifikatordata'}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              window.mybsmiverifikatordata = content;
              fpageverifikatorrun(content);
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
  }
  else
  {
    fpageverifikatorrun(mybsmiverifikatordata);
  }

  $$('.mybsmi-verifikatorrefresh').on('click', function () {
    mybsmiverifikatordata = null
    fpageverifikator()
  })
}

function fpageverifikatorrun(content)
{console.log(content)
  let json = JSON.parse(dashboarddata.user.usermydata);
  let usercabang = dashboarddata.user.usercabang;
  var data = '<div class="data-table data-table-collapsible data-table-init"><table><thead><tr><th>Nama</th><th>No. KTA</th><th>Email</th><th>Cabang</th><th></th></tr></thead><tbody>';
  for (i=content.length-1;i>-1;i--)
  {
      if ((skipuid.includes(content[i][1]))&&(dashboarddata.user.useruid !== '0ONjeb65X5OunuRI6Ap8')){continue;}else{if ((skipuid.includes(content[i][1]))&&(!isLocal)){continue;}else{
      
        //data += '<a href="'+safe(content[i][4])+'" title="'+safe(content[i][4])+'">testing '+safe(content[i][4])+'</a>';
        
      }}
      
	  if(!json.verifikator && usercabang != content[i][11])continue
	  
      data += '<tr class="mybsmi-verifikator-item-'+safe(content[i][1])+'"><td data-collapsible-title="Nama">'+safe(content[i][4])+'</td><td data-collapsible-title="No. KTA">'+safe(content[i][18])+'</td><td data-collapsible-title="Email">'+safe(content[i][2])+'</td><td data-collapsible-title="Cabang">'+safe(content[i][11])+'</td><td><a class="button button-fill mybsmi-verifikatoraction" data-user="'+btoa(JSON.stringify(content[i]))+'">Periksa</a></td></tr>';
  }
  data += '</tbody></table></div>';
  $$('.mybsmi-verifikator').html(data);

  $$('.mybsmi-verifikator a.mybsmi-verifikatoraction').on('click', function (e) {
        
        //app.dialog.confirm('Pembuatan e-KTA memerlukan waktu 2-4 menit.', 'Pemberitahuan', function (){fbuatekta();})
        var base64 = this.attributes["data-user"].value;
        fpageverifikatoridentitas(base64)
  });
}

function fpageverifikatoridentitas(base64)
{
  var data = atob(base64);data = JSON.parse(data);
  var uid = data[1];
  let mypreloader = app.dialog.preloader();
  app.request({
    url: apidataurl,
    method: 'POST',
    cache: false,
    data : { token:mybsmiusertoken, command: 'getverifikatoridentitasdata', uid:uid}, 
    success: function (data, status, xhr)
      {
        mypreloader.close();
        var status = JSON.parse(data).status;
        var content = JSON.parse(data).data;
        if (status == "success")
        {
          
          fpageverifikatoridentitasrun(base64,content);
        }
        else if (status == "failed")
        {
          //console.log("failed");
          app.dialog.alert(content,'Terjadi Kesalahan');
        }
        else
        {
          //console.log("failed");
          //app.dialog.alert(content,'Terjadi Kesalahan');
          fcekexpiredtoken(content);
        }
      },
    error: function (xhr, status, message)
      {
        //console.log(message);
        app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
        mypreloader.close();
      },
  })
}

function fpageverifikatoridentitasrun(base64,content)
{
  var data = atob(base64);data = JSON.parse(data);
  var dialog = app.dialog.create({
    title: 'Verifikasi Akun Relawan',
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="" style="width:150px;height:150px;margin: 10px 10px;border-radius: 50%;object-fit: cover;">'
      +'      <p style="font-weight:bold;">Data Akun</p>'
      +'      <div class="data-table" style="width:100%"><table><tbody>'
      +'          <tr><td>Nama</td><td>'+safe(data[4])+'</td></tr>'
	  +'          <tr><td>No. KTA</td><td>'+safe(data[18])+'</td></tr>'
      +'          <tr><td>Email</td><td>'+safe(data[2])+'</td></tr>'
      +'          <tr><td>Cabang</td><td>'+safe(data[11])+'</td></tr>'
      +'          <tr><td>Jenis Kelamin</td><td>'+safe(data[5])+'</td></tr>'
      +'          <tr><td>Alamat</td><td>'+safe(data[7])+'</td></tr>'
      +'          <tr><td>Profesi</td><td>'+safe(data[8])+'</td></tr>'
      +'          <tr><td>Golongan Darah</td><td>'+safe(data[9])+'</td></tr>'
      +'          <tr><td>No HP</td><td>'+safe(data[10])+'</td></tr>'
      +'          <tr><td>Tahun Bergabung</td><td>'+safe(data[12])+'</td></tr>'
      +'      </tbody></table></div>'

      +'      <p style="font-weight:bold;">Data Sesuai Kartu Identitas</p>'
      +'      <div class="data-table" style="width:100%"><table><tbody>'
      +'          <tr><td>NIK</td><td>'+safe(content[0][4])+'</td></tr>'
      +'          <tr><td>Nama</td><td>'+safe(content[0][5])+'</td></tr>'
      +'          <tr><td>TTL</td><td>'+safe(content[0][6])+'</td></tr>'
      +'          <tr><td>Jenis Kelamin</td><td>'+safe(content[0][7])+'</td></tr>'
      +'          <tr><td>Alamat</td><td>'+safe(content[0][8])+'</td></tr>'
      +'          <tr><td>RT/RW</td><td>'+safe(content[0][9])+'</td></tr>'
      +'          <tr><td>Desa/Kelurahan</td><td>'+safe(content[0][10])+'</td></tr>'
      +'          <tr><td>Kecamatan</td><td>'+safe(content[0][11])+'</td></tr>'
      +'          <tr><td>Kabupaten</td><td>'+safe(content[0][12])+'</td></tr>'
      +'          <tr><td>Provinsi</td><td>'+safe(content[0][13])+'</td></tr>'
      +'          <tr><td>Agama</td><td>'+safe(content[0][14])+'</td></tr>'
      +'          <tr><td>Status Perkawinan</td><td>'+safe(content[0][15])+'</td></tr>'
      +'          <tr><td>Pekerjaan</td><td>'+safe(content[0][16])+'</td></tr>'
      +'          <tr><td>Kewarganegaraan</td><td>'+safe(content[0][17])+'</td></tr>'
      +'      </tbody></table></div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        let src = "https://lh3.googleusercontent.com/d/"+safe(data[13]);
        $$('#img').attr('src',src);
      }
    },
    buttons: [
      {
        text: 'Disetujui',
        close:true,
        color: 'green',
        onClick: function(dialog, e)
          {///////////////////////////////////////////////////////////////////////////////////////
            app.dialog.confirm('Apakah Anda yakin menyetujui permintaan verifikasi dari '+safe(data[4]), 'Konfirmasi', function ()
            {
              fpageverifikatorkeputusan(data[1],'disetujui','');              
            })
          }
      },
      {
        text: 'Tolak',
        close:true,
        onClick: function(dialog, e)
          {///////////////////////////////////////////////////////////////////////////////////////
            app.dialog.confirm('Apakah Anda yakin menolak permintaan verifikasi dari '+safe(data[4]), 'Konfirmasi', function ()
            {
              app.dialog.prompt('', 'Tambahkan Catatan', function (catatan){fpageverifikatorkeputusan(data[1],'ditolak',catatan);})
            })
          }
      },
      {
        text: 'Cancel',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpageverifikatorkeputusan(uid,hasil,catatan)
{

  var verifikator = JSON.stringify({nama:dashboarddata.user.usernama,email:dashboarddata.user.useremail,uid:dashboarddata.user.useruid,catatan:catatan});

  let mypreloader = app.dialog.preloader();
  app.request({
    url: apidataurl,
    method: 'POST',
    cache: false,
    data : { token:mybsmiusertoken, command: 'verifikatoridentitaskeputusan', uid:uid,hasil:hasil,verifikator:verifikator}, 
    success: function (data, status, xhr)
      {
        mypreloader.close();
        var status = JSON.parse(data).status;
        var content = JSON.parse(data).data;
        if (status == "success")
        {
          
          //console.log(content);
          //fpageverifikator();
          $$('.mybsmi-verifikator-item-'+uid).hide();
          var toastBottom = app.toast.create({ text: content, closeTimeout: 2000,position: 'center', });toastBottom.open();
        }
        else if (status == "failed")
        {
          //console.log("failed");
          app.dialog.alert(content,'Terjadi Kesalahan');
        }
        else
        {
          //console.log("failed");
          //app.dialog.alert(content,'Terjadi Kesalahan');
          fcekexpiredtoken(content);
        }
      },
    error: function (xhr, status, message)
      {
        //console.log(message);
        app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
        mypreloader.close();
      },
  })
}
////////fpageverifikator//////////////////////////////////////////////


//////////myimage/////////////////////////////////////////
function myimage(data)
{
  var src=data.src;
  const para = document.createElement("div");
  para.innerHTML = '<div style="background: rgba(0, 0, 0, 0.8);position: fixed;z-index: 1000000000000000;align-items: center;justify-content: center;display: flex;bottom: 0;left: 0;right: 0;top: 0;"><img id="img" src="" style="border-radius: 1em;display: block;margin: auto;height: 90vh;width: 90vw;object-fit: contain;background-image:none;"></div>';
  
  para.addEventListener("click",()=>{
    para.remove(); 
  })

  document.body.appendChild(para);
  $$('#img').attr('src',src);

}
///////////myimage/////////////////////////////////////


/////////////////security///////////////////////////////////////
//https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html

//https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript
const escapeHTML = (unsafe) => {
    return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

//https://stackoverflow.com/posts/30970751/revisions
function escapehtmloldbrowser(s) {
    let lookup = {
        '&': "&amp;",
        '"': "&quot;",
        '\'': "&apos;",
        '<': "&lt;",
        '>': "&gt;"
    };
    return s.replace( /[&"'<>]/g, c => lookup[c] );
}

//https://stackoverflow.com/a/31637900
//encode all
function encodeall(e){return e.replace(/[^]/g,function(e){return"&#"+e.charCodeAt(0)+";"})}

//https://stackoverflow.com/a/34481254
//encode non alphanumeric
function encodenonalphanumeric( s )
{
    var h,
        i,
        n,
        c;

    n = s.length;
    h = '';

    for( i = 0; i < n; i++ )
    {
        c = s.charCodeAt( i );
        if( ( c >= 48 && c <= 57 ) 
          ||( c >= 65 && c <= 90 ) 
          ||( c >= 97 && c <=122 )
          ||( c == 32 ) )
        {
            h += String.fromCharCode( c );
        }
        else
        {
            h += '&#' + c + ';';
        }
    }

    return h;
}

function ftrustedHTML(data)
{
    data = String(data);
    let unescapefist = {
        "&amp;": '&',
        "&quot;": '"',
        "&apos;": '\'',
        "&lt;": '<',
        "&gt;": '>'
    };
    let danger = data.replace( /[&"'<>]/g, c => unescapefist[c] );
    let lookup = {
        '&': "&amp;",
        '"': "&quot;",
        '\'': "&apos;",
        '<': "&lt;",
        '>': "&gt;"
    };
    let safehtml = danger.replace( /[&"'<>]/g, c => lookup[c] );
    return safehtml;

}

function dangernotsafe(data)
{
  return data;
}

function safe(unsafe)
{
unsafe = String(unsafe);
var data = escapehtmloldbrowser(unsafe);
return data;

}

function safegetparam(unsafe)
{
var data = encodeURIComponent(unsafe)
return data;
}


/////////////////////////////////////////////////////////////////






//////////////////////////////////////////////////////////////////
function fpagelainnya(){
  $$('.startradio').on('click', async function () {
	 
		const para = document.createElement("div");
		
		para.innerHTML = `<div style="background: rgba(0, 0, 0, 0.8);position: fixed;z-index: 1000000000000000;align-items: center;justify-content: center;display: flex;bottom: 0;left: 0;right: 0;top: 0;"><div class="paraxmark" style="width:50px;height:50px;background:#000;position:fixed;top:0px;right:0px;border-radius:50% 50% 50% 50%;margin:3px 3px;"><i class="icon f7-icons" style="font-size:50px;color:#fff;" id="paraclose">xmark_circle</i></div>
				<style>
						.radiomain {
						  width:200px;
						  height:300px;
						  background:black;
						  border-radius:2em;
						}
						
						.radiomain p {
							margin : 0.5em 0;
						}
						
						.antena {
							width:30px;
							height:70px;
							background:black;
							position:relative;
							border-radius:25px;
							top:-150px;
							left:30px;
						}
						
						.radiologo {
							position:relative;
							top:-160px;
							height:0px;
							left:50px;
							display:flex;
							flex-wrap:wrap;
							align-items:center;
						}
						
						.radiologo img {
							width:25px;
							height:25px;
							border-radius:50%;
						}
						
						.radiologo span {
							color:white;
							font-size:20px;
							margin-left:5px;
						}
						
						.radioscreen {
							width:150px;
							border-radius:1em;
							height:100px;
							background:#9FFE02;
							position:relative;
							left:25px;
							top:-130px;
							color:black;
						}
						
						.radioscreen img {
							width:50px;
							height:50px;
							margin-top:5px;
							margin-left:5px;
							display:none;
						}
						
						.radiopanel {
							background:none;
							padding:5px 20px;
							text-align:right;
						}
						
						.radiostatus {
							background:none;
							padding:5px 20px;
						}						
						
						.play-button {
							height: 100px;
							width: 100px;
							display: block;
							margin: 0px auto;
							overflow: hidden;
							position: relative;
							top:170px;
						}

						.radioleft {
							height: 100%;
							float: left;
							background-color: #fff;
							width: 36%;
							transition: all 0.25s ease;
							overflow: hidden;
						}

						.radiotriangle-1 {
							-webkit-transform: translate(0, -100%);
							transform: translate(0, -100%);
						}

						.radiotriangle-2 {
							-webkit-transform: translate(0, 100%);
							transform: translate(0, 100%);
						}

						.radiotriangle-1,
						.radiotriangle-2 {
							position: absolute;
							top: 0;
							right: 0;
							background-color: transparent;
							width: 0;
							height: 0;
							border-right: 100px solid #000;
							border-top: 50px solid transparent;
							border-bottom: 50px solid transparent;
							transition: -webkit-transform 0.25s ease;
							transition: transform 0.25s ease;
							transition: transform 0.25s ease, -webkit-transform 0.25s ease;
						}

						.radioright {
							height: 100%;
							float: right;
							width: 36%;
							background-color: #fff;
							transition: all 0.25s ease;
						}

						.paused .radioleft {
							width: 50%;
						}

						.paused .radioright {
							width: 50%;
						}

						.paused .radiotriangle-1 {
							-webkit-transform: translate(0, -50%);
							transform: translate(0, -50%);
						}

						.paused .radiotriangle-2 {
							-webkit-transform: translate(0, 50%);
							transform: translate(0, 50%);
						}
						
						:popover-open {
							position: absolute;
							inset: unset;
							bottom: 5px;
							right: 5px;
						}

						#radiopop {
							display:block;
							position:relative;
							height:0px;
							overflow:hidden;
						}
				</style>
				<div class="radiomain">
				  <div id="radiopop"><div id="radiopopover">
						Terminal
						<input type="text" id="radioterminal" placeholder="Enter code here"/>
				  </div></div>				
				  <a class="play-button paused" href="#">
					  <div class="radioleft"></div>
					  <div class="radioright"></div>
					  <div class="radiotriangle-1"></div>
					  <div class="radiotriangle-2"></div>
				  </a>
				  <div class="antena"></div>
				  <div class="radiologo">
						<img src="logobsmijatim.png"></img>
						<span>BSMI<span>
				  </div>
				  <div class="radioscreen">
					  <img src="logobsmijatim.png"></img>
					  <p class="radiopanel">
							<span class="radioinfo">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wifi-off" viewBox="0 0 16 16">
								  <path d="M10.706 3.294A12.6 12.6 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.52.52 0 0 0 .668.05A11.45 11.45 0 0 1 8 4q.946 0 1.852.148zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.45 8.45 0 0 1 3.51-1.27zm2.596 1.404.785-.785q.947.362 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.5 8.5 0 0 0-1.98-.932zM8 10l.933-.933a6.5 6.5 0 0 1 2.013.637c.285.145.326.524.1.75l-.015.015a.53.53 0 0 1-.611.09A5.5 5.5 0 0 0 8 10m4.905-4.905.747-.747q.886.451 1.685 1.03a.485.485 0 0 1 .047.737.52.52 0 0 1-.668.05 11.5 11.5 0 0 0-1.811-1.07M9.02 11.78c.238.14.236.464.04.66l-.707.706a.5.5 0 0 1-.707 0l-.707-.707c-.195-.195-.197-.518.04-.66A2 2 0 0 1 8 11.5c.374 0 .723.102 1.021.28zm4.355-9.905a.53.53 0 0 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75z"/>
								</svg>
							</span>
					  </p>
					  <p class="radiostatus"></p>
				  </div>
				</div>	  
		  </div>`;
		  
		document.body.appendChild(para);
		
		await new Promise((resolve,reject)=>{
			function timer(){
				let interval = setInterval(()=>{
					console.log('timer');
					if(document.getElementById('paraclose')){
						clearInterval(interval);
						resolve();
					}else{
						timer();
					}
				},100)
			}
			timer();
		});
		
		const popover = document.getElementById("radiopopover");
		
		if (HTMLElement.prototype.hasOwnProperty("popover")) {
			popover.popover = "auto";
		}			
		
		
		setTimeout(()=>{
		
			  
					paraclose.addEventListener("click",()=>{
						para.remove();
						stopRadio();
					})
					
					$$('.paraxmark').css('cursor','pointer');
					
					para.addEventListener("dblclick",()=>{
						if (HTMLElement.prototype.hasOwnProperty("popover")) {
							popover.togglePopover();
						}
					})
							
				
		},1000)

	  
        let ws;
		let stream;
        const username = 'guest'+Math.floor(Math.random()*10000);   
        const channel = 'public10000ircjatim';
        const hubname = 'iwalkie';
        let achexauth = false;
        let availableradio = false;
        let sourceBuffer;
		let appendBufferQueue = [];
        let audioElement;
        const timeslice = 400;  //3000 
        const timedelay = 1000;  //3500  
		let timehold;
        let timeout;
        const istimeslice = true;
        let mediasourceinit = false;
		let mediasourcefirsttime = true;
		let casterid = 'Connecting';
		let headerBlob;
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffers = []; // Array to store decoded AudioBuffer objects     
        let startTime = audioContext.currentTime;
        let playing = false;
		let radiostatusmic;	
		let shake = false;
		let echo = false;
		
		let response = await fetch('ptt.mp3');
		let pttsound = await response.blob();
		
		
		let radioterminal = document.getElementById("radioterminal");
		radioterminal.addEventListener("keypress", async function(event) {
		  if (event.key === "Enter") {
				event.preventDefault();
				const el = `
					<span class="check">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
						  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
						</svg>		
					</span>
				`        
				document.querySelector('#radioterminal').blur()
				document.querySelector('#radioterminal').insertAdjacentHTML("afterend",el)
				setTimeout(()=>{
					if(document.querySelector('#radiopopover .check'))document.querySelector('#radiopopover .check').remove()
				},3000)
				const code = document.querySelector('#radioterminal').value
				document.querySelector('#radioterminal').value = '';
				switch(code.toLowerCase()){
					case "shake":
						if(shake){
							shake = false;
						}else{
							shake = true;
							checkMotionPermission();
						}
						break;
					case "hold":
						radioptt();
						break;
					case "echo":
						if(echo){
							echo = false;
						}else{
							echo = true;
						}
						break;
					default:
				}
		  }
		});	
		
		function radioterminalinfo(info){
				const el = `
					<span class="check">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
						  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
						</svg> ${info}		
					</span>
				`        
				document.querySelector('#radioterminal').blur()
				document.querySelector('#radioterminal').insertAdjacentHTML("afterend",el)
				setTimeout(()=>{
					if(document.querySelector('#radiopopover .check'))document.querySelector('#radiopopover .check').remove()
				},5000);			
		}
		
		//https://stackoverflow.com/a/75717316
		async function checkMotionPermission() {

			// Any browser using requestPermission API
			if (typeof DeviceOrientationEvent.requestPermission === 'function') {

				// If previously granted, user will see no prompts and listeners get setup right away.
				// If error, we show special UI to the user.
				// FYI, "requestPermission" acts more like "check permission" on the device.
				await DeviceOrientationEvent.requestPermission()
				.then(permissionState => {
					if (permissionState == 'granted') {
						// Hide special UI; no longer needed
						//setMotionListeners()
						console.log('checkMotionPermission granted');
						radioterminalinfo('Detect shake granted');
					}
				})
				.catch( (error) => {
					// Show special UI to user, suggesting they should allow motion sensors. The tap-or-click on the button will invoke the permission dialog.
					console.log('checkMotionPermission error',error)
				})

			// All other browsers
			} else {
				//setMotionListeners()
			}

		}
		
		//https://stackoverflow.com/a/75717316
		async function setMotionListeners() {

			// ORIENTATION LISTENER
			await window.addEventListener('orientation', event => {
				//console.log('Device orientation event: %O', event)
			})

			// MOTION LISTENER
			await window.addEventListener('devicemotion', event => {
				//console.log('Device motion event: %O', event)

				// SHAKE EVENT
				// Using rotationRate, which essentially is velocity,
				// we check each axis (alpha, beta, gamma) whether they cross a threshold (e.g. 256).
				// Lower = more sensitive, higher = less sensitive. 256 works nice, imho.
				if ((event.rotationRate.alpha > 256 || event.rotationRate.beta > 256 || event.rotationRate.gamma > 256)) {
					if(shake){
						shake = false;
						setTimeout(()=>{
							shake = true;
						},3000)
						radioptt();
					}
				}
			})
		}
		setMotionListeners();
		
		function radioptt(){
			console.log('radioptt');
			function triggerMouseEvent (node, eventType) {
				var clickEvent = document.createEvent ('MouseEvents');
				clickEvent.initEvent (eventType, true, true);
				node.dispatchEvent (clickEvent);
			}						
			if (document.querySelector(".play-button.paused")){
				console.log('mousedown');
				var targetNode = document.querySelector(".play-button");
				if (targetNode) triggerMouseEvent (targetNode, "mousedown");
				clearTimeout(timehold);
				timehold = setTimeout(()=>{
					if (!document.querySelector(".play-button.paused")){
						var targetNode = document.querySelector(".play-button");
						if (targetNode) triggerMouseEvent (targetNode, "mouseup");							
					}
				},5*60*1000);
			}else{
				console.log('mouseup');
				var targetNode = document.querySelector(".play-button");
				if (targetNode) triggerMouseEvent (targetNode, "mouseup");							
			}			
		}
		
		function playpttsound(){
			const pttsoundaudioUrl = URL.createObjectURL(pttsound);
			const pttsoundel = new Audio();     
			pttsoundel.src = pttsoundaudioUrl;
			pttsoundel.addEventListener('ended', () => {
				URL.revokeObjectURL(pttsoundaudioUrl);
			});
			pttsoundel.play();			
		}
        
        function achex(data,thisws){
          //console.log(data)
          if(data.includes('{"auth":"OK",')) {
            ws.send(`{"joinHub":"${hubname}"}`);
          }
          if(data.includes('{"joinHub":"OK"}')) {
				achexauth = true;
				let info = document.getElementsByClassName("radioinfo")[0]
				info.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-reception-4" viewBox="0 0 16 16">
	  <path d="M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z"/>
	</svg>`
          }
          
          let json = JSON.parse(data);
          
          if(json.msg){
            if(json.msg.radioinuse){
				radiobusy();
            }else if (json.msg.blob){
				casterid = json.msg.casterid;
				if(casterid === dashboarddata.user.userbid && !echo){
					thisws.close(true);
					return;
				}
				radiobusy();
				startsource(json.msg);
            }
          }
        }     

		function radiobusy(){
				isavailableradio(false)
				clearTimeout(timeout)
				timeout = setTimeout(()=>{
					isavailableradio(true)
				},timedelay)			
		}

        let handleDataAvailable = (event) => {
			
			let blob = event.data;
			let timecode = event.timecode;
			
            if (blob.size > 0) {
                
                blobToBase64(blob).then(b64 => {
                    
                    let data = {
                      toH:hubname,
                      channel,
                      msg:{blob:b64,headerBlob,timecode,mediasourceinit,casterid},
                    }
					if(echo){
						achex(JSON.stringify(data));
					}else{
						ws.send(JSON.stringify(data));
					}
                    mediasourceinit = false;
                })
            }
        };

        function blobToBase64(blob) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = () => {
                    
                    const base64String = reader.result
                    resolve(base64String);
                };
                reader.onerror = (error) => reject(error);
            });
        }

		function b64toblob(data){
			const b64 = data.split(',')[1];   

			const contentType = "audio/webm;codecs=opus";
			
			function base64ToBlob(base64, contentType = '', sliceSize = 512) {
			  const byteCharacters = atob(base64);
			  const byteArrays = [];

			  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
				const slice = byteCharacters.slice(offset, offset + sliceSize);
				const byteNumbers = new Array(slice.length);
				for (let i = 0; i < slice.length; i++) {
				  byteNumbers[i] = slice.charCodeAt(i);
				}
				const byteArray = new Uint8Array(byteNumbers);
				byteArrays.push(byteArray);
			  }

			  return new Blob(byteArrays, { type: contentType });
			} 
			
			const blob = base64ToBlob(b64, contentType);
			return blob;
		}			
       
        function startsource(msg){
        
            function addbuffer(data,play){
				
				//console.log('data',data);
				
                if(!data.includes('base64'))return;  

                const b64 = data.split(',')[1];   

                const contentType = "audio/webm;codecs=opus";
                
                function base64ToBlob(base64, contentType = '', sliceSize = 512) {
                  const byteCharacters = atob(base64);
                  const byteArrays = [];

                  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    const slice = byteCharacters.slice(offset, offset + sliceSize);
                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                      byteNumbers[i] = slice.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                  }

                  return new Blob(byteArrays, { type: contentType });
                } 
                
                const blob = base64ToBlob(b64, contentType);   
                
                let reader = new FileReader();
                let rawData = new ArrayBuffer();            
                reader.loadend = function() {}
                reader.onload = function(e) {
                    rawData = e.target.result;
					
					if (sourceBuffer.updating) {
						appendBufferQueue.push(rawData);
					} else {
						appendbuffer(rawData,play);
					}						                              
                    
                }
                reader.readAsArrayBuffer(blob);             
            }
			
			function appendbuffer(data,play){
				
					//console.log('buffer',data)
				
					radiobusy();
				
                    sourceBuffer.appendBuffer(data);
                    
                    if (play){
                    
                    audioElement.play()
                        .then(() => {
                            //console.log('Audio playback started successfully.');
                        })
                        .catch(error => {
                            //console.error('Error playing audio:', error);
                        });    
                    } 			
			}
        
            if (msg.mediasourceinit || mediasourcefirsttime){
            
                  let mediaSource = new MediaSource();
                  
                  mediaSource.addEventListener('sourceopen', handleSourceOpen);
                  
                  const audioUrl = URL.createObjectURL(mediaSource);

                  
                  audioElement = new Audio();

                  
                  audioElement.src = audioUrl;

                  audioElement.addEventListener('ended', () => {
                      URL.revokeObjectURL(audioUrl);
                  });

                  audioElement.addEventListener('error', (e) => {
                      console.error(e);
                  }); 				  
                  
                  async function handleSourceOpen(event) {
                        
                        var mediaSource = this;                            
                        
                        sourceBuffer = mediaSource.addSourceBuffer('audio/webm; codecs="opus"');
						
						sourceBuffer.addEventListener('updateend', () => {
						  if (appendBufferQueue.length > 0 && !sourceBuffer.updating) {
							let nextData = appendBufferQueue.shift(); // Dequeue the next segment
							appendbuffer(nextData,false);
						  }
						});	

						if (msg.mediasourceinit){
							setTimeout(()=>{
								addbuffer(msg.blob,true);
							},50)
							mediasourcefirsttime = false;
						}else{
							
							//user join in the middle talk go to here
							
							let blob = new Blob([b64toblob(msg.headerBlob),b64toblob(msg.blob)], { type: "audio/webm;codecs=opus" });
							
							//try not work
							
							/*setTimeout(()=>{
									const reader = new FileReader();
									reader.onload = function(event) {

										const rawData =	event.target.result;//const rawData =	new Uint8Array(event.target.result);

										if (sourceBuffer.updating) {
											appendBufferQueue.push(rawData);
										} else {
											appendbuffer(rawData,true);
										}											
										
									};
									//blob = b64toblob(msg.headerBlob);
									reader.readAsArrayBuffer(blob);
									const reader1 = new FileReader();
									reader1.onload = function(event) {

										const rawData =	event.target.result;//const rawData =	new Uint8Array(event.target.result);

										if (sourceBuffer.updating) {
											appendBufferQueue.push(rawData);
										} else {
											appendbuffer(rawData,true);
										}											
										
									};									
									blob = b64toblob(msg.blob);
									//reader1.readAsArrayBuffer(blob);
							},50)
							mediasourcefirsttime = false;
							playing = true;*/
							
							//work on pc , not work on android							
														
							/*function playQueueWebAudio() {
								if (audioBuffers.length > 0) {
									playing = true
									const currentBuffer = audioBuffers.shift();
									const source = audioContext.createBufferSource();
									source.buffer = currentBuffer;
									source.connect(audioContext.destination);

									source.start(startTime);
									startTime += currentBuffer.duration; // Schedule the next sound to start after this one ends

									source.onended = () => {
										playQueueWebAudio(); // Play next when current ends
									};
								} else {
									playing = false
									//console.log("Web Audio queue finished.");
								}
							}   							
							const buffer = await blob.arrayBuffer();
							const audioBuffer = await audioContext.decodeAudioData(buffer);
							audioBuffers.push(audioBuffer);
							if (!playing) playQueueWebAudio();*/
							
							
							//this is very buggy
							
							/*audioBuffers.push(blob);

							function playNextAudio() {
								if (audioBuffers.length > 0) {
									const audioBlob = audioBuffers.shift(); // Get the first blob and remove it
									const audioUrl = URL.createObjectURL(audioBlob);

									if (playing) {
										playing.pause();
										playing.src = '';
										URL.revokeObjectURL(playing.src); // Clean up previous object URL
									}

									playing = new Audio(audioUrl);
									playing.play();

									playing.onended = () => {
										URL.revokeObjectURL(audioUrl); // Revoke URL after playback
										playNextAudio(); // Play the next one
									};
								}else{
									playing = false;
								}
							}
							if (!playing) playNextAudio();*/
							
							// experiment
							
							const audioBlob = blob;
							const audioUrl = URL.createObjectURL(audioBlob);
							const playing = new Audio(audioUrl);
							playing.play();
							playing.onended = () => {
								URL.revokeObjectURL(audioUrl);
								radiobusy();
							};
			 							  
						}
                  }
            }else{
				
				/*if(playing){
					let blob = new Blob([b64toblob(msg.headerBlob),b64toblob(msg.blob)], { type: "audio/webm;codecs=opus" });
					const reader = new FileReader();
					reader.onload = function(event) {

						const rawData =	event.target.result;//const rawData =	new Uint8Array(event.target.result);

						if (sourceBuffer.updating) {
							appendBufferQueue.push(rawData);
						} else {
							appendbuffer(rawData,false);
						}											
						
					};
					blob = b64toblob(msg.blob);
					reader.readAsArrayBuffer(blob); 					
					return;
				}*/
				
                  addbuffer(msg.blob,false);
            }
        
        }   


		async function startstream(){
        

				stream = await navigator.mediaDevices.getUserMedia({ audio: true })
					

				const options = {
				  audioBitsPerSecond: 16000,
				  mimeType: 'audio/webm'
				}
			
				var madiaRecorder = new MediaRecorder(stream,options); 
				
				let mediaHeaderRequested = false;
				
				madiaRecorder.addEventListener("start", async function (event) {
					if(!madiaRecorder)return;
					//setTimeout(()=>{
						madiaRecorder.requestData();
					//},100)
				})				

				madiaRecorder.addEventListener("dataavailable", function (event) {
				
				  if (event.data.size > 0) {
						if(!mediaHeaderRequested){
							blobToBase64(event.data).then(b64 => {
								headerBlob = b64;
							});
							mediaHeaderRequested = true;
						}					  
						handleDataAvailable(event)        
				  }                 
				}); 
				
				let playbtn = document.getElementsByClassName("play-button")[0]   
				
				playbtn.addEventListener("mousedown", startrecord);
				playbtn.addEventListener("click", stoprecord);
				playbtn.addEventListener("touchstart", startrecord); 
				
				//setTimeout(()=>{startrecord();},5000); // for debugging
				
				function startrecord(e) {
					
					if(e)e.preventDefault();
					
					if(achexauth && availableradio && stream.active && madiaRecorder.state === 'inactive'){
					
						if(playbtn.classList.contains('paused')){
							playbtn.classList.remove('paused');
						};
						
						casterid = dashboarddata.user.userbid;
						
						let data = {
						  toH:hubname,
						  channel,
						  msg:{radioinuse:true},
						}
						if(!echo)ws.send(JSON.stringify(data))                        
						
						mediasourceinit = true;
						
						mediaHeaderRequested = false;
						
						if(istimeslice){
						  madiaRecorder.start(timeslice);
						}else{
						  madiaRecorder.start();
						}
						
						isavailableradio(false)
						
					}

				}  
				
				playbtn.addEventListener("mouseup", stoprecord); 
				playbtn.addEventListener("mouseleave", stoprecord); 
				playbtn.addEventListener("touchend", stoprecord); 
				
				function stoprecord(e) {
					  if(madiaRecorder.state !== 'inactive'){
					  
						if(!playbtn.classList.contains('paused')){
						  playbtn.classList.add('paused');
						}
						
						let delay = 200;
						
						setTimeout(()=>{
						  madiaRecorder.stop();
						},delay)                        
						
						setTimeout(()=>{
						  isavailableradio(true)
						},delay+timedelay)
								   
					  }
				}

		}
		
		startstream()
                                      
            
		function stopRadio() {
			if (stream) {
				stream.getTracks().forEach(track => {
					track.stop(); // Stop each individual track
				});
				stream = null; // Clear the stream reference
			}
			ws.close();
		}		
            
        timeout = setTimeout(()=>{
            isavailableradio(true)
        },timedelay) 
        
        function isavailableradio(bol){
          if(bol){
              availableradio = true;
              document.getElementsByClassName("radioleft")[0].style.backgroundColor = "green";
              document.getElementsByClassName("radioright")[0].style.backgroundColor = "green";
			  casterid = 'STANDBY';
			  document.getElementsByClassName("radiostatus")[0].innerHTML = casterid;
			  playpttsound();
          }else{
              availableradio = false;
              document.getElementsByClassName("radioleft")[0].style.backgroundColor = "red";
              document.getElementsByClassName("radioright")[0].style.backgroundColor = "red"; 
			  document.getElementsByClassName("radiostatus")[0].innerHTML = `
					<span class="radiostatusmic"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic-fill" viewBox="0 0 16 16">
					  <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z"/>
					  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
					</svg></span>
					${safe(casterid)}
			  `;
			  clearInterval(radiostatusmic);
			  radiostatusmic = setInterval(()=>{
				  let el = document.getElementsByClassName("radiostatusmic")[0];
				  if(el){
					  let rand = Math.floor(Math.random()*2)
					  if(rand === 0){
						  el.style.color = "red";
					  }else{
						  el.style.color = "white";
					  }
				  }else{
					  clearInterval(radiostatusmic);
				  }
			  },200)
          }
        }
        
        isavailableradio(false) 
        
        
        
        
        function connect(){            
            
            ws = new WebSocket('wss://cloud.achex.ca/');
                
            ws.onmessage = event => {
                
				if(!echo){
					achex(event.data,this)  
				}
                      
            };            

            ws.onopen = () => {
                console.log('WebSocket connection opened');
                const data = {
                  auth:username,
                  passwd:'none'
                }
                ws.send(JSON.stringify(data))
            };

            ws.onclose = (dontreconnect) => {
                console.log('WebSocket connection closed');
				if(dontreconnect){
					console.log('Dont reconnect ws');
				}else{				
					achexauth = false;
					let info = document.getElementsByClassName("radioinfo")[0]
					if(info){
							info.innerHTML = `
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wifi-off" viewBox="0 0 16 16">
									  <path d="M10.706 3.294A12.6 12.6 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.52.52 0 0 0 .668.05A11.45 11.45 0 0 1 8 4q.946 0 1.852.148zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.45 8.45 0 0 1 3.51-1.27zm2.596 1.404.785-.785q.947.362 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.5 8.5 0 0 0-1.98-.932zM8 10l.933-.933a6.5 6.5 0 0 1 2.013.637c.285.145.326.524.1.75l-.015.015a.53.53 0 0 1-.611.09A5.5 5.5 0 0 0 8 10m4.905-4.905.747-.747q.886.451 1.685 1.03a.485.485 0 0 1 .047.737.52.52 0 0 1-.668.05 11.5 11.5 0 0 0-1.811-1.07M9.02 11.78c.238.14.236.464.04.66l-.707.706a.5.5 0 0 1-.707 0l-.707-.707c-.195-.195-.197-.518.04-.66A2 2 0 0 1 8 11.5c.374 0 .723.102 1.021.28zm4.355-9.905a.53.53 0 0 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75z"/>
									</svg>						
							`;
							setTimeout(()=>{

									connect();
								
							},1000)
					}
				}
            };
       
        }
  
        connect()
    	
		
  })
}
////////////////////////////////////////////////////////////////////





///////fpageadmin();///////////////////////////////////////////
function fpageadmin()
{
  if (typeof mybsmiadmindata === 'undefined' || mybsmiadmindata === null)
  {
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'getadmindata'}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
              window.mybsmiadmindata = content;
              fpageadminrun(content);
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
  }
  else
  {
    fpageadminrun(mybsmiadmindata);
  }

  $$('.mybsmi-adminrefresh').on('click', function () {
    mybsmiadmindata = null
    fpageadmin()
  })
}

function fpageadminidentitas(base64)
{
  var data = atob(base64);data = JSON.parse(data);
  var dialog = app.dialog.create({
    title: 'Data Relawan',
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="" style="width:150px;height:150px;margin: 10px 10px;border-radius: 50%;object-fit: cover;">'
      +'      <p style="font-weight:bold;"></p>'
      +'      <div class="data-table" style="width:100%"><table><tbody>'
      +'          <tr><td>Nama</td><td>'+safe(data[4])+'</td></tr>'
	  +'          <tr><td>No. KTA</td><td>'+safe(data[18])+'</td></tr>'
      //+'          <tr><td>Email</td><td>'+safe(data[2])+'</td></tr>'
      +'          <tr><td>Cabang</td><td>'+safe(data[11])+'</td></tr>'
      +'          <tr><td>Jenis Kelamin</td><td>'+safe(data[5])+'</td></tr>'
      +'          <tr><td>Alamat</td><td>'+safe(data[7])+'</td></tr>'
      +'          <tr><td>Profesi</td><td>'+safe(data[8])+'</td></tr>'
      +'          <tr><td>Golongan Darah</td><td>'+safe(data[9])+'</td></tr>'
      +'          <tr><td>No HP</td><td>'+safe(data[10])+'</td></tr>'
      +'          <tr><td>Tahun Bergabung</td><td>'+safe(data[12])+'</td></tr>'
      +'      </tbody></table></div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        let src = "https://lh3.googleusercontent.com/d/"+safe(data[13]);
        $$('#img').attr('src',src);
      }
    },
    buttons: [
       {
        text: 'Profil',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
            let url = "/relawan/"+safe(data[1]);
            app.views.main.router.navigate(url);
          }
      },
      {
        text: 'Tutup',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpageadminrun(content){
	let json = JSON.parse(dashboarddata.user.usermydata);
	if (json.admincabang){
		fpageadmincabang(content)
	}
	if (json.adminlaporan){
		fpageadminlaporan(content)
	}
}
//---------------------------------------------------------------
function fpageadmincabang(content)
{
  let json = JSON.parse(dashboarddata.user.usermydata);
  let usercabang = dashboarddata.user.usercabang;
  let datacabang;
  let datarelawan = [];
  kodecabang.forEach(function(currentElement, index, array){
    if (currentElement[0] == usercabang)
    {
      datacabang = currentElement;
    }
  })
	console.log('datacabang',datacabang)
  if (json.admincabang)
  {
    $$('.mybsmi-admincabangmenu').show();
    var data = '<div class="data-table"><table><tbody>';
    data += '<tr><td>Cabang</td><td><a href="/cabang/'+safe(datacabang[1])+'">'+safe(datacabang[0])+'</a></td></tr>';
    data += '<tr><td>Anggota</td><td><span class="jumlahrelawan"></span></td></tr>';
    data += '<tr><td>Alamat</td><td>'+safe(datacabang[2])+'</td></tr>';
    data += '<tr><td>Telepon</td><td>'+safe(datacabang[3])+'</td></tr>';
    var ig;if (datacabang[4] != ''){ig = safe(datacabang[4]);}else{ig='';}
    data += '<tr><td>Instagram</td><td>'+ig+'</td></tr>';
	let ketua = content.find((arr)=>arr[1]==datacabang[5])
    data += '<tr><td>Ketua</td><td><a class="ketua" data-user="'+btoa(JSON.stringify(ketua))+'">'+safe(datacabang[6])+'</a></td></tr>';
    data += '</tbody></table></div>';
    $$('.mybsmi-admincabangisi').html(data);
  }
  data = '<div class="list"><ul><li class="item-content item-input item-input-outline"><div class="item-inner"><div class="item-title item-label">Pencarian</div><div class="item-input-wrap"><input id="pencarian" type="text" placeholder="katakunci"><span class="input-clear-button"></span></div></div></li></ul></div>'
  data += '<div class="data-table data-table-collapsible data-table-init"><table><thead><tr><th></th><th>Nama</th><th>No. KTA</th><th>Cabang</th><th>Profesi</th><th>Status Keanggotaan</th><th>Jenjang Keanggotaan</th><th></th></tr></thead><tbody>';
  var jumlahrelawan = 0;
  for (i=content.length-1;i>-1;i--)
  {
      if ((skipuid.includes(content[i][1]))&&(dashboarddata.user.useruid !== '0ONjeb65X5OunuRI6Ap8')){continue;}else{if ((skipuid.includes(content[i][1]))&&(!isLocal)) continue;}
      
      if ((content[i][3] === 'Terbatas')||(content[i][3] === 'Terverifikasi')||(content[i][3] === 'Tertolak')){}else{continue;}
      
      if((json.admincabang) && (content[i][11] !== usercabang)){continue;}
      
	  let badge = content[i][3] === 'Terverifikasi' ? '<i class="icon f7-icons" style="font-size:12px;color:blue;">checkmark_seal</i>' : '';
	  let statuskeanggotaan = (JSON.parse(content[i][14])).statuskeanggotaan
	  let status = statuskeanggotaan ? statuskeanggotaan.status : '-'
	  let jenjang = statuskeanggotaan ? statuskeanggotaan.jenjang : '-'
	  
      data += '<tr class="mybsmi-admin-item-'+safe(content[i][1])+'"><td data-collapsible-title=""><img src="avatar.png" style="width:1.5em;aspect-ratio:1/1;object-fit:cover;border-radius:50% 50%;overflow:hidden;"></td><td data-collapsible-title="Nama"><a class="mybsmi-cabang-relawan" data-user="'+safe(content[i][1])+'">'+safe(content[i][4])+'</a> '+badge+'</td><td data-collapsible-title="No. KTA">'+safe(content[i][18])+'</td><td data-collapsible-title="Cabang">'+safe(content[i][11])+'</td><td data-collapsible-title="Profesi">'+safe(content[i][8])+'</td><td data-collapsible-title="Status Keanggotaan">'+safe(status)+'</td><td data-collapsible-title="Jenjang Keanggotaan">'+safe(jenjang)+'</td><td><a class="button button-fill mybsmi-adminaction" data-user="'+btoa(JSON.stringify(content[i]))+'">Detail</a></td></tr>';
      
      jumlahrelawan++;
      
      datarelawan.push(content[i]);
  }
  data += '</tbody></table></div>';
  $$('.mybsmi-admincabangmenu .mybsmi-admincabangdb').html(data);
  $$('.mybsmi-admincabangmenu .totalrelawan').html('Total : '+jumlahrelawan);
  
  $$('.mybsmi-admincabangmenu .jumlahrelawan').html(jumlahrelawan);
  
  if(datacabang[0] == "BSMI Jawa Timur")
  {
	  datarelawan = content
  }

  for (i=content.length-1;i>-1;i--)
  {
    if(content[i][13]!==''){
		let url = 'https://lh3.googleusercontent.com/d/'+safe(content[i][13]);
		$$('.mybsmi-admincabangmenu .mybsmi-admincabangdb .mybsmi-admin-item-'+safe(content[i][1])+' img').attr('src',url);
	}
  }

  $$('.mybsmi-admincabangmenu .mybsmi-admincabangdb a.mybsmi-adminaction').on('click', function (e) {
        
        //app.dialog.confirm('Pembuatan e-KTA memerlukan waktu 2-4 menit.', 'Pemberitahuan', function (){fbuatekta();})
        var base64 = this.attributes["data-user"].value;
        fpageadmincabangidentitas(base64)
  });

  $$('.mybsmi-admincabangmenu .mybsmi-admincabangisi .ketua').on('click', function (e) {
        var base64 = this.attributes["data-user"].value;
        fpageadmincabangidentitas(base64)
  });

  $$(".mybsmi-admincabangmenu #pencarian").on("input", function() {
    var value = $$(this).val().toLowerCase();
    $$(".mybsmi-admincabangmenu .mybsmi-admincabangdb tr").each(function() {
	  if($$(this).text().toLowerCase().indexOf(value) > -1)
	  {
		  $$(this).show()
	  }else{
		  $$(this).hide()
	  }
    });
  });

  $$('.mybsmi-admincabangmenu .mybsmi-editcabang').off('click');
  $$('.mybsmi-admincabangmenu .mybsmi-editcabang').on('click', function (e) {
        fpageadmincabangprofileedit(datacabang,datarelawan)
  });

  $$('.mybsmi-admincabangmenu .mybsmi-cabang-relawan').on('click', function (e) {
        let data = this.attributes["data-user"].value;
        let url = "/relawan/"+safe(data);
        //console.log(url);
        app.views.main.router.navigate(url);
  });
  
  $$('.mybsmi-admincabangmenu .buat-link').off('click')
  $$('.mybsmi-admincabangmenu .buat-link').on('click', function () {
		fbuatlinkaktivasi()
  })

  $$('.mybsmi-admincabangmenu .undang-relawan').on('click', function () {
		fundangrelawan()
  })

  $$('.mybsmi-admincabangmenu .verifikasi-anggota').on('click', function (e) {
        let url = "/verifikator/";
        app.views.main.router.navigate(url);
  });

  $$('.mybsmi-admincabangmenu .laporan-berita-acara').on('click', function (e) {
        let url = "/kegiatan/";
        app.views.main.router.navigate(url);
  });
  
  let struktur = datacabang[8]
  fpageadmincabangdrawstruktur(struktur,datacabang,datarelawan)

	app.on('sortableSort', function (itemEl, data, listEl) {
		  // do something on page init

		const reorderArray = (event, originalArray) => {
		  const movedItem = originalArray.filter((item, index) => index === event.oldIndex);
		  const remainingItems = originalArray.filter((item, index) => index !== event.oldIndex);
		  
		  const reorderedItems = [
			...remainingItems.slice(0, event.newIndex),
			movedItem[0],
			...remainingItems.slice(event.newIndex)
		  ];
		  
		  return reorderedItems;
		}
		  
		  let target = $$(listEl).hasClass('struktur')
		  if(target)
		  {
			  //console.log(itemEl, data, listEl)
			  //console.log('mybsmiadmindatacabang',mybsmiadmindatacabang)
			  let namacabang = datacabang[0]
			  let oldstruktur = JSON.parse(mybsmiadmindatacabang[8])
			  const newevent = {newIndex: data.to, oldIndex: data.from};
			  let newstruktur = reorderArray(newevent, oldstruktur)
			  let struktur = JSON.stringify(newstruktur)
			  var datainput = {namacabang,struktur};
			  fpageadmincabangstruktursave(datainput,datacabang,datarelawan);
		  }
	});	

  let bsmr = datacabang[9]
  fpageadmincabangdrawbsmr(bsmr,datacabang,datarelawan)

  let klinik = datacabang[10]
  fpageadmincabangdrawklinik(klinik,datacabang,datarelawan)

  let aset = datacabang[11]
  fpageadmincabangdrawaset(aset,datacabang,datarelawan)

}

function fpageadmincabangidentitas(base64)
{
  var data = atob(base64);data = JSON.parse(data);
  var dialog = app.dialog.create({
    title: 'Data Relawan',
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="" style="width:150px;height:150px;margin: 10px 10px;border-radius: 50%;object-fit: cover;">'
      +'      <p style="font-weight:bold;"></p>'
      +'      <div class="data-table" style="width:100%"><table><tbody>'
      +'          <tr><td>Nama</td><td>'+safe(data[4])+'</td></tr>'
	  +'          <tr><td>No. KTA</td><td>'+safe(data[18])+'</td></tr>'
      //+'          <tr><td>Email</td><td>'+safe(data[2])+'</td></tr>'
      +'          <tr><td>Cabang</td><td>'+safe(data[11])+'</td></tr>'
      +'          <tr><td>Jenis Kelamin</td><td>'+safe(data[5])+'</td></tr>'
      +'          <tr><td>Alamat</td><td>'+safe(data[7])+'</td></tr>'
      +'          <tr><td>Profesi</td><td>'+safe(data[8])+'</td></tr>'
      +'          <tr><td>Golongan Darah</td><td>'+safe(data[9])+'</td></tr>'
      +'          <tr><td>No HP</td><td>'+safe(data[10])+'</td></tr>'
      +'          <tr><td>Tahun Bergabung</td><td>'+safe(data[12])+'</td></tr>'
      +'      </tbody></table></div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        let src = "https://lh3.googleusercontent.com/d/"+safe(data[13]);
        $$('#img').attr('src',src);
      }
    },
    buttons: [
       {
        text: 'Profil',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
            let url = "/relawan/"+safe(data[1]);
            app.views.main.router.navigate(url);
          }
      },
      {
        text: 'Tutup',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpageadmincabangprofileedit(datacabang,datarelawan)
{
  var dialog = app.dialog.create({
    title: 'Edit Cabang',
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="icon512.png" style="width:150px;height:150px;margin: 10px 10px;border-radius: 0%;object-fit: cover;">'
      +'      <p style="font-weight:bold;">'+safe(datacabang[0])+'</p>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Alamat</div><div class="item-input-wrap">'
      +'            <input type="text" id="alamatcabang" name="alamat" placeholder="Alamat" value="'+safe(datacabang[2])+'">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Telepon</div><div class="item-input-wrap">'
      +'            <input type="text" id="teleponcabang" name="telepon" placeholder="Telepon" value="'+safe(datacabang[3])+'"/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Instagram Username</div><div class="item-input-wrap">'
      +'            <input type="text" id="instagramcabang" name="instagram" placeholder="Instagram" value="'+safe(datacabang[4])+'">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input display-none"><div class="item-inner"><div class="item-title item-label">Ketua</div><div class="item-input-wrap">'
      +'                            <select id="ketuacabang" name="ketua">'
      +'                              <option value="" selected> </option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        var select = document.getElementById('ketuacabang');
        datarelawan.forEach(function(item,index){
            var opt = document.createElement('option');
            opt.value = item[1];
            opt.innerHTML = item[4]+' ('+item[18]+')';            
            if(userstatusnormal.includes(item[3]))
			{
				select.appendChild(opt);
			}
            if (item[1] == datacabang[5])
            {
              select.value = item[1];
            }
        });
      }
    },
    buttons: [
      {
        text: 'Simpan',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
                var namacabang = datacabang[0];
                var alamatcabangasli = $$('#alamatcabang').val();
                var teleponcabangasli = $$('#teleponcabang').val();
                var instagramcabangasli = $$('#instagramcabang').val();
                var alamatcabang = "'"+$$('#alamatcabang').val();
                var teleponcabang = "'"+$$('#teleponcabang').val();
                var instagramcabang = "'"+$$('#instagramcabang').val();
                var ketuacabangid = $$('#ketuacabang').val();
                var ketuacabangnama = '',ketuacabangphoto='';
                datarelawan.forEach(function(item,index){
                  if (item[1] == ketuacabangid)
                  {
                    ketuacabangnama = item[4];
                    ketuacabangphoto = item[13];
                  }
                });
                var data = {namacabang,alamatcabangasli,teleponcabangasli,instagramcabangasli,alamatcabang,teleponcabang,instagramcabang,ketuacabangid,ketuacabangnama,ketuacabangphoto};
                fpageadmineditcabang(data);
          }
      },
      {
        text: 'Batal',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpageadmineditcabang(inputdata)
{
      inputdata=JSON.stringify(inputdata);
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'admincabangupdateprofilcabang', inputdata}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              console.log(content);
              fpageadmineditcabangupdate(inputdata); 
              var toastBottom = app.toast.create({ text: 'Berhasil', closeTimeout: 3000,position: 'center', });toastBottom.open();
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function fpageadmineditcabangupdate(inputdata)
{
  var inputdata = JSON.parse(inputdata);console.log(inputdata);
  kodecabang.forEach(function(item,index){
    if(item[0] == inputdata.namacabang)
    {
      kodecabang[index][2] = inputdata.alamatcabangasli;
      kodecabang[index][3] = inputdata.teleponcabangasli;
      kodecabang[index][4] = inputdata.instagramcabangasli; 
      kodecabang[index][5] = inputdata.ketuacabangid;
      kodecabang[index][6] = inputdata.ketuacabangnama;
      kodecabang[index][7] = inputdata.ketuacabangphoto;
      fpageadminrun(mybsmiadmindata);
    }
  })
}

//---struktur----

function fpageadmincabangstrukturtambah(datacabang,datarelawan)
{
  var dialog = app.dialog.create({
    title: 'Tambah Pengurus',
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="icon512.png" style="width:150px;height:150px;margin: 10px 10px;border-radius: 0%;object-fit: cover;">'
      +'      <p style="font-weight:bold;">'+safe(datacabang[0])+'</p>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Jabatan</div><div class="item-input-wrap">'
      +'            <input type="text" id="jabatanpengurus" name="jabatanpengurus" placeholder="Jabatan Pengurus" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Nama Pengurus</div><div class="item-input-wrap">'
      +'                            <select id="namapengurus" name="namapengurus">'
      +'                              <option value="" selected> </option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        var select = document.getElementById('namapengurus');
        datarelawan.forEach(function(item,index){
            var opt = document.createElement('option');
            opt.value = item[1];
            opt.innerHTML = item[4]+' ('+item[18]+')';            
            if(userstatusnormal.includes(item[3]))
			{
				select.appendChild(opt);
			}
            if (item[1] == datacabang[5])
            {
              //select.value = item[1];
            }
        });
      }
    },
    buttons: [
      {
        text: 'Simpan',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
                var namacabang = datacabang[0];
                var jabatanpengurus = $$('#jabatanpengurus').val();
                var namapengurusid = $$('#namapengurus').val();
				if(namapengurusid == ''){
					var toastBottom = app.toast.create({ text: 'Nama pengurus tidak boleh kosong', closeTimeout: 3000,position: 'center', });toastBottom.open();
					return
				}
				var arr = JSON.parse(datacabang[8])
				arr.push({jabatanpengurus,namapengurusid})
				var struktur = JSON.stringify(arr)
                var data = {namacabang,struktur};
                fpageadmincabangstruktursave(data,datacabang,datarelawan);
          }
      },
      {
        text: 'Batal',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpageadmincabangstruktursave(inputdata,datacabang,datarelawan)
{
      inputdata=JSON.stringify(inputdata);
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'admincabangstruktursave', inputdata}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
			  fpageadmincabangdrawstruktur(content,datacabang,datarelawan)
              var toastBottom = app.toast.create({ text: 'Berhasil', closeTimeout: 3000,position: 'center', });toastBottom.open();
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function fpageadmincabangdrawstruktur(struktur,datacabang,datarelawan)
{
	datacabang[8] = struktur
	window.mybsmiadmindatacabang = datacabang
	$$('.mybsmi-admincabangstrukturtambah').off('click')
	$$('.mybsmi-admincabangstrukturtambah').on('click', function () {
		fpageadmincabangstrukturtambah(datacabang,datarelawan)
	})
	
	let html = ''+
		'<div class="list sortable struktur">'+
			'<ul>'
	
	let arr = JSON.parse(struktur)
	for(let i=0;i<arr.length;i++)
	{
		//console.log('item',item)
		//console.log('datarelawan',datarelawan)
		let item = arr[i]
		let data = datarelawan.find((arr)=>arr[1]==item.namapengurusid)
		let el = ''+
          '<li>'+
            '<div class="item-content">'+
              '<div class="item-media"><img src="https://lh3.googleusercontent.com/d/'+safe(data[13])+'" style="width:1.5em;aspect-ratio:1/1;object-fit:cover;border-radius:50% 50%;overflow:hidden;"></div>'+
              '<div class="item-inner">'+
                '<div class="item-title"><a class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(data))+'">'+safe(data[4])+'</a></div>'+
                '<div class="item-after"><a class="mybsmi-struktur-delete" data-idx="'+i+'">'+safe(item.jabatanpengurus)+'</a></div>'+
              '</div>'+
            '</div>'+
            '<div class="sortable-handler"></div>'+
          '</li>'
		  
		 html += el
	}
	
	html += '</ul></div>'
	
	$$('.mybsmi-admincabangstrukturlist').html(html)

	$$('.struktur a.mybsmi-adminaction').on('click', function (e) {
			var base64 = this.attributes["data-user"].value;
			fpageadminidentitas(base64)
	});

	$$('.struktur a.mybsmi-struktur-delete').on('click', function (e) {
		var idx = this.attributes["data-idx"].value;
		app.dialog.confirm('Hapus item ini?', 'Konfirmasi', function (){
			let namacabang = datacabang[0]
			let oldstruktur = JSON.parse(datacabang[8])
			oldstruktur.splice(parseInt(idx), 1)
			let struktur = JSON.stringify(oldstruktur)
			var datainput = {namacabang,struktur};
			fpageadmincabangstruktursave(datainput,datacabang,datarelawan);
		})
	});
}

//---aset---

function fpageadmincabangasettambah(datacabang,datarelawan,aset,idx,edit)
{
  let myaset = aset
  let title = edit ? 'Edit aset' : 'Tambah aset'
  var dialog = app.dialog.create({
    title: title,
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="icon512.png" style="width:150px;height:150px;margin: 10px 10px;border-radius: 0%;object-fit: cover;">'
      +'      <p style="font-weight:bold;">'+safe(datacabang[0])+'</p>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Jenis aset</div><div class="item-input-wrap">'
      +'                            <select id="jenisaset" name="jenisaset">'
      +'                              <option value="" selected disabled> </option>'
	  +'                              <option value="Kantor">Kantor</option>'
	  +'                              <option value="Ambulans">Ambulans</option>'
	  +'                              <option value="Mobil">Mobil</option>'
	  +'                              <option value="Lainnya">Lainnya</option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Nama aset</div><div class="item-input-wrap">'
      +'            <input type="text" id="namaaset" name="namaaset" placeholder="Nama aset" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Lokasi aset</div><div class="item-input-wrap">'
      +'            <input type="text" id="lokasiaset" name="lokasiaset" placeholder="Lokasi aset" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Keterangan aset</div><div class="item-input-wrap">'
      +'            <input type="text" id="keteranganaset" name="keteranganaset" placeholder="Kondisi/Nomor/Surat/dll" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Status aset</div><div class="item-input-wrap">'
      +'                            <select id="statusaset" name="statusaset">'
      +'                              <option value="" selected disabled> </option>'
	  +'                              <option value="Milik Sendiri">Milik Sendiri</option>'
	  +'                              <option value="Sewa">Sewa</option>'
	  +'                              <option value="Menumpang">Menumpang</option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Tahun aset</div><div class="item-input-wrap">'
      +'            <input type="text" id="tahunaset" name="tahunaset" placeholder="Tahun aset" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">PIC aset (dari BSMI Cabang)</div><div class="item-input-wrap">'
      +'                            <select id="picasetid" name="picasetid">'
      +'                              <option value="" selected> </option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        var select = document.getElementById('picasetid');
        datarelawan.forEach(function(item,index){
            var opt = document.createElement('option');
            opt.value = item[1];
            opt.innerHTML = item[4]+' ('+item[18]+')';            
            if(userstatusnormal.includes(item[3]))
			{
				select.appendChild(opt);
			}
        });
		
		if(edit){
			let arr = JSON.parse(aset)
			let data = arr[parseInt(idx)]
			$$('#jenisaset').val(safe(data.jenisaset))
			$$('#namaaset').val(safe(data.namaaset))
			$$('#lokasiaset').val(safe(data.lokasiaset))
			$$('#keteranganaset').val(safe(data.keteranganaset))
			$$('#statusaset').val(safe(data.statusaset))
			$$('#tahunaset').val(safe(data.tahunaset))
			$$('#picasetid').val(safe(data.picasetid))
			//$$('#jenisaset').attr('disabled','true')
		}
		
      }
    },
    buttons: [
      {
        text: 'Simpan',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
				
				var namacabang = datacabang[0];
				var jenisaset = $$('#jenisaset').val();
				var namaaset = $$('#namaaset').val();
				var lokasiaset = $$('#lokasiaset').val();
				var keteranganaset = $$('#keteranganaset').val();
				var statusaset = $$('#statusaset').val();
				var tahunaset = $$('#tahunaset').val();
				var picasetid = $$('#picasetid').val();
				if(picasetid == ''){
					var toastBottom = app.toast.create({ text: 'PIC aset tidak boleh kosong', closeTimeout: 3000,position: 'center', });toastBottom.open();
					return
				}
				
				if(edit){
					var arr = JSON.parse(myaset)
					arr[parseInt(idx)] = {namacabang,jenisaset,namaaset,lokasiaset,keteranganaset,statusaset,tahunaset,picasetid}
					var aset = JSON.stringify(arr)
					var data = {namacabang,aset}
					fpageadmincabangasetsave(data,datacabang,datarelawan)
				}else{
					var arr = JSON.parse(datacabang[11])
					arr.push({namacabang,jenisaset,namaaset,lokasiaset,keteranganaset,statusaset,tahunaset,picasetid})
					var aset = JSON.stringify(arr)
					var data = {namacabang,aset};
					fpageadmincabangasetsave(data,datacabang,datarelawan);
				}
          }
      },
      {
        text: 'Batal',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpageadmincabangasetsave(inputdata,datacabang,datarelawan)
{
      //console.log(inputdata);return;
	  inputdata=JSON.stringify(inputdata);
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'admincabangasetsave', inputdata}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
			  fpageadmincabangdrawaset(content,datacabang,datarelawan)
              var toastBottom = app.toast.create({ text: 'Berhasil', closeTimeout: 3000,position: 'center', });toastBottom.open();
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function fpageadmincabangdrawaset(aset,datacabang,datarelawan)
{
	datacabang[11] = aset
	//window.mybsmiadmindatacabang = datacabang
	$$('.mybsmi-admincabang-asettambah').off('click')
	$$('.mybsmi-admincabang-asettambah').on('click', function () {
		fpageadmincabangasettambah(datacabang,datarelawan)
	})
	
	let asethtml = '<div class="data-table data-table-collapsible data-table-init aset"><table><thead><tr><th>Jenis aset</th><th>Nama aset</th><th>Lokasi aset</th><th>Keterangan aset</th><th>Status aset</th><th>Tahun aset</th><th>PIC aset (dari BSMI Cabang)</th><th></th></tr></thead><tbody>'
	let arr = JSON.parse(aset)
	for(let i=0;i<arr.length;i++){
		let item = arr[i]
		let data = datarelawan.find((arr)=>arr[1]==item.picasetid)
		asethtml += '<tr>'+
						'<td data-collapsible-title="Jenis aset">'+safe(item.jenisaset)+'</td>'+
						'<td data-collapsible-title="Nama aset">'+safe(item.namaaset)+'</td>'+
						'<td data-collapsible-title="Lokasi aset">'+safe(item.lokasiaset)+'</td>'+
						'<td data-collapsible-title="Keterangan aset">'+safe(item.keteranganaset)+'</td>'+
						'<td data-collapsible-title="Status aset">'+safe(item.statusaset)+'</td>'+
						'<td data-collapsible-title="Tahun aset">'+safe(item.tahunaset)+'</td>'+
						'<td data-collapsible-title="PIC aset (dari BSMI Cabang)"><a class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(data))+'">'+safe(data[4])+'</a></td>'+
						'<td data-collapsible-title=""><a class="button button-fill update" data-idx="'+i+'">Update</a></td>'+
					'</tr>'
	}
	asethtml += '</tbody></table></div>'
	
	$$('.mybsmi-admincabang-asetdata').html(asethtml)

	$$('.mybsmi-admincabang-asetdata .aset a.mybsmi-adminaction').on('click', function (e) {
			var base64 = this.attributes["data-user"].value;
			fpageadminidentitas(base64)
	});
	
	$$('.mybsmi-admincabang-asetdata .aset a.update').on('click', function (e) {
		var idx = this.attributes["data-idx"].value;
		fpageadmincabangasetupdate(datacabang,datarelawan,aset,idx)
	});
}

function fpageadmincabangasetupdate(datacabang,datarelawan,aset,idx){
	
  var dialog = app.dialog.create({
    title: 'Update aset',
    content:'',
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        
      }
    },
    buttons: [
      {
        text: 'Edit',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
              let edit = true
			  fpageadmincabangasettambah(datacabang,datarelawan,aset,idx,edit)
          }
      },
      {
        text: 'Delete',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
			let myaset = aset
			app.dialog.confirm('Hapus?', 'Konfirmasi', function (){
				console.log('myaset',myaset)
				let namacabang = datacabang[0]
				let oldaset = JSON.parse(myaset)
				oldaset.splice(parseInt(idx), 1)
				let aset = JSON.stringify(oldaset)
				var datainput = {namacabang,aset};
				fpageadmincabangasetsave(datainput,datacabang,datarelawan);
			})              
          }
      },
      {
        text: 'Tutup',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

//---klinik---

function fpageadmincabangkliniktambah(datacabang,datarelawan,klinik,idx,edit)
{
  let myklinik = klinik
  let title = edit ? 'Edit Klinik' : 'Register Klinik'
  var dialog = app.dialog.create({
    title: title,
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="icon512.png" style="width:150px;height:150px;margin: 10px 10px;border-radius: 0%;object-fit: cover;">'
      +'      <p style="font-weight:bold;">'+safe(datacabang[0])+'</p>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Nama klinik</div><div class="item-input-wrap">'
      +'            <input type="text" id="namaklinik" name="namaklinik" placeholder="Nama klinik" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Alamat klinik</div><div class="item-input-wrap">'
      +'            <input type="text" id="alamatklinik" name="alamatklinik" placeholder="Alamat klinik" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Layanan klinik</div><div class="item-input-wrap">'
      +'            <input type="text" id="layananklinik" name="layananklinik" placeholder="Layanan klinik" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Tahun pendirian klinik</div><div class="item-input-wrap">'
      +'            <input type="text" id="tahunpendirianklinik" name="tahunpendirianklinik" placeholder="Tahun pendirian klinik" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Jumlah karyawan klinik</div><div class="item-input-wrap">'
      +'            <input type="text" id="jumlahkaryawanklinik" name="jumlahkaryawanklinik" placeholder="Jumlah karyawan klinik" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Manajer klinik</div><div class="item-input-wrap">'
      +'            <input type="text" id="manajerklinik" name="manajerklinik" placeholder="Nama/HP" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">PIC klinik (dari BSMI Cabang)</div><div class="item-input-wrap">'
      +'                            <select id="picklinikid" name="picklinikid">'
      +'                              <option value="" selected> </option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        var select = document.getElementById('picklinikid');
        datarelawan.forEach(function(item,index){
            var opt = document.createElement('option');
            opt.value = item[1];
            opt.innerHTML = item[4]+' ('+item[18]+')';            
            if(userstatusnormal.includes(item[3]))
			{
				select.appendChild(opt);
			}
        });
		
		if(edit){
			let arr = JSON.parse(klinik)
			let data = arr[parseInt(idx)]
			$$('#namaklinik').val(safe(data.namaklinik))
			$$('#alamatklinik').val(safe(data.alamatklinik))
			$$('#layananklinik').val(safe(data.layananklinik))
			$$('#tahunpendirianklinik').val(safe(data.tahunpendirianklinik))
			$$('#jumlahkaryawanklinik').val(safe(data.jumlahkaryawanklinik))
			$$('#manajerklinik').val(safe(data.manajerklinik))
			$$('#picklinikid').val(safe(data.picklinikid))
			$$('#namaklinik').attr('disabled','true')
		}
		
      }
    },
    buttons: [
      {
        text: 'Simpan',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
				
				var namacabang = datacabang[0];
				var namaklinik = $$('#namaklinik').val();
				var alamatklinik = $$('#alamatklinik').val();
				var layananklinik = $$('#layananklinik').val();
				var tahunpendirianklinik = $$('#tahunpendirianklinik').val();
				var jumlahkaryawanklinik = $$('#jumlahkaryawanklinik').val();
				var manajerklinik = $$('#manajerklinik').val();
				var picklinikid = $$('#picklinikid').val();
				if(picklinikid == ''){
					var toastBottom = app.toast.create({ text: 'PIC klinik tidak boleh kosong', closeTimeout: 3000,position: 'center', });toastBottom.open();
					return
				}
				
				if(edit){
					var arr = JSON.parse(myklinik)
					arr[parseInt(idx)] = {namacabang,namaklinik,alamatklinik,layananklinik,tahunpendirianklinik,jumlahkaryawanklinik,manajerklinik,picklinikid}
					var klinik = JSON.stringify(arr)
					var data = {namacabang,klinik}
					fpageadmincabangkliniksave(data,datacabang,datarelawan)
				}else{
					var arr = JSON.parse(datacabang[10])
					arr.push({namacabang,namaklinik,alamatklinik,layananklinik,tahunpendirianklinik,jumlahkaryawanklinik,manajerklinik,picklinikid})
					var klinik = JSON.stringify(arr)
					var data = {namacabang,klinik};
					fpageadmincabangkliniksave(data,datacabang,datarelawan);
				}
          }
      },
      {
        text: 'Batal',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpageadmincabangkliniksave(inputdata,datacabang,datarelawan)
{
      //console.log(inputdata);return;
	  inputdata=JSON.stringify(inputdata);
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'admincabangkliniksave', inputdata}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
			  fpageadmincabangdrawklinik(content,datacabang,datarelawan)
              var toastBottom = app.toast.create({ text: 'Berhasil', closeTimeout: 3000,position: 'center', });toastBottom.open();
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function fpageadmincabangdrawklinik(klinik,datacabang,datarelawan)
{
	datacabang[10] = klinik
	//window.mybsmiadmindatacabang = datacabang
	$$('.mybsmi-admincabang-kliniktambah').off('click')
	$$('.mybsmi-admincabang-kliniktambah').on('click', function () {
		fpageadmincabangkliniktambah(datacabang,datarelawan)
	})
	
	let klinikhtml = '<div class="data-table data-table-collapsible data-table-init klinik"><table><thead><tr><th>Nama klinik</th><th>Alamat klinik</th><th>Layanan klinik</th><th>Tahun Pendirian</th><th>Jumlah karyawan</th><th>Manajer klinik</th><th>PIC klinik (dari BSMI Cabang)</th><th></th></tr></thead><tbody>'
	let arr = JSON.parse(klinik)
	for(let i=0;i<arr.length;i++){
		let item = arr[i]
		let data = datarelawan.find((arr)=>arr[1]==item.picklinikid)
		klinikhtml += '<tr>'+
						'<td data-collapsible-title="Nama klinik">'+safe(item.namaklinik)+'</td>'+
						'<td data-collapsible-title="Alamat klinik">'+safe(item.alamatklinik)+'</td>'+
						'<td data-collapsible-title="Layanan klinik">'+safe(item.layananklinik)+'</td>'+
						'<td data-collapsible-title="Tahun Pendirian">'+safe(item.tahunpendirianklinik)+'</td>'+
						'<td data-collapsible-title="Jumlah karyawan">'+safe(item.jumlahkaryawanklinik)+'</td>'+
						'<td data-collapsible-title="Manajer klinik">'+safe(item.manajerklinik)+'</td>'+
						'<td data-collapsible-title="PIC klinik (dari BSMI Cabang)"><a class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(data))+'">'+safe(data[4])+'</a></td>'+
						'<td data-collapsible-title=""><a class="button button-fill update" data-idx="'+i+'">Update</a></td>'+
					'</tr>'
	}
	klinikhtml += '</tbody></table></div>'
	
	$$('.mybsmi-admincabang-klinikdata').html(klinikhtml)

	$$('.mybsmi-admincabang-klinikdata .klinik a.mybsmi-adminaction').on('click', function (e) {
			var base64 = this.attributes["data-user"].value;
			fpageadminidentitas(base64)
	});
	
	$$('.mybsmi-admincabang-klinikdata .klinik a.update').on('click', function (e) {
		var idx = this.attributes["data-idx"].value;
		fpageadmincabangklinikupdate(datacabang,datarelawan,klinik,idx)
	});
}

function fpageadmincabangklinikupdate(datacabang,datarelawan,klinik,idx){
	
  var dialog = app.dialog.create({
    title: 'Update klinik',
    content:'',
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        
      }
    },
    buttons: [
      {
        text: 'Edit',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
              let edit = true
			  fpageadmincabangkliniktambah(datacabang,datarelawan,klinik,idx,edit)
          }
      },
      /*{
        text: 'Delete',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
			let myklinik = klinik
			app.dialog.confirm('Hapus?', 'Konfirmasi', function (){
				console.log('myklinik',myklinik)
				let namacabang = datacabang[0]
				let oldklinik = JSON.parse(myklinik)
				oldklinik.splice(parseInt(idx), 1)
				let klinik = JSON.stringify(oldklinik)
				var datainput = {namacabang,klinik};
				fpageadmincabangkliniksave(datainput,datacabang,datarelawan);
			})              
          }
      },*/
      {
        text: 'Tutup',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

//---bsmr---

function fpageadmincabangbsmrtambah(datacabang,datarelawan,bsmr,idx,edit)
{
  let mybsmr = bsmr
  let title = edit ? 'Edit BSMR' : 'Register BSMR'
  var dialog = app.dialog.create({
    title: title,
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="icon512.png" style="width:150px;height:150px;margin: 10px 10px;border-radius: 0%;object-fit: cover;">'
      +'      <p style="font-weight:bold;">'+safe(datacabang[0])+'</p>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Nomor BSMR</div><div class="item-input-wrap">'
      +'            <input type="text" id="nomorbsmr" name="nomorbsmr" placeholder="*Didapat Setelah Disetujui" value="" disabled>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Nama Sekolah</div><div class="item-input-wrap">'
      +'            <input type="text" id="namasekolah" name="namasekolah" placeholder="Nama Sekolah" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Alamat Sekolah</div><div class="item-input-wrap">'
      +'            <input type="text" id="alamatsekolah" name="alamatsekolah" placeholder="Alamat Sekolah" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Tahun Pendirian BSMR</div><div class="item-input-wrap">'
      +'            <input type="text" id="tahunpendirianbsmr" name="tahunpendirianbsmr" placeholder="Tahun Pendirian BSMR" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Jumlah Anggota BSMR</div><div class="item-input-wrap">'
      +'            <input type="text" id="jumlahanggotabsmr" name="jumlahanggotabsmr" placeholder="Jumlah anggota BSMR" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">PIC BSMR (dari Sekolah)</div><div class="item-input-wrap">'
      +'            <input type="text" id="picbsmr" name="picbsmr" placeholder="Nama/HP" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">PIC BSMR (dari BSMI Cabang)</div><div class="item-input-wrap">'
      +'                            <select id="piccabangid" name="piccabangid">'
      +'                              <option value="" selected> </option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        var select = document.getElementById('piccabangid');
        datarelawan.forEach(function(item,index){
            var opt = document.createElement('option');
            opt.value = item[1];
            opt.innerHTML = item[4]+' ('+item[18]+')';            
            if(userstatusnormal.includes(item[3]))
			{
				select.appendChild(opt);
			}
        });
		
		if(edit){
			let arr = JSON.parse(bsmr)
			let data = arr[parseInt(idx)]
			$$('#namasekolah').val(safe(data.namasekolah))
			$$('#alamatsekolah').val(safe(data.alamatsekolah))
			$$('#nomorbsmr').val(safe(data.nomorbsmr))
			$$('#tahunpendirianbsmr').val(safe(data.tahunpendirianbsmr))
			$$('#jumlahanggotabsmr').val(safe(data.jumlahanggotabsmr))
			$$('#picbsmr').val(safe(data.picbsmr))
			$$('#piccabangid').val(safe(data.piccabangid))
			$$('#namasekolah').attr('disabled','true')
		}
		
      }
    },
    buttons: [
      {
        text: 'Simpan',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
				var tanggalbsmr = new Date()
				var namacabang = datacabang[0];
				var namasekolah = $$('#namasekolah').val();
				var alamatsekolah = $$('#alamatsekolah').val();
				var nomorbsmr = $$('#nomorbsmr').val();
				var tahunpendirianbsmr = $$('#tahunpendirianbsmr').val();
				var jumlahanggotabsmr = $$('#jumlahanggotabsmr').val();
				var picbsmr = $$('#picbsmr').val();
				var piccabangid = $$('#piccabangid').val();
				if(piccabangid == ''){
					var toastBottom = app.toast.create({ text: 'PIC tidak boleh kosong', closeTimeout: 3000,position: 'center', });toastBottom.open();
					return
				}
				
				if(edit){
					var arr = JSON.parse(mybsmr)
					tanggalbsmr = arr[parseInt(idx)].tanggalbsmr
					var aktif = arr[parseInt(idx)].aktif
					arr[parseInt(idx)] = {tanggalbsmr,namacabang,namasekolah,alamatsekolah,nomorbsmr,tahunpendirianbsmr,jumlahanggotabsmr,picbsmr,piccabangid,aktif}
					var bsmr = JSON.stringify(arr)
					var data = {namacabang,bsmr}
					fpageadmincabangbsmrsave(data,datacabang,datarelawan)
				}else{
					var arr = JSON.parse(datacabang[9])
					var aktif = false
					arr.push({tanggalbsmr,namacabang,namasekolah,alamatsekolah,nomorbsmr,tahunpendirianbsmr,jumlahanggotabsmr,picbsmr,piccabangid,aktif})
					var bsmr = JSON.stringify(arr)
					var data = {namacabang,bsmr};
					fpageadmincabangbsmrsave(data,datacabang,datarelawan);
				}
          }
      },
      {
        text: 'Batal',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpageadmincabangbsmrsave(inputdata,datacabang,datarelawan)
{
      //console.log(inputdata);return;
	  inputdata=JSON.stringify(inputdata);
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'admincabangbsmrsave', inputdata}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
			  fpageadmincabangdrawbsmr(content,datacabang,datarelawan)
              var toastBottom = app.toast.create({ text: 'Berhasil', closeTimeout: 3000,position: 'center', });toastBottom.open();
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function fpageadmincabangdrawbsmr(bsmr,datacabang,datarelawan)
{
	datacabang[9] = bsmr
	//window.mybsmiadmindatacabang = datacabang
	$$('.mybsmi-admincabang-bsmrtambah').off('click')
	$$('.mybsmi-admincabang-bsmrtambah').on('click', function () {
		fpageadmincabangbsmrtambah(datacabang,datarelawan)
	})
	
	let bsmrhtml = '<div class="data-table data-table-collapsible data-table-init bsmr"><table><thead><tr><th>Nomor BSMR</th><th>Nama Sekolah</th><th>Alamat Sekolah</th><th>Tahun Pendirian BSMR</th><th>Jumlah Anggota</th><th>PIC BSMR (dari Sekolah)</th><th>PIC BSMR (dari BSMI Cabang)</th><th>Status</th><th></th></tr></thead><tbody>'
	let arr = JSON.parse(bsmr)
	for(let i=0;i<arr.length;i++){
		let item = arr[i]
		let data = datarelawan.find((arr)=>arr[1]==item.piccabangid)
		let status = item.aktif == true ? 'Aktif' : 'Menunggu aktivasi untuk mendapat nomor'
		bsmrhtml += '<tr>'+
						'<td data-collapsible-title="Nomor BSMR">'+safe(item.nomorbsmr)+'</td>'+
						'<td data-collapsible-title="Nama Sekolah">'+safe(item.namasekolah)+'</td>'+
						'<td data-collapsible-title="Alamat Sekolah">'+safe(item.alamatsekolah)+'</td>'+
						'<td data-collapsible-title="Tahun Pendirian BSMR">'+safe(item.tahunpendirianbsmr)+'</td>'+
						'<td data-collapsible-title="Jumlah Anggota">'+safe(item.jumlahanggotabsmr)+'</td>'+
						'<td data-collapsible-title="PIC BSMR (dari Sekolah)">'+safe(item.picbsmr)+'</td>'+
						'<td data-collapsible-title="PIC BSMR (dari BSMI Cabang)"><a class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(data))+'">'+safe(data[4])+'</a></td>'+
						'<td data-collapsible-title="Status">'+safe(status)+'</td>'+
						'<td data-collapsible-title=""><a class="button button-fill update" data-idx="'+i+'">Update</a></td>'+
					'</tr>'
	}
	bsmrhtml += '</tbody></table></div>'
	
	$$('.mybsmi-admincabang-bsmrdata').html(bsmrhtml)

	$$('.mybsmi-admincabang-bsmrdata .bsmr a.mybsmi-adminaction').on('click', function (e) {
			var base64 = this.attributes["data-user"].value;
			fpageadminidentitas(base64)
	});
	
	$$('.mybsmi-admincabang-bsmrdata .bsmr a.update').on('click', function (e) {
		var idx = this.attributes["data-idx"].value;
		fpageadmincabangbsmrupdate(datacabang,datarelawan,bsmr,idx)
	});

	$$('.mybsmi-admincabang-bsmrdata .bsmr a.mybsmi-struktur-delete').on('click', function (e) {
		var idx = this.attributes["data-idx"].value;
		app.dialog.confirm('Hapus item ini?', 'Konfirmasi', function (){
			let namacabang = datacabang[0]
			let oldstruktur = JSON.parse(datacabang[8])
			oldstruktur.splice(parseInt(idx), 1)
			let struktur = JSON.stringify(oldstruktur)
			var datainput = {namacabang,struktur};
			fpageadmincabangstruktursave(datainput,datacabang,datarelawan);
		})
	});
}

function fpageadmincabangbsmrupdate(datacabang,datarelawan,bsmr,idx){
	
  var dialog = app.dialog.create({
    title: 'Update BSMR',
    content:'',
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        
      }
    },
    buttons: [
      {
        text: 'Edit',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
              let edit = true
			  fpageadmincabangbsmrtambah(datacabang,datarelawan,bsmr,idx,edit)
          }
      },
      /*{
        text: 'Delete',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
			let mybsmr = bsmr
			app.dialog.confirm('Hapus?', 'Konfirmasi', function (){
				console.log('mybsmr',mybsmr)
				let namacabang = datacabang[0]
				let oldbsmr = JSON.parse(mybsmr)
				oldbsmr.splice(parseInt(idx), 1)
				let bsmr = JSON.stringify(oldbsmr)
				var datainput = {namacabang,bsmr};
				fpageadmincabangbsmrsave(datainput,datacabang,datarelawan);
			})              
          }
      },*/
      {
        text: 'Tutup',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

//----------------------------------------------------------------------
function fpageadminlaporan(content)
{
	//console.log('kodecabang',kodecabang)
	
	$$('.mybsmi-adminlaporanmenu').show();
	let json = JSON.parse(dashboarddata.user.usermydata);
	
	let datarelawan = content
	
	//-------profil-----

    let datacabang = kodecabang[0]
	let profilhtml = '<div class="data-table"><table><tbody>';
    profilhtml += '<tr><td>Profil</td><td><a href="/cabang/'+safe(datacabang[1])+'">'+safe(datacabang[0])+'</a></td></tr>';
    profilhtml += '<tr><td>Alamat</td><td>'+safe(datacabang[2])+'</td></tr>';
    profilhtml += '<tr><td>Telepon</td><td>'+safe(datacabang[3])+'</td></tr>';
    var ig;if (datacabang[4] != ''){ig = safe(datacabang[4]);}else{ig='';}
    profilhtml += '<tr><td>Instagram</td><td>'+ig+'</td></tr>';
	let ketua = datarelawan.find((arr)=>arr[1]==datacabang[5])
	if(skipuid.includes(datacabang[5]))
	{
		profilhtml += '<tr><td>Ketua</td><td></td></tr>';
	}
	else{
		profilhtml += '<tr><td>Ketua</td><td><a class="ketua" data-user="'+btoa(JSON.stringify(ketua))+'">'+safe(datacabang[6])+'</a></td></tr>';
	}
    profilhtml += '</tbody></table></div>';
    $$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporan-profil').html(profilhtml);
	$$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporan-profil .ketua').on('click', function (e) {
			var base64 = this.attributes["data-user"].value;
			fpageadminidentitas(base64)
	});
	
	//-------struktur-----

	let strukturhtml = '<div class="list struktur">'+
			'<ul>'
	
	let arr = JSON.parse(kodecabang[0][8])
	for(let i=0;i<arr.length;i++)
	{
		let item = arr[i]
		let data = datarelawan.find((arr)=>arr[1]==item.namapengurusid)
		//console.log('data',data)
		let el = ''+
		  '<li>'+
			'<div class="item-content">'+
			  '<div class="item-media"><a class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(data))+'"><img src="https://lh3.googleusercontent.com/d/'+safe(data[13])+'" style="width:1.5em;aspect-ratio:1/1;object-fit:cover;border-radius:50% 50%;overflow:hidden;"></a></div>'+
			  '<div class="item-inner">'+
				'<div class="item-title"><a class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(data))+'">'+safe(data[4])+'</a> <span style="font-size:10px;">('+safe(data[18])+')</span></div>'+
				'<div class="item-after"><a class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(data))+'">'+safe(item.jabatanpengurus)+'</a></div>'+
			  '</div>'+
			'</div>'+
		  '</li>'
		  
		 strukturhtml += el
	}
	
	strukturhtml += '</ul></div>'	  
	$$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporan-struktur').html(strukturhtml)

	$$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporan-struktur .struktur a.mybsmi-adminaction').on('click', function (e) {
			var base64 = this.attributes["data-user"].value;
			fpageadminidentitas(base64)
	});
	
	//-------status-----
	
	let statushtml = '<div class="data-table data-table-collapsible data-table-init"><table><thead><tr><th>Cabang</th><th>Ketua</th><th>Pengurus</th><th>Anggota</th><th>BSMR</th><th>Klinik</th><th></th></tr></thead><tbody>'
	
	let totalanggota = new Map()

	content.forEach((anggota)=>{
		if(!skipuid.includes(anggota[1]) && userstatusnormal.includes(anggota[3])){
			if(totalanggota.has(anggota[11])){
				let value = totalanggota.get(anggota[11])
				value++
				totalanggota.set(anggota[11],value)
			}else{
				totalanggota.set(anggota[11],1)
			}
		}
	})
	
	let totalanggotabsmi = 0
	let totalbsmr = 0
	let totalklinik = 0
	
	kodecabang.forEach((cabang)=>{
		
			let jabatan = JSON.parse(cabang[8])
			let bsmr = JSON.parse(cabang[9]);bsmr = bsmr.filter((item)=>item.aktif == true)
			let klinik = JSON.parse(cabang[10])
			let anggota = totalanggota.has(cabang[0]) ? totalanggota.get(cabang[0]) : 0
			totalanggotabsmi += anggota
			totalbsmr += bsmr.length
			totalklinik += klinik.length
			let ketua = datarelawan.find((arr)=>arr[1]==cabang[5])
			if(skipuid.includes(cabang[5])){
				var ketuatd = '<td data-collapsible-title="Ketua"></td>'
			}else{
				var ketuatd = '<td data-collapsible-title="Ketua"><a class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(ketua))+'">'+safe(cabang[6])+'</a></td>'
			}
			if((cabang[0] !== 'BSMI Jawa Timur' && !isLocal)||isLocal){
				statushtml += 	'<tr>'+
									'<td data-collapsible-title="Cabang"><a href="/cabang/'+safe(cabang[1])+'">'+safe(cabang[0])+'</a></td>'+
									ketuatd+
									'<td data-collapsible-title="Pengurus">'+jabatan.length+'</td>'+
									'<td data-collapsible-title="Anggota">'+anggota+'</td>'+
									'<td data-collapsible-title="BSMR">'+bsmr.length+'</td>'+
									'<td data-collapsible-title="Klinik">'+klinik.length+'</td>'+
									'<td data-collapsible-title=""><a class="button button-fill mybsmi-statuscabang" data-cabang="'+safe(cabang[0])+'">Detail</a></td>'+
								'</tr>'
			}
	})
	
	statushtml += 	'<tr><td data-collapsible-title="">Total</td><td data-collapsible-title=""></td><td data-collapsible-title=""></td><td data-collapsible-title="Total Anggota">'+totalanggotabsmi+'</td><td data-collapsible-title="Total BSMR">'+totalbsmr+'</td><td data-collapsible-title="Total Klinik">'+totalklinik+'</td><td data-collapsible-title=""></td></tr>'
	
	statushtml += '</tbody></table></div>'
	
	$$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporan-statuscabang').html(statushtml)

	$$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporan-statuscabang a.mybsmi-adminaction').on('click', function (e) {
			var base64 = this.attributes["data-user"].value;
			fpageadminidentitas(base64)
	});

	$$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporan-statuscabang a.mybsmi-statuscabang').on('click', function (e) {
			var cabang = this.attributes["data-cabang"].value;
			fpageadminstatuscabang(cabang,content)
	});
	
	//-------database-----

	let data = '<div class="list"><ul><li class="item-content item-input item-input-outline"><div class="item-inner"><div class="item-title item-label">Pencarian</div><div class="item-input-wrap"><input id="pencarian" type="text" placeholder="katakunci"><span class="input-clear-button"></span></div></div></li></ul></div>'

	data += '<div class="data-table data-table-collapsible data-table-init"><table><thead><tr><th></th><th>Nama</th><th>No. KTA</th><th>Cabang</th><th>Profesi</th><th>Status Keanggotaan</th><th>Jenjang Keanggotaan</th><th></th></tr></thead><tbody>';
	var jumlahrelawan = 0;
	for (i=content.length-1;i>-1;i--)
	{
	  if ((skipuid.includes(content[i][1]))&&(dashboarddata.user.useruid !== '0ONjeb65X5OunuRI6Ap8')){continue;}else{if ((skipuid.includes(content[i][1]))&&(!isLocal)) continue;}
	  
	  if ((content[i][3] === 'Terbatas')||(content[i][3] === 'Terverifikasi')||(content[i][3] === 'Tertolak')){}else{continue;}
	  
	  //if ((json.adminlaporan)&&(json.admincabang)){}else if((json.admincabang) && (content[i][11] !== usercabang)){continue;}
	  
	  let badge = content[i][3] === 'Terverifikasi' ? '<i class="icon f7-icons" style="font-size:12px;color:blue;">checkmark_seal</i>' : '';
	  let statuskeanggotaan = (JSON.parse(content[i][14])).statuskeanggotaan
	  let status = statuskeanggotaan ? statuskeanggotaan.status : '-'
	  let jenjang = statuskeanggotaan ? statuskeanggotaan.jenjang : '-'
	  
	  data += '<tr class="mybsmi-admin-item-'+safe(content[i][1])+'"><td data-collapsible-title=""><img src="avatar.png" style="width:1.5em;aspect-ratio:1/1;object-fit:cover;border-radius:50% 50%;overflow:hidden;"></td><td data-collapsible-title="Nama"><a class="mybsmi-cabang-relawan" data-user="'+safe(content[i][1])+'">'+safe(content[i][4])+'</a> '+badge+'</td><td data-collapsible-title="No. KTA">'+safe(content[i][18])+'</td><td data-collapsible-title="Cabang">'+safe(content[i][11])+'</td><td data-collapsible-title="Profesi">'+safe(content[i][8])+'</td><td data-collapsible-title="Status Keanggotaan">'+safe(status)+'</td><td data-collapsible-title="Jenjang Keanggotaan">'+safe(jenjang)+'</td><td><a class="button button-fill mybsmi-adminaction" data-user="'+btoa(JSON.stringify(content[i]))+'">Detail</a></td></tr>';
	  
	  jumlahrelawan++;
	}
	data += '</tbody></table></div>';
	$$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporandb').html(data);
	$$('.mybsmi-adminlaporanmenu .totalrelawan').html('Total : '+jumlahrelawan);

	for (i=content.length-1;i>-1;i--)
	{
	if(content[i][13]!==''){
		let url = 'https://lh3.googleusercontent.com/d/'+safe(content[i][13]);
		$$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporandb .mybsmi-admin-item-'+safe(content[i][1])+' img').attr('src',url);
	}
	}

	$$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporandb a.mybsmi-adminaction').on('click', function (e) {
		var base64 = this.attributes["data-user"].value;
		fpageadminidentitas(base64)
	});

	$$(".mybsmi-adminlaporanmenu #pencarian").on("input", function() {
	var value = $$(this).val().toLowerCase();
	$$(".mybsmi-adminlaporanmenu .mybsmi-adminlaporandb tr").each(function() {
	  if($$(this).text().toLowerCase().indexOf(value) > -1)
	  {
		  $$(this).show()
	  }else{
		  $$(this).hide()
	  }
	});
	});

  $$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporandb .mybsmi-cabang-relawan').on('click', function (e) {
        let data = this.attributes["data-user"].value;
        let url = "/relawan/"+safe(data);
        //console.log(url);
        app.views.main.router.navigate(url);
  });
  
  //console.log(dashboarddata.user,kodecabang)
  
  let ketuacabang = kodecabang.filter((data)=>data[5]==dashboarddata.user.useruid)
  if(ketuacabang.length > 0){
	  if(ketuacabang[0][0] != 'BSMI Jawa Timur' || isLocal)fpageadminlaporanketuacabang(ketuacabang,content)
  }
  
  fpageadminlaporanadministrasi(content)
}

async function fpageadminstatuscabang(cabang,content)
{
	const res = await fetch("statuscabang.html")      
	var statushtml = await res.text()
	app.views.main.router.navigate({url:"/dynamicLoad/", route:{content:statushtml}});

	$$('.mybsmi-adminlaporanmenu').show();
	let datarelawan = content
	
	let indexcabang = kodecabang.findIndex((arr)=>arr[0]==cabang)

	//-------profil-----

    let datacabang = kodecabang[indexcabang]
	let profilhtml = '<div class="data-table"><table><tbody>';
    profilhtml += '<tr><td>Profil</td><td><a href="/cabang/'+safe(datacabang[1])+'">'+safe(datacabang[0])+'</a></td></tr>';
    profilhtml += '<tr><td>Alamat</td><td>'+safe(datacabang[2])+'</td></tr>';
    profilhtml += '<tr><td>Telepon</td><td>'+safe(datacabang[3])+'</td></tr>';
    var ig;if (datacabang[4] != ''){ig = safe(datacabang[4]);}else{ig='';}
    profilhtml += '<tr><td>Instagram</td><td>'+ig+'</td></tr>';
	let ketua = datarelawan.find((arr)=>arr[1]==datacabang[5])
	if(skipuid.includes(datacabang[5]))
	{
		profilhtml += '<tr><td>Ketua</td><td></td></tr>';
	}else{
		profilhtml += '<tr><td>Ketua</td><td><a class="profil" data-user="'+btoa(JSON.stringify(ketua))+'">'+safe(datacabang[6])+'</a></td></tr>';
	}
	let operator = datarelawan.find((arr)=>{
		let mydata = JSON.parse(arr[14])
		let mycabang = arr[11]
		return mydata.admincabang && (mycabang == cabang)
	})
	let namaoperator = operator ? safe(operator[4]) : ""
	//profilhtml += '<tr><td>Operator</td><td><a class="profil" data-user="'+btoa(JSON.stringify(operator))+'">'+namaoperator+'</a></td></tr>';
    profilhtml += '</tbody></table></div>';
    $$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporan-profil').html(profilhtml);
	$$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporan-profil .profil').on('click', function (e) {
			var base64 = this.attributes["data-user"].value;
			fpageadminidentitas(base64)
	});
	
	//-------struktur-----

	let strukturhtml = '<div class="list struktur">'+
			'<ul>'
	
	let arr = JSON.parse(kodecabang[indexcabang][8])
	
	for(let i=0;i<arr.length;i++)
	{
		let item = arr[i]
		let data = datarelawan.find((arr)=>arr[1]==item.namapengurusid)
		//console.log('data',data)
		let el = ''+
		  '<li>'+
			'<div class="item-content">'+
			  '<div class="item-media"><a class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(data))+'"><img src="https://lh3.googleusercontent.com/d/'+safe(data[13])+'" style="width:1.5em;aspect-ratio:1/1;object-fit:cover;border-radius:50% 50%;overflow:hidden;"></a></div>'+
			  '<div class="item-inner">'+
				'<div class="item-title"><a class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(data))+'">'+safe(data[4])+'</a> <span style="font-size:10px;">('+safe(data[18])+')</span></div>'+
				'<div class="item-after"><a class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(data))+'">'+safe(item.jabatanpengurus)+'</a></div>'+
			  '</div>'+
			'</div>'+
		  '</li>'
		  
		 strukturhtml += el
	}
	
	strukturhtml += '</ul></div>'	  
	$$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporan-struktur').html(strukturhtml)

	$$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporan-struktur .struktur a.mybsmi-adminaction').on('click', function (e) {
			var base64 = this.attributes["data-user"].value;
			fpageadminidentitas(base64)
	});


	//---klinik---
	
	let klinik = kodecabang[indexcabang][10]
	let klinikhtml = '<div class="data-table data-table-collapsible data-table-init klinik"><table><thead><tr><th>Nama klinik</th><th>Alamat klinik</th><th>Layanan klinik</th><th>Tahun Pendirian</th><th>Jumlah karyawan</th><th>Manajer klinik</th><th>PIC klinik (dari BSMI Cabang)</th></tr></thead><tbody>'
	let arrklinik = JSON.parse(klinik)
	for(let i=0;i<arrklinik.length;i++){
		let item = arrklinik[i]
		let data = datarelawan.find((arr)=>arr[1]==item.picklinikid)
		klinikhtml += '<tr>'+
						'<td data-collapsible-title="Nama klinik">'+safe(item.namaklinik)+'</td>'+
						'<td data-collapsible-title="Alamat klinik">'+safe(item.alamatklinik)+'</td>'+
						'<td data-collapsible-title="Layanan klinik">'+safe(item.layananklinik)+'</td>'+
						'<td data-collapsible-title="Tahun Pendirian">'+safe(item.tahunpendirianklinik)+'</td>'+
						'<td data-collapsible-title="Jumlah karyawan">'+safe(item.jumlahkaryawanklinik)+'</td>'+
						'<td data-collapsible-title="Manajer klinik">'+safe(item.manajerklinik)+'</td>'+
						'<td data-collapsible-title="PIC klinik (dari BSMI Cabang)"><a class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(data))+'">'+safe(data[4])+'</a></td>'+
					'</tr>'
	}
	klinikhtml += '</tbody></table></div>'
	
	$$('.mybsmi-adminlaporan-klinikdata').html(klinikhtml)

	$$('.mybsmi-adminlaporan-klinikdata .klinik a.mybsmi-adminaction').on('click', function (e) {
			var base64 = this.attributes["data-user"].value;
			fpageadminidentitas(base64)
	});	
	
	//---bsmr--

	let bsmr = kodecabang[indexcabang][9]
	let bsmrhtml = '<div class="data-table data-table-collapsible data-table-init bsmr"><table><thead><tr><th>Nomor BSMR</th><th>Nama Sekolah</th><th>Alamat Sekolah</th><th>Tahun Pendirian BSMR</th><th>Jumlah Anggota</th><th>PIC BSMR (dari Sekolah)</th><th>PIC BSMR (dari BSMI Cabang)</th></tr></thead><tbody>'
	let arrbsmr = JSON.parse(bsmr);arrbsmr = arrbsmr.filter((item)=>item.aktif == true)
	for(let i=0;i<arrbsmr.length;i++){
		let item = arrbsmr[i]
		let data = datarelawan.find((arr)=>arr[1]==item.piccabangid)
		bsmrhtml += '<tr>'+
						'<td data-collapsible-title="Nomor BSMR">'+safe(item.nomorbsmr)+'</td>'+
						'<td data-collapsible-title="Nama Sekolah">'+safe(item.namasekolah)+'</td>'+
						'<td data-collapsible-title="Alamat Sekolah">'+safe(item.alamatsekolah)+'</td>'+
						'<td data-collapsible-title="Tahun Pendirian BSMR">'+safe(item.tahunpendirianbsmr)+'</td>'+
						'<td data-collapsible-title="Jumlah Anggota">'+safe(item.jumlahanggotabsmr)+'</td>'+
						'<td data-collapsible-title="PIC BSMR (dari Sekolah)">'+safe(item.picbsmr)+'</td>'+
						'<td data-collapsible-title="PIC BSMR (dari BSMI Cabang)"><a class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(data))+'">'+safe(data[4])+'</a></td>'+
					'</tr>'
	}
	bsmrhtml += '</tbody></table></div>'
	
	$$('.mybsmi-adminlaporan-bsmrdata').html(bsmrhtml)

	$$('.mybsmi-adminlaporan-bsmrdata .bsmr a.mybsmi-adminaction').on('click', function (e) {
			var base64 = this.attributes["data-user"].value;
			fpageadminidentitas(base64)
	});
	
	//-------database-----

	let data = '<div class="list"><ul><li class="item-content item-input item-input-outline"><div class="item-inner"><div class="item-title item-label">Pencarian</div><div class="item-input-wrap"><input id="pencarian" type="text" placeholder="katakunci"><span class="input-clear-button"></span></div></div></li></ul></div>'

	data += '<div class="data-table data-table-collapsible data-table-init"><table><thead><tr><th></th><th>Nama</th><th>No. KTA</th><th>Cabang</th><th>Profesi</th><th>Status Keanggotaan</th><th>Jenjang Keanggotaan</th><th></th></tr></thead><tbody>';
	var jumlahrelawan = 0;
	for (i=content.length-1;i>-1;i--)
	{
	  if ((skipuid.includes(content[i][1]))&&(dashboarddata.user.useruid !== '0ONjeb65X5OunuRI6Ap8')){continue;}else{if ((skipuid.includes(content[i][1]))&&(!isLocal)) continue;}
	  
	  if ((content[i][3] === 'Terbatas')||(content[i][3] === 'Terverifikasi')||(content[i][3] === 'Tertolak')){}else{continue;}
	  
	  //if ((json.adminlaporan)&&(json.admincabang)){}else if((json.admincabang) && (content[i][11] !== usercabang)){continue;}
	  if(content[i][11] !== cabang)continue
	  
	  let badge = content[i][3] === 'Terverifikasi' ? '<i class="icon f7-icons" style="font-size:12px;color:blue;">checkmark_seal</i>' : '';
	  let statuskeanggotaan = (JSON.parse(content[i][14])).statuskeanggotaan
	  let status = statuskeanggotaan ? statuskeanggotaan.status : '-'
	  let jenjang = statuskeanggotaan ? statuskeanggotaan.jenjang : '-'
	  
	  data += '<tr class="mybsmi-admin-item-'+safe(content[i][1])+'"><td data-collapsible-title=""><img src="avatar.png" style="width:1.5em;aspect-ratio:1/1;object-fit:cover;border-radius:50% 50%;overflow:hidden;"></td><td data-collapsible-title="Nama"><a class="mybsmi-cabang-relawan" data-user="'+safe(content[i][1])+'">'+safe(content[i][4])+'</a> '+badge+'</td><td data-collapsible-title="No. KTA">'+safe(content[i][18])+'</td><td data-collapsible-title="Cabang">'+safe(content[i][11])+'</td><td data-collapsible-title="Profesi">'+safe(content[i][8])+'</td><td data-collapsible-title="Status Keanggotaan">'+safe(status)+'</td><td data-collapsible-title="Jenjang Keanggotaan">'+safe(jenjang)+'</td><td><a class="button button-fill mybsmi-adminaction" data-user="'+btoa(JSON.stringify(content[i]))+'">Detail</a></td></tr>';
	  
	  jumlahrelawan++;
	}
	data += '</tbody></table></div>';
	$$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporandb').html(data);
	$$('.mybsmi-adminlaporanmenu .totalrelawan').html('Total : '+jumlahrelawan);

	for (i=content.length-1;i>-1;i--)
	{
	if(content[i][13]!==''){
		let url = 'https://lh3.googleusercontent.com/d/'+safe(content[i][13]);
		$$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporandb .mybsmi-admin-item-'+safe(content[i][1])+' img').attr('src',url);
	}
	}

	$$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporandb a.mybsmi-adminaction').on('click', function (e) {
		var base64 = this.attributes["data-user"].value;
		fpageadminidentitas(base64)
	});

	$$(".mybsmi-adminlaporanmenu #pencarian").on("input", function() {
	var value = $$(this).val().toLowerCase();
	$$(".mybsmi-adminlaporanmenu .mybsmi-adminlaporandb tr").each(function() {
	  if($$(this).text().toLowerCase().indexOf(value) > -1)
	  {
		  $$(this).show()
	  }else{
		  $$(this).hide()
	  }
	});
	});

  $$('.mybsmi-adminlaporanmenu .mybsmi-adminlaporandb .mybsmi-cabang-relawan').on('click', function (e) {
        let data = this.attributes["data-user"].value;
        let url = "/relawan/"+safe(data);
        //console.log(url);
        app.views.main.router.navigate(url);
  });

}

//---laporan ketuacabang---
function fpageadminlaporanketuacabang(ketuacabang,content)
{
	$$('.mybsmi-adminlaporanmenu-updateoperatorcabang').show()
	
	let datarelawan = content

    let datacabang = ketuacabang[0]
	let cabang = datacabang[0]
	
	let profilhtml = '<div class="data-table"><table><tbody>';
    profilhtml += '<tr><td>Cabang</td><td><a href="/cabang/'+safe(datacabang[1])+'">'+safe(datacabang[0])+'</a></td></tr>';
	let ketua = datarelawan.find((arr)=>arr[1]==datacabang[5])
	if(skipuid.includes(datacabang[5]))
	{
		profilhtml += '<tr><td>Ketua</td><td></td></tr>';
	}else{
		profilhtml += '<tr><td>Ketua</td><td><a class="profil" data-user="'+btoa(JSON.stringify(ketua))+'">'+safe(datacabang[6])+'</a> (Penanggung Jawab)</td></tr>';
	}
	let operator = datarelawan.find((arr)=>{
		let mydata = JSON.parse(arr[14])
		let mycabang = arr[11]
		return mydata.admincabang && (mycabang == cabang)
	})
	let namaoperator = operator ? safe(operator[4]) : ""
	profilhtml += '<tr><td>Operator</td><td><a class="profil" data-user="'+btoa(JSON.stringify(operator))+'">'+namaoperator+'</a> (Operator MyBSMI BSMI Cabang)</td></tr>';
    profilhtml += '</tbody></table></div>';
    $$('.mybsmi-adminlaporanmenu-updateoperatorcabang .mybsmi-adminlaporan-updateoperatorcabang').html(profilhtml);
	$$('.mybsmi-adminlaporanmenu-updateoperatorcabang .mybsmi-adminlaporan-updateoperatorcabang .profil').on('click', function (e) {
			var base64 = this.attributes["data-user"].value;
			fpageadminidentitas(base64)
	});

	$$('.mybsmi-adminlaporanmenu-updateoperatorcabang .edit-operator-cabang').off('click')
	$$('.mybsmi-adminlaporanmenu-updateoperatorcabang .edit-operator-cabang').on('click', function (e) {
			fpageadminlaporanketuacabanggantiadmin(datacabang,datarelawan)
	});
}

function  fpageadminlaporanketuacabanggantiadmin(datacabang,datarelawan)
{
  var oldadminindex = -1;
  var dialog = app.dialog.create({
    title: 'Ganti Operator',
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="icon512.png" style="width:150px;height:150px;margin: 10px 10px;border-radius: 0%;object-fit: cover;">'
      +'      <p style="font-weight:bold;">'+safe(datacabang[0])+'</p>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Admin Cabang</div><div class="item-input-wrap">'
      +'                            <select id="admincabang" name="admin">'
      +'                              <option value="-1" selected>-</option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        var select = document.getElementById('admincabang');
        datarelawan.forEach(function(item,index){
          let statusincludes = ["Terbatas","Terverifikasi","Tertolak"]
          if (!statusincludes.includes(item[3]))return
          if (!isLocal) {
            if (skipuid.includes(item[1]))return
          }
          //if(item[11] == datacabang[0] || datacabang[0] == "BSMI Jawa Timur")
		  if(item[11] == datacabang[0])
          {
            var opt = document.createElement('option');
            opt.value = index;
            opt.innerHTML = item[4]+' ('+item[18]+')';           
            select.appendChild(opt);
            let json = JSON.parse(item[14]);
            if (json.admincabang)
            {
              select.value = index;
              oldadminindex = index;
            }
          }
        });
      }
    },
    buttons: [
      {
        text: 'Simpan',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
              var newadminindex =  parseInt($$('#admincabang').val());
              var inputdata = {oldadminindex,newadminindex};
              if (oldadminindex != newadminindex)fpageadminlaporanketuacabanggantiadminsave(inputdata);
          }
      },
      {
        text: 'Batal',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpageadminlaporanketuacabanggantiadminsave(inputdata)
{
      inputdata=JSON.stringify(inputdata);console.log(inputdata);
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'mastergantiadmincabang', inputdata}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              console.log(content);
              fpagereload()
              var toastBottom = app.toast.create({ text: 'Berhasil', closeTimeout: 3000,position: 'center', });toastBottom.open();
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

//---administrasi---

function fpageadminlaporanadministrasi(content)
{
	let json = JSON.parse(dashboarddata.user.usermydata);
	if (json.adminlaporanadministrasi){
		if (json.adminlaporanadministrasi == 'nihil')
		{
			
		}else{
			fpageadminlaporanadministrasilist(content,json.adminlaporanadministrasi)
		}
	}
}

function fpageadminlaporanadministrasilist(content,administrasi)
{
	let html = `<div class="col-100 medium-100 mybsmi-adminlaporan-administrasi-header">
				  <div class="card">
					<div class="card-header bg-color-red">ADMINISTRASI</div>

				  </div>
				</div>
				
				<div class="col-100 medium-100 mybsmi-adminlaporan-administrasi-list">
				  <div class="card">
					<div class="card-header">ADMINISTRASI LIST</div>
					<div class="card-content card-content-padding">
						<div class="mybsmi-adminlaporan-administrasi-list-view"><div class="progressbar-infinite"></div></div>
					</div>
					<div class="card-footer"></div>
				  </div>
				</div>
				`
				
	$$('.mybsmi-adminlaporan-administrasi').html(html);
	if(administrasi == 'bsmr')
	{
		fpageadminlaporanadministrasibsmrregistrasi(content)
		fpageadminlaporanadministrasibsmrterdaftar(content)
	}
	else if(administrasi == 'klinik')
	{
		fpageadminlaporanadministrasiklinik(content)
	}
	else if(administrasi == 'sdm')
	{
		fpageadminlaporanadministrasisdm(content)
	}
	else if(administrasi == 'kesekretariatan')
	{
		fpageadminlaporanadministrasikesekretariatan(content)
	}
	else if(administrasi == 'bendahara')
	{
		fpageadminlaporanadministrasibendahara(content)
	}	
}

function fpageadminlaporanadministrasisave(inputdata)
{
      inputdata=JSON.stringify(inputdata);console.log(inputdata);
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'adminlaporanadministrasisave', inputdata}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              console.log(content);
			  fpageadminlaporanadministrasiupdate(content)
              var toastBottom = app.toast.create({ text: 'Berhasil', closeTimeout: 3000,position: 'center', });toastBottom.open();
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function fpageadminlaporanadministrasiupdate(content)
{
	if(content.administrasi == 'bsmr' && content.instruksi == 'aktif')
	{
		kodecabang[content.indexcabang][9] = content.databsmr
		let datarelawan = window.mybsmiadmindata
		fpageadminlaporanadministrasi(datarelawan)
	}
}

//---bsmr---

function fpageadminlaporanadministrasibsmrregistrasi(content)
{
	$$('.mybsmi-adminlaporan-administrasi-header .card-header').text('BSMR JAWA TIMUR')
	$$('.mybsmi-adminlaporan-administrasi-list .card-header').text('PERMINTAAN REGISTRASI GUGUS BSMR')

	let datarelawan = content
	let jumlah = 0
	let bsmrhtml = '<div class="data-table data-table-collapsible data-table-init bsmr"><table><thead><tr><th>Nama Sekolah</th><th>Alamat Sekolah</th><th>Tahun Pendirian BSMR</th><th>Jumlah Anggota</th><th>PIC BSMR (dari Sekolah)</th><th>BSMI Cabang</th><th>PIC BSMR (dari BSMI Cabang)</th><th></th></tr></thead><tbody>'
	for(let j=0;j<kodecabang.length;j++)
	{
		let cabang = kodecabang[j]
		let namacabang = cabang[0]
		let bsmr = cabang[9]
		let arrbsmr = JSON.parse(bsmr)
		for(let i=0;i<arrbsmr.length;i++){
			let item = arrbsmr[i]
			if(item.nomorbsmr != '')continue
			jumlah++
			let data = datarelawan.find((arr)=>arr[1]==item.piccabangid)
			bsmrhtml += '<tr>'+
							'<td data-collapsible-title="Nama Sekolah">'+safe(item.namasekolah)+'</td>'+
							'<td data-collapsible-title="Alamat Sekolah">'+safe(item.alamatsekolah)+'</td>'+
							'<td data-collapsible-title="Tahun Pendirian BSMR">'+safe(item.tahunpendirianbsmr)+'</td>'+
							'<td data-collapsible-title="Jumlah Anggota">'+safe(item.jumlahanggotabsmr)+'</td>'+
							'<td data-collapsible-title="PIC BSMR (dari Sekolah)">'+safe(item.picbsmr)+'</td>'+
							'<td data-collapsible-title="BSMI Cabang">'+safe(namacabang)+'</td>'+
							'<td data-collapsible-title="PIC BSMR (dari BSMI Cabang)"><a class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(data))+'">'+safe(data[4])+'</a></td>'+
							'<td data-collapsible-title=""><a class="button button-fill mybsmi-adminaction-aktif display-none" data-indexcabang="'+j+'" data-indexbsmr="'+i+'">Aktifkan</a></td>'+
						'</tr>'
		}
	}
	bsmrhtml += '</tbody></table></div>'
	
	$$('.mybsmi-adminlaporan-administrasi-list-view').html(bsmrhtml)

	$$('.mybsmi-adminlaporan-administrasi-list-view .bsmr a.mybsmi-adminaction').on('click', function (e) {
			var base64 = this.attributes["data-user"].value;
			fpageadminidentitas(base64)
	});
	
	$$('.mybsmi-adminlaporan-administrasi-list .card-header').append('<span style="font-size:10px;">Jumlah : '+jumlah+'</span>')

	$$('.mybsmi-adminlaporan-administrasi-list-view .bsmr a.mybsmi-adminaction-aktif').on('click', function (e) {
			var indexcabang = this.attributes["data-indexcabang"].value;
			var indexbsmr = this.attributes["data-indexbsmr"].value;
			indexcabang = parseInt(indexcabang)
			indexbsmr = parseInt(indexbsmr)
			let nomorcabang = kodecabang[indexcabang][1]
			let databsmr = JSON.parse(kodecabang[indexcabang][9])
			let bsmrwithnumber = databsmr.filter((item)=>item.nomorbsmr != '')
			let urutan = bsmrwithnumber.length+1
			var inputdata = {administrasi:'bsmr',instruksi:'aktif',indexcabang,nomorcabang,indexbsmr,databsmr,urutan}
			fpageadminlaporanadministrasisave(inputdata)
	});
}

function fpageadminlaporanadministrasibsmrterdaftar(content)
{
	let html = `<div class="col-100 medium-100 mybsmi-adminlaporan-administrasi-terdaftar">
				  <div class="card">
					<div class="card-header">REKAP PENDATAAN GUGUS BSMR</div>
					<div class="card-content card-content-padding">
						<div class="mybsmi-adminlaporan-administrasi-terdaftar-view"><div class="progressbar-infinite"></div></div>
					</div>
					<div class="card-footer"></div>
				  </div>
				</div>
				`
				
	$$('.mybsmi-adminlaporan-administrasi').append(html)

	let datarelawan = content
	let jumlah = 0
	let bsmrhtml = '<div class="data-table data-table-collapsible data-table-init bsmr"><table><thead><tr><th>Nomor BSMR</th><th>Nama Sekolah</th><th>Alamat Sekolah</th><th>Tahun Pendirian BSMR</th><th>Jumlah Anggota</th><th>PIC BSMR (dari Sekolah)</th><th>BSMI Cabang</th><th>PIC BSMR (dari BSMI Cabang)</th></tr></thead><tbody>'
	for(const cabang of kodecabang)
	{
		let namacabang = cabang[0]
		let bsmr = cabang[9]
		let arrbsmr = JSON.parse(bsmr)
		for(let i=0;i<arrbsmr.length;i++){
			let item = arrbsmr[i]
			if(!item.aktif)continue
			jumlah++
			let data = datarelawan.find((arr)=>arr[1]==item.piccabangid)
			bsmrhtml += '<tr>'+
							'<td data-collapsible-title="Nomor BSMR">'+safe(item.nomorbsmr)+'</td>'+
							'<td data-collapsible-title="Nama Sekolah">'+safe(item.namasekolah)+'</td>'+
							'<td data-collapsible-title="Alamat Sekolah">'+safe(item.alamatsekolah)+'</td>'+
							'<td data-collapsible-title="Tahun Pendirian BSMR">'+safe(item.tahunpendirianbsmr)+'</td>'+
							'<td data-collapsible-title="Jumlah Anggota">'+safe(item.jumlahanggotabsmr)+'</td>'+
							'<td data-collapsible-title="PIC BSMR (dari Sekolah)">'+safe(item.picbsmr)+'</td>'+
							'<td data-collapsible-title="BSMI Cabang">'+safe(namacabang)+'</td>'+
							'<td data-collapsible-title="PIC BSMR (dari BSMI Cabang)"><a class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(data))+'">'+safe(data[4])+'</a></td>'+
						'</tr>'
		}
	}
	bsmrhtml += '</tbody></table></div>'
	
	$$('.mybsmi-adminlaporan-administrasi-terdaftar-view').html(bsmrhtml)

	$$('.mybsmi-adminlaporan-administrasi-terdaftar-view .bsmr a.mybsmi-adminaction').on('click', function (e) {
			var base64 = this.attributes["data-user"].value;
			fpageadminidentitas(base64)
	});
	
	$$('.mybsmi-adminlaporan-administrasi-terdaftar .card-header').append('<span style="font-size:10px;">Jumlah : '+jumlah+'</span>')
}

//---klinik----
function fpageadminlaporanadministrasiklinik(content)
{
	$$('.mybsmi-adminlaporan-administrasi-header .card-header').text('ADMINISTRASI KLINIK JAWA TIMUR')
	$$('.mybsmi-adminlaporan-administrasi-list .card-header').text('REKAP PENDATAAN KLINIK AKTIF BSMI')


	let klinikhtml = '<div class="data-table data-table-collapsible data-table-init klinik"><table><thead><tr><th>Nama klinik</th><th>Alamat klinik</th><th>Layanan klinik</th><th>Tahun Pendirian</th><th>Jumlah karyawan</th><th>Manajer klinik</th><th>BSMI Cabang</th><th>PIC klinik (dari BSMI Cabang)</th></tr></thead><tbody>'
	let jumlah = 0;
	
	for(let j=0;j<kodecabang.length;j++)
	{
		let indexcabang = j;
		
		let namacabang = kodecabang[indexcabang][0]
		let klinik = kodecabang[indexcabang][10]

		let arrklinik = JSON.parse(klinik)
		for(let i=0;i<arrklinik.length;i++){
			let item = arrklinik[i]
			jumlah++;
			let data = datarelawan.find((arr)=>arr[1]==item.picklinikid)
			klinikhtml += '<tr>'+
							'<td data-collapsible-title="Nama klinik">'+safe(item.namaklinik)+'</td>'+
							'<td data-collapsible-title="Alamat klinik">'+safe(item.alamatklinik)+'</td>'+
							'<td data-collapsible-title="Layanan klinik">'+safe(item.layananklinik)+'</td>'+
							'<td data-collapsible-title="Tahun Pendirian">'+safe(item.tahunpendirianklinik)+'</td>'+
							'<td data-collapsible-title="Jumlah karyawan">'+safe(item.jumlahkaryawanklinik)+'</td>'+
							'<td data-collapsible-title="Manajer klinik">'+safe(item.manajerklinik)+'</td>'+
							'<td data-collapsible-title="BSMI Cabang">'+safe(namacabang)+'</td>'+
							'<td data-collapsible-title="PIC klinik (dari BSMI Cabang)"><a class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(data))+'">'+safe(data[4])+'</a></td>'+
						'</tr>'
		}
	}
	
	klinikhtml += '</tbody></table></div>'
	
	$$('.mybsmi-adminlaporan-administrasi-list-view').html(klinikhtml)

	$$('.mybsmi-adminlaporan-administrasi-list-view .klinik a.mybsmi-adminaction').on('click', function (e) {
			var base64 = this.attributes["data-user"].value;
			fpageadminidentitas(base64)
	});	
	
	$$('.mybsmi-adminlaporan-administrasi-list .card-header').append('<span style="font-size:10px;">Jumlah : '+jumlah+'</span>')

}

//--sdm--

function fpageadminlaporanadministrasisdm(content)
{
	$$('.mybsmi-adminlaporan-administrasi-header .card-header').text('ADMINISTRASI SDM BSMI JATIM')
	$$('.mybsmi-adminlaporan-administrasi-list .card-header').text('REKAP PENDATAAN ANGGOTA AKTIF BSMI')
	let el = '.mybsmi-adminlaporan-administrasi-list-view'

	let data = '<div class="list"><ul><li class="item-content item-input item-input-outline"><div class="item-inner"><div class="item-title item-label">Pencarian</div><div class="item-input-wrap"><input id="pencarian" type="text" placeholder="katakunci"><span class="input-clear-button"></span></div></div></li></ul></div>'

	data += '<div class="data-table data-table-collapsible data-table-init"><table><thead><tr><th></th><th>Nama</th><th>No. KTA</th><th>Cabang</th><th>Profesi</th><th>Status Keanggotaan</th><th>Jenjang Keanggotaan</th><th></th></tr></thead><tbody>';
	var jumlahrelawan = 0;
	for (i=content.length-1;i>-1;i--)
	{
	  if ((skipuid.includes(content[i][1]))&&(dashboarddata.user.useruid !== '0ONjeb65X5OunuRI6Ap8')){continue;}else{if ((skipuid.includes(content[i][1]))&&(!isLocal)) continue;}
	  
	  if ((content[i][3] === 'Terbatas')||(content[i][3] === 'Terverifikasi')||(content[i][3] === 'Tertolak')){}else{continue;}
	  
	  //if ((json.adminlaporan)&&(json.admincabang)){}else if((json.admincabang) && (content[i][11] !== usercabang)){continue;}
	  
	  let badge = content[i][3] === 'Terverifikasi' ? '<i class="icon f7-icons" style="font-size:12px;color:blue;">checkmark_seal</i>' : '';
	  let statuskeanggotaan = (JSON.parse(content[i][14])).statuskeanggotaan
	  let status = statuskeanggotaan ? statuskeanggotaan.status : '-'
	  let jenjang = statuskeanggotaan ? statuskeanggotaan.jenjang : '-'
	  
	  if(status != 'AKTIF')continue
	  
	  data += '<tr class="mybsmi-admin-item-'+safe(content[i][1])+'"><td data-collapsible-title=""><img src="avatar.png" style="width:1.5em;aspect-ratio:1/1;object-fit:cover;border-radius:50% 50%;overflow:hidden;"></td><td data-collapsible-title="Nama"><a class="mybsmi-cabang-relawan" data-user="'+safe(content[i][1])+'">'+safe(content[i][4])+'</a> '+badge+'</td><td data-collapsible-title="No. KTA">'+safe(content[i][18])+'</td><td data-collapsible-title="Cabang">'+safe(content[i][11])+'</td><td data-collapsible-title="Profesi">'+safe(content[i][8])+'</td><td data-collapsible-title="Status Keanggotaan">'+safe(status)+'</td><td data-collapsible-title="Jenjang Keanggotaan">'+safe(jenjang)+'</td><td><a class="button button-fill mybsmi-adminaction" data-user="'+btoa(JSON.stringify(content[i]))+'">Detail</a></td></tr>';
	  
	  jumlahrelawan++;
	}
	data += '</tbody></table></div>';
	$$(el).html(data);
	$$('.mybsmi-adminlaporan-administrasi-list .card-header').append('<span style="font-size:10px;">Jumlah : '+jumlahrelawan+'</span>')

	for (i=content.length-1;i>-1;i--)
	{
	if(content[i][13]!==''){
		let url = 'https://lh3.googleusercontent.com/d/'+safe(content[i][13]);
		$$(el+' .mybsmi-admin-item-'+safe(content[i][1])+' img').attr('src',url);
	}
	}

	$$(el+' a.mybsmi-adminaction').on('click', function (e) {
		var base64 = this.attributes["data-user"].value;
		fpageadminidentitas(base64)
	});

	$$(el+' #pencarian').on("input", function() {
	var value = $$(this).val().toLowerCase();
	$$(el+' tr').each(function() {
	  if($$(this).text().toLowerCase().indexOf(value) > -1)
	  {
		  $$(this).show()
	  }else{
		  $$(this).hide()
	  }
	});
	});

  $$(el+' .mybsmi-cabang-relawan').on('click', function (e) {
		let data = this.attributes["data-user"].value;
		let url = "/relawan/"+safe(data);
		//console.log(url);
		app.views.main.router.navigate(url);
  });
  
  $$('.mybsmi-adminlaporan-administrasi-list').hide()
  
  fpageadminlaporanadministrasisdmaktif(content)
}

function fpageadminlaporanadministrasisdmaktif(content)
{	
	let sdmaktifhtml = `<div class="col-100 medium-100 mybsmi-adminlaporan-administrasi-sdm-aktif">
				  <div class="card">
					<div class="card-header">REKAP PENDATAAN SDM BSMI</div>
					<div class="card-content card-content-padding">
						<div class="mybsmi-adminlaporan-administrasi-sdm-aktif-list"><div class="progressbar-infinite"></div></div>
					</div>
					<div class="card-footer"></div>
				  </div>
				</div>
				`
				
	$$('.mybsmi-adminlaporan-administrasi').append(sdmaktifhtml)
	
	let datarelawan = content
	
	let sdmhtml = '<div class="data-table data-table-collapsible data-table-init"><table style="table-layout: fixed"><thead><tr><th>Cabang</th><th>Total Anggota</th><th>Anggota Aktif</th><th>Anggota Muda</th><th>Anggota Madya</th><th>Anggota Siaga</th><th></th></tr></thead><tbody></tbody></table></div>'
	
	for(let c=0;c<kodecabang.length;c++)
	{
		let namacabang = kodecabang[c][0]
		let nomorcabang = kodecabang[c][1]
		let anggotacabang = datarelawan.filter((data)=>!skipuid.includes(data[1])&&userstatusnormal.includes(data[3])&&data[11]==namacabang)
		let anggotaaktif = anggotacabang.filter((data)=>{
			let statuskeanggotaan = (JSON.parse(data[14])).statuskeanggotaan
			let status = statuskeanggotaan ? statuskeanggotaan.status : '-'
			return (status=='AKTIF')
		})
		let anggotalain = anggotacabang.filter((data)=>{
			let statuskeanggotaan = (JSON.parse(data[14])).statuskeanggotaan
			let status = statuskeanggotaan ? statuskeanggotaan.status : '-'
			return (status!='AKTIF')
		})
		let anggotamuda = anggotaaktif.filter((data)=>{
			let statuskeanggotaan = (JSON.parse(data[14])).statuskeanggotaan
			let jenjang = statuskeanggotaan ? statuskeanggotaan.jenjang : '-'
			return (jenjang=='ANGGOTA MUDA')
		})
		let anggotamadya = anggotaaktif.filter((data)=>{
			let statuskeanggotaan = (JSON.parse(data[14])).statuskeanggotaan
			let jenjang = statuskeanggotaan ? statuskeanggotaan.jenjang : '-'
			return (jenjang=='ANGGOTA MADYA')
		})
		let anggotasiaga = anggotaaktif.filter((data)=>{
			let statuskeanggotaan = (JSON.parse(data[14])).statuskeanggotaan
			let jenjang = statuskeanggotaan ? statuskeanggotaan.jenjang : '-'
			return (jenjang=='ANGGOTA SIAGA')
		})

		sdmhtml += '<div class="accordion-item"><div class="data-table data-table-collapsible data-table-init"><table style="table-layout: fixed"><tbody><tr>'+
									'<td data-collapsible-title="Cabang"><a href="/cabang/'+safe(nomorcabang)+'">'+safe(namacabang)+'</a></td>'+
									'<td data-collapsible-title="Total Anggota">'+anggotacabang.length+'</td>'+
									'<td data-collapsible-title="Anggota Aktif">'+anggotaaktif.length+'</td>'+
									'<td data-collapsible-title="Anggota Muda">'+anggotamuda.length+'</td>'+
									'<td data-collapsible-title="Anggota Madya">'+anggotamadya.length+'</td>'+
									'<td data-collapsible-title="Anggota Siaga">'+anggotasiaga.length+'</td>'+
									'<td data-collapsible-title=""><div class="accordion-item-toggle"><a class="button button-fill detail">Detail</a></div></td>'+
							'</tr><tbody></tbody></table></div>'
		sdmhtml += '<div class="accordion-item-content">'+
									'<div class="mybsmi-sdmaktif bg-color-red block block-strong block-outline inset">'


		sdmhtml += '<div class="block bg-color-white margin-bottom">ANGGOTA AKTIF</div>'
		
		let aktifhtml= '<div class="data-table data-table-collapsible data-table-init bg-color-white aktif"><table><thead><tr><th></th><th>Nama</th><th>No. KTA</th><th>Cabang</th><th>Profesi</th><th>Status Keanggotaan</th><th>Jenjang Keanggotaan</th><th></th></tr></thead><tbody>';

		for (i=anggotaaktif.length-1;i>-1;i--)
		{ 
		  let badge = anggotaaktif[i][3] === 'Terverifikasi' ? '<i class="icon f7-icons" style="font-size:12px;color:blue;">checkmark_seal</i>' : '';
		  let statuskeanggotaan = (JSON.parse(anggotaaktif[i][14])).statuskeanggotaan
		  let status = statuskeanggotaan ? statuskeanggotaan.status : '-'
		  let jenjang = statuskeanggotaan ? statuskeanggotaan.jenjang : '-'
		  
		  if(status != 'AKTIF')continue
		  
		  aktifhtml += '<tr class="mybsmi-admin-item-'+safe(anggotaaktif[i][1])+'"><td data-collapsible-title=""><img src="https://lh3.googleusercontent.com/d/'+safe(anggotaaktif[i][13])+'" style="width:1.5em;aspect-ratio:1/1;object-fit:cover;border-radius:50% 50%;overflow:hidden;"></td><td data-collapsible-title="Nama"><a class="mybsmi-cabang-relawan" data-user="'+btoa(JSON.stringify(anggotalain[i]))+'">'+safe(anggotaaktif[i][4])+'</a> '+badge+'</td><td data-collapsible-title="No. KTA">'+safe(anggotaaktif[i][18])+'</td><td data-collapsible-title="Cabang">'+safe(anggotaaktif[i][11])+'</td><td data-collapsible-title="Profesi">'+safe(anggotaaktif[i][8])+'</td><td data-collapsible-title="Status Keanggotaan">'+safe(status)+'</td><td data-collapsible-title="Jenjang Keanggotaan">'+safe(jenjang)+'</td><td><a class="button button-fill mybsmi-adminaction" data-user="'+btoa(JSON.stringify(anggotaaktif[i]))+'">Profil</a></td></tr>';
		  
		}
		aktifhtml += '</tbody></table></div>';

		sdmhtml += aktifhtml
		
		sdmhtml += '<div class="block bg-color-white margin-bottom margin-top">ANGGOTA LAINNYA</div>'


		let lainhtml= '<div class="data-table data-table-collapsible data-table-init bg-color-white lain"><table><thead><tr><th></th><th>Nama</th><th>No. KTA</th><th>Cabang</th><th>Profesi</th><th>Status Keanggotaan</th><th>Jenjang Keanggotaan</th><th></th></tr></thead><tbody>';

		for (i=anggotalain.length-1;i>-1;i--)
		{ 
		  let badge = anggotalain[i][3] === 'Terverifikasi' ? '<i class="icon f7-icons" style="font-size:12px;color:blue;">checkmark_seal</i>' : '';
		  let statuskeanggotaan = (JSON.parse(anggotalain[i][14])).statuskeanggotaan
		  let status = statuskeanggotaan ? statuskeanggotaan.status : '-'
		  let jenjang = statuskeanggotaan ? statuskeanggotaan.jenjang : '-'
		  
		  lainhtml += '<tr class="mybsmi-admin-item-'+safe(anggotalain[i][1])+'"><td data-collapsible-title=""><img src="https://lh3.googleusercontent.com/d/'+safe(anggotalain[i][13])+'" style="width:1.5em;aspect-ratio:1/1;object-fit:cover;border-radius:50% 50%;overflow:hidden;"></td><td data-collapsible-title="Nama"><a class="mybsmi-cabang-relawan" data-user="'+btoa(JSON.stringify(anggotalain[i]))+'">'+safe(anggotalain[i][4])+'</a> '+badge+'</td><td data-collapsible-title="No. KTA">'+safe(anggotalain[i][18])+'</td><td data-collapsible-title="Cabang">'+safe(anggotalain[i][11])+'</td><td data-collapsible-title="Profesi">'+safe(anggotalain[i][8])+'</td><td data-collapsible-title="Status Keanggotaan">'+safe(status)+'</td><td data-collapsible-title="Jenjang Keanggotaan">'+safe(jenjang)+'</td><td><a class="button button-fill mybsmi-adminaction" data-user="'+btoa(JSON.stringify(anggotalain[i]))+'">Profil</a></td></tr>';
		  
		}
		lainhtml += '</tbody></table></div>';

		sdmhtml += lainhtml
									
									
		sdmhtml +=		'</div>'+
							'</div>'+
							'</div>'

	}
	
	let sdmhtmlaccordion = '<div class="accordion-item"><div class="accordion-item-toggle"><button class="button"><i class="icon f7-icons">ellipsis_circle</i></button></div><div class="accordion-item-content">'+sdmhtml+'</div></div>'
	
	$$('.mybsmi-adminlaporan-administrasi-sdm-aktif-list').html(sdmhtmlaccordion)


	$$('.mybsmi-adminlaporan-administrasi-sdm-aktif-list .mybsmi-sdmaktif a.mybsmi-adminaction').on('click', function (e) {
		var base64 = this.attributes["data-user"].value;
		fpageadminidentitas(base64)
	});

	$$('.mybsmi-adminlaporan-administrasi-sdm-aktif-list .mybsmi-sdmaktif a.mybsmi-cabang-relawan').on('click', function (e) {
		var base64 = this.attributes["data-user"].value;
		fpageadminidentitas(base64)
	});

	//--action--

	let actionhtml = `<div class="col-100 medium-100 mybsmi-adminlaporan-administrasi-action experiment">
				  <div class="card">
					<div class="card-header">PENDATAAN ANGGOTA TETAP</div>
					<div class="card-content card-content-padding">
						PENDATAAN ANGGOTA TETAP BSMI (ANGGOTA AKTIF/LULUS DIKLAT)
					</div>
					<div class="card-footer"><a class="button button-fill buat-link">BUAT LINK AKTIVASI MYBSMI</a></div>
				  </div>
				</div>
				`
				
	$$('.mybsmi-adminlaporan-administrasi').append(actionhtml)

	$$('.mybsmi-adminlaporan-administrasi-action .buat-link').on('click', function () {
		fbuatlinkaktivasi()
	})
}

//--kesekretariatan--
function fpageadminlaporanadministrasikesekretariatan(content)
{
	$$('.mybsmi-adminlaporan-administrasi-header .card-header').text('ADMINISTRASI KESEKRETARIATAN BSMI JATIM')
	$$('.mybsmi-adminlaporan-administrasi-list .card-header').text('REKAP PENDATAAN ASET BSMI')
	
	let datarelawan = content
	
	let kesekretarianhtml = '<div class="data-table data-table-collapsible data-table-init"><table style="table-layout: fixed"><thead><tr><th>Cabang</th><th>Kantor</th><th>Mobil</th><th>Ambulans</th><th>Lainnya</th><th></th></tr></thead><tbody></tbody></table></div>'
	
	for(let c=0;c<kodecabang.length;c++)
	{
		let namacabang = kodecabang[c][0]
		let nomorcabang = kodecabang[c][1]
		let dataaset = JSON.parse(kodecabang[c][11])
		let kantor = dataaset.filter((data)=>data.jenisaset == 'Kantor')
		let mobil = dataaset.filter((data)=>data.jenisaset == 'Mobil')
		let ambulans = dataaset.filter((data)=>data.jenisaset == 'Ambulans')
		let lainnya = dataaset.filter((data)=>data.jenisaset == 'Lainnya')
		
		kesekretarianhtml += '<div class="accordion-item"><div class="data-table data-table-collapsible data-table-init"><table style="table-layout: fixed"><tbody><tr>'+
									'<td data-collapsible-title="Cabang"><a href="/cabang/'+safe(nomorcabang)+'">'+safe(namacabang)+'</a></td>'+
									'<td data-collapsible-title="Kantor">'+kantor.length+'</td>'+
									'<td data-collapsible-title="Mobil">'+mobil.length+'</td>'+
									'<td data-collapsible-title="Ambulans">'+ambulans.length+'</td>'+
									'<td data-collapsible-title="Lainnya">'+lainnya.length+'</td>'+
									'<td data-collapsible-title=""><div class="accordion-item-toggle"><a class="button button-fill detail">Detail</a></div></td>'+
							'</tr><tbody></tbody></table></div>'
		kesekretarianhtml += '<div class="accordion-item-content">'+
									'<div class="mybsmi-aset bg-color-red block block-strong block-outline inset">'
									
									
		let asethtml = '<div class="data-table data-table-collapsible data-table-init bg-color-white aset"><table><thead><tr><th>Jenis aset</th><th>Nama aset</th><th>Lokasi aset</th><th>Keterangan aset</th><th>Status aset</th><th>Tahun aset</th><th>PIC aset (dari BSMI Cabang)</th></tr></thead><tbody>'
		let arr = dataaset
		for(let i=0;i<arr.length;i++){
			let item = arr[i]
			let data = datarelawan.find((arr)=>arr[1]==item.picasetid)
			asethtml += '<tr>'+
							'<td data-collapsible-title="Jenis aset">'+safe(item.jenisaset)+'</td>'+
							'<td data-collapsible-title="Nama aset">'+safe(item.namaaset)+'</td>'+
							'<td data-collapsible-title="Lokasi aset">'+safe(item.lokasiaset)+'</td>'+
							'<td data-collapsible-title="Keterangan aset">'+safe(item.keteranganaset)+'</td>'+
							'<td data-collapsible-title="Status aset">'+safe(item.statusaset)+'</td>'+
							'<td data-collapsible-title="Tahun aset">'+safe(item.tahunaset)+'</td>'+
							'<td data-collapsible-title="PIC aset (dari BSMI Cabang)"><a class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(data))+'">'+safe(data[4])+'</a></td>'+
						'</tr>'
		}
		asethtml += '</tbody></table></div>'

		kesekretarianhtml += asethtml
									
									
		kesekretarianhtml +=		'</div>'+
							'</div>'+
							'</div>'
	}
	
	let kesekretariatanhtmlaccordion = '<div class="accordion-item"><div class="accordion-item-toggle"><button class="button"><i class="icon f7-icons">ellipsis_circle</i></button></div><div class="accordion-item-content">'+kesekretarianhtml+'</div></div>'
	
	$$('.mybsmi-adminlaporan-administrasi-list-view').html(kesekretariatanhtmlaccordion)

	$$('.mybsmi-adminlaporan-administrasi-list-view .aset a.mybsmi-adminaction').on('click', function (e) {
			var base64 = this.attributes["data-user"].value;
			fpageadminidentitas(base64)
	});
	
	fpageadminlaporanadministrasikesekretariatanaset(content)

}

function fpageadminlaporanadministrasikesekretariatanaset(content)
{
	let html = `<div class="col-100 medium-100 mybsmi-adminlaporan-administrasi-action">
				  <div class="card">
					<div class="card-header">PENDATAAN ASET KHUSUS BSMI JATIM</div>
					<div class="card-content card-content-padding">
						<div class="mybsmi-adminlaporan-administrasi-list-aset"><div class="progressbar-infinite"></div></div>
					</div>
					<div class="card-footer"><a class="button button-fill mybsmi-adminlaporan-administrasi-tambah-aset">Tambah</a></div>
				  </div>
				</div>
				`
				
	$$('.mybsmi-adminlaporan-administrasi').append(html)

	let datacabang = kodecabang[0]
	let aset = datacabang[11]
	let datarelawan = content
	fpageadminlaporanadministrasikesekretariatandrawaset(aset,datacabang,datarelawan)
}

function fpageadminlaporanadministrasikesekretariatanasettambah(datacabang,datarelawan,aset,idx,edit)
{
  let myaset = aset
  let title = edit ? 'Edit aset' : 'Tambah aset'
  var dialog = app.dialog.create({
    title: title,
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="icon512.png" style="width:150px;height:150px;margin: 10px 10px;border-radius: 0%;object-fit: cover;">'
      +'      <p style="font-weight:bold;">'+safe(datacabang[0])+'</p>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Jenis aset</div><div class="item-input-wrap">'
      +'                            <select id="jenisaset" name="jenisaset">'
      +'                              <option value="" selected disabled> </option>'
	  +'                              <option value="Kantor">Kantor</option>'
	  +'                              <option value="Ambulans">Ambulans</option>'
	  +'                              <option value="Mobil">Mobil</option>'
	  +'                              <option value="Lainnya">Lainnya</option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Nama aset</div><div class="item-input-wrap">'
      +'            <input type="text" id="namaaset" name="namaaset" placeholder="Nama aset" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Lokasi aset</div><div class="item-input-wrap">'
      +'            <input type="text" id="lokasiaset" name="lokasiaset" placeholder="Lokasi aset" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Keterangan aset</div><div class="item-input-wrap">'
      +'            <input type="text" id="keteranganaset" name="keteranganaset" placeholder="Kondisi/Nomor/Surat/dll" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Status aset</div><div class="item-input-wrap">'
      +'                            <select id="statusaset" name="statusaset">'
      +'                              <option value="" selected disabled> </option>'
	  +'                              <option value="Milik Sendiri">Milik Sendiri</option>'
	  +'                              <option value="Sewa">Sewa</option>'
	  +'                              <option value="Menumpang">Menumpang</option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Tahun aset</div><div class="item-input-wrap">'
      +'            <input type="text" id="tahunaset" name="tahunaset" placeholder="Tahun aset" value="">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">PIC aset</div><div class="item-input-wrap">'
      +'                            <select id="picasetid" name="picasetid">'
      +'                              <option value="" selected> </option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        var select = document.getElementById('picasetid');
        datarelawan.forEach(function(item,index){
            var opt = document.createElement('option');
            opt.value = item[1];
            opt.innerHTML = item[4]+' ('+item[18]+')';            
            if(userstatusnormal.includes(item[3]))
			{
				select.appendChild(opt);
			}
        });
		
		if(edit){
			let arr = JSON.parse(aset)
			let data = arr[parseInt(idx)]
			$$('#jenisaset').val(safe(data.jenisaset))
			$$('#namaaset').val(safe(data.namaaset))
			$$('#lokasiaset').val(safe(data.lokasiaset))
			$$('#keteranganaset').val(safe(data.keteranganaset))
			$$('#statusaset').val(safe(data.statusaset))
			$$('#tahunaset').val(safe(data.tahunaset))
			$$('#picasetid').val(safe(data.picasetid))
			//$$('#jenisaset').attr('disabled','true')
		}
		
      }
    },
    buttons: [
      {
        text: 'Simpan',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
				
				var namacabang = datacabang[0];
				var jenisaset = $$('#jenisaset').val();
				var namaaset = $$('#namaaset').val();
				var lokasiaset = $$('#lokasiaset').val();
				var keteranganaset = $$('#keteranganaset').val();
				var statusaset = $$('#statusaset').val();
				var tahunaset = $$('#tahunaset').val();
				var picasetid = $$('#picasetid').val();
				if(picasetid == ''){
					var toastBottom = app.toast.create({ text: 'PIC aset tidak boleh kosong', closeTimeout: 3000,position: 'center', });toastBottom.open();
					return
				}
				
				if(edit){
					var arr = JSON.parse(myaset)
					arr[parseInt(idx)] = {namacabang,jenisaset,namaaset,lokasiaset,keteranganaset,statusaset,tahunaset,picasetid}
					var aset = JSON.stringify(arr)
					var data = {namacabang,aset,indexcabang:0,administrasi:'kesekretariatan',instruksi:'update'}
					fpageadminlaporanadministrasikesekretariatanasetsave(data,datacabang,datarelawan)
				}else{
					var arr = JSON.parse(datacabang[11])
					arr.push({namacabang,jenisaset,namaaset,lokasiaset,keteranganaset,statusaset,tahunaset,picasetid})
					var aset = JSON.stringify(arr)
					var data = {namacabang,aset,indexcabang:0,administrasi:'kesekretariatan',instruksi:'update'};
				fpageadminlaporanadministrasikesekretariatanasetsave(data,datacabang,datarelawan);
				}
          }
      },
      {
        text: 'Batal',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpageadminlaporanadministrasikesekretariatanasetsave(inputdata,datacabang,datarelawan)
{
      //console.log(inputdata);return;
	  inputdata=JSON.stringify(inputdata);
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'adminlaporanadministrasisave', inputdata}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
			  fpageadminlaporanadministrasikesekretariatandrawaset(content,datacabang,datarelawan)
              var toastBottom = app.toast.create({ text: 'Berhasil', closeTimeout: 3000,position: 'center', });toastBottom.open();
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function fpageadminlaporanadministrasikesekretariatandrawaset(aset,datacabang,datarelawan)
{
	datacabang[11] = aset
	$$('.mybsmi-adminlaporan-administrasi-tambah-aset').off('click')
	$$('.mybsmi-adminlaporan-administrasi-tambah-aset').on('click', function () {
		fpageadminlaporanadministrasikesekretariatanasettambah(datacabang,datarelawan)
	})
	
	let asethtml = '<div class="data-table data-table-collapsible data-table-init aset"><table><thead><tr><th>Jenis aset</th><th>Nama aset</th><th>Lokasi aset</th><th>Keterangan aset</th><th>Status aset</th><th>Tahun aset</th><th>PIC aset</th><th></th></tr></thead><tbody>'
	let arr = JSON.parse(aset)
	for(let i=0;i<arr.length;i++){
		let item = arr[i]
		let data = datarelawan.find((arr)=>arr[1]==item.picasetid)
		asethtml += '<tr>'+
						'<td data-collapsible-title="Jenis aset">'+safe(item.jenisaset)+'</td>'+
						'<td data-collapsible-title="Nama aset">'+safe(item.namaaset)+'</td>'+
						'<td data-collapsible-title="Lokasi aset">'+safe(item.lokasiaset)+'</td>'+
						'<td data-collapsible-title="Keterangan aset">'+safe(item.keteranganaset)+'</td>'+
						'<td data-collapsible-title="Status aset">'+safe(item.statusaset)+'</td>'+
						'<td data-collapsible-title="Tahun aset">'+safe(item.tahunaset)+'</td>'+
						'<td data-collapsible-title="PIC aset"><a class="mybsmi-adminaction" data-user="'+btoa(JSON.stringify(data))+'">'+safe(data[4])+'</a></td>'+
						'<td data-collapsible-title=""><a class="button button-fill update" data-idx="'+i+'">Update</a></td>'+
					'</tr>'
	}
	asethtml += '</tbody></table></div>'
	
	$$('.mybsmi-adminlaporan-administrasi-list-aset').html(asethtml)

	$$('.mybsmi-adminlaporan-administrasi-list-aset .aset a.mybsmi-adminaction').on('click', function (e) {
			var base64 = this.attributes["data-user"].value;
			fpageadminidentitas(base64)
	});
	
	$$('.mybsmi-adminlaporan-administrasi-list-aset .aset a.update').on('click', function (e) {
		var idx = this.attributes["data-idx"].value;
		fpageadminlaporanadministrasikesekretariatanasetupdate(datacabang,datarelawan,aset,idx)
	});
}

function fpageadminlaporanadministrasikesekretariatanasetupdate(datacabang,datarelawan,aset,idx){
	
  var dialog = app.dialog.create({
    title: 'Update aset',
    content:'',
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        
      }
    },
    buttons: [
      {
        text: 'Edit',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
              let edit = true
			  fpageadminlaporanadministrasikesekretariatanasettambah(datacabang,datarelawan,aset,idx,edit)
          }
      },
      {
        text: 'Delete',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
			let myaset = aset
			app.dialog.confirm('Hapus?', 'Konfirmasi', function (){
				console.log('myaset',myaset)
				let namacabang = datacabang[0]
				let oldaset = JSON.parse(myaset)
				oldaset.splice(parseInt(idx), 1)
				let aset = JSON.stringify(oldaset)
				var datainput = {namacabang,aset,indexcabang:0,administrasi:'kesekretariatan',instruksi:'update'};
				fpageadminlaporanadministrasikesekretariatanasetsave(datainput,datacabang,datarelawan);
			})              
          }
      },
      {
        text: 'Tutup',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

//bendahara
function fpageadminlaporanadministrasibendahara(content){
	$$('.mybsmi-adminlaporan-administrasi-header .card-header').text('KEUANGAN')
	$$('.mybsmi-adminlaporan-administrasi-list .card-header').text('DONASI ONLINE')
	
	let datarelawan = content
	
	let info = 'Panel Donasi Online BSMI JATIM'
	
	$$('.mybsmi-adminlaporan-administrasi-list-view').html(info)
	
	let btn = '<a href="/admindonasi/" class="button button-fill mybsmi-adminlaporan-administrasi-donasionline">Donasi Online</a>'
	
	$$('.mybsmi-adminlaporan-administrasi-list .card-footer').html(btn)
}
///////fpageadmin////////////////////////////////////////////////////////







////////fpagekegiatan/////////////////////////////////////////////////
function fpagekegiatan(run = true)
{
  if (typeof mybsmikegiatandata === 'undefined' || mybsmikegiatandata === null)
  {
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'getkegiatandata'}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
              window.mybsmikegiatandata = content;
              if(run)fpagekegiatanrun(content);
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
  }
  else
  {
    if(run)fpagekegiatanrun(mybsmikegiatandata);
  }
}

function fpagekegiatanrun(content)
{
}
////////fpagekegiatan/////////////////////////////////////////////////






////////fpageadmindonasi/////////////////////////////////////////////////
function fpageadmindonasi(run = true)
{
  if (typeof mybsmiadmindonasidata === 'undefined' || mybsmiadmindonasidata === null)
  {
      let inputdata = JSON.stringify({instruksi:'getdatadonasi'})
	  let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'admindonasi',inputdata}, 
        success: function (data, status, xhr)
          {
            //console.log(data);
			mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
              window.mybsmiadmindonasidata = content;
              if(run)fpageadmindonasirun(content);
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
  }
  else
  {
    if(run)fpageadmindonasirun(mybsmiadmindonasidata);
  }
}

function fpageadmindonasirun(content)
{
	//console.log(content)
	
	let totaldonasi = content.pengaturan[2][1]
	$$('.mybsmi-admindonasi-list-total').html('Rp '+formatRupiah(safe(totaldonasi)))

	let penyalurandonasi = content.pengaturan[3][1]
	$$('.mybsmi-admindonasi-list-penyaluran').html('Rp '+formatRupiah(safe(penyalurandonasi)))	
	
	let sisadonasi = content.pengaturan[4][1]
	$$('.mybsmi-admindonasi-list-sisa').html('Rp '+formatRupiah(safe(sisadonasi)))		
	
	let datainvoice = content.invoice
	
	let html = '<div class="data-table data-table-collapsible data-table-init"><table><thead><tr><th>No</th><th>Donatur</th><th>Donasi</th><th>Program</th><th>Konfirmasi</th><th>Tanggal</th><th>Action</th></tr></thead><tbody>'
	
	let nomor = 0
	for(const invoice of datainvoice)
	{
		if(invoice[1]=='ID')continue
		let now = new Date().getTime()
		let tenggat = new Date(invoice[14]).getTime()
		if(tenggat>now && invoice[15] == '')continue
		nomor++
		let date = new Intl.DateTimeFormat("id-ID", { hour12:false,dateStyle: "short" , timeStyle: "short",  timeZone: "Asia/Jakarta"}).format(new Date(invoice[0]));
		let konfirmasi = ''
		if(invoice[15]=='')
		{
			konfirmasi = '<span style="color:red">Kedaluwarsa</span>'
		}else{
			konfirmasi = '<span style="color:green">Diterima</span>'
		}
		
		//console.log('invoice',invoice)
		html += `
			<tr>
				<td data-collapsible-title="No">${nomor}</td>
				<td data-collapsible-title="Donatur">${safe(invoice[5])}</br><span style="font-size:0.9em;color:grey;"><i class="icons f7-icons" style="font-size:0.9em;">doc_plaintext</i> ${safe(invoice[1])}</span></td>
				<td data-collapsible-title="Donasi">Rp ${formatRupiah(safe(invoice[13]))}</td>
				<td data-collapsible-title="Program">(${safe(invoice[2])}) ${safe(invoice[3])}</td>
				<td data-collapsible-title="Konfirmasi">${konfirmasi}</td>
				<td data-collapsible-title="Tanggal">${date}</td>
				<td data-collapsible-title="Action"><a data-invoiceid="${safe(invoice[1])}" class="button button-fill mybsmi-admindonasi-verifikasi">Verifikasi</a></td>
			</tr>
		`
	}
	
	html += '</tbody></table></div>'
	$$('.mybsmi-admindonasi-list-data').html(html)

	$$('.mybsmi-admindonasi-verifikasi').on('click', function (e) {
			let invoiceid = this.attributes["data-invoiceid"].value
			fpageadmindonasiverifikasi(invoiceid)
	});
	
	$$('.mybsmi-admindonasi-action-data').html('<a class="button button-fill mybsmi-admindonasi-action-data-program">DATA PROGRAM</a>')
	$$('.mybsmi-admindonasi-action-data-program').on('click', function (e) {
			fetch("dynamic.html")
			.then((res)=>res.text())
			.then((data)=>{
				app.views.main.router.navigate({url:"/dynamicLoad/", route:{content:data}})
				fadmindonasiprogram()
			})
	})
	
	let telegram = JSON.parse(content.pengaturan[5][1])
	let indextele = telegram.findIndex((item)=>item.uid==dashboarddata.user.useruid)
	if(indextele > -1)
	{
		let tele = telegram[indextele]
		let msg = 'Akun telegram terhubung : '+tele.first_name+(tele.username?' (@'+tele.username+')':'')
		$$('.mybsmi-admindonasi-list-notifikasi').html(msg)
		$$('.mybsmi-admindonasi-action-notifikasi').html('<a class="button button-fill mybsmi-admindonasi-action-notifikasi-disconnect">Putuskan Telegram</a>')
		$$('.mybsmi-admindonasi-action-notifikasi-disconnect').on('click', function (e) {
			app.dialog.confirm('Putuskan telegram?', 'Konfirmasi', function (){
					let inputdata = JSON.stringify({instruksi:'disconnecttelegram'})
					fpageadmindonasiverifikasirun(inputdata)
			})
		})
	}
	else{
		$$('.mybsmi-admindonasi-list-notifikasi').html('Aktifkan kirim notifikasi ke Telegram ketika donatur melakukan konfirmasi pembayaran donasi')
		$$('.mybsmi-admindonasi-action-notifikasi').html('<a class="button button-fill mybsmi-admindonasi-action-notifikasi-connect">Connect Telegram</a>')
		$$('.mybsmi-admindonasi-action-notifikasi-connect').on('click', function (e) {
				let telegramxapikey = mybsmiadmindonasidata.telegramxapikey
				let urlinfobsmibot = 'https://t.me/infobsmibot?start='+telegramxapikey+'-mybsmi-'+dashboarddata.user.useruid
				window.open(urlinfobsmibot)
		});
	}
}

function formatRupiah(angka, prefix){
	var number_string = angka.replace(/[^,\d]/g, '').toString(),
	split   		= number_string.split(','),
	sisa     		= split[0].length % 3,
	rupiah     		= split[0].substr(0, sisa),
	ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
 
	// tambahkan titik jika yang di input sudah menjadi angka ribuan
	if(ribuan){
		separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}
 
	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}

function fpageadmindonasiverifikasi(invoiceid)
{ 
  let datainvoice = mybsmiadmindonasidata.invoice
  let indexinvoice = datainvoice.findIndex((data)=>data[1]==invoiceid)
  let data = datainvoice[indexinvoice]

	let konfirmasi = ''
	if(data[15]=='')
	{
		konfirmasi = '<span style="color:red">Kedaluwarsa</span>'
	}else{
		konfirmasi = '<span style="color:green">Diterima</span>'
	}
	
	let date = new Intl.DateTimeFormat("id-ID", { hour12:false,dateStyle: "short" , timeStyle: "short",  timeZone: "Asia/Jakarta"}).format(new Date(data[0]));
  
  var dialog = app.dialog.create({
    title: 'Verifikasi',
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;cursor:hand;">'
      +'      <img id="img" src="" style="width:150px;height:150px;margin: 10px 10px;object-fit: cover;">'
      +'      <p style="font-weight:bold;"></p>'
      +'      <div class="data-table" style="width:100%"><table><tbody>'
      +'          <tr><td>Donasi</td><td>Rp '+formatRupiah(safe(data[13]))+'</td></tr>'
	  +'          <tr><td>Metode</td><td>'+safe(data[10])+'</td></tr>'
	  +'          <tr><td>Konfirmasi</td><td>'+konfirmasi+'</td></tr>'
	  +'          <tr><td>Nama</td><td>'+safe(data[5])+'</td></tr>'
      +'          <tr><td>Invoice</td><td>'+safe(data[1])+'</td></tr>'
      +'          <tr><td>Program</td><td>('+safe(data[2])+') '+safe(data[3])+'</td></tr>'
      +'          <tr><td>Tanggal</td><td>'+date+'</td></tr>'
      +'      </tbody></table></div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        let src = "https://lh3.googleusercontent.com/d/"+safe(data[15]);
        $$('#img').attr('src',src);
		if(data[15]!='')
		{
			$$('#img').on('click', function () {
			  myimage(this);
			})	
		}
      }
    },
    buttons: [
       {
        text: 'VALID',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
			  app.dialog.confirm('Valid?', 'Konfirmasi', function (){
					let inputdata = JSON.stringify({instruksi:'verifikasivalid',invoiceid,indexinvoice,data})
					fpageadmindonasiverifikasirun(inputdata)
			  })
          }
      },
       {
        text: 'TIDAK VALID',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
			  app.dialog.confirm('Tidak valid?', 'Konfirmasi', function (){
					let inputdata = JSON.stringify({instruksi:'verifikasiinvalid',invoiceid,indexinvoice,data})
					fpageadmindonasiverifikasirun(inputdata)
			  })
          }
      },	  
      {
        text: 'Tutup',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpageadmindonasiverifikasirun(inputdata)
{
	  let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'admindonasi',inputdata}, 
        success: function (data, status, xhr)
          {
            //console.log(data);
			mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
              fpageadmindonasiverifikasiupdate(content)
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function fpageadmindonasiverifikasiupdate(content)
{
	//console.log('update',content)
	if(content.instruksi == 'verifikasivalid')
	{
		mybsmiadmindonasidata.pengaturan[2][1] = mybsmiadmindonasidata.pengaturan[2][1]+content.data[13]
		mybsmiadmindonasidata.pengaturan[4][1] = mybsmiadmindonasidata.pengaturan[4][1]+content.data[13]
		mybsmiadmindonasidata.invoice.splice(content.indexinvoice, 1)
		//console.log(mybsmiadmindonasidata)
		fpageadmindonasi()
		fpageadmindonasisendemailtodonatur(content)
	}
	if(content.instruksi == 'verifikasiinvalid')
	{
		mybsmiadmindonasidata.invoice.splice(content.indexinvoice, 1)
		fpageadmindonasi()
	}
	if(content.instruksi == 'disconnecttelegram')
	{	
		fpagereload()
	}
	if(content.instruksi == 'getprogram')
	{
		fadmindonasiprogramrun(content.campaign)
	}
	if(content.instruksi == 'penyaluranprogram')
	{
		fadmindonasiprogram()
		mybsmiadmindonasidata.pengaturan[3][1] = mybsmiadmindonasidata.pengaturan[3][1]+content.nominalpenyaluran
		mybsmiadmindonasidata.pengaturan[4][1] = mybsmiadmindonasidata.pengaturan[4][1]-content.nominalpenyaluran		
	}
}

function fpageadmindonasisendemailtodonatur(content)
{
	let xapikey = mybsmiadmindonasidata.emailxapikey
	let emailapiurl = 'https://script.google.com/macros/s/AKfycbzL1-gxqhhaE9LVqINqAdeiXJMQfKyBkdMtLCvHNfW4RAcgEqhI8vFxiRdJJniYLM1r/exec'
	let invoice = content.data
	let judul = `E-Kuitansi ${invoice[1]} - Terima kasih! Donasi Sahabat sudah diterima`
	let date = new Intl.DateTimeFormat("id-ID", { hour12:false,dateStyle: "short" , timeStyle: "short",  timeZone: "Asia/Jakarta"}).format(new Date(invoice[0]));
	let nominal = 'Rp '+formatRupiah(safe(invoice[13]))
	let html = `

      <div style="font-family:'proxima-nova' 'Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;max-width:400px;display:block;margin:0 auto;padding:15px">
			  
			<div style="text-align:center"><img style="margin-right:20px" src="https://blogger.googleusercontent.com/img/a/AVvXsEieo1QmyGGL34qa9mTfvkM4wfDStsRsyA5M4nxWeqpb4gLMc7KlGlqs-8-yIeIxcacPAPVNOhtelgufbRHd_3jdqAOMJldPVn4iyxh-6IG0X2wWw0B1KoWzs84uxg1R61cLj-GM2cnsF36uH1ZgFYJj5457io0FcNvcJKr2mK-o7alZ0wnOUklkHT4y=s16000" height="50px" width="auto"></div>
			<h2 style="padding:0px;text-align:center;margin:0px">E-KUITANSI</h2>
			<h2 style="padding:0px;text-align:center;margin:0px">NO : ${invoice[1]}</h2>
			<h2 style="padding:0px;text-align:center;color:#34a853;margin:0px">TERVERIFIKASI</h2>
			<p>Terima kasih <b>${invoice[5]}</b>, donasi Sahabat sudah diterima dan tercatat di program <b >"${invoice[3]}"</b> dari <b>BSMI JATIM</b>.</p>
			<p style="margin-left:3%;margin-right:3%"></p>	  

			<div style="background-color:#eee"><b>DONATUR</b></div>
			<table style="margin-left:5%" border="0">
			  <tbody>
				<tr>
				  <td>Tanggal</td>
				  <td>${date}</td>
				</tr>
				<tr>
				  <td>Nama</td>
				  <td>${invoice[5]}</td>
				</tr>
				<tr>
				  <td>ID</td>
				  <td>${invoice[1]}</td>
				</tr>
				<tr>
				  <td>Program</td>
				  <td>${invoice[3]}</td>
				</tr>
				<tr>
				  <td>Channel</td>
				  <td>${invoice[10]}</td>
				</tr>
				<tr>
				  <td>Nominal</td>
				  <td>${nominal}</td>
				</tr>
			  </tbody>
			</table>
			
			<p>Semoga Allah SWT melimpahkan pahala dan keberkahan kepada Sahabat dermawan sekeluarga, serta dimudahkan segala urusannya di dunia maupun di akhirat. Amin</p>
			<p>Yuk teruskan rantai kebaikan ini dengan mengajak teman-teman Sahabat ikut berdonasi di <a href="https://donasi.bsmijatim.org">donasi.bsmijatim.org</a></p>

			<div style="text-align:right;margin-right:10%">
			  <p>Diterima oleh,&nbsp;&nbsp;&nbsp;</p>
			  <p>Keuangan BSMI JATIM</p>
			</div>

	  </div>

	`
	let input = JSON.stringify({
		to:invoice[4],
		subject:judul,
		body:html,
		xapikey
	})
	
	let formData = new FormData();
	formData.append('command', 'sendemail');
	formData.append('input', input);

	let mypreloader = app.dialog.preloader()
	fetch(emailapiurl,
		{
			body: formData,
			method: "post"
		})
	.then(function (response) {
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject(response);
		}
	}).then(function (data) {
		console.log(data);
		mypreloader.close()
		if(data.status == 'success'){
			var toastBottom = app.toast.create({ text: 'E-Kuitansi berhasil dikirim', closeTimeout: 3000,position: 'center', });toastBottom.open();
		}else{
			app.dialog.alert("Melampaui limit harian 100 email/hari",'Gagal Mengirim E-Kuitansi');
		}
	}).catch(function (err) {
		console.warn('Something went wrong.', err);
		mypreloader.close()
	});		
}

function fadmindonasiprogram()
{
		$$('.dynamic .navbar .title').html('Program')
		let inputdata = JSON.stringify({instruksi:'getprogram'})
		fpageadmindonasiverifikasirun(inputdata)
}

function fadmindonasiprogramrun(campaign)
{
		let html = `
			<div class="row margin-bottom">
				<div class="col-100">
				  <div class="card">
					<div class="card-header">PROGRAM DONASI</div>
					<div class="card-content card-content-padding mybsmi-admindonasi-list-program">
						<div class="progressbar-infinite"></div>
					</div>
					<div class="card-footer mybsmi-admindonasi-action-program"></div>
				  </div>
				</div>
			</div>		
		`
		$$('.dynamic .page-content').html(html)
		
		let programhtml = '<div class="data-table data-table-collapsible data-table-init"><table style="table-layout: fixed"><thead><tr><th>No</th><th class="display-none">Pembuatan</th><th>Kode</th><th>Program</th><th>Donatur</th><th>Total</th><th>Penyaluran</th><th>Saldo</th><th>Action</th></tr></thead><tbody></tbody></table></div>'
		
		for(let i=0;i<campaign.length;i++)
		{
				if(i==0)continue
				let program = campaign[i]
				let date = new Intl.DateTimeFormat("id-ID", { hour12:false,dateStyle: "short" , timeStyle: "short",  timeZone: "Asia/Jakarta"}).format(new Date(program[0]));
				date = date.split(",")[0]
				programhtml += '<div class="accordion-item"><div class="data-table data-table-collapsible data-table-init"><table style="table-layout: fixed"><tbody><tr>'+
											'<td data-collapsible-title="No">'+i+'</a></td>'+
											'<td class="display-none" data-collapsible-title="Pembuatan">'+safe(date)+'</td>'+
											'<td data-collapsible-title="Kode">'+safe(program[1])+'</td>'+
											'<td data-collapsible-title="Program">'+safe(program[2])+'</td>'+
											'<td data-collapsible-title="Donatur">'+safe(program[5])+'</td>'+
											'<td data-collapsible-title="Total">Rp '+formatRupiah(safe(program[4]))+'</td>'+
											'<td data-collapsible-title="Penyaluran">Rp '+formatRupiah(safe(program[6]))+'</td>'+
											'<td data-collapsible-title="Saldo">Rp '+formatRupiah(safe(program[8]))+'</td>'+
											'<td data-collapsible-title="Action" style="display: flex;align-content: center;align-items: center;justify-content: flex-start;text-align: left;"><a data-index="'+i+'" data-program="'+btoa(JSON.stringify(program))+'" class="button button-fill mybsmi-admindonasi-program-salurkan">Salurkan</a><i class="icon f7-icons accordion-item-toggle">ellipsis_circle</i></td>'+
									'</tr><tbody></tbody></table></div>'
				programhtml += '	<div class="accordion-item-content">'+
										'<div class="mybsmi-admindonasi-program-riwayat bg-color-red block block-strong block-outline inset">'	
										
				let riwayathtml = '<div class="padding bg-color-white">Riwayat Penyaluran</div><div class="data-table data-table-collapsible data-table-init bg-color-white"><table><thead><tr><th>Tanggal</th><th>Nominal</th></tr></thead><tbody>'
				let arr = JSON.parse(program[7])
				for(let i=0;i<arr.length;i++){
					let item = arr[i]
					let date = new Intl.DateTimeFormat("id-ID", { hour12:false,dateStyle: "short" , timeStyle: "short",  timeZone: "Asia/Jakarta"}).format(new Date(item.date));
				date = date.split(",")[0]
					riwayathtml += '<tr>'+
									'<td data-collapsible-title="Tanggal">'+safe(date)+'</td>'+
									'<td data-collapsible-title="Nominal">Rp '+formatRupiah(safe(item.nominal))+'</td>'+
								'</tr>'
				}
				riwayathtml += '</tbody></table></div>'

				programhtml += riwayathtml										
										
										
				programhtml +=			'</div>'+
									'</div>'+
								'</div>'									
		}
		
		let programhtmlaccordion = '<div class="accordion-item"><div class="accordion-item-toggle"><button class="button"><i class="icon f7-icons">ellipsis_circle</i></button></div><div class="accordion-item-content">'+programhtml+'</div></div>'
		
		$$('.mybsmi-admindonasi-list-program').html(programhtml)
		
		$$('.mybsmi-admindonasi-program-salurkan').on('click', function (e) {
				let index = parseInt(this.attributes["data-index"].value)
				let program = JSON.parse(atob(this.attributes["data-program"].value))
				//console.log('program',program)
				fadmindonasiprogrampenyaluran(index,program)
		});		
}

function fadmindonasiprogrampenyaluran(index,program)
{
  var dialog = app.dialog.create({
    title: 'Salurkan Donasi',
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="icon512.png" style="width:150px;height:150px;margin: 10px 10px;border-radius: 0%;object-fit: cover;">'
      +'      <p style="font-weight:bold;">('+safe(program[1])+') '+safe(program[2])+'</p>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Saldo Donasi</div><div class="item-input-wrap">'
      +'            <input type="text" id="saldodonasi" name="saldodonasi" placeholder="Saldo Donasi" value="'+safe(program[8])+'" disabled>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Nominal Penyaluran</div><div class="item-input-wrap">'
      +'            <input type="number" id="nominalpenyaluran" name="nominalpenyaluran" placeholder="Nominal Penyaluran" value="">'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
		
      }
    },
    buttons: [
      {
        text: 'Submit',
        close:false,
        color: 'red',
        onClick: function(dialog, e)
          {
				
				var nominalpenyaluran = parseInt($$('#nominalpenyaluran').val());
				if(nominalpenyaluran == ''){
					var toastBottom = app.toast.create({ text: 'Nominal penyaluran tidak boleh kosong', closeTimeout: 3000,position: 'center', });toastBottom.open();
					return
				}
				if(nominalpenyaluran > program[8]){
					var toastBottom = app.toast.create({ text: 'Nominal penyaluran tidak boleh melebihi saldo', closeTimeout: 3000,position: 'center', });toastBottom.open();
					return
				}
				
				dialog.close()
				
				app.dialog.confirm('Lanjutkan penyaluran?', 'Konfirmasi', function (){
					let inputdata = JSON.stringify({instruksi:'penyaluranprogram',nominalpenyaluran,index,program})
					fpageadmindonasiverifikasirun(inputdata)
				})
				
          }
      },
      {
        text: 'Batal',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}
////////fpageadmindonasi/////////////////////////////////////////////////






///////fpagemaster();///////////////////////////////////////////
function fpagemaster(run = true)
{
  if (typeof mybsmimasterdata === 'undefined' || mybsmimasterdata === null)
  {
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'getmasterdata'}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
              window.mybsmimasterdata = content;
              if(run)fpagemasterrun(content);
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
  }
  else
  {
    if(run)fpagemasterrun(mybsmimasterdata);
  }

  $$('.mybsmi-masterrefresh').on('click', function () {
    mybsmimasterdata = null
    fpagemaster()
  })
}

function fpagemasterrun(content)
{
  fpagemasteradmincabang(content);
  fpagemasteradminlaporan(content);
  fpagemasterdatabase(content);
  fpagemasterpengaturan();
  fpagemasteradministrasi(content)
}

function fpagemasterpengaturan(){
  let html = '<button class="button button-fill master-dokumen">MASTER DOKUMEN</button></br>'+
			'<button class="button button-fill master-program">MASTER PROGRAM</button></br>'+
			'<button class="button button-fill ganti-pin">GANTI PIN AKTIVASI</button></br>'+
			'<button class="button button-fill buat-link">BUAT LINK AKTIVASI</button></br>'+
			'<button class="button button-fill buat-link-full">BUAT LINK AKTIVASI FULL</button></br>'+
			'<button class="button button-fill undang-relawan">UNDANG RELAWAN</button></br>'+
			'<button class="button button-fill donasi-bsmijatimorg">DONASI BSMIJATIM.ORG</button></br>'+
			'<button class="button button-fill musprov4voting20bacalon">musprov4voting20bacalon</button></br>'+
			'<button class="button button-fill musprov4voting20bacalonhasil">musprov4voting20bacalonhasil</button></br>'+
			'<a href="/verifikator/"><button class="button button-fill verifikator">VERIFIKATOR</button></a></br>'
  $$(".mybsmi-master-pengaturan").html(html)
  $$('.ganti-pin').on('click', function () {
        app.dialog.prompt('', 'GANTI PIN AKTIVASI', async function (pin){
          const buf = await crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(pin));
          var pinhash = Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
          fgantipin(pinhash);
        })
  })
  $$('.buat-link').on('click', function () {
		fbuatlinkaktivasi('normal')
  })
  $$('.buat-link-full').on('click', function () {
		fbuatlinkaktivasi('full')
  })
  $$('.master-dokumen').on('click', function () {
        let url = "/masterdokumen/";
        app.views.main.router.navigate(url);
  })
  $$('.master-program').on('click', function () {
			fetch("dynamic.html")
			.then((res)=>res.text())
			.then((data)=>{
				app.views.main.router.navigate({url:"/dynamicLoad/", route:{content:data}})
				fpagemasterprogram()
			})	  
		
  })  
  $$('.undang-relawan').on('click', function () {
		fundangrelawan()
  })
  $$('.donasi-bsmijatimorg').on('click', function () {
		fdonasibsmijatimorg()
  })
  $$('.musprov4voting20bacalon').on('click', function () {
        let url = "/voting/";
        app.views.main.router.navigate(url);
  })
  $$('.musprov4voting20bacalonhasil').on('click', function () {
        let url = "/hasilvoting/";
        app.views.main.router.navigate(url);
  })
}

function fgantipin(pin){
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'masterupdatepin', pin}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              console.log(content); 
              var toastBottom = app.toast.create({ text: 'Berhasil', closeTimeout: 3000,position: 'center', });toastBottom.open();
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function fbuatlinkaktivasi(mode = 'normal'){
			let mypreloader = app.dialog.preloader();
			app.request({
			  url: apidataurl,
			  method: 'GET',
			  cache: false,
			  data : { command: 'getpinaktivasi'}, 
			  success: async function (data, status, xhr)
				{
				  //console.log(data);
				  mypreloader.close();

				  var status = JSON.parse(data).status;
				  var data = JSON.parse(data).data;
				  if (status == "success")
				  {

					let yourDate = new Date()
					const offset = yourDate.getTimezoneOffset()
					yourDate = new Date(yourDate.getTime() - (offset*60*1000))
					let today = yourDate.toISOString().split('T')[0]
					let temp = data+today
					const buf = await crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(temp));
					let tempdata = Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');

					let link = ''
					if(mode == 'normal')link='https://mybsmi.bsmijatim.org/?pin='+tempdata
					if(mode == 'full')link='https://mybsmi.bsmijatim.org/?pin='+tempdata+'&mode=full'
					
					app.dialog.create({
						title: 'Link aktivasi siap',
						buttons: [
						  {
							text: 'Bagikan',
							onClick: function(dialog, e){
								if (navigator.share) {
								  navigator
									.share({
									  title: "Link Aktivasi",
									  //text: "Share",
									  url: link
									})
									.then(() => console.log("thanks for share"))
									.catch(error => app.dialog.alert("Ulangi beberapa saat lagi",'Terjadi Kesalahan'));
								} 								
							}
						  },
						],
						verticalButtons: true,
					}).open();


					
				  }
				  else if (status == "failed")
				  {
					app.dialog.alert(data,'Terjadi Kesalahan');
				  }
				  else
				  {
					app.dialog.alert(data,'Terjadi Kesalahan');
				  }
				},
			  error: function (xhr, status, message)
				{
				  //console.log(message);
				  mypreloader.close();
				  app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
				},
			})
}

function fundangrelawan(){
			let mypreloader = app.dialog.preloader();
			app.request({
			  url: apidataurl,
			  method: 'GET',
			  cache: false,
			  data : { command: 'getpinaktivasi'}, 
			  success: async function (data, status, xhr)
				{
				  //console.log(data);
				  mypreloader.close();

				  var status = JSON.parse(data).status;
				  var data = JSON.parse(data).data;
				  if (status == "success")
				  {

					let yourDate = new Date()
					const offset = yourDate.getTimezoneOffset()
					yourDate = new Date(yourDate.getTime() - (offset*60*1000))
					let today = yourDate.toISOString().split('T')[0]
					let temp = data+today
					const buf = await crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(temp));
					let tempdata = Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');

					let link = 'https://mybsmi.bsmijatim.org/?pin='+tempdata
					
					app.dialog.prompt('', 'ALAMAT EMAIL', async function (email){
						const validateEmail = (email) => {
						  return email.match(
							/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						  );
						}
						if(validateEmail(email)){
							fundangrelawanrun(link,email)
							
						}else{
							app.dialog.alert("Alamat email tidak valid",'Terjadi Kesalahan');
						}
					})


					
				  }
				  else if (status == "failed")
				  {
					app.dialog.alert(data,'Terjadi Kesalahan');
				  }
				  else
				  {
					app.dialog.alert(data,'Terjadi Kesalahan');
				  }
				},
			  error: function (xhr, status, message)
				{
				  //console.log(message);
				  mypreloader.close();
				  app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
				},
			})
}

function fundangrelawanrun(link,email){
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'undangrelawan', link,email}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              console.log(content); 
              var toastBottom = app.toast.create({ text: 'Undangan berhasil dikirim', closeTimeout: 3000,position: 'center', });toastBottom.open();
            }
            else if (status == "failed")
            {
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })	
}

function fpagemasteradmincabang(alluser)
{
  var datacabang = [];

  kodecabang.forEach(function (item,index){
   let data = [item[0],item[1],item[2],item[3],item[4],item[5],item[6],item[7],[],0];
   datacabang.push(data);   
  });
  
  kodecabang.forEach(function(itemcabang,indexcabang){
     alluser.forEach(function(itemuser,indexuser){
        let usercabang = itemuser[11];
        let userdata = itemuser[14];userdata = JSON.parse(userdata);
        let uid = itemuser[1];
        let nama = itemuser[4];
        let photo = itemuser[13];
        if (usercabang == itemcabang[0])
        {
          datacabang[indexcabang][9]++;
          if (userdata.admincabang)
          {

              let data = datacabang[indexcabang][8];
              data.push({uid,nama,photo});
              datacabang[indexcabang][8] = data;
          }
        }
     })
  })
  

  var content = datacabang;
  var data = '<div class="data-table data-table-collapsible data-table-init"><table><thead><tr><th>Cabang</th><th>Alamat</th><th>Telepon</th><th>Instagram</th><th>Ketua</th><th>Admin</th><th>Edit</th></tr></thead><tbody>';
  
  for (i=0;i<content.length-1;i++)
  {   
      let admin = '';
      if (content[i][8] == undefined){admin='';}else{
        //admin=JSON.stringify(content[i][8])
        content[i][8].forEach(function(item,index){
          admin += item.nama+'\n';
        })
      }
      data += '<tr class="mybsmi-master-admincabang-item-'+safe(content[i][1])+'"><td data-collapsible-title="Cabang"><a href="/cabang/'+safe(content[i][1])+'">'+safe(content[i][0])+'</a></td><td data-collapsible-title="Alamat">'+safe(content[i][2])+'</td><td data-collapsible-title="Telepon">'+safe(content[i][3])+'</td><td data-collapsible-title="Instagram">'+safe(content[i][4])+'</td><td data-collapsible-title="Ketua"><a class="mybsmi-master-admincabang-detail" data-user="'+safe(content[i][5])+'">'+safe(content[i][6])+'<a></td><td data-collapsible-title="Admin"><a class="mybsmi-master-admincabang-detail" data-user="'+safe(content[i][8].length==0?'0':content[i][8][0].uid)+'">'+safe(content[i][8].length==0?'':content[i][8][0].nama)+'</a></td><td><a class="button button-fill mybsmi-master-admincabang-action" data-cabang="'+btoa(JSON.stringify(content[i]))+'">Edit</a></td></tr>';
  }
  data += '</tbody></table></div>';
  $$('.mybsmi-master-admincabang').html(data);

  $$('.mybsmi-master-admincabang a.mybsmi-master-admincabang-action').on('click', function (e) {
      //console.log('ok');  
      var base64 = this.attributes["data-cabang"].value;
      let datacabang = JSON.parse(atob(base64));
      fpagemasteradmincabangedit(datacabang,alluser)
  }); 

  $$('.mybsmi-master-admincabang a.mybsmi-master-admincabang-detail').off('click');
  $$('.mybsmi-master-admincabang a.mybsmi-master-admincabang-detail').on('click', function (e) {
      var useruid = this.attributes["data-user"].value;
      alluser.forEach(function(item,index){
        if (item[1] == useruid)
        {
          var base64 = btoa(JSON.stringify(item));
          fpagemasteridentitas(base64,index);
          
        }
      })
  }); 
}



function fpagemasteradmincabangedit(datacabang,datarelawan)
{
  var dialog = app.dialog.create({
    title: 'Edit Cabang',
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="icon512.png" style="width:150px;height:150px;margin: 10px 10px;border-radius: 0%;object-fit: cover;">'
      +'      <p style="font-weight:bold;">'+safe(datacabang[0])+'</p>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Alamat</div><div class="item-input-wrap">'
      +'            <input type="text" id="alamatcabang" name="alamat" placeholder="Alamat" value="'+safe(datacabang[2])+'">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Telepon</div><div class="item-input-wrap">'
      +'            <input type="text" id="teleponcabang" name="telepon" placeholder="Telepon" value="'+safe(datacabang[3])+'"/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Instagram Username</div><div class="item-input-wrap">'
      +'            <input type="text" id="instagramcabang" name="instagram" placeholder="Instagram" value="'+safe(datacabang[4])+'">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Ketua</div><div class="item-input-wrap">'
      +'                            <select id="ketuacabang" name="ketua">'
      +'                              <option value="" selected>-</option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        var select = document.getElementById('ketuacabang');
        datarelawan.forEach(function(item,index){
          let statusincludes = ["Terbatas","Terverifikasi","Tertolak"]
          if (!statusincludes.includes(item[3]))return
          if (!isLocal) {
            if (skipuid.includes(item[1]))return
          }
          if(item[11] == datacabang[0] || datacabang[0] == "BSMI Jawa Timur")
		  //if(item[11] == datacabang[0])
          {
            var opt = document.createElement('option');
            opt.value = item[1];
            opt.innerHTML = item[4]+' ('+item[18]+')';             
            select.appendChild(opt);
            if (item[1] == datacabang[5])
            {
              select.value = item[1];
            }
          }
        });
      }
    },
    buttons: [
      {
        text: 'Simpan',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
                var namacabang = datacabang[0];
                var alamatcabangasli = $$('#alamatcabang').val();
                var teleponcabangasli = $$('#teleponcabang').val();
                var instagramcabangasli = $$('#instagramcabang').val();
                var alamatcabang = "'"+$$('#alamatcabang').val();
                var teleponcabang = "'"+$$('#teleponcabang').val();
                var instagramcabang = "'"+$$('#instagramcabang').val();
                var ketuacabangid = $$('#ketuacabang').val();
                var ketuacabangnama = '',ketuacabangphoto='';
                datarelawan.forEach(function(item,index){
                  if (item[1] == ketuacabangid)
                  {
                    ketuacabangnama = item[4];
                    ketuacabangphoto = item[13];
                  }
                });
                var data = {namacabang,alamatcabangasli,teleponcabangasli,instagramcabangasli,alamatcabang,teleponcabang,instagramcabang,ketuacabangid,ketuacabangnama,ketuacabangphoto};
                fpagemasteradmincabangsave(data);
          }
      },
      {
        text: 'Ganti Admin',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
              fpagemasteradmincabanggantiadmin(datacabang,datarelawan);
          }
      },
      {
        text: 'Batal',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpagemasteradmincabangsave(inputdata)
{
      inputdata=JSON.stringify(inputdata);
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'masterupdateprofilcabang', inputdata}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              console.log(content);
              fpagemasteradmincabangeditupdate(inputdata); 
              var toastBottom = app.toast.create({ text: 'Berhasil', closeTimeout: 3000,position: 'center', });toastBottom.open();
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function fpagemasteradmincabangeditupdate(inputdata)
{
  var inputdata = JSON.parse(inputdata);console.log(inputdata);
  kodecabang.forEach(function(item,index){
    if(item[0] == inputdata.namacabang)
    {
      kodecabang[index][2] = inputdata.alamatcabangasli;
      kodecabang[index][3] = inputdata.teleponcabangasli;
      kodecabang[index][4] = inputdata.instagramcabangasli; 
      kodecabang[index][5] = inputdata.ketuacabangid;
      kodecabang[index][6] = inputdata.ketuacabangnama;
      kodecabang[index][7] = inputdata.ketuacabangphoto;
      fpagemasterrun(mybsmimasterdata);
    }
  })
}

function  fpagemasteradmincabanggantiadmin(datacabang,datarelawan)
{
  var oldadminindex = -1;
  var dialog = app.dialog.create({
    title: 'Ganti Admin',
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="icon512.png" style="width:150px;height:150px;margin: 10px 10px;border-radius: 0%;object-fit: cover;">'
      +'      <p style="font-weight:bold;">'+safe(datacabang[0])+'</p>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Admin Cabang</div><div class="item-input-wrap">'
      +'                            <select id="admincabang" name="admin">'
      +'                              <option value="-1" selected>-</option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        var select = document.getElementById('admincabang');
        datarelawan.forEach(function(item,index){
          let statusincludes = ["Terbatas","Terverifikasi","Tertolak"]
          if (!statusincludes.includes(item[3]))return
          if (!isLocal) {
            if (skipuid.includes(item[1]))return
          }
          //if(item[11] == datacabang[0] || datacabang[0] == "BSMI Jawa Timur")
		  if(item[11] == datacabang[0])
          {
            var opt = document.createElement('option');
            opt.value = index;
            opt.innerHTML = item[4]+' ('+item[18]+')';           
            select.appendChild(opt);
            let json = JSON.parse(item[14]);
            if (json.admincabang)
            {
              select.value = index;
              oldadminindex = index;
            }
          }
        });
      }
    },
    buttons: [
      {
        text: 'Simpan',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
              var newadminindex =  parseInt($$('#admincabang').val());
              var inputdata = {oldadminindex,newadminindex};
              if (oldadminindex != newadminindex)fpagemasteradmincabanggantiadminsave(inputdata);
          }
      },
      {
        text: 'Batal',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpagemasteradmincabanggantiadminsave(inputdata)
{
      inputdata=JSON.stringify(inputdata);console.log(inputdata);
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'mastergantiadmincabang', inputdata}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              console.log(content);
              fpagemasteradmincabanggantiadminupdate(inputdata); 
              var toastBottom = app.toast.create({ text: 'Berhasil', closeTimeout: 3000,position: 'center', });toastBottom.open();
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function fpagemasteradmincabanggantiadminupdate(inputdata)
{
  var inputdata = JSON.parse(inputdata);console.log(inputdata);
  
  if (inputdata.oldadminindex>-1)
  {
    let str = mybsmimasterdata[inputdata.oldadminindex][14];
    let json = JSON.parse(str);
    json.admincabang = false;
    str = JSON.stringify(json);
    mybsmimasterdata[inputdata.oldadminindex][14] = str
  }
  if (inputdata.newadminindex>-1)
  {
    let str = mybsmimasterdata[inputdata.newadminindex][14];
    let json = JSON.parse(str);
    json.admincabang = true;
    str = JSON.stringify(json);
    mybsmimasterdata[inputdata.newadminindex][14] = str
  }
  fpagemasterrun(mybsmimasterdata);
}

//----laporan---

function fpagemasteradminlaporan(content)
{
  var jumlahadminlaporan = 0
  var data = '<div class="data-table data-table-collapsible data-table-init"><table><thead><tr><th>Nama</th><th>Cabang</th><th></th></tr></thead><tbody>';
  for (i=content.length-1;i>-1;i--)
  {
      if ((skipuid.includes(content[i][1]))&&(dashboarddata.user.useruid !== '0ONjeb65X5OunuRI6Ap8')){continue;}else{if ((skipuid.includes(content[i][1]))&&(!isLocal)) continue;}
      
      if ((content[i][3] === 'Terbatas')||(content[i][3] === 'Terverifikasi')||(content[i][3] === 'Tertolak')){}else{continue;}
      
      let json = JSON.parse(content[i][14]);
      
      if (json.adminlaporan){}else{continue;}
      
      data += '<tr class="mybsmi-master-item-'+safe(content[i][1])+'"><td data-collapsible-title="Nama"><a class="mybsmi-masteraction" data-index="'+i+'" data-user="'+btoa(JSON.stringify(content[i]))+'">'+safe(content[i][4])+' ('+safe(content[i][18])+')</a></td><td data-collapsible-title="Cabang">'+safe(content[i][11])+'</td><td><a class="button button-fill mybsmi-masteraction-delete" data-user="'+i+'">DELETE</a></td></tr>';
      jumlahadminlaporan++
  }
  data += '</tbody></table></div>';
  $$('.mybsmi-master-adminlaporan').html(data);
  $$('.jumlahadminlaporan').html('Jumlah : '+jumlahadminlaporan);

  $$('.mybsmi-master-adminlaporan a.mybsmi-masteraction').on('click', function (e) {
        var base64 = this.attributes["data-user"].value;
        var index = this.attributes["data-index"].value;
        fpagemasteridentitas(base64,index)
  });

  $$('.mybsmi-master-adminlaporan a.mybsmi-masteraction-delete').on('click', function (e) {
              var index = this.attributes["data-user"].value;
              index = parseInt(index);
              let inputdata = {"instruksi":"delete",index}
              fpagemasteradminlaporansave(inputdata);
  });
  
}


function fpagemasterdatabase(content)
{console.log(content)
  var htmlpencarian = '<div class="list"><ul><li class="item-content item-input item-input-outline"><div class="item-inner"><div class="item-title item-label">Pencarian</div><div class="item-input-wrap"><input id="pencarian" type="text" placeholder="katakunci"><span class="input-clear-button"></span></div></div></li></ul></div>'
  var data = htmlpencarian+'<div class="data-table data-table-collapsible data-table-init"><table><thead><tr><th></th><th>Nama</th><th>No. KTA</th><th>Status</th><th>Cabang</th><th>Profesi</th><th></th></tr></thead><tbody>';
  var jumlahrelawan = 0;
  for (i=content.length-1;i>-1;i--)
  {
      if ((skipuid.includes(content[i][1]))&&(dashboarddata.user.useruid !== '0ONjeb65X5OunuRI6Ap8')){continue;}else{if ((skipuid.includes(content[i][1]))&&(!isLocal)) continue;}
      
      //if ((content[i][3] === 'Terbatas')||(content[i][3] === 'Terverifikasi')||(content[i][3] === 'Tertolak')){}else{continue;}
      
	  data += '<tr class="mybsmi-master-item-'+safe(content[i][1])+'"><td data-collapsible-title=""><img src="avatar.png" style="width:1.5em;aspect-ratio:1/1;object-fit:cover;border-radius:50% 50%;overflow:hidden;"></td><td data-collapsible-title="Nama"><a class="mybsmi-cabang-relawan" data-user="'+safe(content[i][1])+'">'+safe(content[i][4])+'</a></td><td data-collapsible-title="No. KTA">'+safe(content[i][18])+'</td><td data-collapsible-title="Status">'+safe(content[i][3])+'</td><td data-collapsible-title="Cabang">'+safe(content[i][11])+'</td><td data-collapsible-title="Profesi">'+safe(content[i][8])+'</td><td><a class="button button-fill mybsmi-masteraction" data-index="'+i+'" data-user="'+btoa(JSON.stringify(content[i]))+'">Detail</a></td></tr>';
      jumlahrelawan++;
  }
  data += '</tbody></table></div>';
  $$('.mybsmi-master').html(data);
  $$('.jumlahrelawan').html('Jumlah : '+jumlahrelawan);

  for (i=content.length-1;i>-1;i--)
  {
    if(content[i][13]!==''){
		let url = 'https://lh3.googleusercontent.com/d/'+safe(content[i][13]);
		$$('.mybsmi-master-item-'+safe(content[i][1])+' img').attr('src',url);
	}
  }

  $$('.mybsmi-cabang-relawan').on('click', function (e) {
        let data = this.attributes["data-user"].value;
        let url = "/relawan/"+safe(data);
        //console.log(url);
        app.views.main.router.navigate(url);
  });

  $$('.mybsmi-master a.mybsmi-masteraction').on('click', function (e) {
        
        //app.dialog.confirm('Pembuatan e-KTA memerlukan waktu 2-4 menit.', 'Pemberitahuan', function (){fbuatekta();})
        var base64 = this.attributes["data-user"].value;
        var index = this.attributes["data-index"].value;
        fpagemasteridentitas(base64,index)
  });
  
  $$('.mybsmi-testing').on('click', function (e) {
    //fonesignalprompt();
    window.location.replace('https://mybsmi.bsmijatim.org/#page/pesan/');
    fpagereload();
  });

  $$(".mybsmi-master #pencarian").on("input", function() {
    var value = $$(this).val().toLowerCase();
    $$(".mybsmi-master tr").each(function() {
	  if($$(this).text().toLowerCase().indexOf(value) > -1)
	  {
		  $$(this).show()
	  }else{
		  $$(this).hide()
	  }
    });
  });

}

function fpagemasteridentitas(base64,index)
{
  var data = atob(base64);data = JSON.parse(data);
  var dialog = app.dialog.create({
    title: 'Data Anggota',
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="" style="width:150px;height:150px;margin: 10px 10px;border-radius: 50%;object-fit: cover;">'
      +'      <p style="font-weight:bold;"></p>'
      +'      <div class="data-table" style="width:100%"><table><tbody>'
      +'          <tr><td>Nama</td><td>'+safe(data[4])+'</td></tr>'
	  +'          <tr><td>No. KTA</td><td>'+safe(data[18])+'</td></tr>'
      +'          <tr><td>Email</td><td>'+safe(data[2])+'</td></tr>'
      +'          <tr><td>Cabang</td><td>'+safe(data[11])+'</td></tr>'
      +'          <tr><td>Jenis Kelamin</td><td>'+safe(data[5])+'</td></tr>'
      +'          <tr><td>Alamat</td><td>'+safe(data[7])+'</td></tr>'
      +'          <tr><td>Profesi</td><td>'+safe(data[8])+'</td></tr>'
      +'          <tr><td>Golongan Darah</td><td>'+safe(data[9])+'</td></tr>'
      +'          <tr><td>No HP</td><td>'+safe(data[10])+'</td></tr>'
      +'          <tr><td>Tahun Bergabung</td><td>'+safe(data[12])+'</td></tr>'
      +'      </tbody></table></div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        let src = "https://lh3.googleusercontent.com/d/"+safe(data[13]);
        $$('#img').attr('src',src);
      }
    },
    buttons: [
      {
        text: 'Edit',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
              index = parseInt(index);
              fpagemastereditanggota(data,index)
          }
      },
      {
        text: 'Tutup',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpagemastereditanggota(data,index){
  var dialog = app.dialog.create({
    title: 'Edit Anggota',
    content:''+safe(data[4])+'</br>'+safe(data[18])+'',
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        
      }
    },
    buttons: [
      {
        text: 'Tambah Admin Laporan',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
              let inputdata = {"instruksi":"add",index}
              fpagemasteradminlaporansave(inputdata);
          }
      },
      {
        text: 'Ganti Status',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
              fpagemasterchangestatus(data,index);
          }
      },
      {
        text: 'Mutasi Anggota',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
              fpagemastermutasianggota(data,index);
          }
      },
      {
        text: 'Tutup',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpagemasteradminlaporansave(inputdata)
{
      inputdata=JSON.stringify(inputdata);console.log(inputdata);
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'masteradminlaporanupdate', inputdata}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              console.log(content);
              fpagemasteradminlaporanupdate(inputdata); 
              var toastBottom = app.toast.create({ text: 'Berhasil', closeTimeout: 3000,position: 'center', });toastBottom.open();
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function fpagemasteradminlaporanupdate(inputdata)
{
  var inputdata = JSON.parse(inputdata);console.log(inputdata);
  
  if (inputdata.instruksi == 'delete')
  {
    let str = mybsmimasterdata[inputdata.index][14];
    let json = JSON.parse(str);
    json.adminlaporan = false;
	if(inputdata.administrasi)
	{
		json.adminlaporanadministrasi = inputdata.administrasi
	}
    str = JSON.stringify(json);
    mybsmimasterdata[inputdata.index][14] = str;
  }
  if (inputdata.instruksi == 'add')
  {
    let str = mybsmimasterdata[inputdata.index][14];
    let json = JSON.parse(str);
    json.adminlaporan = true;
	if(inputdata.administrasi)
	{
		json.adminlaporanadministrasi = inputdata.administrasi
	}
    str = JSON.stringify(json);
    mybsmimasterdata[inputdata.index][14] = str;
  }
  fpagemasterrun(mybsmimasterdata);
}

function fdonasibsmijatimorg(){
			let mypreloader = app.dialog.preloader();
			app.request({
			  url: apidataurl,
			  method: 'GET',
			  cache: false,
			  data : { command: 'getkodedonasibsmijatimorg'}, 
			  success: async function (data, status, xhr)
				{
				  //console.log(data);
				  mypreloader.close();

				  var status = JSON.parse(data).status;
				  var data = JSON.parse(data).data;
				  if (status == "success")
				  {

					console.log('data',data)
					if(data[0][0]==='Kode donasi'){
						fdonasibsmijatimorgopen(data[0])
					}
					
				  }
				  else if (status == "failed")
				  {
					app.dialog.alert(data,'Terjadi Kesalahan');
				  }
				  else
				  {
					app.dialog.alert(data,'Terjadi Kesalahan');
				  }
				},
			  error: function (xhr, status, message)
				{
				  //console.log(message);
				  mypreloader.close();
				  app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
				},
			})
}

function fdonasibsmijatimorgopen(data){
  var dialog = app.dialog.create({
    title: 'Kode Donasi',
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      //+'      <img id="img" src="icon512.png" style="width:150px;height:150px;margin: 10px 10px;border-radius: 0%;object-fit: cover;">'
      //+'      <p style="font-weight:bold;">'+safe(datacabang[0])+'</p>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Judul</div><div class="item-input-wrap">'
      +'            <input type="text" id="judul" name="judul" placeholder="Judul" value="'+safe(data[1])+'">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Kode</div><div class="item-input-wrap">'
      +'            <input type="text" id="kode" name="kode" placeholder="Kode" value="'+safe(data[2])+'">'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Expired</div><div class="item-input-wrap">'
      +'            <input type="text" id="expired" name="expired" placeholder="Expired" value="'+safe(data[3])+'" readonly="readonly" class="calendar-input-kodedonasi" required validate>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        var calendar = app.calendar.create({
            inputEl: '.calendar-input-kodedonasi',
            dateFormat: 'm/d/yyyy',
            openIn: 'popover'
        }); 

		let date = new Date(data[3])
		let val = date.toLocaleDateString("en-US")
		console.log('val',val)
		$$('#expired').val(val)
      }
    },
    buttons: [
      {
        text: 'Simpan',
        close:false,
        color: 'red',
        onClick: function(dialog, e)
          {
                var judul = $$('#judul').val();
                var kode = $$('#kode').val();
                var expired = $$('#expired').val();
				if(judul != '' && kode != '' && expired != ''){
					console.log(judul,kode,expired)
					fdonasibsmijatimorgrun(judul,kode,expired)
					dialog.close()
				}
          }
      },
      {
        text: 'Batal',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fdonasibsmijatimorgrun(judul,kode,expired){
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'masterupdatekodedonasi', judul,kode,expired}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              console.log(content); 
              var toastBottom = app.toast.create({ text: 'Berhasil', closeTimeout: 3000,position: 'center', });toastBottom.open();
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function fpagemasterchangestatus(data,index){
  var dialog = app.dialog.create({
    title: 'Ganti Status Anggota',
    content:''+safe(data[4])+'</br>'+safe(data[18])+'',
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        
      }
    },
    buttons: [
      {
        text: 'Terbatas',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
              fpagemastereditanggotasave(index,"status","Terbatas","Terbatas")
          }
      },
      {
        text: 'Terverifikasi',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
              fpagemastereditanggotasave(index,"status","Terverifikasi","Terverifikasi")
          }
      },
      {
        text: 'Tertolak',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
              fpagemastereditanggotasave(index,"status","Tertolak","Tertolak")
          }
      },
      {
        text: 'Terduplikat',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
              fpagemastereditanggotasave(index,"status","Terduplikat","Terduplikat")
          }
      },
      {
        text: 'Tutup',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpagemastereditanggotasave(index,instruksi,judul,isi,keterangan)
{
      let inputdata = JSON.stringify({index,instruksi,judul,isi,keterangan})
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'mastereditanggota', inputdata}, 
        success: function (data, status, xhr)
          {
			console.log(data)
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
              var toastBottom = app.toast.create({ text: 'Berhasil', closeTimeout: 3000,position: 'center', });toastBottom.open();
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function fpagemastermutasianggota(data,index)
{

  var dialog = app.dialog.create({
    title: 'Mutasi Anggota',
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="icon512.png" style="width:150px;height:150px;margin: 10px 10px;border-radius: 0%;object-fit: cover;">'
      +'      <p style="font-weight:bold;">'+safe(data[4])+'</br>'+safe(data[18])+'</p>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Cabang Tujuan</div><div class="item-input-wrap">'
      +'                            <select id="cabangtujuan" name="cabangtujuan">'
      +'                              <option value="" selected>-</option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        var select = document.getElementById('cabangtujuan');
        kodecabang.forEach(function(item,index){
            var opt = document.createElement('option');
            opt.value = item[0];
            opt.innerHTML = item[0];           
            select.appendChild(opt);
        });
      }
    },
    buttons: [
      {
        text: 'Simpan',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
              var cabangtujuan =  $$('#cabangtujuan').val()
			  if(cabangtujuan == '')
			  {
				  var toastBottom = app.toast.create({ text: 'Tidak boleh kosong', closeTimeout: 3000,position: 'center', });toastBottom.open();
				  return
			  }
			  app.dialog.confirm('Mutasi?', 'Konfirmasi', function (){
				fpagemastereditanggotasave(index,"mutasi","pindahcabang",cabangtujuan,data)
			  })
          }
      },
      {
        text: 'Batal',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

//----administrasi---

function fpagemasteradministrasi(content)
{
	$$('.mybsmi-master-adminadministrasi').html("")
	fpagemasteradministrasilist(content,"kesekretariatan")
	fpagemasteradministrasilist(content,"sdm")
	fpagemasteradministrasilist(content,"bsmr")
	fpagemasteradministrasilist(content,"klinik")
	fpagemasteradministrasilist(content,"bendahara")
}


function fpagemasteradministrasilist(content,administrasi)
{
	let html =  '<div class="col-100 medium-100" >'+
				  '<div class="card">'+
					'<div class="card-header">Admin '+administrasi+'<span style="font-size:10px;" class="mybsmi-master-admin'+administrasi+'-total">Jumlah : 0</span><a class="button button-fill mybsmi-master-admin'+administrasi+'-add" title="Add">Add</a></div>'+
					'<div class="card-content card-content-padding">'+
						'<div class="accordion-item"><div class="accordion-item-toggle"><button class="button">...</button></div><div class="accordion-item-content">'+
							'<div class="mybsmi-master-admin'+administrasi+'-list"><div class="progressbar-infinite"></div></div>'+
						'</div></div>'+
					'</div>'+
					'<div class="card-footer"></div>'+
				  '</div>'+
				'</div>'
	$$('.mybsmi-master-adminadministrasi').append(html)


  var jumlahadmin = 0
  var data = '<div class="data-table data-table-collapsible data-table-init"><table><thead><tr><th>Nama</th><th>Cabang</th><th></th></tr></thead><tbody>';
  for (i=content.length-1;i>-1;i--)
  {
      if ((skipuid.includes(content[i][1]))&&(dashboarddata.user.useruid !== '0ONjeb65X5OunuRI6Ap8')){continue;}else{if ((skipuid.includes(content[i][1]))&&(!isLocal)) continue;}
      
      if ((content[i][3] === 'Terbatas')||(content[i][3] === 'Terverifikasi')||(content[i][3] === 'Tertolak')){}else{continue;}
      
      let json = JSON.parse(content[i][14]);
      
      if (json.adminlaporan && json.adminlaporanadministrasi == administrasi){}else{continue;}
      
      data += '<tr class="mybsmi-master-item-'+safe(content[i][1])+'"><td data-collapsible-title="Nama"><a class="mybsmi-masteraction" data-index="'+i+'" data-user="'+btoa(JSON.stringify(content[i]))+'">'+safe(content[i][4])+' ('+safe(content[i][18])+')</a></td><td data-collapsible-title="Cabang">'+safe(content[i][11])+'</td><td><a class="button button-fill mybsmi-masteraction-delete" data-user="'+i+'">DELETE</a></td></tr>';
      jumlahadmin++
  }
  data += '</tbody></table></div>';
  $$('.mybsmi-master-admin'+administrasi+'-list').html(data);
  $$('.mybsmi-master-admin'+administrasi+'-total').html('Jumlah : '+jumlahadmin);

  $$('.mybsmi-master-admin'+administrasi+'-list a.mybsmi-masteraction').on('click', function (e) {
        var base64 = this.attributes["data-user"].value;
        var index = this.attributes["data-index"].value;
        fpagemasteridentitas(base64,index)
  });

  $$('.mybsmi-master-admin'+administrasi+'-list a.mybsmi-masteraction-delete').on('click', function (e) {
              var index = this.attributes["data-user"].value;
              index = parseInt(index);
              let inputdata = {"instruksi":"delete",index,"administrasi":"nihil"}
              fpagemasteradminlaporansave(inputdata);
  });

  $$('.mybsmi-master-admin'+administrasi+'-add').on('click', function (e) {
        fpagemasteradminadministrasiadd(content,administrasi)     
  });
  
}

function  fpagemasteradminadministrasiadd(content,administrasi)
{
  var oldadminindex = -1;
  var dialog = app.dialog.create({
    title: 'Add Admin '+administrasi,
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="icon512.png" style="width:150px;height:150px;margin: 10px 10px;border-radius: 0%;object-fit: cover;">'
      +'      <p style="font-weight:bold;">'+administrasi+'</p>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Admin</div><div class="item-input-wrap">'
      +'                            <select id="adminadministrasi" name="adminadministrasi">'
      +'                              <option value="-1" selected>-</option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        var select = document.getElementById('adminadministrasi');
		var datarelawan = content
        datarelawan.forEach(function(item,index){
          let statusincludes = ["Terbatas","Terverifikasi","Tertolak"]
          if (!statusincludes.includes(item[3]))return
          if (!isLocal) {
            if (skipuid.includes(item[1]))return
          }
          
			var opt = document.createElement('option');
			opt.value = index;
			opt.innerHTML = item[4]+' ('+item[18]+')';           
			select.appendChild(opt);

          
        });
      }
    },
    buttons: [
      {
        text: 'Simpan',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
              var index =  parseInt($$('#adminadministrasi').val());
              let inputdata = {"instruksi":"add",index,"administrasi":administrasi}
			  fpagemasteradminlaporansave(inputdata);
          }
      },
      {
        text: 'Batal',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpagemastercommandrun(inputdata)
{
	  let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'mastercommand',inputdata}, 
        success: function (data, status, xhr)
          {
            //console.log(data);
			mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
              fpagemastercommandupdate(content)
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function fpagemastercommandupdate(content)
{
		let instruksi = content.instruksi
		if(instruksi == 'getprogram')
		{
			fpagemasterprogramrun(content)
		}
		if(instruksi == 'aktifkanprogram')
		{
			fpagemasterprogram()
		}
		if(instruksi == 'buatprogram')
		{
			fpagemasterprogram()
		}
}

///////fpagemaster////////////////////////////////////////////////////////


///////fpagemasterdokumen();///////////////////////////////////////////
function fpagemasterdokumen()
{
  if (typeof mybsmimasterdokumen === 'undefined' || mybsmimasterdokumen === null)
  {
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'getmasterdokumen'}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
              window.mybsmimasterdokumen = content;
              fpagemasterdokumenrun(content);
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
  }
  else
  {
    fpagemasterdokumenrun(mybsmimasterdokumen);
  }
  
  $$('.mybsmi-masterdokumen-addsertifikat').html('<i class="icons f7-icons mybsmi-masterdokumen-addsertifikatbutton">plus_app_fill</i>')

  $$('.mybsmi-masterdokumen-addsertifikatbutton').on('click', function () {
    fpagemasterdokumenaddsertifikat()
  })

  $$('.mybsmi-masterdokumen-refresh').on('click', function () {
    mybsmimasterdokumen = null
    fpagemasterdokumen()
  })

}

function fpagemasterdokumenrefresh()
{
	mybsmimasterdokumen = null
    fpagemasterdokumen()
}

function fpagemasterdokumenaddsertifikat(){
      var dialog = app.dialog.create({
        title: 'Tambah Sertifikat',
		content:''+
          '<div style="width:100%;height:60vh;overflow:auto;">'+
				'<div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'+
					'<form id="tambahdokumen">'+
						'<div class="list no-hairlines-md">'+
							'<ul>'+
								'<li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'+
									'<select name="kategori" required validate>'+
										'<option value="" disabled selected>-- Kategori --</option>'+
										'<option value="Sertifikat">Sertifikat</option>'+
									'</select>'+
								'</div></div></li>'+
								'<li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'+
									'<input type="text" name="kode" placeholder="Kode" required validate/>'+
								'</div></div></li>'+
								'<li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'+
									'<input type="text" name="deskripsi" placeholder="Deskripsi" required validate/>'+
								'</div></div></li>'+
								'<li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'+
									'<input type="text" name="sertifikat" placeholder="Sertifikat" list="sertifikat" required validate/>'+
									'<datalist id="sertifikat">'+
										'<option>Sertifikat</option>'+
										'<option>Piagam Kemanusiaan</option>'+
									'</datalist>'+
								'</div></div></li>'+
								'<li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'+
									'<input type="text" name="background" placeholder="Background" list="background" required validate/>'+
									'<datalist id="background">'+
										'<option>https://nuzulul.github.io/uploads/template-5656464.png</option>'+
										'<option>https://nuzulul.github.io/uploads/back-sertifikat-1600x900-bsmijatim-red.png</option>'+
									'</datalist>'+
								'</div></div></li>'+
								'<li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'+
									'<input type="text" name="judul" placeholder="Judul" list="judul" required validate/>'+
									'<datalist id="judul">'+
										'<option>Penghargaan Setinggi-Tingginya Kepada</option>'+
										'<option>Terima Kasih Kepada</option>'+
									'</datalist>'+
								'</div></div></li>'+
								'<li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'+
									'<input type="text" name="sebagai" placeholder="Sebagai" list="sebagai" required validate/>'+
									'<datalist id="sebagai">'+
										'<option>RELAWAN KEMANUSIAAN</option>'+
										'<option>DONATUR KEMANUSIAAN</option>'+
									'</datalist>'+
								'</div></div></li>'+
								'<li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'+
									'<input type="text" name="keterangan" placeholder="Keterangan" required validate/>'+
								'</div></div></li>'+
								'<li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'+
									'<input type="text" name="pencapaian" placeholder="Tambah Pencapaian" list="pencapaian" required validate/>'+
									'<datalist id="pencapaian">'+
										'<option>TIDAK</option>'+
									'</datalist>'+
								'</div></div></li>'+
							'</ul>'+
						'</div>'+
					'</form>'+
				'</div>'+
          '</div>',
        closeByBackdropClick: false,
        destroyOnClose: true,
        verticalButtons: false,
        on: {
          opened: function () {
            
          }
        },
        buttons: [
          {
            text: 'Nanti Saja',
            close:true,
            color: 'gray',
            onClick: function(dialog, e)
              {

              }
          },
          {
            text: 'Simpan',
            close:false,
            color: 'red',
            onClick: function(dialog, e)
              {
						if (!$$('#tambahdokumen')[0].checkValidity()) {
							//console.log('Check Validity!');
							return;
						} 
						var dataform = app.form.convertToData('#tambahdokumen');
						let kode = ["a"]
						mybsmimasterdokumen.forEach((item,index)=>{
							if(index==0)return
							let json = JSON.parse(item[6])
							kode.push(json.kode.toLowerCase())
						})
						if(kode.includes(dataform.kode.toLowerCase()))
						{
							var toastBottom = app.toast.create({ text: 'Kode sudah digunakan', closeTimeout: 3000,position: 'center', });toastBottom.open();
							return
						}
						fpagemasterdokumenaddrun(dialog,JSON.stringify(dataform));
              }
          },
        ]
      });
      dialog.open();
}

function fpagemasterdokumenaddrun(dialog,inputdata){
	 dialog.close()
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'masterdokumenadd', inputdata}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              fpagemasterdokumenrefresh()
			  var toastBottom = app.toast.create({ text: 'Berhasil', closeTimeout: 3000,position: 'center', });toastBottom.open();
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function fpagemasterdokumenrun(content)
{
		fpagemasterdokumenrunsertifikat(content)
}

function fpagemasterdokumenrunsertifikat(content)
{
	var data = '<div class="data-table data-table-collapsible data-table-init"><table><thead><tr><th>Kode</th><th>Deskripsi</th><th>Sertifikat</th><th>Background</th><th>Judul</th><th>Sebagai</th><th>Keterangan</th><th></th></tr></thead><tbody>'
	for (i=content.length-1;i>-1;i--)
	{
		if (content[i][5] === 'Sertifikat')
		{
			let item = JSON.parse(content[i][6])
			data += '<tr class="mybsmi-masterdokumensertifikat-item-'+safe(content[i][1])+'"><td data-collapsible-title="Kode">'+safe(item.kode)+'</td><td data-collapsible-title="Deskripsi"><a class="mybsmi-masterdokumensertifikat-show" data-index="'+i+'">'+safe(item.deskripsi)+'</a></td><td data-collapsible-title="Sertifikat">'+safe(item.sertifikat)+'</td><td data-collapsible-title="Background">'+safe(item.background)+'</td><td data-collapsible-title="Judul">'+safe(item.judul)+'</td><td data-collapsible-title="Sebagai">'+safe(item.sebagai)+'</td><td data-collapsible-title="Keterangan">'+safe(item.keterangan)+'</td><td><a class="button button-fill mybsmi-masterdokumensertifikat-action" data-index="'+i+'">Add</a></td></tr>'
		}
	
	}
	
	data += '<tr class="mybsmi-masterdokumensertifikat-item-"><td data-collapsible-title="Kode">A</td><td data-collapsible-title="Deskripsi"><a class="mybsmi-masterdokumensertifikat-kode-a" data-index="">Sertifikat Pengangkatan Anggota Muda</a></td><td data-collapsible-title="Sertifikat">Sertifikat</td><td data-collapsible-title="Background">https://nuzulul.github.io/uploads/template-5656464.png</td><td data-collapsible-title="Judul">Surat Keterangan Pengangkatan</td><td data-collapsible-title="Sebagai">ANGGOTA MUDA</td><td data-collapsible-title="Keterangan">Untuk menjalankan tugas-tugas yang diamanahkan oleh Perhimpunan</td><td><a class="button button-fill mybsmi-masterdokumensertifikat-kode-a" data-index="">Detail</a></td></tr>'
	
	data += '</tbody></table></div>'
	$$('.mybsmi-masterdokumen-sertifikat').html(data)

  $$('.mybsmi-masterdokumensertifikat-action').on('click', function (e) {

        var index = this.attributes["data-index"].value;
        fpagemasterdokumenaddrelawan(index,content)
  })

  $$('.mybsmi-masterdokumensertifikat-show').on('click', function (e) {

        var index = this.attributes["data-index"].value;
        fpagemasterdokumenshow(index,content)
  })

  $$('.mybsmi-masterdokumensertifikat-kode-a').on('click', function (e) {

        fpagemasterdokumenkodea()
  })

}

function fpagemasterdokumenkodea()
{
  let mypreloader = app.dialog.preloader()
  fpagedokumen(false)
  function fperiksakesiapan()
  {
      if (typeof mybsmidokumendata === 'undefined' || mybsmidokumendata === null) {
        setTimeout(function(){ fperiksakesiapan(); }, 1000);
        return;
      }
	  mypreloader.close()
      fpagemasterdokumenkodearun(mybsmidokumendata)
  }
  fperiksakesiapan()
}

function fpagemasterdokumenkodearun(mybsmidokumendata)
{
    let hasil = []
    mybsmidokumendata.forEach(function(arr,index){
        let kode = "A"
		let data = CSVToArray(arr.data)
		data = data.filter((sertifikat) => sertifikat[arr.kode] == kode)
        data.forEach(function(ser,idx){
            let nama = ser[3]
            let uid = ser[4]
            let email = ser[5]
            let photo = ser[6]
			let bid = ser[7]
			  if (!isLocal) {
				if (skipuid.includes(uid))return
			  }
            hasil.push({nama,uid,email,photo,bid})
        })
    })
    hasil.sort(function(a, b){return new Date(a.tanggal) - new Date(b.tanggal)});
	let index = 0
	let item = JSON.stringify({kode:"A"})
	let peserta = JSON.stringify(hasil)
	let content = [["","","","","","Sertifikat",item,peserta]]
	fpagemasterdokumenshow(index,content,false)
}

function fpagemasterdokumenshow(index,content,add = true)
{
  let cssclass = ''
  if(!add)cssclass = 'display-none'
  let item = JSON.parse(content[index][6])
  let dokumenid = content[index][1]
  var dialog = app.dialog.create({
    title: 'Lihat '+content[index][5],
    content:''
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;align-items:center;">'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label text-align-left">Relawan</div><div class="item-input-wrap">'
      +'                            <div id="showrelawan"></div>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'  </div>'
      +'</div>',
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function (dialog,e) {
			//console.log('Dialog opened')
			var div = document.getElementById('showrelawan');
			
			let datarelawan = JSON.parse(content[index][7])
			datarelawan.forEach(function(item,index){
				  if (!isLocal) {
					if (skipuid.includes(item.uid))return
				  }
			  
				var child = document.createElement('div');
				child.value = index;
				child.innerHTML = '<button class="button mybsmi-masterdokumensertifikat-showitem" data-index="'+index+'" style="width:auto">'+item.nama+' ('+item.bid+')</button>';            
				div.appendChild(child);
			});
			
			  $$('.mybsmi-masterdokumensertifikat-showitem').on('click', function (e) {
					dialog.close()
					var index = this.attributes["data-index"].value;
					fpagemasterdokumenshowitem(index,datarelawan,item)
			  })
      }
    },
    buttons: [
      {
        text: 'Add',
        close:true,
        color: 'red',
		cssClass: cssclass,
        onClick: function(dialog, e)
          {
              
			  if(add)fpagemasterdokumenaddrelawan(index,content)
          }
      },
      {
        text: 'Batal',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpagemasterdokumenshowitem(index,datarelawan,item)
{
  let mypreloader = app.dialog.preloader()
  fpagedokumen(false)
  function fperiksakesiapan()
  {
      if (typeof mybsmidokumendata === 'undefined' || mybsmidokumendata === null) {
        setTimeout(function(){ fperiksakesiapan(); }, 1000);
        return;
      }
	  mypreloader.close()
      fpagemasterdokumenshowitemrun(index,datarelawan,item,mybsmidokumendata)
  }
  fperiksakesiapan()
}

function fpagemasterdokumenshowitemrun(index,datarelawan,item,mybsmidokumendata)
{
	let uid = datarelawan[index].uid
	let kode = item.kode
    let hasil = []
    mybsmidokumendata.forEach(function(arr,index){
        let data = CSVToArray(arr.data)
		data = data.filter((sertifikat) => sertifikat[arr.uid]==uid && sertifikat[arr.kode] == kode)
        data.forEach(function(ser,idx){
            let tanggal = ser[arr.tanggal]
            let judul = ser[arr.judul]
            let download = ser[arr.download]
            let fileid = ser[arr.fileid]
            hasil.push({tanggal,judul,download,fileid})
        })
    })
    hasil.sort(function(a, b){return new Date(a.tanggal) - new Date(b.tanggal)});
	
	if(hasil.length > 0)
	{
		let item = hasil[0]
		let id = item.fileid
		let url = 'https://drive.google.com/file/d/'+id+'/preview'
		myviewer(url)
	}
}

function fpagemasterdokumenaddrelawan(index,content)
{
  fpagemaster(false)
  function fperiksakesiapan()
  {
      if (typeof mybsmimasterdata === 'undefined' || mybsmimasterdata === null) {
        setTimeout(function(){ fperiksakesiapan(); }, 1000);
        return;
      }

      //fpagemasterdokumenaddrelawanform(index,content,mybsmimasterdata)
	  fpagemasterdokumenaddrelawanmultiform(index,content,mybsmimasterdata)
  }
  fperiksakesiapan()
}

function  fpagemasterdokumenaddrelawanform(index,content,datarelawan)
{
  let item = JSON.parse(content[index][6])
  let dokumenid = content[index][1]
  var dialog = app.dialog.create({
    title: 'Tambah '+content[index][5],
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="icon512.png" style="width:150px;height:150px;margin: 10px 10px;border-radius: 0%;object-fit: cover;">'
      +'      <p style="font-weight:bold;">'+safe(item.deskripsi)+'</p>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Relawan</div><div class="item-input-wrap">'
      +'                            <select id="relawan" name="relawan">'
      +'                              <option value="-1" selected>-</option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        var select = document.getElementById('relawan');
		let peserta = []
		let arr = JSON.parse(content[index][7])
		arr.forEach((item)=>{
			peserta.push(item.uid)
		})
        datarelawan.forEach(function(item,index){
			  let statusincludes = userstatusnormal
			  if (!statusincludes.includes(item[3]))return
			  if (!isLocal) {
				if (skipuid.includes(item[1]))return
			  }
          
            var opt = document.createElement('option');
            opt.value = index;
            opt.innerHTML = item[4]+" ("+item[18]+")";
            if(peserta.includes(item[1]))opt.disabled = true            
            select.appendChild(opt);          
        });
      }
    },
    buttons: [
      {
        text: 'Simpan',
        close:false,
        color: 'red',
        onClick: function(dialog, e)
          {
              var indexrelawan =  parseInt($$('#relawan').val());
			  if (indexrelawan == -1)return
			  let uid = datarelawan[indexrelawan][1]
			  let nama = datarelawan[indexrelawan][4]
			  let photo = datarelawan[indexrelawan][13]
			  let email = datarelawan[indexrelawan][2]
			  let bid = datarelawan[indexrelawan][18]
			  let user = {nama,uid,email,photo,bid}
			  let dokumen = JSON.parse(content[index][6])
			  let kategori = content[index][5]
			  let inputdata = JSON.stringify({index,kategori,dokumen,user})
              fpagemasterdokumenaddrelawanrun(dialog,inputdata)
          }
      },
      {
        text: 'Batal',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpagemasterdokumenaddrelawanrun(dialog,inputdata)
{
      dialog.close()
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'masterdokumenaddrelawan', inputdata}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              fpagemasterdokumenrefresh()
			  var toastBottom = app.toast.create({ text: 'Berhasil', closeTimeout: 3000,position: 'center', });toastBottom.open();
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function  fpagemasterdokumenaddrelawanmultiform(index,content,datarelawan)
{
  let item = JSON.parse(content[index][6])
  let dokumenid = content[index][1]
  let indexrelawanmulti = []
  var dialog = app.dialog.create({
    title: 'Tambah '+content[index][5],
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="icon512.png" style="width:150px;height:150px;margin: 10px 10px;border-radius: 0%;object-fit: cover;">'
      +'      <p style="font-weight:bold;">'+safe(item.deskripsi)+'</p>'
      +'  </div>'
	  +'		<div id="chips"></div>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Relawan</div><div class="item-input-wrap">'
      +'                            <select id="relawan" name="relawan">'
      +'                              <option value="-1" selected>-</option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        var select = document.getElementById('relawan');
		let peserta = []
		let arr = JSON.parse(content[index][7])
		arr.forEach((item)=>{
			peserta.push(item.uid)
		})
        datarelawan.forEach(function(item,index){
			  let statusincludes = ["Terbatas","Terverifikasi","Tertolak"]
			  if (!statusincludes.includes(item[3]))return
			  if (!isLocal) {
				if (skipuid.includes(item[1]))return
			  }
          
            var opt = document.createElement('option');
            opt.value = index;
            opt.innerHTML = item[4]+" ("+item[18]+")";
            if(peserta.includes(item[1]))opt.disabled = true            
            select.appendChild(opt); 			
        });
		relawan.onchange = evt => {
			var indexrelawan =  parseInt($$('#relawan').val())
			if (indexrelawan == -1)return
			let nama = datarelawan[indexrelawan][4]
			let bid = datarelawan[indexrelawan][18]
			var opt = document.createElement('div')
			opt.classList.add('chip')
			opt.style.cssText = 'height:auto'
			opt.dataset.index = indexrelawan
			opt.innerHTML = '<div class="chip-label" style="white-space: normal">'+nama+' ('+bid+')</div><a class="chip-delete" data-index="'+indexrelawan+'"></a>'
			document.getElementById('chips').appendChild(opt)
			$$('#relawan option[value="'+indexrelawan+'"]').attr('disabled',true)
			
			  $$('.chip-delete').on('click', function (e) {
					let indexrelawan = this.attributes["data-index"].value;
					$$(this).parent().remove()
					$$('#relawan option[value="'+indexrelawan+'"]').removeAttr('disabled')
			  })
		}
      }
    },
    buttons: [
      {
        text: 'Simpan',
        close:true,
        color: 'red',
        onClick: function(dialog, e)
          {
			  let indexall = []
			  $$('.chip').each((el)=>{
				  let index = $$(el).data('index')
				  indexall.push(index)
			  })
			  if (indexall.length == 0)return
			  
			  let userall = []
				  indexall.forEach((item)=>{
				  let uid = datarelawan[item][1]
				  let nama = datarelawan[item][4]
				  let photo = datarelawan[item][13]
				  let email = datarelawan[item][2]
				  let bid = datarelawan[item][18]
				  let user = {nama,uid,email,photo,bid}	
					userall.push(user)
			  })

			  let dokumen = JSON.parse(content[index][6])
			  let kategori = content[index][5]
			  let inputdata = JSON.stringify({index,kategori,dokumen,userall})
			  app.dialog.confirm('Apakah yakin?', 'Buat Sertifikat', function (){fpagemasterdokumenaddrelawanmultirun(dialog,inputdata)})
          }
      },
      {
        text: 'Batal',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpagemasterdokumenaddrelawanmultirun(dialog,inputdata)
{
      try{dialog.close()}catch{}
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'masterdokumenaddrelawanmulti', inputdata}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              fpagemasterdokumenrefresh()
			  var toastBottom = app.toast.create({ text: 'Berhasil', closeTimeout: 3000,position: 'center', });toastBottom.open();
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}
///////////////////////////////////////////////////////////////////////////



///////fpagemasterprogram////////////////////////////////////////////////////////
function fpagemasterprogram()
{
		$$('.dynamic .navbar .title').html('Master Program')
		let inputdata = JSON.stringify({instruksi:'getprogram'})
		fpagemastercommandrun(inputdata)
}

function fpagemasterprogramrun(content)
{
		let campaign = content.campaign
		let bsmijatimorgkode = content.bsmijatimdata[0][2]
		
		let html = `
			<div class="row margin-bottom">
				<div class="col-100">
				  <div class="card">
					<div class="card-header">PROGRAM DONASI</div>
					<div class="card-content card-content-padding mybsmi-masterprogram-list-program">
						<div class="progressbar-infinite"></div>
					</div>
					<div class="card-footer mybsmi-masterprogram-action-program"><a class="button button-fill">Buat</a></div>
				  </div>
				</div>
			</div>		
		`
		$$('.dynamic .page-content').html(html)
		
		let programhtml = '<div class="data-table data-table-collapsible data-table-init"><table style="table-layout: fixed"><thead><tr><th>No</th><th>Tenggat</th><th>Kode</th><th>Program</th><th>Donatur</th><th>Total</th><th class="display-none">Penyaluran</th><th>Saldo</th><th>Action</th></tr></thead><tbody></tbody></table></div>'
		
		let showdonasiawal = false
		
		for(let i=0;i<campaign.length;i++)
		{
				if(i==0)continue
				let program = campaign[i]
				let date = new Intl.DateTimeFormat("id-ID", { hour12:false,dateStyle: "short" , timeStyle: "short",  timeZone: "Asia/Jakarta"}).format(new Date(program[3]));
				date = date.split(",")[0]
				let bgclass = ''
				if(program[1]==bsmijatimorgkode)
				{
					let tenggat = new Date(program[3]).getTime()
					let now = new Date().getTime()
					if(tenggat > now){
						bgclass = 'bg-color-green'
					}else{
						bgclass = 'bg-color-yellow'
						showdonasiawal = true
					}
				}
				programhtml += '<div class="accordion-item"><div class="data-table data-table-collapsible data-table-init '+bgclass+'"><table style="table-layout: fixed"><tbody><tr>'+
											'<td data-collapsible-title="No">'+i+'</a></td>'+
											'<td data-collapsible-title="Pembuatan">'+safe(date)+'</td>'+
											'<td data-collapsible-title="Kode">'+safe(program[1])+'</td>'+
											'<td data-collapsible-title="Program">'+safe(program[2])+'</td>'+
											'<td data-collapsible-title="Donatur">'+safe(program[5])+'</td>'+
											'<td data-collapsible-title="Total">Rp '+formatRupiah(safe(program[4]))+'</td>'+
											'<td class="display-none" data-collapsible-title="Penyaluran">Rp '+formatRupiah(safe(program[6]))+'</td>'+
											'<td data-collapsible-title="Saldo">Rp '+formatRupiah(safe(program[8]))+'</td>'+
											'<td data-collapsible-title="Action" style="display: flex;align-content: center;align-items: center;justify-content: flex-start;text-align: left;"><a data-index="'+i+'" data-program="'+btoa(JSON.stringify(program))+'" class="button button-fill mybsmi-masterprogram-program-edit">Edit</a><i class="icon f7-icons accordion-item-toggle display-none">ellipsis_circle</i></td>'+
									'</tr><tbody></tbody></table></div>'
				programhtml += '	<div class="accordion-item-content">'+
										'<div class="mybsmi-masterprogram-program-riwayat bg-color-red block block-strong block-outline inset">'	
										
				let riwayathtml = '<div class="padding bg-color-white">Riwayat Penyaluran</div><div class="data-table data-table-collapsible data-table-init bg-color-white"><table><thead><tr><th>Tanggal</th><th>Nominal</th></tr></thead><tbody>'
				let arr = JSON.parse(program[7])
				for(let i=0;i<arr.length;i++){
					let item = arr[i]
					let date = new Intl.DateTimeFormat("id-ID", { hour12:false,dateStyle: "short" , timeStyle: "short",  timeZone: "Asia/Jakarta"}).format(new Date(item.date));
				date = date.split(",")[0]
					riwayathtml += '<tr>'+
									'<td data-collapsible-title="Tanggal">'+safe(date)+'</td>'+
									'<td data-collapsible-title="Nominal">Rp '+formatRupiah(safe(item.nominal))+'</td>'+
								'</tr>'
				}
				riwayathtml += '</tbody></table></div>'

				programhtml += riwayathtml										
										
										
				programhtml +=			'</div>'+
									'</div>'+
								'</div>'									
		}
		
		if (showdonasiawal)
		{
				let bsmijatimorgkode = content.bsmijatimdata[1][2]
				let bsmijatimorgprogram = content.bsmijatimdata[1][1]
				let bsmijatimorgimage = content.bsmijatimdata[1][3]
				
				let html = '<div class="margin-top bg-color-green showdonasiawal"><div class="data-table data-table-collapsible data-table-init"><table style="table-layout: fixed"><tbody><tr class="bg-color-green"><th>'+bsmijatimorgkode+'</th><th>'+bsmijatimorgprogram+'</th><th><th><a data-src="'+bsmijatimorgimage+'" class="button button-fill">Show</a></th></tr></tbody></table></div></div>'
				
				programhtml += html
		}
		
		let programhtmlaccordion = '<div class="accordion-item"><div class="accordion-item-toggle"><button class="button"><i class="icon f7-icons">ellipsis_circle</i></button></div><div class="accordion-item-content">'+programhtml+'</div></div>'
		
		$$('.mybsmi-masterprogram-list-program').html(programhtml)
		
		$$('.mybsmi-masterprogram-program-edit').on('click', function (e) {
				let index = parseInt(this.attributes["data-index"].value)
				let program = JSON.parse(atob(this.attributes["data-program"].value))
				//console.log('program',program)
				fpagemasterprogramedit(program,index)
				
		});	
		
		$$('.mybsmi-masterprogram-action-program a').on('click', function (e) {
				fpagemasterprogrambuat()
		})
		
		$$('.showdonasiawal a').on('click', function (e) {
			let src = this.attributes["data-src"].value
			let data = {src}
			myimage(data)
		})
		
}

function fpagemasterprogramedit(program,index){
	let data = program
  var dialog = app.dialog.create({
    title: 'Edit Program',
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      //+'      <img id="img" src="icon512.png" style="width:150px;height:150px;margin: 10px 10px;border-radius: 0%;object-fit: cover;">'
      +'      <p style="font-weight:bold;">('+safe(data[1])+') '+safe(data[2])+'</p>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Tenggat</div><div class="item-input-wrap">'
      +'            <input type="text" id="expired" name="expired" placeholder="Expired" value="'+safe(data[3])+'" readonly="readonly" class="calendar-input-kodedonasi" required validate>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        var calendar = app.calendar.create({
            inputEl: '.calendar-input-kodedonasi',
            dateFormat: 'm/d/yyyy',
            openIn: 'popover'
        }); 

		let date = new Date(data[3])
		let val = date.toLocaleDateString("en-US")
		//console.log('val',val)
		$$('#expired').val(val)
      }
    },
    buttons: [
      {
        text: 'Aktifkan',
        close:false,
        color: 'red',
        onClick: function(dialog, e)
          {
                var expired = $$('#expired').val();
				if(expired != ''){
					let inputdata = JSON.stringify({instruksi:'aktifkanprogram',program,index,expired})
					fpagemastercommandrun(inputdata)
					dialog.close()
				}
          }
      },
      {
        text: 'Batal',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}

function fpagemasterprogrambuat()
{
  var dialog = app.dialog.create({
    title: 'Buat Program',
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;height:50vh;overflow:auto;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      //+'      <img id="img" src="icon512.png" style="width:150px;height:150px;margin: 10px 10px;border-radius: 0%;object-fit: cover;">'
      //+'      <p style="font-weight:bold;"></p>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Nama</div><div class="item-input-wrap">'
      +'            <input type="text" id="namaprogram" name="namaprogram" placeholder="Nama Program" value="" required validate>'
      +'            </div></div>'
      +'        </li>'	  		  
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Tenggat</div><div class="item-input-wrap">'
      +'            <input type="text" id="expired" name="expired" placeholder="Expired" value="" readonly="readonly" class="calendar-input-kodedonasi" required validate>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        var calendar = app.calendar.create({
            inputEl: '.calendar-input-kodedonasi',
            dateFormat: 'm/d/yyyy',
            openIn: 'popover'
        }); 

      }
    },
    buttons: [
      {
        text: 'Buat',
        close:false,
        color: 'red',
        onClick: function(dialog, e)
          {
                var expired = $$('#expired').val();
				var nama = $$('#namaprogram').val();
				if(expired != '' && nama != ''){
					let inputdata = JSON.stringify({instruksi:'buatprogram',nama,expired})
					fpagemastercommandrun(inputdata)
					dialog.close()
				}
          }
      },
      {
        text: 'Batal',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();	
}
///////fpagemasterprogram////////////////////////////////////////////////////////




/////fpagepesan//////////////////////////////////////////////////////////////
function fpagepesan()
{
  if (typeof mybsmipesan === 'undefined' || mybsmipesan === null)
  {
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'getpesandata'}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
              window.mybsmipesan = content;
              getpesandatarun(content)
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
  }
  else
  {
    getpesandatarun(mybsmipesan)
  }
}

function getpesandatarun(content)
{
  //console.log(content);
  $$('.mybsmi-pesan-masuk').html('');
  $$('.mybsmi-pesan-terkirim').html('');
  for(i=content.length-1;i>-1;i--)
  {
    //let date = new Date(content[i][0]).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    let date = new Intl.DateTimeFormat("id-ID", { hour12:false,dateStyle: "short" , timeStyle: "short",  timeZone: "Asia/Jakarta"}).format(new Date(content[i][0]));
    //let data = '<div class="timeline-item"><div class="timeline-item-date"><small>'+date+'</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-inner"><div class="timeline-item-time"></div><div class="timeline-item-text">'+safe(content[i][5])+'</div></div></div></div>';
    let data = ''
+'              <li class="mybsmi-pesan-item-'+safe(content[i][1])+'">'
+'                <a href="/bacapesan/'+i+'" class="item-content">'
+'                  <img src="avatar.png" style="width:40px;height:40px;margin-right:10px;border-radius:50% 50%;object-fit:cover;">'
+'                  <div class="item-inner">'
+'                    <div class="item-title-row">'
+'                      <div class="item-title text-color-gray">NAMA</div>'
+'                      <div class="item-after">'+date+'</div>'
+'                    </div>'
+'                    <div class="item-subtitle text-color-gray">JUDUL</div>'
+'                    <div class="item-text">ISI</div>'
+'                  </div>'
+'                </a>'
+'              </li>'
    

    if (content[i][5] == dashboarddata.user.useruid)
    {
      $$('.mybsmi-pesan-masuk').append(data);
      $$('.mybsmi-pesan-item-'+content[i][1]+' img').attr('src','https://lh3.googleusercontent.com/d/'+safe(content[i][4]));
      $$('.mybsmi-pesan-item-'+content[i][1]+' .item-title').html(safe(content[i][3]));
      $$('.mybsmi-pesan-item-'+content[i][1]+' .item-subtitle').html(safe(content[i][8]));
      $$('.mybsmi-pesan-item-'+content[i][1]+' .item-text').html(safe(content[i][9]));
      if (content[i][10] == false)
      {
        $$('.mybsmi-pesan-item-'+content[i][1]+' .item-title').removeClass('text-color-gray');
        $$('.mybsmi-pesan-item-'+content[i][1]+' .item-title').addClass('text-color-black');
        $$('.mybsmi-pesan-item-'+content[i][1]+' .item-subtitle').removeClass('text-color-gray');
        $$('.mybsmi-pesan-item-'+content[i][1]+' .item-subtitle').addClass('text-color-black');
      }
    }
    else if (content[i][2] == dashboarddata.user.useruid)
    {
      $$('.mybsmi-pesan-terkirim').append(data);
      $$('.mybsmi-pesan-item-'+content[i][1]+' img').attr('src','https://lh3.googleusercontent.com/d/'+safe(content[i][7]));
      $$('.mybsmi-pesan-item-'+content[i][1]+' .item-title').html('Kepada: '+safe(content[i][6]));
      $$('.mybsmi-pesan-item-'+content[i][1]+' .item-subtitle').html(safe(content[i][8]));
      $$('.mybsmi-pesan-item-'+content[i][1]+' .item-text').html(safe(content[i][9]));
    }

  }
  
}

function fpagebacapesan(id)
{
    if (typeof mybsmipesan === 'undefined' || mybsmipesan === null) {
      app.views.main.router.navigate("/pesan/")
      return;
    }
    else
    {
      let data = mybsmipesan[id];//console.log(data);
      let date = new Intl.DateTimeFormat("id-ID", { hour12:false,dateStyle: "short" , timeStyle: "short",  timeZone: "Asia/Jakarta"}).format(new Date(data[0]));
      let pengirim = ''
+'              <div class="list list-email media-list"><ul><li>'
+'                <label class="item-content">'
+'                  <img src="avatar.png" style="width:40px;height:40px;margin-right:10px;border-radius:50% 50%;object-fit:cover;">'
+'                  <div class="item-inner">'
+'                    <div class="item-title-row">'
+'                      <div class="item-title text-color-black">NAMA</div>'
+'                      <div class="item-after">'+date+'</div>'
+'                    </div>'
+'                    <div class="item-subtitle text-color-gray">kepada</div>'
+'                  </div>'
+'                </label>'
+'              </li></ul></div>'

      
      if(data[5] === dashboarddata.user.useruid)
      {
            $$('.mybsmi-bacapesan .card-header').html(safe(data[8]));
            $$('.mybsmi-bacapesan .card-content').html(pengirim);
            $$('.mybsmi-bacapesan .card-footer').html(safe(data[9]));
            $$('.mybsmi-bacapesan .item-title').html(safe(data[3]));
            if (data[4] !== '') $$('.mybsmi-bacapesan img').attr('src','https://lh3.googleusercontent.com/d/'+safe(data[4]));
            $$('.mybsmi-bacapesan .item-subtitle').html('kepada saya');
            if (data[10] === false)
            {
              mybsmipesan[id][10] = true;
              fupdatebacapesan(data[1]);
            }
            $$('.mybsmi-balaspesan').removeClass('display-none');
            $$('.mybsmi-balaspesan').on('click', function (e) {
                  fkirimpesan(data[2],data[3],data[4],data[1])
            }); 
            $$('.mybsmi-bacapesan .item-title').on('click', function (e) {
                let url = "/relawan/"+safe(data[2]);
                //console.log(url);
                app.views.main.router.navigate(url);          
            });
            $$('.mybsmi-bacapesan img').on('click', function (e) {
                let url = "/relawan/"+safe(data[2]);
                //console.log(url);
                app.views.main.router.navigate(url);          
            });
            $$('.mybsmi-bacapesan img').css("cursor","pointer");
            $$('.mybsmi-bacapesan .item-title').css("cursor","pointer");
      }
      else if(data[2] === dashboarddata.user.useruid)
      {
            $$('.mybsmi-bacapesan .card-header').html(safe(data[8]));
            $$('.mybsmi-bacapesan .card-content').html(pengirim);
            $$('.mybsmi-bacapesan .card-footer').html(safe(data[9]));
            $$('.mybsmi-bacapesan .item-title').html('Kepada: '+safe(data[6]));
            if (data[4] !== '') $$('.mybsmi-bacapesan img').attr('src','https://lh3.googleusercontent.com/d/'+safe(data[7]));
            $$('.mybsmi-bacapesan .item-subtitle').html('dari saya');
            $$('.mybsmi-bacapesan .item-title').on('click', function (e) {
                let url = "/relawan/"+safe(data[5]);
                //console.log(url);
                app.views.main.router.navigate(url);          
            });
            $$('.mybsmi-bacapesan img').on('click', function (e) {
                let url = "/relawan/"+safe(data[5]);
                //console.log(url);
                app.views.main.router.navigate(url);          
            });
            $$('.mybsmi-bacapesan img').css("cursor","pointer");
            $$('.mybsmi-bacapesan .item-title').css("cursor","pointer");
      }
      

    }
}

function fupdatebacapesan(pesanid)
{
      //let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'updatebacapesan', pesanid:pesanid}, 
        success: function (data, status, xhr)
          {
            //mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            //mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}

function fkirimpesan(uid,nama,photo,replyto = '')
{
  //console.log(uid+nama+photo);
  if (dashboarddata.user.userphoto === ''){flengkapidata();return;}
  var dialog = app.dialog.create({
    title: 'Tulis Pesan',
    content: ''
+'          <div class="list no-hairlines-md">'
+'              <ul>'
+'                    <li class="item-content item-input">'
+'                          <div class="item-media">'
+'                                <img class="mybsmi-dariphoto" src="avatar.png" style="width:40px;height:40px;margin-right:10px;border-radius:50% 50%;object-fit:cover;">'
+'                          </div>'
+'                          <div class="item-inner">'
+'                                <div class="item-title item-label">Dari</div>'
+'                                <div class="item-input-wrap">'
+'                                      <input type="text" placeholder="" value="'+safe(dashboarddata.user.usernama)+'" readonly="readonly"/>'
+'                                </div>'
+'                          </div>'
+'                    </li>'
+'                    <li class="item-content item-input">'
+'                          <div class="item-media">'
+'                                <img class="mybsmi-kepadaphoto" src="avatar.png" style="width:40px;height:40px;margin-right:10px;border-radius:50% 50%;object-fit:cover;">'
+'                          </div>'
+'                          <div class="item-inner">'
+'                                <div class="item-title item-label">Kepada</div>'
+'                                <div class="item-input-wrap">'
+'                                      <input type="text" placeholder="" value="'+safe(nama)+'" readonly="readonly"/>'
+'                                </div>'
+'                          </div>'
+'                    </li>'
+'                    <li class="item-content item-input">'
+'                          <div class="item-media">'
+'                                <div style="width:40px;height:40px;margin-right:10px;"></div>'
+'                          </div>'
+'                          <div class="item-inner">'
+'                                <div class="item-title item-label">Subjek</div>'
+'                                <div class="item-input-wrap">'
+'                                      <input id="mybsmi-kirimpesan-subjek" type="text" placeholder="Tulis subjek" />'
+'                                </div>'
+'                          </div>'
+'                    </li>'
+'                    <li class="item-content item-input">'
+'                          <div class="item-media">'
+'                                <div style="width:40px;height:40px;margin-right:10px;"></div>'
+'                          </div>'
+'                          <div class="item-inner">'
+'                                <div class="item-title item-label">Pesan</div>'
+'                                <div class="item-input-wrap">'
+'                                      <textarea id="mybsmi-kirimpesan-pesan" placeholder="Tulis pesan" ></textarea>'
+'                                </div>'
+'                          </div>'
+'                    </li>'
+'              </ul>'
+'          </div>'
+'          '
+'          ',
    closeByBackdropClick: false,
    destroyOnClose: true,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        $$('.mybsmi-dariphoto').attr('src','https://lh3.googleusercontent.com/d/'+safe(dashboarddata.user.userphoto));
        if (photo !== '') $$('.mybsmi-kepadaphoto').attr('src','https://lh3.googleusercontent.com/d/'+safe(photo));
      }
    },
    buttons: [
      {
        text: 'Nanti Saja',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {
          }
      },
      {
        text: 'Kirim',
        close:false,
        onClick: function(dialog, e)
          {
            let subjek = $$('#mybsmi-kirimpesan-subjek').val();
            let pesan = $$('#mybsmi-kirimpesan-pesan').val();
            if(subjek === ''){var toastBottom = app.toast.create({ text: 'Subjek tidak boleh kosong', closeTimeout: 3000,position: 'center', });toastBottom.open();return;}
            if(pesan === ''){var toastBottom = app.toast.create({ text: 'Pesan tidak boleh kosong', closeTimeout: 3000,position: 'center', });toastBottom.open();return;}
            fkirimpesanrun(uid,nama,photo,subjek,pesan,replyto,dialog);
          }
      },
    ]
  });
  dialog.open();
}

function fkirimpesanrun(uid,nama,photo,subjek,pesan,replyto,dialog)
{
  //console.log(uid+subjek+pesan)
      dialog.close();
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'kirimpesan', uid:uid, subjek:subjek, pesan:pesan, replyto:replyto}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
              let pesanku = JSON.parse(content);
              if (typeof mybsmipesan === 'undefined' || mybsmipesan === null){}else{mybsmipesan.push(pesanku)};
              //app.dialog.alert("Pesan telah terkirim",'Info');
              fonesignalprompt('Pesan Terkirim','Beri tahu jika ada balasan dan pesan masuk');
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}
/////fpagepesan//////////////////////////////////////////////////////////////






//////fdownloadfile/////////////////////////////////////////////////////////////////////
//https://itnext.io/how-to-download-files-with-javascript-d5a69b749896
function fdownloadfile(IMG_URL,FILE_NAME)
{
  const startTime = new Date().getTime();

  request = new XMLHttpRequest();

  request.responseType = "blob";
  request.open("get", IMG_URL, true);
  request.send();
  
  let mypreloader = app.dialog.preloader('Downloading ...');

  request.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      const imageURL = window.URL.createObjectURL(this.response);

      const anchor = document.createElement("a");
      anchor.setAttribute('href', imageURL);
      anchor.setAttribute('target', '_blank');
      anchor.setAttribute('download', FILE_NAME);
      anchor.click();
      mypreloader.close();
      app.dialog.alert("Download Selesai",'Info');
    }
  };

  request.onprogress = function (e) {
    const percent_complete = Math.floor((e.loaded / e.total) * 100);

    const duration = (new Date().getTime() - startTime) / 1000;
    const bps = e.loaded / duration;

    const kbps = Math.floor(bps / 1024);

    const time = (e.total - e.loaded) / bps;
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);

    console.log(
      //`${percent_complete}% - ${kbps} Kbps - ${minutes} min ${seconds} sec remaining`
    );
  };
}

async function fdownloadfile1(IMG_URL,FILE_NAME) {
  const image = await fetch(IMG_URL);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const anchor = document.createElement("a");
  anchor.setAttribute('download', FILE_NAME);
  anchor.setAttribute('href', imageURL);
  anchor.setAttribute('target', '_blank');

  anchor.click();

  URL.revokeObjectURL(imageURL);
}


function fdownloadfile2(url, fileName){
  fetch(url, { method: 'get'})
    .then(res => res.blob())
    .then(res => {
      const aElement = document.createElement('a');
      aElement.setAttribute('download', fileName);
      const href = URL.createObjectURL(res);
      aElement.setAttribute('href', href);
      aElement.setAttribute('target', '_blank');
      aElement.click();
      URL.revokeObjectURL(href);
    });
};
//////fdownloadfile/////////////////////////////////////////////////////////////////////





/////////fpageaktivitas()/////////////////////////////////////////////////////////////
function fpageaktivitas(run = true)
{
  if (typeof mybsmiaktivitas === 'undefined' || mybsmiaktivitas === null)
  {
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'getaktivitasdata'}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
              window.mybsmiaktivitas = content;
              if (run) getaktivitasdatarun(content);
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
  }
  else
  {
    if (run) getaktivitasdatarun(mybsmiaktivitas);
  }
}

function getaktivitasdatarun(content)
{
  //console.log(content);
  $$('.mybsmi-aktivitas').html('');
  $$('.mybsmi-aktivitas-buataktivitas').html('<i class="icons f7-icons ">plus_app_fill</i>');
  $$('.mybsmi-aktivitas-buataktivitas i').on('click', function (e) {
        fbuataktivitas();
        //$$('.mybsmi-aktivitas-buataktivitas i').hide();
  });
  for(i=content.length-1;i>-1;i--)
  {
    //let date = new Date(content[i][0]).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    let date = new Intl.DateTimeFormat("id-ID", { hour12:false,dateStyle: "short" , timeStyle: "short",  timeZone: "Asia/Jakarta"}).format(new Date(content[i][0]));date = date.split(' ');date = date[0];
    //data += '<div class="timeline-item"><div class="timeline-item-date"><small>'+date+'</small></div><div class="timeline-item-divider"></div><div class="timeline-item-content"><div class="timeline-item-inner"><div class="timeline-item-time"></div><div class="timeline-item-text">'+safe(content[i][5])+'</div></div></div></div>';
    let data = '<div class="col-100 xsmall-75 small-50 medium-33 large-33 xlarge-33 mybsmi-aktivitas-item-'+safe(content[i][1])+'" data-user="'+btoa(JSON.stringify(content[i]))+'" style="cursor:pointer;"> <div class="card"> <div class="card-header no-padding" style="overflow:hidden;"><img class="poster" src="photo.svg" style="width:100%;aspect-ratio: 1 / 1;object-fit:cover;background-image:none;"></div> <div class="card-content card-content-padding"> <div style="font-weight:bold;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">'+safe(content[i][6])+'</div> <div></div> </div> <div class="card-footer"> <div class="row" style="width:100%"> <div class="col-100 margin-bottom margin-top" style="width:100%;"> <div class="float-left" style="width:3em;"><img class="avatar" src="avatar.png" style="width:2em;aspect-ratio:1 / 1;height:2em;object-fit:cover;border-radius:50% 50%;overflow:hidden;"></div> <div class="float-left" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width:70%;">'+safe(content[i][3])+'</div> </div> <div class="col-100 margin-bottom"> <div class="float-left" style="width:3em;"><i class="icons f7-icons">person_2</i></div> <div class="float-left" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">'+safe(JSON.parse(content[i][12]).length)+' Pendukung</div> </div> <div class="col-100 margin-bottom"> <div class="float-left" style="width:3em;"><i class="icons f7-icons">paperclip</i></div> <div class="float-left" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">'+safe(content[i][5])+'</div> </div><div class="col-100 margin-bottom"> <div class="float-left" style="width:3em;"><i class="icons f7-icons">calendar</i></div> <div class="float-left" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">'+safe(content[i][9])+'</div> </div> </div>   </div> </div> </div>';
    $$('.mybsmi-aktivitas').append(data);
    $$('.mybsmi-aktivitas-item-'+content[i][1]+' img.poster').attr('src','https://lh3.googleusercontent.com/d/'+safe(content[i][8]));
    $$('.mybsmi-aktivitas-item-'+content[i][1]+' img.avatar').attr('src','https://lh3.googleusercontent.com/d/'+safe(content[i][4]));
    $$('.mybsmi-aktivitas-item-'+content[i][1]).on('click', function (e) {
          let base64 = this.attributes["data-user"].value;
          let json = atob(base64);
          let data = JSON.parse(json)
          let jenis = data[5].toLowerCase();
          let id = data[1];
          let url = "/"+jenis+"/"+id;
          //console.log(url);
			if (dashboarddata.user.userphoto !== ''){
				app.views.main.router.navigate(url);
			}else{
				flengkapidata();
			}		  
          
    });
  }
  let datadumy = '<div class="col-100 xsmall-75 small-50 medium-33 large-33 xlarge-33" ></div><div class="col-100 xsmall-75 small-50 medium-40 large-40 xlarge-33" ></div>';
  $$('.mybsmi-aktivitas').append(datadumy);
  
}

function fbuataktivitas()
{
      var dialog = app.dialog.create({
        content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          +'<div style="width:100%;">'
          +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
          +'      <img id="img" src="" style="width:150px;height:150px;margin: 10px 10px;object-fit: cover;">'
          +'      <p style="font-weight:normal;">Buat Aktivitas bertema BSMI dan kumpulkan dukungan dari relawan</p>'
          +'      <div class="data-table"></div>'
          +'  </div>'
          +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
        closeByBackdropClick: false,
        destroyOnClose: true,
        verticalButtons: false,
        on: {
          opened: function () {
            //console.log('Dialog opened')
            let src = "icon512.png";
            $$('#img').attr('src',src);
          }
        },
        buttons: [
          {
            text: 'Nanti Saja',
            close:true,
            color: 'gray',
            onClick: function(dialog, e)
              {

              }
          },
          {
            text: 'Lanjutkan',
            close:true,
            color: 'red',
            onClick: function(dialog, e)
              {
                fbuataktivitasrun();
              }
          },
        ]
      });
      dialog.open();
}

function fbuataktivitasrun()
{
  //console.log('buataktivitas');
  if (dashboarddata.user.userphoto === ''){flengkapidata();return;}
  var dialog = app.dialog.create({
    title: 'Buat Aktivitas',
    closeByBackdropClick: false,
    destroyOnClose: true,
    content: '<div style="width:100%;height:60vh;overflow:auto;">'
      +'<form id="mybsmi-buataktivitas-form" runat="server" style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'  <img id="mybsmibuataktivitasposeterpreview" src="photo.svg" style="width:200px;height:200px;margin: 10px 10px;object-fit: contain;background-image: url(transparent.jpg);">'
      +'  <input accept="image/png,image/jpeg" type="file" name="mybsmibuataktivitasuploadposter" id="mybsmibuataktivitasuploadposter" required validate/>'
      +'  <div class="list no-hairlines-md">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <p class="mybsmibuataktivitasinfo" style="font-size:0.7em;"></p>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'                            <select name="kategori" required validate>'
      +'                              <option value="" disabled selected>-- Kategori --</option>'
      +'                              <option value="Twibbon">Twibbon</option>'
      +'                              <option value="Event" disabled>Event (Coming soon)</option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'                            <select name="pembuat" required validate>'
      +'                              <option value="" disabled selected>-- Pembuat --</option>'
      +'                              <option value="user"><span class="mybsmi-buataktivitas-form-user">User<span></option>'
      +'                              <option value="cabang" class="display-none"><span class="mybsmi-buataktivitas-form-cabang">Cabang</span></option>'
      +'                            </select>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="judul" placeholder="Judul" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      //+'            <input type="text" name="deskripsi" placeholder="Deskripsi" required validate/>'
      +'            <textarea name="deskripsi" placeholder="Deskripsi" required validate></textarea>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="tanggal" placeholder="Tanggal" value="" readonly="readonly" class="calendar-input-aktivitas" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input display-none"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="lokasi" placeholder="Lokasi" value="-" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'        <li class="item-content item-input display-none"><div class="item-inner"><div class="item-input-wrap">'
      +'            <input type="text" name="info" placeholder="Info" value="-" required validate/>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'</form>'
      +'</div>',
    on: {
      opened: function () {
          var calendar = app.calendar.create({
            inputEl: '.calendar-input-aktivitas',
            dateFormat: 'd M yyyy',
            openIn: 'popover'
          });
          $$('#mybsmi-buataktivitas-form select[name=pembuat] option[value=user]').html(dashboarddata.user.usernama);
          $$('#mybsmi-buataktivitas-form select[name=pembuat] option[value=cabang]').html(dashboarddata.user.usercabang);
          let data = JSON.parse(dashboarddata.user.usermydata)
          if (data.admincabang)
          {
            $$('#mybsmi-buataktivitas-form select[name=pembuat] option[value=cabang]').removeClass('display-none');
          }
          $$('#mybsmi-buataktivitas-form select[name=kategori]').on('change', function (e) {
            console.log('tes');
          });         
          mybsmibuataktivitasuploadposter.onchange = evt => {
            let [file] = mybsmibuataktivitasuploadposter.files
            if (file) {
              if (file.size > 10485760) //10MB
              {
                //app.dialog.alert('File tidak boleh lebih dari 500 KB','Terjadi Kesalahan');
                var toastBottom = app.toast.create({ text: 'File tidak boleh lebih dari 10 MB', closeTimeout: 5000,position: 'center', });toastBottom.open();
                mybsmibuataktivitasuploadposter.value = '';
                mybsmibuataktivitasposeterpreview.src = 'photo.svg'
              }
              else
              {
                mybsmibuataktivitasposeterpreview.src = URL.createObjectURL(file)
              }
            }
            else
            {
              mybsmibuataktivitasposeterpreview.src = 'photo.svg'
            }
          }
      }
    },
    buttons: [
      {
        text: 'Nanti Saja',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {
          }
      },
      {
        text: 'Buat',
        close:false,
        onClick: function(dialog, e)
          {            
            let [file] = mybsmibuataktivitasuploadposter.files
            if (file) {
              if (!$$('#mybsmi-buataktivitas-form')[0].checkValidity()) {
                    //console.log('Check Validity!');
                    return;
              }
              let tanggal = $$('#mybsmi-buataktivitas-form input[name=tanggal').val()
              if(tanggal == '')return
              let val = tanggal
              if(!val.startsWith("'"))val = "'"+tanggal
              $$('#mybsmi-buataktivitas-form input[name=tanggal').val(val)
              if($$('#mybsmi-buataktivitas-form select[name=kategori]').val() == "Twibbon"){
                  if(file.type != "image/png"){
                      var toastBottom = app.toast.create({ text: 'Twibbon harus memiliki bagian transparan', closeTimeout: 5000,position: 'center', });toastBottom.open();
                      return
                  }
              }
              var dataform = JSON.stringify(app.form.convertToData('#mybsmi-buataktivitas-form'));//console.log(dataform);
              const blob = imagetosmall(file)
              blob.then((value)=>{
                    const fr = new FileReader();
                    fr.onload = function(e) {
                      const obj = {
                        filename: file.name,
                        mimeType: file.type,
                        bytes: [...new Int8Array(e.target.result)],
                        aktivitas: dataform
                      };
                      fkirimbuataktivitas(dialog,obj);
                    };
                    fr.readAsArrayBuffer(value);
              })
            }
            else
            {
              var toastBottom = app.toast.create({ text: 'Pilih file poster', closeTimeout: 5000,position: 'center', });toastBottom.open();
            }
          }
      },
    ]
  });
  dialog.open();
}

function fkirimbuataktivitas(dialog,obj)
{
  //console.log(obj);
  var data = JSON.stringify(obj);
  dialog.close();
  let mypreloader = app.dialog.preloader();
  app.request({
    url: apidataurl,
    method: 'POST',
    cache: false,
    data : { token:mybsmiusertoken, command: 'buataktivitas', data: data}, 
    success: function (data, status, xhr)
      {
        mypreloader.close();        
        var status = JSON.parse(data).status;
        var content = JSON.parse(data).data;
        if (status == "success")
        {
          //console.log(content);
          if (content === 'Aktif')
          {
            //app.dialog.alert("Aktivitas berhasil dibuat",'Info');
            mybsmiaktivitas = null;
            fpageaktivitas();
            dapatbintang(3);
          }
          else if (content === 'Pending')
          {
            app.dialog.alert("Aktivitas akan diterbitkan segera setelah peninjauan",'Info');
          }
          else
          {
            //app.dialog.alert(content,'Info');
            fcekexpiredtoken(content);
          }
        }
        else if (status == "failed")
        {
          //console.log("failed");
          app.dialog.alert(content,'Terjadi Kesalahan');
        }
        else
        {
          //console.log("failed");
          app.dialog.alert(content,'Terjadi Kesalahan');
        }
      },
    error: function (xhr, status, message)
      {
        //console.log(message);
        mypreloader.close();
        app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
      },
  });
}

function dapatbintang(jumlah)
{
  var dialog = app.dialog.create({
    content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      +'<div style="width:100%;">'
      +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
      +'      <img id="img" src="" style="width:150px;height:150px;margin: 10px 10px;border-radius: 50%;object-fit: cover;">'
      +'      <p style="font-weight:bold;font-size:3em;" class="text-color-red">+'+jumlah+' Bintang</p>'
      +'      <p style="font-weight:normal;">Terima kasih atas kontribusinya</p>'
      +'      <div class="data-table"></div>'
      +'  </div>'
      +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
    closeByBackdropClick: false,
    destroyOnClose: true,
    verticalButtons: false,
    on: {
      opened: function () {
        //console.log('Dialog opened')
        let src = "https://lh3.googleusercontent.com/d/"+safe(dashboarddata.user.userphoto);
        $$('#img').attr('src',src);
      }
    },
    buttons: [
      {
        text: 'Ok',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {

          }
      },
    ]
  });
  dialog.open();
}
///////////////fpageaktivitas/////////////////////////////////////////////////////////////////////////////////////////////////






///////////////fpagetwibbon/////////////////////////////////////////////////////////////////////////////////////
function fpagetwibbon(aktivitasid)
{

  fpageaktivitas(false);
  function fperiksakesiapan()
  {
      if (typeof mybsmiaktivitas === 'undefined' || mybsmiaktivitas === null) {
        setTimeout(function(){ fperiksakesiapan(); }, 1000);
        return;
      }

      for (var i=0;i<mybsmiaktivitas.length;i++)
      {
        if (aktivitasid === mybsmiaktivitas[i][1])
        {
          fpagetwibbonrun(mybsmiaktivitas[i]);
        }
      }
  }
  fperiksakesiapan()
}

function fpagetwibbonrun(data)
{
  //console.log(data);
  $$('.mybsmi-twibbon-nama').text(data[3]);
  $$('.mybsmi-twibbon-judul').text(data[6]);
  $$('.mybsmi-twibbon-pendukung').text(JSON.parse(data[12]).length);
  $$('.mybsmi-twibbon-deskripsi').text(data[7]);
  $$('.mybsmi-twibbon-avatar').attr('src','https://lh3.googleusercontent.com/d/'+safe(data[4]));

  let cabangid = '';
  for (i=0;i<kodecabang.length;i++)
  {
    if (kodecabang[i][0] === data[3]) cabangid = kodecabang[i][1];
  }

  if (cabangid === '')
  {
    $$('.mybsmi-twibbon-nama').on('click', function (e) {
        let url = "/relawan/"+safe(data[2]);
        //console.log(url);
        app.views.main.router.navigate(url);          
    });
    $$('.mybsmi-twibbon-avatar').on('click', function (e) {
        let url = "/relawan/"+safe(data[2]);
        //console.log(url);
        app.views.main.router.navigate(url);          
    });
  }
  else
  {
    $$('.mybsmi-twibbon-nama').on('click', function (e) {
        let url = "/cabang/"+safe(cabangid);
        //console.log(url);
        app.views.main.router.navigate(url);          
    });
    $$('.mybsmi-twibbon-avatar').on('click', function (e) {
        let url = "/cabang/"+safe(cabangid);
        //console.log(url);
        app.views.main.router.navigate(url);          
    });
  }
  
  $$('.mybsmi-twibbon-nama').css("cursor","pointer");

  $$('.mybsmi-twibbon-avatar').css("cursor","pointer");
  
  let date = new Intl.DateTimeFormat("id-ID", { hour12:false,dateStyle: "short" , timeStyle: "short",  timeZone: "Asia/Jakarta"}).format(new Date(data[0]));date = date.split(' ');date = date[0];
  $$('.mybsmi-twibbon-date').text(safe(data[9]));
  
  fjadipendukungrun(data[12])

  let pendukung = JSON.parse(data[12]);
  let exists = false;
  for (let i= pendukung.length-1;i>-1;i--)
  {
    if (pendukung[i].uid === dashboarddata.user.useruid) exists = true;
    if (skipuid.includes(dashboarddata.user.useruid)) exists = true;
  }

  $$('.mybsmi-twibbon-photo-button').on('click', function (e) {
    $$('#mybsmi-twibbon-photo-upload').click();
  });
  $$('.mybsmi-twibbon-photo-download').on('click', function (e) {
    let canvas = document.getElementById("mybsmi-twibbon-canvas");
    const d = new Date();
    let time = d.getTime();
    fdownloadtwibbon(canvas, 'twibbon-'+data[1]+'-'+time+'.png');
  });

  $$('.mybsmi-twibbon-photo-bagikan').on('click', async function (e) {

    const canvasElement = document.getElementById("mybsmi-twibbon-canvas");
    const dataUrl = canvasElement.toDataURL();
    const blob = await (await fetch(dataUrl)).blob();
    const d = new Date();
    let time = d.getTime();
    let filename = 'twibbon-'+data[1]+'-'+time+'.png'
    let route = app.views.current.router.currentPageEl.baseURI
    const filesArray = [
      new File(
        [blob],
        filename,
        {
          type: blob.type,
          lastModified: new Date().getTime()
        }
      )
    ];
    const shareData = {
      files: filesArray,
      text: "Join twibbon "+route,
    };
    navigator.share(shareData);
    
  });


  $$('.mybsmi-twibbon-share').on('click', function (e) {
            let route = app.views.current.router.currentPageEl.baseURI
            if (navigator.share) {
              navigator
                .share({
                  title: "Share",
                  //text: "Share",
                  url: route
                })
                .then(() => console.log("thanks for share"))
                .catch(error => console.log("error", error));
            } 
            
  });
  
  $$('.mybsmi-twibbon-share').css("cursor","pointer");
  
  ///////////////loadposter/////////////////////////////////////////////
  let IMG_URL = 'https://cors.bsmijatim.workers.dev/?https://lh3.googleusercontent.com/d/'+safe(data[8]);
  let FILE_NAME = 'test'
  fdownloadfiletwibbonposter(IMG_URL,FILE_NAME);

   /////////////pilih photo///////////////////////////////////////////////
  let output = document.getElementById('mybsmi-twibbon-photo-upload');
  output.onchange = evt => {
    if (dashboarddata.user.userphoto === ''){flengkapidata();return;}
    const [file] = output.files
    if (file) {
        let output = document.getElementById('mybsmi-twibbon-photo');
        output.src = URL.createObjectURL(file)
        output.onload = function() {
          URL.revokeObjectURL(output.src)
          let canvasphoto = document.getElementById("mybsmi-twibbon-canvas-photo");
          canvasphoto.width = 1000;
          canvasphoto.height = 1000;
          let contextphoto = canvasphoto.getContext("2d", { willReadFrequently: true });
          contextphoto.clearRect(0, 0, canvasphoto.width, canvasphoto.height);
          let imgphoto = document.getElementById('mybsmi-twibbon-photo');
          
          ratio = imgphoto.width/imgphoto.height;
          width = canvasphoto.width;
          height = width/ratio;
          y = (width-height)/2;
          x = 0;
          if (height>width)
          {
            height = canvasphoto.height;
            width = height*ratio;
            x = (height-width)/2;
            y = 0;
          }    
          contextphoto.drawImage(imgphoto, 0, 0, imgphoto.width, imgphoto.height, x, y, width, height);
          
          let canvas = document.getElementById("mybsmi-twibbon-canvas");
          let context = canvas.getContext("2d", { willReadFrequently: true });
          let imgposter = document.getElementById('mybsmi-twibbon-poster');
          context.drawImage(imgphoto, 0, 0, imgphoto.width, imgphoto.height, x, y, width, height);
          context.drawImage(imgposter, 0, 0, canvas.width, canvas.height );
          $$('.mybsmi-twibbon-photo-button').hide();
          $$('.mybsmi-twibbon-photo-download').removeClass('display-none');
          $$('.mybsmi-twibbon-photo-bagikan').removeClass('display-none');
          $$('#zoom-slider').removeClass('display-none');
		  $$('#mybsmi-twibbon-photo-watermark').removeClass('display-none');
		  $$('#mybsmi-twibbon-photo-watermark').addClass('display-inline-block');
          if (!exists) fjadipendukung(data[1]);
          fgesertwibbonphoto();
          zoomtwibbonpoto()
          addUserWatermark()
        }

    }
  }
  
  //wattermark change
  let toggle = app.toggle.get('#mybsmi-twibbon-photo-watermark .toggle');
  toggle.on('change', ()=>{drawcanvas()})
  
  /////////////////////zoomandpan///////////////////////////////////////
  let canvas = document.getElementById("mybsmi-twibbon-canvas");
  let context = canvas.getContext("2d", { willReadFrequently: true });
  let imgposter = document.getElementById('mybsmi-twibbon-poster');
  let canvasphoto = document.getElementById("mybsmi-twibbon-canvas-photo");
  let contextphoto = canvasphoto.getContext("2d", { willReadFrequently: true });
  let imgphoto = document.getElementById('mybsmi-twibbon-photo');  
  let ratio,width,height,y,x,myoffsetx,myoffsety;
  myoffsetx = 0;
  myoffsety = 0;

  function drawcanvas()
  {
          contextphoto.clearRect(0, 0, canvasphoto.width, canvasphoto.height);
          context.clearRect(0, 0, canvas.width, canvas.height);
          contextphoto.drawImage(imgphoto, 0, 0, imgphoto.width, imgphoto.height, x, y, width, height);
          var imgData = contextphoto.getImageData(0, 0, canvasphoto.width, canvasphoto.height);
          context.putImageData(imgData, 0, 0);
          context.drawImage(imgposter, 0, 0, canvas.width, canvas.height);
          addUserWatermark()
  }
  
  function zoomtwibbonpoto()
  {
      const slider = document.getElementById('zoom-slider');
      slider.value = 1;
      slider.min = 0.01;
      slider.max = 10;
      slider.step = 'any';
      slider.addEventListener('input', e => {
        //debugger
        contextphoto.clearRect(0, 0, canvasphoto.width, canvasphoto.height);
        const scale = e.target.value;//console.log('scale:'+scale);

        //contextphoto.scale(scale, scale); 
        //contextphoto.drawImage(imgphoto, 0, 0);
        //contextphoto.scale(1 / scale, 1 / scale);  
        
        let xsekarang = x;
        let ysekarang = y;

        ratio = imgphoto.width/imgphoto.height;
        width = canvasphoto.width;
        height = width/ratio;
        y = (width-height)/2;
        x = 0;
        if (height>width)
        {
          height = canvasphoto.height;
          width = height*ratio;
          x = (height-width)/2;
          y = 0;
        }
        
        
        width *= scale;
        height *= scale;
        
        let mx = (canvasphoto.width-width)/2-myoffsetx;
        let my = (canvasphoto.height-height)/2-myoffsety;
        
        x = mx;
        y = my;
        
        //console.log(x+ ':'+y);
               
        contextphoto.drawImage(imgphoto, 0, 0, imgphoto.width, imgphoto.height, mx, my, width, height);       
        context.clearRect(0, 0, canvas.width, canvas.height);
        var imgData = contextphoto.getImageData(0, 0, canvasphoto.width, canvasphoto.height);
        context.putImageData(imgData, 0, 0);
        context.drawImage(imgposter, 0, 0, canvas.width, canvas.height);
      });

      slider.ontouchstart=handleTouchStart;
      slider.ontouchend=handleTouchEnd;
      slider.onmousedown=handleMouseDown;
      slider.onmouseup=handleMouseUp;
      
      function handleTouchStart(e){
        context.globalAlpha = 0.2;
      }

      function handleTouchEnd(e){
        context.globalAlpha = 1.0;
        drawcanvas();
      }

      function handleMouseDown(e){
        context.globalAlpha = 0.2;
      }

      function handleMouseUp(e){
        context.globalAlpha = 1.0;
        drawcanvas();
      }

  }

  ///////////////////gesertwibbonphoto//////////////////////////////
  function fgesertwibbonphoto()
  {
    let canvas = document.getElementById("mybsmi-twibbon-canvas");
    let context = canvas.getContext("2d", { willReadFrequently: true });
    let imgposter = document.getElementById('mybsmi-twibbon-poster');
    let canvasphoto = document.getElementById("mybsmi-twibbon-canvas-photo");
    let contextphoto = canvasphoto.getContext("2d", { willReadFrequently: true });
    let imgphoto = document.getElementById('mybsmi-twibbon-photo');


    function reOffset(){
        var BB=canvas.getBoundingClientRect();
        offsetX=BB.left;
        offsetY=BB.top;        
    }
    
    var offsetX,offsetY;
    reOffset();
    window.onscroll=function(e){ reOffset(); }
    window.onresize=function(e){ reOffset(); }
    canvas.onresize=function(e){ reOffset(); }

    var isDragging=false;
    var startX,startY;
    var canvasWidth=canvas.width;
    var canvasHeight=canvas.height;
    var mx,my,nmyoffsetx,nmyoffsety;

    canvas.ontouchstart=handleTouchStart;
    canvas.ontouchend=handleTouchEnd;
    canvas.ontouchmove=handleTouchMove;
    canvas.onmousedown=handleMouseDown;
    canvas.onmousemove=handleMouseMove;
    canvas.onmouseup=handleMouseUp;
    canvas.onmouseout=handleMouseOut;
    
    function handleTouchStart(e){
      e.preventDefault();
      var touch = e.touches[0];
      startX=parseInt(touch.clientX-offsetX);
      startY=parseInt(touch.clientY-offsetY);
      // set the drag flag
      isDragging=true;
      context.globalAlpha = 0.2;
    }

    function handleTouchEnd(e){
      e.preventDefault();
      var touch = e.touches[0];
      //canMouseX=parseInt(touch.clientX-offsetX);
      //canMouseY=parseInt(touch.clientY-offsetY);
      // clear the drag flag
      isDragging=false;
      x = mx;
      y = my;
      myoffsetx += nmyoffsetx;
      myoffsety += nmyoffsety
      context.globalAlpha = 1.0;
      drawcanvas();
    }

    function handleTouchMove(e){
      e.preventDefault();
      var touch = e.touches[0];
      canMouseX=parseInt(touch.clientX-offsetX);
      canMouseY=parseInt(touch.clientY-offsetY);
      // if the drag flag is set, clear the canvas and draw the image
      if(isDragging){
          redraw(canMouseX,canMouseY);
      }
    }

    function handleMouseDown(e){
      startX=parseInt(e.clientX-offsetX);
      startY=parseInt(e.clientY-offsetY);
      // set the drag flag
      isDragging=true;
      context.globalAlpha = 0.2;
    }

    function handleMouseUp(e){
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY-offsetY);
      // clear the drag flag
      isDragging=false;
      x = mx;
      y = my;
      myoffsetx += nmyoffsetx;
      myoffsety += nmyoffsety;
      context.globalAlpha = 1.0;
      drawcanvas();
    }

    function handleMouseOut(e){
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY-offsetY);
      // user has left the canvas, so clear the drag flag
      //isDragging=false;
    }

    function handleMouseMove(e){
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY-offsetY);
      // if the drag flag is set, clear the canvas and draw the image
      if(isDragging){
          //ctx.clearRect(0,0,canvasWidth,canvasHeight);
          //ctx.drawImage(img,canMouseX-128/2,canMouseY-120/2,128,120);
          //console.log(canMouseX+' : '+canMouseY);
          redraw(canMouseX,canMouseY);
      }
    }
    
    function redraw(myX,myY)
    {

          nmyoffsetx = (startX-myX)*4;
          nmyoffsety = (startY-myY)*4;
          
          mx = x-nmyoffsetx;
          my = y-nmyoffsety;
          
          contextphoto.clearRect(0, 0, canvasphoto.width, canvasphoto.height);
          context.clearRect(0, 0, canvas.width, canvas.height);
          contextphoto.drawImage(imgphoto, 0, 0, imgphoto.width, imgphoto.height, mx, my, width, height);
          var imgData = contextphoto.getImageData(0, 0, canvasphoto.width, canvasphoto.height);
          context.putImageData(imgData, 0, 0);
          context.drawImage(imgposter, 0, 0, canvas.width, canvas.height);
    }

  }

  function addUserWatermark(){
    function drawTextBG(ctx, txt, font, x, y, padding) {
      ctx.font = font;
      ctx.textBaseline = "top";
      ctx.fillStyle = "#fff";

      var width = ctx.measureText(txt).width;
      ctx.fillRect(x, y, width + padding, parseInt(font, 10) + padding);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#009ddf";
      ctx.strokeRect(x, y, width + padding, parseInt(font, 10) + padding);

      ctx.fillStyle = "#009ddf";
      //ctx.textAlign = "right";
      ctx.fillText(txt, x + padding / 2, y + padding / 2);
    }

    let canvas = document.getElementById("mybsmi-twibbon-canvas");
    let context = canvas.getContext("2d", { willReadFrequently: true });
    let txt = dashboarddata.user.usernama+' ( '+dashboarddata.user.userbid+' )'
    
    var toggle = app.toggle.get('#mybsmi-twibbon-photo-watermark .toggle');
	if (toggle.checked) {
	  drawTextBG(context, txt, "25px arial", 10, 940, 20);
	}	
  }
  
}

function fdownloadfiletwibbonposter(IMG_URL,FILE_NAME)
{
      let mypreloader = app.dialog.preloader();
      app.request({
        url: IMG_URL,
        method: 'GET',
        xhrFields: {
          responseType: "blob",
        },
        success: function (data, status, xhr)
          {
            mypreloader.close();
            const imageURL = window.URL.createObjectURL(data);
            let output = document.getElementById('mybsmi-twibbon-poster');
            output.src = imageURL;
            output.onload = function() {
            URL.revokeObjectURL(output.src)
            let canvas = document.getElementById("mybsmi-twibbon-canvas");
            canvas.width = 1000;
            canvas.height = 1000;
            let context = canvas.getContext("2d");
            let img1 = document.getElementById('mybsmi-twibbon-poster');
            context.drawImage(img1, 0, 0, canvas.width, canvas.height);
            }            
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
}


function fdownloadfiletwibbonposter1(IMG_URL,FILE_NAME)
{
      const imageURL = IMG_URL;
      let output = document.getElementById('mybsmi-twibbon-poster');
      output.src = imageURL;
      output.onload = function() {
      URL.revokeObjectURL(output.src)
      let canvas = document.getElementById("mybsmi-twibbon-canvas");
      canvas.width = 1000;
      canvas.height = 1000;
      let context = canvas.getContext("2d");
      let img1 = document.getElementById('mybsmi-twibbon-poster');
      context.drawImage(img1, 0, 0, canvas.width, canvas.height);
      }
}


function fdownloadfiletwibbonposter2(IMG_URL,FILE_NAME)
{
  const startTime = new Date().getTime();
  request = new XMLHttpRequest();
  request.responseType = "blob";
  request.open("get", IMG_URL, true);
  request.send();  
  let mypreloader = app.dialog.preloader();

  request.onreadystatechange = function () {
    //console.log('responsetext = readystate = '+this.readyState+' = status = '+this.status+' = data = '+this.responseText);
    //console.log('response = readystate = '+this.readyState+' = status = '+this.status+' = data = '+this.response);
    if (this.readyState == 4 && this.status == 200) {
      //console.log('responsetext = '+this.responseText);
      console.log(this.response);
      const imageURL = window.URL.createObjectURL(this.response);
      mypreloader.close();
      let output = document.getElementById('mybsmi-twibbon-poster');
      output.src = imageURL;
      output.onload = function() {
      URL.revokeObjectURL(output.src)
      let canvas = document.getElementById("mybsmi-twibbon-canvas");
      canvas.width = 1000;
      canvas.height = 1000;
      let context = canvas.getContext("2d");
      let img1 = document.getElementById('mybsmi-twibbon-poster');
      context.drawImage(img1, 0, 0, canvas.width, canvas.height);
      }      
    }
  };

  request.onprogress = function (e) {
    const percent_complete = Math.floor((e.loaded / e.total) * 100);
    const duration = (new Date().getTime() - startTime) / 1000;
    const bps = e.loaded / duration;
    const kbps = Math.floor(bps / 1024);
    const time = (e.total - e.loaded) / bps;
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);

    console.log(
      //`${percent_complete}% - ${kbps} Kbps - ${minutes} min ${seconds} sec remaining`
    );
  };
}

function fdownloadtwibbon(canvas, filename) {
  /// create an "off-screen" anchor tag
  var lnk = document.createElement('a'), e;

  /// the key here is to set the download attribute of the a tag
  lnk.download = filename;

  /// convert canvas content to data-uri for link. When download
  /// attribute is set the content pointed to by link will be
  /// pushed as "download" in HTML5 capable browsers
  lnk.href = canvas.toDataURL("image/png;base64");

  /// create a "fake" click-event to trigger the download
      if (document.createEvent) {
          e = document.createEvent("MouseEvents");
          e.initMouseEvent("click", true, true, window,
                          0, 0, 0, 0, 0, false, false, false,
                          false, 0, null);

          lnk.dispatchEvent(e);
      } else if (lnk.fireEvent) {
          lnk.fireEvent("onclick");
      }
}
///////////////fpagetwibbon/////////////////////////////////////////////////////////////////////////////////////



///////////////pendukung/////////////////////////////////////////////////////////////////////////////////////
function fjadipendukung(aktivitasid)
{
    //console.log(aktivitasid)
	if(skipuid.includes(dashboarddata.user.useruid))return
    let mypreloader = app.dialog.preloader();
    app.request({
      url: apidataurl,
      method: 'POST',
      cache: false,
      data : { token:mybsmiusertoken, command: 'jadipendukungaktivitas', aktivitasid:aktivitasid}, 
      success: function (data, status, xhr)
        {
          mypreloader.close();
          var status = JSON.parse(data).status;
          var content = JSON.parse(data).data;
          if (status == "success")
          {
            //console.log(content);
            fjadipendukungrun(content);
            dapatbintang(1);
          }
          else if (status == "failed")
          {
            //console.log("failed");
            //app.dialog.alert(content,'Terjadi Kesalahan');
          }
          else
          {
            //console.log("failed");
            //app.dialog.alert(content,'Terjadi Kesalahan');
            fcekexpiredtoken(content, false);
          }
        },
      error: function (xhr, status, message)
        {
          //console.log(message);
          mypreloader.close();
          app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
        },
    })
}

function fjadipendukungrun(mydata)
{
  let pendukung = JSON.parse(mydata);
  let exists = false;
  $$('.mybsmi-twibbon-pendukungdetail').html('');
  $$('.mybsmi-twibbon-pendukung').text(pendukung.length);
  //console.log(pendukung);
  for (let i= pendukung.length-1;i>-1;i--)
  {
    if (pendukung[i].uid === dashboarddata.user.useruid) exists = true;
    let data = ''
+'          <div class="col-100 margin-bottom mybsmi-twibbon-pendukungdetail-item-'+safe(pendukung[i].uid)+'" style="width:100%">'
+'          <div class="float-left" style="width:3em;"><img src="avatar.png" style="width:1.5em;aspect-ratio:1/1;object-fit:cover;border-radius:50% 50%;overflow:hidden;"></div>'
+'          <div class="float-left" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width:70%">'+safe(pendukung[i].nama)+'</div>'
+'          </div>'
    $$('.mybsmi-twibbon-pendukungdetail').append(data);
    $$('.mybsmi-twibbon-pendukungdetail-item-'+pendukung[i].uid+' img').attr('src','https://lh3.googleusercontent.com/d/'+safe(pendukung[i].photo));
    $$('.mybsmi-twibbon-pendukungdetail-item-'+pendukung[i].uid).on('click', function (e) {
        let url = "/relawan/"+safe(pendukung[i].uid);
        //console.log(url);
        app.views.main.router.navigate(url);          
    });
    $$('.mybsmi-twibbon-pendukungdetail-item-'+pendukung[i].uid).css("cursor","pointer");
  }
}
/////////fpendukung/////////////////////////////////////////////////////////////



/////////relative_time/////////////////////////////////////////////////////////////////////////////
function relative_time(x) {
        if (!x) {
            return
        }
        var a = x;

        //a = a.trim(a);
        a = a.replace(/\.\d\d\d+/, "");
        a = a.replace(/-/, "/").replace(/-/, "/");
        a = a.replace(/T/, " ").replace(/Z/, " UTC");
        a = a.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
        var b = new Date(a);
        var c = (arguments.length > 1) ? arguments[1] : new Date();
        var d = parseInt((c.getTime() - b) / 1000);
        d = (d < 2) ? 2 : d;
        var r = '';
        if (d < 60) {
            r = 'Baru saja dipublikasikan'
        } else if (d < 120) {
            r = '1 menit yang lalu'
        } else if (d < (45 * 60)) {
            r = (parseInt(d / 60, 10)).toString() + ' menit yang lalu'
        } else if (d < (2 * 60 * 60)) {
            r = '1 jam yang lalu'
        } else if (d < (24 * 60 * 60)) {
            r = '' + (parseInt(d / 3600, 10)).toString() + ' jam yang lalu'
        } else if (d < (48 * 60 * 60)) {
            r = '1 hari yang lalu'
        } else {
            r = (parseInt(d / 86400, 10)).toString() + ' hari yang lalu'
        }
        return (r.match('NaN') ? x : r)
}
/////////relative_time//////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////////////////////
function fpagebukusaku(run = true)
{
  if (typeof mybsmibukusakudata === 'undefined' || mybsmibukusakudata === null)
  {
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'getbukusakudata'}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
              window.mybsmibukusakudata = content;
              if (run) getbukusakudatarun(content);
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
  }
  else
  {
    if (run) getbukusakudatarun(mybsmibukusakudata);
  }
}

function getbukusakudatarun(data)
{
  //console.log(data);
  for (let i=1;i<data.length;i++)
  {
    let html = ''
    +'            <div class="col-100 xsmall-75 small-50 medium-33 large-33 xlarge-33 mybsmi-bukusaku-item-'+i+'" data-index="'+i+'">'
    +'              <div class="card">'
    +                '<div class="card-header no-padding" style="overflow:hidden;"><img src="photo.svg" style="width:100%;aspect-ratio: 1.5 / 1;object-fit:cover;"></div>'
    +'                <div class="card-content card-content-padding">'
    +'                  <div style="font-weight:bold;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">'+safe(data[i][1])+'</div>'
    +'                  <div></div>'
    +'                </div>'
    +'                <div class="card-footer display-none">'                 
    +'                </div>'
    +'              </div>'
    +'            </div>';
    $$('.mybsmi-bukusaku').append(html);
    let url = 'https://lh3.googleusercontent.com/d/'+safe(data[i][0]);
    $$('.mybsmi-bukusaku-item-'+i+' img').attr('src',url);
    $$('.mybsmi-bukusaku-item-'+i).css('cursor','pointer');
    $$('.mybsmi-bukusaku-item-'+i).on('click', function (e) {
       //console.log($$(this).attr('data-index')) 
       let url = 'https://drive.google.com/file/d/'+safe(data[i][0])+'/preview';
       //let url = 'https://lh3.googleusercontent.com/d/'+safe(data[i][0]);
       //let url = 'https://lh3.googleusercontent.com/d/'+safe(data[i][0])+'#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0';
       myviewer(url);         
    });
  }
  $$('.mybsmi-bukusaku').append('<div class="col-100 xsmall-75 small-50 medium-33 large-33 xlarge-33" ></div>');
  $$('.mybsmi-bukusaku').append('<div class="col-100 xsmall-75 small-50 medium-33 large-33 xlarge-33" ></div>');
}
///////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////
function myviewer(data)
{
  
    var dynamicPopup = app.popup.create({
      content: '<div class="popup" style="background:#fff">'+
      '<div class="block">'+
      
        '<iframe id="mybsmi-iframe" src="'+safe(data)+'" style="display: block;margin: auto;height: 80vh;width: 90%;object-fit: contain;background-image:none;background:#fff;"></iframe>'+
        '<div style="height:10vh;width:90vw;" class="text-align-center"><a href="#" class="item-link list-button actions-close popup-close">Tutup</a></div>'+
        
       '</div></div>',
    });     
    dynamicPopup.open();
    //$$('#mybsmi-iframe').attr('src',data);
    let mypreloader = app.dialog.preloader();
    setTimeout(function () {mypreloader.close();}, 3000);
}

function myviewer1(data)
{
  
  const para = document.createElement("div");
  para.innerHTML = '<div style="background: rgba(0, 0, 0, 0.8);position: fixed;z-index: 1000000000000000;align-items: center;justify-content: center;display: flex;bottom: 0;left: 0;right: 0;top: 0;"><iframe id="mybsmi-iframe" src="'+safe(data)+'" style="border-radius: 1em;display: block;margin: auto;height: 70vh;width: 90vw;object-fit: contain;background-image:none;background:#fff;"></iframe></div>';
  
  para.addEventListener("click",()=>{
    para.remove(); 
  })

  document.body.appendChild(para);
  //$$('#mybsmi-iframe').attr('src',data);

}

function myviewer2(data)
{
  
  const para = document.createElement("div");
  para.innerHTML = '<div style="background: rgba(0, 0, 0, 0.8);position: fixed;z-index: 1000000000000000;align-items: center;justify-content: center;display: flex;bottom: 0;left: 0;right: 0;top: 0;"><div class="paraxmark" style="width:50px;height:50px;background:#000;position:fixed;top:0px;right:0px;border-radius:50% 50% 50% 50%;margin:3px 3px;"><i class="icon f7-icons" style="font-size:50px;color:#fff;">xmark_circle</i></div><iframe id="mybsmi-iframe" src="'+safe(data)+'" style="border-radius: 0em;display: block;margin: 0px 0px;height: 100%;width: 100vw;object-fit: contain;background-image:none;background:none;border:none;"></iframe></div>';
  
  para.addEventListener("click",()=>{
    para.remove(); 
  })

  document.body.appendChild(para);
  //$$('#mybsmi-iframe').attr('src',data);
  
  $$('.paraxmark').css('cursor','pointer')

}
///////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////
function imagetosmall(file)
{
  return new Promise(function(myResolve, myReject) {
    if(file.size < 524288)return myResolve(file)
    var sizeInMB = (file.size / (1024*1024)).toFixed(2);
    console.log('size awal = '+sizeInMB)
    const blobURL = URL.createObjectURL(file);
    const img     = new Image();
    img.src       = blobURL;

    img.onerror = function () {
      URL.revokeObjectURL(this.src);
      // Handle the failure properly
      console.log("Cannot load image");
      return myReject()
    };
    
    img.onload = function () {
      if(img.width < 1000)return myResolve(file)
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const originalWidth = img.width;
      const originalHeight = img.height;
      const canvasWidth = 1000
      const canvasHeight = canvasWidth * (originalHeight / originalWidth);
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      context.drawImage(
        img,
        0,
        0,
        canvasWidth,
        canvasHeight
      );    
      const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
      var canvassizeInMB = (imageData.data.byteLength / (1024*1024)).toFixed(2);
      console.log('size akhir = '+canvassizeInMB)
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.addEventListener('loadend', () => {
          const arrayBuffer = reader.result;
          const blob = new Blob([arrayBuffer], {type: file.type});
          if(blob.size > file.size) return myResolve(file)
          return myResolve(blob)
        });
        reader.readAsArrayBuffer(blob);
      }, file.type);
    }
  });
}

function imagetosquare(file)
{
  return new Promise(function(myResolve, myReject) {
    var sizeInMB = (file.size / (1024*1024)).toFixed(2);
    console.log('size awal = '+sizeInMB)
    const blobURL = URL.createObjectURL(file);
    const img     = new Image();
    img.src       = blobURL;

    img.onerror = function () {
      URL.revokeObjectURL(this.src);
      // Handle the failure properly
      console.log("Cannot load image");
      return myReject()
    };
    
    img.onload = function () {

      //contains = false => cover
      function fit(contains,parentWidth, parentHeight, childWidth, childHeight, scale = 1, offsetX = 0.5, offsetY = 0.5) {
        const childRatio = childWidth / childHeight
        const parentRatio = parentWidth / parentHeight
        let width = parentWidth * scale
        let height = parentHeight * scale

        if (contains ? (childRatio > parentRatio) : (childRatio < parentRatio)) {
          height = width / childRatio
        } else {
          width = height * childRatio
        }

        return {
          width,
          height,
          offsetX: (parentWidth - width) * offsetX,
          offsetY: (parentHeight - height) * offsetY
        }
      }

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const originalWidth = img.width;
      const originalHeight = img.height;
      const canvasWidth = 1000
      const canvasHeight = 1000;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const {
        offsetX, 
        offsetY, 
        width, 
        height
      } = fit(false,canvasWidth, canvasHeight, originalWidth, originalHeight)

      context.drawImage(
        img,
        offsetX,
        offsetY,
        width,
        height
      );
          
      const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
      var canvassizeInMB = (imageData.data.byteLength / (1024*1024)).toFixed(2);
      console.log('size akhir = '+canvassizeInMB)
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.addEventListener('loadend', () => {
          const arrayBuffer = reader.result;
          const blob = new Blob([arrayBuffer], {type: file.type});
          return myResolve(blob)
        });
        reader.readAsArrayBuffer(blob);
      }, file.type);
    }
  });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////
function fpagesocial(run = true)
{
  if (typeof mybsmisocialdata === 'undefined' || mybsmisocialdata === null)
  {
      let mypreloader = app.dialog.preloader();
      app.request({
        url: apidataurl,
        method: 'POST',
        cache: false,
        data : { token:mybsmiusertoken, command: 'getsocialdata'}, 
        success: function (data, status, xhr)
          {
            mypreloader.close();
            var status = JSON.parse(data).status;
            var content = JSON.parse(data).data;
            if (status == "success")
            {
              //console.log(content);
              window.mybsmisocialdata = content;
              if (run) getsocialdatarun(content);
            }
            else if (status == "failed")
            {
              //console.log("failed");
              app.dialog.alert(content,'Terjadi Kesalahan');
            }
            else
            {
              //console.log("failed");
              //app.dialog.alert(content,'Terjadi Kesalahan');
              fcekexpiredtoken(content);
            }
          },
        error: function (xhr, status, message)
          {
            //console.log(message);
            mypreloader.close();
            app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
          },
      })
  }
  else
  {
    if (run) getsocialdatarun(mybsmisocialdata);
  }
}

function timeConverter(UNIX_timestamp){
  //var a = new Date(UNIX_timestamp * 1000);
  var a = new Date(UNIX_timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

async function getsocialdatarun(socialdata)
{
  //console.log(socialdata)
  $$('.mybsmi-social-content').html('')
  let usernama = dashboarddata.user.usernama
  let userphoto = dashboarddata.user.userphoto
  let useruid = dashboarddata.user.useruid
  let usermydata = JSON.parse(dashboarddata.user.usermydata)
  //console.log(usermydata)
  let placename = ''
  let city = ''
  let region = ''
  let latitude = ''
  let longitude = ''
  let last = ''
  if(usermydata.social){
    placename = usermydata.social.placename
	if(placename.includes("undefined")){
		const res = await fetch("https://freeipapi.com/api/json")
		const json = await res.json()
		placename = json.cityName+' , '+json.regionName
	}
    city = usermydata.social.city
    region = usermydata.social.region
    latitude = usermydata.social.latitude
    longitude = usermydata.social.longitude
    let date = usermydata.social.date
    let mytime = timeConverter(usermydata.social.time)
    last = 'Anda terakhir check-in '+relative_time(mytime)
  }else{
    placename = usermydata.geodata.city+' , '+usermydata.geodata.region
	if(placename.includes("undefined")){
		const res = await fetch("https://freeipapi.com/api/json")
		const json = await res.json()
		placename = json.cityName+' , '+json.regionName
	}
    city = usermydata.geodata.city
    region = usermydata.geodata.region
    latitude = usermydata.geodata.latitude
    longitude = usermydata.geodata.longitude
    last = 'Anda belum pernah check-in'
  }
  window.mybsmisocialplace = {placename,city,region,latitude,longitude}
  let header = '<div class="row bg-color-white margin-bottom" style="padding:10px 10px;">'+
                    '<div class="col-20">'+
                      '<div style="width:100%;aspect-ratio: auto 1 / 1;"><img class="social-avatar" src="avatar.png" style="width:100%;height:100%;aspect-ratio:1/1;object-fit:cover;"></div>'+
                    '</div>'+
                    '<div class="col-50">'+
                      '<span style="font-weight:bold;">'+safe(usernama)+'</span></br><span>@</span> <span>'+safe(placename)+'</span></br><span class="text-color-gray">'+last+'</span>'+
                    '</div>'+
                    '<div class="col-30">'+
                      '<button class="button button-fill mybsmi-social-checkin">Check-in</button>'+
                    '</div>'+
                '</div>'+
                '<div class="row margin-bottom"><div class="col-80"></div><div class="col-20"><a href="#" class="mybsmi-social-refresh" title="Refresh"><i class="icon f7-icons">arrow_clockwise_circle</i></a></div></div>'+
                '<div class="mybsmi-social-list"></div>'
  $$('.mybsmi-social-content').append(header)
  //let url = 'https://lh3.googleusercontent.com/d/'+safe(userphoto);
  let url = 'https://lh3.googleusercontent.com/d/'+safe(userphoto);
  $$('.social-avatar').attr('src',url);

  $$('.mybsmi-social-checkin').on('click', function () {
	if (dashboarddata.user.userphoto !== ''){
		fsocialcheckin(window.mybsmisocialplace)
	}else{
		flengkapidata();
	}
  })

  $$('.mybsmi-social-refresh').on('click', function () {
    mybsmisocialdata = null
    fpagesocial()
  })
  
  //socialdata.reverse()
  
  socialdata.forEach(function(arr,index){
        //console.log(index)
        //console.log(arr)
        if(arr[2]=='Id')return
		
		if (!isLocal && skipuid.includes(arr[6]))return
        
        if(arr[3]==''){
        
            let date = timeConverter(arr[1])
            
            let img = ''
            if(arr[10]!=''){
              img = '<div class="margin-right" style="width:50%;aspect-ratio: auto 1 / 1;float:left;"><img class="social-photo" src="avatar.png" style="width:100%;height:100%;aspect-ratio:1/1;object-fit:cover;"></div>'
            }
            
            let item = '<div class="row margin-bottom padding-top item-'+safe(arr[2])+'" style="border-style:inset hidden hidden hidden">'+
                            '<div class="col-20">'+
                                '<div style="width:100%;aspect-ratio: auto 1 / 1;"><a href="/relawan/'+safe(arr[6])+'"><img class="social-avatar" src="avatar.png" style="width:100%;height:100%;aspect-ratio:1/1;object-fit:cover;"></a></div>'+
                            '</div>'+
                            '<div class="col-80">'+
                                  '<div class="row">'+
                                        '<div class="col-100 margin-bottom">'+img+
                                              '<a href="/relawan/'+safe(arr[6])+'"><span style="font-weight:bold;">'+safe(arr[4])+'</span></a> : <span>'+safe(arr[9])+'</span>'+
                                        '</div>'+
                                        '<div class="col-100 text-color-gray margin-bottom" style="font-size:12px">'+
                                            '<div class="row">'+
                                                '<div class="col-70 medium-80">'+
                                                  '<span class="text-color-gray">@ '+safe(arr[11])+'</span> - '+relative_time(date)+' via '+safe(arr[14])+
                                                '</div>'+
                                                '<div class="col-30 medium-20">'+
                                                  '<span class="add-comment-'+safe(arr[2])+'" data-id="'+safe(arr[2])+'"><i class="icon f7-icons size-10 color-red">bubble_left_fill</i> Komentar</span>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="col-100 margin-bottom comment">'+
                                        '</div>'+
                                  '</div>'+
                            '</div>'+
                        '</div>'
            $$('.mybsmi-social-list').prepend(item)
            let url = 'https://lh3.googleusercontent.com/d/'+safe(arr[8]);
            $$('.item-'+safe(arr[2])+' .social-avatar').attr('src',url);
            if(arr[10]!=''){
              let url = 'https://lh3.googleusercontent.com/d/'+safe(arr[10]);
              $$('.item-'+safe(arr[2])+' .social-photo').attr('src',url);
              $$('.item-'+safe(arr[2])+' .social-photo').on('click', function () {
                myimage(this);
              })
              $$('.item-'+safe(arr[2])+' .social-photo').css("cursor","pointer");
            }
            $$('.add-comment-'+safe(arr[2])).css("cursor","pointer");
            $$('.add-comment-'+safe(arr[2])).on('click', function () {
              let id = $$(this).data('id')
              faddkomentarcheckin(window.mybsmisocialplace,id)
            })
            
        }else{
        
            let repplytoid = arr[3]
            let date = timeConverter(arr[1])
            
            let item = '<div class="row margin-bottom padding-top padding-left padding-right item-'+safe(arr[2])+'" style="border-style:inset hidden hidden hidden">'+
                            '<div class="col-20">'+
                                '<div style="width:100%;aspect-ratio: auto 1 / 1;"><a href="/relawan/'+safe(arr[6])+'"><img class="social-avatar" src="avatar.png" style="width:100%;height:100%;aspect-ratio:1/1;object-fit:cover;"></a></div>'+
                            '</div>'+
                            '<div class="col-80">'+
                                  '<div class="row">'+
                                        '<div class="col-100 margin-bottom">'+
                                              '<a href="/relawan/'+safe(arr[6])+'"><span style="font-weight:bold;">'+safe(arr[4])+'</span></a> : <span>'+safe(arr[9])+'</span>'+
                                        '</div>'+
                                        '<div class="col-100 text-color-gray margin-bottom" style="font-size:12px">'+
                                            '<div class="row">'+
                                                '<div class="col-100">'+
                                                  '<span class="text-color-gray">@ '+safe(arr[11])+'</span> - '+relative_time(date)+' via '+safe(arr[14])+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                  '</div>'+
                            '</div>'+
                        '</div>'
            $$('.item-'+repplytoid+' .comment').append(item)
            let url = 'https://lh3.googleusercontent.com/d/'+safe(arr[8]);
            $$('.item-'+safe(arr[2])+' .social-avatar').attr('src',url);
        }
  })
}


function fsocialcheckin(social)
{
  if (dashboarddata.user.userphoto === ''){flengkapidata();return;}
  var dialog = app.dialog.create({
    title: 'Optional',
    closeByBackdropClick: false,
    destroyOnClose: true,
    content: '<div style="width:100%;max-height:60vh;overflow:auto;">'
      +'<form id="mybsmi-socialcheckin-form" runat="server" style="display:flex;flex-direction:column;align-items:left;justify-content: left;">'
      +'  <div class="margin-top">'
      +'      <span>Check-in @ '+safe(social.placename)+'</span> <a href="#" class="button display-inline mybsmi-change-place">Update Lokasi</a>'
      +'  </div>'
      +'  <div class="list no-hairlines-md" style="width:100%">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <textarea name="deskripsi" placeholder="Sedang apa?" validate></textarea>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'  <div class="accordion-item">'
      +'      <div class="accordion-item-toggle"><i class="f7-icons size-12">camera</i> Tambah photo</div>'
      +'      <div class="accordion-item-content">'
      +'        <img id="mybsmisocialcheckinphotopreview" src="photo.svg" style="width:200px;height:150px;margin: 10px 10px;object-fit: contain;">'
      +'        <input accept="image/jpeg" type="file" name="mybsmisocialcheckinuploadphoto" id="mybsmisocialcheckinuploadphoto" validate/>'
      +'      </div>'
      +'  </div>'
      +'</form>'
      +'</div>',
    on: {
      opened: function (dialog,e) {       
          mybsmisocialcheckinuploadphoto.onchange = evt => {
            let [file] = mybsmisocialcheckinuploadphoto.files
            if (file) {
              if (file.size > 10485760) //10MB
              {
                //app.dialog.alert('File tidak boleh lebih dari 500 KB','Terjadi Kesalahan');
                var toastBottom = app.toast.create({ text: 'File tidak boleh lebih dari 10 MB', closeTimeout: 5000,position: 'center', });toastBottom.open();
                mybsmisocialcheckinuploadphoto.value = '';
                mybsmisocialcheckinphotopreview.src = 'photo.svg'
              }
              else
              {
                mybsmisocialcheckinphotopreview.src = URL.createObjectURL(file)
              }
            }
            else
            {
              mybsmisocialcheckinphotopreview.src = 'photo.svg'
            }
          }
          $$('.mybsmi-change-place').on('click', function () {
            dialog.close()
            fdeteksilokasi()
          })
          $$('#mybsmi-socialcheckin-form .accordion-item-toggle').on('click', function () {
            $$('#mybsmi-socialcheckin-form #mybsmisocialcheckinuploadphoto').click()
          })
          $$('#mybsmi-socialcheckin-form #mybsmisocialcheckinphotopreview').on('click', function () {
            $$('#mybsmi-socialcheckin-form #mybsmisocialcheckinuploadphoto').click()
          })
      }
    },
    buttons: [
      {
        text: 'Nanti Saja',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {
          }
      },
      {
        text: 'CHECK-IN',
        close:true,
        onClick: function(dialog, e)
          {            
            let [file] = mybsmisocialcheckinuploadphoto.files
            if (file) {
              if (!$$('#mybsmi-socialcheckin-form')[0].checkValidity()) {
                    //console.log('Check Validity!');
                    return;
              }
              //var dataform = JSON.stringify(app.form.convertToData('#mybsmi-socialcheckin-form'));//console.log(dataform);
              var dataform = app.form.convertToData('#mybsmi-socialcheckin-form')
              const blob = imagetosmall(file)
              blob.then((value)=>{
                const fr = new FileReader();
                fr.onload = function(e) {
                  const obj = {
                    filename: file.name,
                    mimeType: file.type,
                    bytes: [...new Int8Array(e.target.result)],
                    data: dataform,
                    photo:true,
                    social:social
                  };
                  fsocialgetgeodata(obj);
                };
                fr.readAsArrayBuffer(value);
              })
            }
            else
            {
                if (!$$('#mybsmi-socialcheckin-form')[0].checkValidity()) {
                      //console.log('Check Validity!');
                      return;
                }
                //var dataform = JSON.stringify(app.form.convertToData('#mybsmi-socialcheckin-form'));
                var dataform = app.form.convertToData('#mybsmi-socialcheckin-form')              
                const obj = {
                  data: dataform,
                  photo:false,
                  social:social
                };
                fsocialgetgeodata(obj);
            }
          }
      },
    ]
  });
  dialog.open();
}

function fdeteksilokasi()
{
        let mypreloader = app.dialog.preloader('Deteksi Lokasi');
        app.request({
          url: 'https://get.geojs.io/v1/ip/geo.json',
          method: 'GET',
          cache: false, 
          success: function (data, status, xhr)
            {
              //console.log('geodata1',data);
              mypreloader.close();
              let json = JSON.parse(data)
              if(json.city == undefined || json.region == undefined){
				  fdeteksilokasiupdate(json)
			  }else{
				  fgantilokasi(json)
			  }
            },
          error: function (xhr, status, message)
            {
              //console.log(message);
              mypreloader.close();
              app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
            },
        })
}

function fdeteksilokasiupdate(geodata)
{
        let mypreloader = app.dialog.preloader('Deteksi Lokasi');
        app.request({
          url: 'https://freeipapi.com/api/json',
          method: 'GET',
          cache: true, 
          success: function (data, status, xhr)
            {
              //console.log('geodata2',data);
              mypreloader.close();
              let json = JSON.parse(data)
			  geodata.city = json.cityName
			  geodata.region = json.regionName
			  geodata.latitude = json.latitude
			  geodata.longitude = json.longitude
              fgantilokasi(geodata)
            },
          error: function (xhr, status, message)
            {
              //console.log(message);
              mypreloader.close();
              app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
            },
        })
}

function fgantilokasi(data)
{
      let placename = data.city+' , '+data.region
      let city = data.city
      let region = data.region
      let latitude = data.latitude
      let longitude = data.longitude
      var dialog = app.dialog.create({
        content:''////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          +'<div style="width:100%;">'
          +'  <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'
          +'      <p class="lokasi-city">'+safe(placename)+'</p>'
          +'      <div style="width:100%;aspect-ratio:1/1;"><iframe class="lokasi-map" src="https://mybsmi.netlify.app/map.html?latitude='+safe(latitude)+'&longitude='+safe(longitude)+'" width="100%" height="100%"></iframe><div style="width:40px;height:40px;position:relative;right:0px;bottom:60px;background:white;float:right;border-radius: 50%;display:flex;flex-direction:column;align-items:center;justify-content: center;" class="open-gps"><i class="icon f7-icons size-25 color-blue">scope</i></div></div>'
          +'      <div class="data-table"></div>'
          +'  </div>'
          +'</div>',//////////////////////////////////////////////////////////////////////////////////////////////////
        closeByBackdropClick: false,
        destroyOnClose: true,
        verticalButtons: false,
        title: 'Lokasi',
        on: {
          opened: function () {
              //console.log('Dialog opened')
              $$('.open-gps').css("cursor","pointer");
              $$('.open-gps').on('click', function () {
                    var reverseGeocoder=new BDCReverseGeocode();
                    reverseGeocoder.getClientCoordinates(function(result) {
                        console.log(result);                    
                    });
                    reverseGeocoder.getClientLocation(function(result) {
                        console.log(result);
                        let data = result
						let administrative = data.localityInfo.administrative
						let mycity = administrative.find(item => item.adminLevel === 5)
						if(mycity == undefined){mycity = data.city}else{mycity = mycity.name}
						let myregion = administrative.find(item => item.adminLevel === 4)
						if(myregion == undefined){myregion = data.principalSubdivision}else{myregion = myregion.name}
                        placename = mycity+' , '+myregion
                        city = mycity
                        region = myregion
                        latitude = data.latitude
                        longitude = data.longitude
                        $$('.lokasi-map').attr('src','https://mybsmi.netlify.app/map.html?latitude='+safe(latitude)+'&longitude='+safe(longitude))
                        $$('.lokasi-city').html(safe(placename))
                    });
                    reverseGeocoder.localityLanguage='id';

              })            
				navigator.permissions.query({ name: "geolocation" }).then((result) => {
					//console.log('state',result.state)
					if (result.state === "granted") {
						$$('.open-gps').click()
					}
					result.onchange = () => {
						 console.log(
							`geolocation permission state has changed to ${result.state}`,
						)
						if (result.state === "granted") {
							$$('.open-gps').click()
						}
					}
				})
          }
        },
        buttons: [
          {
            text: 'Batal',
            close:true,
            color: 'gray',
            onClick: function(dialog, e)
              {
                  fsocialcheckin(window.mybsmisocialplace)
              }
          },
          {
            text: 'Update',
            close:true,
            color: 'red',
            onClick: function(dialog, e)
              {
                  window.mybsmisocialplace = {placename,city,region,latitude,longitude}
                  fsocialcheckin(window.mybsmisocialplace)
              }
          },
        ]
      });
      dialog.open();
}

function faddkomentarcheckin(social,id)
{
  if (dashboarddata.user.userphoto === ''){flengkapidata();return;}
  var dialog = app.dialog.create({
    title: 'Komentar',
    closeByBackdropClick: false,
    destroyOnClose: true,
    content: '<div style="width:100%;overflow:auto;">'
      +'<form id="mybsmi-socialcheckin-form" runat="server" style="display:flex;flex-direction:column;align-items:center;justify-content: center;">'

      +'  <div class="list no-hairlines-md" style="width:100%">'
      +'    <ul>'
      +'        <li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap">'
      +'            <textarea name="deskripsi" placeholder="Tulis komentar disini" required validate></textarea>'
      +'            </div></div>'
      +'        </li>'
      +'    </ul>'
      +'  </div>'
      +'</form>'
      +'</div>',
    on: {
      opened: function () {       
      }
    },
    buttons: [
      {
        text: 'Nanti Saja',
        close:true,
        color: 'gray',
        onClick: function(dialog, e)
          {
          }
      },
      {
        text: 'Kirim',
        close:true,
        onClick: function(dialog, e)
          {            
                if (!$$('#mybsmi-socialcheckin-form')[0].checkValidity()) {
                      //console.log('Check Validity!');
                      var toastBottom = app.toast.create({ text: 'Isi kolom komentar', closeTimeout: 5000,position: 'center', });toastBottom.open();
                      return;
                }
                //var dataform = JSON.stringify(app.form.convertToData('#mybsmi-socialcheckin-form'));
                var dataform = app.form.convertToData('#mybsmi-socialcheckin-form')              
                const obj = {
                  data: dataform,
                  photo:false,
                  social:social,
                  repplyto:id
                };
                fsocialgetgeodata(obj);
          }
      },
    ]
  });
  dialog.open();
}

function fsocialgetgeodata(obj)
{
        let mypreloader = app.dialog.preloader();
        app.request({
          url: 'https://get.geojs.io/v1/ip/geo.json',
          method: 'GET',
          cache: false, 
          success: function (data, status, xhr)
            {
              //console.log(data);
              mypreloader.close();
              fkirimbuatcheckin(obj,data)
            },
          error: function (xhr, status, message)
            {
              //console.log(message);
              mypreloader.close();
              app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
            },
        })
}

function fkirimbuatcheckin(obj,geodata)
{
  console.log(obj);
  var data = JSON.stringify(obj);
  const os = detectOS();
  let mypreloader = app.dialog.preloader();
  app.request({
    url: apidataurl,
    method: 'POST',
    cache: false,
    data : { token:mybsmiusertoken, command: 'buatsocialcheckin', data: data, geodata:geodata,os:os}, 
    success: function (data, status, xhr)
      {
        mypreloader.close();        
        var status = JSON.parse(data).status;
        var content = JSON.parse(data).data;
        if (status == "success")
        {
          console.log(content)
          const d = new Date();
          let time = d.getTime();
          let usermydata = JSON.parse(dashboarddata.user.usermydata)
          usermydata.social = obj.social
          usermydata.social.time = time
          usermydata.social.date = d.toUTCString()
          usermydata = JSON.stringify(usermydata)
          if(!obj.repplyto)dashboarddata.user.usermydata = usermydata
          var toastBottom = app.toast.create({ text: 'Berhasil', closeTimeout: 5000,position: 'center', });toastBottom.open();
          $$('.mybsmi-social-refresh').click()
		  dapatbintang(1);
        }
        else if (status == "failed")
        {
          app.dialog.alert(content,'Terjadi Kesalahan');
        }
        else
        {
          fcekexpiredtoken(content);
        }
      },
    error: function (xhr, status, message)
      {
        //console.log(message);
        mypreloader.close();
        app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
      },
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////////////////////
function fpagedokumen(run = true){
    if (typeof mybsmidokumendata === 'undefined' || mybsmidokumendata === null)
    {
        var api = "https://cors.bsmijatim.workers.dev/?";
        var sourcedokumen = [
            {jenis:"sertifikatmybsmi",sheeturl:"https://docs.google.com/spreadsheets/d/e/2PACX-1vT4LuWDBXuIFxrvHtpl1m2gqb65LUr-ch0NjGCXW7_I4Z7BYttMP90xkR_rSlQNprdCXV2IH09B9pIR/pub?gid=0&single=true&output=csv",tanggal:0,uid:4,kode:8,judul:9,index:16,nomor:17,fileid:19,download:20}
          ]
        var allrequest = []
        sourcedokumen.forEach(function(arr,index){
            let request =       fetch(api+arr.sheeturl)
                                .then(response => response.text())
                                .then(async(response) => {
                                    sourcedokumen[index].data = response
                                })
            allrequest.push(request)
        })
        try{
          Promise.all(allrequest)
          .then(results => {
              console.log('ok')
              console.log(sourcedokumen)
              window.mybsmidokumendata = sourcedokumen;
              if (run) getdokumendatarun(sourcedokumen);
           });
        }catch {
              console.log('error')
        }
    }
    else
    {
        if (run) getdokumendatarun(mybsmidokumendata);
    }
}

function CSVToArray( strData, strDelimiter ){
        strDelimiter = (strDelimiter || ",");
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
            );
        var arrData = [[]];
        var arrMatches = null;
        while (arrMatches = objPattern.exec( strData )){
            var strMatchedDelimiter = arrMatches[ 1 ];
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
                ){
                arrData.push( [] );

            }

            var strMatchedValue;
            if (arrMatches[ 2 ]){
                strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                    );

            } else {
                strMatchedValue = arrMatches[ 3 ];

            }

            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }
        return( arrData );
}

function getdokumendatarun(dokumen){
    
    let hasil = []
    dokumen.forEach(function(arr,index){
        let data = CSVToArray(arr.data)
        data = data.filter((sertifikat) => sertifikat[arr.uid]==dashboarddata.user.useruid);
        console.log(data)
        data.forEach(function(ser,idx){
            let tanggal = ser[arr.tanggal]
            let judul = ser[arr.judul]
            let download = ser[arr.download]
            let fileid = ser[arr.fileid]
            hasil.push({tanggal,judul,download,fileid})
        })
    })
    hasil.sort(function(a, b){return new Date(a.tanggal) - new Date(b.tanggal)});
    
    
    let tabel = '<div class="card data-table">'+
                    '<table><thead><tr><th>Judul</th><th>File</th></tr></thead><tbody>'
    
    hasil.forEach(function(arr,index){
          if(arr.download == '')return
          //tabel += '<tr class="download-item"><td>'+safe(arr.judul)+'</td><td><a class="link" href="#" data-url="'+arr.download+'" target="_blank">View</a></td></tr>'
          tabel += '<tr class="download-item"><td>'+safe(arr.judul)+'</td><td><a class="link" href="#" data-id="'+arr.fileid+'" data-url="'+arr.download+'" target="_blank">View</a></td></tr>'
    })                
    tabel += '</tbody></table></div>'
    $$('.mybsmi-dokumen').html(tabel)
    $$('.download-item a').on('click', function (e) {
        let id = $$(this).data('id')
        let url = 'https://drive.google.com/file/d/'+id+'/preview'
        myviewer(url);
    });    
}
//////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////
const eventScraper = 3
var eventstartIndex = 1
var eventmaxResults = eventScraper
function fpageevent(first = true){
	if(first){
		eventstartIndex = 1
		eventmaxResults = eventScraper
	}
	const api = "https://cors.bsmijatim.workers.dev/?";
	const url = "https://www.bsmijatim.org/feeds/posts/default/-/Event?alt=json&orderby=published&start-index=" + eventstartIndex + "&max-results=" + eventmaxResults;
	fetch(api+url)
	.then(response => response.json())
	.then(async(response) => {
		//console.log('response',response)
		if(first){$$('.mybsmi-event').html("")}
		fpageeventrun(response)
	})
	eventstartIndex += eventScraper;
	
	$$('.mybsmi-event-more').css('cursor','pointer')
	$$('.mybsmi-event-more').off('click')
	$$('.mybsmi-event-more').on('click', function (e) {
		fpageevent(false)
	})	
}
function fpageeventrun(data){
	data.feed.entry.forEach(function(arr,index){
		const title = arr.title.$t
		const thumb = arr.media$thumbnail.url
		const content = arr.content.$t
		const link = arr.link.find((item) => item.rel == "alternate").href
		//console.log("link",link)
		let html = '<div class="card" data-url="'+link+'">'+
						'<div class="card-header">'+safe(title)+'</div>'+
						'<div class="card-content card-content-padding">'+content+'</div>'+
						'<div class="card-footer">'+
					'</div>'
		$$('.mybsmi-event').append(html)
	})
	//$$('.mybsmi-event a').each(a => a.outerHTML = a.innerHTML)
	$$('.mybsmi-event a').each(a => $$(a).addClass('external'))
	$$('.mybsmi-event a').each(a => $$(a).addClass('openinbrowser'))
	//$$('.mybsmi-event .card').css('cursor','pointer')
	$$('.mybsmi-event .card img').css('max-width','100%')
	$$('.mybsmi-event .card').on('click', function (e) {
		const url = $$(this).attr('data-url')
		//console.log('url',url)
		//window.open(url,'_system', 'location=yes')
	})
	$$('.mybsmi-event .card .openinbrowser').off('click')
	$$('.mybsmi-event .card .openinbrowser').on('click', function (e) {
		e.preventDefault()
		const url = $$(this).attr('href')
		console.log('url',url)
		if(url.includes('/img/')){
			var photoBrowser = app.photoBrowser.create({
			  photos: [
				url
			  ],
			  routableModals:true
			});
			photoBrowser.open()
		}else{
			app.dialog.confirm('Buka link di browser','Link', ()=>{
				window.open(url,'_system', 'location=yes')
			})
		}
	})
}
///////////////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////////////////////
const feedsScraper = 3
var feedsstartIndex = 1
var feedsmaxResults = feedsScraper
function fpagefeeds(first = true){
	if(first){
		feedsstartIndex = 1
		feedsmaxResults = feedsScraper
	}
	const api = "https://cors.bsmijatim.workers.dev/?";
	const url = "https://www.bsmijatim.org/feeds/posts/default?alt=json&orderby=published&start-index=" + feedsstartIndex + "&max-results=" + feedsmaxResults;
	fetch(api+url)
	.then(response => response.json())
	.then(async(response) => {
		//console.log('response',response)
		if(first){$$('.mybsmi-feeds').html("")}
		fpagefeedsrun(response)
	})
	feedsstartIndex += feedsScraper;
	
	$$('.mybsmi-feeds-more').css('cursor','pointer')
	$$('.mybsmi-feeds-more').off('click')
	$$('.mybsmi-feeds-more').on('click', function (e) {
		fpagefeeds(false)
	})	
}
function fpagefeedsrun(data){
	data.feed.entry.forEach(function(arr,index){
		const title = arr.title.$t
		const thumb = arr.media$thumbnail.url
		const content = arr.content.$t
		const link = arr.link.find((item) => item.rel == "alternate").href
		//console.log("link",link)
		let html = '<div class="card" data-url="'+link+'">'+
						'<div class="card-header">'+safe(title)+'</div>'+
						'<div class="card-content card-content-padding">'+content+'</div>'+
						'<div class="card-footer">'+
					'</div>'
		$$('.mybsmi-feeds').append(html)
	})
	//$$('.mybsmi-feeds a').each(a => a.outerHTML = a.innerHTML)
	$$('.mybsmi-feeds a').each(a => $$(a).addClass('external'))
	$$('.mybsmi-feeds a').each(a => $$(a).addClass('openinbrowser'))
	//$$('.mybsmi-feeds .card').css('cursor','pointer')
	$$('.mybsmi-feeds .card img').css('max-width','100%')
	$$('.mybsmi-feeds .card img').css('display','flex')
	$$('.mybsmi-feeds .card').on('click', function (e) {
		const url = $$(this).attr('data-url')
		console.log('url',url)
		//window.open(url,'_system', 'location=yes')
	})
	$$('.mybsmi-feeds .card .openinbrowser').off('click')
	$$('.mybsmi-feeds .card .openinbrowser').on('click', function (e) {
		e.preventDefault()
		const url = $$(this).attr('href')
		console.log('url',url)
		if(url.includes('/img/')){
			var photoBrowser = app.photoBrowser.create({
			  photos: [
				url
			  ],
			  routableModals:true
			});
			photoBrowser.open()
		}else{
			app.dialog.confirm('Buka link di browser','Link', ()=>{
				window.open(url,'_system', 'location=yes')
			})
		}
	})
}
///////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////
const majalahScraper = 3
var majalahIndex = 0
function fpagemajalah(){
	majalahIndex = 0
	if (typeof mybsmimajalahdata === 'undefined' || mybsmimajalahdata === null){
		const api = "https://cors.bsmijatim.workers.dev/?"
		const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTZEiolmUm4E-2v6CORSzS9KYl_qt0wFPoseFY3dlParwWtDW10xZIJLLVVpnHbw0TDzV2BjB9y84l4/pub?output=csv"
		fetch(api+url)
		.then(response => response.text())
		.then(async(response) => {
			//console.log('response',response)
			const majalah = CSVToArray(response)
			window.mybsmimajalahdata = majalah
			$$('.mybsmi-majalah').html("")
			fpagemajalahquery()
		})
	}else{
		$$('.mybsmi-majalah').html("")
		fpagemajalahquery()
	}

	$$('.mybsmi-majalah-more').css('cursor','pointer')
	$$('.mybsmi-majalah-more').off('click')
	$$('.mybsmi-majalah-more').on('click', function (e) {
		fpagemajalahquery()
	})
}

function fpagemajalahquery(){
	const data = mybsmimajalahdata
	for (var i = data.length-1-majalahIndex ; i > data.length-1-(majalahScraper+majalahIndex)  ; i--) {
		if (i < 1){break}
		const edisi = data[i][0]
		const bulan = data[i][1]
		const tahun = data[i][2]
		const id = data[i][3]
		const link = "https://www.bsmijatim.org/p/majalah.html?fileid="+safe(id)
		const html = 	'<div class="col-100 xsmall-75 small-50 medium-33 large-33 xlarge-33">'+
							'<div class="card mybsmi-majalah-item-'+safe(id)+'" data-url="'+link+'" data-id="'+safe(id)+'">'+
								'<div class="card-header no-padding" style="overflow:hidden;"><img src="photo.svg" style="width:100%;aspect-ratio: 1 / 1.5;object-fit:cover;"></div>'+
								'<div class="card-content card-content-padding">'+
									'<div style="font-weight:bold;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">Edisi '+safe(edisi)+' - '+bulan+' '+tahun+'</div>'
								'</div>'+
							'</div>'+
						'</div>'
		$$('.mybsmi-majalah').append(html)
		const img = 'https://lh3.googleusercontent.com/d/'+safe(id);
		$$('.mybsmi-majalah-item-'+id+' img').attr('src',img)
	}
	majalahIndex += majalahScraper
	
	$$('.mybsmi-majalah .card').css('cursor','pointer')
	$$('.mybsmi-majalah .card').on('click', function (e) {
		//const url = $$(this).attr('data-url')
		//console.log('url',url)
		//window.open(url,'_system', 'location=yes')
		//myviewer2('https://mybsmi.netlify.app/')
		const id = $$(this).attr('data-id')
		const url = 'https://mybsmi.netlify.app/app/pdfflipbook/gdrivepdf.html?fileid='+id
		myviewer2(url)
	})
}
///////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////
var materiPrevFolder = []

function fpagemateri(){
	materiPrevFolder = []
	if (typeof mybsmimateridata === 'undefined' || mybsmimateridata === null){
		window.mybsmimateridata = []
	}
	const parrentId = "1sxqQcTCI-ZCs1ogwhDvf_lIDixO3go4D"
	fmaterigetfolder(parrentId)
}

function fmaterigetfolder(parrentId){
	$$('.mybsmi-materi').html("")
	
	const find = mybsmimateridata.find((item)=>item.parrentId == parrentId)
	
	if(find == undefined){
		const api = "https://cors.bsmijatim.workers.dev/?"
		const url = "https://drive.google.com/embeddedfolderview?id="+parrentId
		$$('.mybsmi-materi').html('<div class="progressbar-infinite"></div>')
		fetch(api+url)
		.then(response => response.text())
		.then(async(response) => {
			$$('.mybsmi-materi').html('')
			const folders = {parrentId,response}
			mybsmimateridata.push(folders)
			fmateriparse(parrentId,response)
		})
	}else{
		const parrentId = find.parrentId
		const response = find.response
		fmateriparse(parrentId,response)
	}
}

function fmateriparse(parrentId,response){
	const parser = new DOMParser();
	const htmlDoc = parser.parseFromString(response, 'text/html');
	if(materiPrevFolder.length > 0){
		//console.log('materiPrevFolder1',materiPrevFolder)
		const id = materiPrevFolder.slice(-1)
		let prev = ""
		if(materiPrevFolder.length > 0){
			//console.log('materiPrevFolder2',materiPrevFolder)
			prev = materiPrevFolder.slice(-1)
		}
		fmateriadditem(id,"UP ...","up",prev)
	}
	let arr = []
	$$('.flip-entry',htmlDoc).each((html)=>{
		arr.push(html)
	})
	arr.reverse()
	arr.forEach((html)=>{
		const id = $$(html).attr('id').replace("entry-","")
		const title = ($$('.flip-entry-title',html))[0].innerText
		const a = $$('a',html)[0]
		const link = $$(a).attr('href')
		let type = ""
		if(link.includes("/folders/"))type = "folders"
		if(link.includes("/file/"))type = "file"
		fmateriadditem(id,title,type,parrentId)
	})
}

function fmateriadditem(id,title,type,parrentId){
	if(type=="file"){
		const html = 	'<div class="col-100 xsmall-75 small-50 medium-33 large-33 xlarge-25">'+
							'<div class="card mybsmi-materi-item-'+id+'" data-id="'+id+'">'+
								'<div class="card-header no-padding" style="overflow:hidden;"><img src="photo.svg" style="width:100%;aspect-ratio: 1.5 / 1;object-fit:cover;"></div>'+
								'<div class="card-content card-content-padding">'+
									'<div style="font-weight:bold;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">'+safe(title)+'</div>'
								'</div>'+
							'</div>'+
						'</div>'
		$$('.mybsmi-materi').append(html)
		const img = 'https://lh3.googleusercontent.com/d/'+safe(id);
		$$('.mybsmi-materi-item-'+id+' img').attr('src',img)
		$$('.mybsmi-materi-item-'+id).on('click', function (e) {
			let id = $$(this).data('id')
			let url = 'https://drive.google.com/file/d/'+id+'/preview'
			myviewer(url);
		});
		$$('.mybsmi-materi-item-'+id).css('cursor','pointer')
	}
	if(type=="folders" || type=="up"){
		const html = 	'<div class="col-100 xsmall-75 small-50 medium-33 large-33 xlarge-25">'+
							'<div class="card mybsmi-materi-item-'+id+'" data-id="'+id+'" data-type="'+type+'">'+
								'<div class="card-header no-padding" style="overflow:hidden;"><div class="padding" style="width:100%;aspect-ratio: 1.5 / 1;overflow: hidden;text-overflow: ellipsis;white-space: wrap;"><i class="icon f7-icons color-red" style="font-size:5em">folder_fill</i></br>'+title+'</div></div>'+
								'<div class="card-content card-content-padding">'+
									'<div style="font-weight:bold;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">Folder</div>'
								'</div>'+
							'</div>'+
						'</div>'
		$$('.mybsmi-materi').append(html)
		$$('.mybsmi-materi-item-'+id).on('click', function (e) {
			let type = $$(this).data('type')
			if(type == "up"){
				materiPrevFolder.splice(-1)
			}else{
				if(parrentId != "")materiPrevFolder.push(parrentId)
			}
			let id = $$(this).data('id')

			fmaterigetfolder(id)
		});
		$$('.mybsmi-materi-item-'+id).css('cursor','pointer')
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////
async function fpagemusprov4voting20bacalon(){
	const limit = 20
	let terpilih = 0
	const res = await fetch('datajson.json')
	const json = await res.json()
	const bakalcalonpengurus20252030 = json.bakalcalonpengurus20252030
	for(let i=0;i<bakalcalonpengurus20252030.length;i++){
		let html = `
							  <li>
								<label class="item-checkbox item-checkbox-icon-start item-content">
								  <input type="checkbox" name="${i}" value="${i}" />
								  <i class="icon icon-checkbox"></i>
								  <div class="item-inner">
									<div class="item-title" style="white-space: normal;overflow: auto;">${bakalcalonpengurus20252030[i]}</div>
								  </div>
								</label>
							  </li>
		`
		$$('#musprov4voting20bacalon #formulir ul').append(html)
	}
	
	$$('#musprov4voting20bacalon #formulir ul li input').on("click",(e)=>{

		const check = e.target.checked
		if(check){
			if(terpilih == limit){
				e.target.checked = false
				return
			}
			terpilih++
			$$('#musprov4voting20bacalon .terpilih').text(terpilih)
		}else{
			terpilih--
			$$('#musprov4voting20bacalon .terpilih').text(terpilih)
		}



	})	
	
	$$('#musprov4voting20bacalon #submitvoting').on("click",(e)=>{
		
		if(terpilih < limit){
			var toastBottom = app.toast.create({ text: 'Pilih '+limit+' nama', closeTimeout: 5000,position: 'center', });toastBottom.open();
			return
		}
		
		let list = []
		
		if(terpilih == limit){
			var dataform = app.form.convertToData('#musprov4voting20bacalon #formulir')
			const keys = Object.keys(dataform)
			for(const key of keys){
				const data = dataform[key]
				if(data.length > 0){
					const value = data[0]
					list.push(value)
				}
			}
		}
		
		fSubmitmusprov4voting20bacalon(JSON.stringify(list))
	})
	
	CountDownTimer('11/9/2024 11:30 PM', 'countdownbakal')
}
function fSubmitmusprov4voting20bacalon(list){
  let mypreloader = app.dialog.preloader();
  app.request({
    url: apidataurl,
    method: 'POST',
    cache: false,
    data : { token:mybsmiusertoken, command: 'submitmusprov4voting20bacalon', list}, 
    success: function (data, status, xhr)
      {
        mypreloader.close();        
        var status = JSON.parse(data).status;
        var content = JSON.parse(data).data;
        if (status == "success")
        {
          console.log(content)
          var toastBottom = app.toast.create({ text: 'Berhasil dikirim', closeTimeout: 5000,position: 'center', });toastBottom.open();
		  //dapatbintang(10);
		  let url = "/hasilvoting/";
		  app.views.main.router.navigate(url);
        }
        else if (status == "failed")
        {
          app.dialog.alert(content,'Terjadi Kesalahan');
        }
        else
        {
          fcekexpiredtoken(content);
        }
      },
    error: function (xhr, status, message)
      {
        //console.log(message);
        mypreloader.close();
        app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
      },
  });
}
async function fpagemusprov4voting20bacalonhasil(){
			let mypreloader = app.dialog.preloader();
			app.request({
			  url: apidataurl,
			  method: 'GET',
			  cache: false,
			  data : { command: 'getmusprov4voting20bacalon'}, 
			  success: async function (data, status, xhr)
				{
				  //console.log(data);
				  mypreloader.close();

				  var status = JSON.parse(data).status;
				  var data = JSON.parse(data).data;
				  if (status == "success")
				  {
					  let dataall = []
					  for(const item of data[0]){
						  const json = JSON.parse(item)
						  dataall = dataall.concat(json)
					  }
					  const res = await fetch('datajson.json')
					  const json = await res.json()
					  const calon = json.bakalcalonpengurus20252030
					  fpagemusprov4voting20bacalonhasilrun(calon,dataall)    
				  }
				  else if (status == "failed")
				  {
					app.dialog.alert(data,'Terjadi Kesalahan');
				  }
				  else
				  {
					app.dialog.alert(data,'Terjadi Kesalahan');
				  }
				},
			  error: function (xhr, status, message)
				{
				  //console.log(message);
				  mypreloader.close();
				  app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
				},
			})
}
function fpagemusprov4voting20bacalonhasilrun(calon,data){
	let hasil = new Map()
	for(const pemilih of data){
		const list = pemilih.list
		for(const item of list){
			let current = hasil.get(item)
			if(current == undefined){
				hasil.set(item,1)
			}else{
				let now = current
				now++
				hasil.set(item,now)
			}
		}
	}
	
	var html = '<div class="data-table data-table-collapsible data-table-init"><table><thead><tr><th>Nama</th><th>Jumlah</th></tr></thead><tbody>'
	
	for(let i=0;i<calon.length;i++){
		const nama = calon[i]
		const item = i.toString()
		const jumlah = hasil.get(item) == undefined ? 0 : hasil.get(item)
		html += `<tr><td data-collapsible-title="Nama">${nama}</td><td data-collapsible-title="Jumlah">${jumlah}</td></tr>`
	}
	
	html += '</tbody></table></div>'
	
	$$('#musprov4voting20bacalonhasil .hasilvoting').html(html)
	
	$$('#musprov4voting20bacalonhasil .totalpemilih').text(data.length)
	
	CountDownTimer('11/9/2024 11:30 PM', 'countdown')
	
	$$('#musprov4voting20bacalonhasil #urutkan').on("click",()=>{
		fpagemusprov4voting20bacalonhasilrunurutkan(calon,data)
	})

	$$('.musprov4voting20bacalonhasil .total').on('click', function () {
        let url = "/pemilihvoting/";
        app.views.main.router.navigate(url);
	})
}
function fpagemusprov4voting20bacalonhasilrunurutkan(calon,data){
	let hasil = []
	for(const pemilih of data){
		const list = pemilih.list
		for(const item of list){
			const idx = hasil.findIndex((obj)=>obj.calon == item)
			if(idx < 0){
				const data = {calon:item,jumlah:1}
				hasil.push(data)
			}else{
				let data = hasil[idx].jumlah
				data++
				hasil[idx].jumlah = data
			}
		}
	}
	hasil.sort(function(a, b){return b.jumlah - a.jumlah});
	
	var html = '<div class="data-table data-table-collapsible data-table-init"><table><thead><tr><th>Nama</th><th>Jumlah</th></tr></thead><tbody>'
	
	for(const item of hasil){
		const idx = parseInt(item.calon)
		const nama = calon[idx]
		const jumlah = item.jumlah
		html += `<tr><td data-collapsible-title="Nama">${nama}</td><td data-collapsible-title="Jumlah">${jumlah}</td></tr>`
	}
	
	const terpilih = hasil.map((obj)=>obj.calon)
	
	for(let i=0;i<calon.length;i++){
		if(!terpilih.includes(i.toString())){
			const nama = calon[i]
			const jumlah = 0
			html += `<tr><td data-collapsible-title="Nama">${nama}</td><td data-collapsible-title="Jumlah">${jumlah}</td></tr>`
		}
	}
	
	html += '</tbody></table></div>'
	
	$$('#musprov4voting20bacalonhasil .hasilvoting').html(html)
}

function fpagemusprov4voting20bacalonpemilih(){
    if (typeof dashboarddata === 'undefined' || dashboarddata === null) {
      // variable is undefined or null
      setTimeout(function(){ fpagemusprov4voting20bacalonpemilih(); }, 1000);
      return;
    }
			let mypreloader = app.dialog.preloader();
			app.request({
			  url: apidataurl,
			  method: 'GET',
			  cache: false,
			  data : { command: 'getmusprov4voting20bacalon'}, 
			  success: async function (data, status, xhr)
				{
				  //console.log(data);
				  mypreloader.close();

				  var status = JSON.parse(data).status;
				  var data = JSON.parse(data).data;
				  if (status == "success")
				  {
					  let dataall = []
					  for(const item of data[0]){
						  const json = JSON.parse(item)
						  dataall = dataall.concat(json)
					  }
					  fpagemusprov4voting20bacalonpemilihrun(dataall)    
				  }
				  else if (status == "failed")
				  {
					app.dialog.alert(data,'Terjadi Kesalahan');
				  }
				  else
				  {
					app.dialog.alert(data,'Terjadi Kesalahan');
				  }
				},
			  error: function (xhr, status, message)
				{
				  //console.log(message);
				  mypreloader.close();
				  app.dialog.alert("Server sedang sibuk",'Terjadi Kesalahan');
				},
			})
}
function fpagemusprov4voting20bacalonpemilihrun(voting){
	let hasil = []
	for(const item of voting){
		const cabang = item.cabang
		let idx = hasil.findIndex((obj)=>obj.cabang == cabang)
		if(idx < 0){
			const data = {cabang:cabang,jumlah:1}
			hasil.push(data)
		}else{
			let now = hasil[idx].jumlah
			now++
			hasil[idx].jumlah = now
		}
	}
	
	hasil.sort(function(a, b){return b.jumlah - a.jumlah})
	let kodecabang = window.dashboarddata.kodecabang
	
	for(const item of kodecabang){
		cabang = item[0]
		let idx = hasil.findIndex((obj)=>obj.cabang == cabang)
		if(idx < 0){
			const data = {cabang:cabang,jumlah:0}
			hasil.push(data)
		}
	}
	
	var html = '<div class="data-table data-table-collapsible data-table-init"><table><thead><tr><th>Cabang</th><th>Jumlah</th></tr></thead><tbody>'
	
	for(const item of hasil){
		const cabang = item.cabang
		const jumlah = item.jumlah
		html += `<tr><td data-collapsible-title="Cabang">${cabang}</td><td data-collapsible-title="Jumlah">${jumlah}</td></tr>`
	}
	
	html += '</tbody></table></div>'
	
	$$('#musprov4voting20bacalonpemilih .voting').html(html)

	$$('#musprov4voting20bacalonpemilih .totalpemilih').text(voting.length)
	
	CountDownTimer('11/9/2024 11:30 PM', 'countdownpemilih')
}
///////////////////////////////////////////////////////////////////////////////////////////


////////////////webworker///////////////////////////////////////////////////////////////////////////////////////
function fwebworker()
{
  (function() {


	 
	 var oldXMLHttpRequest = XMLHttpRequest;

     XMLHttpRequest = function() {
		 var xhrOpenRequestUrl; 
		 var requestBodyOri;
          var actual = new oldXMLHttpRequest();
          var self = this;

          this.onreadystatechange = null;
          actual.onreadystatechange = async function() {
              if (self.onreadystatechange) {
                  return self.onreadystatechange();
              }
          };
          
          this.onload = null;
          actual.onload = async function() {
              //console.log('onload status = '+this.status+' | state = '+this.readyState);
              if ((this.status >= 200 && this.status < 300) || this.status === 0) {
                  //console.log('onload step = url: '+xhrOpenRequestUrl+' | body: '+requestBodyOri);      
                  if (this.responseType === 'blob')
                  {
                  }
                  else
                  {
                    if ((xhrOpenRequestUrl.indexOf("https://script.google.com/macros/s/") > -1)||(xhrOpenRequestUrl.indexOf("https://script.googleusercontent.com/macros/echo") > -1))
                    {
                      try {
                        //console.log('send request to worker = '+requestBodyOri);
                        let data = await fproses(xhrOpenRequestUrl,requestBodyOri);
                        //console.log('data from worker= '+data);
                        self.responseText = data;
                      }
                      catch
                      {
                       self.responseText = '{"status":"failed","data":"Gangguan koneksi"}';
                      }
                    }
                    else
                    {
                      self.responseText = this.responseText;
                    }
                   }
              }
              if (self.onload) {
                  return self.onload();
              }            
          },

          // add all proxy getters
          ["status", "statusText", "responseType", "response",
           "readyState", "responseXML", "upload"].forEach(function(item) {
              Object.defineProperty(self, item, {
                  get: function() {return actual[item];},
                  set: function(val) {actual[item] = val;}
              });
          });

          // add all proxy getters/setters
          ["ontimeout, timeout", "withCredentials",  "onerror", "onprogress"].forEach(function(item) {
              Object.defineProperty(self, item, {
                  get: function() {return actual[item];},
                  set: function(val) {actual[item] = val;}
              });
          });

          // add all pure proxy pass-through methods 
          ["addEventListener",  "abort", "getAllResponseHeaders",
           "getResponseHeader", "overrideMimeType", "setRequestHeader"].forEach(function(item) {
              Object.defineProperty(self, item, {
                  value: function() {return actual[item].apply(actual, arguments);}
              });
          });

              Object.defineProperty(self, "open", {
				   
                  value: function() {
						xhrOpenRequestUrl = arguments[1]
						return actual["open"].apply(actual, arguments);
					  }
              });
		  
			Object.defineProperty(self, "send", {
				value: function(data) {
					if ((xhrOpenRequestUrl.indexOf("https://script.google.com/macros/s/") > -1)||(xhrOpenRequestUrl.indexOf("https://script.googleusercontent.com/macros/echo") > -1))
					{
						if (data == null)
						{
							requestBodyOri = 'get';
						}
						else
						{
							console.log('body = '+data);
							requestBodyOri = data;
							requestBody = Object.fromEntries(new URLSearchParams(requestBodyOri))
							delete requestBody.password;
							delete requestBody.grecaptcharesponsedata;
							delete requestBody.deviceid;
							delete requestBody.email;
							requestBody = new URLSearchParams(requestBody).toString();  
							data = requestBody;  
						} 
						
						actual.onload()
						return
					}else{
						return actual["send"].apply(actual, arguments);
					}
				}
			});

			Object.defineProperty(actual, 'readyState', {
				writable: true,
				configurable: true
			});
			Object.defineProperty(actual, 'status', {
				writable: true,
				configurable: true
			});
			
			actual.readyState = 4;
			actual.status = 200;
      }
     

  })()


  function workerFunction() {


      function _0x237b(){const _0x3e0ece=['48ubjEPg','51538JYIKNf','3413928YrNUeK','charCodeAt','2221844XLYTVa','150JTgMiO','encode','3426tHlxlz','3bPhnXy','join','SHA-256','raw','from','toString','digest','getRandomValues','map','decode','fromCharCode','11tUgHHK','AES-GCM','8510uvftFP','length','slice','subtle','337923gMxRzz','decrypt','match','228720rqQmAX','2741270MCJlff','encrypt','importKey'];_0x237b=function(){return _0x3e0ece;};return _0x237b();}(function(_0x341bf5,_0x4d899a){const _0x4a311e=_0x1227,_0x1ce346=_0x341bf5();while(!![]){try{const _0x3c6350=parseInt(_0x4a311e(0x171))/0x1*(-parseInt(_0x4a311e(0x170))/0x2)+-parseInt(_0x4a311e(0x158))/0x3*(-parseInt(_0x4a311e(0x154))/0x4)+-parseInt(_0x4a311e(0x165))/0x5*(-parseInt(_0x4a311e(0x157))/0x6)+parseInt(_0x4a311e(0x16d))/0x7+-parseInt(_0x4a311e(0x172))/0x8+-parseInt(_0x4a311e(0x169))/0x9*(-parseInt(_0x4a311e(0x155))/0xa)+parseInt(_0x4a311e(0x163))/0xb*(parseInt(_0x4a311e(0x16c))/0xc);if(_0x3c6350===_0x4d899a)break;else _0x1ce346['push'](_0x1ce346['shift']());}catch(_0x46af76){_0x1ce346['push'](_0x1ce346['shift']());}}}(_0x237b,0xcc795));function _0x1227(_0x1d8b71,_0x1e424b){const _0x237b67=_0x237b();return _0x1227=function(_0x12275e,_0x4d888b){_0x12275e=_0x12275e-0x154;let _0x287869=_0x237b67[_0x12275e];return _0x287869;},_0x1227(_0x1d8b71,_0x1e424b);}async function mybsmie(_0x3bb684,_0x144618){const _0x1bbe7b=_0x1227;let _0x328ac8=new TextEncoder()[_0x1bbe7b(0x156)](_0x144618),_0x14af8a=await crypto[_0x1bbe7b(0x168)][_0x1bbe7b(0x15e)](_0x1bbe7b(0x15a),_0x328ac8),_0x39f61b=crypto[_0x1bbe7b(0x15f)](new Uint8Array(0xc)),_0xa0a569={'name':_0x1bbe7b(0x164),'iv':_0x39f61b},_0x51f540=await crypto[_0x1bbe7b(0x168)][_0x1bbe7b(0x16f)]('raw',_0x14af8a,_0xa0a569,!0x1,['encrypt']),_0x2b2ab3=new TextEncoder()[_0x1bbe7b(0x156)](_0x3bb684),_0x2732f2=await crypto[_0x1bbe7b(0x168)][_0x1bbe7b(0x16e)](_0xa0a569,_0x51f540,_0x2b2ab3),_0xdf9787=Array[_0x1bbe7b(0x15c)](new Uint8Array(_0x2732f2)),_0x41f272=_0xdf9787['map'](_0x2497da=>String[_0x1bbe7b(0x162)](_0x2497da))[_0x1bbe7b(0x159)](''),_0xd451eb=btoa(_0x41f272),_0x2c82ae=Array[_0x1bbe7b(0x15c)](_0x39f61b)[_0x1bbe7b(0x160)](_0x521963=>('00'+_0x521963[_0x1bbe7b(0x15d)](0x10))[_0x1bbe7b(0x167)](-0x2))[_0x1bbe7b(0x159)]('');return _0x2c82ae+_0xd451eb;}async function mybsmid(_0x269fc6,_0x48a97b){const _0x4c19dc=_0x1227;let _0x588e31=new TextEncoder()[_0x4c19dc(0x156)](_0x48a97b),_0x1ce25e=await crypto[_0x4c19dc(0x168)][_0x4c19dc(0x15e)](_0x4c19dc(0x15a),_0x588e31),_0x5a923c=_0x269fc6[_0x4c19dc(0x167)](0x0,0x18)[_0x4c19dc(0x16b)](/.{2}/g)['map'](_0x5b0f87=>parseInt(_0x5b0f87,0x10)),_0xdf822f={'name':_0x4c19dc(0x164),'iv':new Uint8Array(_0x5a923c)},_0x177f68=await crypto[_0x4c19dc(0x168)][_0x4c19dc(0x16f)](_0x4c19dc(0x15b),_0x1ce25e,_0xdf822f,!0x1,[_0x4c19dc(0x16a)]),_0x3c9a62=atob(_0x269fc6[_0x4c19dc(0x167)](0x18)),_0x390228=new Uint8Array(new ArrayBuffer(_0x3c9a62[_0x4c19dc(0x166)]));for(let _0x1b3121=0x0;_0x1b3121<_0x3c9a62[_0x4c19dc(0x166)];_0x1b3121++)_0x390228[_0x1b3121]=_0x3c9a62[_0x4c19dc(0x173)](_0x1b3121);let _0xae0767=await crypto[_0x4c19dc(0x168)][_0x4c19dc(0x16a)](_0xdf822f,_0x177f68,_0x390228),_0x329726=new TextDecoder()[_0x4c19dc(0x161)](_0xae0767);return _0x329726;}

      //////////console.log/////////////////////////////////////////////////////////////////////////////////////////////
      var DEBUG = false;
      if(!DEBUG){
          if(!console) console = {};
          var methods = ["log", "debug", "warn", "info"];
          for(var i=0;i<methods.length;i++){
              console[methods[i]] = function(){};
          }
      }
      //////////console.log/////////////////////////////////////////////////////////////////////////////////////////////
      
      var myaccesstoken;
      var myunik;

      function validateapiurl(url)
      {
        var validurl = [
        'https://script.google.com/macros/s/AKfycbwWFxUmhmfem1mHJT7HDqJoVFNkCmUkInvOOx2K1KZy/dev', //devuserapi
        'https://script.google.com/macros/s/AKfycbxXCV5_Bj1-IqUtezfR_MPLrc-YRGq0pSWVQwPZ5K0/dev', //devdataapi
        'https://script.google.com/macros/s/AKfycbys-GEdilEu0nqdjDRUlEExkamYVIRsplNMEnLl2WiQQy3DxZoikpts7bnLotnT5IcwzQ/exec', //realuserapi
        'https://script.google.com/macros/s/AKfycbyyPrApY4R8xv-_m8LUz9XHhkdYeTPMovm8MkBXgTXlojx31nHz9GVdGa4Ikw8cELMN/exec', //realdataapi
        'https://script.google.com/macros/s/AKfycbztYLCDVY-nZyQJFK7QhIRboEcuRUWPIrfkGzbU6bUnTEn909HgWhwc1VadGotPDIkp7Q/exec', //devmode
        'https://script.googleusercontent.com/macros/echo',
        ]
        var valid = false;
        for(i=0;i<validurl.length-1;i++)
        {
          if (url.indexOf(validurl[i]) > -1) {valid = true;}
        }
        return valid;
      }
      
      addEventListener("message", (event) => {
        try{
          if (typeof event.data[0] !== "string" || typeof event.data[1] !== "string") {
            throw new Error("both arguments must be string");
          }
          //event.ports[0].postMessage({result: event.data[0] + event.data[1]});
          console.log('worker receive message');
          console.log(event);
          fetchUrl(event);
        }catch(e) {
          event.ports[0].postMessage({error: e});
        }
      }, false)

      async function fetchUrl(event){
        try{
          let method = 'POST';
          let deviceid;
          let penting;
          let url = event.data[0]; console.log('fetchurl = '+url);
          if (!validateapiurl(url)) {event.ports[0].postMessage({error: 'Forbidden url'});return}
          let body = event.data[1];
          if (body === 'get')
          {
              method = 'GET';
              body = null;
          }
          else
          {
              body = Object.fromEntries(new URLSearchParams(body));
              if (body.token) {body.token = myaccesstoken}
              penting = false;
              if (body.command) 
              {
                if (body.command === 'loginwithtoken')
                {
                  body.password = await mybsmid(body.password,body.deviceid);
                  deviceid = body.deviceid;myunik = body.deviceid;
                  penting = true;
                }
                if (body.command === 'login' || body.command.indexOf('loginwithservice') > -1)
                {
                  deviceid = body.deviceid;myunik = body.deviceid;
                  penting = true;
                }
              }console.log('worker body = '+JSON.stringify(body));
              var form_data = new FormData();
              for ( var key in body ) {
                  form_data.append(key, body[key]);
              }              
              body = form_data;
          }
        

          fetch(url, {
              method: method,
              body: body,
            })
              .then((result) => {
                if (result.status != 200) { }
                return result.text();
              })
              .then(async(response) => {
                      console.log('response = '+response);
                      var jsonresponse = JSON.parse(response)
                      var status = jsonresponse.status;
                      var data = jsonresponse.data;
                      if (data.token)
                      {
                        let token = JSON.parse(atob(data.token));
                        let access = token.access;
                        let refresh = token.refresh;
                        myaccesstoken = access;
                        token.access = "mybsmi";
                        token.refresh = await mybsmie(refresh,deviceid);
                        token = btoa(JSON.stringify(token));
                        jsonresponse.data.token = token;
                      }
                      jsonresponse = JSON.stringify(jsonresponse);
                      event.ports[0].postMessage({result: jsonresponse});
              })
              .catch((err) => {
                  event.ports[0].postMessage({error: err});
              });
        }catch{event.ports[0].postMessage({error: 'error'});return;}
          
      }
  }

  var workerdataObj = '(' + workerFunction + ')();';
  var workerblob = new Blob([workerdataObj]);
  var workerblobURL = URL.createObjectURL(workerblob, {
      type: 'application/javascript; charset=utf-8'
  });

  console.log('workerbloburl = '+workerblobURL);
  if (window.trustedTypes && trustedTypes.createPolicy) { 
    const trustURLPolicy = trustedTypes.createPolicy('mybsmiworker', {
      createScriptURL: string => string,
    });
    workerblobURL = trustURLPolicy.createScriptURL(workerblobURL);
  }
  const worker = new Worker(workerblobURL);

  const fproses = (a, b) => new Promise((res, rej) => {
    const channel = new MessageChannel(); 

    channel.port1.onmessage = ({data}) => {
      channel.port1.close();
      if (data.error) {
        rej(data.error);
      }else {
        //console.log('receive msg from worker = '+data.result);
        res(data.result);
      }
    };

    worker.postMessage([a, b], [channel.port2]);
  });
}
fwebworker()
////////////////webworker///////////////////////////////////////////////////////////////////////////////////////


////////serviceworker////////////////////////////////////////////////////////////////////////////////////////////////

  if (typeof navigator.serviceWorker !== 'undefined') {
    navigator.serviceWorker.register('sw.js')
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////


///////online offline/////////////////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus(event) {
  var condition = navigator.onLine ? "online" : "offline";
  if (condition == 'offline')
  {
      window.mybsmipreloader = app.dialog.progress('Koneksi Terputus');
  }
  if (condition == 'online')
  {
      window.mybsmipreloader.close();
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////
//https://github.com/bigdatacloudapi/js-reverse-geocode-client
	var BDCReverseGeocode=function(localityLanguage,endpoint,server) {
		this.endpoint=endpoint ? endpoint : 'reverse-geocode-client';
		this.server=server ? server : 'api.bigdatacloud.net';
		this.localityLanguage=localityLanguage ? localityLanguage : 'en';
	};
	BDCReverseGeocode.prototype={
		setApi:function(api) {
			this.api=api;
			return this;
		},
		getApi:function() {
			return this.api;
		},
		getClientCoordinates:function(cb) {
			if (!cb) return false;
			if (!navigator.geolocation || !navigator.geolocation.getCurrentPosition) return cb(false);
			return navigator.geolocation.getCurrentPosition(
				(function(position) { return this.cb(position);}).bind({cb:cb}),
				(function(err) { console.error(err); return this.cb(false);}).bind({cb:cb}),
				{
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0
				}
				);
		},
		getClientLocation:function(latLng,cb) {
			var _this=this;
			if (typeof latLng=='function' && !cb) {
				cb=latLng;
				latLng=null;
			} else if (latLng=='function') {
				latLng=latLng();
			}
			if (!cb) return false;
			if (!latLng && latLng!=-1) {
				return this.getClientCoordinates(function(position) {
					_this.getClientLocation(position ? position : -1,cb);
				})
			} else {
				this.callApi(this.processLatLng(latLng),function(result) {
					cb(result);
				},function(err) {
					console.error(err);
					cb(false);
				});
			}
		},
		processLatLng:function(latLng) {
			var result={};
			if (!latLng || latLng==-1) return {};
			if (latLng.coords) {
				latLng=latLng.coords;
			}
			if (!typeof latLng.latitude) {
				if (latLng.lat) {
					latLng.latitude=latLng.lat;
				}
			}
			if (!typeof latLng.longitude) {
				if (latLng.long) {
					latLng.longitude=latLng.long;
				}
				if (latLng.lng) {
					latLng.longitude=latLng.lng;
				}
			}
			if (typeof latLng.latitude!= 'undefined') {
				result.latitude=parseFloat(parseFloat(latLng.latitude).toFixed(5));
			}
			if (typeof latLng.longitude!= 'undefined') {
				result.longitude=parseFloat(parseFloat(latLng.longitude).toFixed(5));
			}
			return result;
		},
		callApi:function(payload,cb) {
/*			var xhr = new XMLHttpRequest()
			xhr.open(
				'GET',
				'https://'+this.server+'/data/'+this.endpoint+'?'+this.prepareData(payload),
				true
				);
			xhr.onreadystatechange = function() {
				if (this.readyState === XMLHttpRequest.DONE) {
					if (this.status === 200) {
						try {
							cb(JSON.parse(this.responseText))
						} catch (e) {
							cb(false)
						}
					} else {
						try {
							var result=JSON.parse(this.responseText);
							console.error(result,this.status);
							cb(false);
						} catch (e) {
							console.error(this.responseText,this.status);
							cb(false);
						}
					}
				}
			}
			xhr.send();*/
      fetch('https://'+this.server+'/data/'+this.endpoint+'?'+this.prepareData(payload), {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
          },
      })
      .then(response => response.json())
      .then(async(response) => {
          cb(response);
      })
		},
		prepareData:function(payload) {
			var data=[];
			var hasLocalityLanguage=false;
			if (payload) {
				for (var i in payload) {
					switch(i) {
						case 'localityLanguage':
						hasLocalityLanguage=true;
						break;
					}
					data.push(encodeURIComponent(i)+'='+encodeURIComponent(payload[i]));
				}
			}
			if (!hasLocalityLanguage) data.push('localityLanguage='+this.localityLanguage);
			data=data.join('&');
			return data;
		}
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

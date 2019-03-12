// Initialize app
var url = 'https://retehk.com/peninsula/getSummer/index.php';
var url2 = 'https://retehk.com/peninsula/getSummer/update.php';
var url3 = 'https://retehk.com/peninsula/getSummer/form_qt1.php';
var url4 = 'https://retehk.com/peninsula/getSummer/form_qt2.php';
var wrong=0;
var session='';
var type='';
var myApp = new Framework7({
  // ajax请求开始
  onAjaxStart: function (xhr) {
    myApp.showIndicator();
  },
  // ajax请求完毕
  onAjaxComplete: function (xhr) {
    myApp.hideIndicator();
  },
  swipeBackPage: false
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});



function changeStock(){
 $$(".btn-gift").click(function(){
    var id=$$(this).attr('data-id');
	var name=$$(this).attr('data-title');
	 //alert(name);
    $$.ajax({
      type: 'GET',
      url: url2+'?id='+id+'&name='+name+'&session='+session+'&type='+type,
      contentType: "OPTIONS", 
      dataType: 'text',
      crossDomain: true,
      error: function(e) {
        myApp.alert('err:Please try again','The Peninsula Boutique');
      },
      success: function(d) {
        if(d =='yes'){
          mainView.router.loadPage('thanks.html');
		} else if(d=='no'){
		  mainView.router.loadPage('thanks.html');
        } else {
          myApp.alert('Please try again','The Peninsula Boutique');
        }				
      }
    });
  });
}

function formSubmit(){
  $$('#btn-submit').on('click', function(){
  //var formData = myApp.formToJSON('#my-form');
  //var date=JSON.stringify(formData);
	  var err="Please fill in all required fields";
	 $$('.form-control,.tnc').removeClass('err');
	  var emtry=false;
	  var name = $$('.name').val();
	  if(!name){
		  emtry=true;
		  $$('.name').addClass('err');
	  }
	  var email = $$('.email').val();
	  if(!email){
		  emtry=true;
		  $$('.email').addClass('err');
	  } else if(!email.match(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/i)){
			$$('.email').addClass('err');
		    err +=" / Please insert correct email"
		    
		}
	  var tel = $$('.tel').val();
	  if(!tel){
		  emtry=true;
		  $$('.tel').addClass('err');
	  } else if(!tel.match(/[0-9 -()+]+$/i)){
			$$('.tel').addClass('err');
		    err +=" / Please insert correct Tel number"
		    
       }
	  var day = $$('select[name="day"] option:checked').val();
	  if(day ==''){
		  emtry=true;
		  $$('.day').addClass('err');
	  }
	  var month = $$('select[name="month"] option:checked').val();
	   if(month ==''){
		  emtry=true;
		  $$('.month').addClass('err');
	  }
	  var gender = $$('select[name="gender"] option:checked').val();
	   if(gender ==''){
		  emtry=true;
		  $$('.gender').addClass('err');
	  }
	  var isTnc=$$('.tnc').prop('checked');
	  if(!isTnc){
		  emtry=true;
		  $$('.tnc').addClass('err');
	  } else {
		  var tnc=$$('.tnc').val();
	  }
	  var checkSns=$$('.re_sns').prop('checked');
	  var checkEmail=$$('.re_email').prop('checked');
	  if(!checkSns){
		  var isSns='';
	  } else {
		  var isSns=$$('.re_sns').val();
	  }
	   if(!checkEmail){
		 var isEmail='';
	  } else {
		  var isEmail=$$('.re_email').val();
	  }
	  
	  
	  
	  
	  var type =$$('#question').val();
	  
	  
	  if (emtry){
	     myApp.alert(err,'The Peninsula Boutique');
	  } else {
	  if(type=='1'){
		  var $data = 'name='+name+'&email='+email+'&tel='+tel+'&gender='+gender+'&day='+day+'&month='+month+'&tnc='+tnc+'&isemail='+isEmail+'&issns='+isSns+'&type='+type;
		  
		  var $url =url3;
	  } else {
		  var qt1 =$$('#qt1').val();
		  var qt2 =$$('#qt2').val();
		  var qt3 =$$('#qt3').val();
		  var qt4 =$$('#qt4').val();
		  var qt5 =$$('#qt5').val();
		  
		  var $data = 'name='+name+'&email='+email+'&tel='+tel+'&gender='+gender+'&day='+day+'&month='+month+'&tnc='+tnc+'&isemail='+isEmail+'&issns='+isSns+'&type='+type+'&qt1='+qt1+'&qt2='+qt2+'&qt3='+qt3+'&qt4='+qt4+'&qt5='+qt5;
		  var $url =url4;
	  }
	  
	//insert data
	 //alert($data);
	  $$.ajax({
      type: 'GET',
      url: $url+'?'+$data,
      contentType: "OPTIONS", 
      dataType: 'text',
      crossDomain: true,
      error: function(e) {
        myApp.alert('Please try again','The Peninsula Boutique');
      },
      success: function(d) {
		  
		// alert(d);
        if(d !=''){
          mainView.router.loadPage('gifts.html?session='+d+'&type='+type);
        } else {
          myApp.alert('Please try again','The Peninsula Boutique');
        }				
      }
    });
   }
});
}

function getSameHeigh(){
	
	var $h = $$('.box').height();
	var $btn = $h/2-15;
	//alert($btn);
	$$('.same-height').css('height', $btn+'px');
}
function clickTnc(){
	 $$('#btn-tnc-en').on('click', function(e) {
	  e.preventDefault();
	  //var url = $$(this).attr('href');
	  window.open = cordova.InAppBrowser.open;
	  window.open("https://www.peninsulaboutique.com/hk/terms-and-condition/","_system",'location=yes');
	});
	$$('#btn-ps-en').on('click', function(e) {
	  e.preventDefault();
	  //var url = $$(this).attr('href');
	  window.open = cordova.InAppBrowser.open;
	  window.open("https://www.peninsulaboutique.com/hk/privacy-security","_system",'location=yes');
	});
	$$('#btn-tnc-tc').on('click', function(e) {
	  e.preventDefault();
	  //var url = $$(this).attr('href');
	  window.open = cordova.InAppBrowser.open;
	  window.open("https://www.peninsulaboutique.com/hk/zh/terms-and-condition/","_system",'location=yes');
	});
	$$('#btn-ps-tc').on('click', function(e) {
	  e.preventDefault();
	  //var url = $$(this).attr('href');
	  window.open = cordova.InAppBrowser.open;
	  window.open("https://www.peninsulaboutique.com/hk/zh/privacy-security","_system",'location=yes');
	});
}
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
  initBarcodeScanner();
});

$$(document).on('pageInit', '.page[data-page="index"]', function () {
  initBarcodeScanner();
})

$$(document).on('pageInit', '.page[data-page="questions"]', function () {

})

$$(document).on('pageInit', '.page[data-page="q1"]', function () {
	//initQuestionSelect();

	
var min = 1;
var max = 4;
// and the formula is:
var random = Math.floor(Math.random() * (max - min + 1)) + min;
//alert(random);
myApp.showTab('#tab'+random);
//myApp.showTab('#tab4');
 //$$('#tab'+random).addClass('active');
//$$('.same-height').css('height','140px');
getSameHeigh();	
setTimeout(function(){ getSameHeigh(); }, 200);
$$(window).resize(function() {
		getSameHeigh();
})
})

$$(document).on('pageInit', '.page[data-page="q2"]', function () {

	var qt='';
	var i=1;
	$$('.tab-link').on('click', function() {
		
		var $tab =$$(this).attr('data-id');
		var $title =$$(this).attr('data-title');
		qt+='&qt'+i+'='+$title;
		i++;
		//alert(qt);
		myApp.showTab($tab);
	});
	$$('.btn-end').on('click', function() {
		var $tab =$$(this).attr('data-id');
		qt+='&qt'+i+'='+$tab;
		 mainView.router.loadPage('form_qt2.html?q=2'+qt);
	});
	
	
})

$$(document).on('pageInit', '.page[data-page="form_qt1"]', function (e) {
	var page = e.detail.page;
  	var $v = page.query.q;
	$$('#question').val($v);
	formSubmit();
	clickTnc();
})
$$(document).on('pageInit', '.page[data-page="form_qt2"]', function (e) {
	var page = e.detail.page;
  	var $v = page.query.q;
	var $qt1 = page.query.qt1;
	var $qt2 = page.query.qt2;
	var $qt3 = page.query.qt3;
	var $qt4 = page.query.qt4;
	var $qt5 = page.query.qt5;
	$$('#question').val($v);
	$$('#qt1').val($qt1);
	$$('#qt2').val($qt2);
	$$('#qt3').val($qt3);
	$$('#qt4').val($qt4);
	$$('#qt5').val($qt5);
	formSubmit();
	clickTnc();
})

$$(document).on('pageInit', '.page[data-page="thanks"]', function () {
	$$('#btn-back').on('click', function () {
	  mainView.router.loadPage('index.html');
	});
})
$$(document).on('pageInit', '.page[data-page="failed"]', function () {
	$$('#btn-back').on('click', function () {
	  mainView.router.loadPage('index.html');
	});
})

$$(document).on('pageInit', '.page[data-page="gifts"]', function (e) {
  var page = e.detail.page;
  session = page.query.session;
  type = page.query.type;

  //alert(session);
  var html='';
  var skip='2';
	
  $$.ajax({  
    url: url,  
    contentType: "OPTIONS",  
    crossDomain: true,//这个一定要设置成true，默认是false，true是跨域请求。  
    dataType:"json",  
    success: function( response ) {  
      var x = 0;
      html+='<div class="row">';
      html+='<div class="col-100 tablet-10"></div>';
      html+='<div class="col-100 tablet-80">';
      html+='<div class="row no-gap">';
      for(x=0;x<response.gift.length; x++){
				
				var y=x+1;
				if(x>2){
					 html+='<div class="col tablet-50" id="gift-'+response.gift[x].id+'">';
				} else {
        	html+='<div class="col tablet-33" id="gift-'+response.gift[x].id+'">';
				}
        html+='<div class="p10-15" ';
				 if(x===3){
					  html+=' style="padding-left:40px;"';
					}
					if(x===4){
					  html+=' style="padding-right:40px;"';
					}
				html+='>';
        if(response.gift[x].stock<=0){
          html+='<div><img src="images/gift/gift-'+response.gift[x].id+'-sold.jpg" width="100%" ></div>';
        } else {
          html+='<div><a href="" class="btn-gift" data-id="'+response.gift[x].id+'" data-title="'+response.gift[x].name+'"><img src="images/gift/gift-'+response.gift[x].id+'.jpg" width="100%" ></a></div>';
        }
        html+='<div class="text-center gold fs-11">'+gifttext[response.gift[x].id]+'</div>';
        html+='</div>';
        html+='</div>';
				
        if(x===2){
          html+='</div>';
          html+='</div>';
          html+='<div class="col-100 tablet-10 "></div>';
          html+='</div>';
          html+='<div class="row">';
          html+='<div class="col-100 tablet-20"></div>';
          html+='<div class="col-100 tablet-60">';
          html+='<div  class="row no-gap">';
        }
					
					

      }//end for
      html+='</div>';
      html+='</div>';
      html+='<div class="col-100 tablet-20"></div>   ';        
      html+='</div>';

      $$('#gift').html(html);

      return changeStock(); 
    },
    error: function(){
      myApp.alert('Error','The Peninsula Boutique');
    }
  });  

});//end



//text
var gifttext=[];
var i=0;
i++;
gifttext[i]='10% off upon any purchase<br/><span class="t-tc">享有九折購物優惠</span><br/><span class="t-jp">全商品が10%オフ</span>';
i++;
gifttext[i]='Special offer of HK$ 800 for 1 HK$ 1,900 hamper<br/><span class="t-tc">以優惠價800港元購買價值1,900港元之禮物籃</span><br/><span class="t-jp">HK$ 1,900のギフトセット1つが特別価格のHK$800に</span>';
i++;
gifttext[i]='Enjoy 40% off on XO Chilli Sauce<br/><span class="t-tc">以六折優惠購買XO辣椒醬</span><br/><span class="t-jp">XO醤が40%オフ</span>';
i++;
gifttext[i]='Purchase a designated box of Chocolate Bar to <br/>receive second box with our compliments<br/><span class="t-tc">購買指定朱古力塊，即可獲贈朱古力塊一件</span><br/><span class="t-jp">チョコレートバー1個ご購入で2個目が無料</span>';
i++;

gifttext[i]='Enjoy 25% off on designated Bamboo <br/>Blessings item upon any purchase<br/><span class="t-tc">凡購買任何產品，即可以七五折優惠<br/>購買指定「竹福」系列產品</span><br/><span class="t-jp">当店商品ご購入で指定の<br/>バンブーブレッシングスアイテムが25%オフ</span>';
i++;

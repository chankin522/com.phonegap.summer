// Initialize app
var url = 'https://retehk.com/peninsula/getcny/index.php';
var url2 = 'https://retehk.com/peninsula/getcny/update_v2.php';
var url3 = 'https://retehk.com/peninsula/getcny/form.php';
var wrong=0;
var session='';
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

function initQuestionSelect(){
	$$('.btn-answer').on('click', function () {
		var $var =$$(this).attr('data-id');
		
		if($var == ''){
			wrong++;
		   var $redirect =$$(this).attr('data-title');
			if(wrong ==2){
			 mainView.router.loadPage('failed.html');
			} else {
				$$('.tab-link').attr('href',$redirect);
				myApp.showTab('#wrong');
			}
			
		} else {
			myApp.showTab($var);
		}
		
	});
	
	$$('.btn-end').on('click', function () {
		wrong++;
		//alert(wrong);
		if(wrong >= 2){
			 mainView.router.loadPage('failed.html');
		} else {
			 mainView.router.loadPage('form.html');
		}
	});
}

function initBarcodeScanner(){
	$$('#btn-scan').on('click', function () {
    
    cordova.plugins.barcodeScanner.scan(
      function (result) {    
        if(result.text === 'JourneyToTreasure'){
          mainView.router.loadPage("questions.html");
        }
      }, 
      function (error) {
         myApp.alert("Scanning failed: " + error,'The Peninsula Boutique');
      },      
      {
        preferFrontCamera : true, // iOS and Android
        disableSuccessBeep: true, // iOS
          disable1d: false, // iOS only, disables the scan lines for 1D barcodes (the red line)
          disable2d: false // iOS only, disables the scan lines for 2D barcodes (the green box)
      }
    );
  });
}

function changeStock(){
 $$(".btn-gift").click(function(){
    var id=$$(this).attr('data-id');
	 //alert(session);
    $$.ajax({
      type: 'GET',
      url: url2+'?id='+id+'&session='+session,
      contentType: "OPTIONS", 
      dataType: 'text',
      crossDomain: true,
      error: function(e) {
        myApp.alert('err:Please try again','The Peninsula Boutique');
      },
      success: function(d) {
        if(d =='yes'){
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
	  $$('.item-input-info').removeClass('on');
	  var emtry=false;
	  var name = $$('.name').val();
	  if(!name){
		  emtry=true;
		  $$('.name~.item-input-info').addClass('on');
	  }
	  var email = $$('.email').val();
	  if(!email){
		  emtry=true;
		  $$('.emtry-email').addClass('on');
	  } else if(!email.match(/@/i)){
			$$('.err-email').addClass('on');
		}
	  var tel = $$('.tel').val();
	  if(!tel){
		  emtry=true;
		  $$('.tel~.item-input-info').addClass('on');
	  }
	  var day = $$('select[name="day"] option:checked').val();
	  if(day ==''){
		  emtry=true;
		  $$('.day~.item-input-info').addClass('on');
	  }
	  var month = $$('select[name="month"] option:checked').val();
	   if(month ==''){
		  emtry=true;
		  $$('.month~.item-input-info').addClass('on');
	  }
	  var gender = $$('select[name="gender"] option:checked').val();
	   if(gender ==''){
		  emtry=true;
		  $$('.gender~.item-input-info').addClass('on');
	  }
	  var isTnc=$$('.tnc').prop('checked');
	  if(!isTnc){
		  emtry=true;
		  $$('.err-tnc').addClass('on');
	  } else {
		  var tnc=$$('.tnc').val();
	  }
	  var isSns=$$('.re_sns').val();
	  var isEmail=$$('.re_email').val();
	  
	  if (emtry){
	     myApp.alert('please fill in all required fields','The Peninsula Boutique');
	  } else {
	  var $data = 'name='+name+'&email='+email+'&tel='+tel+'&gender='+gender+'&day='+day+'&month='+month+'&tnc='+tnc+'&isemail='+isEmail+'&issns='+isSns;
	//insert data
		  
	  $$.ajax({
      type: 'GET',
      url: url3+'?'+$data,
      contentType: "OPTIONS", 
      dataType: 'text',
      crossDomain: true,
      error: function(e) {
        myApp.alert('Please try again','The Peninsula Boutique');
      },
      success: function(d) {
		  
		  //alert(d);
        if(d !=''){
          mainView.router.loadPage('gifts.html?session='+d);
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
	var $btn = $h/2-12;
	//alert($btn);
	$$('.same-height').css('height', $btn+'px');
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
	//getSameHeigh();
	
var min = 1;
var max = 4;
// and the formula is:
var random = Math.floor(Math.random() * (max - min + 1)) + min;
//alert(random);
myApp.showTab('#tab'+random);
 //$$('#tab'+random).addClass('active');
	$$('.same-height').css('height','140px');
	$$(window).resize(function() {
		getSameHeigh();
	})
})

$$(document).on('pageInit', '.page[data-page="q2"]', function () {
    //initQuestionSelect();
})

$$(document).on('pageInit', '.page[data-page="form"]', function () {
	formSubmit();
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
	
  $$('#btn-tnc-tc').on('click', function () {
	  window.open("https://www.peninsulaboutique.com/hk/zh/terms-and-condition/", '_system');
	});

  //alert(session);
  var html='';
  
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
        html+='<div class="col tablet-33" id="gift-'+y+'">';
        html+='<div class="p10-15">';
        if(response.gift[x].stock<=0){
          html+='<div><img src="images/gift/gift-'+y+'-sold.jpg" width="100%" ></div>';
        } else {
          html+='<div><a href="" class="btn-gift" data-id="'+y+'"><img src="images/gift/gift-'+y+'.jpg" width="100%" ></a></div>';
        }
        html+='<div class="text-center gold fs-12">'+gifttext[y]+'</div>';
        html+='</div>';
        html+='</div>';

        if(x===2){
          html+='</div>';
          html+='</div>';
          html+='<div class="col-100 tablet-10 "></div>';
          html+='</div>';
          html+='<div class="row">';
          html+='<div class="col-100 tablet-10 "></div>';
          html+='<div class="col-100 tablet-80">';
          html+='<div  class="row no-gap">';
        }
      }//end for
      html+='</div>';
      html+='</div>';
      html+='<div class="col-100 tablet-10"></div>   ';        
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
gifttext[i]='15% off upon any purchase<br/><span class="t-tc">享有八五折購物優惠</span><br/><span class="t-jp">全商品が15%オフ</span>';
i++;
gifttext[i]='10% off upon any purchase<br/><span class="t-tc">享有九折購物優惠</span><br/><span class="t-jp">全商品が10%オフ</span>';
i++;
gifttext[i]='Buy 1 get 1 free – tea bags in box<br/><span class="t-tc">茶包禮盒買一送一</span><br/><span class="t-jp">ボックス入りティーバッグが1つご購入で1つ無料</span>';
i++;
gifttext[i]='Complimentary Heritage Chocolate Box – 2 pieces upon purchase of any box of chocolates<br/><span class="t-tc">凡購買任何朱古力禮盒可獲贈經典系列朱古力 - 2粒</span><br/><span class="t-jp">ボックス入りチョコレートご購入で「ヘリテージチョコレートボックス」（2個入り）をプレゼント</span>';
i++;

gifttext[i]='Special offer of HK$ 175 for 1 bottle of XO Chilli Sauce  (Original Price: HK$ 395)<br/><span class="t-tc">以優惠價175港元購買XO辣椒醬一樽 （原價395港元）</span><br/><span class="t-jp">XO醤1瓶が特別価格のHK$ 175に（定価HK$395）</span>';
i++;

gifttext[i]='Special offer of HK$ 800 for 1 HK$ 1,900 hamper<br/><span class="t-tc">以優惠價800港元購買價值1,900港元之禮物籃</span><br/><span class="t-jp">HK$ 1,900のギフトセット1つが特別価格のHK$800に</span>';
i++;
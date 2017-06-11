<?php include_once('header.php');?>
	<title>联系我们 - 利美钻石</title>
</head>
<script type="text/javascript"    
        src="http://maps.google.com/maps/api/js?sensor=false&language=zh-CN"></script> 
<script type="text/javascript">    
        var geocoder;    
        var map;    
        //实际查询地址    
        //var query = "辽宁沈阳文化路三号巷11号";    
        //var query = "东北大学北门";    
        //显示名称    
        //var display = "<b>单位: </b>东北大学";    
        function initialize() {    
            geocoder = new google.maps.Geocoder();    
            var myOptions = {    
                zoom : 17,//缩放比例    
                //地图类型 •MapTypeId.ROADMAP •MapTypeId.SATELLITE     
                //•MapTypeId.HYBRID •MapTypeId.TERRAIN     
                mapTypeId : google.maps.MapTypeId.ROADMAP    
            }    
            map = new google.maps.Map(document.getElementById("map_canvas"),    
                    myOptions);    
            codeAddress();    
        }    
        function codeAddress(address) {    
            //var address = document.getElementById("address").value;;    
            //地址解析    
            geocoder.geocode({    
                'address' : address    
            }, function(results, status) {    
                if (status == google.maps.GeocoderStatus.OK) {    
                    //依据解析的经度纬度设置坐标居中    
                    map.setCenter(results[0].geometry.location);    
                    var marker = new google.maps.Marker({    
                        map : map,    
                        position : results[0].geometry.location,    
                        title : address,    
                        //坐标动画效果    
                        animation : google.maps.Animation.DROP    
                    });    
                    var display = "地址: " + results[0].formatted_address;  
                    var infowindow = new google.maps.InfoWindow({    
                        content : "<span style='font-size:11px'><b>名称: </b>"    
                                + address + "<br>" + display + "</span>",    
                        //坐标偏移量，一般不用修改    
                        pixelOffset : 0,    
                        position : results[0].geometry.location    
        
                    });    
                    //默认打开信息窗口,点击做伴弹出信息窗口    
                    infowindow.open(map, marker);    
                    google.maps.event.addListener(marker, 'click', function() {    
                        infowindow.open(map, marker);    
                    });    
                } else {    
                    alert("Geocode was not successful for the following reason: " + status);    
                }    
            });    
        }    
    </script> 
 
<body>
<div class="zhuti clear">
	<?php
		include_once('topbar.php');
	?>
	<div class="contain">
		<div class="div_aboutus">
			<div class="trans">
				<span style="color:#4f4747;">交通指引</span>
				<span class="blank">&nbsp;</span>	<span style="color:#4f4747;"><img class="fa fa-train" src="images/icon-train.png" alt="火车"/>：安特卫普市中央火车站（Antwerspanen-Centraal）出站后200米，安特卫普钻交所大楼入口位于spanelikaanstraat上，如您对环境不熟悉，欢迎来电，由专人带您前往本公司。</span>
				<span class="blank">&nbsp;</span>
				<span style="color:#4f4747;"><img class="fa" src="images/icon-parking.png" alt="火车"/>：建议您使用Vestingstraat街的两家停车场(如地图所示)</span>
				<span class="blank">&nbsp;</span>
				<span class="sp_waring"> 注意事项：公司位于安特卫普钻交所大楼内，请每位来访客人务必携带本人护照或者欧洲所在国身份证，以供钻交所门卫安检放行之用。向安检递交身份证时请说明希望访问Belgem公司。</span>
				<span class="blank">&nbsp;</span>
				<span style="color:#4f4747;">为了您的方便，请您在来访前提前电话通知我们公司。</span>
			</div>
			<p class="p_one">Parking De Keyser</p>
			<p class="p_two">Parking Diamant</p>
			<div class="div_tttel">
				<p>无论现场咨询还是提货，Lumia钻石公司都欢迎您的亲临访问。</p>
				<div style="width: 162px;">
				<p>&nbsp;</p>
				<p><a href="tel:+32(0)36897394"><img class="fa" src="images/icon-phone.png" alt="电话"/></a>：+32（0）3689 7394</p>
				<p><a href="mailto:info@lumiagem.com"><img class="fa" src="images/icon-email.png" alt="邮箱"/></a>：info@lumiagem.com</p>
				<p><img class="fa" src="images/icon-wechat.png" alt="微信"/>：请扫描右侧二维码</p>
				<p><a href="#" onclick="codeAddress('Pelikaanstraat 62,2018 Antwerp Belgium')"><img class="fa" src="images/icon-address.png" alt="地址"/></a>：Pelikaanstraat 62,2018 Antwerp Belgium(比利时安特卫普)</p>
				</div>
			</div>
			<div class="aboutus_weixin"></div>
		</div>
	</div>
</div>
<?php include_once('footer.php');?>
</body>
</html>
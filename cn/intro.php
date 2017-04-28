<?php
$title = "";
if (isset($_GET['c'])) {
    if ($_GET['c'] == 'order') {
        $title = "预约购买";
    } else if ($_GET['c'] == 'tochina') {
        $title = "直邮中国";
	} else if ($_GET['c'] == 'route') {
	    $title = "交通指示";
	} else if ($_GET['c'] == 'maintain') {
	    $title = "终生保养";
	} else if ($_GET['c'] == 'gia') {
	    $title = "GIA认证";
	} else if ($_GET['c'] == 'hrd') {
	    $title = "HRD认证";
	} else if ($_GET['c'] == 'igi') {
	    $title = "IGI认证";
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <title>
            <?php echo $title; ?> - 利美钻石
        </title>
        <?php include_once 'header.php';?>
    </head>
    <body>
        <div class="zhuti clear">
            <?php
include_once 'topbar.php';
?>
            <div class="contain clear">
                <div class="div_down" >
                    <div class="text-title" style="left:34%;">
                        <span>
                            <?php echo $title; ?>
                        </span>
                    </div>
                    <div class="text-top" style="left:14%;">
                        <img class="ring" src="../images/ring.png"></img>
                    </div>
                    <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-9">
                        <?php
if (isset($_GET['c']) && $_GET['c'] == 'order') {
    ?>
                        <?php
} else if (isset($_GET['c']) && $_GET['c'] == 'resize') {
    ?>
                        <?php }
?>
                    </div>
                </div>
              </div>
    <div class="div_down">
		<div class="text-bottom" style="left:14%;"></div>
   	</div>
            </div>
        </div>
        <?php include_once 'footer.php';?>
    </body>
</html>

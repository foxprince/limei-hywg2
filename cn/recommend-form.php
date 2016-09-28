<div id="budgetform">
    <div id="diamond-recommendation-form">

        <div class="diamond-recommendation-form-title">
            <div onclick="closeRecoBox()">x</div>
        </div>

        <div class="diamond-recommendation-form-body">
        <p class="reco-form-title">请输入您的预算，我们将为您推荐适合的钻戒</p>

        <form method="post" id="reco-form" action="diamonds-rings.php">

            <div>
            <input name="budgetGiven" type="hidden" value="yes" />
            <input type="text" name="budget" id="theinputbudgetfromthepopupform" value="" placeholder="您的预算"/>
            
            <select name="currency">
                <option value="EUR" <?php if ($currency == 'EUR') { ?>selected="selected"<?php } ?>>欧元</option>
                <option value="CNY" <?php if ($currency == 'CNY') { ?>selected="selected"<?php } ?>>人民币</option>
                <option value="USD" <?php if ($currency == 'USD') { ?>selected="selected"<?php } ?>>美元</option>
                <option value="GBP" <?php if ($currency == 'GBP') { ?>selected="selected"<?php } ?>>英镑</option>
            </select>
            <p class="recobtn-box"><button type="button" class="reco-btn" onclick="budget_submit()"> 推 荐 </button></p>                   
            </div>

        </form>
        
        <script type="text/javascript">
				function budget_submit(){
					var the_budget=$('#theinputbudgetfromthepopupform').val();
					if(isNaN(the_budget)){
						alert('请输入正确的预算');
						return;
					}else{
						$('form#reco-form').submit();
					}
				}
				$(document).ready(function(){
					$('#budgetform').fadeIn('slow');
				});
				function closeRecoBox(){
					$('#budgetform').fadeOut('slow');
				}
        </script>


        </div>
    </div>
</div>

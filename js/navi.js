 <!--TrackInlineShoppingBagLinksClick('Inline Shopping/Saved Items', 'Paginate')     left-box-->
 <!--TrackInlineShoppingBagLinksClick('Inline Shopping/Saved Items', 'Paginate')     right-box-->
 

 
 
 
 function TrackInlineShoppingBagLinksClick(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackInlineShoppingBagLinksClick(argPageTitle, argAction);
    }

}


function GATrackAction(argPageTitleSource , argAction,skuValue)
{
	if(! IsNullOrEmpty(argAction ))
	{
	    if (argAction == 'Add to SavedItems') 
	    {
	        if (! IsNullOrEmpty(skuValue))	
		        SetCustomVariableForSaveItem(skuValue); 
			GATrackActionAddToSavedItems (argPageTitleSource);
		}
		else if ( argAction == 'Add to ShoppingBag')
		{
			GATrackActionAddToShoppingBag(argPageTitleSource); 
		}
		else 
		{
			if(IsDefined(USER_ACTIVITIES)==true && IsDefined(argPageTitleSource)==true && IsDefined(argAction))
			{
				TrackEvent(USER_ACTIVITIES,argPageTitleSource,argAction);
			}
		}
	}
}

function TrackEventAction(category, action, label,value)
{
		
	if(IsDefined(pageTracker ))
	{		
		if( IsNullOrEmpty( value)== true)
		{			
			pageTracker._trackEvent(category , action, label);
		}
		else
		{
			pageTracker._trackEvent(category , action, label,value);
		}
	}
}
 
 
function SetCustomVariableForSaveItem(skuValue) 
{
    SetCustomVariable(SAVE_ITEM_SLOT, SAVE_ITEM_NAME, skuValue, VISITOR_LEVEL_SCOPE,false);  
}

 function SetCustomVariable(custVarSlot, custVarName, custVarValue, custVarScope,requiresPageView) {

     //slots 1,2,3,4,5 total. Only 5 slots are available in total. Do not send any other value, it will be ignored. 
    //scope 1=>visitor level, 2=>Session Lvele 3=>Page Level. Do not send anything else apart from 1,2,3.
     custVarValue = TrimString(custVarValue);
     if (!IsNullOrEmpty(custVarValue)) 
     {
         custVarValue = ReplaceSpacesWithUnderScore(custVarValue);
         pageTracker._setCustomVar(
      custVarSlot,                   // This custom var is set to this slot
      custVarName,           // Name of custom variable.
      custVarValue,      // Sets the value of "Section" to "Life & Style" for this particular aricle
      custVarScope                    // Sets the scope to page-level as default from GAHelper class.
                             );

         if (requiresPageView == true) 
         {
             TrackPageView();
         }
     } 

 }
 
 
 
 
 
 
 
 
 
 
 
 
  




















 function omnitureTrackInlineShoppingBagLinksClick(argPageTitle, argAction) {
     if (!IsNullOrEmpty(argPageTitle) && !IsNullOrEmpty(argAction)) {
         s.prop8 = argPageTitle + " -> " + argAction;
         SetlinkTrackVars("prop8");
         s.tl(true, 'o', argPageTitle + " -> " + argAction);
         ClearlinkTrackVars();
     }
 }


function TrackInlineShoppingBagLinksClick(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackInlineShoppingBagLinksClick(argPageTitle, argAction);
    }

}

<!--****************************************-->



function SetlinkTrackVars(vars, evts) {
    if (!IsNullOrEmpty(vars)) { s.linkTrackVars = vars; }
    if (!IsNullOrEmpty(evts)) { s.linkTrackEvents = evts; }
}


function ClearlinkTrackVars() {
    s.linkTrackVars = "None";
    s.linkTrackEvents = "None";
}

<!--********************************-->



function GATrackActionAddToSavedItems (sourceOfAdd)
{
	var drillDownLevel1 = 'Add' ;
	var drillDownLevel0 = 'Saved Items';
	var drillDownLevel2 = sourceOfAdd;
	//var drillDownPath = GetVirtualPageViewPath(drillDownLevel0,drillDownLevel1,drillDownLevel2);
	TrackEvent(drillDownLevel0,drillDownLevel1,drillDownLevel2);
	//TrackPageView(drillDownPath);
	
}

function GATrackActionAddToShoppingBag(sourceOfAdd )
{
    var cookieCnt = parseInt(CookieManager.getCookieValue("shoppingbagcnt"));
    var drillDownLevel1 ;
    var drillDownLevel0 = 'Shopping Bag';
    var drillDownPath ;

		if (!isNaN(cookieCnt) && cookieCnt > 0)
		{	// nothing to do 
		}
		else 
		{
			drillDownLevel1 = 'sc Open';
			TrackEvent (drillDownLevel0, drillDownLevel1, sourceOfAdd); 
					
		}
		drillDownLevel1 = 'sc Add';
		//drillDownPath =  GetVirtualPageViewPath(drillDownLevel0,drillDownLevel1,sourceOfAdd);
		//TrackPageView (drillDownPath);		
		TrackEvent(drillDownLevel0,drillDownLevel1,sourceOfAdd);
}
 
 function IsDefined( variable)
{

    if (typeof(variable) != 'undefined' && variable != null && variable != 'undefined') { return true; }
	else{return false;}
	

}
 
 function TrackEvent(category, action, label,value)
{			
	TrackEventAction(category,action,label,value);			
}
 
 
 function IsNullOrEmpty(variable)
{
	if(variable ==null || variable =='undefined' || variable =='')
	{ return true;}
	else {return false;}
}
 

  function GetVirtualPageViewPath(level0,level1,level2,level3)
 {	var slash = '/';
	var retVal;
	if(IsDefined(level0) && IsDefined(level1) && IsDefined(level2) && IsDefined(level3))
	{
		retVal= slash + level0 + slash + level1 + slash +level2 + slash +level3;
	}
	else if (IsDefined(level0) && IsDefined(level1) && IsDefined(level2))
	{
		retVal= slash + level0 + slash + level1 + slash +level2 ;
	}
	else if(IsDefined(level0) && IsDefined(level1) )
	{
		retVal= slash + level0 + slash + level1;
	}
	else if(IsDefined(level0) )
	{
		retVal= slash + level0;
	}
	// All virtual pageviews should go under /Virtual Folder/ in GA reports.
	retVal = slash + 'Virtual' +retVal ; 
	return retVal;
	
 }
 
 
 function TrackPageView(drillDownPath)
{
	if(IsDefined(pageTracker) == true )
	{	
		if(IsNullOrEmpty(drillDownPath) == false)
		{			
			pageTracker._trackPageview(drillDownPath);
		}
		else{pageTracker._trackPageview();}
	}	
	
}
 
 
 
 
 
 
var engagementObj = null;
var carouselPos = 0;
var selectedFilters = []; // Currently selected filters
var filterRingArray = {}; // This provides a reverse mapping of filters to ring skus
var activeFilters = { // Provides all active filters for each filter category based on current filter selections.
  "1000" : [],
  "2000" : [],
  "3000" : [],
  "4000": [],
  "5000": []
};
var engravingOptionHash = "param+0/0/0/0/0/0";

function preloadEngagementImages() {
  var images = new Array();
  var imgcount = 0;
  var rings = engagementObj.Groups;
  var imagePath = engagementObj.imagePath;
  for (var i in rings) {
    images[imgcount] = new Image();
    images[imgcount].src = URLFactory.scene7ImageURL(rings[i].lrgImage, "$EngagementBrowseL$", "", "0.0,-0.1,1.0,1.0");
    images[imgcount+1] = new Image();
    images[imgcount+1].src = URLFactory.scene7ImageURL(rings[i].lrgImageOver, "$EngagementBrowseL$", "", "");
    imgcount = imgcount + 2;
  }
}
// Populates the filterRingArray which allows reverse lookup if ring skus via filter number
function populateFilterRingArray() {
	var rings = engagementObj.Groups;
	var filters = engagementObj.Filter
	for (var i in rings) {
		var ring = rings[i];
		for (var j in ring.Filter) {
			var filter = ring.Filter[j];
			if (typeof filterRingArray[filter] == "undefined") {
				filterRingArray[filter] = [];
			}
			filterRingArray[filter].push(ring.GroupId);				
		}
	}
}
// Find the common elements in 2 arrays and return a new array with those elements
function findCommonArrayElements(a1, a2) {
	var newArr = [];
	for (var i=0; i < a1.length; i++) {
		if ($.inArray(a1[i], a2) >= 0) {
			newArr.push(a1[i]);
		}
	}
	return newArr;
}

// Draw the UI for a single ring
function drawEngagementRing(id, imgSrc, imgSrcOver, ringTitle) {
    var elem = $('<div id="groupID_' + id + '" class="quarter"><span class="img-container"><img class="engImg" src="' + URLFactory.scene7ImageURL(imgSrc, "$EngagementBrowseL$", "", "0.0,-0.1,1.0,1.0") + '" /><a class="engagementItemPageLink" href="Item.aspx?mcat=148203&groupSKU=' + id + '" onclick="if ($(this).find(\'img\').css(\'opacity\') < 1){return false;}"><img class="engImgOver" src="' + URLFactory.scene7ImageURL(imgSrcOver, "$EngagementBrowseL$", "", "") + '" /></a></span><div><h2 class="t3">' + ringTitle + '</h2><a href="Item.aspx?mcat=148203&groupSKU=' + id + '" class="l6 engagementItemPageLink">' + txtViewDetails + '</a></div></div>');
  elem.find(".engImgOver").fadeTo(0,0);
  if ($("body").hasClass("ie-7") || $("body").hasClass("ie-8")) {
  	elem.find(".engagementItemPageLink").css("visibility","hidden");
  }
  return elem;
}
// This function is used to populate the browse UI based on the currently selected filters.
function populateEngagementRings(filterArray) {
  $("#engagement-grid").fadeTo(0, 0);
  $("#engagement-grid .container").html("");
  var rings = engagementObj.Groups;
  var count = 0;
  var currentGridContainer = $('<div class="grid-container"></div>');
  $("#engagement-grid .container").append(currentGridContainer);
  resetActiveFilters();
  for (var i in rings) {
    var ring = rings[i];
    var hasAllFilters = true;
    var numFilters = 0;
    if (selectedFilters.length > 0) {
      for (var j=0; j<selectedFilters.length; j++) {
        if ($.inArray(selectedFilters[j], ring.Filter) < 0) {
          hasAllFilters = false;
        }
      }
      $("#engagement-paging .allRingsLabel").hide();
      $("#engagement-paging .numRings").show();
      $("#resetAllMsg").show();
      $("#refineSearchMsg").hide();
    } else {
      $("#engagement-paging .allRingsLabel").show();
      $("#engagement-paging .numRings").hide();
      $("#resetAllMsg").hide();
      $("#refineSearchMsg").show();
    }
    // If a ring is associated with all of the selected filters, we can add it to the UI
    if (hasAllFilters) {
      if (count > 0 && count % 4 == 0) {
        currentGridContainer = $('<div class="grid-container"></div>');
        $("#engagement-grid .container").append(currentGridContainer);
      }
      count++;
      var ringElem = drawEngagementRing(i, ring.LrgImage, ring.LrgImageOver, ring.Name);
      $(currentGridContainer).append(ringElem);
    }
  }
  // If the count is < 4, we need to center the rings in the grid.
  if (count > 0 && count < 4) {
    currentGridContainer.find(".quarter:first").css("margin-left", (24.25 * (4 - count)) / 2 + "%");
  }
  $("#engagement-paging .currentPage").text("1");
  $("#engagement-grid .container").css("left","0");
  initTouchpager();
  // if carouselPos isn't 0, we've arrived via back button and need to go to the appropriate 
  // page in the grid
  if (carouselPos > 0) {
  	gotoCarouselPage(carouselPos);
  } 
  $("#engagement-paging .numRings").text(count);
  populateActiveFilterArray();
  disableFilters();
  
  var imgCount = 0;
  $("#engagement-grid .container img").load(function () {
      imgCount++;

      if (imgCount == $("#engagement-grid .container img").length) {
          resizeTouchPager();      	
          $("#engagement-grid").fadeTo(500, 1);
      }
  });
  
  $("#engagement-paging .engCarouselPos").text("1");
  $("#engagement-paging .engCarouselNum").text(parseInt(count / 4) + (count % 4 != 0 ? 1 : 0));
  $("#engagement-paging").fadeIn();
}

// This function adds filters to the activeFilter array
function extendActiveFilterArray(filterArray, groupChar) {
  var arrayGroup =  groupChar + "000";
  // For each filter, determine if it is part of the designated arrayGroup.  If it is, determine if it is
  // already in the active filter array.  If not, add it.
  for (var i=0; i< filterArray.length; i++) {
    if (filterArray[i].charAt(0) == groupChar) {
      if ($.inArray(filterArray[i], activeFilters[arrayGroup]) < 0) {
        activeFilters[arrayGroup].push(filterArray[i]);
      }
    }
  }
}

// This function populates the activeFilters arrays which are used to determine which filters
// should remain active based on the selected filters
function populateActiveFilterArray() {
    // Cycle through the 5 filter categories 1(000) to 5(000)
	for (var i=1; i<=5; i++) {
		var validSkus = [];
        // For each filter category, cycle through all selected filters
		for (var j=0; j<selectedFilters.length; j++) {
			var filter = selectedFilters[j];
            // If this filter is not in the i category, we can look for active filters.  If it is in
            // the i category we can ignore because selected filters have no bearing on other filters
            // in the same filter category.
			if (i != parseInt(selectedFilters[j].charAt(0))) {
                // add all ring skus associated with the selected filter to the validSkus array
				if (validSkus.length == 0) {
					validSkus = filterRingArray[filter];
				} else {
					validSkus = findCommonArrayElements(validSkus, filterRingArray[filter]);
				}
			}
		}
        // for each valid sku, determine if its associated filters should be active or inactive
		for (var k=0; k< validSkus.length; k++) {
			var sku = validSkus[k];
			extendActiveFilterArray(engagementObj.Groups[sku].Filter, i);
		}
	}
}

function countNumActiveFilters() {
  var count = 0;
  for (var i in activeFilters) {
    if (activeFilters[i].length > 0) {
      count++;
    }
  }
  return count;
}

// This function is used to disable or re-enable filter links
function disableFilters() {
  // if there are no filters selected, return
  if (selectedFilters.length == 0) {
    clearAllFilters();
    return;
  }
  // Cycle through all filters to determine which are active and which are inactive
  for (var i in engagementObj.Filters) {
    var count = 0;
    var filterCategory = engagementObj.Filters[i].Id.charAt(0) + "000";
    for (var j in activeFilters) {
      if ($.inArray(engagementObj.Filters[i].Id, activeFilters[j]) >= 0) {
        count++;
      }
    }
    // If filter i is in the activeFitler array, show it
    // If filter i is not in the array, but there is only one selected filter and filter i is in the selected filter's category, then show it
    if (($.inArray(i, activeFilters[filterCategory]) >=0) || (selectedFilters.length == 1 && selectedFilters[0].charAt(0) == engagementObj.Filters[i].Id.charAt(0))) {
        // if the filter has an "inactive" class the we need to remove that class
        if ($("#engagementFilter_"+engagementObj.Filters[i].Id).hasClass("inactive")) {
            $("#engagementFilter_"+engagementObj.Filters[i].Id).removeClass("inactive");
            // If the filter has an icon we need to revert it to the original icon state
            if (filterCategory == "1000" || filterCategory == "2000") {
                var imgElem = $("#engagementFilter_"+engagementObj.Filters[i].Id).find("img");
                imgElem.attr("src", imgElem.attr("src").split(".")[0].split("_")[0]+".png");
            }
        }
    // else this filter is inactive
    } else { 
      $("#engagementFilter_"+engagementObj.Filters[i].Id).addClass("inactive");
	  // if the filter has an icon, swap out the icon with the inactive version
      if (filterCategory == "1000" || filterCategory == "2000") {
          var imgElem = $("#engagementFilter_" + engagementObj.Filters[i].Id).find("img");
          var domain = "http://" + document.domain;
          var str = imgElem.attr("src").replace(domain, "").split(".")[0].split("_")[0];
        imgElem.attr("src", str + "_inactive.png");
      }      
    }
  }
}

// Generates the filters UI for a single filter group
function populateFilterGroup(catName, groupID, filterIDArray) {
  var category = $("#engagementCat_"+groupID);
  var filters = "";
  var sectionTitle;
  var imagePath = "/shared/images/engagement/";
  var numFilters = filterIDArray.length;
  var divider = 5;
  category.find(".t8 span").text(catName);
  category.find(".grid-container").html("");
  if (numFilters <= 5) {
      sectionTitle = "col5";
  } else {
      sectionTitle = "onehalf";
      if (numFilters % 2 == 0) {
          divider = numFilters / 2;
      } else {
          divider = parseInt(numFilters / 2) + 1;
      }
  }
  for (var i=0; i< numFilters; i++) {
    var filterID = filterIDArray[i];
    var filterObj = engagementObj.Filters[filterID]
    if (i%divider == 0) {
      filters += '<div class="'+sectionTitle+'">';
    }
    filters += '<a id="engagementFilter_'+filterObj.Id+'" href="#">';
    if (typeof filterObj.IconName != "undefined" && filterObj.IconName != "") {
      filters += '<span class="filter_icon"><img src="'+imagePath+filterObj.IconName+'.png" /></span> ';
    }
    filters += '<span>'+filterObj.Name+'</span></a><br/>';
    if (i % divider == divider - 1) {
      filters += '</div>';
    }
  }
  category.find(".grid-container").html(filters);
}

// Build filter UI
function populateEngagementCategories() {
  var categories = engagementObj.Categories;
  for (var i=0; i<categories.length; i++) {
    populateFilterGroup(categories[i].Name, categories[i].Id, categories[i].Filter);
  }
}

// User filter selection action
function addFilter(filterLinkID) {
  var filterValue = filterLinkID.split("engagementFilter_")[1];
  var previousSelection = $("#"+filterLinkID).parent().parent().parent().find("a.selected:not(#"+filterLinkID+")");
  selectedFilters.push(filterValue);
  if (previousSelection.length > 0) {
    previousSelection.removeClass("selected");
    if (previousSelection.find("img").length > 0) {
      previousSelection.find("img").attr("src", previousSelection.find("img").attr("src").split(".")[0].split("_")[0]+".png");
    }
    removeFilter(previousSelection.attr("id"));
  }
}

// User filter de-selection action
function removeFilter(filterLinkID) {
  var filterValue = filterLinkID.split("engagementFilter_")[1];
  selectedFilters.splice( $.inArray(filterValue, selectedFilters), 1 );
  if ($("#"+filterLinkID).closest(".grid-container").find("a.selected").length == 0) {
    $("#"+filterLinkID).closest(".grid-container").parent().find("a.resetfilter").hide();
  }
}
function clearAllFilters() {
  selectedFilters = [];
  $("#refinement .resetfilter").hide();
  $("#refinement .inactive, #refinement .selected").each(function() {
    var imgElem = $(this).find("img");
    $(this).removeClass("inactive").removeClass("selected");
    if (imgElem.length > 0) {
      imgElem.attr("src", imgElem.attr("src").split(".")[0].split("_")[0]+".png");
    }
  });
  
  $("#refinement .selected").removeClass("selected");
}
function pageCarousel(event, newCarouselPosition) {
  var rings = $("#engagement-grid .grid-container .quarter");
  if (newCarouselPosition < 0 || newCarouselPosition >= rings.length) {
    event.preventDefault();
    return false;
  }
  $("#engagement-grid .grid-container").fadeTo(0, 0);
  rings.hide();
  carouselPos = newCarouselPosition;
  for (var i=carouselPos; i < carouselPos+4 && i < rings.length; i++) {
    $(rings[i]).show();
  }
  $(rings[carouselPos]).css("margin-left","0px");
  $("#engagement-grid .grid-container").fadeTo(400, 1);
  $("#engagement-paging .engCarouselPos").text(parseInt((carouselPos+4)/4)+((carouselPos+4) % 4 != 0 ? 1 : 0));
  
  if (carouselPos > 0) {
    $("#engagement-grid .saved-left").show();
  } else {
    $("#engagement-grid .saved-left").hide();
  }

  if (carouselPos+4 >= rings.length) {
    $("#engagement-grid .saved-right").hide();
  } else {
    $("#engagement-grid .saved-right").show();
  }
updateURLWithEgravingOptions();

  event.preventDefault();
}

function gotoCarouselPage(index) {
	var gridContainers = $("#engagement-grid .grid-container");
	if (index < gridContainers.length) {
		$("#engagement-grid .current").removeClass("current");
		$(gridContainers[index]).addClass("current");
		$("#engagement-grid .container").css("left", (-1*index*100)+"%");
		if (index == gridContainers.length-1) {
			$("#engagement-grid").find(".page-right-box span").hide();
		} else {
			$("#engagement-grid").find(".page-right-box span").show();
		}
		if (index > 0) {
			$("#engagement-grid").find(".page-left-box span").show();
		} else {
			$("#engagement-grid").find(".page-left-box span").hide();
		}
		$(".currentPage").text(parseInt(index)+1);
	}
}

function resetAll(event) {
  clearAllFilters();
  carouselPos = 0;
  updateURLWithEgravingOptions();
  populateEngagementRings();
  event.preventDefault();
  $("#resetAllMsg").hide();
  $("#refineSearchMsg").show();
}
function resetActiveFilters() {
  for (var i in activeFilters) {
    activeFilters[i] = [];
  }
}
function updateURLWithEgravingOptions() {
  setEngravingOptionHash();
  location.hash = engravingOptionHash;
  HistoryManager.getInstance().addHistoryItem(engravingOptionHash);
}
function setEngravingOptionHash() {
  var shape = 0;
  var setting = 0;
  var metal = 0;
  var tiffdesign = 0;
  var diamondColor = 0;
  var page = 0;
  var shapeSelection = $("#engagementCat_1000").find(".selected");
  var settingSelection = $("#engagementCat_2000").find(".selected");
  var metalSelection = $("#engagementCat_3000").find(".selected");
  var tiffdesignSelection = $("#engagementCat_4000").find(".selected");
  var diamondColorSelection = $("#engagementCat_5000").find(".selected");
  if (shapeSelection.length > 0) {
    shape = shapeSelection.attr("id").split("engagementFilter_")[1];
  }
  if (settingSelection.length > 0) {
    setting = settingSelection.attr("id").split("engagementFilter_")[1];
  }
  if (metalSelection.length > 0) {
    metal = metalSelection.attr("id").split("engagementFilter_")[1];
  }
  if (tiffdesignSelection.length > 0) {
    tiffdesign = tiffdesignSelection.attr("id").split("engagementFilter_")[1];
  }
  if (diamondColorSelection.length > 0) {
    diamondColor = diamondColorSelection.attr("id").split("engagementFilter_")[1];
  } 
  if (carouselPos > 0) {
    page = carouselPos;
  }
  engravingOptionHash = "param+" + shape + "/" + setting + "/" + metal + "/" + tiffdesign + "/" + diamondColor + "/" + page;
  
}

function setFiltersFromUrlHash(suppressHistory) {
  var options;

  suppressHistory = (typeof(suppressHistory) == "undefined") ? false : suppressHistory;

  if (window.location.hash.indexOf("param+") > -1) {
    options = decodeURIComponent(window.location.hash.split("param+")[1]).split("/");
  } else {
    return;
  }
  if (options.length == 6) {
    for (var i = 0; i < 5; i++) {
      if (options[i] != 0) {
        var imageElem = $("#engagementFilter_"+options[i]).find("img");
        $("#engagementFilter_"+options[i]).addClass("selected");
        if (imageElem.length > 0) {
          imageElem.attr("src", imageElem.attr("src").split(".")[0].split("_")[0]+"_selected.png");
        }
        addFilter("engagementFilter_"+options[i]);
        $("#engagementFilter_"+options[i]).parent().parent().parent().find(".resetfilter").show();
      }
    }
      carouselPos = parseInt(options[5]);
	if (suppressHistory == false) {
      updateURLWithEgravingOptions();
	}
  }
}

function fetchEngementRingData(){
	$.ajax({
		url: "/engagement/dataprovider.aspx",
		type: "POST",
		data: '',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (data)
		{
			engagementObj = data.ResponseObject;
			initEngagementBrowse();
		},
		error: function (jqXHR, status, error)
		{
	
		}
	});			
}

function initEngagementBrowse(){
  preloadEngagementImages();
  populateEngagementCategories();
  populateFilterRingArray();
  setFiltersFromUrlHash();
  populateEngagementRings(selectedFilters);
  //$("#engagement-grid .saved-right").click(function(event){pageCarousel(event, carouselPos+4);});
  //$("#engagement-grid .saved-left").click(function(event){pageCarousel(event, carouselPos-4);});
  $("#resetAllMsg a").click(function(event){resetAll(event)});
  
  $(window).resize(function () {
  	resizeTouchPager();
  });

  //engagement ring hovers
  $("body").on("mouseenter", "#engagement-grid span.img-container", function (e) {
      if ($("body").hasClass("ie-7") || $("body").hasClass("ie-8")) {
          $(this).find(".engImg").stop().fadeTo(400, 0, function(){$(this).css("visibility","hidden");});
          $(this).find(".engImgOver").css("visibility","visible").stop().fadeTo(400, 1);      	
          $(this).siblings("div").css("visibility", "visible");
      } else {
          $(this).find(".engImg").stop().fadeTo(400, 0);
          $(this).find(".engImgOver").stop().fadeTo(400, 1);      	
          $(this).siblings("div").stop().fadeTo(400, 1);
      }
  });

  $("body").on("mouseleave", "#engagement-grid .grid-container > div", function (e) {
      var img = $(this).find("img.engImg");
      var imgOver = $(this).find("img.engImgOver");

      if ($("body").hasClass("ie-7") || $("body").hasClass("ie-8")) {
		      imgOver.stop().fadeTo(400, 0, function(){$(this).css("visibility","hidden");});
 		      img.stop().css("visibility","visible").fadeTo(400, 1);      	
          img.parent().siblings("div").css("visibility", "hidden");       
      } else {
 		      imgOver.stop().fadeTo(400, 0);
 		      img.stop().fadeTo(400, 1);      	
          img.parent().siblings("div").stop().fadeTo(400, 0);
      }
  });
  //end engagement ring hovers


  //engagement filters
  $("body").on("click", "#refinement .grid-container a", function (e) {
      var imageElem = $(this).find("img");
      if ($(this).hasClass("inactive")) {
          return false;
      }
      if ($(this).hasClass("selected")) {
          $(this).removeClass("selected");
          removeFilter($(this).attr("id"));
          if (imageElem.length > 0) {
            imageElem.attr("src", imageElem.attr("src").split(".")[0].split("_")[0]+".png");
          }
      } else {
          $(this).addClass("selected");
          addFilter($(this).attr("id"));
          if (imageElem.length > 0) {
            imageElem.attr("src", imageElem.attr("src").split(".")[0].split("_")[0]+"_selected.png");
          }
          $(this).parent().parent().parent().find(".resetfilter").show();
      }
      carouselPos = 0;
      updateURLWithEgravingOptions();
      populateEngagementRings();
      return false;
  });

  $("body").on("click", "#refinement .resetfilter", function (e) {
      var selectedFilter = $(this).parent().parent().find("a.selected");
      var selectedFilterIcon =  selectedFilter.find("img");
      selectedFilter.removeClass("selected");
      if (selectedFilterIcon.length > 0) {     	
      	selectedFilterIcon.attr("src", selectedFilterIcon.attr("src").split(".")[0].split("_")[0]+".png");
      }
      removeFilter(selectedFilter.attr("id"));
      $(this).hide();
      carouselPos = 0;
      updateURLWithEgravingOptions();
      populateEngagementRings();
      return false;
  });

  $("body").on("click", ".engagementItemPageLink", function (e) {
      $(this).attr("href", $(this).attr("href") + "&origin=engagement&search_params=" + engravingOptionHash);
      if ($(this).children("img").css("opacity") == 1) {
          $("#engagement-grid .grid-container > div").trigger("mouseleave");
      }
  });
  
  $("#engagement-grid .page-right-box").click(function() {
  	carouselPos = parseInt($("#engagement-grid .currentPage").text());
  	updateURLWithEgravingOptions();
  });
  $("#engagement-grid .page-left-box").click(function() {
  	carouselPos = parseInt($("#engagement-grid .currentPage").text())-2;
  	updateURLWithEgravingOptions();
  });

  $(HistoryManager.getInstance()).bind("historyChanged", function (e, data) {
  	var options = "";
		var carouselPos = 0;

		selectedFilters = [];
		clearAllFilters();
    setFiltersFromUrlHash(true);
    populateEngagementRings(selectedFilters);

  });

  //end engagement filters  
}

$(document).ready(function(){  
  fetchEngementRingData(); 
});
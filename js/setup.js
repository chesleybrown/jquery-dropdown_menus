$(document).ready(function() {
	
	/*
	 * Setup Record Form Dropdown Menus
	 */
	function setupFormDropdownMenus(container) {
		$(container).find('div.use_form_menu').dropdownMenus({
			show_effect: function(e) {
				e.addClass('hover');
			},
			hide_effect: function(e) {
				e.removeClass('hover');
			}
		});
		
		// this handles when a user selects an option from a dropdown menu
		$(container).find('div.use_form_menu ul.menu_items li.menu_item').bind('click', function(e) {
			
			// init
			var menu_header = $(this).parents('.menu_large').find('li.menu_header');
			var menu_header_text = menu_header.find('.menu_header_text');
			var menu_header_icon = menu_header.find('.menu_header_icon');
			var menu_item_text = $(this).find('.menu_item_text').text();
			var menu_item_icon = $(this).find('.menu_item_icon');
			var menu_item_value = $(this).find('.menu_item_value').text();
			var input = $(this).parents('.menu_large').next('input');
			
			// change header
			menu_header_text.text(menu_item_text);
			menu_header_icon.attr('class', menu_item_icon.attr('class'));
			menu_header_icon
				.removeClass('menu_item_icon')
				.addClass('menu_header_icon');
			input.val(menu_item_value);
		});
	}
	setupFormDropdownMenus('body');
	/*
	 * END Setup Record Form Dropdown Menus
	 */
	
});
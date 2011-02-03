/*
 * jQuery RecordMenus 0.9
 * 
 * Dynamic dropdown menu that can be used for a variety of tasks
 * 
 * @author Chesley Brown
 * 
 */

(function($){
	$.fn.dropdownMenus = function(options, optionName, value)
	{
		// call functions if provided
		switch (options) {
			case 'show':
				return show($(this));
				break;
			
			case 'hide':
				return hide($(this));
				break;
			
			case 'select':
				return select($(this), optionName); //optionName = value
				break;
		}
		
		// default settings
		var settings = {
			site_master_selector: 'body',
			parent_block_selector: false,
			menu_header_selector: 'ul.menu_headers li.menu_header',
			menu_items_selector: 'ul.menu_items',
			active_class: 'active', // this is applied to both the menu container and the menu header
			show_effect: function(e) {
				e.show();
			},
			hide_effect: function(e) {
				e.hide();
			}
		};
		
		// merge user provided options
		if (options) {
			$.extend(settings, options);
		}
		
		// init
		var menus = $(this);
		var site_master = $(settings.site_master_selector);
		var site_master_dropdown_menus = site_master.data('dropdown_menus');
		
		//save settings to data
		menus.data('dropdown_menu_settings', settings);
		menus.data('dropdown_menu_menus', menus);
		
		//if dropdown menus exists, append more... else create new array of dropdowns
		if (!site_master_dropdown_menus) {
			site_master_dropdown_menus = [];
		}
		
		site_master_dropdown_menus.push(menus);
		site_master.data('dropdown_menus', site_master_dropdown_menus);
		
		// clicking outside menu closes all menus that might be open
		site_master.bind('click.dropdownMenuMaster', function(e) {
			var container = menus;
			
			container.each(function(e) {
				var menu_items = $(this).find(settings.menu_items_selector);
				if (menu_items.is(':visible')) {
					hide($(this));
				}
			});
		});
			
		
		// init the menus
		menus.each(function() {
			
			//init
			var menu = $(this);
			var menu_items = menu.find(settings.menu_items_selector);
			var menu_parent = false;
			
			//determine if using parent block to init hover action
			if (settings.parent_block_selector) {
				self_or_menu_parent = menu_parent = menu.parents(settings.parent_block_selector);
			}
			else {
				self_or_menu_parent = menu;
			}
			
			self_or_menu_parent.hover(
				function(e) {
					show(menu);
				},
				function(e) {
					if (menu_items.is(':hidden')) {
						hide(menu);
					}
				}
			);
			
			if (menu_parent) {
				menu_parent.bind('click.dropdownMenu', function(e) {
					
					/* 
					 * this prevents the menu from completely disappearing if the user
					 * simply clicked outside the menu, but within the same record
					 */
					if (menu_items.is(':visible')) {
						hide_menu(menu);
						e.stopPropagation();
					}
					
				});
			}
			
			menu.bind('click.dropdownMenu', function(e) {
				toggle_menu(menu);
				e.stopPropagation();
			});
			
		});
		
		function show(menu) {
			//init
			var settings = menu.data('dropdown_menu_settings');
			
			settings.show_effect(menu);
			
			return true;
		}
		
		function hide(menu) {
			//init
			var settings = menu.data('dropdown_menu_settings');
			var menu_items = menu.find(settings.menu_items_selector);
			
			settings.hide_effect(menu);
			hide_menu(menu, settings);
			
			return true;
		}
		
		function toggle_menu(menu) {
			//init
			var settings = menu.data('dropdown_menu_settings');
			var menu_items = menu.find(settings.menu_items_selector);
			
			if (menu_items.is(':hidden')) {
				show_menu(menu, settings);
			}
			else {
				hide_menu(menu, settings);
			}
			
			return true;
		}
		
		function show_menu(menu) {
			//init
			var settings = menu.data('dropdown_menu_settings');
			var menus = menu.data('dropdown_menu_menus');
			var menu_header = menu.find(settings.menu_header_selector);
			var menu_items = menu.find(settings.menu_items_selector);
			
			//close all other menus
			hide_all(settings.site_master_selector, menu);
			
			menu_items.fadeIn('fast');
			menu.addClass(settings.active_class);
			menu_header.addClass(settings.active_class);
			
			return true;
		}
		
		function hide_menu(menu) {
			//init
			var settings = menu.data('dropdown_menu_settings');
			var menu_header = menu.find(settings.menu_header_selector);
			var menu_items = menu.find(settings.menu_items_selector);
			
			menu_items.hide();
			menu.removeClass(settings.active_class);
			menu_header.removeClass(settings.active_class);
			
			return true;
		}
		
		function hide_all(site_master_selector, current_menu) {
			//init
			var site_master = $(site_master_selector);
			var site_master_dropdown_menus = site_master.data('dropdown_menus');
			
			//close all other menus globally
			if (site_master_dropdown_menus) {
				for (index in site_master_dropdown_menus) {
					$(site_master_dropdown_menus[index]).not(current_menu).each(function(e) {
						if ($(this).is(':visible')) {
							hide($(this));
						}
					});
				}
			}
			
			return true;
		}
		
		// select a menu option by it's value
		function select(menu, value) {
			//init
			var settings = menu.data('dropdown_menu_settings');
			var menu_items = menu.find(settings.menu_items_selector);
			
			$(menu_items).find('.menu_item').each(function() {
				if ($(this).find('.menu_item_value').text() == value) {
					$(this).trigger('click');
				}
				
			});
		}
		
		return true;
		
	}
})(jQuery); 
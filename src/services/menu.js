export const getLeftMenuData = [

	//test
	//   {
	// 	icon: "el-icon-menu",
	// 	key: "elysDashboard",
	// 	title: "Home",
	// 	url: "/elysDashboard"
	//   },
	  {
        icon: "el-icon-user",
        key: "user management",
        title: "User Management",
        children: [
          {
            icon: "el-icon-menu",
            key: "administrator",
            title: "Administrator",
            url: "/administrator"
          },
          {
            icon: "el-icon-menu",
            key: "supplier administrator",
            title: "Supplier Administrator",
            url: "/supplierAdministrator"
          },
          {
            icon: "el-icon-menu",
            key: "supplier personnel",
            title: "Supplier Personnel",
            url: "/supplierPersonnel"
          }
        ]
	  },
	  {
        icon: "el-icon-menu",
        key: "app theme management",
        title: "App Theme Management",
        url: "/appthemeManagement"
      },
	  {
		icon: "el-icon-menu",
		key: "Vendor equipment management",
		title: "Vendor equipment management",
		children:[
			{
				icon: "el-icon-menu",
				key: "real estate",
				title: "Real estate",
				url: "/realestate"
			  },
			  {
				icon: "el-icon-menu",
				key: "Building",
				title: "Building",
				url: "/building"
			  },
			  {
				icon: "el-icon-menu",
				key: "devmodel",
				title: "Devmodel",
				url: "/devmodel"
			  },
			  {
				icon: "el-icon-menu",
				key: "dev",
				title: "Dev",
				url: "/dev"
			  },
			  {
				icon: "el-icon-menu",
				key: "Button",
				title: "Button",
				url: "/button"
			  },
			  {
				icon: "el-icon-menu",
				key: "QRcode",
				title: "QRcode",
				url: "/qrcode"
			  },
			  {
				icon: "el-icon-menu",
				key: "Machine",
				title: "Machine",
				url: "/machine"
			  },
			  {
				icon: "el-icon-menu",
				key: "ElevatorButton",
				title: "ElevatorButton",
				url: "/elevatorButton"
			},
         	{
            icon: "el-icon-menu",
            key: "mobile devices",
            title: "Mobile Devices",
            url: "/moblileDevices"
          },
          {
            icon: "el-icon-menu",
            key: "system setting",
            title: "System Setting",
            url: "/systemSetting"
          }
		]
	  },
	  {
		icon: "el-icon-menu",
		key: "filter",
		title: "filter",
		url: "/filter"
	  },
	  {
        icon: "el-icon-s-tools",
        key: "system program",
        title: "System Program",
        url: "/systemprogram"
      }
	  
	//   {
	// 	icon: "el-icon-menu",
	// 	key: "print",
	// 	title: "print",
	// 	url: "/print"
	//   },
	  // {
	  //   icon: "el-icon-menu",
	  //   key: "Home",
	  //   title: "Home",
	  //   url: "/elysUserGroupActivity"
	  // },
	 
	//test
	//   {
	//     title: 'Dashboard Alpha',
	//     key: 'dashboardAlpha',
	//     url: '/dashboard/alpha',
	//     icon: 'icmn icmn-home',
	//   },
	//   {
	//     title: 'Dashboard Beta',
	//     key: 'dashboardBeta',
	//     url: '/dashboard/beta',
	//     icon: 'icmn icmn-home',
	//     pro: true,
	//   },
	//   {
	//     title: 'Dashboard Crypto',
	//     key: 'dashboardCrypto',
	//     url: '/dashboard/crypto',
	//     icon: 'icmn icmn-home',
	//     pro: true,
	//   },
	//   {
	//     title: 'Dashboard Gamma',
	//     key: 'dashboardGamma',
	//     url: '/dashboard/gamma',
	//     icon: 'icmn icmn-home',
	//     pro: true,
	//   },
	//   {
	//     title: 'Dashboard Docs',
	//     key: 'dashboardDocs',
	//     url: '/dashboard/docs',
	//     icon: 'icmn icmn-home',
	//     pro: true,
	//   },
	//   {
	//     divider: true,
	//   },
	//   {
	//     title: 'AntDesign Components',
	//     key: 'antComponents',
	//     icon: 'icmn icmn-menu',
	//     url: '/antd',
	//   },
	//   {
	//     divider: true,
	//   },




	// {
		// title: 'System Management',
		// key: 'System',
		// icon: 'icmn icmn-file-text',
		// children: [
			// 	    {
			// 	      title: 'Chartist',
			// 	      key: 'chartist',
			// 	      url: '/charts/chartist',
			// 	    },
			// 	    {
			// 	      title: 'Chart',
			// 	      key: 'chart',
			// 	      url: '/charts/chart',
			// 	      pro: true,
			// 	    },

			// {
			// 	title: 'Dashboard',
			// 	key: 'Dashboard',
			// 	url: '/Dashboard',
			// 	icon: 'el-icon-menu',
			// },

			// {
			// 	title: 'Sales Order',
			// 	key: 'Sales Order',
			// 	// url: '/CustomerOrderManagement',
			// 	icon:'el-icon-s-order',
			// 	children: [

			// 		{
			// 			title: 'Sales',
			// 			key: 'Sales',
			// 			url: '/CustomerOrderManagement',
            // icon:'el-icon-sell',

			// 		},

			// 		{
			// 			title: 'Maintenance Order',
			// 			key: 'Maintenance Order',
			// 			url: '/CustomerOrderManagement_Maintenance',
            // icon:'el-icon-box',

			// 		},

// 					{
// 						title: 'Display Item',
// 						key: 'Display Item',
// 						url: '/CustomerOrderManagement_Display',
//
// 					},

		// 			{
		// 				title: 'Coupon Setting',
		// 				key: 'Coupon Setting',
		// 				url: '/CardTicketInformation',
		// 				icon: 'el-icon-s-ticket',
		// 				//
		// 			},


		// 		],
		// 	},

		// 	{
		// 		title: 'Factory Order',
		// 		key: 'Factory Order',
		// 		// url: '/factoryManagement',
		// 		icon:'el-icon-s-home',
		// 		children:[

		// 			{
		// 				title: 'Orders',
		// 				key: 'Orders',
		// 				url: '/factoryManagement',
        //     // url: '/factoryManagement?type=self',
		// 				icon: 'el-icon-tickets',
		// 			},
		// 			{
		// 				title: 'Factory Setting',
		// 				key: 'Factory Setting',
		// 				url: '/factoryList',
		// 				icon:'el-icon-set-up'
		// 			},

		// 		]
		// 		// pro: true,
		// 	},

		// 	{
		// 		title: 'Inventory',
		// 		key: 'Inventory',
		// 		icon: 'el-icon-house',
		// 		// url: '/purchase',
		// 		// pro: true,

		// 		children: [

		// 			{
		// 				title: 'Gem Inventory',
		// 				key: 'Gem Inventory',
		// 				url: '/purchase',
		// 				icon: 'el-icon-s-goods',
		// 			},

		// 			{
		// 				title: 'Product Inventory',
		// 				key: 'Product Inventory',
		// 				url: '/ProductList',
		// 				icon: 'el-icon-s-cooperation',
		// 			},

		// 			// {
		// 			// 	title: 'Consignment Inventory',
		// 			// 	key: 'Consignment Inventory',
		// 			// 	url: '/ProductList_Consignment',
		// 			// 	icon: 'el-icon-s-cooperation',
		// 			// },


		// 			{
		// 				title: 'Certified Gem Data',
		// 				key: 'Certified Gem Data',
		// 				url: '/gemList',
		// 				icon: 'el-icon-document',
		// 			},

		// 			{
		// 				title: 'Gem Type Setting',
		// 				key: 'Gem Type Setting',
		// 				url: '/gemType',
		// 				icon: 'el-icon-s-operation',

		// 			},

		// 			{
		// 				title: 'Product Cat. Setting',
		// 				key: 'Product Cat. Setting',
		// 				url: '/categoryLIist',
		// 				icon: 'el-icon-set-up',
		// 			},

        //   {
        //   	title: 'Ring Size Surcharge',
        //   	key: 'Ring Size Surcharge',
        //   	url: '/surcharge_group',
        //   	icon: 'el-icon-edit-outline',
        //   },



        //   // {
        //   // 	title: 'Product Surcharge',
        //   // 	key: 'Product Surcharge',
        //   // 	url: '/product_surcharge',
        //   // 	icon: 'el-icon-edit-outline',
        //   // },

        //   {
        //   	title: 'Ring Surcharge',
        //   	key: 'Ring Surcharge',
        //   	url: '/product_surcharge_ring',
        //   	icon: 'el-icon-edit-outline',
        //   },




		// 			// {
		// 			// 	title: 'Jewelry design',
		// 			// 	key: 'JewelryDesign',
		// 			// 	url: '/JewelryDesign',
		// 			//
		// 			// },

		// 			// {
		// 			// 	title: 'finished product',
		// 			// 	key: 'CustomerList',
		// 			// 	url: '/CustomerList',
		// 			//
		// 			// },



		// 		],

		// 	},






			// {
			// 	title: 'Product Management',
			// 	key: 'productManagement',
			// 	icon:'el-icon-coin',
			//
			// 	children: [
			//
			//
			//
			//
			//
			//
			//
			// 	],
			//
			// },





			// {
			// 	title: 'Invoice Management',
			// 	key: 'Invoice & Receipt',
			// 	url: '/invoiceManagement',
			//
			// },





		// 	{
		// 		title: 'CRM',
		// 		key: 'CRM',
		// 		icon:'el-icon-s-custom',
		// 		// url: '/invoiceManagement',
		// 		// pro: true,
		// 		children: [

		// 			{
		// 				title: 'Customer Data',
		// 				key: 'Customer Data',
		// 				url: '/CustomersManagement',
		// 				icon:'el-icon-user-solid',
		// 			},

		// 			{
		// 				title: 'Customer Tier',
		// 				key: 'Customer Tier',
		// 				url: '/Kehu_Customer',
		// 				icon:'el-icon-sort',
		// 			},

        //   {
        //   	title: 'Conversations',
        //   	key: 'Conversations',
        //   	url: '/Communicationlogs',
        //     // url: '/Communicationlogs?type=isMenu',
        //   	icon:'el-icon-chat-line-round',
        //   },


		// 		],
		// 	},


// 			{
// 				title: 'User Management',
// 				key: 'User Management',
//
// 				children: [
//
// 					{
// 						title: 'User Management',
// 						key: 'UserManagement',
// 						url: '/UserManagement',
//
// 					},
//
// 					{
// 						title: 'Tips',
// 						key: 'CustomentManagement',
// 						url: '/Tips',
// 					},
//
// 					{
// 						title: 'Branch Management',
// 						key: 'branchManagement',
// 						url: '/branchManagement',
//
// 					},
//
//
//
//
// 				],
// 			},







		// ],
	// },



	// {
	// 	title: 'Setting',
	// 	key: 'Setting',
	// 	icon: 'icmn icmn-file-text',
	//
	// 	children: [

			// {
			// 	title: 'Accounting',
			// 	key: 'Accounting',
			// 	// url: '/DailyExpenditureinvoiceManagement',
			// 	icon:'el-icon-sell',
			// 	children: [

			// 		{
			// 			title: 'Invoice',
			// 			key: 'Invoice',
			// 			url: '/DailyExpenditureinvoiceManagement',
			// 			icon: 'el-icon-tickets',
			// 		},

			// 		{
			// 			title: 'Supplier',
			// 			key: 'Supplier',
			// 			url: '/SupplierList',
			// 			icon: 'el-icon-s-shop',
			// 		},




			// 	],
			// },

			// {
			// 	title: 'Staffs',
			// 	key: 'Staffs',
			// 	// url: '/DailyExpenditureinvoiceManagement',
			// 	icon: 'el-icon-user',
			// 	children: [

			// 		{
			// 			title: 'Staffs',
			// 			key: 'Staffs',
			// 			url: '/Permissions',
			// 			icon: 'el-icon-s-custom',


			// 		},

			// 		{
			// 			title: 'Group Setting',
			// 			key: 'Group Setting',
			// 			url: '/GroupManager',
			// 			icon: 'el-icon-s-platform',
			// 		},

			// 	],
			// },










			// {
			// 	title: 'Branch',
			// 	key: 'Branch',
			// 	url: '/branchManagement',
			// 	icon:'el-icon-s-shop'
			// },

			// {
			// 	title: 'Marketing Management',
			// 	key: 'Marketing Management',
			//
			// 	children: [
			//
			// 		{
			// 			title: 'Activitie Information',
			// 			key: 'MarketingActivities',
			// 			url: '/MarketingActivities',
			//
			// 		},
			//
			// 		{
			// 			title: 'Produce Coupon',
			// 			key: 'CardTicketInformation',
			// 			url: '/CardTicketInformation',
			//
			// 		},
			//
			// 		{
			// 			title: 'Coupon Information',
			// 			key: 'CardVoucherinformation',
			// 			url: '/CardVoucherinformation',
			//
			// 		},
			//
			// 		{
			// 			title: 'Use ardcoupon',
			// 			key: 'UseofcardCoupons',
			// 			url: 'UseofcardCoupons',
			//
			// 		},
			//
			// 	],
			// },

			// {
			// 	title: 'Change password',
			// 	key: 'Changepassword',
			// 	url: '/ResetPass',
			// 	icon:'el-icon-s-tools'
			// },




		// 	{
		// 		title: 'Miscellaneous',
		// 		key: 'Miscellaneous',
		// 		// url: '/errorManagement',
		// 		icon:'el-icon-warning',
		// 		children:[

		// 			{
		// 				title: 'Order Status Setting',
		// 				key: 'Order Status Setting',
		// 				url: '/orderstatusManagement',
		// 				icon:'el-icon-set-up'
		// 			},

        //   {
        //   	title: 'Material Setting',
        //   	key: 'Material Setting',
        //   	url: '/materialManagement',
        //   	icon:'el-icon-set-up'
        //   },

        //   {
        //   	title: 'Material Color Setting',
        //   	key: 'Material Color Setting',
        //   	url: '/materialManagement_Color',
        //   	icon:'el-icon-set-up'
        //   },

        //   {
        //   	title: 'Payment Method Setting',
        //   	key: 'Payment Method Setting',
        //   	url: '/materialManagement_PaymentMethod',
        //   	icon:'el-icon-set-up'
        //   },




		// 			{
		// 				title: 'Crash Reports',
		// 				key: 'errorManagement',
		// 				url: '/errorManagement',
		// 				icon:'el-icon-warning'
		// 			},

			// 	]
			// },








	// 	],
	// },





	//   {
	//     title: 'Default Pages',
	//     key: 'defaultPages',
	//     icon: 'icmn icmn-file-text',
	//     children: [
	//       {
	//         key: 'loginAlpha',
	//         title: 'Login Alpha',
	//         url: '/pages/login-alpha',
	//         pro: true,
	//       },
	//       {
	//         key: 'loginBeta',
	//         title: 'Login Beta',
	//         url: '/pages/login-beta',
	//         pro: true,
	//       },
	//       {
	//         key: 'register',
	//         title: 'Register',
	//         url: '/pages/register',
	//         pro: true,
	//       },
	//       {
	//         key: 'lockscreen',
	//         title: 'Lockscreen',
	//         url: '/pages/lockscreen',
	//         pro: true,
	//       },
	//       {
	//         key: 'pricingTable',
	//         title: 'Pricing Tables',
	//         url: '/pages/pricing-table',
	//         pro: true,
	//       },
	//       {
	//         key: 'invoice',
	//         title: 'Invoice',
	//         url: '/pages/invoice',
	//         pro: true,
	//       },
	//     ],
	//   },
	//   {
	//     title: 'Charts',
	//     key: 'charts',
	//     icon: 'icmn icmn-stats-bars',
	//     children: [
	//       {
	//         title: 'Chartist',
	//         key: 'chartist',
	//         url: '/charts/chartist',
	//       },
	//       {
	//         title: 'Chart',
	//         key: 'chart',
	//         url: '/charts/chart',
	//         pro: true,
	//       },
	//       {
	//         title: 'Peity',
	//         key: 'peity',
	//         url: '/charts/peity',
	//         pro: true,
	//       },
	//       {
	//         title: 'C3',
	//         key: 'c3',
	//         url: '/charts/c3',
	//         pro: true,
	//       },
	//     ],
	//   },
	//   {
	//     title: 'Mail Templates',
	//     key: 'mailTemplates',
	//     url: '/layout/mail-templates',
	//     icon: 'icmn icmn-envelop',
	//     pro: true,
	//   },
	//   {
	//     divider: true,
	//   },
	//   {
	//     title: 'Apps',
	//     key: 'apps',
	//     icon: 'icmn icmn-database',
	//     children: [
	//       {
	//         title: 'Messaging',
	//         key: 'messaging',
	//         url: '/apps/messaging',
	//         pro: true,
	//       },
	//       {
	//         title: 'Mail',
	//         key: 'mail',
	//         url: '/apps/mail',
	//         pro: true,
	//       },
	//       {
	//         title: 'Profile',
	//         key: 'profile',
	//         url: '/apps/profile',
	//         pro: true,
	//       },
	//       {
	//         title: 'Gallery',
	//         key: 'gallery',
	//         url: '/apps/gallery',
	//         pro: true,
	//       },
	//     ],
	//   },
	//   {
	//     title: 'Ecommerce',
	//     key: 'ecommerce',
	//     icon: 'icmn icmn-cart',
	//     children: [
	//       {
	//         title: 'Dashboard',
	//         key: 'dashboard',
	//         url: '/ecommerce/dashboard',
	//         pro: true,
	//       },
	//       {
	//         title: 'Products Catalog',
	//         key: 'productsCatalog',
	//         url: '/ecommerce/products-catalog',
	//         pro: true,
	//       },
	//       {
	//         title: 'Products Details',
	//         key: 'productsDetails',
	//         url: '/ecommerce/product-details',
	//         pro: true,
	//       },
	//       {
	//         title: 'Products Edit',
	//         key: 'productsEdit',
	//         url: '/ecommerce/product-edit',
	//         pro: true,
	//       },
	//       {
	//         title: 'Products List',
	//         key: 'productsList',
	//         url: '/ecommerce/products-list',
	//         pro: true,
	//       },
	//       {
	//         title: 'Orders',
	//         key: 'orders',
	//         url: '/ecommerce/orders',
	//         pro: true,
	//       },
	//       {
	//         title: 'Cart',
	//         key: 'cart',
	//         url: '/ecommerce/cart',
	//         pro: true,
	//       },
	//     ],
	//   },
	//   {
	//     title: 'Blog',
	//     key: 'blog',
	//     icon: 'icmn icmn-wordpress',
	//     children: [
	//       {
	//         title: 'Feed',
	//         key: 'blogFeed',
	//         url: '/blog/feed',
	//         pro: true,
	//       },
	//       {
	//         title: 'Post',
	//         key: 'blogPost',
	//         url: '/blog/post',
	//         pro: true,
	//       },
	//       {
	//         title: 'Add Post',
	//         key: 'blogAddPost',
	//         url: '/blog/add-blog-post',
	//         pro: true,
	//       },
	//     ],
	//   },
	//   {
	//     title: 'YouTube',
	//     key: 'youtube',
	//     icon: 'icmn icmn-youtube',
	//     children: [
	//       {
	//         title: 'Feed',
	//         key: 'youtubeFeed',
	//         url: '/youtube/feed',
	//         pro: true,
	//       },
	//       {
	//         title: 'View',
	//         key: 'youtubeView',
	//         url: '/youtube/view',
	//         pro: true,
	//       },
	//     ],
	//   },
	//   {
	//     title: 'GitHub',
	//     key: 'github',
	//     icon: 'icmn icmn-github',
	//     children: [
	//       {
	//         title: 'Explore',
	//         key: 'githubExplore',
	//         url: '/github/explore',
	//         pro: true,
	//       },
	//       {
	//         title: 'Discuss',
	//         key: 'githubDiscuss',
	//         url: '/github/discuss',
	//         pro: true,
	//       },
	//     ],
	//   },
	//   {
	//     divider: true,
	//   },
	//   {
	//     title: 'Icons',
	//     key: 'icons',
	//     icon: 'icmn icmn-star-full',
	//     children: [
	//       {
	//         title: 'FontAwesome',
	//         key: 'fontAwesome',
	//         url: '/icons/fontawesome',
	//       },
	//       {
	//         title: 'Linear',
	//         key: 'linear',
	//         url: '/icons/linear',
	//       },
	//       {
	//         title: 'Icomoon',
	//         key: 'icoMoon',
	//         url: '/icons/icomoon',
	//       },
	//     ],
	//   },
	//   {
	//     title: 'Bootstrap Grid',
	//     key: 'bootstrap',
	//     url: '/layout/bootstrap',
	//     icon: 'icmn icmn-html-five',
	//   },
	//   {
	//     title: 'Bootstrap Card',
	//     key: 'card',
	//     url: '/layout/card',
	//     icon: 'icmn icmn-stack',
	//   },
	//   {
	//     title: 'Typography',
	//     key: 'typography',
	//     url: '/layout/typography',
	//     icon: 'icmn icmn-font-size',
	//   },
	//   {
	//     title: 'Utilities',
	//     key: 'utilities',
	//     url: '/layout/utilities',
	//     icon: 'icmn icmn-magic-wand',
	//   },
	//   {
	//     divider: true,
	//   },
	//   {
	//     title: 'Nested Items',
	//     key: 'nestedItem1',
	//     icon: 'icmn icmn-arrow-down2',
	//     disabled: true,
	//     children: [
	//       {
	//         title: 'Nested Item 1-1',
	//         key: 'nestedItem1-1',
	//         children: [
	//           {
	//             title: 'Nested Item 1-1-1',
	//             key: 'nestedItem1-1-1',
	//           },
	//           {
	//             title: 'Nested Items 1-1-2',
	//             key: 'nestedItem1-1-2',
	//             disabled: true,
	//           },
	//         ],
	//       },
	//       {
	//         title: 'Nested Items 1-2',
	//         key: 'nestedItem1-2',
	//       },
	//     ],
	//   },
	//   {
	//     title: 'Disabled Item',
	//     key: 'disabledItem',
	//     disabled: true,
	//     icon: 'icmn icmn-cancel-circle',
	//   },
]
export const getTopMenuData = [{
		title: 'Pages',
		key: 'pages',
		icon: 'icmn icmn-stack',
		children: [{
				title: 'Dashboard Alpha',
				key: 'dashboardAlpha',
				url: '/dashboard/alpha',
			},
			{
				title: 'Dashboard Beta',
				key: 'dashboardBeta',
				url: '/dashboard/beta',
				pro: true,
			},
			{
				title: 'Dashboard Crypto',
				key: 'dashboardCrypto',
				url: '/dashboard/crypto',
				pro: true,
			},
			{
				title: 'Dashboard Gamma',
				key: 'dashboardGamma',
				url: '/dashboard/gamma',
				pro: true,
			},
			{
				title: 'Dashboard Docs',
				key: 'dashboardDocs',
				url: '/dashboard/docs',
				pro: true,
			},
			{
				divider: true,
			},
			{
				title: 'Default Pages',
				key: 'defaultPages',
				children: [{
						key: 'loginAlpha',
						title: 'Login Alpha',
						url: '/pages/login-alpha',
						pro: true,
					},
					{
						key: 'loginBeta',
						title: 'Login Beta',
						url: '/pages/login-beta',
						pro: true,
					},
					{
						key: 'register',
						title: 'Register',
						url: '/pages/register',
						pro: true,
					},
					{
						key: 'lockscreen',
						title: 'Lockscreen',
						url: '/pages/lockscreen',
						pro: true,
					},
					{
						key: 'pricingTable',
						title: 'Pricing Tables',
						url: '/pages/pricing-table',
						pro: true,
					},
					{
						key: 'invoice',
						title: 'Invoice',
						url: '/pages/invoice',
						pro: true,
					},
				],
			},
			{
				title: 'Ecommerce',
				key: 'ecommerce',
				children: [{
						title: 'Dashboard',
						key: 'dashboard',
						url: '/ecommerce/dashboard',
						pro: true,
					},
					{
						title: 'Products Catalog',
						key: 'productsCatalog',
						url: '/ecommerce/products-catalog',
						pro: true,
					},
					{
						title: 'Products Details',
						key: 'productsDetails',
						url: '/ecommerce/product-details',
						pro: true,
					},
					{
						title: 'Products Edit',
						key: 'productsEdit',
						url: '/ecommerce/product-edit',
						pro: true,
					},
					{
						title: 'Products List',
						key: 'productsList',
						url: '/ecommerce/products-list',
						pro: true,
					},
					{
						title: 'Orders',
						key: 'orders',
						url: '/ecommerce/orders',
						pro: true,
					},
					{
						title: 'Cart',
						key: 'cart',
						url: '/ecommerce/cart',
						pro: true,
					},
				],
			},
			{
				title: 'Apps',
				key: 'apps',
				children: [{
						title: 'Messaging',
						key: 'messaging',
						url: '/apps/messaging',
						pro: true,
					},
					{
						title: 'Mail',
						key: 'mail',
						url: '/apps/mail',
						pro: true,
					},
					{
						title: 'Profile',
						key: 'profile',
						url: '/apps/profile',
						pro: true,
					},
					{
						title: 'Gallery',
						key: 'gallery',
						url: '/apps/gallery',
						pro: true,
					},
				],
			},
			{
				title: 'Blog',
				key: 'blog',
				children: [{
						title: 'Feed',
						key: 'blogFeed',
						url: '/blog/feed',
						pro: true,
					},
					{
						title: 'Post',
						key: 'blogPost',
						url: '/blog/post',
						pro: true,
					},
					{
						title: 'Add Post',
						key: 'blogAddPost',
						url: '/blog/add-blog-post',
						pro: true,
					},
				],
			},
			{
				title: 'YouTube',
				key: 'youtube',
				children: [{
						title: 'Feed',
						key: 'youtubeFeed',
						url: '/youtube/feed',
						pro: true,
					},
					{
						title: 'View',
						key: 'youtubeView',
						url: '/youtube/view',
						pro: true,
					},
				],
			},
			{
				title: 'GitHub',
				key: 'github',
				children: [{
						title: 'Explore',
						key: 'githubExplore',
						url: '/github/explore',
						pro: true,
					},
					{
						title: 'Discuss',
						key: 'githubDiscuss',
						url: '/github/discuss',
						pro: true,
					},
				],
			},
		],
	},
	{
		title: 'AntDesign',
		key: 'antComponents',
		icon: 'icmn icmn-menu',
		url: '/antd/index',
	},
	{
		title: 'Components',
		key: 'pagesBlocks',
		icon: 'icmn icmn-stack',
		children: [{
				title: 'Charts',
				key: 'charts',
				children: [{
						title: 'Chartist',
						key: 'chartist',
						url: '/charts/chartist',
					},
					{
						title: 'Chart',
						key: 'chart',
						url: '/charts/chart',
						pro: true,
					},
					{
						title: 'NVD3',
						key: 'nvd3',
						url: '/charts/nvd3',
						pro: true,
					},
					{
						title: 'C3',
						key: 'c3',
						url: '/charts/c3',
						pro: true,
					},
				],
			},
			{
				title: 'Mail Templates',
				key: 'mailTemplates',
				url: '/layout/mail-templates',
				pro: true,
			},
			{
				title: 'Icons',
				key: 'icons',
				children: [{
						title: 'FontAwesome',
						key: 'fontAwesome',
						url: '/icons/fontawesome',
					},
					{
						title: 'Linear',
						key: 'linear',
						url: '/icons/linear',
					},
					{
						title: 'Icomoon',
						key: 'icoMoon',
						url: '/icons/icomoon',
					},
				],
			},
			{
				title: 'Bootstrap Grid',
				key: 'bootstrap',
				url: '/layout/bootstrap',
			},
			{
				title: 'Bootstrap Card',
				key: 'card',
				url: '/layout/card',
			},
			{
				title: 'Typography',
				key: 'typography',
				url: '/layout/typography',
			},
			{
				title: 'Utilities',
				key: 'utilities',
				url: '/layout/utilities',
			},
			{
				title: 'Nested Items',
				key: 'nestedItem1',
				disabled: true,
				url: 'javascript: void(0);',
				children: [{
						title: 'Nested Item 1-1',
						key: 'nestedItem1-1',
						url: 'javascript: void(0);',
						children: [{
								title: 'Nested Item 1-1-1',
								key: 'nestedItem1-1-1',
								url: 'javascript: void(0);',
							},
							{
								title: 'Nested Items 1-1-2',
								key: 'nestedItem1-1-2',
								disabled: true,
								url: 'javascript: void(0);',
							},
						],
					},
					{
						title: 'Nested Items 1-2',
						key: 'nestedItem1-2',
						url: 'javascript: void(0);',
					},
				],
			},
			{
				title: 'Disabled Item',
				key: 'disabledItem',
				disabled: true,
				url: 'javascript: void(0);',
			},
		],
	},
]

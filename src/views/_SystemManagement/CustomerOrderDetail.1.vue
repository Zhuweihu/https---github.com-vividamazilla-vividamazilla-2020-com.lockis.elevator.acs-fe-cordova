<template>

	<div class="details">

		<div id="details" >




			<div id="app" class="invoice_test" style="margin: auto;">
				<div id="pdfDom" class="bgw w650" style="padding: 0px 50px; margin: 10px auto 0px;">
					<div class="lh75  bold " style="text-align: center;font-size: 20px;">POUR LA VIE</div>
					<div class="lh25 h25 bgw">
						<div class="fl ft10">
							<div class="fl w75 textr">Customer1:</div>
							<div class="fl">{{formLabelAlign.customer1}}</div>
						</div>
						<div class="fr w260 ft10">
							<div class="fl w185 textr">Sales No:</div>
							<div class="fl">{{formLabelAlign.salesNo}}</div>
						</div>
					</div>
					<div class="lh25 h25 bgw">
						<div class="fl ft10">
							<div class="fl w75 textr">Customer2:</div>
							<div class="fl">{{formLabelAlign.customer2}}</div>
						</div>
						<div class="fr w260 ft10">
							<div class="fl w185 textr">Buying Date:</div>
							<div class="fl">{{new Date(formLabelAlign.buyingDate).format("yyyy-MM-dd")}}</div>
						</div>
					</div>
					<div class="lh25 h25 bgw ft10">
						<div class="fl ">
							<div class="fl w75 textr ft10">Big day:</div>
							<div class="fl">{{new Date(formLabelAlign.bigDay).format("yyyy-MM-dd")}}</div>
						</div>
						<div class="fr w260 ft10">
							<div class="fl w185 textr ">Collection Date:</div>
							<div class="fl">{{new Date(formLabelAlign.collectionDate).format("yyyy-MM-dd")}}</div>
						</div>
					</div>
					<div>
						<div class="el-row">
							<div class="el-col el-col-12">
								<div class="title-content no_borderr">ITEM DESCRIPTION</div>
							</div>
							<div class="el-col el-col-3">
								<div class="title-content no_borderr">UNIT HKD</div>
							</div>
							<div class="el-col el-col-3">
								<div class="title-content no_borderr">QTY</div>
							</div>
							<div class="el-col el-col-3">
								<div class="title-content no_borderr">Total HKD</div>
							</div>
							<div class="el-col el-col-3">
								<div class="title-content ">Net Amount</div>
							</div>
						</div>
					</div>
					<!-- <div>
						<div class="el-row">
							<div class="el-col el-col-12">
								<div class="item-content textl padl5 padr5 no_borderr">
									<div>{{formLabelAlign.customer1}} {{formLabelAlign.customer2}} {{formLabelAlign.designCode}} {{formLabelAlign.gold}} {{formLabelAlign.goldColour}} {{formLabelAlign.product}}</div>
									<div>Size:{{formLabelAlign.size1}}(HK Size) w:As sample T:As sample</div>
									<div>Stone:Diamonds around:20/0.11ct</div>
								</div>
							</div>
							<div class="el-col el-col-3">
								<div class="item-content textl padl5 padr5 h60 no_borderr">$7,780</div>
							</div>
							<div class="el-col el-col-3">
								<div class="item-content textl padl5 padr5 h60 no_borderr">1</div>
							</div>
							<div class="el-col el-col-3">
								<div class="item-content textl padl5 padr5 h60 no_borderr">$7,780</div>
							</div>
							<div class="el-col el-col-3">
								<div class="item-content textl padl5 padr5 h60 ">$7,500</div>
							</div>
						</div>
					</div> -->
					<div v-for="item in formLabelAlign.plvKAVIEcesEntityList">
						<div class="el-row">
							<div class="el-col el-col-12">
								<div class="item-content textl padl5 padr5 padt30 no_borderr">
									<div>{{item.itemDescription}}</div>
									<div>Size:{{item.size}} w:{{item.w}} T:{{t}} around:{{item.around}}</div>
									<div>Stone:{{item.stone}} NO:{{item.onNumber}}</div>
								</div>
							</div>
							<div class="el-col el-col-3">
								<div class="item-content  padl5 padr5  padt30 no_borderr" >${{item.unitHkd}}</div>
							</div>
							<div class="el-col el-col-3">
								<div class="item-content  padl5 padr5  padt30 no_borderr" >{{item.qty}}</div>
							</div>
							<div class="el-col el-col-3">
								<div class="item-content  padl5 padr5  padt30 no_borderr" >${{item.totalHkd}}</div>
							</div>
							<div class="el-col el-col-3">
								<div class="item-content  padl5 padr5  padt30" >${{item.netAmount}}</div>
							</div>
						</div>
					</div>
					
					
					
					<div>
						<div class="el-row">
							<div class="el-col el-col-18">
								<div class="item-content textl padl5 padr5  bordert borderb no_borderr" style="height: 20px;">
									<div class="textr ">Total Price:</div>
								</div>
							</div>
							<div class="el-col el-col-3">
								<div class="item-content textl padl5 padr5 h20  bordert borderb no_borderr" >${{formLabelAlign.totalPrice}}</div>
							</div>
							<div class="el-col el-col-3">
								<div class="item-content textl padl5 padr5 h20  bordert borderb" ></div>
							</div>
						</div>
					</div>
					<div>
						<div class="el-row">
							<div class="el-col el-col-18">
								<div class="remark-content textl padl5 padr5   "><span class="fl">Remark:{{formLabelAlign.remark}}</span> <span class="fr">Total
										Discount:</span></div>
							</div>
							<div class="el-col el-col-3">
								<div class="remark-content textl padl5 padr5 h20 borderr "></div>
							</div>
							<div class="el-col el-col-3">
								<div class="remark-content textl padl5 padr5 h20 borderb bordert borderl borderr ">${{formLabelAlign.totalDiscount}}</div>
							</div>
						</div>
					</div>
					<div>
						<div class="el-row">
							<div class="el-col el-col-18">
								<div class="remark-content textl padl5 padr5   "><span class="fl">Code remark:{{formLabelAlign.codeRemark}}</span> <span class="fr">Total
										Net:</span></div>
							</div>
							<div class="el-col el-col-3">
								<div class="remark-content textl padl5 padr5 h20 borderr "></div>
							</div>
							<div class="el-col el-col-3">
								<div class="remark-content textl padl5 padr5 h20 borderb bordert borderl borderr ">${{formLabelAlign.totalNet}}</div>
							</div>
						</div>
					</div>
					<div>
						<div class="el-row">
							<div class="el-col el-col-18">
								<div class="remark-content textl padl5 padr5   "><span class="fl">Ref Date:{{formLabelAlign.refDate}}</span> <span class="fr">1st
										Payment:</span></div>
							</div>
							<div class="el-col el-col-3">
								<div class="remark-content textl padl5 padr5 h20 borderr "></div>
							</div>
							<div class="el-col el-col-3">
								<div class="remark-content textl padl5 padr5 h20 borderb bordert borderl borderr ">${{formLabelAlign.a1StPayment}}</div>
							</div>
						</div>
					</div>
					<div>
						<div class="el-row">
							<div class="el-col el-col-18">
								<div class="remark-content textl padl5 padr5   "><span class="fr">2nd Payment:</span></div>
							</div>
							<div class="el-col el-col-3">
								<div class="remark-content textl padl5 padr5 h20 borderr "></div>
							</div>
							<div class="el-col el-col-3">
								<div class="remark-content textl padl5 padr5 h20 borderb bordert borderl borderr ">${{formLabelAlign.a2NdPayment}}</div>
							</div>
						</div>
					</div>
					<div>
						<div class="el-row">
							<div class="el-col el-col-18">
								<div class="remark-content textl padl5 padr5   "><span class="fr">Balance:</span></div>
							</div>
							<div class="el-col el-col-3">
								<div class="remark-content textl padl5 padr5 h20 borderr "></div>
							</div>
							<div class="el-col el-col-3">
								<div class="remark-content textl padl5 padr5 h20 borderb bordert borderl borderr ">${{formLabelAlign.balance}}</div>
							</div>
						</div>
					</div>
					<div>
						<div class="el-row">
							<div class="el-col el-col-18">
								<div class="remark-content textl padl5 padr5   "><span class="fl">1st Payment:{{formLabelAlign.payment}}</span></div>
							</div>
							<div class="el-col el-col-3">
								<div class="remark-content textl padl5 padr5 h20  "></div>
							</div>
							<div class="el-col el-col-3">
								<div class="remark-content textl padl5 padr5 h20 "></div>
							</div>
						</div>
					</div>
					<div>
						<div class="el-row">
							<div class="el-col el-col-18">
								<div class="remark-content textl padl5 padr5   "><span class="fl">Final Payment:{{formLabelAlign.finalPayment}}</span></div>
							</div>
							<div class="el-col el-col-3">
								<div class="remark-content textl padl5 padr5 h20  "></div>
							</div>
							<div class="el-col el-col-3">
								<div class="remark-content textl padl5 padr5 h20 "></div>
							</div>
						</div>
					</div>
					<div>
						<div class="el-row">
							<div class="el-col el-col-18">
								<div class="remark-content textl padl5 padr5   "><span class="fl">REMARKS:{{formLabelAlign.remarks}}，</span> <span class="fl">STAFF:{{formLabelAlign.staff}}</span></div>
							</div>
							<div class="el-col el-col-3">
								<div class="remark-content textl padl5 padr5 h20  "></div>
							</div>
							<div class="el-col el-col-3">
								<div class="remark-content textl padl5 padr5 h20 "></div>
							</div>
						</div>
					</div>
					<div class="padb30">
						<div class="el-row">
							<div class="el-col el-col-14">
								<div class="remark-content textl padl5 padr5   ">
									<div class="mat20 underline">NOTES TO CUSTOMER</div>
									<div>{{formLabelAlign.notesToCustomer}}</div>
								</div>
							</div>
							<div class="el-col el-col-10">
								<div class="remark-content textl padl5 padr5   " style="font-size: 12px;line-height: 15px;">{{formLabelAlign.pourLaVie}}</div>
								<div class="remark-content textl padl5 padr5   " style="font-size: 12px;line-height: 15px;">{{formLabelAlign.address}}</div>
								<div class="remark-content textl padl5 padr5   " style="font-size: 12px;line-height: 15px;">T:{{formLabelAlign.t}}</div>
								<div class="remark-content textl padl5 padr5   " style="font-size: 12px;line-height: 15px;">F:{{formLabelAlign.f}}</div>
								<div class="remark-content textl padl5 padr5   " style="font-size: 12px;line-height: 15px;">{{formLabelAlign.httpUrl}}</div>
								<div class="remark-content textl padl5 padr5   " style="font-size: 12px;line-height: 15px;">{{formLabelAlign.email}}</div>
							</div>
							<!-- <div class="new-page" style="text-align: center">1</div> -->
						</div>
						
					</div>
					
					
					
				</div>
				
				
				
			
				<!-- <div id="footer" style="break-after: page; position: fixed; bottom: 0px; line-height: 50px; font-size: 8px; width: 100%; text-align: center;">
					page <span id="pagenumber"></span> of <span id="pagecount"></span>
				</div> -->
			
				<!-- <div style="break-after: page; position: fixed; bottom: 0px; line-height: 50px; font-size: 8px; width: 100%; text-align: center;">1</div> -->
			</div>


			




	</div>
	<div style="text-align: center;">
		<div style='margin: 30px auto;'>
			<el-button  :loading="loading" @click='getPdflog()'>打印</el-button>
			<el-button @click='cancel()'>返回</el-button>
		</div>
	</div>
	</div>
</template>



<script>
	export default {
		name: "HairWithSingle",
		data() {
			return {
				htmlTitle: '',
				formLabelAlign: {
					a1StPayment: "",
					a2NdPayment: "",
					address: "",
					balance: "",
					bigDay: "",
					buyingDate: "",
					codeRemark: "",
					collectionDate: "",
					condition: "",
					customer1: "",
					customer1Reference: "",
					customer2: "",
					customer2Reference: "",
					email: "",
					f: "",
					finalPayment: "",
					httpUrl: "",
					id: "",
					made: "",
					notesToCustomer: "",
					onLock: "",
					payment: "",
					plvKAVIEceType: "",
					plvKAVIEcesEntityList: "",
					plvKAviEceOemEntityList: "",
					plvKGuestBillcol: "",
					pourLaVie: "",
					purged: "",
					refDate: "",
					reference: "",
					remark: "",
					remarks: "",
					revised: "",
					salesNo: "",
					staff: "",
					t: "",
					totalDiscount: "",
					totalNet: "",
					totalPrice: "",
					userName: "",
					userRefenece: "",
				},
				loading:false

			}
		},
		created: function() {
			
			this.$api.get('/PlvKAviEce/seekPlvKGuestBillcol/' + this.$route.query.uuid, null, r => {
				
				
				this.formLabelAlign=r[0]
				//console.log(this.formLabelAlign)
				
				// this.formLabelAlign.customer1 = r.plvKGuestBillEntityList[0].customer1
				// this.formLabelAlign.customer2 = r.plvKGuestBillEntityList[0].customer2
				// this.formLabelAlign.bigDay = r.plvKGuestBillEntityList[0].bigDay
				// this.formLabelAlign.salesNo = r.plvKGuestBillEntityList[0].salesCode
				// this.formLabelAlign.buyingDate = r.plvKProductEntityList[0].guestDate
				// this.formLabelAlign.collectionDate = r.plvKGuestBillEntityList[0].landingDay
				// this.formLabelAlign.product = r.plvKProductEntityList[0].product
				// this.formLabelAlign.size1 = r.plvKProductEntityList[0].size1
				// this.formLabelAlign.sizeUnit = r.plvKProductEntityList[0].sizeUnit
				// this.formLabelAlign.goldWeight = r.plvKStoneTotalEntityList[0].goldWeight
				// this.formLabelAlign.designCode = r.plvKGuestBillEntityList[0].designCode
				// this.formLabelAlign.goldColour = r.plvKProductEntityList[0].goldColour
				// this.formLabelAlign.gold = r.plvKProductEntityList[0].gold
				
				
			})
			
			
			
			
			
// 			this.uuid = this.$route.query.id
// 			this.$api.post('/sendInlay/findFactory?reference=' + this.uuid, null, r => {
// 				// this.$router.push("/SystemManagement/UserManagement")
// 				this.formLabelAlign = r.factoryDto
// 				this.formLabelAlign.stoneDataDto = r.dataDtoList
// 				var total = 0;
// 				var totalweight = 0;
// 				for (var i = 0; i < r.dataDtoList.length; i++) {
// 
// 					total = r.dataDtoList[i].deliveredNumbe + total
// 					totalweight = r.dataDtoList[i].deliveredWeight + totalweight
// 					this.formLabelAlign.total = total
// 					this.formLabelAlign.totalweight = totalweight
// 
// 
// 
// 				}
// 
// 			
// 				//console.log(r)
// 			});
		},


		methods: {

			cancel() {
				this.$router.push("/orderManagement")
			},
			// 打印
			getPdflog() {
				// //console.log(document.getElementById('details').style)

				this.loading=true
				
				
				
				var head =('<html>	<head>		<meta charset="utf-8" />		<title>LogDemo</title>		<meta name="viewport" content="width=device-width, initial-scale=1.0" />		<meta http-equiv="X-UA-Compatible" content="ie=edge" />		<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css" />				<style>			/* @page{size:148mm 210mm;} */			@page{size:A5;margin:0} 		@media print{.new-page{page-break-inside:avoid;content:  counter(page);margin:2px 0;color: #333;font-size: 9pt;}}				body{						/* white-space: nowrap; */            font-family:Hiragino Sans GB W3;			margin: 0;			padding: 0;						        }				 #footer {        position: running(footer);        text-align: right;    }    @page {        @bottom-right {            content: element(footer);        }    }    #pagenumber:before {        content: counter(page);    }    #pagecount:before {        content: counter(pages);    }		        .red{            color: red;        }								.item-content {			border-left: 1px solid black;			border-right: 1px solid black;			line-height: 20px;			font-size: 8px;text-align:center;height:60px		}									.second_menu_item {				width: 100px;				line-height: 40px;				float: left;				margin-left: 20px;				font-size: 18px;			}						span {				cursor: pointer			}					.selector {				color: $navHoverTextColor;			}					.el-row {				/* margin-bottom: 20px; */									}					.el-col {				border-radius: 4px;			}									.title-content {				border: 1px solid black;				height: 35px;				line-height: 35px;				font-size: 8px;				font-weight: bold;				text-align: center;				-webkit-text-size-adjust:none;			}					.item-content {				border-left: 1px solid black;				border-right: 1px solid black;				line-height: 20px;				font-size: 10px;text-align:center			}					.remark-content {				line-height: 20px;				font-size: 10px			}					.row-bg {				padding: 10px 0;				background-color: #f9fafc;			}																					.mat20{				margin-top: 20px			}						.underline{				text-decoration: underline			}						.bgw{				background: white			}						.fl{				float: left			}						.fr{				float: right			}						.ft10{				font-size: 10px			}						.ft20{				font-size: 20px			}						.ft30{				font-size: 30px			}						.bold{				font-weight: bold			}						.lh75{				line-height: 75px;			}						.lh25{				line-height: 25px			}						.h25{				height: 25px			}						.h20{				height: 20px			}						.h60{				height: 60px			}						.h90{				height: 90px			}						.w75{				width: 75px			}						.w95{				width: 95px			}						.w190{				width: 190px			}						.w150{				width: 150px;			}						.w185{				width: 185px;			}						.w260{				width: 260px;			}						.textr{				text-align: right			}						.textl{				text-align: left			}						.padl5{				padding-left: 5px			}						.padt30{				padding: 15px 5px			}						.padt20{				padding-top: 20px			}						.padb30{				padding-bottom: 30px			}						.padr5{				padding-right: 5px			}						.noborder_r{				border-radius: 0			}						.bordert{				border-top: 1px solid black			}						.borderb{				border-bottom: 1px solid black			}						.borderl{				border-left: 1px solid black;			}						.borderr{				border-right: 1px solid black;			}						.btu_bg{				background: rgb(253,99,99)			}						.form_bg{				background: rgb(233,238,244)			}						.testC{				text-align: center			}						.no_borderr{				border-right: 0px;			}						.w650{				width: 460px;			}								    </style>	</head>	<body>')
				
				
				var s01 = ('<script src="https://unpkg.com/vue/dist/vue.js">')
				var s02 = ('<script src="https://unpkg.com/element-ui/lib/index.js">')
				var ss = "</" + "script>"
				var body = document.getElementById('details').innerHTML;
				var vuestring = '<script type="text/javascript">var doit = new Vue({ el: ' + "'#app'" +
					',data: {},methods: {},computed: {},watch: {}})'

				var over = '</body></html>'

				var sendLog = head + s01 + ss + s02 + ss + body + vuestring + ss + over

			
				this.$api.post('/PlvKAviEce/util/printPDF', {
					"in": sendLog,
					"reference": this.formLabelAlign.plvKGuestBillcol
					// "outPath": "C:/Users/vividamazilla/Desktop/index.pdf"
				}, r => {

					// var pdf=URL.createObjectURL(r)

					// var test=new Uint8Array(r);

					//console.log('---------')
					// //console.log(test)
					//console.log('---------')
					
					//console.log(r)
					

					var eleLink = document.createElement('a');
					eleLink.download = this.customerName;
					eleLink.style.display = 'none';
					
					eleLink.href =this.$api.root+'/PlvKAviEce/util/fetchPDF/' + r.reference
					
					document.body.appendChild(eleLink);
					eleLink.click();
					
					document.body.removeChild(eleLink);
					this.loading=false
					
					
					
				});

			},

			topage(type) {
				if (type == 'receipt') {
					this.$router.push("/SystemManagement/receipt")
				}
			}


		}
	}
</script>

<style lang="scss">
		
		
		
		.details{
			
			
			// @media print{.new-page{page-break-before:always;content:  counter(page) " / " counter(pages);vertical-align: top;margin: 10pt 0 30pt 0;color: #333;font-size: 9pt;}}
			
			margin: 0;
			padding: 0;
			
					 #footer {
			    position: running(footer);
			    text-align: right;
			}
			
			@page {
			    @bottom-right {
			        content: element(footer);
			    }
			}
			
			#pagenumber:before {
			    content: counter(page);
			}
			
			#pagecount:before {
			    content: counter(pages);
			}
				
			    .red{
			        color: red;
			    }
				
				
				
				.item-content {
					border-left: 1px solid black;
					border-right: 1px solid black;
					line-height: 20px;
					font-size: 8px;
					text-align: center;
					height: 90px
				}
				
				
				
					.second_menu_item {
						width: 100px;
						line-height: 40px;
						float: left;
						margin-left: 20px;
						font-size: 18px;
					}
					
					span {
						cursor: pointer
					}
				
					
				
					.el-row {
						/* margin-bottom: 20px; */
				
						
					}
				
					.el-col {
						border-radius: 4px;
					}
				
				
				
					.title-content {
						border: 1px solid black;
						height: 35px;
						line-height: 35px;
						font-size: 8px;
						font-weight: bold;
						text-align: center;
						-webkit-text-size-adjust:none;
					}
				
					// .item-content {
					// 	border-left: 1px solid black;
					// 	border-right: 1px solid black;
					// 	line-height: 20px;
					// 	font-size: 10px;
					// }
				
					.remark-content {
						line-height: 20px;
						font-size: 10px
					}
				
					.row-bg {
						padding: 10px 0;
						background-color: #f9fafc;
					}
					
					
					
					
					
			
					
					.mat20{
						margin-top: 20px
					}
					
					.underline{
						text-decoration: underline
					}
					
					.bgw{
						background: white
					}
					
					.fl{
						float: left
					}
					
					.fr{
						float: right
					}
					
					.ft10{
						font-size: 10px
					}
					
					.ft20{
						font-size: 20px
					}
					
					.ft30{
						font-size: 30px
					}
					
					.bold{
						font-weight: bold
					}
					
					.lh75{
						line-height: 75px;
					}
					
					.lh25{
						line-height: 25px
					}
					
					.h25{
						height: 25px
					}
					
					.h20{
						height: 20px
					}
					
					.h60{
						height: 60px
					}
					
					.h90{
						height: 90px
					}
					
					.w75{
						width: 75px
					}
					
					.w95{
						width: 95px
					}
					
					.w190{
						width: 190px
					}
					
					.w150{
						width: 150px;
					}
					
					.w185{
						width: 185px;
					}
					
					.w260{
						width: 260px;
					}
					
					.textr{
						text-align: right
					}
					
					.textl{
						text-align: left
					}
					
					.padl5{
						padding-left: 5px
					}
					
					.padt30{
						padding: 15px 5px;
					}
					
					.padt20{
						padding-top: 20px
					}
					
					.padb30{
						padding-bottom: 30px
					}
					
					.padr5{
						padding-right: 5px
					}
					
					.noborder_r{
						border-radius: 0
					}
					
					.bordert{
						border-top: 1px solid black
					}
					
					.borderb{
						border-bottom: 1px solid black
					}
					
					.borderl{
						border-left: 1px solid black;
					}
					
					.borderr{
						border-right: 1px solid black;
					}
					
					.btu_bg{
						background: rgb(253,99,99)
					}
					
					.form_bg{
						background: rgb(233,238,244)
					}
					
					.testC{
						text-align: center
					}
					
					.no_borderr{
						border-right: 0px;
					}
					
					.w650{
						width: 700px;
					}
					
					
			
			
		}
		
		
		
					
					
					
					
			
			
		
		
			
			
</style>

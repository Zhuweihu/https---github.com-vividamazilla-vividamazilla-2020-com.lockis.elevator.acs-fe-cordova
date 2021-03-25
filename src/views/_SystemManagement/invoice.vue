<template>
	<div class="invoice_test">
		
		
		
		<div id="pdfDom" style="padding: 0 50px;width: 840px;
		margin: 0 auto;margin-top: 10px;" class="bgw">
			<div class="lh75  bold" style="text-align: center;">POUR LA VIE</div>
			<!-- 一行 -->
			<div class="lh25 h25 bgw">
				<div class="fl">
					<div class="fl w75 textr">Customer1：</div>
					<div class="fl">陳小姐</div>
				</div>
				<!-- <span class="fr">Sales No:1567</span> -->
				<div class="fr w190">
					<div class="fl w95 textr">Sales No：</div>
					<div class="fl">1567</div>
				</div>
			</div>
			<!-- 一行 -->
			<div class="lh25 h25 bgw">
				<div class="fl">
					<div class="fl w75 textr">Customer2：</div>
					<div class="fl">黃先生</div>
				</div>
				<!-- <span class="fr">Sales No:1567</span> -->
				<div class="fr w190">
					<div class="fl w95 textr">Buying Date：</div>
					<div class="fl">2019-10-13</div>
				</div>
			</div>
			<!-- 一行 -->
			<div class="lh25 h25 bgw">
				<div class="fl">
					<div class="fl w75 textr">Big day：</div>
					<div class="fl">2019-10-12</div>
				</div>
				<!-- <span class="fr">Sales No:1567</span> -->
				<div class="fr w190">
					<div class="fl w95 textr" style="width: 110px;">Collection Date：</div>
					<div class="fl">2019-10-12</div>
				</div>
			</div>

			<!-- 表格内容 -->
			<div>
				<el-row :gutter="0">
					<el-col :span="12">
						<div class="title-content ">ITEM DESCRIPTION</div>
					</el-col>
					<el-col :span="3">
						<div class="title-content ">UNIT HKD</div>
					</el-col>
					<el-col :span="3">
						<div class="title-content ">QTY</div>
					</el-col>
					<el-col :span="3">
						<div class="title-content ">Total HKD</div>
					</el-col>
					<el-col :span="3">
						<div class="title-content ">Net Amount</div>
					</el-col>
				</el-row>
			</div>
			<!-- 黃金内容 -->
			<div>
				<el-row :gutter="0">
					<el-col :span="12">
						<div class="item-content textl padl5 padr5">
							<div>Ms Chan RC011 PT950 White gold ring</div>
							<div>Size：13.5(HK Size) w：As sample T：As sample</div>
							<div>Stone：13.5(HK Size) around：As sample</div>
						</div>
					</el-col>
					<el-col :span="3">
						<div class="item-content textl padl5 padr5 h60">$7,780</div>
					</el-col>
					<el-col :span="3">
						<div class="item-content textl padl5 padr5 h60">1</div>
					</el-col>
					<el-col :span="3">
						<div class="item-content textl padl5 padr5 h60">$7,780</div>
					</el-col>
					<el-col :span="3">
						<div class="item-content textl padl5 padr5 h60">$7,500</div>
					</el-col>
				</el-row>
			</div>
			<!-- 鑽石内容 -->
			<div>
				<el-row :gutter="0">
					<el-col :span="12">
						<div class="item-content textl padl5 padr5 padt30">
							<div>GIA Diamond</div>
							<div>Size：0.4ct w：As sample T：As sample</div>
							<div>Stone：GIA NO：1248945659 E/S11/ExExEx/Fnt</div>
						</div>
					</el-col>
					<el-col :span="3">
						<div class="item-content textl padl5 padr5 h90 padt30" >$9,322</div>
					</el-col>
					<el-col :span="3">
						<div class="item-content textl padl5 padr5 h90 padt30"></div>
					</el-col>
					<el-col :span="3">
						<div class="item-content textl padl5 padr5 h90 padt30">$9,322</div>
					</el-col>
					<el-col :span="3">
						<div class="item-content textl padl5 padr5 h90 padt30">$9,322</div>
					</el-col>
				</el-row>
			</div>
			<!-- 鑽石内容 -->
			<div>
				<el-row :gutter="0">
					<el-col :span="18">
						<div class="item-content textl padl5 padr5  bordert borderb">
							<div class="textr">Total Price：</div>
						</div>
					</el-col>
					<el-col :span="3">
						<div class="item-content textl padl5 padr5 h20  bordert borderb" style="height: 22px;">$9,322</div>
					</el-col>
					<el-col :span="3">
						<div class="item-content textl padl5 padr5 h20  bordert borderb" style="height: 22px;">$9,322</div>
					</el-col>
				</el-row>
			</div>
			<!-- 鑽石内容 -->
			<div>
				<el-row :gutter="0">
					<el-col :span="18">
						<div class="remark-content textl padl5 padr5   ">
							<span class="fl">Remark：</span>
							<span class="fr">Total Discount：</span>
						</div>
					</el-col>
					<el-col :span="3">
						<div class="remark-content textl padl5 padr5 h20 borderr "></div>
					</el-col>
					<el-col :span="3">
						<div class="remark-content textl padl5 padr5 h20 borderb bordert borderl borderr ">$9,322</div>
					</el-col>
				</el-row>
			</div>
			<!-- 鑽石内容 -->
			<div>
				<el-row :gutter="0">
					<el-col :span="18">
						<div class="remark-content textl padl5 padr5   ">
							<span class="fl">Code remark：</span>
							<span class="fr">Total Net：</span>
						</div>
					</el-col>
					<el-col :span="3">
						<div class="remark-content textl padl5 padr5 h20 borderr "></div>
					</el-col>
					<el-col :span="3">
						<div class="remark-content textl padl5 padr5 h20 borderb bordert borderl borderr ">$9,322</div>
					</el-col>
				</el-row>
			</div>
			<!-- 鑽石内容 -->
			<div>
				<el-row :gutter="0">
					<el-col :span="18">
						<div class="remark-content textl padl5 padr5   ">
							<span class="fl">Ref Date：2018-11-23</span>
							<span class="fr">1st Payment：</span>
						</div>
					</el-col>
					<el-col :span="3">
						<div class="remark-content textl padl5 padr5 h20 borderr "></div>
					</el-col>
					<el-col :span="3">
						<div class="remark-content textl padl5 padr5 h20 borderb bordert borderl borderr ">$9,322</div>
					</el-col>
				</el-row>
			</div>
			<!-- 鑽石内容 -->
			<div>
				<el-row :gutter="0">
					<el-col :span="18">
						<div class="remark-content textl padl5 padr5   ">
							<span class="fr">2nd Payment：</span>
						</div>
					</el-col>
					<el-col :span="3">
						<div class="remark-content textl padl5 padr5 h20 borderr "></div>
					</el-col>
					<el-col :span="3">
						<div class="remark-content textl padl5 padr5 h20 borderb bordert borderl borderr ">$9,322</div>
					</el-col>
				</el-row>
			</div>
			<!-- 鑽石内容 -->
			<div>
				<el-row :gutter="0">
					<el-col :span="18">
						<div class="remark-content textl padl5 padr5   ">
							<span class="fr">Balance：</span>
						</div>
					</el-col>
					<el-col :span="3">
						<div class="remark-content textl padl5 padr5 h20 borderr "></div>
					</el-col>
					<el-col :span="3">
						<div class="remark-content textl padl5 padr5 h20 borderb bordert borderl borderr ">$9,322</div>
					</el-col>
				</el-row>
			</div>
			<!-- 鑽石内容 -->
			<div>
				<el-row :gutter="0">
					<el-col :span="18">
						<div class="remark-content textl padl5 padr5   ">
							<span class="fl">1st Payment：EPS 2018-10-13</span>
						</div>
					</el-col>
					<el-col :span="3">
						<div class="remark-content textl padl5 padr5 h20  "></div>
					</el-col>
					<el-col :span="3">
						<div class="remark-content textl padl5 padr5 h20 "></div>
					</el-col>
				</el-row>
			</div>
			<!-- 鑽石内容 -->
			<div>
				<el-row :gutter="0">
					<el-col :span="18">
						<div class="remark-content textl padl5 padr5   ">
							<span class="fl">Final Payment：</span>
						</div>
					</el-col>
					<el-col :span="3">
						<div class="remark-content textl padl5 padr5 h20  "></div>
					</el-col>
					<el-col :span="3">
						<div class="remark-content textl padl5 padr5 h20 "></div>
					</el-col>
				</el-row>
			</div>
			<!-- 鑽石内容 -->
			<div>
				<el-row :gutter="0">
					<el-col :span="18">
						<div class="remark-content textl padl5 padr5   ">
							<span class="fl">REMARKS：vs，</span>
							<span class="fl">STAFF：Gigi</span>
						</div>
					</el-col>
					<el-col :span="3">
						<div class="remark-content textl padl5 padr5 h20  "></div>
					</el-col>
					<el-col :span="3">
						<div class="remark-content textl padl5 padr5 h20 "></div>
					</el-col>
				</el-row>
			</div>
			<!-- 鑽石内容 -->
			<div class="padb30">
				<el-row :gutter="0">
					<el-col :span="18">
						<div class="remark-content textl padl5 padr5   ">
							<div class="mat20 underline">NOTES TO CUSTOMER</div>
							<div>POUR LA VIE POUR LA VIE POUR LA VIE POUR LA VIE POUR LA VIE</div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="remark-content textl padl5 padr5   " style="font-size: 20px;">POUR LA VIEsssss POUR LA VIE POUR LA VIE
							POUR LA VIE POUR LA VIE</div>
					</el-col>

				</el-row>
			</div>

		</div>
		
		<div style="width: 95%;float: left;margin-top: 50px;" class="mat20">
			<div class='mat20' style='text-align: center;'>
				<el-button class='button' type="primary" @click="getPdflog()">PDF保存</el-button>
				<el-button class='button' type="primary" @click="cancel()">返回</el-button>
			</div>
		</div>
		
	</div>

</template>

<script>
	export default {
		name: "invoice",
		data() {
			return{
				htmlTitle:'',
			}
		},
		created: function() {
			
		},


		methods: {
		
		// 打印
		getPdflog(){
			//console.log(document.getElementById('pdfDom'))
			// this.htmlTitle='test'
			// this.getPdf()
		},
		cancel(){
			this.$router.push("/SystemManagement/invoice_index")
		},
		topage(type){
			if(type=='receipt'){
				this.$router.push("/SystemManagement/receipt")
			}
		}


		}
	}
</script>

<style lang="scss">
	// @import '../../assets/styles/variable';
	@import '../../assets/styles/variable';

	.invoice_test {

		.second_menu_item {
			width: 100px;
			line-height: 40px;
			float: left;
			margin-left: 20px;
			font-size: 18px;

			span {
				cursor: pointer
			}
		}

		.selector {
			color: $navHoverTextColor;
		}

		.el-row {
			margin-bottom: 20px;

			&:last-child {
				margin-bottom: 0;
			}
		}

		.el-col {
			border-radius: 4px;
		}



		.title-content {
			border: 1px solid black;
			height: 35px;
			line-height: 35px;
			font-size: 12px;
			font-weight: bold;
			text-align: center
		}

		.item-content {
			border-left: 1px solid black;
			border-right: 1px solid black;
			line-height: 20px;
			font-size: 12px;
		}

		.remark-content {
			line-height: 20px;
			font-size: 12px
		}

		.row-bg {
			padding: 10px 0;
			background-color: #f9fafc;
		}



	}
</style>

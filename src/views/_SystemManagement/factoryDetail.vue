<template>

	<div style="width: 750px;margin: 0 auto;">
	<div  v-loading="all_loading" id="Allprint">

		<div id="details01" style="page-break-after:always">

			<!-- <div id="app" class="factoryDetail" style="width: 700px; margin: 50px auto;"> -->
			<div id="app" class="factoryDetail" style=" margin: 0px auto;padding: 10px;background: white;">
				<div class="lh75  bold " style="text-align: center;font-size: 30px;margin-bottom: 20px;" >
					<img src="../../../image/logo.png" style="width: 30%;" />
				</div>
				<div class="ft14" style="height: 30px; width: 100%; margin: 0px auto; line-height: 30px;">
					<div style="float: left; width: 35%; text-align: center;">PLV : 發鑲單(附圖記錄)</div>
					<div style="float: left; width: 65%; text-align: center;"><span>厰 :
							{{formLabelAlign.factory.name}} </span><span style="margin-left: 10px;">Sales : {{formLabelAlign.member.nickname}}</span></div>
				</div>
				<div style="border: 1px solid black; height: 1080px;">
					<div class="borderb el-row">
						<div class="el-col el-col-8 borderr">
							<div class="title-contents" style="float: left;">發單日期: {{formLabelAlign.dateSend}}</div>
						</div>
						<div class="el-col el-col-15">
							<div class="title-contents " style="float: left;">

								<span>必須交貨日期 (急單): {{formLabelAlign.dateDelivery}}</span>
								<span style="margin-left: 10px;">婚期日期: </span>
								</div>
						</div>
					</div>
					<div class="borderb el-row">
						<div class="el-col el-col-8 borderr">
							<div class="title-contents " style="float: left;">給厰工單編號: </div>
						</div>
						<div class="el-col el-col-8 borderr">
							<div class="title-contents " style="float: left;">客銷售單號:  </div>
						</div>
						<div class="el-col el-col-7 ">
							<div class="title-contents " style="float: left;">客名: </div>
						</div>
					</div>
					<div class="borderb el-row">

						<div class="el-col el-col-8 borderr">
							<div class="title-contents " style="float: left;">產品類別: {{formLabelAlign.salesOrderItem.sort}}</div>
						</div>
						<div class="el-col el-col-8 borderr">
							<div class="title-contents " style="float: left;">設計: {{formLabelAlign.design}}</div>
							<div class="title-contents " style="float: left;margin-left: 15px;">

								<span>數量:{{formLabelAlign.salesOrderItem.quantity}}</span>

							</div>

						</div>
						<div class="el-col el-col-7 ">
							<div class="title-contents " style="float: left;">成色: {{formLabelAlign.metal}}</div>

						</div>
					</div>


					<div style="width: 96%; margin: 0px auto;height: 120px;">

						<div style="border: 1px solid black;height: 105px;margin-top: 10px;width: 50%;font-size:10px ;padding: 5px;float: left;">
							<div style="font-size: 10px;"><b>尺寸要求 (必須跟足尺寸要求,只能0.15mm内相差)</b></div>
							<div style="border: 1px solid black;width: 100%;height: 70px;float: left;margin-top: 5px;">
								<div style="border-right: 1px solid black;height: 70px;float: left;width: 25%;">
									<div style="height: 30px;float: left;font-size: 10px;">手指圈口(港度)</div>
									<div style="height: 40px;float: left;font-size: 10px;text-align: center;font-size: 16px;width: 100%;">{{formLabelAlign.dimensionFinger}}</div>
								</div>
								<div style="border-right: 1px solid black;height: 70px;float: left;width: 25%;">
									<div style="height: 30px;float: left;font-size: 10px;width: 100%;text-align: center;">濶度:</div>
									<div style="height: 40px;float: left;font-size: 10px;text-align: center;font-size: 16px;width: 100%;">{{formLabelAlign.dimensionWidth}}mm</div>
								</div>
								<div style="border-right: 1px solid black;height: 70px;float: left;width: 25%;">
									<div style="height: 30px;float: left;font-size: 10px;width: 100%;text-align: center;">厚度:</div>
									<div style="height: 40px;float: left;font-size: 10px;text-align: center;font-size: 16px;width: 100%;">{{formLabelAlign.dimensionThickness}}mm</div>
								</div>
								<div style="height: 70px;float: left;width: 24%;">
									<div style="height: 30px;float: left;font-size: 10px;width: 100%;text-align: center;">長度:</div>
									<div style="height: 40px;float: left;font-size: 10px;text-align: center;font-size: 16px;width: 100%;">{{formLabelAlign.dimensionLength}}mm</div>
								</div>
							</div>
						</div>

						<div style="height: 100px;margin-top: 10px;width: 44%;font-size:10px ;padding: 5px;float: right;">
							<div style="font-size: 13px;width: 60%;height: 100px;float: left;">
								<div style="float: left;width: 95%;">公司字印要求:請跟定既定要求公司名丶單號丶成色丶石重*印在不當眼位置及書細字體</div>
								<!-- <div style="float: left;width: 100%;margin-top: 20px;font-size: 12px;">*留最當眼位置：給客人打字印</div> -->
							</div>

							<div style="font-size: 13px;width: 40%;height: 100px;float: left;word-wrap:break-word;">
								<div>備注:</div>
								<div style="width: 100%;word-wrap:break-word;"><b>*留最當眼位置給客人打字印 </b></div>
							</div>

						</div>
					</div>

					<div style="width:96%; margin: 0px auto;height: 150px;">

						<div style="border: 1px solid black;height: 100px;margin-top: 10px;width: 50%;font-size:10px ;padding: 5px;float: left;">
							<div style="font-size: 10px;height: 25px;"><b>特別要求:{{formLabelAlign.materials[0].factoryOrder.specialRequests}}</b></div>
							<div style="font-size: 10px;height: 25px;">
								<div style="float: left;width: 60px;">戒指肶内:</div>
								<div style="float: left;">舒服/一般内卜/厚卜/微卜/内鑲</div>
							</div>
							<div style="font-size: 10px;height: 25px;">
								<div style="float: left;width: 60px;">要求厰:</div>
								<div style="float: left;">出圖/出3D圖/睇腊板</div>
							</div>
							<div style="font-size: 10px;height: 25px;">
								<div style="float: left;width: 60px;">設計跟板:</div>
								<div style="float: left;width: 100px;"></div>
								<div style="float: left;width: 60px;">改款:</div>
								<div style="float: left;"></div>
							</div>
						</div>

						<div style="height: 60px;margin-top: 10px;width: 44%;font-size:10px ;padding: 5px;float: right;">
							<div style="font-size: 14px;width: 60%;height: 100px;float: left;">
								<div style="float: left;width: 100%;">客人字印位置:{{formLabelAlign.materials[0].factoryOrder.textLocation}}</div>
								<div style="float: left;width: 100%;margin-top: 5px;">字體:{{formLabelAlign.materials[0].factoryOrder.textFont}}</div>
								<div style="float: left;width: 100%;margin-top: 5px;">字句:{{formLabelAlign.materials[0].factoryOrder.textContext}}</div>
							</div>

						</div>

						<div style="width: 40%; margin-top: 30px;float: right;">
							<div style="float: left;">外:位置錶圈:</div>

							<div style="width: 90%;float: left;background-size:contain;background-repeat:no-repeat">
								<img style="width: 100%;" src='../../../image/out.png' />
							</div>
							<div style="width: 90%;float: left;"></div>
							<div style="float: left;">内:位置錶圈:</div>
							<div style="width: 90%;float: left;background-size:contain;background-repeat:no-repeat">
								<img style="width: 100%;" src='../../../image/in.png' />
							</div>
							<div style="width: 90%;float: left;"></div>
							<!-- <div style="width: 90%;height: 50px;float: left;background-size:contain;background-repeat:no-repeat" v-bind:style="{backgroundImage:'url(' +root+'in)'}"></div> -->
						</div>

						<div style="width: 100%; margin: 10px auto;height: 401px;float: right;">
							<div style="float: left;">石頭備注資料:</div>
							<div style="border: 1px solid gray;width: 100%;height: 401px;float: left;">
								<div style="float: left;height: 200px;width:100%;border-bottom: 1px solid black;">
									<div style="float: left;height: 200px;width:49%;border-right: 1px solid black;" v-for="item in formLabelAlign.materials[0].factoryOrder.images">
										<div  v-bind:style="{margin:'2.5%',backgroundSize:'contain',height: '95%',width:'95%',backgroundRepeat: 'no-repeat',backgroundImage:'url(' +root+item.reference + ')'}" ></div>
									</div>
									<!-- <div style="float: left;height: 200px;width:50%;">
										<div style="background-size: cover;width: 100%;height: 100%;background-image: url(http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg);"></div>
									</div> -->
								</div>

								<!-- <div style="float: left;height: 200px;width:100%;border-bottom: 1px solid black;">
									<div style="float: left;height: 200px;width:49.8%;border-right: 1px solid black;">
										<div style="background-size: cover;width: 100%;height: 100%;background-image: url(http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg);"></div>
									</div>
									<div style="float: left;height: 200px;width:50%;">
										<div style="background-size: cover;width: 100%;height: 100%;background-image: url(http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg);"></div>

									</div>
								</div> -->
							</div>
						</div>
					</div>
				</div>
			</div>


		</div>

		<div id="details02" >
			<!-- <div id="app" class="factoryDetail" style="width: 700px; margin: 50px auto;"> -->
			<div id="app" class="factoryDetail" style="margin: 0px auto;padding: 10px;background: white;">
			<div class="lh75  bold " style="text-align: center;font-size: 30px;margin-bottom: 20px;" >
				<img src="../../../image/logo.png" style="width: 30%;" />
			</div>
				<div class="ft16" style="height: 30px; width: 100%; margin: 0px auto; line-height: 30px;">
					<div style="float: left; width: 35%; text-align: center;">PLV : 發鑲單（Factory）</div>
					<div style="float: left; width: 65%; text-align: center;"><!-- <span>sales no :
							 </span> --><span style="padding-left: 10px;">Big Day : </span></div>
				</div>
				<div style="border: 1px solid black; ">
					<div class="borderb el-row">
						<div class="el-col el-col-4">
							<div class="title-content borderr">工廠:</div>
						</div>
						<div class="el-col el-col-8">
							<!-- <div class="title-content borderr">{{formLabelAlign.factory.name}}</div> -->
						</div>
						<div class="el-col el-col-4">
							<div class="title-content borderr">發單日期:</div>
						</div>
						<div class="el-col el-col-8">
							<div class="title-content ">{{formLabelAlign.dateSend}}</div>
						</div>
					</div>
					<div class="borderb el-row">
						<div class="el-col el-col-4">
							<div class="title-content borderr">編號:</div>
						</div>
						<div class="el-col el-col-8">
							<div class="title-content borderr"></div>
						</div>
						<div class="el-col el-col-4">
							<div class="title-content borderr">金:</div>
						</div>
						<div class="el-col el-col-8">
							<div class="title-content ">{{formLabelAlign.metal}}</div>
						</div>
					</div>
					<div class="borderb el-row">
						<div class="el-col el-col-4">
							<div class="title-content borderr">產品:</div>
						</div>
						<div class="el-col el-col-8">
							<div class="title-content borderr">{{formLabelAlign.salesOrderItem.name}}</div>
						</div>
						<div class="el-col el-col-4">
							<div class="title-content borderr">數量:</div>
						</div>
						<div class="el-col el-col-8">
							<div class="title-content ">{{formLabelAlign.salesOrderItem.quantity}}</div>
						</div>
					</div>
					<div class="borderb el-row">
						<div class="el-col el-col-4">
							<div class="title-content borderr">類別:</div>
						</div>
						<div class="el-col el-col-8">
							<div class="title-content borderr">{{formLabelAlign.salesOrderItem.sort}}</div>
						</div>
						<div class="el-col el-col-4">
							<div class="title-content borderr">尺寸:</div>
						</div>
						<div class="el-col el-col-8">
							<div class="title-content ">{{formLabelAlign.dimensionFinger}}</div>
						</div>
					</div>
					<div class="borderb el-row">
						<div class="el-col el-col-4">
							<div class="title-content borderr">設計:</div>
						</div>
						<div class="el-col el-col-8">
							<div class="title-content borderr">{{formLabelAlign.design}}</div>
						</div>
						<div class="el-col el-col-4">
							<div class="title-content borderr">起貨日期:</div>
						</div>
						<div class="el-col el-col-8">
							<div class="title-content ">{{formLabelAlign.dateDelivery}}</div>
						</div>
					</div>
					<div style="width: 96%; margin: 0px auto;">
						<div class="ft12" style="height: 25px; line-height: 25px; width: 100%;">石資料:</div>
						<div style="border: 1px solid black;">
							<div class="borderb el-row">
								<div class="el-col el-col-4">
									<div class="table-content borderr">石</div>
								</div>
								<div class="el-col el-col-4">
									<div class="table-content borderr">尺寸</div>
								</div>
								<div class="el-col el-col-4">
									<div class="table-content borderr">交厰數量</div>
								</div>
								<div class="el-col el-col-4">
									<div class="table-content borderr">交厰石重</div>
								</div>
								<div class="el-col el-col-3">
									<div class="table-content borderr">回石重</div>
								</div>
								<div class="el-col el-col-5">
									<div class="table-content ">實用石數/卡重</div>
								</div>
							</div>

							<div class="borderb el-row" v-for="item in formLabelAlign.materials">
								<div class="el-col el-col-4">
									<div class="table-content borderr">{{item.stone}}</div>
								</div>
								<div class="el-col el-col-4">
									<div class="table-content borderr">{{item.dimensionWidth}}*{{item.dimensionLength}}</div>
								</div>
								<div class="el-col el-col-4">
									<div class="table-content borderr">{{item.sendQuantity}}</div>
								</div>
								<div class="el-col el-col-4">
									<div class="table-content borderr">{{item.sendWeight}}{{item.sendUnit}}</div>
								</div>
								<div class="el-col el-col-3">
									<div class="table-content borderr">{{item.backWeight}}{{item.backUnit}}</div>
								</div>
								<div class="el-col el-col-5">
									<div class="table-content ">{{item.factQuantity}}/{{item.factWeight}}{{item.factUnit}}</div>
								</div>
							</div>

							<div class="borderb el-row" >
								<div class="el-col el-col-4">
									<div class="table-content borderr"></div>
								</div>
								<div class="el-col el-col-4">
									<div class="table-content borderr"></div>
								</div>
								<div class="el-col el-col-4">
									<div class="table-content borderr"></div>
								</div>
								<div class="el-col el-col-4">
									<div class="table-content borderr"></div>
								</div>
								<div class="el-col el-col-3">
									<div class="table-content borderr"></div>
								</div>
								<div class="el-col el-col-5">
									<div class="table-content "></div>
								</div>
							</div>

							<div class="borderb el-row" >
								<div class="el-col el-col-4">
									<div class="table-content borderr"></div>
								</div>
								<div class="el-col el-col-4">
									<div class="table-content borderr"></div>
								</div>
								<div class="el-col el-col-4">
									<div class="table-content borderr"></div>
								</div>
								<div class="el-col el-col-4">
									<div class="table-content borderr"></div>
								</div>
								<div class="el-col el-col-3">
									<div class="table-content borderr"></div>
								</div>
								<div class="el-col el-col-5">
									<div class="table-content "></div>
								</div>
							</div>

							<div class="borderb el-row" >
								<div class="el-col el-col-4">
									<div class="table-content borderr"></div>
								</div>
								<div class="el-col el-col-4">
									<div class="table-content borderr"></div>
								</div>
								<div class="el-col el-col-4">
									<div class="table-content borderr"></div>
								</div>
								<div class="el-col el-col-4">
									<div class="table-content borderr"></div>
								</div>
								<div class="el-col el-col-3">
									<div class="table-content borderr"></div>
								</div>
								<div class="el-col el-col-5">
									<div class="table-content "></div>
								</div>
							</div>

							<!-- <div class="borderb el-row">
								<div class="el-col el-col-4">
									<div class="table-content borderr">元石</div>
								</div>
								<div class="el-col el-col-4">
									<div class="table-content borderr">1.1m</div>
								</div>
								<div class="el-col el-col-4">
									<div class="table-content borderr">22</div>
								</div>
								<div class="el-col el-col-4">
									<div class="table-content borderr">0.11</div>
								</div>
								<div class="el-col el-col-3">
									<div class="table-content borderr">1/0.005</div>
								</div>
								<div class="el-col el-col-5">
									<div class="table-content ">0</div>
								</div>
							</div> -->



							<div class="borderb el-row">
								<div class="el-col el-col-4">
									<div class="all-content borderr">
										<!-- <div style="height: 50%; text-align: left; line-height: 25px;"></div>
										<div style="height: 50%; text-align: center; line-height: 25px;">{{formLabelAlign.goldWeight}}g</div> -->
									</div>
								</div>
								<div class="el-col el-col-4">
									<div class="all-content borderr">
										<div style="height: 50%; text-align: right; line-height: 50px;padding-right: 5px;">總:</div>
										<!-- <div style="height: 50%; text-align: center; line-height: 25px;">${{formLabelAlign.totalGoldPrice}}</div> -->
									</div>
								</div>
								<div class="el-col el-col-4">
									<div class="all-content borderr">
										<div style="height: 50%; text-align: left; line-height: 50px;">粒</div>
										<!-- <div style="height: 50%; text-align: center; line-height: 25px;">${{formLabelAlign.artificialPriceRmb}}</div> -->
									</div>
								</div>
								<div class="el-col el-col-4">
									<div class="all-content borderr">
										<div style="height: 50%; text-align: left; line-height: 50px;">cts</div>
										<!-- <div style="height: 50%; text-align: center; line-height: 25px;">${{formLabelAlign.artificialPriceHk}}</div> -->
									</div>
								</div>
								<div class="el-col el-col-3">
									<div class="all-content borderr"></div>
								</div>
								<div class="el-col el-col-5">
									<div class="all-content "></div>
								</div>
							</div>

							<div class="borderb el-row">
								<div class="el-col el-col-4">
									<div class="all-content borderr">
										<div style="height: 50%; text-align: left; line-height: 25px;">金重:</div>
										<div style="height: 50%; text-align: center; line-height: 25px;">{{formLabelAlign.metalWeight}}g</div>
									</div>
								</div>
								<div class="el-col el-col-4">
									<div class="all-content borderr">
										<div style="height: 50%; text-align: left; line-height: 25px;">總金費:</div>
										<div style="height: 50%; text-align: center; line-height: 25px;">${{formLabelAlign.metalCost}}</div>
									</div>
								</div>
								<div class="el-col el-col-4">
									<div class="all-content borderr">
										<div style="height: 50%; text-align: left; line-height: 25px;">人工RMB:</div>
										<div style="height: 50%; text-align: center; line-height: 25px;">${{formLabelAlign.labourFeeRmb}}</div>
									</div>
								</div>
								<div class="el-col el-col-4">
									<div class="all-content borderr">
										<div style="height: 50%; text-align: left; line-height: 25px;">人工HKD:</div>
										<div style="height: 50%; text-align: center; line-height: 25px;">${{formLabelAlign.labourFeeHkd}}</div>
									</div>
								</div>
								<div class="el-col el-col-3">
									<div class="all-content borderr"></div>
								</div>
								<div class="el-col el-col-5">
									<div class="all-content "></div>
								</div>
							</div>
						</div>
					</div>
					<div style="width: 95%; margin: 0px auto;">
						<div class="el-row">
							<div class="el-col el-col-7">
								<div class="title-content ">足金價:HKD</div>
							</div>
							<div class="el-col el-col-7">
								<div class="title-content ">18K金價(每錢)HKD</div>
							</div>
							<div class="el-col el-col-7">
								<div class="title-content ">18K金價(每克)HKD</div>
							</div>
						</div>
						<div class="el-row">
							<div class="el-col el-col-24">
								<div class="title-content ">(日期:)</div>
							</div>
						</div>
						<div class="el-row">
							<div class="el-col el-col-24">
								<div class="title-content ">内容:</div>
							</div>
						</div>
						<div class="el-row">
							<div class="el-col el-col-24">
								<div class="title-content ">字印(一般):成色,石重,單號,PLV</div>
							</div>
						</div>
						<div class="el-row">
							<div class="el-col el-col-24">
								<div class="title-content ">字印(客要求):N</div>
							</div>
						</div>
						<div class="el-row">
							<div class="el-col el-col-24">
								<div class="title-content ">備注:{{formLabelAlign.remark}}</div>
							</div>
						</div>
						<div class="el-row">
							<div class="el-col el-col-24">
								<div class="title-content ">客:</div>
							</div>
						</div>
						<div class="el-row">
							<div class="el-col el-col-24">
								<div class="title-content ">客落單日期:</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>








		<div style="text-align: center;" class="printhide">
			<div style='margin: 30px auto;'>
				<!-- <el-button  :loading="loading" @click='getPdflog()'>打印</el-button> -->
				<el-button  :loading="loading" @click='print()'>打印</el-button>
				<el-button @click='cancel()'>返回</el-button>
			</div>
		</div>

	</div>
	</div>
</template>



<script>
	export default {
		name: "factoryDetail",
		data() {
			return {
				htmlTitle: '',
				root:'',
				formLabelAlign: {

					factory:{name:''},
					member:{nickname:''},
					dateSend:'',
					dateDelivery:'',
					salesOrderItem:{sort:''},
					design:'',
					quantity:'',
					metal:'',
					dimensionFinger:'',
					dimensionWidth:'',
					dimensionThickness:'',
					dimensionLength:'',
					materials:[
						{
							"factoryOrder":{
								specialRequests:'',
								textLocation:'',
								textFont:'',
								textContext:'',
								images:[]
							}
						}
					],
					factory:{name:''},
					dateSend:'',
					metal:'',
					salesOrderItem:{
						name:'',
						quantity:'',
						sort:'',
					},

					dimensionFinger:'',
					design:'',
					dateDelivery:'',

					metalWeight:'',
					metalCost:'',
					labourFeeRmb:'',
					labourFeeHkd:'',
					remark:'',

				},
				loading:false,
				all_loading:true

			}
		},
		created: function() {
			this.uuid = this.$route.query.id

			this.root=this.$api.root+'/kernal/asset/'

			this.$api.get('/factory/order/' + this.uuid, null, r => {

				console.log('-----****')
				console.log(r)
				this.formLabelAlign=r
        if(this.formLabelAlign.salesOrderItem==null){
          this.formLabelAlign.salesOrderItem={sort:''}
        }
				this.all_loading=false

				// this.formLabelAlign.factoryDto = r.factoryDto
				// console.log(this.formLabelAlign.factoryDto)
				// for(var i=0;i<r.dataDtoList.length;i++){
				// 	this.formLabelAlign.stoneDataDto[i] = r.dataDtoList[i]
				// }
				// var total = 0;
				// var totalweight = 0;
				// for (var i = 0; i < r.dataDtoList.length; i++) {
				// 	total = r.dataDtoList[i].deliveredNumbe + total
				// 	totalweight = r.dataDtoList[i].deliveredWeight + totalweight
				// 	this.formLabelAlign.total = total
				// 	this.formLabelAlign.totalweight = totalweight
				// }

			});


// 			this.$api.post('/sendInlay/findFactoryOrder?reference=' + this.uuid, null, r => {
//
// 				this.formLabelAlign.factoryOrderDto = r.factoryOrderDto
// 				this.formLabelAlign.list= r.list
//
// 			});


		},


		methods: {

			print(){

				let dom = document.getElementById('Allprint')
				console.log(dom)
				this.$print(dom)

			},
			cancel() {
				this.$router.push("/factoryManagement")
			},
			// 打印
			getPdflog() {
				// //console.log(document.getElementById('details').style)

				this.loading=true

				var head = (
					'<html>	<head>		<meta charset="utf-8"/>		<title>LogDemo</title>		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>		<meta http-equiv="X-UA-Compatible" content="ie=edge"/>		<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"/>						<style> @page{size:A4;margin:0}			body{						            font-family:Hiragino Sans GB W3;			margin: 0;			padding: 0;			        }        .yi2,.yi4{        	float: left;        	width: 14%;        	height: 30px;        	border-right: 1px solid #000000;        	text-align: center;			font-size: 12px;        }                .inputs{        	        }        .el-input__inner{        	height: 28px;        }                .biao2{        	float: left;        	height: 30px;        	width: 16.5%;        	text-align: center;        	border-right: 1px solid #000000;        	line-height: 30px;        }                .biao3{        	float: left;        	height: 50px;        	width: 16.666%;        	text-align: center;        	border-right: 1px solid #000000;        }        .zong{        	line-height: 25px;        }						.mat20{			margin-top: 20px		}				.underline{			text-decoration: underline		}				.bgw{			background: white		}				.fl{			float: left		}				.fr{			float: right		}				.ft8{			font-size: 8px		}				.ft10{			font-size: 10px		}				.ft12{			font-size: 12px		}	  .ft16{font-size:16px}			.ft14{			font-size: 14px		}   .ft18{font-size:18px} 				.ft20{			font-size: 20px		}				.ft30{			font-size: 30px		}				.bold{			font-weight: bold		}				.lh75{			line-height: 75px;		}				.lh25{			line-height: 25px		}				.h25{			height: 25px		}				.h20{			height: 20px		}				.h60{			height: 60px		}				.h90{			height: 90px		}				.w75{			width: 75px		}				.w95{			width: 95px		}				.w190{			width: 190px		}				.textr{			text-align: right		}				.textl{			text-align: left		}				.padl5{			padding-left: 5px		}				.padt30{			padding-top: 30px		}				.padt20{			padding-top: 20px		}				.padb30{			padding-bottom: 30px		}				.padr5{			padding-right: 5px		}				.noborder_r{			border-radius: 0		}				.bordert{			border-top: 1px solid black		}				.borderb{			border-bottom: 1px solid black		}				.borderl{			border-left: 1px solid black;		}				.borderr{			border-right: 1px solid black;		}				.btu_bg{			background: rgb(253,99,99)		}				.form_bg{			background: rgb(233,238,244)		}				.testC{			text-align: center		}				.title-content {			/* border: 1px solid black; */			height: 35px;			line-height: 35px;			font-size: 16px;						text-align: left;			padding-left: 5px;		}				.table-content{			height: 25px;			line-height: 25px;			font-size: 14px;						text-align: center;			padding-left: 5px;		}				.all-content{			height: 50px;			line-height: 50px;			font-size: 14px;						text-align: center;			padding-left: 5px;		} .title-contents {				height: 35px;		line-height: 35px;		font-size: 12px;				text-align: left;		padding-left: 5px;	}		.el-col-3s{		width: 33.33%;	}		.el-col-4s{		width: 33.33%;	}		.el-col-8s{		width: 60%;	}										    </style>	</head>	<body>'
				)
				var s01 = ('<script src="https://unpkg.com/vue/dist/vue.js">')
				var s02 = ('<script src="https://unpkg.com/element-ui/lib/index.js">')
				var ss = "</" + "script>"
				var body01 = document.getElementById('details01').innerHTML;
				var body02 = document.getElementById('details02').innerHTML;
				var vuestring = '<script type="text/javascript">var doit = new Vue({ el: ' + "'#app'" +
					',data: {},methods: {},computed: {},watch: {}})'

				var over = '</body></html>'

				var sendLog01 = head + s01 + ss + s02 + ss + body01 + vuestring + ss + over
				var sendLog02 = head + s01 + ss + s02 + ss + body02 + vuestring + ss + over


				this.$api.post('/sendInlay/util/printPDF', {
					"in": sendLog01,
					"reference": this.formLabelAlign.factoryOrderDto.reference
					// "outPath": "C:/Users/vividamazilla/Desktop/index.pdf"
				}, r => {

					var eleLink = document.createElement('a');
					eleLink.download = 'pic01';
					eleLink.style.display = 'none';
					// 字符内容转变成blob地址
					// var blob = new Blob([content]);
					eleLink.href =this.$api.root+'/sendInlay/util/fetchPDF/' + r.reference
					// eleLink.href = URL.createObjectURL(blob);
					// 触发点击
					document.body.appendChild(eleLink);
					eleLink.click();
					// 然后移除
					document.body.removeChild(eleLink);




					// 下載第二張

					this.$api.post('/sendInlay/util/printPDF', {
						"in": sendLog02,
						"reference": this.formLabelAlign.factoryDto.reference
						// "outPath": "C:/Users/vividamazilla/Desktop/index.pdf"
					}, r => {

						var eleLink = document.createElement('a');
						eleLink.download = 'pic02';
						eleLink.style.display = 'none';
						// 字符内容转变成blob地址
						// var blob = new Blob([content]);
						eleLink.href =this.$api.root+'/sendInlay/util/fetchPDF/' + r.reference
						// eleLink.href = URL.createObjectURL(blob);
						// 触发点击
						document.body.appendChild(eleLink);
						eleLink.click();
						// 然后移除
						document.body.removeChild(eleLink);

						this.loading=false

					});





				});










				// //console.log(body)


				// this.htmlTitle='test'
				// this.getPdf()
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

	@import '../../assets/styles/variable';
	/* body {

		white-space: nowrap;
		font-family: Hiragino Sans GB W3;
		margin: 0;
		padding: 0;

	} */

	.yi2,
	.yi4 {
		float: left;
		width: 14%;
		height: 30px;
		border-right: 1px solid #000000;
		text-align: center;
		font-size: 12px;
	}

	.inputs {}

	.el-input__inner {
		height: 28px;
	}

	.biao2 {
		float: left;
		height: 30px;
		width: 16.5%;
		text-align: center;
		border-right: 1px solid #000000;
		line-height: 30px;
	}

	.biao3 {
		float: left;
		height: 50px;
		width: 16.666%;
		text-align: center;
		border-right: 1px solid #000000;
	}

	.zong {
		line-height: 25px;
	}


	.mat20 {
		margin-top: 20px
	}

	.underline {
		text-decoration: underline
	}

	.bgw {
		background: white
	}

	.fl {
		float: left
	}

	.fr {
		float: right
	}

	.ft8 {
		font-size: 8px
	}

	.ft10 {
		font-size: 10px
	}

	.ft12 {
		font-size: 12px
	}

	.ft14 {
		font-size: 14px
	}

	.ft20 {
		font-size: 20px
	}

	.ft30 {
		font-size: 30px
	}

	.bold {
		font-weight: bold
	}

	.lh75 {
		line-height: 75px;
	}

	.lh25 {
		line-height: 25px
	}

	.h25 {
		height: 25px
	}

	.h20 {
		height: 20px
	}

	.h60 {
		height: 60px
	}

	.h90 {
		height: 90px
	}

	.w75 {
		width: 75px
	}

	.w95 {
		width: 95px
	}

	.w190 {
		width: 190px
	}

	.textr {
		text-align: right
	}

	.textl {
		text-align: left
	}

	.padl5 {
		padding-left: 5px
	}

	.padt30 {
		padding-top: 30px
	}

	.padt20 {
		padding-top: 20px
	}

	.padb30 {
		padding-bottom: 30px
	}

	.padr5 {
		padding-right: 5px
	}

	.noborder_r {
		border-radius: 0
	}

	.bordert {
		border-top: 1px solid black
	}

	.borderb {
		border-bottom: 1px solid black
	}

	.borderl {
		border-left: 1px solid black;
	}

	.borderr {
		border-right: 1px solid black;
	}

	.btu_bg {
		background: rgb(253, 99, 99)
	}

	.form_bg {
		background: rgb(233, 238, 244)
	}

	.testC {
		text-align: center
	}

	.title-content {
		/* border: 1px solid black; */
		height: 35px;
		line-height: 35px;
		font-size: 12px;

		text-align: left;
		padding-left: 5px;
	}

	.table-content {
		height: 25px;
		line-height: 25px;
		font-size: 12px;

		text-align: center;
		padding-left: 5px;
	}

	.all-content {
		height: 50px;
		line-height: 50px;
		font-size: 12px;

		text-align: left;
		padding-left: 5px;
	}






	.title-contents {

		height: 35px;
		line-height: 35px;
		font-size: 12px;

		text-align: left;
		padding-left: 5px;
	}

	.el-col-3s{
		width: 30%;
	}

	.el-col-4s{
		width: 30%;
	}

	.el-col-8s{
		width: 60%;
	}


</style>

<template>
	<div class="HairWithSingle">
		<div style="height: 30px;width: 60%;margin: 0 auto;">
			<div style="float: left;font-size: 16px;width: 35%;text-align: center;">PLV : 發鑲單</div>
			<div style="float: left;font-size: 16px;width: 65%;text-align: center;">
				<span>sales no : {{iten.bianhao}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
				<span>Big Day : {{iten.zhongyao}}</span>
			</div>
		</div>
		<div class="pdf" style="border: 2px solid #000000;height: 740px;width: 60%;margin: 0 auto;">
			<div class="yi1" style="border-bottom: 2px solid #000000;height: 30px;">
				<div class="yi2">工廠:</div>
				<div class="yi3" style="float: left;width: 30%;">
					<!-- <el-input placeholder="" class='inputs' style="border-right: 1px solid #000000;"></el-input> -->
					<el-input v-model="input1" class='inputs' style="border-right: 1px solid #000000;" placeholder=""></el-input>
				</div>
				
				<div class="yi4">發單日期:</div>
				<div class="yi5" style="float: left;width: 30%;">
					<el-input v-model="input2" placeholder="" class='inputs' style="height: 27px;"></el-input>
				</div>
			</div>
			
			<div class="yi1" style="border-bottom: 2px solid #000000;height: 30px;">
				<div class="yi2">編號:</div>
				<div class="yi3" style="float: left;width: 30%;">
					<el-input v-model="input3" placeholder="" class='inputs' style="border-right: 1px solid #000000;"></el-input>
				</div>
				<div class="yi4">金:</div>
				<div class="yi5" style="float: left;width: 30%;">
					<el-input v-model="input4" placeholder="" class='inputs' style="height: 27px;"></el-input>
				</div>
			</div>
			
			<div class="yi1" style="border-bottom: 2px solid #000000;height: 30px;">
				<div class="yi2">成品:</div>
				<div class="yi3" style="float: left;width: 30%;">
					<el-input v-model="input5" placeholder="" class='inputs' style="border-right: 1px solid #000000;"></el-input>
				</div>
				<div class="yi4">數量:</div>
				<div class="yi5" style="float: left;width: 30%;">
					<el-input v-model="input6" placeholder="" class='inputs' style="height: 27px;"></el-input>
				</div>
			</div>
			
			<div class="yi1" style="border-bottom: 2px solid #000000;height: 30px;">
				<div class="yi2">類別:</div>
				<div class="yi3" style="float: left;width: 30%;">
					<el-input v-model="input7" placeholder="" class='inputs' style="border-right: 1px solid #000000;"></el-input>
				</div>
				<div class="yi4">尺寸:</div>
				<div class="yi5" style="float: left;width: 30%;">
					<el-input v-model="input8" placeholder="" class='inputs' style="height: 27px;"></el-input>
				</div>
			</div>
			
			<div class="yi1" style="border-bottom: 2px solid #000000;height: 30px;">
				<div class="yi2">設計:</div>
				<div class="yi3" style="float: left;width: 30%;">
					<el-input v-model="input9" placeholder="" class='inputs' style="border-right: 1px solid #000000;"></el-input>
				</div>
				<div class="yi4">起貨時間:</div>
				<div class="yi5" style="float: left;width: 30%;">
					<el-input v-model="input10" placeholder="" class='inputs' style="height: 27px;"></el-input>
				</div>
			</div>
			
			<div class="ziliao" style="height: 20px;width: 90%;margin-left: 10px;">石資料:</div>
			
			<div class="biao" style="border-left: 1px solid #000000;border-top: 1px solid #000000;height: 321px;margin:5px;">
				
				<div class="biao1" style="border-bottom: 1px solid #000000;height: 30px;">
					<div class="biao2">石</div>
					<div class="biao2">尺寸</div>
					<div class="biao2">交厰數量</div>
					<div class="biao2">交厰重量</div>
					<div class="biao2">回石重</div>
					<div class="biao2">實用石數/卡重</div>
				</div>
				<div class="biao1" style="border-bottom: 1px solid #000000;height: 30px;">
					<div class="biao2">
						<el-input v-model="input11" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input12" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input13" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input14" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input15" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input16" placeholder="" class='inputs'></el-input>
					</div>
				</div>
				<div class="biao1" style="border-bottom: 1px solid #000000;height: 30px;">
					<div class="biao2">
						<el-input  v-model="input17" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input18" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input19" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input20" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input21" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input22" placeholder="" class='inputs'></el-input>
					</div>
				</div>
				<div class="biao1" style="border-bottom: 1px solid #000000;height: 30px;">
					<div class="biao2">
						<el-input v-model="input23" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input24" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input25" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input26" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input27" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input28" placeholder="" class='inputs'></el-input>
					</div>
				</div>
				<div class="biao1" style="border-bottom: 1px solid #000000;height: 30px;">
					<div class="biao2">
						<el-input v-model="input29" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input30" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input31" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input32" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input33" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input34" placeholder="" class='inputs'></el-input>
					</div>
				</div>
				<div class="biao1" style="border-bottom: 1px solid #000000;height: 30px;">
					<div class="biao2">
						<el-input v-model="input35" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input36" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input361" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input37" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input38" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input39" placeholder="" class='inputs'></el-input>
					</div>
				</div>
				<div class="biao1" style="border-bottom: 1px solid #000000;height: 30px;">
					<div class="biao2">
						<el-input v-model="input40" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input41" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input42" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input43" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input44" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input45" placeholder="" class='inputs'></el-input>
					</div>
				</div>
				<div class="biao1" style="border-bottom: 1px solid #000000;height: 30px;">
					<div class="biao2">
						<el-input v-model="input46" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input47" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input48" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input49" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input50" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input51" placeholder="" class='inputs'></el-input>
					</div>
				</div>
				<!-- <div class="biao1" style="border-bottom: 1px solid #000000;height: 30px;">
					<div class="biao2">
						<el-input v-model="input52" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input53" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input54" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input55" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input56" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input57" placeholder="" class='inputs'></el-input>
					</div>
				</div>
				<div class="biao1" style="border-bottom: 1px solid #000000;height: 30px;">
					<div class="biao2">
						<el-input v-model="input58" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input59" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input60" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input61" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input62" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input63" placeholder="" class='inputs'></el-input>
					</div>
				</div>
				<div class="biao1" style="border-bottom: 1px solid #000000;height: 30px;">
					<div class="biao2">
						<el-input v-model="input64" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input65" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input66" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input67" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input68" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input69" placeholder="" class='inputs'></el-input>
					</div>
				</div> -->
				<div class="biao1" style="border-bottom: 1px solid #000000;height: 30px;">
					<div class="biao2">
						<el-input v-model="input70" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<div class="zong" style="float: left;text-align: center;">縂:</div>
						<el-input v-model="input71" placeholder="" class='inputs' style='width: 80%;'></el-input>
					</div>
					<div class="biao2">
						<div class="zong" style="float: left;text-align: center;">粒:</div>
						<el-input v-model="input72" placeholder="" class='inputs' style='width: 80%;'></el-input>
					</div>
					<div class="biao2">
						<div class="zong" style="float: left;text-align: center;">cts:</div>
						<el-input v-model="input73" placeholder="" class='inputs' style='width: 80%;'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input74"placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao2">
						<el-input v-model="input75" placeholder="" class='inputs'></el-input>
					</div>
				</div>
				
				<!-- hhhhh -->
				<!-- <div class="biao1" style="border-bottom: 1px solid #000000;height: 20px;">
					<div class="zong" style="height: 20px;width: 16.666%;float: left;border-right: 1px solid #000000;">石資料:</div>
					<div class="zong" style="height: 20px;width: 16.666%;float: left;border-right: 1px solid #000000;">石資料:</div>
					<div class="zong" style="height: 20px;width: 16.666%;float: left;border-right: 1px solid #000000;">石資料:</div>
					<div class="zong" style="height: 20px;width: 16.666%;float: left;border-right: 1px solid #000000;">石資料:</div>
					<div class="zong" style="height: 20px;width: 16.666%;float: left;border-right: 1px solid #000000;">石資料:</div>
					<div class="zong" style="height: 20px;width: 16.666%;float: left;border-right: 1px solid #000000;">石資料:</div>
				</div> -->
				
				<div class="biao1" style="border-bottom: 1px solid #000000;height: 50px;">
					<div class="biao3">
						<div class="zong" style="height: 20px;float: left;text-align: center;">金重:</div>
						<el-input v-model="input76" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao3">
						<div class="zong" style="height: 20px;float: left;text-align: center;">縂金費:</div>
						<el-input v-model="input77" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao3">
						<div class="zong" style="height: 20px;float: left;text-align: center;">人工 RMB:</div>
						<el-input v-model="input78" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao3">
						<div class="zong" style="height: 20px;float: left;text-align: center;">人工 HKD:</div>
						<el-input v-model="input79" placeholder="" class='inputs'></el-input>
					</div>
					<div class="biao3">
						<input v-model="input80" placeholder="" class='inputs' style='height: 49px;width: 100%;'></input>
					</div>
					<div class="biao3">
						<input v-model="input81" placeholder="" class='inputs' style='height: 49px;width: 100%;'></input>
					</div>
				</div>
				
				
				<div class="biao1" style="height: 30px;">
					<div class="zong" style="height: 20px;float: left;width: 33.333%;">足金價 HKD:</div>
					<div class="zong" style="height: 20px;float: left;width: 33.333%;">18K 金價(每錢) HKD:</div>
					<div class="zong" style="height: 20px;float: left;width: 33.333%;">18K 金價(每克) HKD:</div>
				</div>
				
				<div class="biao1" style="height: 30px;">
					<div class="zong" style="height: 20px;float: left;text-align: center;width: 15%;">日期:</div>
					<el-input v-model="input52" placeholder="" class='inputs' style='width: 85%;'></el-input>
				</div>
				
				<div class="biao1" style="height: 30px;">
					<div class="zong" style="height: 20px;float: left;text-align: center;width: 15%;">内容:</div>
					<el-input v-model="input53" placeholder="" class='inputs' style='width: 85%;'></el-input>
				</div>
				
				
				<div class="biao1" style="height: 30px;">
					<div class="zong" style="height: 20px;float: left;text-align: center;width: 15%;">字印(一般):</div>
					<el-input v-model="input54" placeholder="" class='inputs' style='width: 85%;'></el-input>
				</div>
				<div class="biao1" style="height: 30px;">
					<div class="zong" style="height: 20px;float: left;text-align: center;width:15%;">字印(客戶):</div>
					<el-input v-model="input55" placeholder="" class='inputs' style='width: 85%;'></el-input>
				</div>
				<div class="biao1" style="height: 30px;">
					<div class="zong" style="height: 20px;float: left;text-align: center;width: 15%;">備注:</div>
					<el-input v-model="input56" placeholder="" class='inputs' style='width: 85%;'></el-input>
				</div>
				<div class="biao1" style="height: 30px;">
					<div class="zong" style="height: 20px;float: left;text-align: center;width: 15%;">客:</div>
					<el-input v-model="input57" placeholder="" class='inputs' style='width: 85%;'></el-input>
				</div>
				<div class="biao1" style="height: 30px;">
					<div class="zong" style="height: 20px;float: left;text-align: center;width: 15%;">客落單日期:</div>
					<el-input v-model="input58" placeholder="" class='inputs' style='width: 85%;'></el-input>
				</div>
			</div>
		</div>
	</div>

</template>



<script>
	export default {
		name: "CustomerList",
		data() {
			return {
				iten:{
					bianhao:'1315',
					zhongyao:'2019-05-20',
				},
				
				input1:'',
				input2:'',
				input3:'',
				input4:'',
				input5:'',
				input6:'',
				input7:'',
				input8:'',
				input9:'',
				input10:'',
				input11:'',
				input12:'',
				input13:'',
				input14:'',
				input15:'',
				input16:'',
				input17:'',
				input18:'',
				input19:'',
				input20:'',
				input21:'',
				input22:'',
				input23:'',
				input24:'',
				input25:'',
				input26:'',
				input27:'',
				input28:'',
				input29:'',
				input30:'',
				input31:'',
				input32:'',
				input33:'',
				input34:'',
				input35:'',
				input36:'',
				input37:'',
				input38:'',
				input39:'',
				input40:'',
				input41:'',
				input42:'',
				input43:'',
				input44:'',
				input45:'',
				input46:'',
				input47:'',
				input48:'',
				input49:'',
				input50:'',
				input51:'',
				input52:'',
				input53:'',
				input54:'',
				input55:'',
				input56:'',
				input57:'',
				input58:'',
				input59:'',
				input60:'',
				input61:'',
				input62:'',
				input63:'',
				input64:'',
				input65:'',
				input66:'',
				input67:'',
				input68:'',
				input69:'',
				input70:'',
				input71:'',
				input72:'',
				input73:'',
				input74:'',
				input75:'',
				input361:'',
				
				input76:'',
				input77:'',
				input78:'',
				input79:'',
				input80:'',
				input81:'',
				
			}


		},

		created: function() {
		},

		methods: {



		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.HairWithSingle {
		.yi2,.yi4{
			float: left;
			width: 20%;
			height: 30px;
			border-right: 1px solid #000000;
			text-align: center;
		}
		
		.inputs{
			
		}
		.el-input__inner{
			height: 28px;
		}
		
		.biao2{
			float: left;
			height: 30px;
			width: 16.666%;
			text-align: center;
			border-right: 1px solid #000000;
			line-height: 30px;
		}
		
		.biao3{
			float: left;
			height: 50px;
			width: 16.666%;
			text-align: center;
			border-right: 1px solid #000000;
		}
		.zong{
			line-height: 25px;
		}
	}
</style>

<template>
	
	<div class="reservemanagement">
		
		



		<div style="padding: 0 0;min-width: 1400px;" >
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple-dark" style="height: 40px;">

						<div  style="width: 300px;margin-left: 0;float: left;" >
							
							<el-date-picker v-model="dateTwo" type="daterange" start-placeholder="start date" end-placeholder="end date" placeholder="select date"
							 style='width: 300px;float: right;border-radius: 10px;'>
							</el-date-picker>
							
						</div>
						<div>
							<el-form :inline="true" :model="formInline" class="demo-form-inline">
								<el-form-item style='float: left;height: 40px;' class='search' >
									<el-input v-model="formInline.search" placeholder="Keyword" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>
								</el-form-item>
								<el-form-item style='float:left;height: 35px;' >
									<el-button type="primary" @click="onSubmit01" style='height:35px;width: 112px;border:0;background: rgb(5,120,209);margin-top: 2.5px;'>Search</el-button>
								</el-form-item>
								<el-form-item style='float:right;'>
									<el-button type="primary" @click="tocreate" style='height:35px;width: 112px;border:0;background: rgb(5,120,209);margin-top: 2.5px;'>New</el-button>
								</el-form-item>

								<el-form-item style='float:right;' class='search'>
									<el-select style='height: 48px;width: 130px;' v-model="branch" @change="search()">
										<el-option v-for='(item, index) in branch_list' :label="item.name" :value="item.name"></el-option>
									</el-select>
								</el-form-item>

								<!-- <el-form-item style='float:right;' class='search'>
									<el-select style='height: 48px;width: 130px;' v-model="formInline.num" @change='type_change' >
										<el-option v-for='(item, index) in warehouse' :label="item.name" :value="item.name" ></el-option>
									</el-select>
								</el-form-item> -->

							</el-form>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		
		<!-- <div style="margin-bottom: 10px;"> -->
			<!-- <el-row> -->
					<!-- <el-col :span="24"> -->
						<!-- <div class="grid-content bg-purple-dark" style="background:white;height: 50px;"> -->
							<!-- <div class="second_menu">
								<span class="point" @click="topage('all')">批量件</span>
							</div> -->
		<!-- 
							<div class="second_menu"  :class="{selector:showType==0}">
								<span class="point" @click="changeType(0)">庫存</span>
							</div> -->
		
							<!-- <div class="second_menu selector">
								<span class="point" @click="topage('special')">特殊件</span>
							</div>
		 -->
							<!-- <div class="second_menu" :class="{selector:showType==1}">
								<span class="point" @click="changeType(1)">批次</span>
							</div> -->
		
							<!-- <div class="second_menu"> -->
							<!-- <span class="point" @click="topage('recycling')">回收處理</span> -->
							<!-- <span class="point">回收處理</span> -->
							<!-- </div> -->
		
						<!-- </div> -->
					<!-- </el-col> -->
				<!-- </el-row> -->
		<!-- </div> -->



		<!-- 庫存列表 -->
		<div style="font-size: 18px;font-weight: bold;padding-left: 20px;">庫存</div>
		<div style="border-radius: 10px;background: white;width: 100%;" v-show="showType==0">
			<div>
				<!-- <div @click="reserveAdd()" style="cursor: pointer;position: relative;top: 0px;z-index: 1000;height: 0px;line-height: 20px;top: 15px;float: right;margin-right: 65px;color: #409EFF;">添加</div> -->
				<!-- highlight-current-row -->
				<el-table :data="tableData1" height="350" ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;'>
					<el-table-column prop="identifier" label="Commodity" row-style='background:red' width="200px">
					</el-table-column>
					<!-- <el-table-column prop="weight" label="Weight">
						<template slot-scope="scope">
							<span type="text" size="small" style="">{{scope.row.weight}}</span>
							<span type="text" size="small" style="">{{scope.row.weightUnit}}</span>
						</template>
					</el-table-column> -->
					<!-- <el-table-column prop="storageQuqntity" label="Purchase"> 
					</el-table-column> -->
					<el-table-column prop="availableNum" label="Available" width="200px">  
					</el-table-column>
					
					<el-table-column >
					</el-table-column>
					
					<!-- <el-table-column prop="totalNumbe" label="Total">
					</el-table-column> -->
					
					
					<!-- <el-table-column prop="in_num" label="入貨量">
					</el-table-column>
					<el-table-column prop="storage" label="儲存量">
						<template slot-scope="scope">
							<span type="text" size="small" style="">{{scope.row.weight}}</span>
							<span type="text" size="small" style="">{{scope.row.weightTo}}</span>
						</template>
					</el-table-column> -->
					<!-- <el-table-column prop="cost" label="Cost"> -->
						<!-- <template slot-scope="scope">
							<span type="text" size="small" style="">{{scope.row.dimensions}}</span>
							<span type="text" size="small" style="">{{scope.row.dimensionsTo}}</span>
						</template> -->
					<!-- </el-table-column> -->
					<!-- <el-table-column prop="invoiceNo" label="invoiceNo"> -->
						<!-- <template slot-scope="scope">
							<span type="text" size="small" style="">{{scope.row.dimensions}}</span>
							<span type="text" size="small" style="">{{scope.row.dimensionsTo}}</span>
						</template> -->
					<!-- </el-table-column> -->
					<!-- <el-table-column prop="certificateNo" label="certificateNo"> -->
						<!-- <template slot-scope="scope">
							<span type="text" size="small" style="">{{scope.row.dimensions}}</span>
							<span type="text" size="small" style="">{{scope.row.dimensionsTo}}</span>
						</template> -->
					<!-- </el-table-column> -->
					<!-- <el-table-column prop="invoiceNo" label="Time">
						
						<template slot-scope="scope">
							<span type="text" size="small" style="">{{new Date(scope.row.invoiceDate).format("yyyy-MM-dd")}}</span>
						</template>
						
					</el-table-column> -->
					
					<!-- <div class="action">
						<el-table-column fixed="right" label="Action" style='background: red;' width="200px">
							<template slot-scope="scope">
								<div style="white-space: nowrap;">
									<el-button @click="handleClick(scope.row.id)" type="danger" size="small">Detail</el-button>
									<el-button @click="transfer(scope.row.reference)" type="danger" size="small">Transfer</el-button>
								</div>
							</template>
						</el-table-column>
						
					</div> -->
					
				</el-table>
			</div>
			<!-- <div class="block" style="float: right;margin-top: 10px;">
				<el-pagination layout="prev, pager, next" :page-size='10' :total="totalElements" @current-change='pages01'
				 :current-page="page01">
				</el-pagination>
			</div> -->
		</div>
		
		
		
		<!-- 批次 -->
		<div style="margin-top: 20px;font-size: 18px;font-weight: bold;padding-left: 20px;">批次</div>
		<div style="border-radius: 10px;background: white;height: 385px;width: 100%;" v-show="showType==0">
			<div>
				<!-- <div @click="reserveAdd()" style="cursor: pointer;position: relative;top: 0px;z-index: 1000;height: 0px;line-height: 20px;top: 15px;float: right;margin-right: 65px;color: #409EFF;">添加</div> -->
				<!-- highlight-current-row -->
				<el-table :data="tableData02" height="350" ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;'>
					<el-table-column prop="identifier.jewelryType" label="Commodity" row-style='background:red'>
					</el-table-column>
					<el-table-column prop="weight" label="Weight">
						<template slot-scope="scope">
							<span type="text" size="small" style="">{{scope.row.weight}}</span>
							<span type="text" size="small" style="">{{scope.row.weightUnit}}</span>
						</template>
						<!-- <template slot-scope="scope">
							<span type="text" size="small" style="">{{new Date(scope.row.date).format("yyyy-MM-dd")}}</span>
						</template> -->
					</el-table-column>
					<el-table-column prop="storageQuqntity" label="Purchase">  <!-- 入庫 -->
					</el-table-column>
					<!-- <el-table-column prop="availableStock" label="Available">  
					</el-table-column> -->
					<!-- <el-table-column prop="totalNumbe" label="Total">
					</el-table-column> -->
					
					
					<!-- <el-table-column prop="in_num" label="入貨量">
					</el-table-column>
					<el-table-column prop="storage" label="儲存量">
						<template slot-scope="scope">
							<span type="text" size="small" style="">{{scope.row.weight}}</span>
							<span type="text" size="small" style="">{{scope.row.weightTo}}</span>
						</template>
					</el-table-column> -->
					<el-table-column prop="cost" label="Cost">
						<!-- <template slot-scope="scope">
							<span type="text" size="small" style="">{{scope.row.dimensions}}</span>
							<span type="text" size="small" style="">{{scope.row.dimensionsTo}}</span>
						</template> -->
					</el-table-column>
					<el-table-column prop="invoiceNo" label="invoiceNo">
						<!-- <template slot-scope="scope">
							<span type="text" size="small" style="">{{scope.row.dimensions}}</span>
							<span type="text" size="small" style="">{{scope.row.dimensionsTo}}</span>
						</template> -->
					</el-table-column>
					<el-table-column prop="certificateNo" label="certificateNo">
						<!-- <template slot-scope="scope">
							<span type="text" size="small" style="">{{scope.row.dimensions}}</span>
							<span type="text" size="small" style="">{{scope.row.dimensionsTo}}</span>
						</template> -->
					</el-table-column>
					<el-table-column prop="invoiceNo" label="Time">
						
						<template slot-scope="scope">
							<span type="text" size="small" style="">{{new Date(scope.row.invoiceDate).format("yyyy-MM-dd")}}</span>
						</template>
						
						<!-- <template slot-scope="scope"> invoiceDate
							<span type="text" size="small" style="">{{scope.row.cut}}</span>
							<span type="text" size="small" style="">{{scope.row.cutTo}}</span>
						</template> -->
						
					</el-table-column>
					
					<div class="action">
						<el-table-column fixed="right" label="Action" style='background: red;' width="200px">
							<template slot-scope="scope">
								<div style="white-space: nowrap;">
									<el-button @click="handleClick(scope.row.id)" type="danger" size="small">Detail</el-button>
									<el-button @click="transfer(scope.row.reference)" type="danger" size="small">Transfer</el-button>
								</div>
							</template>
						</el-table-column>
						
					</div>
					
				</el-table>
			</div>
			<div class="block" style="float: right;margin-top: 5px;">
				<el-pagination layout="prev, pager, next" :page-size='5' :total="totalElements" @current-change='pages01'
				 :current-page="page01">
				</el-pagination>
			</div>
		</div>
		
		
		



		<!-- GIA -->
		<div style="border-top: 2px solid rgb(224,224,224);background: white;height: 385px;width: 100%;" v-if="ifGRS==1">
			<div>
				<!-- <div @click="reserveAdd()" style="cursor: pointer;position: relative;top: 0px;z-index: 1000;height: 0px;line-height: 20px;top: 15px;float: right;margin-right: 65px;color: #409EFF;">添加</div> -->
				<el-table :data="tableData1" height="700" style="width: 100%;text-align: center;margin: 0;padding: 0;"
				 highlight-current-row ref="singleTable01">
					<el-table-column prop="no_" label="編號">
					</el-table-column>
					<el-table-column prop="date" label="名稱">
						<template slot-scope="scope">
							<!-- <span  type="text" size="small" style="" >{{new Date(scope.row.date).format("yyyy-MM-dd hh:mm")}}</span> -->
							<span type="text" size="small" style="">{{new Date(scope.row.date).format("yyyy-MM-dd")}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="object" label="大小">
					</el-table-column>
					<el-table-column prop="identification" label="形狀">
					</el-table-column>

					<el-table-column prop="dimensions" label="成本">
						<template slot-scope="scope">
							<span type="text" size="small" style="">{{scope.row.dimensions}}</span>
							<span type="text" size="small" style="">{{scope.row.dimensionsTo}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="time" label="時間">
						<template slot-scope="scope">
							<span type="text" size="small" style="">{{scope.row.cut}}</span>
							<span type="text" size="small" style="">{{scope.row.cutTo}}</span>
						</template>
					</el-table-column>

					<el-table-column fixed="right" width="180" label="操作">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
							<!-- <el-button @click="transfer(scope.row.id)" type="text" size="small">轉移</el-button> -->
						</template>
					</el-table-column>

				</el-table>
			</div>
			<div class="block" style="float: right;margin-top: 10px;">
				<el-pagination layout="prev, pager, next" :page-size='6' :total="totalElements" @current-change='pages01'
				 :current-page="page01">
				</el-pagination>
			</div>
		</div>



		<!-- GRA -->
		<div style="border-top: 2px solid rgb(224,224,224);background: white;height: 385px;width: 100%;" v-if="ifGRS==2">
			<div>
				<!-- <div @click="reserveAdd()" style="cursor: pointer;position: relative;top: 0px;z-index: 1000;height: 0px;line-height: 20px;top: 15px;float: right;margin-right: 65px;color: #409EFF;">添加</div> -->
				<el-table :data="tableData1" height="700" style="width: 100%;text-align: center;margin: 0;padding: 0;"
				 highlight-current-row ref="singleTable01">
					<el-table-column prop="no_" label="NO">
					</el-table-column>
					<el-table-column prop="date" label="名稱">
						<template slot-scope="scope">
							<!-- <span  type="text" size="small" style="" >{{new Date(scope.row.date).format("yyyy-MM-dd hh:mm")}}</span> -->
							<span type="text" size="small" style="">{{new Date(scope.row.date).format("yyyy-MM-dd")}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="object" label="大小">
					</el-table-column>
					<el-table-column prop="identification" label="形狀">
					</el-table-column>

					<el-table-column prop="dimensions" label="成本">
						<template slot-scope="scope">
							<span type="text" size="small" style="">{{scope.row.dimensions}}</span>
							<span type="text" size="small" style="">{{scope.row.dimensionsTo}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="time" label="時間">
						<template slot-scope="scope">
							<span type="text" size="small" style="">{{scope.row.cut}}</span>
							<span type="text" size="small" style="">{{scope.row.cutTo}}</span>
						</template>
					</el-table-column>

					<el-table-column fixed="right" width="180" label="操作">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
							<!-- <el-button @click="transfer(scope.row.id)" type="text" size="small">轉移</el-button> -->
						</template>
					</el-table-column>

				</el-table>
			</div>
			<div class="block" style="float: left;margin-top: 10px;">
				<span></span>
			</div>
			<div class="block" style="float: right;margin-top: 10px;">
				<el-pagination layout="prev, pager, next" :page-size='6' :total="totalElements" @current-change='pages01'
				 :current-page="page01">
				</el-pagination>
			</div>
		</div>




		

		<!-- 庫存查看 -->
		<div v-if='reserve_list&&!reserve_detail' class="reserve_list" style="float: left;">
			<div style="text-align: left;font-size: 14px;height: 30px;line-height: 30px;">
				<span style="margin-left: 20px;">特殊件</span>
			</div>

			<div style="height: 40px;">
				<el-form :inline="true" :model="reserveList_search" class="demo-form-inline">


					<el-form-item style='float:right;margin-right: 40px;'>
						<el-button type="primary" @click="onSubmit" style='height:35px;width: 112px;border:0;background: rgb(245,93,84);margin-top: 2.5px;'>查询</el-button>
					</el-form-item>
					<el-form-item style='float: right;height: 30px;' class='search'>
						<el-input v-model="reserveList_search.search" placeholder="產品等" style='margin-left: 150px;width: 256px;height: 35px;'></el-input>
					</el-form-item>

				</el-form>
			</div>

			<div style="height: 700px;">
				<el-table :data="tableData3" style="width: 100%;text-align: center;margin: 0;padding: 0;" height="700">
					<el-table-column prop="No" label="No." width="120">
					</el-table-column>
					<el-table-column prop="Date" label="Date" width="150">
					</el-table-column>
					<el-table-column prop="Object" label="Object" width="120">
					</el-table-column>
					<el-table-column prop="Identification" label="Identification" width="120">
					</el-table-column>
					<el-table-column prop="Weight" label="Weight" width="120">
					</el-table-column>
					<el-table-column prop="Dimensions" label="Dimensions" width="120">
					</el-table-column>
					<el-table-column prop="Cut" label="Cut" width="120">
					</el-table-column>
					<el-table-column prop="Shape" label="Shape" width="120">
					</el-table-column>
					<el-table-column prop="Color" label="Color" width="120">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="100" style='color: #0000FF;'>
						<template slot-scope="scope">
							<el-button @click="handleClick()" type="text" size="small">查看</el-button>
						</template>
					</el-table-column>

				</el-table>
			</div>

			<div style="height: 60px;">
				<el-button type="primary" @click="return_reserveList()" style='float: right;margin-right: 20px;height:35px;width: 112px;border:0;background: rgb(245,93,84);margin-top: 2.5px;line-height: 15px;'>確定</el-button>

			</div>

		</div>






		<div v-if='batch' class="reserve_list" style="float: left;">
			<div style="text-align: left;font-size: 14px;height: 30px;line-height: 30px;">
				<span style="margin-left: 20px;">批次信息</span>
			</div>

			<div style="height: 350px;margin-top: 20px;">
				<div style="width: 100%;min-width: 1000px;">
					<el-form :inline="true" :model="batchDetail" class="demo-form-inline" label-width="100px">

						<el-form-item label="名稱" class='batch_left'>
							<el-input v-model="batchDetail.name" placeholder="审批人" :disabled='true'></el-input>
						</el-form-item>

						<el-form-item label="轉出" class='batch_left'>
							<el-input v-model="batchDetail.outName" placeholder="审批人" :disabled='true'></el-input>
						</el-form-item>

						<el-form-item label="轉入" class='batch_left'>
							<el-input v-model="batchDetail.shiftToName" placeholder="审批人" style='width: 80px;float: left;'></el-input>
							<el-form-item style='width: 120px;margin-left: 15px;float: left;'>
								<el-select v-model="batchDetail.shiftToId" placeholder="寶石">
									<el-option label="分行一" value="1"></el-option>
									<el-option label="分行二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-form-item>


						<el-form-item label="數量" class='batch_left'>
							<el-input v-model="batchDetail.numbe" placeholder="审批人"></el-input>
						</el-form-item>


						<el-form-item label="重量" class='batch_left'>
							<el-input v-model="batchDetail.weight" placeholder="审批人" style='width: 80px;'></el-input>
							<el-input v-model="batchDetail.weightUnit" placeholder="审批人" style='width: 80px;margin-left: 15px;'></el-input>
						</el-form-item>

						<el-form-item label="備注" style='float: left;margin-top: 20px;'>
							<el-input type="textarea" :rows="3" v-model="batchDetail.rests" placeholder="审批人" style='width: 600px;'></el-input>
						</el-form-item>


					</el-form>
				</div>
			</div>

			<div style="height: 60px;min-width: 1000px;">
				<el-button type="primary" @click="cancel()" style='float: right;margin-right: 20px;height:35px;width: 112px;border:0;background: rgb(245,93,84);margin-top: 2.5px;line-height: 15px;'>返回</el-button>
				<el-button type="primary" @click="uploadBatch()" style='float: right;margin-right: 20px;height:35px;width: 112px;border:0;background: rgb(245,93,84);margin-top: 2.5px;line-height: 15px;'>確定</el-button>
			</div>

		</div>








		<!-- 特殊件查看 -->
		<div v-if='reserve_detail' class="reserve_list">
			<div style="text-align: left;font-size: 14px;height: 30px;line-height: 30px;border-bottom: 1px solid #8C939D;">
				<div v-show="!detail">
					<span style="color: #008B8B;cursor: pointer;" v-if='ifGRS' @click="GRS()">GRS</span>
					<span style="color: #008B8B;cursor: pointer;" v-if='!ifGRS' @click="GRS()">GIA</span>
				</div>
				<div v-show="detail">
					<span style="color: #008B8B;cursor: pointer;" v-if='ifGRS'>GRS</span>
					<span style="color: #008B8B;cursor: pointer;" v-if='!ifGRS'>GIA</span>
				</div>
			</div>

			<el-form :inline="true" :model="reserveDetail" label-width="90px" class="demo-form-inline" v-if='ifGRS'>
				<div style="height:480px ;width: 600px;margin:  10px;float: left;">

					<el-form-item label="No." style='float: left;'>
						<el-input v-model="reserveDetail.no_" placeholder="审批人" :disabled="detail"></el-input>
					</el-form-item>
					<el-form-item label="Date">
						<!-- <el-input v-model="reserveDetail.Date" placeholder="审批人" :disabled="detail"></el-input> -->
						<el-date-picker :disabled="detail" v-model="reserveDetail.date" type="date" placeholder="选择日期" style='width: 150px;float: right;'>
						</el-date-picker>
					</el-form-item>
					<el-form-item label="Object" style='float: left;'>
						<el-input v-model="reserveDetail.object" placeholder="审批人" :disabled="detail"></el-input>
					</el-form-item>
					<el-form-item label="Identification">
						<el-input v-model="reserveDetail.identification" placeholder="审批人" :disabled="detail"></el-input>
					</el-form-item>

					<!-- <el-form-item label="view" style='float: left;'>
						<el-upload class="avatar-uploader" :action="root+'/Uploads/uploadFile'" :show-file-list="false" :on-success="handleAvatarSuccess"
						 :disabled="detail">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item> -->

					<el-form-item label="weight">
						<el-input v-model="reserveDetail.weight" placeholder="审批人" :disabled="detail" style='width: 80px;'></el-input>
						<el-input v-model="reserveDetail.weightTo" placeholder="审批人" :disabled="detail" style='width: 80px;margin-left: 15px;'></el-input>
					</el-form-item>
					<el-form-item label="Dimensions" style='float: left;'>
						<el-input v-model="reserveDetail.dimensions" placeholder="审批人" :disabled="detail" style='width: 80px;'></el-input>
						<el-input v-model="reserveDetail.dimensionsTo" placeholder="审批人" :disabled="detail" style='width: 80px;margin-left: 15px;'></el-input>
						<!-- <el-input v-model="reserveDetail.dimensions" placeholder="审批人" :disabled="detail"></el-input> -->
					</el-form-item>
					<el-form-item label="Cut">
						<el-input v-model="reserveDetail.cut" placeholder="审批人" :disabled="detail" style='width: 80px;'></el-input>
						<el-input v-model="reserveDetail.cutTo" placeholder="审批人" :disabled="detail" style='width: 80px;margin-left: 15px;'></el-input>
						<!-- <el-input v-model="reserveDetail.cut" placeholder="审批人" :disabled="detail"></el-input> -->
					</el-form-item>
					<el-form-item label="Shape" style='float: left;'>
						<el-input v-model="reserveDetail.shape" placeholder="审批人" :disabled="detail"></el-input>
					</el-form-item>
					<el-form-item label="Production Place" style='float: left;' label-width='180'>
						<el-input v-model="reserveDetail.productionPlace" placeholder="审批人" :disabled="detail"></el-input>
					</el-form-item>
					<el-form-item label="Color" style='float: left;'>
						<el-input v-model="reserveDetail.color" placeholder="审批人" :disabled="detail" style='width: 80px;'></el-input>
						<el-input v-model="reserveDetail.colorTo" placeholder="审批人" :disabled="detail" style='width: 80px;margin-left: 15px;'></el-input>
						<!-- <el-input v-model="reserveDetail.Color" placeholder="审批人" :disabled="detail"></el-input> -->
					</el-form-item>
				</div>

				<!-- 右 -->
				<div style="height:480px ;width: 600px;margin:  10px;float: left;text-align: left; ">

					<el-form-item>
						<p style="height: 30px;line-height: 30px;">Comment</p>
						<el-input v-model="reserveDetail.comment" placeholder="审批人" type="textarea" class='textInput' :disabled="detail"></el-input>
					</el-form-item>

					<el-form-item>
						<p style="height: 30px;line-height: 30px;">Origin</p>
						<el-input v-model="reserveDetail.origin" placeholder="审批人" type="textarea" class='textInput' :disabled="detail"></el-input>
					</el-form-item>

					<el-form-item>
						<p style="height: 30px;line-height: 30px;">Code Use See Help</p>
						<el-input v-model="reserveDetail.codeUseSeeHelp" placeholder="审批人" type="textarea" class='textInput' :disabled="detail"></el-input>
					</el-form-item>

					<el-form-item>
						<p style="height: 30px;line-height: 30px;">Rests</p>
						<el-input v-model="reserveDetail.rests" placeholder="审批人" type="textarea" class='textInput' :disabled="detail"></el-input>
					</el-form-item>

					<p style="color: #409EFF;cursor: pointer;" @click="showimg()">check</p>

				</div>

			</el-form>


			<el-form :inline="true" :model="reserveDetail_gia" label-width="90px" class="demo-form-inline" v-if='!ifGRS'>
				<div style="height:580px ;width: 600px;margin:  10px;float: left;">

					<el-form-item label="Date" style='float: left;' label-width="180px">
						<el-date-picker :disabled="detail" v-model="reserveDetail_gia.date" type="date" placeholder="选择日期" style='width: 150px;float: right;'>
						</el-date-picker>
						<!-- <el-input v-model="reserveDetail.No" placeholder="审批人" :disabled="detail"></el-input> -->
					</el-form-item>
					<el-form-item label="GIA Report Number" style='float: left;' label-width="180px">
						<el-input v-model="reserveDetail_gia.giaReportNumber" placeholder="审批人" :disabled="detail"></el-input>
					</el-form-item>
					<el-form-item label="Shape and Cutting Style" style='float: left;' label-width="180px">
						<el-input v-model="reserveDetail_gia.shapeAndCuttingStyle" placeholder="审批人" :disabled="detail"></el-input>
					</el-form-item>
					<el-form-item label="Measurements" style='float: left;' label-width="180px">
						<el-input v-model="reserveDetail_gia.measurements" placeholder="审批人" :disabled="detail"></el-input>
					</el-form-item>


					<el-form-item label="Carat Weight" style='float: left;' label-width="180px">
						<el-input v-model="reserveDetail_gia.caratWeight" placeholder="审批人" :disabled="detail"></el-input>
					</el-form-item>
					<el-form-item label="Color Grade" style='float: left;' label-width="180px">
						<el-input v-model="reserveDetail_gia.colorGrade" placeholder="审批人" :disabled="detail"></el-input>
					</el-form-item>
					<el-form-item label="Clarity Grade" style='float: left;' label-width="180px">
						<el-input v-model="reserveDetail_gia.clarityGrade" placeholder="审批人" :disabled="detail"></el-input>
					</el-form-item>
					<el-form-item label="Cut Grade" style='float: left;' label-width="180px">
						<el-input v-model="reserveDetail_gia.cutGrade" placeholder="审批人" :disabled="detail"></el-input>
					</el-form-item>
					<el-form-item label="Polish" style='float: left;' label-width="180px">
						<el-input v-model="reserveDetail_gia.polish" placeholder="审批人" :disabled="detail"></el-input>
					</el-form-item>
					<el-form-item label="Symmetry" style='float: left;' label-width="180px">
						<el-input v-model="reserveDetail_gia.symmetry" placeholder="审批人" :disabled="detail"></el-input>
					</el-form-item>
					<el-form-item label="Fluerescence" style='float: left;' label-width="180px">
						<el-input v-model="reserveDetail_gia.fluerescence" placeholder="审批人" :disabled="detail"></el-input>
					</el-form-item>
					<el-form-item label="Inscription(s)" style='float: left;' label-width="180px">
						<el-input v-model="reserveDetail_gia.inscription" placeholder="审批人" :disabled="detail"></el-input>
					</el-form-item>

					<!-- <el-form-item label="Comment">
						<el-input v-model="reserveDetail.user" placeholder="审批人" type="textarea" :disabled="detail" class='textInput'></el-input>
					</el-form-item> -->
				</div>

				<!-- 右 -->
				<div style="height:480px ;width: 600px;margin:  10px;float: left;text-align: left; ">

					<!-- <el-form-item label="view" style='height: 180px;width: 100%;'>
						<el-upload class="avatar-uploader" :action="root+'/Uploads/uploadFile'" :show-file-list="false" :on-success="handleAvatarSuccess"
						 :disabled="detail">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item> -->

					<el-form-item>
						<p style="height: 30px;line-height: 30px;">Comment</p>
						<el-input v-model="reserveDetail_gia.comments" placeholder="审批人" type="textarea" class='textInput' :disabled="detail"></el-input>
					</el-form-item>

					<!-- <el-form-item>
						<p style="height: 30px;line-height: 30px;">Origin</p>
						<el-input v-model="reserveDetail.Origin" placeholder="审批人" type="textarea" class='textInput' :disabled="detail"></el-input>
					</el-form-item> -->

					<el-form-item>
						<p style="height: 30px;line-height: 30px;">Code Use See Help</p>
						<el-input v-model="reserveDetail_gia.codeUseSeeHelp" placeholder="审批人" type="textarea" class='textInput'
						 :disabled="detail"></el-input>
					</el-form-item>

					<!-- <el-form-item>
						<p style="height: 30px;line-height: 30px;">Rests</p>
						<el-input v-model="reserveDetail.Rests" placeholder="审批人" type="textarea" class='textInput' :disabled="detail"></el-input>
					</el-form-item> -->

					<p style="color: #409EFF;cursor: pointer;" @click="showimg()">check</p>

				</div>

			</el-form>


			<div>
			</div>
			<div style="height: 60px;float: right;width: 100%;">
				<el-button type="primary" @click="hidedetail()" style='float: right;margin-right: 100px;height:35px;width: 112px;border:0;background: rgb(245,93,84);margin-top: 2.5px;line-height: 15px;'>返回</el-button>
				<el-button type="primary" v-show="!detail" @click="upload()" style='float: right;margin-right: 20px;height:35px;width: 112px;border:0;background: rgb(245,93,84);margin-top: 2.5px;line-height: 15px;'>確定</el-button>
			</div>
			
		</div>


		<!-- 查看照片 -->
		<!-- <div v-show='ifimg' class="reserve_list">

			<div style="height: 530px;overflow: hidden;text-align: left;">

				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>

				<el-upload :action="root+'/Uploads/uploadFile'" list-type="picture-card" :on-preview="handlePictureCardPreview"
				 :on-remove="handleRemove" :on-success="handleAdd" :disabled="detail" :file-list="fileList">
					<i class="el-icon-plus"></i>
				</el-upload>

			</div>

			<div style="height: 60px;float: right;width: 100%;">
				<el-button type="primary" @click="hideimg()" style='float: right;margin-right: 20px;height:35px;width: 112px;border:0;background: rgb(245,93,84);margin-top: 2.5px;line-height: 15px;'>確定</el-button>
			</div>

		</div> -->

		<!-- <div style="width: 200px;height: 200px;background: red;">
			<img src="F:\work space\2019-com.pourlavie.production-be-spring.git\pourlavie-web-application\src\main\webapp\WEB-INF\objectFile\u=4040220968,2433021703&fm=26&gp=0com.pourlavie.production.common.util.DateTimeUtil@6c0e5f7e.jpg" />
		</div> -->

		<!-- 賬號密碼錯誤彈窗 -->
		<div class="dialog">
			<el-dialog title="提示" :visible.sync="dialogVisible02" width="30%" top='20%'>
				<span>時間不能爲空</span>
				<span slot="footer" class="dialog-footer">
					<!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
					<el-button type="primary" @click="dialogVisible02 = false">確 定</el-button>
				</span>
			</el-dialog>
		</div>

	</div>

</template>

<script>
	export default {
		name: "ReserveManagement",
		data() {
			return {
				
				showType:0,
				// fileList:[],
				// root: 'http://192.168.2.176:8080/RESTful/',
				titlebg:{
					'background':'rgb(216,214,215)',
					'color':'black'
				},
				labelPosition: 'right',
				branch: '分行一',
				branch_list: [],
				// branchId:'',
				formInline_reserve: {
					search: '',
					num: '',
				},
				formInline: {
					search: '',
					num: '批量',
				},
				formInlinetwo: {
					seekTwo: ''
				},
				reserveList_search: {
					search: '',
				},
				batchDetail: {
					stone_name: '',
					stone_type: '',
					Storage: '',
					Warehouse: '',
					num: '',
					innum: '',
					size: '',
					size_type: '',
					weight: '',
					weight_type: '',
					price: '',
					sum: '',
					Check_num: '',
					Invoice_num: '',
					time: '',
					rests: ''
				},
				reserveDetail: {
					no_: '',
					date: '',
					object: '',
					identification: '',
					weight: '',
					weightTo: '',
					dimensions: '',
					dimensionsTo: '',
					cut: '',
					shape: '',
					color: '',
					colorTo: '',
					comment: '',
					origin: '',
					codeUseSeeHelp: '',
					rests: '',
					productionPlace: '',
					viewId: ''
				},

				reserveDetail_gia: {
					date: '',
					giaReportNumber: '',
					shapeAndCuttingStyle: '',
					measurements: '',
					caratWeight: '',
					colorGrade: '',
					clarityGrade: '',
					cutGrade: '',
					polish: '',
					symmetry: '',
					fluerescence: '',
					inscription: '',
					comments: '',
					codeUseSeeHelp: '',
					viewId: ''
				},
				currentRow: null,
				totalElements: 0,
				totalElements_list: 0,
				page01: 1,
				page02: 1,
				dateOne: '',
				dateTwo: [],
				dateOne_transfer: '',
				dateTwo_transfer: new Date().format("yyyy-MM-dd"),
				value1: '',
				imageUrl: '',
				dialogImageUrl: '',
				dialogVisible: false,
				dialogVisible02: false,
				ifimg: false,
				detail: false,
				batch: false,

				reserve_list: false,
				reserve_detail: false,
				ifGRS: 0,

				tableData1_gia: [],
				tableData2: [],
				fileList: [],
				transferid: 0,
				warehouse: [

					{
						id: 0,
						name: '批量'
					},
					{
						id: 1,
						name: 'GIA'
					},
					{
						id: 2,
						name: 'GRS'
					},
				],
				tableData3: [],
				tableData1: [],
				tableData02:[]

			}
		},
		created: function() {
			
			var today = new Date();
			var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 30;
			today.setTime(targetday_milliseconds); //注意，这行是关键代码
			this.dateOne = today.format("yyyy-MM-dd")
			this.dateOne_transfer = today.format("yyyy-MM-dd")


			// this.transferSearch()
			this.dateTwo.push(today)
			this.dateTwo.push(new Date())
			this.findAllEntrepot()
			
			// this.search()

			// this.dateTwo=[dateOne,new Date()]			
			// //console.log('---root:'+this.root)

		},
		methods: {
			// 分行數據初始化
			findAllEntrepot() {
				this.$api.get('/inventory/findAllEntrepot', null, r => {
					this.branch_list = r.content,
						this.branch = r.content[0].name
						// this.branchId== r.content[0].reference
					this.search()
				});
			},
			
			changeType(val){
				this.showType=val
				this.search()
			},

			submitForm(formLabelAlign) {
				// //console.log('0101')
				var that = this
				this.$refs[formLabelAlign].validate((valid) => {
					if (valid) {
						//console.log(that.formLabelAlign);
					} else {
						//console.log('error submit!!');
						return false;
					}
				});
			},

			check_img() {

			},

			tocreate() {
				this.$router.push("/newpurchase?type=new")
			},

			handleClick(id) {

				// //console.log('-----' + id)
				this.$router.push("/newpurchase?type=detail&id=" + id)

				// var that=this
				// 				this.reserve_detail = true
				// 				this.detail = true
				// 				if (this.ifGRS) {
				// 
				// 					this.$api.post('/Unique/seek/' + id, null, r => {
				// 						this.reserveDetail = r
				// 						this.imageUrl = this.root + r.viewId
				// 						// //console.log(this.root+'/'+r.viewId)
				// 					});
				// 				} else {
				// 					this.$api.post('/Unique/seek/' + id, null, r => {
				// 						this.reserveDetail_gia = r
				// 					});
				// 				}



			},
			clickItem(row, event, column) {
				var val = row;
				// //console.log('item')
				// //console.log(val)
				if (this.transferid == val.id) {
					this.currentRow = '';
					this.transferid = 0
					var row = ''
					this.$refs.singleTable01.setCurrentRow(row);
					this.$refs.singleTable02.setCurrentRow(row);
					// //console.log('0000000000000000000000000000000000000000000000')
					this.transferSearch()
				} else {
					this.currentRow = val;
					// //console.log(val);
					this.batchDetail.out1 = val.id;
					this.batchDetail.name = val.no_;
					this.batchDetail.outId = val.warehouseId;
					this.batchDetail.outName = val.warehouseName;
					this.batchDetail.rests = val.rests;
					this.transferid = val.id
					this.transferSearch()
				}
			},

			transferSearch() {

				if (new Date(this.dateOne_transfer).format("yyyy-MM-dd") > new Date(this.dateTwo_transfer).format("yyyy-MM-dd")) {
					this.dialogVisible02 = true
				} else {

					// 時間轉換
					var today = new Date(Date.parse(this.dateTwo_transfer));
					var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * 1;
					today.setTime(targetday_milliseconds); //注意，这行是关键代码
					var time = today.format("yyyy-MM-dd")

					this.$api.post('/transfer/seek?warehouseId=' + this.transferid, {
						"dateOne": new Date(this.dateOne_transfer).format("yyyy-MM-dd"),
						"dateTwo": time, //yyyy-MM-dd'T'HH:mm:ss.SSSZ
						"index": 0,
						"num": 10,
						"seek": this.ifGRS ? "GRS" : "GIA",
						"seekTwo": this.formInlinetwo.seekTwo
					}, r => {

						// //console.log('轉移查詢')
						//console.log(r.content);
						this.tableData2 = r.content

					});
				}
			},

			transfer(id) {
				this.$router.push("/transfer?reference="+id)
			},

			onSubmit01() {
				this.page01 = 1
				// this.currentRow = null
				// this.transferid = 0
				// this.page02 = 1
				this.search()
				// this.transferSearch()
			},
			// 模糊查询库存
			search() {
				
				
				var entrepotId = ''
				for (var i = 0; i < this.branch_list.length; i++) {
					if (this.branch == this.branch_list[i].name) {
						entrepotId = this.branch_list[i].reference
					}
				}
				
				
				// if(this.showType==0){
					this.$api.post('/inventory/findTotalNum?branchRef='+entrepotId, null, r => {
					
					this.tableData1 = r;
					
					});
				// }else{
					
					var today = new Date(Date.parse(this.dateTwo));
					var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * 1;
					today.setTime(targetday_milliseconds); //注意，这行是关键代码
					var time = today.format("yyyy-MM-dd")
					
					
					if (this.dateTwo) {
						
						var search = this.formInline.search
						var entrepotId = ''
						for (var i = 0; i < this.branch_list.length; i++) {
							if (this.branch == this.branch_list[i].name) {
								entrepotId = this.branch_list[i].reference
							}
						}
					
					
						this.$api.post('/inventory/findAll?Page=' + this.page01 + '&Size=5', {
							"eDate": this.dateTwo[1].format("yyyy-MM-dd"),
							"entrepot": entrepotId,
							"item": search == '' ? "" : search,
							"sDate": this.dateTwo[0].format("yyyy-MM-dd")
						}, r => {
							
							//console.log('----------------')
							//console.log(r);
							
							this.tableData02 = r.content;
							this.totalElements = r.totalPage
					
						});
					} else {
						this.dialogVisible02 = true
					}
					
				// }
				
				
				
				
				



			},

			GRS() {
				this.ifGRS = !this.ifGRS
				this.onSubmit01()
				this.transferSearch()
			},
			// 提交批次創建
			uploadBatch() {



				this.batch = false
				this.$api.post('/transfer/save', {
					"id": 0,
					"name": this.batchDetail.name,
					"numbe": parseInt(this.batchDetail.numbe),
					"out1": parseInt(this.batchDetail.out1),
					"outId": parseInt(this.batchDetail.outId),
					"outName": this.batchDetail.outName,
					"rests": this.batchDetail.rests,
					"shiftTo": 0,
					"shiftToId": parseInt(this.batchDetail.shiftToId),
					"shiftToName": this.batchDetail.shiftToName,
					"time": "",
					"uniqueId": 0,
					"uniqueType": this.ifGRS ? "GRS" : "GIA",
					"weight": parseInt(this.batchDetail.weight),
					"weightUnit": this.batchDetail.weightUnit,

				}, r => {

					//console.log(r);
					// this.tableData2 = r.content

				});

			},
			upload() {

				if (this.ifGRS) {



					this.$api.post('/Unique/save', {
						"certificateToUploadId": "",
						"codeUseSeeHelp": this.reserveDetail.codeUseSeeHelp,
						"color": this.reserveDetail.color,
						"colorTo": this.reserveDetail.colorTo,
						"comment": this.reserveDetail.comment,
						"cut": this.reserveDetail.cut,
						"cutTo": this.reserveDetail.cutTo,
						"date": this.reserveDetail.date.format("yyyy-MM-dd"),
						"dimensions": this.reserveDetail.dimensions,
						"dimensionsTo": this.reserveDetail.dimensionsTo,
						"id": 0,
						"identification": this.reserveDetail.identification,
						"no_": this.reserveDetail.no_,
						"object": this.reserveDetail.object,
						"origin": this.reserveDetail.origin,
						"productionPlace": this.reserveDetail.productionPlace,
						"rests": this.reserveDetail.rests,
						"shape": this.reserveDetail.shape,
						"viewId": this.reserveDetail.viewId,
						"warehouseName": this.warehouse[parseInt(this.formInline.num)].name,
						"warehouseId": this.warehouse[parseInt(this.formInline.num)].id,
						"weight": parseInt(this.reserveDetail.weight),
						"weightTo": this.reserveDetail.weightTo,
						"list": this.fileList
					}, r => {

						//console.log(r.content);
						this.hidedetail()
						this.onSubmit01()
					});



				} else {


					this.$api.post('/giaUnique/save', {

						"caratWeight": this.reserveDetail_gia.caratWeight,
						"clarityGrade": this.reserveDetail_gia.clarityGrade,
						"codeUseSeeHelp": this.reserveDetail_gia.codeUseSeeHelp,
						"colorGrade": this.reserveDetail_gia.colorGrade,
						"comments": this.reserveDetail_gia.comments,
						"cutGrade": this.reserveDetail_gia.cutGrade,
						"date": this.reserveDetail_gia.date.format("yyyy-MM-dd"),
						"fluerescence": this.reserveDetail_gia.fluerescence,
						"giaReportNumber": this.reserveDetail_gia.giaReportNumber,
						"id": 0,
						"inscription": this.reserveDetail_gia.inscription,
						"measurements": this.reserveDetail_gia.measurements,
						"polish": this.reserveDetail_gia.polish,
						"shapeAndCuttingStyle": this.reserveDetail_gia.shapeAndCuttingStyle,
						"symmetry": this.reserveDetail_gia.symmetry,
						"uploadsAndDownloads": "",
						"viewId": this.reserveDetail_gia.viewId,
						"warehouseName": this.warehouse[parseInt(this.formInline.num)].name,
						"warehouseId": this.warehouse[parseInt(this.formInline.num)].id,

					}, r => {

						//console.log(r);
						this.hidedetail()
						this.onSubmit01()

					});


				}



			},

			type_change() {
				this.ifGRS = this.formInline.num == '批量' ? 0 : (this.formInline.num == 'GIA' ? 1 : 2)
			},
			onSubmit() {

			},
			// 庫存翻頁
			pages01(val) {
				//console.log(val)
				this.page01 = val
				this.search()
			},
			// 批次翻頁
			pages02(val) {
				this.page02 = val
				this.search()
			},
			search_list() {
				this.page02 = 1
				this.transferSearch();
			},
			reserveList() {
				this.reserve_list = true
			},
			return_reserveList() {
				this.reserve_list = false
			},

			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
				if (this.ifGRS) {

					this.reserveDetail.viewId = file.response.url
					// //console.log('----'+file.response.url)
				} else {
					this.reserveDetail_gia.viewId = file.response.url
					// //console.log('----'+file.response.url)
				}
				// //console.log(file)
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},

			hidedetail() {
				this.reserve_detail = false
				this.detail = false
			},
			reserveAdd() {
				this.detail = false,
					this.reserve_detail = true
			},

			showBatch() {
				this.batch = true
			},
			cancel() {
				this.batch = false
			},

			hideimg() {
				this.ifimg = false
			},
			// 			showimg() {
			// 
			// 				this.ifimg = true
			// 				if (this.detail) {
			// 					// /Uploads/SeekUploadFile/{uuid}
			// 
			// 					this.$api.get('/Uploads/SeekUploadFile/' + this.reserveDetail.certificateToUploadId, null, r => {
			// 
			// 						//console.log('-------' + r.length)
			// 						//console.log(r);
			// 						this.fileList = r
			// 						for (var i = 0; i < r.length; i++) {
			// 							this.fileList[i].url = this.root + this.fileList[i].url
			// 						}
			// 
			// 						// this.tableData2 = r.content
			// 
			// 					});
			// 
			// 				} else {
			// 
			// 				}
			// 
			// 			},
			handleRemove(file, fileList) {
				this.fileList = [];
				for (var i = 0; i < fileList.length; i++) {
					this.fileList.push(fileList[i].response.url);

				}
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			// 			handleAvatarSuccess(file, fileList){
			// 				//console.log(file, fileList);
			// 				//console.log('010101')
			// 			},
			handleAdd(response, file, fileList) {
				// //console.log(response)
				this.fileList = [];
				for (var i = 0; i < fileList.length; i++) {
					this.fileList.push(fileList[i].response.url);

				}
				//console.log(fileList);

			},
			topage(type) {
				if (type == 'special') {
					this.$router.push("/SystemManagement/special")
				} else if (type == 'batch') {
					this.$router.push("/SystemManagement/batch")
				} else if (type == 'recycling') {
					this.$router.push("/SystemManagement/Recycling")
				} else if (type == 'all') {
					this.$router.push("/SystemManagement/ReserveManagement")
				}
			}


		}
	}
</script>

<style lang="scss">
	
	@import '../../assets/styles/variable';

	// 	.reservemanagement{
	// 		
	// 	}
	
	
	
	
// 	.has-gutter {
// 		line-height: 30px
// 	}

	.imgList {
		margin: 15px 20px;
		float: left;
	}

	.imgs {
		width: 300px;
		height: 170px;

		img {
			width: 100%;
			height: 100%
		}
	}

	.second_menu {
		width: 115px;
		line-height: 42px;
		float: left;
		margin-left: 12px;
		font-size: 18px;
		background: rgb(238, 237, 235);
		margin-top: 8px;
		border-top-right-radius: 10px;
		border-top-left-radius: 10px;
		text-align: center
	}

	.selector {
		color: rgb(5, 120, 209);
	}

	.inputs {
		width: 300px;
		float: left
	}

	.button {
		// width: 191px;
		padding: 0 10px;
		height: 48px;
		font-size: 21px;
		// line-height: 48px;
		// background: $navHoverTextColor;
		border: 0
	}

	.button:nth-child(2) {
		margin-left: 50px;

	}

	.point {
		cursor: pointer;
	}

	.search {
		.el-input__inner {
			height: 40px
		}

		.el-input__inner {
			height: 40px
		}

	}

	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}



	.el-row,
	.el-col,
	// 	.el-col-24 {
	// 
	// 		height: 40px
	// 	}

	.el-table {
		margin: 0;
		padding: 0;

	}

	// 	.el-table td,
	// 	.el-table th {
	// 		padding: 8px 0
	// 	}

	.list {
		// 		.el-table_2_column_14 {
		// 			color: #409EFF;
		// 			cursor: pointer
		// 		}
	}

	.list {
		border-top: 2px solid rgb(224, 224, 224);
		background: white;
		height: 385px;
		width: 100%;
		margin-top: 20px;
	}

	.reserve_list {
		height: 720px;
		width: 70%;
		background: white;
		margin-left: 5%;
		position: fixed;
		top: 200px;
		border: 2px solid rgb(224, 224, 224);
		z-index: 1000;
		overflow: auto
	}

	.el-form--inline .el-form-item {
		display: block;

	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	.el-form-item {
		margin-bottom: 0
	}

	.textInput {
		width: 400px;
		height: 80px;
	}

	.batch_left {
		float: left;
		margin-left: 20px;
		width: 30%;
		margin-top: 30px
	}

	.el-main {
		line-height: 30px;
	}

	.reserve_list {
		.el-upload--picture-card {
			float: left;
			margin: 15px 20px
		}

		.el-upload-list__item {
			margin: 15px 20px;
			float: left
		}

	}
</style>

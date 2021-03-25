<template>
  <div class="productSave" v-loading='all_loading' style="max-width: 700px;margin: 0 auto;background: white;padding: 30px;border-radius: 10px;">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

      <div style="width: 100%;color: white;background: deepskyblue;line-height: 30px;margin-bottom: 10px;">
        <strong style="margin-left: 10px;">Product</strong>
      </div>

      <el-form-item label="Photo">

        <el-form-item>
          <el-upload class="avatar-uploader" action="auto" :show-file-list="false" :http-request="uploadSectionFile"
            :disabled="type=='detail'">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span v-if="imageUrl" style="float: left;padding-left: 160px;color: #409EFF;cursor: pointer;" @click='handlePictureCardPreview("photo")'>預覽</span>
          <span v-if="imageUrl&&(type!='detail'?true:false)" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;"
            @click='handleRemove("photo")'>刪除</span>
        </el-form-item>

        <!-- <el-upload :class="{'disabled':imageUrl==''?false:true}" :http-request="uploadSectionFile" action="auto" list-type="picture-card" :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload> -->
        <el-dialog :visible.sync="dialogVisible_pic" :before-close="handleClose">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

      </el-form-item>

      <el-form-item label="Ative">
        <el-radio-group v-model="enable_type" :disabled="type=='detail'">
          <el-radio label="YES"></el-radio>
          <el-radio label="NO"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Consign">
        <el-radio-group v-model="consign_type" :disabled="type=='detail'">
          <el-radio label="YES"></el-radio>
          <el-radio label="NO"></el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- <el-form-item label="Consign info">
        <el-input :disabled="type=='detail'" v-model="ruleForm.consign_info"></el-input>
      </el-form-item> -->

      <!-- <el-form-item label="Consignor">
        <el-select @change="clear_consignor" :disabled="type=='detail'" v-model="select_consignor" filterable placeholder="Select Consignor">
          <el-option v-for="item in consignor_list" :label="item.customeName" :value="item.reference"></el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item label="Design Code">
        <el-input type="text" v-model="ruleForm.codeDesign" :disabled="type=='detail'"></el-input>
      </el-form-item>

      <el-form-item label="Product Code" prop="codePro">
        <el-input :disabled="type=='detail'" type="age" v-model="ruleForm.codePro"></el-input>
      </el-form-item>

      <el-form-item label="Name" prop="name">
        <el-input :disabled="type=='detail'" v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="Details" prop="details">
        <el-input :disabled="type=='detail'" v-model="ruleForm.details"></el-input>
      </el-form-item>

      <el-form-item label="Quantity" prop="quantity">
        <el-input :disabled="type=='detail'" v-model="ruleForm.quantity"></el-input>
      </el-form-item>

      <!-- <el-form-item label="18K($)" prop="k18">
        <el-input :disabled="type=='detail'" v-model="ruleForm.k18"></el-input>
      </el-form-item> -->

      <!--      <el-form-item label="PT950($)" prop="pt950">
        <el-input :disabled="type=='detail'" v-model="ruleForm.pt950"></el-input>
      </el-form-item> -->

      <el-form-item label="Unit Cost($)" prop="unit_cost">
        <el-input :disabled="type=='detail'" v-model="ruleForm.unit_cost"></el-input>
      </el-form-item>

      <el-form-item label="Unit Price($)" prop="unit_price">
        <el-input :disabled="type=='detail'" v-model="ruleForm.unit_price"></el-input>
      </el-form-item>

      <!-- <el-form-item label="Size101618K" prop="size101618K">
        <el-input :disabled="type=='detail'" v-model="ruleForm.size101618K"></el-input>
      </el-form-item> -->

      <!-- <el-form-item label="Size1016Pt" prop="size1016Pt">
        <el-input :disabled="type=='detail'" v-model="ruleForm.size1016Pt"></el-input>
      </el-form-item> -->

      <!-- <el-form-item label="Size" prop="thick">
        <el-input :disabled="type=='detail'" v-model="ruleForm.thick"></el-input>
      </el-form-item> -->

      <el-form-item label="Width" prop="width">
        <el-input :disabled="type=='detail'" v-model="ruleForm.width"></el-input>
      </el-form-item>

      <el-form-item label="Thick" prop="thick">
        <el-input :disabled="type=='detail'" v-model="ruleForm.thick"></el-input>
      </el-form-item>

      <el-form-item label="Size" prop="size">
        <el-input :disabled="type=='detail'" v-model="ruleForm.size"></el-input>
      </el-form-item>

      <!-- <el-form-item label="Length" prop="thick">
        <el-input :disabled="type=='detail'" v-model="ruleForm.thick"></el-input>
      </el-form-item> -->

      <!-- <el-form-item label="Wt18K" prop="wt18K">
        <el-input :disabled="type=='detail'" v-model="ruleForm.wt18K"></el-input>
      </el-form-item> -->

      <!-- <el-form-item label="WtMm" prop="wtMm">
        <el-input :disabled="type=='detail'" v-model="ruleForm.wtMm"></el-input>
      </el-form-item> -->

      <!-- <el-form-item label="WtPt" prop="wtPt">
        <el-input :disabled="type=='detail'" v-model="ruleForm.wtPt"></el-input>
      </el-form-item> -->

      <el-form-item label="Category" prop="category.reference">
        <el-select clearable :disabled="type=='detail'" v-model="ruleForm.category.reference" placeholder="Select Category">
          <el-option v-for="item in category_list" :label="item.name" :value="item.reference"></el-option>
          <!-- <el-option label="item.name" value="item.reference"></el-option> -->
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="Color" >
        <el-select :disabled="type=='detail'" v-model="color_select" placeholder="Select Color">
          <el-option v-for="item in color_list" :label="item.name" :value="item.reference"></el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item label="Material">
        <el-select clearable @change="material_change" :disabled="type=='detail'" v-model="material_select" placeholder="Select Material">
          <el-option v-for="item in material_list" :label="item.name+','+item.color.name" :value="item.reference"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Ring Size Surcharge Group">
        <el-select clearable @change="surcharge_change" :disabled="type=='detail'" v-model="surcharge_select" placeholder="Select Surcharge">
          <el-option v-for="item in surcharge_list" :label="item.name" :value="item.reference"></el-option>
        </el-select>
      </el-form-item>

      <!--      <div style="width: 100%;color: white;background: deepskyblue;line-height: 30px;margin-bottom: 10px;">
        <strong style="margin-left: 10px;">Material Info</strong>
      </div>

      			<div>

      	<div style='padding: 5px;width: 96%;margin-left: 2%;margin-top: 10px;'>


      		<div style="background: rgb(233,238,244);padding: 15px 20px;width: 100%;border-radius: 10px;white-space: nowrap">
      			<el-row style='text-align: center;'>



      				<el-col :span="8">
      					<div class="grid-content">Item</div>
      				</el-col>


      				<el-col :span="6">
      					<div class="grid-content">Size</div>
      				</el-col>

      				<el-col :span="4">
      					<div class="grid-content ">Net Amount</div>
      				</el-col>

              <el-col :span="4">
              	<div class="grid-content ">Remark</div>
              </el-col>

      			</el-row>

      			<el-row v-for='(item,index) in items'>
      				<el-col :span="8">
      					<div class="input-content">
      						<el-input placeholder="input" class='grid-inputs' v-model="item.item" :disabled="type=='detail'?true:false"></el-input>
      					</div>
      				</el-col>

      				<el-col :span="6">
      					<div class="input-content">
      						<el-input @change="unitPrice(index)"  placeholder="input" class='grid-inputs' v-model="item.size" :disabled="type=='detail'?true:false"></el-input>
      					</div>
      				</el-col>

      				<el-col :span="4">
      					<div class="input-content">
      						<el-input @change="unitPrice(index)" type="number" placeholder="input" class='grid-inputs' v-model="item.amount" :disabled="type=='detail'?true:false"></el-input>
      					</div>
      				</el-col>

      				<el-col :span="4">
      					<div class="input-content">
      						<el-input  placeholder="input" class='grid-inputs' v-model="item.remark" :disabled="type=='detail'?true:false"></el-input>
      					</div>
      				</el-col>


      				<el-col :span="1">
      					<div class="input-content " style="text-align: left;color: red;margin-left: 20px;line-height: 40px;">
      						<span style="cursor: pointer;" class='grid-inputs' @click="del(index)" v-if="type!='detail'">Delete</span>
      					</div>
      				</el-col>

      			</el-row>
      			</el-row>

      			<el-row>
      				<el-col :span="20">
      					<div class="input-content ">
      						<img @click="add" style="width: 30px;height: 30px;margin-top: 10px;cursor: pointer;margin-left: 50%;" src="../../../image/add.png"
      						 v-if="type!='detail'" />
      					</div>
      				</el-col>
      			</el-row>


      		</div>

      	</div>
      </div> -->


      <!--        <div v-if="type!='alter'">
        <div style="width: 100%;color: white;background: deepskyblue;line-height: 30px;margin-bottom: 10px;">
          <strong style="margin-left: 10px;">Invoice</strong>
        </div>

          <el-form-item label="Supplier" prop="invoice.supplier.reference">
            <el-select :disabled="type=='detail'" v-model="ruleForm.invoice.supplier.reference" placeholder="Select Supplier">
              <el-option v-for="items in supplier_list" :label="items.name" :value="items.reference"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Item" prop="invoice.item">
            <el-input :disabled="type=='detail'" v-model="ruleForm.invoice.item"></el-input>
          </el-form-item>

          <el-form-item label="Amount" prop="invoice.amount">
            <el-input :disabled="type=='detail'" v-model="ruleForm.invoice.amount"></el-input>
          </el-form-item>

          <el-form-item label="Currency" prop="invoice.currency">
            <el-radio-group v-model="ruleForm.invoice.currency" :disabled="type=='detail'">
              <el-radio label="HKD"></el-radio>
              <el-radio label="CNY"></el-radio>
              <el-radio label="USD"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Invoice Date" prop="invoice.invoiceDate">
            <el-date-picker format="yyyy-MMM-dd" :disabled="type=='detail'" type="date" placeholder="Pick a date" v-model="ruleForm.invoice.invoiceDate"
              style="width: 100%;"></el-date-picker>
          </el-form-item>

          <el-form-item label="Invoice No" prop="invoice.invoiceNo">
            <el-input :disabled="type=='detail'" v-model="ruleForm.invoice.invoiceNo"></el-input>
          </el-form-item>

          <el-form-item label="Remark" >
            <el-col :span="24">
              <p style="overflow: hidden;">
                <textarea rows="3" style="width: 100%;" v-model="ruleForm.invoice.remark" ></textarea>
              </p>
            </el-col>
          </el-form-item>




      <el-form-item>
      	<el-upload class="avatar-uploader" action="auto" :show-file-list="false"
      	 :http-request="uploadSectionFile02" :disabled="type=='detail'" >
      		<img v-if="imageUrl02" :src="imageUrl02" class="avatar">
      		<i v-else class="el-icon-plus avatar-uploader-icon"></i>
      	</el-upload>
      	<span v-if="imageUrl02" style="float: left;padding-left: 160px;color: #409EFF;cursor: pointer;" @click='handlePictureCardPreview("grs")'>預覽</span>
      	<span v-if="imageUrl02&&(type!='detail'?true:false)" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;" @click='handleRemove("grs")'>刪除</span>
      </el-form-item>

      </div> -->

      <el-form-item>

        <!-- <el-button v-if="type!='detail'" type="primary" @click="add_invoice()" style='margin: 0 auto;'>Add invoice</el-button> -->
        <el-button v-if="type!='detail'" type="primary" @click="submitForm('ruleForm')" style='margin-left: 20px;'>Save</el-button>
        <el-button type="primary" @click="Return('ruleForm')" style='margin-left: 20px;'>Back</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">Reset</el-button> -->
      </el-form-item>
    </el-form>




    <div style="font-size: 18px;font-weight: bold;height: 60px;">
      <div style="float: left;line-height: 60px;">Price</div>
      <el-button type="primary" @click="usercreate_price" style='margin-top: 10px;float:right;height:40px;padding: 0 10px;border:0;background: rgb(5,120,209);'>New</el-button>
    </div>
    <div style="border-radius: 10px;background: white;height: 300px;width: 100%;">
      <div>

        <el-table :data="tableData_price" ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;'>


          <template slot="empty" v-if="loaing_table">
            <span>Opps! No records yet</span>
          </template>

          <template slot="empty" v-if="!loaing_table">
            <i class="el-icon-loading"></i>
            <span>Loading...</span>
          </template>

          <el-table-column type="index" width="80px">
          </el-table-column>

          <el-table-column prop="material" label="Material" row-style='background:red'>
            <template slot-scope="scope">
              <span type="text" size="small" style="">{{scope.row.material.name}},{{scope.row.material.color.name}}</span>
              <span type="text" size="small" style="" v-show="scope.row.extra!=''" >({{scope.row.extra}})</span>
            </template>
          </el-table-column>

          <el-table-column prop="price" label="Price">
            <!-- <template slot-scope="scope">
              <span type="text" size="small" style="">{{scope.row.invoice.amount}}{{scope.row.invoice.currency}}</span>
            </template> -->
          </el-table-column>
          <div class="action">
            <el-table-column fixed="right" label="Action" align='center' style='background: red;' width='100px'>
              <template slot-scope="scope">
                <div style="white-space: nowrap;" class="selector_form">
                  <el-button style='float: left;margin-left: 10px;' type="danger" size="small" @click='detele_price(scope.row.reference)'>Detele</el-button>
                </div>
              </template>
            </el-table-column>

          </div>

        </el-table>
      </div>
    </div>


    <div style="font-size: 18px;font-weight: bold;height: 60px;">

      <div style="float: left;line-height: 60px;">Product Invoice</div>
      <el-button type="primary" @click="usercreate" style='margin-top: 10px;float:right;height:40px;padding: 0 10px;border:0;background: rgb(5,120,209);'>New</el-button>

    </div>
    <div style="border-radius: 10px;background: white;height: 300px;width: 100%;">
      <div>

        <el-table :data="tableData" ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;'>


          <template slot="empty" v-if="loaing_table">
            <span>Opps! No records yet</span>
          </template>

          <template slot="empty" v-if="!loaing_table">
            <i class="el-icon-loading"></i>
            <span>Loading...</span>
          </template>

          <el-table-column type="invoice.index" width="80px">
          </el-table-column>

          <el-table-column prop="invoice.invoiceNo" label="Invoice No" row-style='background:red'>
          </el-table-column>

          <el-table-column prop="invoice.invoiceDate" label="Invoice Date">
            <!-- 可用 -->
            <template slot-scope="scope">
              <span type="text" size="small" style="">{{new Date(scope.row.invoice.invoiceDate).format("yyyy-MMM-dd")}}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column prop="item" label="Item" row-style='background:red'>
          </el-table-column> -->

          <el-table-column prop="invoice.amount" label="Amount">
            <template slot-scope="scope">
              <span type="text" size="small" style="">{{scope.row.invoice.amount}}{{scope.row.invoice.currency}}</span>
            </template>
          </el-table-column>




          <div class="action">
            <el-table-column fixed="right" label="Action" align='center' style='background: red;' width='200px'>
              <template slot-scope="scope">
                <div style="white-space: nowrap;" class="selector_form">

                  <el-button style='float: left;margin-left: 10px;' type="danger" size="small" @click='modify(scope.row.reference)'>Modify</el-button>
                  <el-button style='float: left;margin-left: 10px;' type="danger" size="small" @click='detele(scope.row.reference)'>Detele</el-button>

                </div>

              </template>
            </el-table-column>

          </div>

        </el-table>
      </div>
      <!-- <div class="block" style="float: right;margin-top: 10px;">
        <el-pagination layout="prev, pager, next" :page-size='10' :total="totalElements" @current-change='pages02'
          :current-page="page01">
        </el-pagination>
      </div> -->
    </div>

    <div class="tishi">
      <el-dialog title="" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" top='20%'>
        <span>Do you really want to delete it?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel_detele()">Cancel</el-button>
          <el-button type="primary" @click="confirm_detele()">OK</el-button>
        </span>
      </el-dialog>
    </div

    <div class="tishi">
      <el-dialog title="" :visible.sync="dialogVisible_price" width="30%" :before-close="handleClose" top='20%'>
        <span>Do you really want to delete it?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel_detele_price()">Cancel</el-button>
          <el-button type="primary" @click="confirm_detele_price()">OK</el-button>
        </span>
      </el-dialog>
    </div>

  </div>

</template>

<script>
  import {
    MessageBox,
    Message
  } from 'element-ui';

  export default {
    name: "specialCreate",
    data() {
      return {

        statusid_price:'',
        statusid: '',
        dialogVisible: false,
        titlebg: {
          'background': 'rgb(216,214,215)',
          'color': 'black'
        },
        select_consignor: "",
        consignor_list: [],
        enable_type: "YES",
        material_select: "",
        material_list: [],

        surcharge_select: "",
        surcharge_list: [],

        invoice_list: [{
          "amount": 0,
          "currency": "HKD",
          "image": {
            "reference": ""
          },
          "invoiceDate": "",
          "invoiceNo": "",
          "invoiceType": "INVENTORY",
          "item": "",
          "locked": 0,
          "supplier": {
            "reference": ""
          }
        }],

        "items": [{
          item: '',
          size: '',
          amount: '',
          remark: '',
        }],
        imageUrl02: '',
        color_list: [],
        color_select: "",
        dialogImageUrl: '',
        dialogVisible_price: false,
        dialogVisible: false,
        dialogVisible_pic:false,
        imagelist: 1,
        type: '',
        links: [],
        links_name: [],
        category_list: [],
        supplier_list: [],
        options: [],
        imageUrl: '',
        root: '',
        type: '',
        consign_type: 'NO',
        ruleForm: {
          // "invoice": {
          //   remark:"",
          //   "amount": 0,
          //   "currency": "HKD",
          //   "image": {
          //     "reference": ""
          //   },
          //   "invoiceDate": "",
          //   "invoiceNo": "",
          //   "invoiceType": "INVENTORY",
          //   "item": "",
          //   "locked": 0,
          //   "supplier": {
          //     "reference": ""
          //   }
          // },
          "size":"",
          "invoice": null,
          enable: 1,
          "category": {
            "reference": ""
          },
          "codeDesign": "",
          "codePro": "",
          "consign": 0,
          // consign_info:"",
          // consignor:{reference:""},
          "details": "",
          "k18": 0,
          "material": {
            reference: ""
          },
          "surcharge_ring": {
            reference: ""
          },
          "name": "",
          "photo": {
            "reference": ""
          },
          "pt950": 0,
          "quantity": 0,
          "size101618K": 0,
          "size1016Pt": 0,
          "thick": "",
          "width": "",
          "wt18K": 0,
          "wtMm": 0,
          "wtPt": 0,
          "unit_cost": 0,
          "unit_price": 0
        },
        all_loading: false,
        tableData: [],
        tableData_price: [],
        loaing_table: true,
        rules: {

          gemType: {
            name: [{
                required: true,
                message: 'Please input Name',
                trigger: 'blur'
              },
              {
                required: true,
                message: 'Please input Name',
                trigger: 'change'
              }

            ],

            reference: [{
                required: true,
                message: 'Please input Name',
                trigger: 'blur'
              },
              {
                required: true,
                message: 'Please input Name',
                trigger: 'change'
              }

            ]

          },

          // codeDesign: [{
          // 	required: true,
          // 	message: 'Please input Design code',
          // 	trigger: 'blur'
          // }],

          codePro: [{
            required: true,
            message: 'Please input Product code',
            trigger: 'blur'
          }],



          dimensionUnit: [{
              required: true,
              message: 'dimensionUnit',
              trigger: 'blur'
            },


          ],

          k18: [{
              required: true,
              message: 'Please input 18k($)'
            },
            {
              pattern: /^[1-9]\d*$/,
              message: 'this must be a number'
            }
          ],

          pt950: [{
              required: true,
              message: 'Please input pt950($)'
            },
            {
              pattern: /^[1-9]\d*$/,
              message: 'this must be a number'
            }
          ],

          unit_cost: [{
              required: true,
              message: 'Please input Unit Cost($)'
            },
            {
              pattern: /^[1-9]\d*$/,
              message: 'this must be a number'
            }
          ],

          unit_price: [{
              required: true,
              message: 'Please input Unit Cost($)'
            },
            {
              pattern: /^[1-9]\d*$/,
              message: 'this must be a number'
            }
          ],

          wt18K: [{
              required: true,
              message: 'Please input wt18K'
            },
            {
              pattern: /^[1-9]\d*$/,
              message: 'this must be a number'
            }
          ],

          size101618K: [{
              required: true,
              message: 'Please input size101618K'
            },
            {
              pattern: /^[1-9]\d*$/,
              message: 'this must be a number'
            }
          ],

          size1016Pt: [{
              required: true,
              message: 'Please input size1016Pt'
            },
            {
              pattern: /^[1-9]\d*$/,
              message: 'this must be a number'
            }
          ],

          quantity: [{
              required: true,
              message: 'Please input size1016Pt'
            },
            {
              pattern: /^[1-9]\d*$/,
              message: 'this must be a number'
            }
          ],

          wtPt: [{
              required: true,
              message: 'Please input size1016Pt'
            },
            {
              pattern: /^[1-9]\d*$/,
              message: 'this must be a number'
            }
          ],



          wtMm: [{
              required: true,
              message: 'Please input wtMm',
              trigger: 'blur'
            },
            {
              pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g,
              message: 'this must be a number'
            }
          ],





          category: {
            reference: [{
              required: true,
              message: 'Please select category',
              trigger: 'change'
            }]
          },



          thick: [{
              required: true,
              message: 'Please input thick',
              trigger: 'blur'
            },

          ],

          width: [{
              required: true,
              message: 'Please input width',
              trigger: 'blur'
            },

          ],

          invoice: {

            supplier: {
              reference: [{
                required: true,
                message: 'Please select supplier',
                trigger: 'change'
              }]
            },
            amount: [{
                required: true,
                message: 'Please input amount',
                trigger: 'blur'
              },
              {
                pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g,
                message: 'this must be a number'
              }
            ],
            item: [{
                required: true,
                message: 'Please input item',
                trigger: 'blur'
              }

            ],
            currency: [{
              required: true,
              message: 'Please select currency',
              trigger: 'change'
            }],
            invoiceDate: [{
              // type: 'date',
              required: true,
              message: 'Please pick a date',
              trigger: 'change'
            }],
            invoiceNo: [{
              required: true,
              message: 'Please input invoiceNo',
              trigger: 'blur'
            }],


          },


          details: [{
              required: true,
              message: 'Please input details',
              trigger: 'blur'
            }

          ],

          name: [{
              required: true,
              message: 'Please input Name',
              trigger: 'blur'
            }

          ],

        }
      };
    },
    computed: {

      uploadDisabled: function() {
        return this.imagelist.length > 0
      },

    },
    mounted() {
      this.links = this.loadAll();
    },
    created: function() {

      console.log('come  in')




      this.invoice_list = this.$route.query.id

      this.root = this.$api.root
      this.type = this.$route.query.type

      this.$api.post('/customer/1970-01-01/2019-09-02/0/100000000', {}, r => {
        console.log('-------------')
        console.log(r)
        this.consignor_list = r
      });

      this.$api.get('/miscellaneous/material/color', null, r => {

        this.color_list = r

      })

      this.$api.get('/miscellaneous/material', null, r => {
        this.material_list = r
      })

       this.$api.get('/product/surcharge/ring/group', null, r => {
        this.surcharge_list = r
      })

      if (this.type == 'alter') {

        this.search()
        this.search_price()

        this.$api.get('/product/' + this.$route.query.id, null, r => {
          // console.log('/product/category')
          console.log(r)
          this.ruleForm = r
          this.imageUrl = this.root + '/kernal/asset/' + r.photo.reference
          // this.ruleForm.invoice.invoiceDate = new Date(r.invoice.invoiceDate)
          this.consign_type = this.ruleForm.consign == '1' ? 'YES' : 'NO'
          this.material_select =r.material!=null? r.material.name:null

          this.surcharge_select =r.surcharge_ring!=null?r.surcharge_ring.name:null

          if(r.surcharge_ring===null){

            this.ruleForm.surcharge_ring={
              reference: ""
            }
          }

          if(r.material===null){
            this.ruleForm.material={
              reference: ""
            }

          }

          // this.ruleForm.consign=this.consign_type=='YES'?0:1
          // console.log(new Date(r.invoice.invoiceDate).format("yyyy-MM-dd"))
        });

      }


      this.$api.get('/product/category', null, r => {


        console.log('/product/category')
        console.log(r)

        this.category_list = r

      });



      this.$api.get('/invoice/suppliers', null, r => {

        console.log('-------------')
        console.log(r)
        this.supplier_list = r

      });



      this.$api.get('/inventory/gem/type', null, r => {

        console.log(r)
        // this.links = r

        for (let i = 0; i < r.length; i++) {

          this.options.push(

            {
              value: r[i].reference,
              label: r[i].name
            }

          )

        }

      });
      console.log(this.$route.query.type)
      this.type = this.$route.query.type
      console.log(this.type)



      if (this.type == 'detail') {

        this.$api.get('/inventory/' + this.$route.query.id, null, r => {

          console.log('*****')
          console.log(r)
          this.ruleForm = r

        });

      }

    },

    methods: {

      usercreate_surcharge(){
        this.$router.push("/productSurcharge?type=new&invoice_list=" + this.invoice_list)
      },

      usercreate_price(){
        this.$router.push("/productPrice?type=new&invoice_list=" + this.invoice_list)
      },

      search(){

        this.$api.get('/product/' + this.$route.query.id + '/invoice/0/100000', null, r => {
          this.tableData = r
          this.loaing_table = true
        });

      },

      search_price(){

        // /product/price/{page}/{size}
        this.$api.get('/product/price/product/'+this.invoice_list, null, r => {
          this.tableData_price = r
          this.loaing_table = true
        });

        // this.$api.get('/product/' + this.$route.query.id + '/invoice/0/100000', null, r => {
        //   this.tableData = r
        //   this.loaing_table = true
        // });


      },

      handleClose(done) {
        this.dialogVisible = false
        this.dialogVisible_price = false
        this.dialogVisible_pic=false
      },

      // 刪除
      detele(uuid) {
        this.dialogVisible = true
        this.statusid = uuid
      },

      detele_price(uuid) {
        this.dialogVisible_price = true
        this.statusid_price = uuid
      },

      cancel_detele() {
        this.dialogVisible = false
      },

      confirm_detele() {
        this.dialogVisible = false

        this.$api.delete('/product/' + this.statusid + '/invoice/purge', null, r => {
          //console.log('****************************')
          this.search();
        });
      },

      cancel_detele_price() {
        this.dialogVisible_price = false
      },

      confirm_detele_price() {
        this.dialogVisible_price = false

        this.$api.delete('/product/price/' + this.statusid_price + '/purge', null, r => {
          //console.log('****************************')
          this.search_price();
        });
      },

      modify(uuid) {
        this.$router.push("/product_invoice?type=alert&uuid=" + uuid + "&invoice_list=" + this.invoice_list)
      },

      modify_price(uuid) {
        this.$router.push("/productPrice?type=alert&uuid=" + uuid + "&invoice_list=" + this.invoice_list)
      },

      usercreate() {
        this.$router.push("/product_invoice?type=new&invoice_list=" + this.invoice_list+"&invoice_item="+this.ruleForm.name)
      },

      material_change() {

        this.ruleForm.material.reference = ""

      },


      surcharge_change() {

        this.ruleForm.surcharge_ring.reference = ""

      },

      add_invoice() {

        this.invoice_list.push(

          {
            "amount": 0,
            "currency": "HKD",
            "image": {
              "reference": ""
            },
            "invoiceDate": "",
            "invoiceNo": "",
            "invoiceType": "INVENTORY",
            "item": "",
            "locked": 0,
            "supplier": {
              "reference": ""
            }
          }

        )

      },

      add() {

        this.items.push({

          item: '',
          size: '',
          amount: '',
          remark: '',
        })

      },

      del(index) {

        this.items.splice(index, 1)

      },

      uploadSectionFile02(param) {
        let bodyFormData = new FormData();
        bodyFormData.append("file", param.file);
        bodyFormData.append("type", 'BRAND');
        this.$api.post('/kernal/asset/retain', bodyFormData, r => {
          this.imageUrl02 = this.root + '/kernal/asset/' + r.reference
          this.ruleForm.invoice.image.reference = r.reference
          //console.log(r)
        });
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.imageUrl = ''
      },

      handlePictureCardPreview(type) {

        if (type == "grs") {
          this.dialogImageUrl = this.imageUrl02;
          this.dialogVisible = true;
        } else if (type == "photo") {

          console.log('photo')

          this.dialogImageUrl = this.imageUrl;
          // this.dialogVisible = true;
          this.dialogVisible_pic= true;
        }


      },


      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');

            this.ruleForm.enable = this.enable_type == "YES" ? 1 : 0
            // this.ruleForm.invoice.invoiceDate = new Date(this.ruleForm.invoice.invoiceDate).format("yyyy-MM-dd")
            this.ruleForm.quantity = parseInt(this.ruleForm.quantity)
            if (this.type == 'alter') {

              //               if(this.ruleForm.consignor.reference==""){
              //
              //                 if (this.select_consignor == '') {
              //                   this.ruleForm.consignor = null
              //                 } else {
              //                   this.ruleForm.consignor = {
              //                     reference: this.select_consignor
              //                   }
              //                 }
              //
              //               }

                if(this.material_select===null||this.material_select===""){
                  this.ruleForm.material=null

                }else{
                   if (this.ruleForm.material.reference == "") {
                    this.ruleForm.material.reference = this.material_select
                  }

                }


                if(this.surcharge_select===null||this.surcharge_select===""){
                  this.ruleForm.surcharge_ring=null
                }else{
                  if (this.ruleForm.surcharge_ring.reference == "") {
                    this.ruleForm.surcharge_ring.reference = this.surcharge_select
                  }

                }


              if (this.ruleForm.material===null||this.ruleForm.material==="") {

                this.ruleForm.material={
                  reference: ""
                }
                alert("Please select Material!")

              }else{

                this.ruleForm.consign = this.consign_type == 'YES' ? 1 : 0
                this.$api.post('/product/save', this.ruleForm, r => {

                  console.log(r)
                  history.back(-1)
                  // this.branch_list=r.content

                });

              }








            } else {


              if (this.material_select == "") {

                alert("Please select Material!")

              } else {

                // if (this.select_consignor == '') {
                //   this.ruleForm.consignor = null
                // } else {
                //   this.ruleForm.consignor = {
                //     reference: this.select_consignor
                //   }
                // }

                this.ruleForm.consign = this.consign_type == 'YES' ? 1 : 0

                this.ruleForm.material.reference = this.material_select
                this.ruleForm.surcharge_ring.reference = this.surcharge_select

                this.$api.put('/product/save', this.ruleForm, r => {

                  console.log(r)
                  history.back(-1)
                  // this.branch_list=r.content

                });

              }

            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      uploadSectionFile(param) {

        console.log('我進來了')

        let bodyFormData = new FormData();
        bodyFormData.append("file", param.file);
        bodyFormData.append("type", 'BRAND');
        this.$api.post('/kernal/asset/retain', bodyFormData, r => {
          this.imageUrl = this.root + '/kernal/asset/' + r.reference
          this.ruleForm.photo.reference = r.reference
          console.log('我出去了')
          //console.log(r)
        });
      },


      beforeAvatarUpload() {},
      handleAvatarSuccess() {},
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      querySearch(queryString, cb) {
        var links = this.links;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        // call callback function to return suggestions
        cb(results);
      },
      handleSelect(item) {
        console.log(item);
      },
      createFilter(queryString) {
        return (link) => {
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return this.links_name
      },
      Return() {
        history.back(-1)
      }
    },


  }
</script>

<style lang="scss">
  @import '../../assets/styles/variable';

  .productSave {

    .avatar-uploader .el-upload {
      // border: 1px dashed #d9d9d9;
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      margin-left: 20px // margin: 0 auto
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }

    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }


    .disabled .el-upload--picture-card {
      display: none;
    }


  }
</style>

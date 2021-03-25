<template>
  <div class="specialCreates" v-loading='all_loading' style="margin: 0 auto;background: white;padding: 30px;border-radius: 10px;">
    <!-- max-width: 700px; -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

      <div style="width: 100%;color: white;background: deepskyblue;line-height: 30px;margin-bottom: 10px;">
        <strong style="margin-left: 10px;">Product</strong>
      </div>

      <el-form-item label="Name" prop="gem.type">
        <el-input type="age" v-model="ruleForm.gem.type" :disabled="type=='detail'"></el-input>
      </el-form-item>

      <el-form-item label="Gem Type" prop="gemType.reference">

        <el-select clearable :disabled="type=='detail'" style='width: 100%;' v-model="ruleForm.gemType.reference" filterable
          placeholder="Select">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>

        <!-- <el-autocomplete style='width: 100%;' v-model="ruleForm.gemType.name" :fetch-suggestions="querySearch" placeholder="Please Input"
				 @select="handleSelect"></el-autocomplete> -->
      </el-form-item>

      <el-form-item label="Dimension" required>

        <el-form-item prop="dimension" style='width: 80%;float: left;'>
          <el-input :disabled="type=='detail'" v-model="ruleForm.dimension"></el-input>
        </el-form-item>

        <el-form-item prop="dimensionUnit" style='width: 15%;float: left;margin-left: 5%;'>
          <el-input :disabled="type=='detail'" v-model="ruleForm.dimensionUnit"></el-input>
        </el-form-item>

      </el-form-item>

      <el-form-item label="Quantity" prop="storageQuantity">
        <el-input :disabled="type=='detail'" type="age" v-model="ruleForm.storageQuantity"></el-input>
      </el-form-item>

      <el-form-item label="Weight" required>

        <el-form-item prop="storageWeight" style='width: 80%;float: left;'>
          <el-input :disabled="type=='detail'" v-model="ruleForm.storageWeight"></el-input>
        </el-form-item>

        <el-form-item prop="weightUnit" style='width: 15%;float: left;margin-left: 5%;'>
          <el-input :disabled="type=='detail'" v-model="ruleForm.weightUnit"></el-input>
        </el-form-item>

      </el-form-item>


      <!-- <el-form-item label="Weight" prop="name">
				<el-input v-model="ruleForm.name" style='width: 80%;'></el-input>
				<el-input v-model="ruleForm.name" style='width: 15%;margin-left: 5%;'></el-input>
			</el-form-item> -->




      <el-form-item label="Color" prop="color">
        <el-input :disabled="type=='detail'" v-model="ruleForm.color"></el-input>
      </el-form-item>

      <el-form-item label="Cut" prop="cut">
        <el-input :disabled="type=='detail'" v-model="ruleForm.cut"></el-input>
      </el-form-item>

      <el-form-item label="Cost" prop="cost">
        <el-input :disabled="type=='detail'" v-model="ruleForm.cost"></el-input>
      </el-form-item>

      <!-- <el-form-item label="Type" prop="gem.type">
				<el-radio-group v-model="ruleForm.gem.type">
					<el-radio label="NONE"></el-radio>
					<el-radio label="GIA"></el-radio>
					<el-radio label="GRS"></el-radio>
				</el-radio-group>
			</el-form-item> -->

      <el-form-item label="Certified No">
        <el-input @focus='select_indexs()' v-model="ruleForm.gemCertified"></el-input>
      </el-form-item>

      <el-form-item label="Consign">
        <el-radio-group v-model="consign_" :disabled="type=='detail'">
          <el-radio label="YES"></el-radio>
          <el-radio label="NO"></el-radio>
        </el-radio-group>
      </el-form-item>


      <el-form-item label="Consign info">
        <el-input :disabled="type=='detail'" v-model="ruleForm.consign_info"></el-input>
      </el-form-item>

      <el-form-item label="Consignor">
        <el-select clearable @change="clear_consignor" :disabled="type=='detail'" v-model="select_consignor" filterable placeholder="Select Consignor">
          <el-option v-for="item in consignor_list" :label="item.customeName" :value="item.reference"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="Branch" prop="branch.reference">
        <el-select clearable :disabled="type=='detail'" v-model="ruleForm.branch.reference" placeholder="Select Branch">
          <el-option v-for="item in branch_list" :label="item.name" :value="item.reference"></el-option>
          <!-- <el-option label="item.name" value="item.reference"></el-option> -->
        </el-select>
      </el-form-item>


      <div style="width: 100%;color: white;background: deepskyblue;line-height: 30px;margin-bottom: 10px;">
        <strong style="margin-left: 10px;">Invoice</strong>
      </div>

      <el-form-item label="Supplier" prop="invoice.supplier.reference">
        <el-select clearable :disabled="type=='detail'" v-model="ruleForm.invoice.supplier.reference" placeholder="Select Supplier">
          <el-option v-for="item in supplier_list" :label="item.name" :value="item.reference"></el-option>
          <!-- <el-option label="item.name" value="item.reference"></el-option> -->
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

      <el-form-item label="Rap Price(US)" prop="invoiceRapPrice">
        <el-input :disabled="type=='detail'" v-model="ruleForm.invoiceRapPrice"></el-input>
      </el-form-item>

      <el-form-item label="Discount(%)" prop="invoiceDiscount">
        <el-input :disabled="type=='detail'" v-model="ruleForm.invoiceDiscount"></el-input>
      </el-form-item>

      <el-form-item label="Total Carats" prop="invoiceTotalCarats">
        <el-input :disabled="type=='detail'" v-model="ruleForm.invoiceTotalCarats"></el-input>
      </el-form-item>

      <el-form-item label="Remark" prop="">
        <el-col :span="8">
          <p style="overflow: hidden;">
            <textarea rows="3" style="width: 100%;" v-model="ruleForm.invoice.remark" ></textarea>
          </p>
        </el-col>
      </el-form-item>




      <el-form-item>
        <el-upload class="avatar-uploader" action="auto" :show-file-list="false" :http-request="uploadSectionFile02"
          :disabled="type=='detail'">
          <img v-if="imageUrl02" :src="imageUrl02" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span v-if="imageUrl02" style="float: left;padding-left: 160px;color: #409EFF;cursor: pointer;" @click='handlePictureCardPreview("grs")'>預覽</span>
        <span v-if="imageUrl02&&(type!='detail'?true:false)" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;"
          @click='handleRemove("grs")'>刪除</span>
      </el-form-item>



      <div style="width: 100%;color: white;background: deepskyblue;line-height: 30px;margin-bottom: 10px;">
        <strong style="margin-left: 10px;">Cheque</strong>
      </div>

      <el-form-item label="Cheque Date" prop="chequeDate">
        <el-date-picker format="yyyy-MMM-dd" :disabled="type=='detail'" type="date" placeholder="Pick a date" v-model="ruleForm.chequeDate"
          style="width: 100%;"></el-date-picker>
      </el-form-item>

      <el-form-item label="Cheque HKD" prop="chequeAmount">
        <el-input :disabled="type=='detail'" v-model="ruleForm.chequeAmount"></el-input>
      </el-form-item>

      <el-form-item label="Bank Name" prop="chequeBankName">
        <el-input :disabled="type=='detail'" v-model="ruleForm.chequeBankName"></el-input>
      </el-form-item>

      <el-form-item label="Cheque No" prop="chequeNo">
        <el-input :disabled="type=='detail'" v-model="ruleForm.chequeNo"></el-input>
      </el-form-item>

      <el-form-item label="Cheque Payer" prop="chequePayer">
        <el-input :disabled="type=='detail'" v-model="ruleForm.chequePayer"></el-input>
      </el-form-item>

      <!-- <el-form-item label="Activity zone" prop="region">
				<el-select v-model="ruleForm.region" placeholder="Activity zone">
					<el-option label="Zone one" value="shanghai"></el-option>
					<el-option label="Zone two" value="beijing"></el-option>
				</el-select>
			</el-form-item> -->
      <!-- <el-form-item label="Activity time" required>
				<el-col :span="11">
					<el-form-item prop="date1">
						<el-date-picker type="date" placeholder="Pick a date" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
					<el-form-item prop="date2">
						<el-time-picker placeholder="Pick a time" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
					</el-form-item>
				</el-col>
			</el-form-item> -->
      <!-- <el-form-item label="Instant delivery" prop="delivery">
				<el-switch v-model="ruleForm.delivery"></el-switch>
			</el-form-item> -->
      <!-- <el-form-item label="Activity type" prop="type">
				<el-checkbox-group v-model="ruleForm.type">
					<el-checkbox label="Online activities" name="type"></el-checkbox>
					<el-checkbox label="Promotion activities" name="type"></el-checkbox>
					<el-checkbox label="Offline activities" name="type"></el-checkbox>
					<el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item> -->
      <!-- <el-form-item label="Resources" prop="resource">
				<el-radio-group v-model="ruleForm.resource">
					<el-radio label="Sponsorship"></el-radio>
					<el-radio label="Venue"></el-radio>
				</el-radio-group>
			</el-form-item> -->
      <!-- <el-form-item label="Activity form" prop="desc">
				<el-input type="textarea" v-model="ruleForm.desc"></el-input>
			</el-form-item> -->

      <el-dialog title="Select Product" :visible.sync="select_item" width="70%" :before-close="handleClose">
        <div>
          <el-table :data="tableData02" height="650" ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;'>

            <template slot="empty" v-if="loaing_table">
              <span>Opps! No records yet</span>
            </template>

            <template slot="empty" v-if="!loaing_table">
              <i class="el-icon-loading"></i>
              <span>Loading...</span>
            </template>
            <!-- <el-table-column  type="index"  row-style='background:red'  >
			  		</el-table-column> -->

            <el-table-column prop="id" label="Id" row-style='background:red' width="80px">
            </el-table-column>

            <el-table-column prop="certificateType" label="Type" row-style='background:red' width="80px">
            </el-table-column>

            <el-table-column prop="certificateNo" label="Measurements" row-style='background:red' width="200px">
              <template slot-scope="scope">
                <span v-if="scope.row.giaMeasurements!=''">{{scope.row.giaMeasurements}}</span>
                <span v-if="scope.row.grsDimensions!=''">{{scope.row.grsDimensions}}</span>
              </template>
            </el-table-column>

            <el-table-column prop="certificateNo" label="Certificate No" row-style='background:red'>
            </el-table-column>

            <div class="Action">
              <el-table-column fixed="right" label="Action" style='background: red;' width="100px">
                <template slot-scope="scope">
                  <div style="white-space: nowrap;">
                    <el-button @click="Select(scope.row.certificateNo)" type="danger" size="small">Select</el-button>
                  </div>
                </template>
              </el-table-column>

            </div>

          </el-table>
        </div>
        <div class="block" style="float: right;margin-top: 5px;">
          <el-pagination layout="prev, pager, next" :page-size='8' :total="totalElements" @current-change='pages01'
            :current-page="page01">
          </el-pagination>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

      <el-form-item style='width: 100%;text-align: center;'>
        <el-button v-if="type!='detail'" type="primary" @click="submitForm('ruleForm')" style='margin: 0 auto;'>Save</el-button>
        <el-button type="primary" @click="Return('ruleForm')" style='margin-left: 20px;'>Back</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">Reset</el-button> -->
      </el-form-item>
    </el-form>


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

        select_consignor: "",
        consignor_list: [],
        consign_: "",
        titlebg: {
          'background': 'rgb(216,214,215)',
          'color': 'black'
        },
        loaing_table: false,
        page01: 1,
        totalElements: 0,
        tableData02: [],
        select_show: false,
        select_item: false,
        type: '',
        links: [],
        links_name: [],
        branch_list: [],
        supplier_list: [],
        options: [],
        ruleForm: {

          consign_info: "",
          consign: 0,
          consignor: '',
          "color": "",
          "comments": "None",
          "cut": "",

          "availableInventoryWeight": 0,
          "branch": {
            "reference": "",
          },
          "chequeAmount": 0,
          "chequeBankName": "",
          "chequeDate": "",
          "chequeNo": "",
          "chequePayer": "",
          // "color": "string",
          // "comments": "string",
          "cost": 0,

          "dimension": "",
          "dimensionUnit": "mm",
          "gem": {
            "id": 0,
            "reference": "string",
            "type": ""
          },
          "gemCertified": null,
          "gemType": {

            "reference": null
          },
          // "id": 0,
          "invoice": {

            remark:'',
            "amount": 0,
            "currency": "HKD",
            "id": null,
            "image": {
              "reference": null,
            },
            "invoiceDate": '',
            "invoiceNo": "",
            "invoiceType": "INVENTORY",
            "item": "",
            "locked": 0,

            // "reference": "string",
            "supplier": {

              "reference": null
            }
          },
          "invoiceDiscount": 0,
          "invoiceRapPrice": 0,
          "invoiceTotalCarats": 0,
          // "reference": "string",
          "storageQuantity": 0,
          "storageWeight": 0,
          "totalDeliveredQuantity": 0,
          "totalDeliveredWeight": 0,
          "totalQuantity": 0,
          "totalWeight": 0,
          "weightUnit": "CT"
        },
        all_loading: false,
        imageUrl02: '',
        root: '',
        dialogImageUrl: '',
        dialogVisible: false,
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
              // {
              // 	min: 3,
              // 	max: 5,
              // 	message: 'Length should be 3 to 5',
              // 	trigger: 'blur'
              // }
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
              // {
              // 	min: 3,
              // 	max: 5,
              // 	message: 'Length should be 3 to 5',
              // 	trigger: 'blur'
              // }
            ]



          },

          dimension: [{
            required: true,
            message: 'Please input dimension',
            trigger: 'blur'
          }],
          dimensionUnit: [{
              required: true,
              message: 'dimensionUnit',
              trigger: 'blur'
            },


          ],

          storageQuantity: [{
              required: true,
              message: 'Please input Quantity'
            },
            {
              pattern: /^[1-9]\d*$/,
              message: 'this must be a number'
            }
          ],

          storageWeight: [{
              required: true,
              message: 'Please input storageWeight',
              trigger: 'blur'
            },
            {
              pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g,
              message: 'this must be a number'
            }
          ],
          weightUnit: [{
              required: true,
              message: 'weightUnit',
              trigger: 'blur'
            },

          ],

          cost: [{
              required: true,
              message: 'Please input storageWeight',
              trigger: 'blur'
            },
            {
              pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g,
              message: 'this must be a number'
            }
          ],


          gem: {

            type: [{
              required: true,
              message: 'Please select Type',
              trigger: 'change'
            }]

          },
          branch: {
            reference: [{
              required: true,
              message: 'Please select branch',
              trigger: 'change'
            }]
          },



          gemCertified: [{
              required: true,
              message: 'Please input Certified No',
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

          invoiceRapPrice: [{
              required: true,
              message: 'Please input Rap Price',
              trigger: 'blur'
            },
            {
              pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g,
              message: 'this must be a number'
            }
          ],

          invoiceDiscount: [{
              required: true,
              message: 'Please input Discount',
              trigger: 'blur'
            },
            {
              pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g,
              message: 'this must be a number'
            }
          ],

          invoiceTotalCarats: [{
              required: true,
              message: 'Please input Total Carats',
              trigger: 'blur'
            },
            {
              pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g,
              message: 'this must be a number'
            }
          ],

          chequeDate: [{
            // type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change'
          }],

          chequeAmount: [{
              required: true,
              message: 'Please input cheque HK',
              trigger: 'blur'
            },
            {
              pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g,
              message: 'this must be a number'
            }
          ],

          chequeBankName: [{
              required: true,
              message: 'Please input Bank Name',
              trigger: 'blur'
            }

          ],

          color: [{
              required: true,
              message: 'Please input Color',
              trigger: 'blur'
            }

          ],

          cut: [{
              required: true,
              message: 'Please input Cut',
              trigger: 'blur'
            }

          ],

          gem: {
            type: [{
              required: true,
              message: 'Please input Name',
              trigger: 'blur'
            }]
          },

          chequeNo: [{
              required: true,
              message: 'Please input cheque No',
              trigger: 'blur'
            }

          ],

          chequePayer: [{
              required: true,
              message: 'Please input cheque Payer',
              trigger: 'blur'
            }

          ],

          name: [{
              required: true,
              message: 'Please input Activity name',
              trigger: 'blur'
            },
            // {
            // 	min: 3,
            // 	max: 5,
            // 	message: 'Length should be 3 to 5',
            // 	trigger: 'blur'
            // }
          ],
          region: [{
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change'
          }],
          date1: [{
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change'
          }],
          date2: [{
            type: 'date',
            required: true,
            message: 'Please pick a time',
            trigger: 'change'
          }],
          type: [{
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change'
          }],
          resource: [{
            required: true,
            message: 'Please select activity resource',
            trigger: 'change'
          }],
          desc: [{
            required: true,
            message: 'Please input activity form',
            trigger: 'blur'
          }]
        }
      };
    },
    mounted() {
      this.links = this.loadAll();
    },
    created: function() {


    //         {
    //           "availableInventoryWeight": 10,
    //           "branch": {
    //             "reference": "1179eb78-b5ba-11e9-bc55-000d3aa2d63e"
    //           },
    //           "chequeAmount": 100000,
    //           "chequeBankName": "HSBC",
    //           "chequeDate": "2019-07-20",
    //           "chequeNo": "005645645654009",
    //           "chequePayer": "JML",
    //           "color": "Clear",
    //           "comments": "None",
    //           "cost": 0.04,
    //           "cut": "0.1 mm",
    //           "dimension": "5.29 - 5.32 x 3.30 mm",
    //           "dimensionUnit": "string",
    //           "gem": {
    //             "id": 0,
    //             "reference": "string",
    //             "type": "test"
    //           },
    //           "consign": 1,
    //           "consign_info": "string",
    //           "consignor": {
    //             "reference": "462a9546-cad4-11e9-bc55-000d3aa2d63e",
    //           },
    //           "gemCertified": "7308654641",
    //           "gemType": {
    //             "reference": "20f92694-abad-11e9-bda6-acde48001122"
    //           },
    //           "invoice": {
    //             "amount": 100000,
    //             "currency": "HKD",
    //             "image": {
    //               "reference": "73a8a2b5-cd28-11e9-bc55-000d3aa2d63e"
    //             },
    //             "invoiceDate": "2019-07-25",
    //             "invoiceNo": "GC-20190725-1",
    //             "invoiceType": "INVENTORY",
    //             "item": "string",
    //             "locked": 0,
    //             "supplier": {
    //               "reference": "d67b1a1b-b5bb-11e9-bc55-000d3aa2d63e"
    //             }
    //           },
    //           "invoiceDiscount": 0.1,
    //           "invoiceRapPrice": 0.1,
    //           "invoiceTotalCarats": 10,
    //           "storageQuantity": 250,
    //           "storageWeight": 10,
    //           "totalDeliveredQuantity": 250,
    //           "totalDeliveredWeight": 10,
    //           "totalQuantity": 250,
    //           "totalWeight": 10,
    //           "weightUnit": "ct"
    //         }





//       this.$api.put('/inventory/save',
//
//         {
//           "availableInventoryWeight": 0,
//           "branch": {
//             "reference": "1179eb78-b5ba-11e9-bc55-000d3aa2d63e"
//           },
//           "chequeAmount": 1,
//           "chequeBankName": "HSBC",
//           "chequeDate": "2019-09-02",
//           "chequeNo": "88002",
//           "chequePayer": "Cheque Payer",
//           "color": "red",
//           "comments": "None",
//           "cost": 1,
//           "cut": "1.1mm",
//           "dimension": "1.1",
//           "dimensionUnit": "mm",
//           "gem": {
//             "id": 0,
//             "reference": "string",
//             "type": "test name 789"
//           },
//           "consign": 1,
//           "consign_info": "Consign info",
//           "consignor": {reference: "462a9546-cad4-11e9-bc55-000d3aa2d63e"},
//           "gemCertified": "7308654641",
//           "gemType": {reference: "20f92694-abad-11e9-bda6-acde48001122"},
//           "invoice": {
//             "amount": 1,
//             "currency": "HKD",
//             "image": {
//               "reference": "7f3db55d-cd37-11e9-bc55-000d3aa2d63e"
//             },
//             "invoiceDate": "2019-09-02",
//             "invoiceNo": "456100",
//             "invoiceType": "INVENTORY",
//             "item": "test item",
//             "locked": 0,
//             "supplier": {
//               "reference": "d67b1a1b-b5bb-11e9-bc55-000d3aa2d63e"
//             }
//           },
//           "invoiceDiscount": 1,
//           "invoiceRapPrice": 1,
//           "invoiceTotalCarats": 1,
//           "storageQuantity": 1,
//           "storageWeight": 1.2,
//           "totalDeliveredQuantity": 0,
//           "totalDeliveredWeight": 0,
//           "totalQuantity": 0,
//           "totalWeight": 0,
//           "weightUnit": "ct"
//         }
//         , r => {
//           console.log('999')
//         })



      this.root = this.$api.root
      console.log('come  in')

      this.$api.post('/Branch/findAll?Page=1&Size=999', null, r => {


        this.branch_list = r.content

      });

      this.$api.get('/invoice/suppliers', null, r => {

        console.log('-------------')
        console.log(r)
        this.supplier_list = r

      });


      this.$api.post('/customer/1970-01-01/2019-09-02/0/100000000', {}, r => {

        console.log('-------------')
        console.log(r)
        this.consignor_list = r

      });



      this.$api.get('/inventory/gem/type', null, r => {


        console.log('*/-------------/*')
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
          this.ruleForm.chequeDate = new Date(this.ruleForm.chequeDate)
          this.ruleForm.invoice.invoiceDate = new Date(this.ruleForm.invoice.invoiceDate)

          this.imageUrl02 = this.root + '/kernal/asset/' + this.ruleForm.invoice.image.reference
        });

      } else if (this.type == 'alter') {

        this.$api.get('/inventory/' + this.$route.query.id, null, r => {

          console.log('*****')
          console.log(r)
          this.ruleForm = r
          this.ruleForm.chequeDate = new Date(this.ruleForm.chequeDate)
          this.ruleForm.invoice.invoiceDate = new Date(this.ruleForm.invoice.invoiceDate)
          this.select_consignor=r.consignor.customeName
          this.consign_=r.consign==1?"YES":"NO"

          this.imageUrl02 = this.root + '/kernal/asset/' + this.ruleForm.invoice.image.reference

        });

      }



    },

    methods: {

      clear_consignor(){

        this.ruleForm.consignor.reference=""

      },

      Select(no) {
        this.ruleForm.gemCertified = no
        this.handleClose()
      },

      search_list() {
        this.loaing_table = false
        this.tableData02 = []
        this.$api.get('/inventory/gem/certified/' + (this.page01 - 1) + '/10', null, r => {

          this.tableData02 = r;
          this.loaing_table = true
        });
      },

      pages01(val) {
        // this.all_loading=true
        //console.log(val)
        this.page01 = val
        this.search_list()
      },

      handleClose() {
        this.select_item = false
      },

      select_indexs() {

        this.select_item = true

        this.$api.get('/inventory/gem/certified/count', null, r => {
          console.log(r)
          this.totalElements = r
        });

        this.search_list()

      },

      handlePictureCardPreview(type) {
        // this.dialogImageUrl = file.url;

        if (type == "gia") {

          this.dialogImageUrl = this.imageUrl;
        } else if (type == "grs") {

          this.dialogImageUrl = this.imageUrl02;
        }
        this.dialogVisible = true;
      },

      handleRemove(type) {
        // //console.log(file, fileList);


        if (type == "gia") {
          this.imageUrl = ''
          this.ruleForm.giaImage.reference = null

        } else if (type == "grs") {
          this.imageUrl02 = ''
          this.ruleForm.invoice.image.reference = null
        }


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

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {

          if (this.ruleForm.invoice.image.reference == null) {
            alert('Please upload image')
          } else if (valid) {
            // alert('submit!');

            this.ruleForm.chequeAmount = parseInt(this.ruleForm.chequeAmount)
            this.ruleForm.chequeDate = new Date(this.ruleForm.chequeDate).format("yyyy-MM-dd")
            console.log('01')
            this.ruleForm.cost = parseInt(this.ruleForm.cost)
            this.ruleForm.invoice.invoiceDate = new Date(this.ruleForm.invoice.invoiceDate).format("yyyy-MM-dd")
            console.log('02')
            this.ruleForm.invoiceDiscount = parseFloat(this.ruleForm.invoiceDiscount)
            this.ruleForm.invoiceRapPrice = parseFloat(this.ruleForm.invoiceRapPrice)
            this.ruleForm.invoiceTotalCarats = parseFloat(this.ruleForm.invoiceTotalCarats)
            this.ruleForm.storageQuantity = parseFloat(this.ruleForm.storageQuantity)
            this.ruleForm.storageWeight = parseFloat(this.ruleForm.storageWeight)

            // this.ruleForm.invoice.supplier.reference='cd4da866-8a65-11e9-8b7a-f45c898e57b1'
            // this.ruleForm.branch.reference='8a6e800c736011e9a82c000c292bf5f6'




            if (this.ruleForm.gemCertified == '') {
              this.ruleForm.gemCertified = null
            }
            this.ruleForm.consign = this.consign_ == "YES" ? 1 : 0




            this.ruleForm.invoice.amount=parseInt(this.ruleForm.invoice.amount)

            console.log(this.ruleForm)

            if (this.type == 'alter') {

              if(this.ruleForm.consignor.reference==""){

                if (this.select_consignor == '') {
                  this.ruleForm.consignor = null
                } else {
                  this.ruleForm.consignor = {
                    reference: this.select_consignor
                  }
                }

              }

              this.$api.post('/inventory/save', this.ruleForm, r => {

                console.log(r)
                history.back(-1)

              });
            } else {

              if (this.select_consignor == '') {
                this.ruleForm.consignor = null
              } else {
                this.ruleForm.consignor = {
                  reference: this.select_consignor
                }
              }

              this.$api.put('/inventory/save', this.ruleForm, r => {

                console.log(r)
                history.back(-1)

              });

            }




          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },





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

  .specialCreates {

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

  }
</style>

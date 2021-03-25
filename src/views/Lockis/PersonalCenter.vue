<template>
  <div style="background: white;height: 676px;width: 100%; padding:30px;">
    <el-row>
      <el-col :span="10">
        <div class="details">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
              {{form.name}}
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.emial"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
            <!-- <el-form-item>
              <el-row>
                <el-col :span="20">
                  <el-input type="text" v-model="color"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-input type="color" v-model="color"></el-input>
                </el-col>
              </el-row>
              <el-button type="primary" @click="changeTheme">预览主题</el-button>
            </el-form-item> -->
          </el-form>
        </div>
      </el-col>
      <el-col :span="10" :offset='4'>
        <div class="picture">
          <label for="file">
            <el-avatar shape="square" :size="200" fit="cover" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2462146637,4274174245&fm=26&gp=0.jpg"></el-avatar>
            <div class="text">点击修改头像</div>
          </label>
          <input id="file" type="file" ref="file" hidden @change="onFileChange">
        </div>
      </el-col>
    </el-row>
    <div>
      <el-dialog title="修改头像" :visible.sync="dialogVisible" width="30%" @opened='onDialogOpened'  @closed="onDialogClosed">
        <div class="previw">
          <img class="previwImg" :src="previewImage" alt="" ref="previwImg">
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="onUpdatePhoto" :loading="updatePhotoLoading">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import less from 'less'
export default {
  name: "personalCenter",
  data() {
    return {
      form: {
        name: "Username",
        mobile: "",
        emial: "",
        desc: "",
      },
      previewImage: "",
      dialogVisible: false,
      copper: null,
      updatePhotoLoading: false,
      color:''
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    onFileChange() {
      const file = this.$refs.file;
      //console.log(file.files);
      const blodData = window.URL.createObjectURL(file.files[0]);

      this.previewImage = blodData;
      this.dialogVisible = true;

      this.$refs.file.value = "";
    },
    onDialogOpened(){
      const image = this.$refs['previwImg']
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return
      }
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'none',
        aspectRatio: 1,
        cropBoxResizable: false
  
        // 当你移动裁切器的时候会触发调用 crop 方法
        // crop (event) {
        //   console.log(event.detail.x)
        //   console.log(event.detail.y)
        //   console.log(event.detail.width)
        //   console.log(event.detail.height)
        //   console.log(event.detail.rotate)
        //   console.log(event.detail.scaleX)
        //   console.log(event.detail.scaleY)
        // }
      })
    },
    onUpdatePhoto(){
      this.updatePhotoLoading = true
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        //photo为后端接口需要的字段
        fd.append('photo', file)
        //调用接口上传头像
        console.log(fd.get('photo'))


        // 请求更新用户头像请求提交 fd
        // updateUserPhoto(fd).then(res => {
          // console.log(res)
          // 关闭对话框
          // this.dialogVisible = false
          // 更新视图展示

          // 直接把裁切结果的文件对象转为 blob 数据本地预览
          // this.user.photo = window.URL.createObjectURL(file)

          // 关闭确定按钮的 loading
          // this.updatePhotoLoading = false

          // this.$message({
          //   type: 'success',
          //   message: '更新头像成功'
          // })

          // 更新顶部登录用户的信息
          // globalBus.$emit('update-user', this.user)

          // 把服务端返回的图片进行展示有点慢
          // this.user.photo = res.data.data.photo
        // })
      })
    },
    onDialogClosed(){

    },
    cancel(){
      this.dialogVisible = false 
      this.updatePhotoLoading = false
    },
    changeTheme(){
      window.less.modifyVars({
        '@primary-color': '#6839c9',
        '@link-color': '#6839c9',
        '@btn-primary-bg': '#6839c9',
        '@layout-header-background': this.color
        // '@component-background': this.color
      })
    }
  },
};
</script>

<style scoped lang="scss">
.picture {
  margin-top: 50px;
  .text {
    width: 200px;
    margin-top: 10px;
    text-align: center;
  }
}
.previw{
  .previwImg{
    display: block;
    max-width: 100%;
  }
}
</style>
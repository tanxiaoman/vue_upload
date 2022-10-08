<template>
  <div>
    <el-card class="box-card">
      <div>
        <h1 style="color: royalblue">满文识别系统</h1>
        <img :src="avatar" alt="" class="preview" v-if="avatar" />
        <!-- 图片，用来展示用户选择的图片 -->
        <img src="" alt="" class="preview" v-else />

        <!-- 按钮区域 -->
        <div class="btn-box">
          <!-- 增加文件选择框 -->
          <input type="file" accept="image/*" style="display: none" ref="iptFile" @change="onChangeFile" />
          <el-button type="primary" icon="el-icon-plus" @click="$refs.iptFile.click()">
            选择图片</el-button>
          <el-button type="primary" icon="el-icon-upload" @click="upload">
            上传图片</el-button>
        </div>
      </div>
    </el-card>

    <el-dialog title="满文识别结果" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span style="color: blue">{{result}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
export default {
  name: 'UserAvatar',
  data() {
    return {
      uploadUrl: '/upload',
      avatar: '',
      dialogVisible: false,
      result: ''
    }
  },
  methods: {
    // 获取图片
    onChangeFile(e) {
      const fileList = e.target.files
      if (fileList.length > 0) {
        // 选择了图片
        console.log(fileList[0])
        // 校验图片大小
        const isLt2M = fileList[0].size / 1024 / 1024 < 5
        if (!isLt2M) {
          this.$message.warning('上传头像图片大小不能超过5M！')
          return
        }
        // 将图片转化为base64的字符串  FileReader
        const reader = new FileReader()
        // readAsDataURL将文件对象的数据读取到reader中，转化为base64的字符串
        reader.readAsDataURL(fileList[0])
        // load监听读取完成  reader.result
        reader.addEventListener('load', () => {
          //console.log(reader.result)
          this.avatar = reader.result
        })
      } else {
        this.avatar = ''
      }
    },
    upload() {
      //let file = this.$refs.iptFile.files[0]
      if (this.avatar === '') {
        this.$message.warning('请选择图片后再上传！')
        return
      }
      let param = new FormData(); //创建form对象
      param.append('image', this.avatar);//通过append向form对象添加数据
      this.$http.post(this.uploadUrl, param).then(response => {
        if(response.data){
          this.result = response.data
        }
        this.dialogVisible = true
        console.log('上传成功')
      }).catch(function (error) {
        console.log(error)
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}

.preview {
  object-fit: cover;
  width: 350px;
  height: 350px;
}
</style>
